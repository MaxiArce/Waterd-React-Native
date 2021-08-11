import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import { logOut } from "../../store/actions/auth.actions";

const ProfileScreen = ({navigation}) => {

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(logOut())
  }

  return (
    <View style={styles.screen}>
        <Text>{`ID de usuario:${user}`}</Text>
        <CustomButton value="Cerrar sesión" onPress={logoutHandler}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1
  },
});

export default ProfileScreen;
