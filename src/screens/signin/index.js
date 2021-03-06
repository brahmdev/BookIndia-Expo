import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Text} from 'react-native';
import {loginWithToken, updateLoggedInUserData, clearErrorMessage} from '../../actions/userActions';
import {Loading} from '../../components/Loading';
import {
  View,
  Toast,
} from "native-base";
import styles from "./style";
import {Google} from 'expo';
import {GoogleLoginButton} from '../../components/GoogleLoginButton';
import colors from '../../utils/Colors';
import NavigationService from "../../navigation/Navigation-Service";
import LoadingView from '../../components/Loading';
import imgAppIcon from '../../../assets/images/logo_without_name.png';
import imgGoogleIcon from '../../../assets/images/google-icon.png'

const bg = require("../../../assets/images/bg.png");
const logo = require("../../../assets/images/logo.png");


const config = {
  androidClientId: "831107695187-hbkqprc3m3qgvml43435va3r3k7o41c4.apps.googleusercontent.com",
  androidStandaloneAppClientId: "831107695187-s45j5bt1i1gnep17s6li6mqeri5uoiqn.apps.googleusercontent.com",
  //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
  scopes: ["profile", "email"],
  redirectUrl: `com.bookindia:/oauth2redirect/google` // this is the LINE
};

class SignInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: {},
      isRequesting: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loginErrorMessage !== '') {
      Toast.show({
        text: props.loginErrorMessage,
        duration: 2500,
        position: "bottom",
        type: 'danger',
        buttonText: 'Dismiss',
        textStyle: {textAlign: "center"}
      });
    }
    if (!props.isRequesting) {
      props.clearErrorMessage();
    }
    console.log('in receive props ', props.appToken, ' logged in ', props.isLoggedIn);
    if (props.isLoggedIn && props.appToken !== '') {
      props.navigation.navigate('Main');
    }
    return true;
  }

  signIn = async () => {
    try {
      console.log('expo ', Google);
      const result = await Google.logInAsync(config);

      if (result.type === "success") {
        console.log(result);
        this.props.loginWithToken(result.idToken);
        result.isLoggedIn = true;
        this.props.updateLoggedInUserData(result);
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      alert("error", e);
    }
  };

  renderLoading() {
    return <LoadingView/>;
  }

  renderWelcome() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.welcomeViewStyle}>
          <Image style={styles.imageStyle} source={imgAppIcon}/>

          <Text style={styles.titleStyle}>
            Welcome to BookIndia
          </Text>
        </View>

        <GoogleLoginButton
          style={styles.buttonStyle}
          color={colors.red}
          icon={imgGoogleIcon}
          title="Connect with Google"
          onPress={() => this.signIn()}
        />
      </View>
    );
  }

  render() {
    if (this.props.isRequesting) {
      return this.renderLoading();
    }
    return this.renderWelcome();
  }
}

SignInScreen.navigationOptions = () => ({
  header: null,
});

function mapStateToProps(state) {
  const {isLoggedIn, appToken, authorities, loginError, isRequesting, loginErrorMessage} = state.user;
  return {isLoggedIn, appToken, authorities, loginError, isRequesting, loginErrorMessage};
}

const mapDispatchToProps = {
  loginWithToken,
  updateLoggedInUserData,
  clearErrorMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
