import React from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from "react-native";
import {Text, UserAvatar, ListFooterLoading} from "../../components";
import {Male, Female} from "../../../assets/icons";
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

const UserItem = ({item, onPressItem}) => {
  if (item.username !== '') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={() => onPressItem(item)}>
          <UserAvatar large style={styles.avatar} uri={item.avatar}/>
          <View style={styles.captions}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <Text small style={styles.title}>
                {`${item.firstname} ${item.lastname}`}
              </Text>
              <View style={styles.gender}>
                {item.gender == "Male" ? <Male/> : <Female/>}
              </View>
            </View>
            <Text small style={styles.subtitle}>
              {`${item.studentDetailses[0].batch.standard.name}/${item.studentDetailses[0].batch.name}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
};

const UsersList = ({listProps}) => {
  return (
    <Container>
      <Header />
      <Content>
        <List>
          <ListItem>
            <Text>Simon Mignolet</Text>
          </ListItem>
          <ListItem>
            <Text>Nathaniel Clyne</Text>
          </ListItem>
          <ListItem>
            <Text>Dejan Lovren</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12
  },
  avatar: {
    flex: 1,
    borderWidth: 2,
    aspectRatio: 1,
    borderRadius: 50
  },
  touchable: {
    flex: 1,
    flexDirection: 'row'
  },
  captions: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: '#313131',
    paddingBottom: 2,
    paddingLeft: 8
  },
  gender: {
    paddingBottom: 2,
    paddingRight: 8
  },
  subtitle: {
    color: '#B5B5B5',
    paddingTop: 2,
    paddingLeft: 8
  },
});

export default UsersList;
