import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import Box from '../components/Box'
import { LinearGradient } from 'expo-linear-gradient';
import { firebase } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {useAuthState} from 'react-firebase-hooks/auth';

const auth = getAuth(firebase)
const db = getDatabase(firebase)

export default function Home({navigation}){
  //State 0 is log in, 1 is sign up
  const [loginState, setLoginState] = React.useState(0)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [user, loading, error] = useAuthState(auth); 

  const signUpUser = ()=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      alert("Sign up successful")
      const user = userCredential.user;
      set(ref(db, 'users/'+user.uid), {
          name: name,
          location: location
        }
      )
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      alert(errorMessage)
    });
  }

  const loginUser= ()=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      alert("Login successful")
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const signOutUser=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

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
      {user ?
      <View>
         <Box color={"#ff8575"} title="Welcome back to New Beginnings!" txt="Profile page coming soon..."/>
         <TouchableOpacity style={styles.button} onPress={signOutUser}>
            <Text style={{color: 'white'}}>Sign Out</Text>
          </TouchableOpacity>
      </View>:
      (loginState===0?
        <View style={{ flex: 1, alignItems: 'center'}}> 
           <Box color={"#ff8575"} title="Welcome to New Beginnings!" txt="Sign in or sign up for an account below to access personalized resources and mentorship programs near your location. "/>
          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>  
          <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password}/>
          <TouchableOpacity style={styles.button} onPress={loginUser}>
            <Text style={{color: 'white'}}>Log In</Text>
          </TouchableOpacity>
          <Text style={{marginTop: '5%', marginLeft: '5%',  marginRight: '5%'}}>Don't have an account? <Text onPress={()=> setLoginState(1)} style = {{ color: 'blue' }}>Sign Up</Text></Text>
        </View>
        :
        <View style={{ flex: 1, alignItems: 'center'}}>
           <Box color={"#ff8575"} title="Welcome to New Beginnings!" txt="Sign in or sign up for an account below to access personalized resources and mentorship programs near your location. "/>
          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>  
          <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password}/>
          <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name}/>  
          <TextInput style={styles.input} placeholder="Location" onChangeText={setLocation} value={location}/>  
          <TouchableOpacity style={styles.button} onPress={signUpUser}>
            <Text style={{color: 'white'}}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={{marginTop: '5%', marginLeft: '5%',  marginRight: '5%'}}>Already have an account? <Text onPress={()=> setLoginState(0)} style = {{ color: 'blue' }}>Log In</Text></Text>
        </View>)
        }
        </View> 
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