import * as React from 'react';
import { View, ScrollView, Text, Button} from 'react-native';
import Box from '../components/Box'
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
const image = { uri: "https://i.imgur.com/22nmNA1.png" };

export default function Videos({navigation}){
    const [playing, setPlaying] = React.useState(false);
    const togglePlaying = () => {
      setPlaying((prev) => !prev);
    }
    return (   
        <ScrollView style={{  backgroundColor: 'orange'}}>
          <LinearGradient
            colors={['transparent','rgba(255,255,255,0.9)']}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '100%'
              }}
          />
          <View style={{height:'100%', paddingTop: '10%', flex: 1, alignItems: 'center', }}>
          <Box color={"#ffc400"} title="Video Resources" txt="Access tutorials related to all aspects of the job search, from finding the right career to resume writing. Videos may take a while to appear on first launch."/>
            <YoutubePlayer
              height={300}
              width= {400}
              play={false}
              videoId={'cTf1vRTVMbQ'}
            /> 
          
            <YoutubePlayer
              height={300}
              width= {400}
              play={false}
              videoId={'jJddYjx_Bq0'}
            /> 

          </View>
        </ScrollView>
      )
}