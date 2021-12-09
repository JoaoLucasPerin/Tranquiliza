import React,{useState, useEffect} from 'react'
import {View,TextInput,Text,StyleSheet,FlatList} from 'react-native'
//import varGlobais from './componentes/Globais'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Historico from '../services/sqlite/Historico'

export default function(){
    // variaveis e metodos:
    let numero = Math.floor(Math.random() * 10) + 100 ;
    const [numeroEscolhido,setNumeroEscolhido]=useState(numero)
    const [numeroDigitado,setNumeroDigitado]=useState("")
    const [numeroAtual,setNumeroAtual]=useState(numero-7)
    const [historicoUpado, setHistoricoUpado] = useState(false)

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
        if(numeroAtual>6){
            const r=numeroAtual-7
            setNumeroAtual(r)
            addNumeroAtual()
        } else {
            setNumeroAtual(numeroEscolhido-7)
            setArrayNumerosAtuais(arrayInicial)
        }
    }

    const verificaResposta = ()=> {
        if(numeroDigitado == numeroAtual){
            return <Text>
                Acertou!
            </Text>
        }
    }

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
    if(!historicoUpado){
    Historico.create( {atividade:1, modo:1, data:currentDate, hora:hora, minuto:minuto, segundo:segundo} )
    .then( id => console.log('Historico created with id: '+ id) )
    .catch( err => console.log(err) )
    Historico.removeDataVazia('')
    .then( updated => console.log('Historicos removed: '+ updated) )
    .catch( err => console.log(err) )
    // fim da insercao no db
    }

    
    const setarNumeroDigitado = (text)=> {
        setNumeroDigitado(text)
        setHistoricoUpado(true)
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
                onChangeText={text=>{setarNumeroDigitado(text)}}
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
                    renderItem={item=>(<Text style ={ estilosCxNum.textoFlatList }>{item.item.valor}</Text>)}
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
        fontSize: 25, 
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
    },
    textoFlatList:{
        fontSize: 18,
        color: "#009688"
    }
})

/*
{numeroDigitado == numeroAtual? 
    <Text>
        Acertou!
    </Text>
    
: null }
*/