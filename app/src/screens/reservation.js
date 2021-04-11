import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, Rating } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';





export default function Reservation() {
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
            <Image source={{uri:'https://lh5.googleusercontent.com/p/AF1QipNdHaOiRvOm1zCrD-vAlleGiq8ycZX3qu5iEvn9=w426-h240-k-no'}} style={{height:'29.25%', width:'100%', resizeMode:'contain', borderBottomRightRadius:15, borderBottomLeftRadius:15, marginTop:'-2.5%'}}></Image>
            <View style={{ marginTop: '2.5%', marginHorizontal:'5%' }}>
                <View style={{}}>
                <Text style={{color:"#FF8533",fontSize:28, fontFamily:'B', textAlign:'left',  marginLeft:'2.5%'}}>The Dancing Dog Eatery & Juicery</Text>
                <Text style={{color:"#9C7569",fontSize:17, fontFamily:'R', textAlign:'left',  marginLeft:'2.5%'}}>Vegan restaurant</Text>
                <View style={{flexDirection:'row', display:'flex'}}><Rating
             readonly
             showRating={false}
             ratingCount={5}
             startingValue={4.5}
             imageSize={20}
             style={{marginTop:'2%', alignSelf:'flex-start', marginLeft:'5%'}}
             /><Text style={{marginTop:'2.5%', color:"#C3C3C3"}}>(278 reviews)</Text></View>
             </View>
             </View>
            <View style={{ marginTop: '10%', marginHorizontal:'5%' }}>
                <View style={{flexDirection:'row', display:'flex'}}><Icon name="chevron-left" type="entypo" size={30} color="#FFF"></Icon>
                <Text style={{textAlign:'justify', color:"#FF8533",fontSize:23, fontFamily:'S', fontWeight:'bold'}}>Make a reservation</Text>
                </View>
                
                <TextInput placeholder="making a reservation for...(names)" style={{fontFamily:'S', fontSize:20, alignSelf:'center', color:'#FF8533', marginTop:'5%',
                paddingLeft:'5%', textAlign:'left', width:'90%', backgroundColor:'#ffe2cf', borderRadius:20, paddingVertical:'5%', fontWeight:'bold'}} placeholderTextColor="#ff9957"></TextInput>
                <TextInput  placeholder="how many people?" style={{fontFamily:'S', fontSize:20, alignSelf:'center', color:'#FF8533', marginTop:'5%',
                paddingLeft:'5%', textAlign:'left', width:'90%', backgroundColor:'#ffe2cf', borderRadius:20, paddingVertical:'5%', fontWeight:'bold'}} placeholderTextColor="#ff9957"></TextInput>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('ReserveQR')}><View style={{marginTop:'15%', width:'70%', backgroundColor:'#FF8533', alignSelf:'center', borderRadius:50}}>
                <Text style={{fontFamily:'B', color:'#FFF', fontSize:15, paddingVertical:'7.5%', textAlign:'center', fontWeight:'bold'}} >Confirm Reservation</Text>
            </View></TouchableOpacity>
           
            

          
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