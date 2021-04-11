import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { Avatar, Switch } from 'react-native-paper';





export default function Checkin() {
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
                <Text style={{textAlign:'justify', color:"#FF8533",fontSize:22, fontFamily:'S', marginTop:'5%', marginLeft:'5%'}}>MerryDiners</Text>
                <Text style={{textAlign:'left', color:"#9C7569",fontSize:15, fontFamily:'M', marginHorizontal:'5%'}}>Friends who have been here before</Text>
                <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%', marginTop:'5%'}}>
            <Avatar.Image size={50} source={{uri:'https://images.pexels.com/photos/789303/pexels-photo-789303.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}} />
            <View>
                <Text style={{fontFamily:'B', marginLeft:'7.5%', fontSize:20, color:"#9C7569"}}>Jessica</Text>
                <Text style={{fontFamily:'R', marginLeft:'7.5%', fontSize:15, marginTop:'-5%', color:'#FF8533'}}>Vegan, Organic, Gluten-free</Text>
            </View>
            </View>


            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%', marginTop:'5%'}}>
            <Avatar.Image size={50} source={{uri:'https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}} />
            <View>
                <Text style={{fontFamily:'B', marginLeft:'10%', fontSize:20, color:"#9C7569"}}>Robert</Text>
                <Text style={{fontFamily:'R', marginLeft:'10%', fontSize:15, marginTop:'-5%', color:'#FF8533'}}>Vegan, Organic</Text>
            </View>
            
            </View>
                
            </View>
            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%', marginTop:'5%'}}><Switch value={isSwitchOn} color={"#FF8533"} onValueChange={onToggleSwitch} />
            <Text style={{color:'#9C7569', fontSize:15}}>Pair me with other solo guests</Text></View>
            
            
         

            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'5%'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('QRCheckin')}><View style={{marginTop:'5%', width:'90%', backgroundColor:'#FF8533', marginLeft:'10%', borderRadius:50, display:'flex', flexDirection:'row'}}>
                <Text style={{fontFamily:'S', color:'#FFF', fontSize:15, textAlign:'center', marginLeft:'5%', marginVertical:'2.5%', textAlignVertical:'center', paddingVertical:'2.5%'}} >Check-in  </Text><Icon name="arrow-forward-circle" type="ionicon" color="#FFF" size={20} style={{textAlignVertical:'center', marginVertical:'50%'}}></Icon>
            </View></TouchableOpacity>
            <Text style={{fontFamily:'B', textAlign:'center', fontSize:15, marginTop:'2.5%',color:'#FF8533', textDecorationStyle:'solid', textDecorationLine:'underline', marginLeft:'10%', marginTop:'5%'}} onPress={()=>navigation.navigate('Signup')}>cancel</Text>
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