//import React, { Component } from 'react';
//import { StyleSheet, View, Text, ScrollView } from 'react-native';
//import { Table, TableWrapper, Row } from 'react-native-table-component';
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

 import React, { useEffect, useState } from "react";
 import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
 //import { openDatabase } from "react-native-sqlite-storage";
 import db from "../services/sqlite/SQLiteDatabse";


 const App = () => {
   //const [category, setCategory] = useState("");
   const [arrayHistorico, setArrayHistorico] = useState([]);
 
   /*const createTables = () => {
     db.transaction(txn => {
       txn.executeSql(
         `"CREATE TABLE IF NOT EXISTS historico (id INTEGER PRIMARY KEY AUTOINCREMENT, atividade INT, modo INT, data TEXT, hora INT, minuto INT, segundo INT);"`,
         [],
         (sqlTxn, res) => {
           console.log("table created successfully");
         },
         error => {
           console.log("error on creating table " + error.message);
         },
       );
     });
   };*/
 
   /*const addCategory = () => {
     if (!category) {
       alert("Enter category");
       return false;
     }
 
     db.transaction(txn => {
       txn.executeSql(
         `INSERT INTO categories (name) VALUES (?)`,
         [category],
         (sqlTxn, res) => {
           console.log(`${category} category added successfully`);
           getCategories();
           setCategory("");
         },
         error => {
           console.log("error on adding category " + error.message);
         },
       );
     });
   };*/
 
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
 
   return (
     <View>
       <StatusBar backgroundColor="#222" />
 
       <FlatList
         data={arrayHistorico}
         renderItem={renderArrayHistorico}
         key={cat => cat.id}
         ListHeaderComponent={()=><Text>id atividade modo data horario</Text>
        }
       />
     </View>
   );
 };
 
 export default App;

/*
 <TextInput
         placeholder="Enter category"
         value={category}
         onChangeText={setCategory}
         style={{ marginHorizontal: 8 }}
       />
 
       <Button title="Submit" onPress={addCategory} />
       */