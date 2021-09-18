import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const RootScreen = () =>  {

    return (
        <View style={styles.container}>
            <TouchableOpacity style= {{backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}}
                              onPress={()=> {
                               console.log('hi')
                              }}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                    START GAME
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default RootScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
