import React, { Component , useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Historico from '../services/sqlite/Historico'

/**
 * Example Historico Object: {
 *  id: (auto generated in sqlite), 
 *  atividade: 1,
 *  modo: 1,
 *  data: '2021-11-12',
 *  horario: '18:43:10.0000000'
 * } 
 */

 const printHistorico = (historico) => {
  console.log(`id:${historico.id}, atividade:${historico.atividade}, modo:${historico.modo}, data:${historico.data}, hora:${historico.hora}, hora:${historico.minuto}, hora:${historico.segundo}`)
}

export default class ImprimeHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tableHead: ['Id', 'Atividade', 'Modo', 'Data', 'Hora', 'Minuto', 'Segundo', 'Head8', 'Head9'],
      tableHead: ['Id', 'Atividade', 'Modo', 'Data', 'Hora', 'Minuto', 'Segundo'],
      //widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
      widthArr: [40, 60, 80, 100, 120, 140, 160]
    }
  }
  

  
  render() {

    const state = this.state;
    const data = [];
    const [arrayHistorico, setArrayHistorico] = useState([]);

    /*for (let i = 0; i < 30; i += 1) {
      const dataRow = [];
      for (let j = 0; j < 9; j += 1) {
        dataRow.push(`${i}${j}`);
      }
      data.push(dataRow);
    }
    */
    const getArrayHistorico = () => {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM historico ORDER BY id DESC`,
          [],
          (sqlTxn, res) => {
            console.log("historico obtido com sucesso");
            let len = res.rows.length;
  
            if (len > 0) {
              let results = [];
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                results.push({ id: item.id, atividade: item.atividade, modo: item.modo, data: item.data, hora: item.hora, minuto: item.minuto, segundo: item.segundo });
              }
              for (let i = 0; i < len; i += 1) {
                let item = res.rows.item(i);
                const dataRow = [];
                  dataRow.push(item.id);
                  dataRow.push(item.atividade);
                  dataRow.push(item.modo);
                  dataRow.push(item.data);
                  dataRow.push(item.hora);
                  dataRow.push(item.minuto);
                  dataRow.push(item.segundo);
                  data.push(dataRow);
                }
              setArrayHistorico(results);
            }
          },
          error => {
            console.log("error on getting historico " + error.message);
          },
        );
      });
    };
  
    const renderArrayHistorico = ({ item }) => {
      return (
        <View style={{
          flexDirection: "row",
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: "#ddd",
        }}>
          <Text style={{ marginRight: 9 }}>{item.id}</Text>
          <Text>{item.atividade}</Text>
          <Text> {item.modo}</Text>
          <Text> {item.data}</Text>
          <Text> {item.hora} h</Text>
          <Text> {item.minuto} min</Text>
          <Text> {item.segundo} seg</Text>
        </View>
      );
    };
  
    useEffect(async () => {
      //await createTables();
      await getArrayHistorico();
    }, []);
  
    /*
    for (let i = 0; i < 30; i += 1) {
      const dataRow = [];
      for (let j = 0; j < 9; j += 1) {
        dataRow.push(`${i}${j}`);
      }
      data.push(dataRow);
    }*/

    return (
      
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
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
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

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
  }
});