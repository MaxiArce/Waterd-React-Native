import React, {Component} from "react";
import {StyleSheet, StatusBar, View, Platform} from "react-native";
import Colors from "../constants/colors";

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const StatusBarPlaceHolder = () => {
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: Colors.primary
        }}>
            <StatusBar
                barStyle="light-content"
            />
        </View>
    );
}



export default StatusBarPlaceHolder;