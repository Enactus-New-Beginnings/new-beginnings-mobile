import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Box from '../components/Box';
import { LinearGradient } from 'expo-linear-gradient';
import {useAuthState} from 'react-firebase-hooks/auth';
import Authenticator from '../components/Authenticator'

const image = { uri: "https://i.imgur.com/22nmNA1.png" };

export default function Home({navigation}){
  //State 0 is log in, 1 is sign up
  const [loginState, setLoginState] = React.useState(0)
  //States for all text fields, namely email, password, name and location
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setconfirmPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [location, setLocation] = React.useState("")
  //Firebase user object
  const [user, loading, error] = useAuthState(Authenticator.auth);

  /*Begin signup, login and profile components*/
  SignUp=()=>{
    return (<View> 
      <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry onChangeText={setconfirmPassword} value={confirmPassword}/>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name}/>  
      <TextInput style={styles.input} placeholder="Location" onChangeText={setLocation} value={location}/>
      <TouchableOpacity style={styles.button} onPress={()=>{
        if(password == confirmPassword)
          Authenticator.signUpUser(email, password, name, location)
        else
          alert("Password does not match")
      }}>
    
        <Text style={{color: 'white'}}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{marginTop: '5%', marginLeft: '5%',  marginRight: '5%'}}>Already have an account? <Text onPress={()=> setLoginState(0)} style = {{ color: 'blue' }}>Log In</Text></Text>
      </View>)
  }
  Login=()=>{
    return (<View>
      <TouchableOpacity style={styles.button} onPress={()=>{Authenticator.loginUser(email, password)}}>
        <Text style={{color: 'white'}}>Log In</Text>
      </TouchableOpacity>
      <Text style={{marginTop: '5%', marginLeft: '5%',  marginRight: '5%'}}>Don't have an account? <Text onPress={()=> setLoginState(1)} style = {{ color: 'blue' }}>Sign Up</Text></Text>
    </View>)
  }
  Profile=()=>{
    return (<View>
        <Box color={"#ff8575"} title="Welcome back to New Beginnings!" txt="Profile page coming soon..."/>
        <TouchableOpacity style={styles.button} onPress={()=>{Authenticator.signOutUser()}}>
          <Text style={{color: 'white'}}>Sign Out</Text>
        </TouchableOpacity>
    </View>)
  }
  /*End signup, login, and profile components*/ 

  //What the Home function returns
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'orange'}}>
      <ImageBackground source={image} resizeMode="cover" style={{flex: 1, justifyContent: "flex-end",}}>
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
          {user ?
            Profile() :
            <View style={{ flex: 1, alignItems: 'center'}}> 
              <Box color={"#ff8575"} title="Welcome to New Beginnings!" txt="Sign in or sign up for an account below to access personalized resources and mentorship programs near your location. "/>
              <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>  
              <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password}/>
              {loginState===0? Login() : SignUp()}

            </View>
          }
        </View> 
      </ImageBackground>
    </View>
    )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    width: Dimensions.get('window').width*0.8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  }
});