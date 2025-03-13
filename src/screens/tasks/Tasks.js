import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Delivered from './Delivered';
import Pending from './Pending';
import Reattempt from './Reattempt';
import {CustomHeader} from '../../components';
import {COLORS, FONTS, SIZES} from '../../constants';
import { useSelector } from 'react-redux';

const renderScene = SceneMap({
  second: () => <Pending item={'pending'} />, // Pass parameter to Pending
  first: () => <Delivered item={'delivered'}/>,
  third: () => <Reattempt item={'reattempt'}/>,
});

const routes = [
  {key: 'second', title: 'Pending'},
  {key: 'first', title: 'Delivered'},
  {key: 'third', title: 'Reattempt'},
];

const renderTabBar = props => {
  const {index} = props.navigationState;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: null,
          justifyContent: 'center', // Centering the tabs
        }}>
        {props.navigationState.routes.map((route, i) => (
          <TouchableOpacity
            key={i}
            style={{
              flex: 1,
              paddingVertical: SIZES.five, // Adjust vertical padding
              alignItems: 'center',
              marginHorizontal: SIZES.ten, // Adjust space between tabs
              backgroundColor: index === i ? COLORS.primary : COLORS.white,
              borderWidth: 1,
              borderColor: index === i ? COLORS.primary : COLORS.primary,
              borderRadius: SIZES.five + 2,
            }}
            onPress={() => props.jumpTo(route.key)}>
            <Text
              style={[
                FONTS.mediumFont14,
                {
                  color: index === i ? '#fff' : COLORS.primary,
                  fontWeight: index !== i ? '' : 'bold',
                },
              ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          marginTop: SIZES.twenty,
          borderColor: COLORS.brownGrey,
        }}
      />
    </View>
  );
};




export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const cancel = useSelector(state => state.orders);

  console.log("PENDing", cancel);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <CustomHeader showBackButton title={'Tasks'} />
      <View style={{marginVertical: SIZES.five}} />
      <TabView
        lazy={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}
