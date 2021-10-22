import React, {useState} from 'react'
import {View, Text, Button, Modal, StyleSheet} from 'react-native'

export default function(){

    const [visivel,setVisivel]=useState(false)

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
            <Button
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
  }
})