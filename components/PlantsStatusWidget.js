import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import { Feather, AntDesign } from "@expo/vector-icons";
import PlantWateringCard from "../components/PlantWateringCard";

const PlantsStatusWidget = ({ navigation, needAttentionList }) => { 

  return (
    <View>
      {needAttentionList.length === 0 ? (
        <View style={styles.statusContainer}>
          <View style={styles.statusCardContainer}>
            <AntDesign
              name="checkcircleo"
              size={24}
              color={Colors.PRIMARY_LIGHT}
              style={{ paddingVertical: 11 }}
            />
            <Text style={styles.statusCommentText}>
              Tus plantas se encuentran bien.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.statusContainer}>
          <View style={styles.statusCardContainer}>
            <AntDesign
              name="exclamationcircleo"
              size={24}
              color={Colors.WARNING}
              style={{ paddingVertical: 11 }}
            />
            <Text style={styles.statusCommentText}>
              Tus plantas necesitan atención.
            </Text>
          </View>
          <Feather
            name="chevron-down"
            nestedScrollEnabled={true}
            size={24}
            color={Colors.SECONDARY_DARK}
            style={{ paddingVertical: 11 }}
          />
          {needAttentionList.map((item,index) =>{
            return <PlantWateringCard key={index} item={item} showDetails={false}/>
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  statusCardContainer: {
    width: "100%",
    alignItems: "center",
    padding: 11,
    borderRadius: 11,
    backgroundColor: Colors.SECONDARY_LIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  statusCommentText: {
    textAlign: "center",
    fontFamily: "jakarta-bold",
    fontSize: 15,
    color: Colors.TEXT_DARK,
  },
  listContainer: {
    width: "100%",
  },
});

export default PlantsStatusWidget;
