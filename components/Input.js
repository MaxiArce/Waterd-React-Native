import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Input = ({ style = {}, ...props }) => {
  return (
    <TextInput
      style={{ ...styles.input, ...style }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: '#EBEBF560',
    backgroundColor: Colors.secondary,
  },
});

export default Input;