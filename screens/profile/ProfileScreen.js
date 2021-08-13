import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton";
import { logOut } from "../../store/actions/auth.actions";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const ProfileScreen = ({ navigation }) => {
  const displayName = useSelector((state) => state.auth.displayName);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOut());
  };

  //set the right icon to the navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        paddingEnd: 16,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            logoutHandler();
          }}
        >
          <AntDesign name="logout" size={24} color={Colors.PRIMARY_DARK} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Text>{displayName}</Text>
      <CustomButton
        value="Cerrar sesión"
        onPress={logoutHandler}
      ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ProfileScreen;
