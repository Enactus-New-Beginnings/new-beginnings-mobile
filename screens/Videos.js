import * as React from 'react';
import { View, ScrollView, Text, Button} from 'react-native';
import Box from '../components/Box'
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function Videos({navigation}){
    const [playing, setPlaying] = React.useState(false);
    const togglePlaying = () => {
      setPlaying((prev) => !prev);
    }
    return (   
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'orange'}}>
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
        <View style={{height:'100%', paddingTop: '10%'}}>
          <Text style={{textAlign:"center", fontWeight: 'bold', fontSize: 20, marginTop: '5%', marginBottom: '5%'}}>Welcome to New Beginnings!</Text>

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
        </View>
      )
}