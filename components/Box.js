/* -----------
GENERAL USABLE COMPONENT - PLEASE DO NOT EDIT UNLESS YOU WISH TO MAKE APPWIDE CHANGES!
You can view documentation for this component here: https://yin4thewin.gitbook.io/new-beginnings/mobile-app/project-components/box 
Thanks! 
-Franklin
--------------*/

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Box(props){
    return (
        <View style={{
            backgroundColor: props.color,
            padding: 20,
            borderRadius: 10,
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '5%',
            marginBottom: '5%'
        }}>
            {
                props.title?<Text style={{textAlign:"center", fontWeight: 'bold', fontSize: 20}}>{props.title}</Text>:null
            }
            {
                props.txt?<Text>{props.txt}</Text>:null
            }
        </View>
      )
}