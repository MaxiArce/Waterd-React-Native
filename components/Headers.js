import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import Colors from '../constants/colors'

const Header = ({ title }) => {
    //Header
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: 40,
        paddingTop: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'roboto-bold',
        color: '#fff'
    }

});

export default Header;