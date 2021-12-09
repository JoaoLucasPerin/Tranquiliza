import React, { Component , useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';


export default class AnsiedadeEPanico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tableHead: ['Id', 'Atividade', 'Modo', 'Data', 'Hora', 'Minuto', 'Segundo', 'Head8', 'Head9'],
      tableHead: ['Sistema Nervoso', 'Gástrico', 'Circulatório', 'Cardíaco',  'Muscular', 'Respiratório'],
      tableData: [
        ['agitação', 'sensação de engasgo', 'formigamento', 
	      'batimentos cardíacos acelerados','espasmos musculares',
	      'falta de ar'],
        ['sudorese intensa', 'náuseas', 'sensação de dormência ou formigamento', 
	      'dor ou desconforto no tórax', 'tremores', ' '],
        ['tontura', 'dores gástricas', ' ', 
        ' ', ' ', ' '],
	      ['sensação de frio ou calor', 'diarreia', ' ', 
	      ' ', ' ', ' '],
        ['medo de morrer', ' ', ' ', 
        ' ', ' ', ' '],
        ['medo de perder o controle', ' ', ' ', 
        ' ', ' ', ' '],
        ['vertigens', ' ', ' ', 
        ' ', ' ', ' '],
        ['instabilidade postural', ' ', ' ', 
        ' ', ' ', ' '],
        ['desmaios', ' ', ' ', 
        ' ', ' ', ' '],
        ['medo de enlouquecer', ' ', ' ', 
        ' ', ' ', ' '],
        ['sensação de irrealidade', ' ', ' ', 
        ' ', ' ', ' '],
        ['estranhamento de onde vive', ' ', ' ', 
        ' ', ' ', ' '],
        ['arrepios', ' ', ' ', 
        ' ', ' ', ' ']     
      ]
      ,
      //widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
      widthArr: [140, 150, 160, 170, 180, 190]
    }
  }
  

  
  render() {

    const state = this.state;
    const data = [];
    return (
        
      <View style={styles.container}>
                <Text style = {styles.instructions}> 
        
        Segue um quadro contendo os sintomas mais comuns das crises de ansiedade e crises de pânico </Text>

        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                    <Rows
                      data={state.tableData}
                      //key={index}
                      //data={dataRow}
                      //data={arrayHistorico}
                      widthArr={state.widthArr}
                      //style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      style={[styles.row,  {backgroundColor: '#ffffff'}]}
                      textStyle={styles.text}
                    />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        
      </View>
    )
  }
}
/*
<Text style = {styles.instructions}> 
        A diferença entre ansiedade e síndrome do pânico está na intensidade dos sintomas e 
        na imprevisibilidade de sua ocorrência. Enquanto a ansiedade tem causas mais lógicas e concretas, 
        como um desafio a ser enfrentado ou uma situação delicada que está para ocorrer, 
        a crise de pânico não tem hora nem motivo para começar.
        </Text>
        
        <View style={styles.space} /> 
        
        <Text style = {styles.instructions}> 
        Porém, os sintomas são semelhantes. Se acalme, crises de ansiedade e crises de pânicos são muito comuns! 
        Estima-se que mais de 20% dos jovens sofram disso. Esse número dobrou durante a pandemia do coronavírus, antes esse número era pouco mais do que 10%.
        Um acompanhamento profissional (com psiquiatra e psicólogo) 
        fará você controlá-los facilmente.
        </Text> 
        
        <View style={styles.space} /> 
        
        <Text style = {styles.instructions}> 
        
        Segue um quadro contendo os sintomas mais comuns das crises de ansiedade e crises de pânico </Text>
      
*/
/*
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>

<Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  data.map((dataRow, index) => (
                    
                    <Row
                      key={index}
                      data={dataRow}
                      //data={arrayHistorico}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      textStyle={styles.text}
                    />
                      
                  ))
                }
                */

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#ffffff' 
  },
  head: { 
    height: 50, 
    backgroundColor: '#6F7BD9' 
  },
  text: { 
    textAlign: 'center', 
    fontWeight: '200' 
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#F7F8FA' 
  },
  instructions: {
    //textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 17
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  
});