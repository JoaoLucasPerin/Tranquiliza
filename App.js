

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import C1 from './componentes/comp1'


const Pilha = createStackNavigator();

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

          <Button 
            title="Menu Principal"
            onPress={()=>navigation.navigate('Menu Principal')}
          />

      </View>
  );
}


function MenuPrincipal({navigation}){
  return(
      <View style={
        {flex:1,
        alignItems:'center',
        justifyContent:'center'}
        }>
          <Text> Selecione a atividade que deseja executar </Text>
          <Button 
              title="Atividade 1 - Foco da mente"
              onPress={()=>navigation.navigate('Atividade 1 - Foco da mente')}
            />
          <Button 
            title="Atividade 2 - Respiração"
            onPress={()=>navigation.navigate('Atividade 2 - Respiração')}
          />
          <Button 
            title="Retornar para a tela inicial"
            onPress={()=>navigation.navigate('Tela Inicial')}
          />

      </View>
  );
}

function TelaAtividade1({navigation}){
    return(
        <View style={
          {flex:1,
          alignItems:'center',
          justifyContent:'center'}
          }>
            <Text> Atividade1</Text>
            <Text> ....</Text>
            <Button 
            title="Menu Principal"
            onPress={()=>navigation.navigate('Menu Principal')}
          />

        </View>
    );
}

function TelaAtividade2({navigation}){
    return(
        <View style={
          {flex:1,
          alignItems:'center',
          justifyContent:'center'}
          }>
            <Text> Atividade2</Text>
            <Text> ....</Text>
            <Button 
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
                  options={{title:' '}}
                />
                <Pilha.Screen
                  name="Menu Principal"
                  component={MenuPrincipal}
                  options={{title:'Menu'}}
                />
                <Pilha.Screen
                  name="Atividade 1 - Foco da mente"
                  component={TelaAtividade1}
                  options={{title:'Atividade 1'}}
                />
                <Pilha.Screen
                  name="Atividade 2 - Respiração"
                  component={TelaAtividade2}
                  options={{title:'Atividade 2'}}
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
  }
});


/* caso precise de um botao de voltar para tela anterior:
<Button 
              title="Voltar"
              onPress={()=>navigation.goBack()}
            />
*/