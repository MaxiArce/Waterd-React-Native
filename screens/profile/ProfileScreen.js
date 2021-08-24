import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { logOut } from "../../store/actions/auth.actions";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const ProfileScreen = ({ navigation }) => {
  const displayName = useSelector((state) => state.auth.displayName);
  const plants = useSelector((state) => state.plants.list);
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
          <MaterialIcons name="logout" size={24} color={Colors.PRIMARY_DARK} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.profileInfoContainer}>
        <Image
          style={styles.profileBgImage}
          source={require("../../assets/images/ProfileBg.png")}
        ></Image>
        <Text style={styles.userName}>{displayName}</Text>
      </View>
      <Text style={styles.message}>Actualmente tienes {plants.length} plantas.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  profileInfoContainer: {
    width: "100%",
    height: 250,
    overflow: "hidden",
  },
  profileBgImage: {
    maxWidth: "100%",
    resizeMode: "cover",
    height: 250,
  },
  userName: {
    position: "absolute",
    bottom: 16,
    left: 16,
    color: Colors.TEXT_DARK,
    fontSize: 32,
    fontFamily: "canela-bold",
  },
  message: {
    padding: 22,
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'jakarta'
  }
});

export default ProfileScreen;
