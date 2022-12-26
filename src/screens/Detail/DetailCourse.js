import React from 'react';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import MyButton from '~/components/MyButton';
import useTheme from '~/hooks/useTheme';
import Container from '~/layouts/Container';
import tw from '~/libs/tailwind';
import BottomModal from '~/modals/BottomModal';
import ItemCourse from '../../components/Course/ItemCourse';
import MyTabBar from './layouts/Course/MyTabBar';
import Header from './layouts/Course/Header';
import ButtonEnrolCourse from '~/components/ButtonEnrollCourse';
import { CourseProvider } from '~/provider/CourseProvider';
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '~/firebase/config';
import useUser from '~/hooks/useUser';
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { formatNumber } from '~/utils';
import MyToast from '~/base/components/MyToast';
import MyLoadingFull from '~/base/components/MyLoadingFull';
import { useState } from 'react';

function DetailCourse({ navigation, route }) {
  const { dataId } = route.params;
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const modalRef = useRef();
  const notEnoughMoneyRef = useRef();
  const enrollCourseRef = useRef();
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const courseRef = doc(collection(db, 'courses'), dataId?.toString());
  const { data: course, isLoading: isLoadingCourse } = useFirestoreDocument(
    ['course', dataId],
    courseRef,
  );
  const myCourseRef = query(
    collection(db, 'mycourse'),
    where('status', '!=', 0),
    where('courseId', '==', dataId),
  );
  const { data: myCourseEnroll, isLoading: isLoadingCourseEnroll } =
    useFirestoreQuery(['mycourse-enroll', dataId], myCourseRef, {
      subscribe: true,
    });
  const lessonsRef = query(
    collection(db, 'lessons'),
    where('courseId', '==', dataId),
  );
  const { data: lessons, isLoading: isLoadingLessons } = useFirestoreQuery(
    ['lessons', dataId],
    lessonsRef,
    { subscribe: true },
  );
  const reviewRef = query(
    collection(db, 'myreview'),
    where('courseId', '==', dataId),
  );
  const { data: reviews, isLoading: isLoadingReview } = useFirestoreQuery(
    ['review', dataId],
    reviewRef,
    { subscribe: true },
  );
  const avgRate =
    reviews?.docs?.reduce((total, current) => {
      return total + current?.data()?.rate;
    }, 0) / reviews?.docs?.length || false;

  const totalTime = lessons?.docs?.reduce((total, current) => {
    return total + current?.data()?.time;
  }, 0);
  const docRef = doc(
    db,
    'mycourse',
    user?.userId?.toString() + dataId.toString(),
  );
  const {
    data: myCourse,
    isLoading: isLoadingMyCourse,
    refetch,
  } = useFirestoreDocument(
    ['mycourse', user?.userId?.toString() + dataId.toString()],
    docRef,
  );
  const lessonFirstRef = query(
    collection(db, 'lessons'),
    where('courseId', '==', dataId),
    where('index', '==', 1),
  );
  const { data: lessonsFirst, isLoading: isLoadingLessonFirst } =
    useFirestoreQuery(['lessonFirst', dataId], lessonFirstRef, {
      subscribe: true,
    });
  const mutationCourse = useFirestoreDocumentMutation(
    docRef,
    { merge: true },
    { onSettled: refetch },
  );
  const handleBookmark = async () => {
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      if (docsnap.data().isBookmark) {
        modalRef?.current?.open();
      } else {
        const param = {
          ...myCourse?.data(),
          isBookmark: true,
        };
        mutationCourse.mutate(param);
      }
    } else {
      const params = {
        userId: user.userId,
        courseId: dataId,
        isBookmark: true,
        status: 0,
      };
      mutationCourse.mutate(params);
    }
  };
  const handleCloseModal = ref => {
    ref?.current?.close();
  };
  const handleRemoveBookmark = () => {
    const param = {
      ...myCourse?.data(),
      isBookmark: false,
    };
    mutationCourse.mutate(param);
    modalRef?.current?.close();
  };
  const handleCheckCoins = () => {
    const coins = user?.coins;
    if (coins >= course?.data()?.price) {
      enrollCourseRef?.current?.open();
    } else {
      notEnoughMoneyRef?.current?.open();
    }
  };
  const goToTransaction = () => {
    notEnoughMoneyRef?.current?.close();
    navigation.navigate('Transaction');
  };
  const setCoinsUser = () => {
    try {
      const newMycoins = user?.coins - course?.data()?.price;
      const userParam = {
        ...user,
        coins: newMycoins,
      };
      setUser(userParam);
      const userRef = doc(db, 'users', user?.userId?.toString());
      setDoc(userRef, { coins: newMycoins }, { merge: true });
      toastRef?.current?.open(true, 'Bạn đã tham gia khóa học thành công!');
    } catch (e) {
      console.log('error enroll course(exist): ', e);
      toastRef?.current?.open(true, 'Tham gia khóa học thất bại!');
    }
    enrollCourseRef?.current?.close();
  };
  const handleEnrollCourse = async () => {
    setLoading(true);
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      const param = {
        ...myCourse?.data(),
        status: 1,
      };
      mutationCourse.mutate(param);
      setCoinsUser();
    } else {
      const params = {
        userId: user.userId,
        courseId: dataId,
        isBookmark: false,
        status: 1,
      };
      mutationCourse.mutate(params);
      setCoinsUser();
    }
    const userId = user?.userId;
    const mentorId = course?.data()?.mentorID;
    await setDoc(doc(db, 'class', userId?.toString() + mentorId?.toString()), {
      userId,
      mentorID: mentorId,
    });
    await setDoc(
      doc(
        db,
        'mylesson',
        userId?.toString() +
          lessonsFirst?.docs[0]?.data()?.lessonId?.toString(),
      ),
      {
        userId,
        lessonId: lessonsFirst?.docs[0]?.data()?.lessonId,
        status: 0,
      },
    );
    setLoading(false);
  };
  if (
    isLoadingMyCourse ||
    isLoadingLessons ||
    isLoadingReview ||
    isLoadingLessonFirst ||
    isLoadingCourse ||
    isLoadingCourseEnroll
  ) {
    return <MyLoadingFull text={'Đang tải dữ liệu...'} />;
  } else {
    return (
      <Container>
        <CourseProvider
          course={course?.data()}
          rate={avgRate}
          countStudent={myCourseEnroll?.docs?.length}
          countLesson={lessons?.docs?.length}
          totalTime={totalTime}
          review={reviews?.docs?.length}>
          <View style={tw`flex-1`}>
            <View style={tw`flex-1`}>
              <View style={[tw`flex-1`]}>
                <MyToast ref={toastRef} />
                <Header
                  handleBookmark={handleBookmark}
                  isBookmark={myCourse?.data()?.isBookmark || false}
                />
                <View style={tw`flex-1`}>
                  <MyTabBar />
                </View>
              </View>
              {(myCourse?.data()?.status === 0 || !myCourse.exists()) && (
                <ButtonEnrolCourse onPress={handleCheckCoins} />
              )}
            </View>
          </View>
        </CourseProvider>
        {loading && <MyLoadingFull />}
        <BottomModal ref={modalRef}>
          <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
            <View
              style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
              <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                Bỏ đánh dấu khóa học này?
              </Text>
            </View>
            <ItemCourse courseId={dataId} canPress={false} />
            <View
              style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
              <MyButton
                title={'Hủy'}
                style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
                titleColor={tw.color('blue')}
                onPress={() => handleCloseModal(modalRef)}
              />
              <MyButton
                title={'Bỏ đánh dấu'}
                style={tw`flex-1 h-14 bg-blue ml-2`}
                titleColor={tw.color('white')}
                onPress={handleRemoveBookmark}
              />
            </View>
          </View>
        </BottomModal>
        <BottomModal ref={notEnoughMoneyRef}>
          <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
            <View
              style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
              <View>
                <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                  Bạn không đủ tiền để mua khóa học này!
                </Text>
              </View>
              <View style={tw`flex-row items-center justify-center w-[96%]`}>
                <Text style={tw`font-qs-regular text-sm text-${theme.text}`}>
                  Số tiền hiện tại: {formatNumber(user?.coins)} đ
                </Text>
                {/* <Text style={tw`font-qs-regular text-xs text-${theme.text}`}>
                    Course price: {formatNumber(data?.price)} đ
                  </Text> */}
              </View>
            </View>
            <ItemCourse courseId={dataId} canPress={false} />
            <View
              style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
              <MyButton
                title={'Hủy'}
                style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
                titleColor={tw.color('blue')}
                onPress={() => handleCloseModal(notEnoughMoneyRef)}
              />
              <MyButton
                title={'Tới nạp tiền'}
                style={tw`flex-1 h-14 bg-blue ml-2`}
                titleColor={tw.color('white')}
                onPress={goToTransaction}
              />
            </View>
          </View>
        </BottomModal>
        <BottomModal ref={enrollCourseRef}>
          <View style={tw`pb-10 rounded-t-3xl bg-${theme.bg}`}>
            <View
              style={tw`py-5 items-center mx-5 border-b-[0.2px] border-gray`}>
              <View>
                <Text style={tw`font-qs-bold text-lg text-${theme.text}`}>
                  Bạn chắc chắn muốn mua khóa học này?
                </Text>
              </View>
              <View style={tw`flex-row items-center justify-center w-[96%]`}>
                <Text style={tw`font-qs-regular text-sm text-${theme.text}`}>
                  Số tiền hiện tại: {formatNumber(user?.coins)} đ
                </Text>
                {/* <Text style={tw`font-qs-regular text-xs text-${theme.text}`}>
                    Course price: {formatNumber(data?.price)} đ
                  </Text> */}
              </View>
            </View>
            <ItemCourse courseId={dataId} canPress={false} />
            <View
              style={tw`flex-row items-center h-16 mt-6 overflow-hidden px-5`}>
              <MyButton
                title={'Hủy'}
                style={tw`flex-1 h-14 bg-blueOpacity mr-2`}
                titleColor={tw.color('blue')}
                onPress={() => handleCloseModal(enrollCourseRef)}
              />
              <MyButton
                title={'Đồng ý'}
                style={tw`flex-1 h-14 bg-blue ml-2`}
                titleColor={tw.color('white')}
                onPress={handleEnrollCourse}
              />
            </View>
          </View>
        </BottomModal>
      </Container>
    );
  }
}

export default DetailCourse;
