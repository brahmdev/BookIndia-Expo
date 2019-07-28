import React, { Component } from 'react';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { memoize } from "../../helpers/Async-Helpers";
import curveLinesAnimation from "../../../assets/animations/curves-lines.json";
import Layout from "./Layout";
import {clearErrorMessage, login} from "../../actions/userActions";

class SplashScreen extends Component {

    state = {
        animation: null,
    };

    componentWillMount() {
        this.playAnimation();
    }

    componentDidMount() {
        this.initialize();
    }

    initialize = async () => {
        let { isLoggedIn } = this.props;
        let preparefonts = memoize(async () => this.loadFontsAsync());

        let letTheTimePass = memoize(async () => this.waitToShowSplashScreen());

        await Promise.all([preparefonts(), letTheTimePass()]);

        this.props.navigation.navigate(isLoggedIn ? 'App' : 'Auth');
    };

    loadFontsAsync = async () => {
        return Font.loadAsync({
            'Robotomedium': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
            'helvetica-neue': require('../../../assets/fonts/SpaceMono-Regular.ttf')
        });
    };

    waitToShowSplashScreen = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        });
    };

    setAnimationRef = animation => this.animation = animation;

    playAnimation = () => {
        if (!this.state.animation) {
            this.loadAnimationAsync();
        } else {
            this.animation.reset();
            this.animation.play();
        }
    };

    loadAnimationAsync = () => {
        this.setState({ animation: curveLinesAnimation }, this.playAnimation);
    };

    render() {
        let { animation } = this.state;
        return (
            <Layout animation={animation} setAnimationRef={this.setAnimationRef} />
        );
    }
}


SplashScreen.navigationOptions = () => ({
    header: null,
});

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage} = state.user;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage};
}

const mapDispatchToProps = {
  login,
  clearErrorMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
