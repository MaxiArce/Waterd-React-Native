import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import ValidateInput from "../../components/ValidateInput";
import Colors from "../../constants/colors";
import { login, signup } from "../../store/actions/auth.actions";
import CustomButton from "../../components/CustomButton";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

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
  //saves current selected tab
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (error) {
      Alert.alert("Ha ocurrido un error", error, [{ text: "Ok" }]);
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
      await dispatch(
        login(formState.inputValues.email, formState.inputValues.password)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const onSignupHandler = async () => {
    try {
      await dispatch(
        signup(formState.inputValues.displayName,formState.inputValues.email, formState.inputValues.password)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Text style={styles.appTitle}>Mis Plantas</Text>
              <SegmentedControl
                values={["Iniciar Sesión ", "Registrarse"]}
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
                      errorText="Por favor ingrese un email válido"
                      onInputChange={onInputChangeHandler}
                      initialValue=""
                    />
                    <ValidateInput
                      id="password"
                      placeHolder="Clave"
                      keyboardType="default"
                      secureTextEntry
                      required
                      minLength={6}
                      autoCapitalize="none"
                      errorText="Por favor ingrese una clave de al menos 6 caracteres"
                      onInputChange={onInputChangeHandler}
                      initialValue=""
                    />
                  </View>
                  <View style={styles.footer}>
                    <View style={styles.button}>
                      <CustomButton
                        value="Iniciar sesión"
                        onPress={onLoginHandler}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                    <ValidateInput
                      id="displayName"
                      placeHolder="Nombre"
                      keyboardType="default"
                      minLength={4}
                      errorText="Por favor ingrese un nombre válido"
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
                      errorText="Por favor ingrese un email válido"
                      onInputChange={onInputChangeHandler}
                      initialValue=""
                    />
                    <ValidateInput
                      id="password"
                      placeHolder="Clave"
                      keyboardType="default"
                      secureTextEntry
                      required
                      minLength={6}
                      autoCapitalize="none"
                      errorText="Por favor ingrese una clave de al menos 6 caracteres"
                      onInputChange={onInputChangeHandler}
                      initialValue=""
                    />
                  <View style={styles.footer}>
                    <View style={styles.button}>
                      <CustomButton
                        value="Registrarse"
                        onPress={onSignupHandler}
                      />
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
  segmentFontStyle: {
    // fontFamily: 'jakarta',
  },
  appTitle: {
    paddingHorizontal: 16,
    fontSize: 34,
    fontFamily: "canela-bold",
  },
});

export default AuthScreen;
