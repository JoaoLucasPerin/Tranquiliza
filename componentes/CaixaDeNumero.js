import React,{useState} from 'react'
import {View,TextInput,Text,StyleSheet,FlatList} from 'react-native'
//import varGlobais from './componentes/Globais'
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function(){
    // variaveis e metodos:
    let numero = Math.floor(Math.random() * 10) + 100 ;
    const [numeroEscolhido,setNumeroEscolhido]=useState(numero)
    const [numeroDigitado,setNumeroDigitado]=useState("")
    const [numeroAtual,setNumeroAtual]=useState(numero-7)
    var arrayInicial = [
        { id : "0", valor : numeroEscolhido}
    ]
    
    const [arrayNumerosAtuais,setArrayNumerosAtuais]=useState(arrayInicial)

    const addNumeroAtual = () =>{
        var novoArray = [...arrayNumerosAtuais, {
            id: arrayNumerosAtuais.length,
            valor: numeroAtual
        }
        ]
        setArrayNumerosAtuais(novoArray);
    }

    const jogaJogo1 = ()=>{
    
        if(numeroDigitado != numeroAtual){
            alert('Errado')
            return
        }
        const r=numeroAtual-7
        setNumeroAtual(r)
        addNumeroAtual()
    }

    const verificaResposta = ()=> {
        if(numeroDigitado == numeroAtual){
            return <Text>
                Acertou!
            </Text>
        }
    }

    // main:
    return(
        <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize: 17 }}>
                O Número inicial é:
            </Text>
            <Text style={estilosCxNum.estiloNum}>
                {numeroEscolhido}
            </Text>
            <View>
                <TextInput
                style={estilosCxNum.bordas}
                autoFocus={true}
                onChangeText={text=>{setNumeroDigitado(text)}}
                //                      setNumeroAtual(numeroAtual-7)}}
                keyboardType="numeric"
                />
                <TouchableHighlight
                    style={estilosCxNum.btnCalc}
                    onPress={()=>jogaJogo1()}  
                >
                    <Text style={estilosCxNum.txtBtn}>
                        Verificar
                    </Text>
                </TouchableHighlight>

                {verificaResposta()}
                
                <Text style={{fontSize: 17 }}>
                    Números percorridos:
                </Text>
                <FlatList
                    data={arrayNumerosAtuais}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={item=>(<Text>{item.item.valor}</Text>)}
                    alignItems='center'
                />

            </View>                
        </View>
    )
}

const estilosCxNum=StyleSheet.create({
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
})

/*
{numeroDigitado == numeroAtual? 
    <Text>
        Acertou!
    </Text>
    
: null }
*/