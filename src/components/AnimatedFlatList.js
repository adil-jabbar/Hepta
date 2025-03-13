import React, {useState, useEffect} from 'react';
import {FlatList, LayoutAnimation, Platform, UIManager} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const AnimatedFlatList = ({data, ...rest}) => {
  const [items, setItems] = useState(data);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(data);
  }, [data]);

  return <FlatList data={items} {...rest} />;
};

export default AnimatedFlatList;
