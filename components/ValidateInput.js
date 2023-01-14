import React, { useEffect, useReducer } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const ValidateInput = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    touched: false,
  });

  const { onInputChange = () => {}, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    // Check if its an email
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    // Validation of required - fails when text is empty
    if (props.required && text.trim().length === 0) isValid = false;
    // Validación de email - falla cuando el texto no tiene match con la expresión regular
    if (props.email && !emailRegex.test(text.toLowerCase())) isValid = false;
    // Email validation - fails when text does not match regular expression
    if (props.min != null && +text < props.min) isValid = false;
    // Maximum range validation - fails when numeric value is greater than maximum
    if (props.max != null && +text > props.max) isValid = false;
    // Size validation - fails when text does not have the required size
    if (props.minLength != null && text.length < props.minLength)
      isValid = false;

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid,
    });
  };

  const onBlurHandler = () => dispatch({ type: INPUT_BLUR });

  return (
    <View style={styles.formContainer}>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={props.placeHolder}
        onChangeText={textChangeHandler}
        onBlur={onBlurHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  input: {
    height: 60,
    paddingHorizontal: 0,
    paddingVertical: 19,
    marginHorizontal: 16,
    color: Colors.PRIMARY_DARK,
    fontSize: 17,
    fontFamily: "jakarta",
    borderBottomWidth: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: Colors.PRIMARY_DARK,
  },
  errorContainer: {
    marginTop: 6,
    marginBottom: 8,
  },
  errorText: {
    paddingHorizontal: 16,
    color: Colors.SECONDARY_DARK,
  },
});

export default ValidateInput;
