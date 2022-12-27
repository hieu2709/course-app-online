import { useFirestoreQuery } from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import Icon from '~/base/Icon';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import ModalCenter from '~/modals/ModalCenter';
import ModalReview from './components/ModalReview';
import MyTabBar from './layouts/Lesson/MyTabBar';

function DetailLesson({ navigation, route }) {
  const { theme } = useTheme();
  const { user } = useUser();
  const { data } = route?.params;
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef();
  const modalRef = useRef();
  const lessonNextRef = query(
    collection(db, 'lessons'),
    where('courseId', '==', data?.courseId),
    where('index', '==', data?.index + 1),
  );
  const { data: lessonsNext, isLoading } = useFirestoreQuery(
    [
      'lessonNext',
      data?.courseId?.toString() + '-' + (data?.index + 1).toString(),
    ],
    lessonNextRef,
  );

  const completedVideo = useCallback(() => {
    videoRef?.current?.getCurrentTime()?.then(async currentTime => {
      if (currentTime > data?.time * 60 * 0.7) {
        setDoc(
          doc(
            db,
            'mylesson',
            user?.userId?.toString() + '-' + data?.lessonId?.toString(),
          ),
          {
            status: 1,
          },
          { merge: true },
        );
        if (!lessonsNext?.empty) {
          const docRef = doc(
            db,
            'mylesson',
            user?.userId?.toString() +
              '-' +
              lessonsNext?.docs[0]?.data()?.lessonId?.toString(),
          );
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            setDoc(
              doc(
                db,
                'mylesson',
                user?.userId?.toString() +
                  '-' +
                  lessonsNext?.docs[0]?.data()?.lessonId?.toString(),
              ),
              {
                userId: user?.userId,
                lessonId: lessonsNext?.docs[0]?.data()?.lessonId,
                status: 0,
              },
            );
          }
          navigation.goBack();
        } else {
          console.log('xong');
          setDoc(
            doc(
              db,
              'mycourse',
              user?.userId?.toString() + '-' + data?.courseId?.toString(),
            ),
            {
              status: 2,
            },
            { merge: true },
          );
          const myreviewRef = doc(
            collection(db, 'myreview'),
            user?.userId?.toString() + '-' + data?.courseId?.toString(),
          );
          const docSnap = await getDoc(myreviewRef);
          if (docSnap.exists()) {
            navigation.goBack();
          } else {
            setPlaying(false);
            modalRef?.current?.openModal();
          }
        }
      } else {
        navigation?.goBack();
        return;
      }
    });
  }, [
    data?.lessonId,
    data?.time,
    user?.userId,
    lessonsNext?.docs,
    lessonsNext?.empty,
    data?.courseId,
    navigation,
  ]);
  const onStateChange = useCallback(state => {
    switch (state) {
      case 'ended':
        // completedVideo();
        setPlaying(false);
        break;
      case 'playing':
        setPlaying(true);
        break;
      case 'paused':
        setPlaying(false);
        break;
      default:
        // setPlaying(false);
        break;
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  const pauseVideo = () => {
    setPlaying(false);
  };
  const continueVideo = () => {
    setPlaying(true);
  };

  const closeModal = () => {
    modalRef?.current?.closeModal();
    navigation.goBack();
  };
  if (isLoading) {
    return <MyLoadingFull text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <Container>
        <ModalCenter touchDisable={true} ref={modalRef}>
          <ModalReview close={closeModal} courseId={data?.courseId} />
        </ModalCenter>
        <View style={tw`flex-1 `}>
          <View style={tw`py-2 ml-5`}>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => {
                completedVideo();
              }}>
              <View style={tw`pr-4`}>
                <Icon
                  type="Ionicons"
                  name="arrow-back-sharp"
                  size={26}
                  color={tw.color(`${theme.text}`)}
                />
              </View>
              <Text style={tw`font-qs-bold  text-xl text-${theme.text} `}>
                {`Bài ${data?.index}`}
              </Text>
            </TouchableOpacity>
          </View>

          <YoutubePlayer
            ref={videoRef}
            onReady={() => setIsReady(true)}
            height={250}
            play={playing}
            videoId={data?.video}
            onChangeState={onStateChange}
          />
          <Text
            style={tw`font-qs-semibold text-lg text-${theme.text} mx-5 mb-2`}>
            Bài {data?.index}: {data.lessonName}
          </Text>
          <MyTabBar
            id={data?.lessonId}
            videoRef={videoRef}
            pause={pauseVideo}
            resume={continueVideo}
          />
          {!isReady && <MyLoadingFull text={'Đang tải dữ liệu'} />}
        </View>
      </Container>
    );
  }
}

export default DetailLesson;
