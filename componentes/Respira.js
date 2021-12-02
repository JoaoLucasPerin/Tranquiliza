import * as React from 'react';
import { Text, View, StyleSheet, Animated, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import {useState, useEffect} from 'react';
import Historico from '../services/sqlite/Historico';


export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(true)

  // insercao no db - historico
  const [currentDate, setCurrentDate] = useState('');
  const [hora, setHora] = useState('');
  const [minuto, setMinuto] = useState('');
  const [segundo, setSegundo] = useState('');

  useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
      date + '/' + month + '/' + year 
      //+ ' ' + hours + ':' + min + ':' + sec
      );
      setHora(
      //date + '/' + month + '/' + year 
      hours 
      );
      setMinuto(
      //date + '/' + month + '/' + year 
      min 
      );
      setSegundo(
      //date + '/' + month + '/' + year 
      sec 
      );
      
  }, []);

  Historico.create( {atividade:2, modo:2, data:currentDate, hora:hora, minuto:minuto, segundo:segundo} )
  .then( id => console.log('Historico created with id: '+ id) )
  .catch( err => console.log(err) )
  Historico.removeDataVazia('')
  .then( updated => console.log('Historicos removed: '+ updated) )
  .catch( err => console.log(err) )

  // fim da insercao no db

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

          {remainingTime>6?"Inspire":remainingTime>5?"Segure":"Expire"}
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
  }
});

// Referencia: https://github.com/vydimitrov/react-countdown-circle-timer