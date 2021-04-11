import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, Rating } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';




export default function ReserveQr() {
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
                <Text style={{textAlign:'justify', color:"#FF8533",fontSize:23, fontFamily:'S', fontWeight:'bold'}}>Reservation Details</Text>
                
                </View>
                <View style={{marginLeft:'10%'}}>
                <Text style={{textAlign:'left', color:"#FF8533",fontSize:20, fontFamily:'M', fontWeight:'bold'}}>Names: John Doe, Jane Doe </Text>
                <Text style={{textAlign:'left', color:"#FF8533",fontSize:20, fontFamily:'M', fontWeight:'bold'}}>Table: 12</Text>
                <Text style={{textAlign:'left', color:"#FF8533",fontSize:20, fontFamily:'M', fontWeight:'bold'}}>Dietary Preferences: Vegan, Organic</Text>
                <Text style={{textAlign:'left', color:"#FF8533",fontSize:20, fontFamily:'M', fontWeight:'bold'}}>Allergies: Shellfish</Text>
                <View style={{width:100, height:100, alignSelf:'center', marginTop:'10%'}}><QRCode color="#FF8533"
      value="HACKILLINOISTEAMZERO"
    /></View>
              </View>  
            </View>
           
           
            

          
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