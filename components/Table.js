/* -----------
GENERAL USABLE COMPONENT - PLEASE DO NOT EDIT UNLESS YOU WISH TO MAKE APPWIDE CHANGES!
You can view documentation for this component here: 
Thanks! 
-Franklin
--------------*/
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

export default function Table(props){
    const dynamicSize={height: 'auto', width: '50%', justifyContent: 'center', alignItems: 'center'}
  return (
    <ScrollView >
        <DataTable>
            <DataTable.Header>
                {
                    props.header.map((data)=>{
                        return <DataTable.Title style={{alignItems: 'center', justifyContent: 'center'}} key={data}>{data}</DataTable.Title>
                    })
                }
            </DataTable.Header>
            {
                props.table.map((resource, index)=>{
                    return <DataTable.Row style={{alignItems:'center', backgroundColor: index%2==0?'#EEE2DF':'#EED7C5'}} key={resource[0].substring(0,resource[0].length/2)+resource[1].substring(0,resource[1].length/2)}>
                        {
                            resource.map((data, col)=>{
                                return <TouchableOpacity style={{...dynamicSize}} onPress={()=>{props.onPresses?props.onPresses[col](props.params?props.params[col][index]:null):console.log("Pressed")}} key={data}>
                                    <Text style={{textAlign:'center', width:'80%'}}>{data}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </DataTable.Row>
                })
            }
        </DataTable>
    </ScrollView>
  );
}