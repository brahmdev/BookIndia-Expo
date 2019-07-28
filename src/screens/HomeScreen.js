import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { updateLoggedInUserData } from '../actions/userActions';
import {connect} from 'react-redux';
import { Google } from 'expo';
import {Toast} from "native-base";

const config = {
  androidClientId: "831107695187-hbkqprc3m3qgvml43435va3r3k7o41c4.apps.googleusercontent.com",
  androidStandaloneAppClientId: "831107695187-s45j5bt1i1gnep17s6li6mqeri5uoiqn.apps.googleusercontent.com",
  //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
  scopes: ["profile", "email"],
  redirectUrl: `com.bookindia:/oauth2redirect/google` // this is the LINE
};
class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    console.log('in receive props HomeScreen ', props.appToken, ' logged in ', props.isLoggedIn);
    if (props.isLoggedIn === undefined && props.appToken === undefined) {
      props.navigation.navigate('SignIn');
    }
    return true;
  }

  signOut = async () => {
    const { accessToken } = this.props;
    console.log('accessTOken  ', accessToken);
    const logoutResult = await Google.logOutAsync({ accessToken, ...config });
    console.log('logoutResult ', logoutResult)
    if (logoutResult.ok) {
     const user= {
        name: '',
        firstname: '',
        email: '',
        lastname: ''
      };
     const data = {
       user,
       appToken: '',
       isLoggedIn: false
     };
     this.props.updateLoggedInUserData(data);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <Text>Hello {this.props.name} !</Text>
          </View>
          <Button title="Sign out" onPress={() => this.signOut()}/>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {isLoggedIn, appToken, accessToken, firstname, lastname, name, email, photoUrl, loginError, isRequesting, loginErrorMessage} = state.user;
  return {isLoggedIn, appToken, accessToken, firstname, lastname, name, email, photoUrl, loginError, isRequesting, loginErrorMessage};
}

const mapDispatchToProps = {
  updateLoggedInUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
