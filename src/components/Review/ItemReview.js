import ReadMore from '@fawazahmed/react-native-read-more';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import dayjs from 'dayjs';
import { collection, doc } from 'firebase/firestore';
import React from 'react';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import MyLoading from '~/base/components/MyLoading';
import Icon from '~/base/Icon';
import MyImage from '~/components/MyImage';
import { db } from '~/firebase/config';
import useTheme from '~/hooks/useTheme';
import useUser from '~/hooks/useUser';
import tw from '~/libs/tailwind';
import ModalCenter from '~/modals/ModalCenter';
import ModalEditReview from '~/screens/Detail/components/ModalEditReview';

function ItemReview({ review, refetch }) {
  const { theme } = useTheme();
  const { user: userCurrent } = useUser();
  const editRef = useRef();
  const userRef = doc(collection(db, 'users'), review?.userId?.toString());
  const { data: user, isLoading: isLoadingUser } = useFirestoreDocument(
    ['user', review?.userId],
    userRef,
  );
  const closeModal = () => {
    editRef?.current?.closeModal();
  };
  const openModal = () => {
    editRef?.current?.openModal();
  };
  if (isLoadingUser) {
    return <MyLoading />;
  } else {
    return (
      <View style={tw`px-5 py-3 shadow  `}>
        <ModalCenter touchDisable={true} ref={editRef}>
          <ModalEditReview
            close={closeModal}
            courseId={review?.courseId}
            rate={review?.rate}
            review={review?.review}
            refetch={refetch}
          />
        </ModalCenter>
        <View style={tw`flex-row items-start`}>
          <MyImage style={tw`h-7 w-7 rounded-full`} />
          <View style={tw`flex-1 ml-5 `}>
            <View style={tw`flex-row items-center justify-between  flex-1`}>
              <Text style={tw`font-qs-bold text-base `}>
                {user?.data()?.fullname}
              </Text>
              <View style={tw`flex-row items-center`}>
                <View
                  style={tw`flex-row border-2 border-blue px-3 py-[0.5px] rounded-full items-center`}>
                  <Icon
                    type="AntDesign"
                    name="star"
                    size={16}
                    color={tw.color('blue')}
                  />
                  <Text style={tw`ml-1 font-qs-bold text-base text-blue`}>
                    {review?.rate}
                  </Text>
                </View>
                {userCurrent?.userId === user?.data()?.userId ? (
                  <Menu>
                    <MenuTrigger>
                      <View
                        style={tw`h-6 w-6 justify-center items-center rounded-full border-2 border-${theme.text} ml-3`}>
                        <Icon
                          type="MaterialIcons"
                          name="more-horiz"
                          size={16}
                          color={theme.text}
                        />
                      </View>
                    </MenuTrigger>
                    <MenuOptions
                      optionsContainerStyle={tw`w-30 rounded-xl p-2`}>
                      <MenuOption onSelect={openModal}>
                        <Text
                          style={tw`font-qs-semibold text-sm text-${theme.text}`}>
                          Chỉnh sửa
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                ) : (
                  <View
                    style={tw`h-6 w-6 justify-center items-center rounded-full  ml-3`}
                  />
                )}
              </View>
            </View>
            <ReadMore
              numberOfLines={2}
              style={tw` font-qs-medium text-sm text-${theme.text}`}>
              {review?.review || ''}
            </ReadMore>
            <Text style={tw`mt-1 font-qs-medium text-gray text-xs`}>
              {dayjs(
                new Date(
                  review?.dateUpdated?.seconds * 1000 || review?.dateCreated,
                ),
              ).format('DD/MM/YYYY - HH:MM')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemReview;
