import React, { useRef } from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";
import { ONBOARDING_SLIDES } from "../../constants/onboardingSlides";
import OnboardingItem from "../../components/OnboardingItem";

const Onboarding = ({ navigation }) => {
  const refContainer = useRef(null);
  const scrollList = () => {
    refContainer.current.scrollToEnd();
  };
  const renderItem = ({ item, index }) => (
    <OnboardingItem
      item={item}
      navigation={navigation}
      index={index}
      scrollList={scrollList}
    />
  );

  return (
    <View style={styles.screen}>
      <FlatList
        ref={refContainer}
        data={ONBOARDING_SLIDES}
        renderItem={renderItem}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboarding;
