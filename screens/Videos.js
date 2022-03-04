import * as React from 'react';
import { View, ScrollView, Text} from 'react-native';
import Box from '../components/Box'
import { LinearGradient } from 'expo-linear-gradient';

export default function Videos({navigation}){
    return (
      <ScrollView>     
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'orange'}}>
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'transparent']}
          style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%'
            }}
        />
          <Text style={{textAlign:"center", fontWeight: 'bold', fontSize: 20, marginTop: '5%', marginBottom: '5%'}}>Welcome to New Beginnings!</Text>  
        </View>
      </ScrollView>
      )
}