import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  width,
} from '../constants';
import {useNavigation} from '@react-navigation/native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {Image} from 'react-native-animatable';
import Icon, {IconType} from './Icons';
import ImageModal from 'react-native-image-modal';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import PostOptionModal from './modals/PostOptionModal';
import {likePostToggleAction, postAction, viewProfile} from '../redux/slices';
import * as Animatable from 'react-native-animatable';
import {playLikeSound} from './SoundManager';

export default function PostCard(props) {
  const {item, onDeleteSuccess, isgroup, isevent} = props;
  const iconRefD = useRef(null);

  console.log(item);

  const navigation = useNavigation();

  const dispatcher = useDispatch();

  const {profile} = useSelector(state => state.profile);
  const [isLiked, setIsLiked] = useState(item.isLike ? item.isLike : false);

  const [postLikeCount, setpostLikeCount] = useState(
    parseFloat(item?.posts_likes_count),
  );
  const [ismodalOpen, setismodalOpen] = useState(false);

  const handlePress = () => {
    setismodalOpen(true);
  };

  const handleDeleteSuccess = isSuccess => {
    if (onDeleteSuccess) {
      onDeleteSuccess(isSuccess); // Call the callback function with the isSuccess value
    }
  };

  const getOtherUserProfile = data => {
    dispatcher(viewProfile(data))
      .unwrap()
      .then(response => {
        navigation.navigate(SCREENS.OtherProfile, {
          data: response?.data?.records,
        });
      })
      .catch(err => {
        console.log(err?.message);
        utils.errorAlert(err?.message);
      });
  };

  const handleButtonPress = async data => {
    playLikeSound();
    iconRefD.current.bounceIn(700);
    console.log(data);
    setIsLiked(!isLiked);
    setpostLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
    let likeData = {
      post_id: data,
    };
    dispatcher(likePostToggleAction(likeData))
      .unwrap()
      .then(response => {
        console.log('response', response);
        // utils.successAlert(response.message);
        // dispatcher(postAction());
        // navigation.goBack();
        // onDeleteSuccess(true);
      })
      .catch(error => {
        utils.errorAlert(error?.message);
        console.log('login error: ', error);
      });
  };

  return (
    <View style={styles.postCard}>
      <View
        style={{
          justifyContent: 'space-between',
          marginHorizontal: SIZES.fifteen,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <MyTouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              // navigation.navigate(SCREENS.OtherProfile);
              if (profile.id === item?.user?.id) {
                navigation.navigate(SCREENS.MyProfile);
                return;
              }

              getOtherUserProfile(item?.user?.id);
            }}>
            <View style={styles.avatar}>
              {item?.user?.image == null ? (
                <View>
                  <Text style={styles.avatarText}>
                    {item?.user?.name
                      ?.split(' ')
                      .map(item => item.charAt(0).toUpperCase())
                      .join('')}
                  </Text>
                </View>
              ) : (
                <Image
                  source={{uri: CONSTANTS.API_URLS.IMAGE + item?.user?.image}}
                  style={styles.avatarImage}
                  resizeMode="contain"
                />
              )}
            </View>

            {/* <Image
              source={{uri: CONSTANTS.API_URLS.IMAGE + item?.user?.image}}
              style={[styles.dp, {width: width * 0.1, height: width * 0.1}]}
              resizeMode="center"
            /> */}

            <View style={{flexDirection: 'column', marginLeft: SIZES.ten}}>
              <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
                {item?.user?.name}{' '}
                <Text
                  style={[
                    FONTS.mediumFont10,
                    {color: COLORS.brownGrey, textTransform: 'capitalize'},
                  ]}>
                  • {item?.set_availability}
                </Text>
              </Text>
              <Text style={[FONTS.mediumFont10, {color: COLORS.brownGrey}]}>
                {item?.created_at}
              </Text>
            </View>
          </MyTouchableOpacity>

          <MyTouchableOpacity onPress={handlePress}>
            <Icon
              type={IconType.Entypo}
              name="dots-three-vertical"
              style={{
                color: COLORS.blackWithOpacity,
                fontSize: SIZES.twenty,
              }}
            />
          </MyTouchableOpacity>
        </View>
        {/* {profile.bio && ( */}

        {item?.title && (
          <View>
            <Text
              style={[
                FONTS.mediumFont12,
                {marginVertical: SIZES.five + 2, color: COLORS.brownGrey},
              ]}>
              {item?.title}
            </Text>
          </View>
        )}
      </View>

      {item.type !== null ? (
        item?.image_file ? (
          <ImageModal
            resizeMode="cover"
            modalImageResizeMode="contain"
            style={[styles.postImage, {width: width * 1, height: width * 0.55}]}
            source={{uri: CONSTANTS.API_URLS.IMAGE + item?.image_file}}
          />
        ) : (
          <View>
            <Video
              source={{uri: CONSTANTS.API_URLS.IMAGE + item?.video_file}}
              style={[
                styles.postImage,
                {
                  width: width * 1,
                  height: width * 0.55,
                  backgroundColor: COLORS.textInput,
                },
              ]}
              controls={true}
              paused={true}
              showDuration={true}
              resizeMode="contain"
              controlsTimeout={1500}
            />
          </View>
        )
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.fifteen,
          alignItems: 'center',
        }}>
        <MyTouchableOpacity
          onPress={() => handleButtonPress(item?.id)}
          style={[styles.postActions]}>
          <Animatable.View ref={iconRefD}>
            <Icon
              type={IconType.Ionicons}
              name={isLiked ? 'heart' : 'heart-outline'}
              style={{
                color: isLiked ? COLORS.secondary : COLORS.black,
                fontSize: SIZES.twentyFive * 1.2,
              }}
            />
          </Animatable.View>
        </MyTouchableOpacity>

        <MyTouchableOpacity
          style={styles.postActions}
          onPress={() => navigation.navigate(SCREENS.Comments, {data: item})}>
          <Icon
            type={IconType.MaterialCommunityIcons}
            name="comment-text-outline"
            style={{
              color: COLORS.black,
              fontSize: SIZES.twentyFive,
              marginHorizontal: SIZES.fifteen,
            }}
          />
        </MyTouchableOpacity>
        <MyTouchableOpacity
          style={styles.postActions}
          onPress={() => {
            navigation.navigate(SCREENS.SharePost, {item: item});
          }}>
          <Icon
            type={IconType.Feather}
            name="send"
            style={{
              color: COLORS.black,
              fontSize: SIZES.twentyFive,
            }}
          />
        </MyTouchableOpacity>
      </View>
      <View style={{marginHorizontal: SIZES.fifteen}}>
        <Text
          style={[
            FONTS.mediumFont12,
            {
              color: COLORS.black,
            },
          ]}>
          {/* {item?.posts_likes_count?.toLocaleString('en-US')} likes */}
          {postLikeCount?.toLocaleString('en-US')} likes
        </Text>

        {item?.posts_comments?.length > 0 ? (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                FONTS.mediumFont12,
                {
                  color: COLORS.black,
                },
              ]}>
              {item?.posts_comments[0]?.user?.name}
            </Text>
            <Text
              style={[
                FONTS.lightFont14,
                {
                  marginLeft: SIZES.five,
                  color: COLORS.black,
                },
              ]}>
              {item?.posts_comments[item?.posts_comments.length - 1]?.comment}
            </Text>
          </View>
        ) : (
          <MyTouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.Comments, {
                data: item,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.ten,
            }}>
            <View style={styles.avatar}>
              {profile?.image == null ? (
                <View>
                  <Text style={styles.avatarText}>
                    {profile?.name
                      ?.split(' ')
                      .map(item => item.charAt(0).toUpperCase())
                      .join('')}
                  </Text>
                </View>
              ) : (
                <Image
                  source={{uri: CONSTANTS.API_URLS.IMAGE + profile?.image}}
                  style={[styles.avatarImage]}
                  resizeMode="contain"
                />
              )}
            </View>
            {/* <Image
              source={{uri: CONSTANTS.API_URLS.IMAGE + profile?.image}}
              style={[
                styles.tinyDp,
                {width: width * 0.08, height: width * 0.08},
              ]}
              resizeMode="center"
            /> */}
            <Text
              style={[
                FONTS.lightFont14,
                {
                  flex: 1,
                  color: COLORS.brownGrey,
                  marginLeft: SIZES.five,
                  backgroundColor: COLORS.textInput,
                  padding: SIZES.ten,
                  borderRadius: SIZES.ten,
                  overflow: 'hidden',
                },
              ]}>
              Add a comment...
            </Text>
          </MyTouchableOpacity>
        )}

        {item?.posts_comments?.length > 0 ? (
          <Pressable
            onPress={() => navigation.navigate(SCREENS.Comments, {data: item})}>
            <Text
              style={[
                FONTS.lightFont14,
                {
                  marginVertical: SIZES.five,
                  color: COLORS.brownGrey,
                },
              ]}>
              View all {item?.posts_comments_count} comments
            </Text>
          </Pressable>
        ) : null}
      </View>
      <PostOptionModal
        isevent={isevent}
        isgroup={isgroup}
        pressed={item}
        item={item}
        visibility={ismodalOpen}
        setVisibility={setismodalOpen}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainter: {
    flex: 1,
    backgroundColor: COLORS.white,
    // padding: SIZES.twenty,
    margin: SIZES.fifteen,
    borderRadius: SIZES.twenty,
  },
  dp: {
    borderRadius: SIZES.fifty,
    borderColor: COLORS.brownGrey,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
  },
  tinyDp: {
    backgroundColor: COLORS.textInput,
    borderRadius: SIZES.fifty,
  },
  postImage: {
    // borderRadius: SIZES.fifteen,
    // alignSelf: 'center',
    marginVertical: SIZES.ten,
    backgroundColor: COLORS.textInput,
  },
  postActions: {
    // paddingVertical: SIZES.five + 3,
  },
  separator: {
    marginVertical: SIZES.fifteen,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.brownGrey,
  },
  avatar: {
    borderRadius: SIZES.fifty,
    borderColor: COLORS.textInput,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.1,
    height: width * 0.1,
  },
  avatarText: {
    fontSize: SIZES.body14,
    // color: COLORS.secondary,
    color: '#517A95',
    fontFamily: FONTFAMILY.Medium,
  },
  avatarImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: SIZES.fifty,
    borderColor: COLORS.brownGrey,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
  },
});
