import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Button } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import Modal from "react-native-modal";

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Address'],
      tableData: this.props.tableData,
      fullData: this.props.fullData,
      showModal: false,
      modalText: "",
      modalTitle: ""
    }
  }

  _alertIndex(index) {
    let displayString=""
    let title="Information for "
    let notes=""
    for (const [key, value] of Object.entries(this.state.fullData[index])) {
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
    this.setState({
      modalText: displayString,
      showModal: true,
      modalTitle: title
    })
  }
  
  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{data}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <ScrollView style={styles.container}>
        <Modal isVisible={state.showModal} swipeDirection="down">
          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 25 }}>
            <Text style={{margin: '5%', paddingTop: '3%', fontWeight: 'bold', fontSize: 20}}>{state.modalTitle}</Text>

            <Text style={{margin: '5%'}}>{state.modalText}</Text>
            <Button title="OK" onPress={()=>{this.setState({
              showModal: false
            })}} />
          </View>
        </Modal>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
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
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { backgroundColor: 'rgba(52, 52, 52, 0.0)',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: 'blue' }
});