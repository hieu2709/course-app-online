import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import tw from '~/libs/tailwind';
import MyTabView from './layouts/DetailMyCourse/MyTabView';

function DetailMyCourse({ navigation, route }) {
  const { data } = route.params || '';
  const { theme } = useTheme();
  const title = data?.courseName || 'Các bài học';

  return (
    <Container>
      <Header
        title={title}
        rightIcon={
          <TouchableOpacity
            style={tw`h-6 w-6 justify-center items-center rounded-full border-[1.5px] border-${theme.text}`}>
            <Icon
              type="MaterialIcons"
              name="more-horiz"
              size={16}
              color={theme.text}
            />
          </TouchableOpacity>
        }
      />
      <View style={tw`flex-1`}>
        <MyTabView courseId={data?.courseID} />
      </View>
    </Container>
  );
}

export default DetailMyCourse;
