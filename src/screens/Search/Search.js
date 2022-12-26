import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '~/base/Icon';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import tw from '~/libs/tailwind';

import TopModal from '~/modals/TopModal';
import ModalSearch from './ModalSearch';
import SearchCourse from './SearchCourse';
import SearchMentor from './SearchMentor';
// import Search from '~/components/Search';

function Search({ navigation }) {
  const { theme } = useTheme();
  const refFilter = useRef();
  const [searchValue, setSearchValue] = useState(null);
  const handleCloseModal = () => {
    refFilter?.current?.close();
  };
  // console.log(searchValue);
  const { search, cateSelect, type } = searchValue || {};
  return (
    <Container>
      <View style={tw`flex-1 bg-${theme.bg}`}>
        <Header title={'Tìm kiếm'} />
        <TouchableOpacity
          style={tw`mx-5 h-14 flex-row rounded-xl px-5 items-center bg-${theme.bgInput} shadow-lg`}
          onPress={() => refFilter?.current?.open()}>
          <Icon
            name="search"
            type="FontAwesome"
            size={20}
            color={tw.color('gray')}
          />
          <Text style={tw`font-qs-semibold text-gray ml-2`}>Tìm kiếm...</Text>
        </TouchableOpacity>
        <View style={tw`flex-1`}>
          {searchValue &&
            (type === 0 ? (
              <SearchCourse search={search} categoryId={cateSelect} />
            ) : (
              <SearchMentor search={search} />
            ))}
        </View>
      </View>

      <TopModal ref={refFilter}>
        <ModalSearch
          close={handleCloseModal}
          value={searchValue}
          setValue={setSearchValue}
        />
      </TopModal>
    </Container>
  );
}

export default Search;
