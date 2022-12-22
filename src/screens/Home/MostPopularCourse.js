import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '~/base/Icon';

import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import TabBarAllCourse from './components/TabBarAllCourse';

function MostPopularCourse() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <Container>
      <Header
        title={'Tất cả khóa học'}
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon
              type="Ionicons"
              name="ios-search-outline"
              size={26}
              color={`${theme.text}`}
            />
          </TouchableOpacity>
        }
      />
      <TabBarAllCourse />
    </Container>
  );
}

export default MostPopularCourse;
