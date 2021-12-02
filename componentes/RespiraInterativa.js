import * as React from 'react';
import { Text, View, StyleSheet, Animated, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false)

  const segurar = () => {
    
    setIsPlaying(false)
    return (
      <TouchableHighlight 
        style={styles.btnCalc}
          onPress= {() => {
            setIsPlaying(true)
            "Segure"
          }}>
                <Text style={styles.txtBtn}> Segurar </Text>
      </TouchableHighlight>
    
     
    )
    

  }

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

          {remainingTime>6?
          <TouchableHighlight 
            style={styles.btnCalc}
              onPress= {() => {
                setIsPlaying(!isPlaying)
              }}>
                    <Text style={styles.txtBtn}> Inspire </Text>
            </TouchableHighlight>
            :remainingTime>5?
            <TouchableHighlight 
            style={styles.btnCalc}
              onPress= {() => {
                setIsPlaying(!isPlaying)
              }}>
                    <Text style={styles.txtBtn}> Segure </Text>
            </TouchableHighlight>
            
            
            
          :
          <TouchableHighlight 
            style={styles.btnCalc}
              onPress= {() => {
                setIsPlaying(!isPlaying)
              }}>
                    <Text style={styles.txtBtn}> Expire </Text>
            </TouchableHighlight>}
        </Animated.Text>
      )}
      
    </CountdownCircleTimer>

    </View>
    
  )
}
//<Button title="Pausar" onPress={() => setIsPlaying(prev => !prev)}/>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    //marginTop: 175,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
    bordas:{
        borderWidth:1,
        borderColor:'#000'
    },
    estiloNum:{
        fontSize: 13, 
        textAlign:'center'
    },
    btnCalc:{
        backgroundColor:'#048',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:20
    },
    txtBtn:{
        fontSize:15,
        textTransform:'uppercase',
        color:'#fff'
    }
});

// Referencia: https://github.com/vydimitrov/react-countdown-circle-timer