import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from "../constants/colors";
import { PLANTS_ICONS } from "../constants/plantsIcons";

const IconPicker = ({onSelectedIcon}) => {

  const [plantsIconState, setPlantsIconState] = useState(PLANTS_ICONS);

  
  const onSelectedHandler = (item) => {
    const updatedList = plantsIconState.map((checkBoxItem) => {
      if (checkBoxItem.id === item.id) {
        onSelectedIcon(checkBoxItem.id)
        return { ...checkBoxItem, isChecked: true };
      } else {
        return { ...checkBoxItem, isChecked: false };
      }
    });
    setPlantsIconState(updatedList);
  };

  const renderIconOptionItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.iconOptionItem}
      onPress={() => {
        onSelectedHandler(item);
      }}
    >
      <View style={styles.iconOptionImageContainer}>
        <Image style={styles.iconOptionImage} source={item.image} />
      </View>
      <BouncyCheckbox
        size={25}
        fillColor={Colors.PRIMARY_LIGHT}
        unfillColor="white"
        disableBuiltInState
        isChecked={plantsIconState[index].isChecked}
        iconStyle={{ borderColor: Colors.PRIMARY_LIGHT }}
        onPress={() => {
          onSelectedHandler(item);
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.iconOptionContainer}
        horizontal
        showsHorizontalScrollIndicator = {false}
        data={PLANTS_ICONS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderIconOptionItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconOptionContainer: {
    height: 250,
    paddingBottom:11,
    marginBottom:11,
    paddingHorizontal: "25%",
    overflow: "hidden",
  },
  iconOptionItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconOptionImageContainer: {
    height: 200,
    width: 200,
    marginRight: 22,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: Colors.SECONDARY_LIGHT,
  },
  iconOptionImage: {
    alignSelf: "center",
    height: "100%",
    resizeMode: "contain",
  },
});

export default IconPicker;
