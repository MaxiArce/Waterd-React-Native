import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'; 


const WateringDaysPicker = ({onSelected}) => {

  const [wateringDays, setWateringDays] = useState(1)


  return (
    <View style={styles.container}>
      <Text style={styles.daysText}>{wateringDays} Días</Text>
      <View style={styles.sliderContainer}>
      <Ionicons name="ios-water-outline" size={24} color={Colors.PRIMARY_LIGHT} />

      <View style={styles.slider}>
      <MultiSlider
              values={[1]}
              min={1}
              max={90}
              step={1}
              markerStyle={{
                backgroundColor: Colors.PRIMARY_LIGHT,
                borderColor: Colors.PRIMARY_DARK,
                height: 30,
                width: 30,
                borderRadius: 20,
              }}
              trackStyle={{
                backgroundColor: Colors.PRIMARY_DARK
              }}
              selectedStyle={{
                backgroundColor: Colors.SECONDARY_DARK
              }}
              sliderLength={250}
              onValuesChange={(values) =>{
              setWateringDays(values[0])
              onSelected(values[0])
            }
            }
              />
      </View>
      <Ionicons name="ios-water" size={32} color= {Colors.PRIMARY_LIGHT} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom:33,
    paddingHorizontal:16,
    alignItems: 'center',
  },
  daysText:{
    alignSelf: 'center',
    paddingVertical : 11,
    fontSize: 19,
    fontFamily: "jakarta",
    color: Colors.PRIMARY_DARK,
  },
  sliderContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default WateringDaysPicker;
