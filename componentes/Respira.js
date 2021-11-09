import * as React from 'react';
import { Text, View, StyleSheet, Animated, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(true)

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={9}
        colors={[
          ['#004777', 0.4],
          ['#F7B801', 0.4],
          ['#A30000', 0.2],
        ]}
        onComplete={() => [true]}
    >
      {({ remainingTime, animatedColor }) => (
        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>

          {remainingTime>7?"Inspire":remainingTime>6?"Segure":"Expire"}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
    <Button title="Pausar" onPress={() => setIsPlaying(prev => !prev)}/>
  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    //marginTop: 175,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});

// Referencia: https://github.com/vydimitrov/react-countdown-circle-timer