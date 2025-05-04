import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, IMAGES, SIZES} from '../constants';
import Icon, {IconType} from './Icons';

export default function SearchBar(props: TextInputProps) {
  const {
    searchText,
    setSearchText,
    showFilterIcon,
    showSearchIcon,
    onPressFilter,
    onPressSearch,
    containerStyle,
    disabled,
    onSubmitEditing,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <MyTouchableOpacity style={styles.searchView} onPress={onPressSearch}>
        {showSearchIcon && (
          <Icon
            type={IconType.Feather}
            name={'search'}
            style={{
              color: COLORS.brownGrey,
              fontSize: SIZES.twentyFive,
              marginRight: SIZES.ten,
            }}
          />
        )}

        <TextInput
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          returnKeyType="search"
          value={searchText}
          placeholder="Search"
          // editable={!onPressSearch}
          onChangeText={setSearchText}
          placeholderTextColor={COLORS.black}
          style={styles.textInputStyle}
          onSubmitEditing={event => {
            onSubmitEditing(event.nativeEvent.text);
          }}
        />
      </MyTouchableOpacity>

      {showFilterIcon && (
        <MyTouchableOpacity
          onPress={onPressFilter}
          style={{marginLeft: SIZES.ten}}>
          <Icon
            name="filter"
            type={IconType.Ionicons}
            style={{
              color: COLORS.charcoalGrey,
              fontSize: SIZES.twenty,
            }}
          />
        </MyTouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
    marginVertical: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    paddingHorizontal: SIZES.twenty,
    // backgroundColor: COLORS.gray,
  },
  iconStyle: {
    width: SIZES.twenty,
    height: SIZES.twenty,
    tintColor: COLORS.gray,
  },
  textInputStyle: {
    flex: 1,
    height: 50,
    color: COLORS.black,
  },
  searchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
