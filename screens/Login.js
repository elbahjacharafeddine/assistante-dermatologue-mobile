import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";


import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput, ImageBackground
} from 'react-native';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { decode as base64Decode } from 'base-64';

import jwt_decode from "jwt-decode";
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [showError, setError] = useState(false)
  const api = 'http://192.168.137.1:8080'
  const dataUser ={
    "username":"lachgar",
    "password":"password"
  }
  const handleSignIn = async () => {
    let response = await axios.post(api+"/api/authenticate",dataUser)
        .then(response =>{
          console.log(response.data)
          const token = response.data.id_token;
          const object = JSON.parse(atob(token.split('.')[1]))
          if (object.auth ==="ROLE_DERMATOLOGUE"){
            navigation.navigate("Drawer");
          }
          else {
            alert("this application is dedicated to doctors")
          }

        })
        .catch(error =>{
          console.log(error)
          setError(true)
        })

  };


  return (

        <View style={styles.container}>
          {/*<Image style={styles.image} source={require("./assets/log2.png")} />*/}
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});