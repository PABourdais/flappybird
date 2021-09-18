import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../../entities';
import Physics from '../../../physics'

const GameScreen = () =>  {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentPoints, setCurrentPoints] = useState(0)

    useEffect(() => {
        setRunning(false)
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/background-day.png')} resizeMode="cover" style={styles.image}>
                <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>
                <GameEngine
                    ref={(ref) => { setGameEngine(ref) }}
                    systems={[Physics]}
                    entities={entities()}
                    running={running}
                    onEvent={(e) => {
                        switch(e.type) {
                            case 'game_over':
                                setRunning(false)
                                gameEngine.stop()
                                break;
                            case 'new_point':
                                setCurrentPoints(currentPoints + 1)
                                break;
                        }
                    }}
                    style={styles.gameEngine}
                >
                    <StatusBar style="auto" hidden={true}/>
                </GameEngine>
                {!running ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style= {{backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}}
                                          onPress={()=> {
                                              setCurrentPoints(0)
                                              setRunning(true)
                                              gameEngine.swap(entities())
                                          }}>
                            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                                START GAME
                            </Text>
                        </TouchableOpacity>
                    </View> : null}
            </ImageBackground>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    gameEngine: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});
