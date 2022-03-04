import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home'
import Mentorship from './screens/Mentorship'
import Employment from './screens/Employment'
import Resources from './screens/Resources'
import Profile from './screens/Profile'
import Videos from './screens/Videos'
import AppIntroSlider from 'react-native-app-intro-slider';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const slides = [
  {
    key: "1",
    title: 'Welcome',
    text:  "Our mission is to help formerly incarcerated individuals secure employment, establish strong relationships with mentors, and gain access to local resources in order to ease their transition from prison. Scroll through to learn more about what we offer.",
    image: require('./assets/logo.png'),
    colors: ['#1b31f7', '#808cff', '#c5cbfa']
  },
  {
    key: "2",
    title: 'Mentorship',
    text: "Connect with like-minded people who turned their lives around upon re-entering society. Studies show that people with strong mentors are twice as likely to get employed.",
    image: require('./assets/mentor.png'),
    colors: ['#32a852', '#a3ffbc', '#f7f7f7']
  },
  {
    key: "3",
    title: 'Employment',
    text: "Reach out to employers who don’t discriminate based on past convictions (If you’d like to have your business featured please contact us at newbeginnings.innb@gmail.com).",
    image: require('./assets/handshake.png'),
    colors: ['#f5fc23', '#f6fa8c', '#ffffff']
  },
  {
    key: "4",
    title: 'Resources',
    text: "Here you can find a cirrculum to guide your professional development, (as well as other local resources: affordable housing, local support groups, transportation etc.)",
    image: require('./assets/resources.png'),
    colors: ['#ff8205', '#ffaa54', '#fcdcbb']
  }
];

const Drawer = createDrawerNavigator()

export default function App() {
  const [sliderDone, setSliderDone] = React.useState(false)
  renderItem = ({ item }) => {
    return (
      <LinearGradient style={styles.slide} colors={item.colors}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </LinearGradient>
    );
  };
  renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  onDone=()=>{
    setSliderDone(true)
  }
  if(sliderDone){
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home}/>
          <Drawer.Screen name="Mentorship" component={Mentorship}/>
          <Drawer.Screen name="Employment" component={Employment}/>
          <Drawer.Screen name="Resources" component={Resources}/>
          <Drawer.Screen name="Profile" component={Profile}/>
          <Drawer.Screen name="Videos" component={Videos}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (<AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} renderDoneButton={renderDoneButton} renderNextButton={renderNextButton}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    slide: {
      flex: 1,
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
  title: {
      fontSize: 26,
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
  },
  text: {
      color: '#000',
      fontSize: 20,
  },
  image: {
      width: 200,
      height: 200,
      resizeMode: 'contain'
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
