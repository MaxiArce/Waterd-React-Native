import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const WateringProgressBar = ({
  wateringDays,
  wateringTimeStamp,
  progressWidth,
  showDetails,
}) => {
  let progress = 0;
  let dif = 0;

  //get dif between the time stamp and the current time and provides the progress for the progress bar
  if (wateringTimeStamp) {
    const currentDate = new Date();
    const lastWateringDate = new Date(wateringTimeStamp);
    dif = (currentDate - lastWateringDate) / (1000 * 3600 * 24);
    progress = 1 - dif / wateringDays;
  }

  return (
    <View style={styles.container}>
      {showDetails && (
        <Text style={styles.wateringStatusText}>
          Tu planta debe regarse cada {wateringDays} días
        </Text>
      )}

      <View style={styles.wateringProgressBarContainer}>
        <View>
          <Progress.Bar
            size={wateringDays}
            height={7}
            borderRadius={10}
            progress={progress}
            width={progressWidth}
            color={progress > 0 ? Colors.PRIMARY_DARK : Colors.WARNING}
          />
        </View>
        <Ionicons
          name="ios-water"
          size={24}
          color={progress > 0 ? Colors.PRIMARY_DARK : Colors.WARNING}
        />
      </View>

      {showDetails && (
        <Text style={styles.wateringStatusText}>
          Siguiente riego en {dif.toFixed(0)} días
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  wateringProgressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wateringStatusText: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "jakarta-bold",
    color: Colors.PRIMARY_DARK,
  },
});

export default WateringProgressBar;
