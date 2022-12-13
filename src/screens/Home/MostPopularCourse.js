import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '~/base/Icon';
import TabBarCourse from '~/components/Course/TabBarCourse';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';

function MostPopularCourse() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <Container>
      <Header
        title={'Most Popular Courses'}
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
      <TabBarCourse scrollEnabled={true} />
    </Container>
  );
}

export default MostPopularCourse;
