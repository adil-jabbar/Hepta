import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ActionSheet from 'react-native-custom-actionsheet';
import MyTouchableOpacity from './MyTouchableOpacity';
import { COLORS, FONTS, height, SIZES, IMAGES, SCREENS, CONSTANTS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Icon, { IconType } from './Icons';
import Loader from '../components/loader';
import { getProductDetails } from '../redux/slices';




const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = ['Cancel', 'Edit', 'Delete'];
const title = 'What you wanna do?';

export default function EbookItem(props) {
  const navigation = useNavigation();
  const getActionSheetRef = React.createRef();


  let item = props.item




  const showActionSheet = () => getActionSheetRef.current.show();

  const handlePress = index => {
    if (index === 1) {
      navigation.navigate(SCREENS.EditProduct);
    }
  };


  return (
    <MyTouchableOpacity
      style={styles.containerProduct}
      onPress={() => {
        navigation.navigate(SCREENS.ProductDetail, { item: item, });
      }}

    >


      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <Image
          resizeMode="contain"
          source={{ uri: CONSTANTS.API_URLS.IMAGE + item?.cover_image }}
          style={[styles.imgStyle]}
        />
        <View style={{ marginStart: SIZES.ten, flexDirection: "column" }}>
          <Text
            numberOfLines={1}
            style={[
              FONTS.boldFont18,
              { color: COLORS.black, marginBottom: SIZES.ten },
            ]}>
            {item?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={[FONTS.mediumFont14, { color: COLORS.brownGray }]}>
            {'Fee: $'}{item?.price}
          </Text>
        </View>
      </View>



      <ActionSheet
        ref={getActionSheetRef}
        title={title}
        // message="custom message custom message custom message custom message custom message custom message "
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={handlePress}
      />

    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerProduct: {
    marginTop: SIZES.twenty,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: SIZES.ten,
    padding: SIZES.fifteen,
    marginHorizontal: SIZES.fifteen,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.twenty,
  },
  imgStyle: {
    width: height * 0.1,
    height: height * 0.1,
  },
  bioTextStyle: {
    color: COLORS.gray,
    width: SIZES.fifty * 3,
    marginTop: SIZES.five,
  },
  prescripView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: SIZES.ten,
  },
});
