import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows, TableWrapper, Col } from 'react-native-table-component';

export default class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Name", "Address"],
      tableData: this.props.tableData
    }
  }

  render() {
    const state = this.state;
    return (
      <ScrollView style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={state.tableHead}
          flexArr={[1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={state.tableData}
            flexArr={[1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  wrapper: { flexDirection: 'row' },
});