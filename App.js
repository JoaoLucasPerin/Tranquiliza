import * as React from 'react';
import {useState, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
//import {createDrawerNavigator} from '@react-navigation/drawer'

import {ImageBackground, StyleSheet, Text, View, Button, Image, TouchableOpacity, 
  ActivityIndicator} from 'react-native';

import Modal from './componentes/Modal'
import CxNum from './componentes/CaixaDeNumero'
import CxNumAss from './componentes/CaixaDeNumeroAssistida'
import Respira from './componentes/Respira'
import RespiraInterativa from './componentes/RespiraInterativa'
import ImpHist from './componentes/ImprimeHistorico2'

//import Sound from 'react-native-sound';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
// import dings from './assets/oceans_margaret.mp3';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';

import Notif from './componentes/Notificacoes'
import AnsEPan from './componentes/AnsiedadeEPanicoTexto'
import AnsEPanQuadro from './componentes/AnsiedadeEPanico'
//import Historico from './services/sqlite/Historico'

/**
 * Example Historico Object: {
 *  id: (auto generated in sqlite), 
 *  atividade: 1,
 *  modo: 1,
 *  data: '2021-11-12',
 *  horario: '18:43:10.0000000'
 * } 
 */

/*
 const printHistorico = (historico) => {
  console.log(`id:${historico.id}, atividade:${historico.atividade}, modo:${historico.modo}, data:${historico.data}, hora:${historico.hora}, hora:${historico.minuto}, hora:${historico.segundo}`)
}
*/

/* --- Para testar o CRUD: ---
/*
const App = () => {
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

//forced error catch
Historico.find( -1 ) 
.then( historico => printHistorico(historico) )
.catch( err => console.log(err) )

//create
Historico.create( {atividade:1, modo:1, data:'2021-11-12', hora:19, minuto:25, segundo:59 } )
.then( id => console.log('Historico created with id: '+ id) )
.catch( err => console.log(err) )

Historico.create( {atividade:2, modo:2, data:currentDate, hora:hora, minuto:minuto, segundo:segundo} )
.then( id => console.log('Historico created with id: '+ id) )
.catch( err => console.log(err) )

//Historico.create( {atividade:1, data:'corcel', horario:70} )
//  .then( id => console.log('Historico created with id: '+ id) )
//  .catch( err => console.log(err) )

//find id=1
Historico.find( 1 ) 
.then( historico => printHistorico(historico) )
.catch( err => console.log(err) )
//find id=2
Historico.find( 2 ) 
.then( historico => printHistorico(historico) )
.catch( err => console.log(err) )

//find atividade=1
Historico.findByAtividade( 1 ) 
.then( historicos => console.log(historicos) )
.catch( err => console.log(err) )


/*
//update
Historico.update( 1, {atividade:'gm', data:'corsa', horario:70} )
.then( updated => console.log('Historicos updated: '+ updated) )
.catch( err => console.log(err) )

//all
Historico.all()
.then( 
  historicos => historicos.forEach( c => printHistorico(c) )
)

//delete
Historico.remove(1)
.then( updated => console.log('Historicos removed: '+ updated) )
.catch( err => console.log(err) )

Historico.remove(2)
.then( updated => console.log('Historicos removed: '+ updated) )
.catch( err => console.log(err) )

Historico.remove(3)
.then( updated => console.log('Historicos removed: '+ updated) )
.catch( err => console.log(err) )
*/
//forced empty array (all=[])
/*
Historico.all()
.then( 
  historicos => console.log(historicos)
)

//export default function App() {
return(
  
  //return (
    <View style={styles.container}>
      <Text>(Check Console)</Text>
    </View>
  );
  
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
});
*/
// --- Fim do para testar o CRUD ---

const Pilha = createStackNavigator();
//const Guias = createBottomTabNavigator();
//const Gavetas = createDrawerNavigator();

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={estilos.appButtonContainer}>
    <Text style={estilos.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

// FUNCTION PARA O JOGO DA RESPIRACAO:

//
function TelaInicial({navigation}){
  return(
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
          <View style={estilos.container_tela_inicial}>
            <Image
              source={require('./assets/logoTranquiliza.png')}
              style={estilos.logo}
            />
          </View>
          
          <Notif />

          <AppButton 
            title="Menu Principal"
            onPress={()=>navigation.navigate('Menu Principal')}
          />
      </View>
  );
}

function MenuPrincipal({navigation}){
  return(
    <ImageBackground
      source={require('./assets/ceu_azul.jpg')} // reference: https://br.freepik.com/vetores-gratis/ceu-azul-com-nuvens-fundo-elegante_9191622.htm
      style={{width: '100%', height: '100%'}}
    > 
    
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
        <Text style={estilos.titulo}> Selecione a atividade que</Text>
        <Text style={estilos.titulo}> deseja executar</Text>
        <View style={estilos.space} /> 
        <AppButton 
          title="Atividade 1 - Foco da mente"
          onPress={()=>navigation.navigate('Menu Atividade 1')}
        />
        <View style={estilos.space} /> 
        <AppButton 
          title="Atividade 2 - Respiração"
          onPress={()=>navigation.navigate('Menu Atividade 2')}
        />
        <View style={estilos.space} /> 
        <AppButton 
          title="Ansiedade e Pânico"
          onPress={()=>navigation.navigate('Ansiedade e Pânico')}
        />
        <View style={estilos.space} />
        <AppButton 
          title="Histórico"
          onPress={()=>navigation.navigate('Histórico')}
        />
        <View style={estilos.space} />
        <AppButton 
          title="Configurações de Som"
          onPress={()=>navigation.navigate('Som')}
        />      
        <View style={estilos.space} /> 
        <AppButton 
          title="Retornar para a tela inicial"
          onPress={()=>navigation.navigate('Tela Inicial')}
        />
      </View>
      </ImageBackground>

  );
}
/*

*/ 

function MenuAtividade1({navigation}){
  return(
    <ImageBackground
      source={require('./assets/foco_mente.jpg')} // reference: https://br.freepik.com/vetores-gratis/ceu-azul-com-nuvens-fundo-elegante_9191622.htm
      style={{width: '100%', height: '100%'}}
    > 
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
          <Text style={estilos.titulo}> Atividade de foco da mente</Text>
          <Text style={estilos.subtitulo}> Jogo do tira 7 </Text>
          <View style={estilos.space} /> 

          <AppButton 
            title="Modo Interativo - Atividade 1"
            onPress={()=>navigation.navigate('Modo Interativo - Atividade 1')}
          />
          <View style={estilos.space} /> 
          <AppButton 
            title="Modo Não Interativo - Atividade 1"
            onPress={()=>navigation.navigate('Modo Não Interativo - Atividade 1')}
          />
          <View style={estilos.space} /> 
          <Modal/>
      </View>
      </ImageBackground>
  );
}
function JogarAtividade1({navigation}){
    return(
        <View style={
          {flex:1,
          alignItems:'center',
          justifyContent:'center'}
          }>
          <CxNum/>
        </View>
    );
}
function AssistirAtividade1({navigation}){
  return(
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>

        <CxNumAss/>

      </View>
  );
}

function MenuAtividade2({navigation}){
    return(
      <ImageBackground
      source={require('./assets/respiracao.jpg')} // reference: https://br.freepik.com/vetores-gratis/ceu-azul-com-nuvens-fundo-elegante_9191622.htm
      style={{width: '100%', height: '100%'}}
      > 
        <View style={
          {flex:1,
          alignItems:'center',
          justifyContent:'center'}
          }>
          <Text  style={estilos.titulo}> Atividade de respiração </Text>
          <Text  style={estilos.subtitulo}> Evitando hiperventilar </Text>
          <View style={estilos.space} /> 
        
        <View style={estilos.space} /> 
        <AppButton 
          title="Modo Não Interativo - Atividade 2"
          onPress={()=>navigation.navigate('Modo Não Interativo - Atividade 2')}
        />
        <View style={estilos.space} /> 
        <AppButton 
          title="Menu Principal"
          onPress={()=>navigation.navigate('Menu Principal')}
        />
        </View>
      </ImageBackground>
    );
}
/* deixado para a mvp 2: acima do "Modo Não Interativo - Atividade 2":
<AppButton 
          title="Modo Interativo - Atividade 2"
          onPress={()=>navigation.navigate('Modo Interativo - Atividade 2')}
        />
*/

function JogarAtividade2({navigation}){
  return(
    
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
        <Text  style={estilos.titulo}> Atividade de respiração </Text>
        <Text  style={estilos.subtitulo}> Evitando hiperventilar </Text>
        
      <RespiraInterativa />

      <AppButton 
        title="Menu Principal"
        onPress={()=>navigation.navigate('Menu Principal')}
      />
      </View>
  );
}

function AssistirAtividade2({navigation}){
  return(
    
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
        <Text  style={estilos.titulo}> Atividade de respiração </Text>
        <Text  style={estilos.subtitulo}> Evitando hiperventilar </Text>
      <Respira />

      <AppButton 
        title="Menu Principal"
        onPress={()=>navigation.navigate('Menu Principal')}
      />
      </View>
  );
}

function AnsiedadeEPanico({navigation}){
  return(
    <ImageBackground
      source={require('./assets/ceu_azul.jpg')} // reference: https://br.freepik.com/vetores-gratis/ceu-azul-com-nuvens-fundo-elegante_9191622.htm
      style={{width: '100%', height: '100%'}}
    > 
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
        <Text  style={estilos.subtitulo}> Entenda um pouco sobre elas </Text>
        <AnsEPan />
      <View style={estilos.space} /> 
      
      <AppButton 
        title="Quadro de Sintomas"
        onPress={()=>navigation.navigate('Quadro de Sintomas')}
      />
      <View style={estilos.space} /> 
      
      <AppButton 
        title="Menu Principal"
        onPress={()=>navigation.navigate('Menu Principal')}
      />
      </View>
    </ImageBackground>
  );
}
// <Text  style={estilos.titulo}> Ansiedade e Pânico </Text>
        
// <View style={estilos.space} /> 
//<Text> Segue um quadro contendo os sintomas mais comuns das crises de ansiedade e crises de pânico </Text>
      
// <AnsiedadeEPanicoSaibaMais />  trazer o saiba mais como um componente simples...

function Histórico({navigation}){
  return(
    <ImageBackground
      source={require('./assets/ceu_azul.jpg')} // reference: https://br.freepik.com/vetores-gratis/ceu-azul-com-nuvens-fundo-elegante_9191622.htm
      style={{width: '100%', height: '100%'}}
    > 
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
        <Text  style={estilos.titulo}> Histórico </Text>
        <Text  style={estilos.subtitulo}> Veja como foram suas últimas atividades aqui conosco </Text>
        <View style={estilos.space} /> 
      
      <ImpHist />
      
      <View style={estilos.space} /> 
      
      <View style={estilos.space} /> 
      <AppButton 
        title="Menu Principal"
        onPress={()=>navigation.navigate('Menu Principal')}
      />
      </View>
    </ImageBackground>
  );
}

// som

const SampleTrack = require('./assets/oceans_margaret.mp3');
function Som({navigation}){
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());

  React.useEffect(() => {
    LoadAudio();
  }, []);

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {}
  };

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(SampleTrack, {}, true);
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log('Error in Loading Audio');
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  return(
    <ImageBackground
      source={require('./assets/ceu_azul.jpg')} // reference: https://br.freepik.com/vetores-gratis/ceu-azul-com-nuvens-fundo-elegante_9191622.htm
      style={{width: '100%', height: '100%'}}
    > 
    
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
        <Text  style={estilos.titulo}> Som </Text>
        <Text  style={estilos.subtitulo}> Ouça a música enquanto se tranquiliza </Text>
      </View>

      <View style={estilos.space} />  
      <View style={estilos.containerBotaoSom2}>
        <View style={estilos.AudioPLayer}>
          {Loading ? (
            <ActivityIndicator size={'small'} color={'red'} />
          ) : (
            <View>
              {Loaded === false ? (
                <View>
                  <ActivityIndicator />
                  <Text>Loading Song</Text>
                </View>
              ) : (
                <View>
                  <Text>
                  
                  <TouchableOpacity style={estilos.playBtnSom} onPress={PlayAudio}>
                    <Ionicons name={'ios-play-outline'} size={36} color={'#000000'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={estilos.playBtnSom} onPress={PauseAudio}>
                    <Ionicons name={'ios-pause-outline'} size={36} color={'#000000'} />
                  </TouchableOpacity>
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
    </View>
      <View style={estilos.space} /> 
      <View>
      <AppButton 
        title="Menu Principal"
        onPress={()=>navigation.navigate('Menu Principal')}
      />
      </View>
    </ImageBackground>
  );
}

// fim de som

// Quadro de sintomas

function QuadroDeSintomas({navigation}){
  return(
    <ImageBackground
      source={require('./assets/ceu_azul.jpg')} // reference: https://br.freepik.com/vetores-gratis/ceu-azul-com-nuvens-fundo-elegante_9191622.htm
      style={{width: '100%', height: '100%'}}
    > 
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
        <Text  style={estilos.titulo}> Quadro de Sintomas </Text>
        <View style={estilos.space} /> 
      
      <AnsEPanQuadro />
      
      <View style={estilos.space} /> 
      
      <AppButton 
        title="Menu Principal"
        onPress={()=>navigation.navigate('Menu Principal')}
      />
      </View>
    </ImageBackground>
  );
}

/*
<Button title="Play Song" onPress={PlayAudio} />
<Button title="Pause Song" onPress={PauseAudio} />

          <Button title="Play Sound" onPress={playSound} >
            <Ionicons name={'ios-play-outline'} size={36} color={'#fff'} />
          </Button>
<View style={estilos.containerBotaoSom}>
      <TouchableOpacity style={estilos.playBtnSom} onPress={playPause}>
        <Ionicons name={'ios-play-outline'} size={36} color={'#fff'} />
      </TouchableOpacity>*/



// Componente em forma de funcao / main:

export default function Tranquiliza(){
  
  return (
    
    <NavigationContainer>
              <Pilha.Navigator initialRouteName="TelaInicial">
              <Pilha.Screen
                  name="Tela Inicial"
                  component={TelaInicial}
                  options={{title:' ',
                headerShown: false}}
                />
                <Pilha.Screen
                  name="Menu Principal"
                  component={MenuPrincipal}
                  options={{title:'Menu'}}
                />
                <Pilha.Screen
                name="Menu Atividade 1"
                component={MenuAtividade1}
                options={{title:'Menu Atividade 1'}}
                    />
                    <Pilha.Screen
                    name="Modo Interativo - Atividade 1"
                    component={JogarAtividade1}
                    options={{title:'Modo Interativo - Atividade 1'}}
                    />
                    <Pilha.Screen
                    name="Modo Não Interativo - Atividade 1"
                    component={AssistirAtividade1}
                    options={{title:'Modo Não Interativo - Atividade 1'}}
                    />
                <Pilha.Screen
                  name="Menu Atividade 2"
                  component={MenuAtividade2}
                  options={{title:'Menu Atividade 2',
                  }}
                />
                  <Pilha.Screen
                    name="Modo Não Interativo - Atividade 2"
                    component={AssistirAtividade2}
                    options={{title:'Modo Não Interativo - Atividade 2',
                    }}
                  />
                <Pilha.Screen
                  name="Ansiedade e Pânico"
                  component={AnsiedadeEPanico}
                  options={{title:'Ansiedade e Pânico',
                  }}
                />
                <Pilha.Screen
                  name="Histórico"
                  component={Histórico}
                  options={{title:'Histórico',
                  }}
                />
                <Pilha.Screen
                  name="Som"
                  component={Som}
                  options={{title:'Som',
                  }}
                />
                <Pilha.Screen
                  name="Quadro de Sintomas"
                  component={QuadroDeSintomas}
                  options={{title:'Quadro de Sintomas',
                  }}
                />
              </Pilha.Navigator>
      </NavigationContainer>
    

  );
};

/* deixados para a mvp 2:
// 1.  nao interativo do jogo 1 de foco de mente: usuario nao clicar em nenhuma tecla.
// 2. acima do "Modo Não Interativo - Atividade 2" : 
<Pilha.Screen
                    name="Modo Interativo - Atividade 2"
                    component={JogarAtividade2}
                    options={{title:'Modo Interativo - Atividade 2',
                    }}
                  />
*/

const estilos = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  }
  ,
  logo:{
    //width:250,
    resizeMode:'contain'
  }
  ,
  container_tela_inicial:{
    flex:1,
    backgroundColor:'#ffffff', //'#ADD8E6'
    alignItems:'center',
    justifyContent:'center'
  },
  titulo:{
    fontSize: 25
  },
  subtitulo:{
    fontSize: 20
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  containerBotaoSom: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#000',
    },
    playBtnSom: {
      padding: 20,
    },
    containerBotaoSom2: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      //backgroundColor: '#ecf0f1',
      padding: 8,
    },
    AudioPLayer: {
      width: '100%',
      height: 50,
      alignItems: 'center',
    },
});


/* caso precise de um botao de voltar para tela anterior:
<Button 
              title="Voltar"
              onPress={()=>navigation.goBack()}
            />
*/