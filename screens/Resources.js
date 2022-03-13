import * as React from 'react';
import { Text, Button, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';


export default function Resources({navigation}){
 
  const[data, setData] = useState([]);
  const [houseData, setHouse] = useState([]); //for fetching data
  const [foodData, setFood] = useState([]); //for fetching data
  const [clothData, setCloth] = useState([]); //for fetching data
  const [tableData, setTableData] = useState([]);
  const [modalTitle, setTitle] = useState("")
  const [modalText, setText] = useState("")
  const [showModal, setShow] = useState(false)

  const tableHead=['Name', 'Address']

  const makeTable = (data)=>{
    setData(data)
    let table=[]
    data.forEach(el=>{
      table.push([el.name?el.name:el.Name, el.address?el.address:el.Address])
    })
    setTableData(table)
    console.log(table)
  }
  const fetchData = async () => {
    const housing = await fetch("https://apis.yinftw.com/nb/resources/housing");
    let houseData = await housing.json();
    const food = await fetch("https://apis.yinftw.com/nb/resources/food");
    let foodData = await food.json();
    const clothing = await fetch("https://apis.yinftw.com/nb/resources/clothing");
    let clothData = await clothing.json();
 
    setFood(foodData);
    setCloth(clothData);
    setHouse(houseData);

    makeTable(houseData)
   // console.log(table)
    
  };
 
  useEffect(() => {
    fetchData()
  }, []);

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { backgroundColor: 'rgba(52, 52, 52, 0.0)',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: 'blue' }
  });

  const showPopup=(index)=>{
    let displayString=""
    let title="Information for "
    let notes=""
    for (const [key, value] of Object.entries(data[index])) {
      if(key.toLowerCase()!=='name'&&key.toLowerCase()!=='notes')
        displayString+=key+": "+value+"\n\n"
      else if(key.toLowerCase()==='notes'){
        if(value.toLowerCase()!=='n/a')
          notes+=value+"\n\n"
      }
      else
        title+=value
    }
    displayString=notes+displayString
    setText(displayString)
    setShow(true)
    setTitle(title)
  }

  const returnTable=()=>{
    const element = (data, index) => (
      <TouchableOpacity onPress={() => showPopup(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{data}</Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <ScrollView style={styles.container}>
        <Modal isVisible={showModal} swipeDirection="down">
          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 25, alignItems: 'center' }}>
            <Text style={{margin: '5%', paddingTop: '3%', fontWeight: 'bold', fontSize: 20}}>{modalTitle}</Text>

            <Text style={{margin: '5%'}}>{modalText}</Text>
            <Button title="   OK   " onPress={()=>{setShow(false)} }/>
          </View>
        </Modal>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 0 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </ScrollView>
    )
  }

    return (
      <React.Fragment>
        <View style={{ flex: 1, paddingTop: '10%' }}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.9)']}
          style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%'
            }}
        />
       <Text style={{textAlign: 'center', padding: '5%'}}>Tap on a resource name for more information, including contact info.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: '2%'}}>
        <Button color={tableData.length===foodData.length?"#009c17":"#2196F3"} title="Food" onPress={()=>{makeTable(foodData)}}>Food</Button>
        <Button color={tableData.length===clothData.length?"#009c17":"#2196F3"} title="Clothing" onPress={()=>{makeTable(clothData)}}>Clothing</Button>
        <Button color={tableData.length===houseData.length?"#009c17":"#2196F3"} title="Shelter" onPress={()=>{makeTable(houseData)}}>Shelter</Button>
        </View>
        {tableData.length==0?<Text>Loading...</Text>:returnTable()}
        </View>
      </React.Fragment>
    );
}


