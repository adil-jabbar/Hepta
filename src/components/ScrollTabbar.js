import React from 'react';
import {Text, Dimensions, Animated, I18nManager} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TabBar} from 'react-native-tab-view';
import {COLORS, FONTFAMILY, FONTS, SIZES} from '../constants';

const {width, height} = Dimensions.get('window');

export function ScrollTabBar(props) {
  if (props.adjust) {
    const renderIndicator = (
      props: SceneRendererProps & {
        navigationState: State,
        getTabWidth: (i: number) => number,
      },
    ) => {
      const {position, navigationState, getTabWidth} = props;
      const inputRange = [0, 3];

      const scale = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
      });

      const opacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => {
          const d = x - Math.trunc(x);
          return d === 0.49 || d === 0.51 ? 0 : 1;
        }),
      });

      const translateX = position.interpolate({
        inputRange: inputRange,
        outputRange: inputRange.map(x => {
          const i = Math.round(x);
          return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1);
        }),
      });

      return (
        <Animated.View
          style={[
            //   styles.container,
            {
              width: `${100 / navigationState.routes.length}%`,
              transform: [{translateX}],
              position: 'absolute',
              bottom: 0,
            },
          ]}>
          <LinearGradient
            // key={index}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={[COLORS.secondary, COLORS.primary]}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 5,
              width: '100%',
            }}
          />
        </Animated.View>
      );
    };

    return (
      <TabBar
        {...props}
        // scrollEnabled={true}
        pressOpacity={0.85}
        labelStyle={FONTS.mediumFont14}
        pressColor={COLORS.primary}
        activeColor={COLORS.secondary}
        inactiveColor={COLORS.brownGray}
        style={{backgroundColor: COLORS.white}}
        tabStyle={{
          // width: 'auto',
          // paddingHorizontal: SIZES.fifty,
                    // marginHorizontal: SIZES.fifteen,

          // backgroundColor: 'pink',
          // width: width * 0.32,
        }}
        renderIndicator={renderIndicator}
        indicatorStyle={{width: 60}}
        renderLabel={({route, focused}) => (
          <Text
            numberOfLines={1}
            style={[
              {
                fontSize: SIZES.h16,
                textTransform: 'capitalize',
                fontFamily: FONTFAMILY.Medium,
                color: focused ? COLORS.secondary : COLORS.brownGray,
              },
            ]}>
            {route.title}
          </Text>
        )}
      />
    );
  } else {
    const renderIndicator = (
      props: SceneRendererProps & {
        navigationState: State,
        getTabWidth: (i: number) => number,
        noIndicator: any,
      },
    ) => {
      const {position, navigationState, getTabWidth, noIndicator} = props;
      const inputRange = [0, navigationState.routes.length - 1];

      const scale = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
      });

      const opacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => {
          const d = x - Math.trunc(x);
          return d === 0.49 || d === 0.51 ? 0 : 1;
        }),
      });

      const translateX = position.interpolate({
        inputRange: inputRange,
        outputRange: inputRange.map(x => {
          const i = Math.round(x);
          return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1);
        }),
      });

      return (
        <Animated.View
          style={[
            //   styles.container,
            {
              width: `${100 / navigationState.routes.length}%`,
              transform: [{translateX}],
              position: 'absolute',
              bottom: 0,
            },
          ]}>
          <LinearGradient
            // key={index}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={[COLORS.secondary, COLORS.primary]}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 5,
              width: '100%',
            }}
          />
        </Animated.View>
      );
    };

    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        pressOpacity={0.85}
        // labelStyle={FONTS.mediumFont12}
        pressColor={COLORS.primary}
        activeColor={COLORS.secondary}
        inactiveColor={COLORS.brownGray}
        style={{backgroundColor: COLORS.white}}
        tabStyle={{
          width: 'auto',
          // marginHorizontal: SIZES.fifteen,
          // width: width * 0.32,
        }}
        renderIndicator={props.noIndicator ? () => null : renderIndicator}
        indicatorStyle={{width: 60}}
        renderLabel={({route, focused}) => (
          <Text
            // numberOfLines={1}
            style={[
              {
                fontSize: SIZES.body14,
                fontFamily: FONTFAMILY.Medium,
                color: focused ? COLORS.white : COLORS.black,
                backgroundColor: focused ? COLORS.primary : COLORS.white,
                paddingHorizontal: SIZES.ten,
                paddingVertical: SIZES.five,
                borderRadius: SIZES.fifteen,
                overflow: 'hidden',
              },
            ]}>
            {route.title}
          </Text>
        )}
      />
    );
  }
}
