import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';

function TopMentors() {
  const { theme } = useTheme();
  return (
    <Container>
      <Header
        title={'Top Mentors'}
        rightIcon={
          <TouchableOpacity>
            <Icon
              type="MaterialIcons"
              name="more-horiz"
              size={30}
              color={`${theme.text}`}
            />
          </TouchableOpacity>
        }
      />
    </Container>
  );
}

export default TopMentors;
