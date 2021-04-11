import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';





export default function Signup() {
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        B: require('../assets/fonts/b.ttf'),
        M: require('../assets/fonts/m.ttf'),
        S: require('../assets/fonts/s.ttf'),

      });
      if (!fontLoaded) {
        return null;
      }
   
    return (
        <View style={styles.container}>
            <View style={{ marginTop: '10%', marginHorizontal:'5%' }}>
                <View style={{flexDirection:'row', display:'flex'}}><Icon name="chevron-left" type="entypo" size={30} color="#FF8533"></Icon>
                <Text style={{textAlign:'justify', color:"#FF8533",fontSize:25, fontFamily:'S', fontWeight:'bold'}}>Sign up</Text>
                </View>
                <Text style={{textAlign:'justify', color:"#FF8533",fontSize:25, fontFamily:'S', fontWeight:'bold', marginLeft:'5%', marginTop:'35%'}}>Create a new account</Text>
                <TextInput placeholder="full name" style={{fontFamily:'S', fontSize:20, alignSelf:'center', color:'#FF8533', marginTop:'5%',
                paddingLeft:'5%', textAlign:'left', width:'90%', backgroundColor:'#ffe2cf', borderRadius:20, paddingVertical:'5%', fontWeight:'bold'}} placeholderTextColor="#ff9957"></TextInput>
                <TextInput placeholder="email address" style={{fontFamily:'S', fontSize:20, alignSelf:'center', color:'#FF8533', marginTop:'5%',
                paddingLeft:'5%', textAlign:'left', width:'90%', backgroundColor:'#ffe2cf', borderRadius:20, paddingVertical:'5%', fontWeight:'bold'}} placeholderTextColor="#ff9957"></TextInput>
                <TextInput secureTextEntry placeholder="choose password" style={{fontFamily:'S', fontSize:20, alignSelf:'center', color:'#FF8533', marginTop:'5%',
                paddingLeft:'5%', textAlign:'left', width:'90%', backgroundColor:'#ffe2cf', borderRadius:20, paddingVertical:'5%', fontWeight:'bold'}} placeholderTextColor="#ff9957"></TextInput>
                <TextInput secureTextEntry placeholder="confirm password" style={{fontFamily:'S', fontSize:20, alignSelf:'center', color:'#FF8533', marginTop:'5%',
                paddingLeft:'5%', textAlign:'left', width:'90%', backgroundColor:'#ffe2cf', borderRadius:20, paddingVertical:'5%', fontWeight:'bold'}} placeholderTextColor="#ff9957"></TextInput>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}><View style={{marginTop:'15%', width:'70%', backgroundColor:'#FF8533', alignSelf:'center', borderRadius:50}}>
                <Text style={{fontFamily:'B', color:'#FFF', fontSize:15, paddingVertical:'7.5%', textAlign:'center', fontWeight:'bold'}} >Sign up</Text>
            </View></TouchableOpacity>
           
            

          
            <Text style={{fontFamily:'B', textAlign:'center', fontSize:15, marginTop:'2.5%',color:'#FF8533', textDecorationStyle:'solid', textDecorationLine:'underline'}} onPress={()=>navigation.navigate('Signup')}>or login to an existing account</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: '#FFF'
    },
    header: {
        height: 450,
        width: '100%',
        marginTop: '-10%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});