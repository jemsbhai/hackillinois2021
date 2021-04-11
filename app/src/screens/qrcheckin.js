import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { Avatar, Switch } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';





export default function QRCheckin() {
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        B: require('../assets/fonts/b.ttf'),
        M: require('../assets/fonts/m.ttf'),
        R: require('../assets/fonts/m.ttf'),
        S: require('../assets/fonts/s.ttf'),

      });
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
      

   
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

                <Text style={{color:"#A68378",fontSize:17, fontFamily:'R', textAlign:'left',  marginLeft:'2.5%', marginTop:'5%'}}>Down-to-earth cafe featuring homey vegan eats like deep-dish pizza plus juice, coffee, beer & wine.</Text>
                </View>
                <Text style={{textAlign:'center', color:"#FF8533",fontSize:22, fontFamily:'S', marginTop:'5%'}}>Check-in successful</Text>
                </View>
                
                <View style={{width:100, height:100, alignSelf:'center', marginTop:'10%'}}><QRCode color="#FF8533"
      value="HACKILLINOISTEAMZERO"
    /></View>
          
            
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