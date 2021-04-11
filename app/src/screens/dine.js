import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';





export default function Dine() {
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        B: require('../assets/fonts/b.ttf'),
        M: require('../assets/fonts/m.ttf'),
        S: require('../assets/fonts/s.ttf'),

      });
      const [restaurants, setRestaurants] = useState([
          {id:1, name:'The Dancing Dog Eatery & Juicery', img:'https://lh5.googleusercontent.com/p/AF1QipNdHaOiRvOm1zCrD-vAlleGiq8ycZX3qu5iEvn9=w426-h240-k-no', price:'$$', type:'Vegan', rating:4.5, total:278},
          {id:2, name:'Red Herring Vegetarian Restaurant', img:'https://lh5.googleusercontent.com/p/AF1QipOHCVaHj_cOU_ZTXllu_h_y7pHsgz8AjNLBn_Np=w408-h306-k-no', price:'$$', type:'Vegan', rating:4.5, total:167},
          {id:3, name:'Cafe Sababa', img:'https://lh5.googleusercontent.com/p/AF1QipNdiqpotqai2xU1vUVznHl6cTwcLx6EUDaaBtHc=w408-h305-k-no', price:'', type:'Vegetarian', rating:4.9, total:7},
          {id:4, name:`Strawberry Fields Cafe`, img:'https://lh5.googleusercontent.com/p/AF1QipPcjpvV9FNinKE8zPCXYpMZqSMtWajewgXhBVSC=w408-h272-k-no', price:'', type:'Cafe', rating:4.4, total:167}
        ]);
      const Restaurants = restaurants.map((data) =>{
        return(
            <View style={{borderRadius:30, backgroundColor:'#FFF', elevation:1, width:240, marginRight:15, marginBottom:'5%'}}>
            <Image source={{uri:data.img}} style={{height:75, width:'99.75%', alignSelf:'center', borderTopLeftRadius:30, borderTopRightRadius:30}}></Image>
            <Text style={{fontFamily:'B', marginHorizontal:'7.5%', fontSize:15, marginTop:'5%', color:'#FF8533', textAlign:'left'}}>{data.name}</Text>
            
            <View style={{display:'flex', flexDirection:'row', paddingBottom:'5%'}}><Text style={{fontFamily:'M', marginHorizontal:'10%', fontSize:12, marginTop:'0.5%', color:'#9C7569'}}>{data.type} • {data.price}</Text>
            <Rating
             readonly
             showRating={false}
             ratingCount={5}
             startingValue={data.rating}
             imageSize={10}
             style={{marginTop:'2%'}}
             />
             <Text style={{fontFamily:'M', marginHorizontal:'1%', fontSize:10, marginTop:'0.5%', color:'#C3C3C3'}}>({data.total.toString()})</Text>
             </View>
       </View>
        )
    });


    const [cowmilk,setCowMilk] = useState(false);
    const [eggs,setEggs] = useState(false);
    const [peanut,setPeanut] = useState(false);
    const [fish,setFish] = useState(false);
    const [wheat,setWheat] = useState(false);
    const [soy,setSoy] = useState(false);
    const [shellfish,setShellfish] = useState(false);
    const [gluten,setGluten] = useState(false);
      if (!fontLoaded) {
        return null;
      }
   
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/dine.png')} style={{width:'100%', height:'60%', resizeMode:'contain'}}>
            <View style={{ marginTop: '10%', marginHorizontal:'5%' }}>
                <View style={{flexDirection:'row', display:'flex', width:350}}><Icon name="chevron-left" type="entypo" size={30} color="#FFF"></Icon>
                
                <Text style={{color:"#FFF",fontSize:17, fontFamily:'M', textAlign:'right', alignSelf:'flex-end', marginLeft:'auto'}}>Urbana–Champaign</Text>
                <Icon name="location-pin" type="entypo" size={25} color="#FFF" style={{alignSelf:'flex-end', textAlign:'right', marginLeft:'auto',}}></Icon>
                </View>
                <Text style={{textAlign:'justify', color:"#FFF",fontSize:30, fontFamily:'S', marginTop:'15%', marginLeft:'5%'}}>Let's Dine!</Text>
                <Text style={{textAlign:'left', color:"#FFF",fontSize:17, fontFamily:'M', marginHorizontal:'5%'}}>Nearby restaurants that serve your preferred food </Text>
            </View>
            <View style={{marginLeft:'7.5%', marginTop:'5%', flexDirection:'row', display:'flex', overflow:'scroll'}}>
                <ScrollView horizontal style={{paddingBottom:'1.5%'}} showsHorizontalScrollIndicator={false}>
              {Restaurants}
                </ScrollView>
            </View>
            
            </ImageBackground>
            
            <Text style={{textAlign:'justify', color:"#FF8533",fontSize:20, fontFamily:'S', marginHorizontal:'10%', marginTop:'-5%'}} onPress={()=>navigation.navigate('Explore')}>Explore</Text>
            <Text style={{textAlign:'justify', color:"#9C7569",fontSize:15, fontFamily:'M', marginHorizontal:'10%'}}>Explore restaurants tailored to specific diets in your area</Text>
            <View style={{marginLeft:'7.5%', marginTop:'5%', flexDirection:'row', display:'flex', overflow:'scroll'}}>
                <ScrollView horizontal style={{paddingBottom:'1.5%'}} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity onPress={()=>console.log('Touch')}><View><Image source={require('../assets/fast.png')} style={{height:195, width:195, resizeMode:'contain'}}></Image></View></TouchableOpacity>
              <TouchableOpacity><Image source={require('../assets/organ.png')} style={{height:195, width:195, resizeMode:'contain'}}></Image></TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Explore')}><Image source={require('../assets/veg.png')} style={{height:200, width:200, resizeMode:'contain'}}></Image></TouchableOpacity>
                </ScrollView>
            </View>
            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'5%'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Explore')}><View style={{marginTop:'5%', width:'90%', backgroundColor:'#FFF', marginLeft:'10%', borderRadius:50, display:'flex', flexDirection:'row'}}>
                <Text style={{fontFamily:'S', color:'#FFF', fontSize:15, textAlign:'center', marginLeft:'15%', marginVertical:'2.5%', textAlignVertical:'center', paddingVertical:'2.5%'}} >Next  </Text><Icon name="arrow-forward-circle" type="ionicon" color="#FFF" size={20} style={{textAlignVertical:'center', marginVertical:'50%'}}></Icon>
            </View></TouchableOpacity>
            <Text style={{fontFamily:'B', textAlign:'center', fontSize:15, marginTop:'2.5%',color:'#FF8533', textDecorationStyle:'solid', textDecorationLine:'underline', marginLeft:'35%', marginTop:'15%'}} onPress={()=>navigation.navigate('Signup')}>or skip</Text>
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