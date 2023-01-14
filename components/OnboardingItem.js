import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import Colors from '../constants/colors'
import CustomButton from '../components/CustomButton'

const OnboardingItem = ({item, navigation, index, scrollList }) => {

  const { width } = useWindowDimensions();

  const handleScroll = () => {
    if(index === 1){
      navigation.navigate('Login')
    }
    else{
      scrollList()
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, { width }]} />
      <View style={[styles.content, { width }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <CustomButton style={styles.button} value={index === 0? "Next >":"Start >"} onPress={handleScroll}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white'
  },
  image: {
    flex: 0.8,
    resizeMode: "contain",
    justifyContent: "center",
  },
  content: {
    flex: 0.2,
    alignContent: 'center',

  },
  title:{
    textAlign: 'center',
    fontFamily: 'canela-bold',
    fontSize: 24,
    color: Colors.PRIMARY_DARK
  },
  description:{
    marginTop: 11,
    textAlign: 'center',
    fontFamily: 'jakarta-bold',
    color: 'gray'
  },
  buttonContainer:{
    alignSelf: 'flex-end',
    width:"50%"
  },
  button: {
    color: 'black',
    borderColor: Colors.SECONDARY_LIGHT,
    backgroundColor: Colors.SECONDARY_LIGHT
  }
  
});

export default OnboardingItem;
