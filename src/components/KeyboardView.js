import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';

const KeyboardView = ({ style, keyboardVerticalOffset, children }) => (
  <KeyboardAvoidingView style={style} keyboardVerticalOffset={keyboardVerticalOffset} behavior={'padding'}>
    {children}
  </KeyboardAvoidingView>
);

const behavior = (Platform.OS === 'ios') ? 'padding' : null;

export { KeyboardView };
