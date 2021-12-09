import React,{useState, useEffect} from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Historico from '../services/sqlite/Historico'

export default function(){
    // variaveis e metodos:
    let numero = Math.floor(Math.random() * 10) + 100 ;
    const [numeroEscolhido,setNumeroEscolhido]=useState(numero)
    const [numeroAtual,setNumeroAtual]=useState(numero-7)
    const [historicoUpado, setHistoricoUpado] = useState(false)

    var arrayInicial = [
        { id : "0", valor : numeroEscolhido}
    ]
    
    const [arrayNumerosAtuais,setArrayNumerosAtuais]=useState(arrayInicial)
    //const numeroDeNumeros = Math.floor(numeroEscolhido/7)

    const addNumeroAtual = () =>{
        var novoArray = [...arrayNumerosAtuais, {
            id: arrayNumerosAtuais.length,
            valor: numeroAtual
        }
        ]
        setArrayNumerosAtuais(novoArray);
    }

    const adicionaEAtualiza = () =>{
        addNumeroAtual()
        setNumeroAtual(numeroAtual-7)
        setHistoricoUpado(true)
    }

    const resetaNumerosAtuais = () => {
        setNumeroAtual(numeroEscolhido-7)
        setArrayNumerosAtuais(arrayInicial)
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
        Historico.create( {atividade:1, modo:2, data:currentDate, hora:hora, minuto:minuto, segundo:segundo} )
        .then( id => console.log('Historico created with id: '+ id) )
        .catch( err => console.log(err) )

        Historico.removeDataVazia('')
        .then( updated => console.log('Historicos removed: '+ updated) )
        .catch( err => console.log(err) )
        // fim da insercao no db
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
                
                <TouchableHighlight 
                style={estilosCxNum.btnCalc}
                onPress= {() => {
                    numeroAtual>0?adicionaEAtualiza():resetaNumerosAtuais()
                }}>
                    <Text style={estilosCxNum.txtBtn}> Executar </Text>
                </TouchableHighlight>

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
        fontSize: 25,
        color: "#009688"
    }
})
