import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity, } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class LoginAndSignUpScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    userSignUp = (username, password) =>{
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((responce)=>{
            return Alert.alert("User Added sucessfully");
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }
    userLogin = (username, password) => {
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(()=>{
            return Alert.alert("Successfully login");
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }
    render() {
        return(
                <View style = {styles.container}>

                    <Text style = {{fontSize: 30, fontWeight: '800', marginLeft: 55, marginTop: 30,}}>Barter System App</Text>
                    <Image 
                        style={{width: 190, height: 160, margin : 20, marginLeft: 90}} 
                        source={require('../assets/barter.png')} 
                    />
                    <View>
                        <Text style = {{fontSize: 18, fontWeight: 'bold', marginLeft: 55,}}>USERNAME</Text>
                        <TextInput
                            style = {styles.loginBox}
                            keyboardType = {'email-address'}
                            onChangeText = {(text) =>{
                                this.setState({
                                    username: text
                                })
                            }}
                        />
                    </View>
                    <View>
                        <Text style = {{fontSize: 18, fontWeight: 'bold', marginLeft: 55,}}>PASSWORD</Text>
                        <TextInput
                            style = {styles.loginBox}
                            secureTextEntry = {true}
                            onChangeText = {(text) =>{
                                this.setState({
                                    password: text
                                })
                            }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {() =>{this.userLogin(this.state.username, this.state.password)}}>
                            <Text style = {styles.buttonText}>Login</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {() =>{this.userSignUp(this.state.username, this.state.password)}}>
                            <Text style = {styles.buttonText}>Sign Up</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        
    },
    loginBox : {
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 30,
    },
    buttonText:{
        marginTop: 10,
        marginLeft: 5,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth: 4,
        borderRadius: 20,
        padding: 10,
    },
})
