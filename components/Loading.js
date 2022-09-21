/* -----------
GENERAL USABLE COMPONENT - PLEASE DO NOT EDIT UNLESS YOU WISH TO MAKE APPWIDE CHANGES!
You can view documentation for this component here: 
Thanks! 
-Franklin
--------------*/

import * as React from 'react';
import { ActivityIndicator, Text, View} from 'react-native';

export default function Loading(){
    return (<View>
            <Text style={{textAlign:"center", fontWeight: 'bold', fontSize: 20, marginTop: '5%', marginBottom: '5%'}}>Loading...</Text>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>)
}