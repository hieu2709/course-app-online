import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import React from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import ButtonBack from '~/components/ButtonBack';
import MyButton from '~/components/MyButton';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import MyTabBar from './layouts/Lesson/MyTabBar';

function DetailLesson({ navigation, route }) {
  const { theme } = useTheme();
  const { user } = useUser();
  const { data } = route?.params;
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef();
  const lessonNextRef = query(
    collection(db, 'lessons'),
    where('courseId', '==', data?.courseId),
    where('index', '==', data?.index + 1),
  );
  const { data: lessonsNext, isLoading } = useFirestoreQuery(
    ['lessonNext', data?.courseId + data?.index + 1],
    lessonNextRef,
  );
  const completedVideo = useCallback(() => {
    videoRef?.current?.getCurrentTime()?.then(currentTime => {
      if (currentTime > data?.time * 60 * 0.7) {
        setDoc(
          doc(
            db,
            'mylesson',
            user?.userId?.toString() + data?.lessonId?.toString(),
          ),
          {
            status: 1,
          },
          { merge: true },
        );
        if (!lessonsNext?.empty) {
          setDoc(
            doc(
              db,
              'mylesson',
              user?.userId?.toString() +
                lessonsNext?.docs[0]?.data()?.lessonId?.toString(),
            ),
            {
              userId: user?.userId,
              lessonId: lessonsNext?.docs[0]?.data()?.lessonId,
              status: 0,
            },
          );
        } else {
          setDoc(
            doc(
              db,
              'mycourse',
              user?.userId?.toString() + data?.courseId?.toString(),
            ),
            {
              status: 2,
            },
            { merge: true },
          );
        }
      } else {
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
  ]);
  const onStateChange = useCallback(
    state => {
      switch (state) {
        case 'ended':
          completedVideo();
          setPlaying(false);
          break;
        case 'playing':
          setPlaying(true);
          break;
        case 'paused':
          completedVideo();
          setPlaying(false);
          break;
        default:
          // setPlaying(false);
          break;
      }
    },
    [completedVideo],
  );
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  const pauseVideo = () => {
    setPlaying(false);
  };
  const continueVideo = () => {
    setPlaying(true);
  };
  // videoRef?.current?.getCurrentTime()?.then(time => console.log(time));
  if (isLoading) {
    return <MyLoadingFull text={'Đang tải dữ liệu'} />;
  } else {
    return (
      <Container>
        <View style={tw`flex-1 `}>
          <ButtonBack
            style={tw`py-2 ml-5`}
            title={`Bài ${data?.index}`}
            onPress={completedVideo}
          />
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
