import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Input = ({ style , ...props }) => {
  return (
    <TextInput
      style={{ ...styles.input, ...style }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height:60,
    paddingHorizontal:0,
    paddingVertical:19,
    marginHorizontal:16,
    color: Colors.TEXT_LIGHT,
    fontSize: 17,
    fontFamily: "jakarta",
    borderBottomWidth: 1,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    borderBottomColor: Colors.PRIMARY_DARK,
  },
});

export default Input;