import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';

const RootScreen = () =>  {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" hidden={true}/>
            <TouchableOpacity style= {styles.button}
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 10,
        width: '70%'
    }
});
