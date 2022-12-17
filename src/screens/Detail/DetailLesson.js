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
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import MyTabBar from './layouts/Lesson/MyTabBar';

function DetailLesson({ navigation, route }) {
  const { theme } = useTheme();
  const { data, index } = route?.params;
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef();
  const onStateChange = useCallback(state => {
    switch (state) {
      case 'ended':
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
  console.log(playing);
  return (
    <Container>
      <View style={tw`flex-1 `}>
        <ButtonBack style={tw`py-2 ml-5`} title={`Bài ${index}`} />
        <YoutubePlayer
          ref={videoRef}
          onReady={() => setIsReady(true)}
          height={250}
          play={playing}
          videoId={data?.video}
          onChangeState={onStateChange}
        />
        <Text style={tw`font-qs-semibold text-lg text-${theme.text} mx-5 mb-2`}>
          Bài {index}: {data.lessonName}
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

export default DetailLesson;
