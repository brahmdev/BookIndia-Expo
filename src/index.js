import React from 'react';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootNavigation from "./navigation/Root-Navigation";

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({
  $rem: entireScreenWidth / 380
});

let RootNavigationEntry;
export default RootNavigationEntry = () => <RootNavigation />