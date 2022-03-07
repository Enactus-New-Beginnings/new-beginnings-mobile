import * as React from 'react';
import { StyleSheet, View, ScrollView, Text, Button} from 'react-native';
import { useState, useEffect } from "react";
import CustomTable from '../components/CustomTable'


export default function Resources({navigation}){
    
  const [data, setData] = useState([]); //for fetching data
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    const resp = await fetch("https://apis.yinftw.com/nb/resources/housing");
    const data = await resp.json();
    setData(data);
    let table=[]
    data.forEach(el=>{
      table.push([el.name, el.address])
    })
   // console.log(table)
    setTableData(table)
  };

  useEffect(() => {
    fetchData()
  }, []);


    return (
      <React.Fragment>
          {tableData.length==0?<Text>Loading...</Text>:<CustomTable tableData={tableData} fullData={data}/>}
      </React.Fragment>
    );
  }

