import * as React from 'react';
import { View, ScrollView, Text} from 'react-native';
import Box from '../components/Box'
import { LinearGradient } from 'expo-linear-gradient';

export default function Mentorship({navigation}){
    return (     
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'orange'}}>
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
        <View style={{paddingTop: '10%'}}>
          <Box color = "#a85b32" title="Mentorship" txt="In various studies, mentorship has proven to significantly increase the likelihood of previously incarcerated people getting jobs. One program, Ready4Work,
          shown that mentored participants were twice as likely to get a job than their non-mentored couterparts. 
          Additionally participants who met with mentors were 35% less likely to reoffend."/>
          <Box color = "##ffffff" txt="Interested in mentoring? Reach out to us at newbeginnings.innb@gmail.com (Fill out contact form?)"/>
          </View>
        </View>
      )
}