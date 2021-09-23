import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions, Image} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from '../../entities';
import Physics from '../../../physics';
import Images from '../../../assets/Images';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const GameScreen = () => {
    const [running, setRunning] = useState(false)
    const [pause, setPause] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [birdColor, setBirdColor] = useState('red')
    const [backgroundColor, setBackgroundColor] = useState('day')
    const [currentPoints, setCurrentPoints] = useState(0)

    let imageBackground = Images['background_' + backgroundColor];

    useEffect(() => {
        setRunning(false)
    }, [])

    let pauseButton = running
        ? <TouchableOpacity
            onPress={() => {
                setPause(!pause)
                setRunning(false)
                gameEngine.stop()
            }}>
            <Image source={Images.pause} resizeMode="contain"/>
        </TouchableOpacity>
        : null;

    let backgroundSelectionButton = running
        ? <TouchableOpacity style={styles.pauseButton}
                            onPress={() => {
                                if (backgroundColor === 'day') {
                                    setBackgroundColor('night')
                                } else {
                                    setBackgroundColor('day')
                                }
                            }}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 10}}>
                mode
            </Text>
        </TouchableOpacity>
        : null;

    return (
        <View style={styles.container}>
            <Image source={imageBackground} resizeMode="stretch" style={styles.imageBackground}/>
            <GameEngine
                ref={(ref) => {
                    setGameEngine(ref)
                }}
                systems={[Physics]}
                entities={entities(birdColor)}
                running={running}
                onEvent={(e) => {
                    switch (e.type) {
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
                <View
                    style={[
                        styles.headingContainer,
                        {marginLeft: -50}
                    ]}
                >
                    {pauseButton}
                    {!running && pause ?
                        <TouchableOpacity
                            onPress={() => {
                                setPause(!pause)
                                setRunning(true)
                                gameEngine.start()
                            }}>
                            <Image source={Images.play} resizeMode="contain"/>
                        </TouchableOpacity>
                        : null}</View>
            </GameEngine>
            <Text style={styles.score}>{currentPoints}</Text>
            {!running && !pause ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={[styles.colorButton, {backgroundColor: birdColor}]}
                                      onPress={() => {
                                          if (birdColor === 'blue') {
                                              setBirdColor('red')
                                          } else if (birdColor === 'red') {
                                              setBirdColor('yellow')
                                          } else {
                                              setBirdColor('blue')
                                          }
                                      }}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 10}}>
                            Bird color
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backgroundColorButton}
                                      onPress={() => {
                                          if (backgroundColor === 'day') {
                                              setBackgroundColor('night')
                                          } else {
                                              setBackgroundColor('day')
                                          }
                                      }}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 10}}>
                            mode
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setCurrentPoints(0)
                            setRunning(true)
                            gameEngine.swap(entities(birdColor))
                        }}>

                        <Image source={Images.message} resizeMode="contain"/>

                    </TouchableOpacity>
                </View> : null}
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: windowWidth,
        height: windowHeight,
    },
    gameEngine: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    pauseButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backgroundColorButton: {
        position: 'absolute',
        backgroundColor: '#13FF00',
        top: 70,
        left: windowWidth - 100,
        marginBottom: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#444444',
        shadowOffset: {height: 2, width: 2},
    },
    colorButton: {
        position: 'absolute',
        top: 20,
        left: windowWidth - 120,
        marginBottom: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#444444',
        shadowOffset: {height: 2, width: 2},
    },
    headingContainer: {
        position: 'absolute',
        top: 20,
        left: windowWidth - 20,
    },
    score: {
        position: 'absolute',
        color: 'white',
        fontSize: 50,
        top: 20,
        fontWeight: 'bold',
        left: windowWidth / 2 - 20,
        textShadowColor: '#444444',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 2,
    }
});
