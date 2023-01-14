import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import ValidateInput from "../../components/ValidateInput";
import Colors from "../../constants/colors";
import { login, signup } from "../../store/actions/auth.actions";
import CustomButton from "../../components/CustomButton";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Toast from "react-native-toast-message";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }

  return state;
};

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  //saves current selected tab of selector( log or register)
  const [selectedTab, setSelectedTab] = useState(0);

  //shows or hide button when is trying to log or register
  const [showIsLoading, setShowIsLoading] = useState(false);

  //shows toast if log was not successful
  useEffect(() => {
    if (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "An error has occurred.",
        text2: "😭",
      });
    }
  }, [error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      displayName: "",
      email: "",
      password: "",
    },
    inputValidities: {
      displayName: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const onInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  const onLoginHandler = async () => {
    try {
      setShowIsLoading(true);
      await dispatch(
        login(formState.inputValues.email, formState.inputValues.password)
      );
    } catch (err) {
      setShowIsLoading(false);
      setError(err.message);
    }
  };

  const onSignupHandler = async () => {
    try {
      setShowIsLoading(true);
      await dispatch(
        signup(
          formState.inputValues.displayName,
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
    } catch (err) {
      setShowIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Image
                  source={require("../../assets/images/Logo.png")}
                  style={styles.headerImage}
                ></Image>
                <Text style={styles.headerTitle}>waterd</Text>
              </View>
              <SegmentedControl
                values={["Login", "Register"]}
                style={styles.segmentedControl}
                tintColor={Colors.SECONDARY_LIGHT}
                backgroundColor={Colors.PRIMARY_DARK}
                selectedIndex={selectedTab}
                fontStyle={styles.segmentFontStyle}
                onChange={(event) => {
                  setSelectedTab(event.nativeEvent.selectedSegmentIndex);
                }}
              />
              {/* contidional render shows register or login component */}
              {selectedTab === 0 ? (
                <View>
                  <View>
                    <ValidateInput
                      id="email"
                      placeHolder="Email"
                      keyboardType="email-address"
                      required
                      email
                      autoCapitalize="none"
                      errorText="Please enter a valid email address"
                      onInputChange={onInputChangeHandler}
                      initialValue=""
                    />
                    <ValidateInput
                      id="password"
                      placeHolder="Password"
                      keyboardType="default"
                      secureTextEntry
                      required
                      minLength={6}
                      autoCapitalize="none"
                      errorText="Please enter a password of at least 6 characters."
                      onInputChange={onInputChangeHandler}
                      initialValue=""
                    />
                  </View>
                  <View style={styles.footer}>
                    <View style={styles.button}>
                      {showIsLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={Colors.PRIMARY_DARK}
                          style={{ padding: 22 }}
                        />
                      ) : (
                        <CustomButton
                          value="Login"
                          onPress={onLoginHandler}
                        />
                      )}
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <ValidateInput
                    id="displayName"
                    placeHolder="Name"
                    keyboardType="default"
                    minLength={4}
                    errorText="Please enter a valid name"
                    initialValue=""
                    onInputChange={onInputChangeHandler}
                  />
                  <ValidateInput
                    id="email"
                    placeHolder="Email"
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter a valid email address"
                    onInputChange={onInputChangeHandler}
                    initialValue=""
                  />
                  <ValidateInput
                    id="password"
                    placeHolder="Password"
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={6}
                    autoCapitalize="none"
                    errorText="Please enter a password of at least 6 characters"
                    onInputChange={onInputChangeHandler}
                    initialValue=""
                  />
                  <View style={styles.footer}>
                    <View style={styles.button}>
                      {showIsLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={Colors.PRIMARY_DARK}
                          style={{ padding: 22 }}
                        />
                      ) : (
                        <CustomButton
                          value="Register"
                          onPress={onSignupHandler}
                        />
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingTop: 22,
    width: "100%",
  },
  segmentedControl: {
    height: 44,
    marginHorizontal: 16,
    marginVertical: 22,
  },
  headerContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
  },
  headerImage: {
    height: 80,
    resizeMode: "contain",
  },
  headerTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 32,
    fontFamily: "canela-bold",
  },
  footer: {
    marginTop: 22,
  },
});

export default AuthScreen;
