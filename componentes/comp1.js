import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';

export default function(){
    return(
        <View>
            
            <Text style={estilos.txt1}> Atividade 1 - Foco da mente </Text>
            <Text style={estilos.txt1}> Atividade 2 - Respiração </Text>
            <Button
                title="Atividade 1 - Foco da mente"
                onPress={()=>Alert.alert('MSG','Teste')}    
            /> 
        </View> 

        
    )
}

const estilos = StyleSheet.create({
    txt1:{
        fontSize:20,
    }
});

