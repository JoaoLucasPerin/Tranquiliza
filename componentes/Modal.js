import React, {useState} from 'react'
import {View, Text, Button, Modal, StyleSheet, TouchableOpacity} from 'react-native'

export default function(){

    const [visivel,setVisivel]=useState(false)
    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={estilos.appButtonContainer}>
          <Text style={estilos.appButtonText}>{title}</Text>
        </TouchableOpacity>
      );

    return(
        <View>
            <Modal
                animationType="fade"
                transparent = {true}
                visible={visivel}
                style={{}}
            >
                <View style={estilos.modal}>
                    <Text style={estilos.textoModal}>
                        Será apresentado um número entre 100 e 110. 
                        O jogo consiste em subtrair 7 do valor apresentado. 
                        Possivelmente iremos lhe perguntar qual o próximo número.
                    </Text>
                    <Button
                        title="Fechar"
                        onPress={()=>{setVisivel(false)}}
                    />
                </View>
            </Modal>
            <AppButton
                title="Como jogar"
                onPress={()=>{setVisivel(true)}}
            />
        </View>
    );
}

const estilos=StyleSheet.create({
  modal:{
      backgroundColor:"#000",
      margin:20,
      padding:20,
      borderRadius:20,
      elevation:10
  },
  textoModal:{
      color:"#fff"
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
})