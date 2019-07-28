import React, {Component} from 'react';
import { Dimensions } from "react-native";
import {Header, Left, Body, Icon, Title, View} from 'native-base';
import Colors from "../../constants/Colors";

const screen = Dimensions.get("window");

export default class HomeHeader extends Component {
  render() {
    return (
      <View style={{width: screen.width}} >

      <Header searchBar>
          <Body>
          <Title>
            <Icon name={'ios-home'} style={{color: Colors.noticeText}} color={Colors.noticeText}/>  Home
          </Title>
          </Body>
        </Header>
      </View>
    );
  }
}