import * as React from 'react';
import {Easing, TextInput, Animated, View, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import {COLORS} from '../constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function CircularAnimation({
  percentage = 65,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = COLORS.primary,
  delay = 0,
  textColor,
  max = 100,
}) {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = toValue => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      //   animation(toValue === 0 ? percentage : 0);
    });
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener(
      v => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}`,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [max, percentage],
    );

    return () => {
      //   animated.removeAllListeners();
    };
  });

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{transform: [{rotate: '33deg'}]}}>
        <Svg
          height={halfCircle * 3}
          width={halfCircle * 3}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              ref={circleRef}
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDashoffset={circumference}
              strokeDasharray={circumference}
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeOpacity=".1"
              // strokeWidth="3"
            />
          </G>
        </Svg>
      </View>

      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {fontSize: halfCircle / 1.4, color: textColor ?? color},
          styles.text,
        ]}></AnimatedTextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
