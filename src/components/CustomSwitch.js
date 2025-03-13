import React from 'react';
import {StyleSheet} from 'react-native';
import {Switch} from 'react-native-switch';
import {COLORS, SIZES} from '../constants';

export default function CustomSwitch(props) {
  const {value, onValueChange} = props;

  return (
    <Switch
      value={value}
      onValueChange={val => onValueChange(val)}
      disabled={false}
      activeText={'On'}
      inActiveText={'Off'}
      circleBorderWidth={0}
      circleSize={SIZES.twenty}
      barHeight={SIZES.five * 1.6}
      backgroundActive={COLORS.gray + 90}
      backgroundInactive={COLORS.gray + 90}
      circleActiveColor={COLORS.primary}
      circleInActiveColor={COLORS.gray}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
      innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}} // style for inner animated circle for what you (may) be rendering inside the circle
      outerCircleStyle={{}} // style for outer animated circle
    />
  );
}

const styles = StyleSheet.create({});
