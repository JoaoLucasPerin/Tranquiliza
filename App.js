import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
//import {createDrawerNavigator} from '@react-navigation/drawer'

import {ImageBackground, StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import C1 from './componentes/comp1'
import Modal from './componentes/Modal'
import CxNum from './componentes/CaixaDeNumero'
import Respira from './componentes/Respira'

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
        <Text style={estilos.titulo}> Selecione a atividade que deseja </Text>
        <Text style={estilos.titulo}> executar </Text>
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
          title="Retornar para a tela inicial"
          onPress={()=>navigation.navigate('Tela Inicial')}
        />

      </View>
      </ImageBackground>

  );
}

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
            title="Jogar atividade 1"
            onPress={()=>navigation.navigate('Jogar Atividade 1')}
          />
          <View style={estilos.space} /> 
          <AppButton 
            title="Assistir atividade 1"
            onPress={()=>navigation.navigate('Assistir Atividade 1')}
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

        <CxNum/>

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
        <AppButton 
          title="Jogar Atividade 2"
          onPress={()=>navigation.navigate('Jogar Atividade 2')}
        />
        <View style={estilos.space} /> 
        <AppButton 
          title="Assistir Atividade 2"
          onPress={()=>navigation.navigate('Assistir Atividade 2')}
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

function JogarAtividade2({navigation}){
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

// Componente em forma de funcao
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
                    name="Jogar Atividade 1"
                    component={JogarAtividade1}
                    options={{title:'Jogar Atividade 1'}}
                    />
                    <Pilha.Screen
                    name="Assistir Atividade 1"
                    component={AssistirAtividade1}
                    options={{title:'Assistir Atividade 1'}}
                    />
                <Pilha.Screen
                  name="Menu Atividade 2"
                  component={MenuAtividade2}
                  options={{title:'Menu Atividade 2',
                  }}
                />
                  <Pilha.Screen
                    name="Jogar Atividade 2"
                    component={JogarAtividade2}
                    options={{title:'Jogar Atividade 2',
                    }}
                  />
                  <Pilha.Screen
                    name="Assistir Atividade 2"
                    component={AssistirAtividade2}
                    options={{title:'Assistir Atividade 2',
                    }}
                  />
              </Pilha.Navigator>
      </NavigationContainer>
    

  );
};


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
  }
});


/* caso precise de um botao de voltar para tela anterior:
<Button 
              title="Voltar"
              onPress={()=>navigation.goBack()}
            />
*/