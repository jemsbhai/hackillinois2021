import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, Rating, AirbnbRating } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { Avatar } from 'react-native-paper';





export default function Restaurant() {
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        B: require('../assets/fonts/b.ttf'),
        M: require('../assets/fonts/m.ttf'),
        R: require('../assets/fonts/m.ttf'),
        S: require('../assets/fonts/s.ttf'),

      });
      const [restaurants, setRestaurants] = useState([
          
          {id:1, name:'Cafe Sababa', img:'https://lh5.googleusercontent.com/p/AF1QipNdiqpotqai2xU1vUVznHl6cTwcLx6EUDaaBtHc=w408-h305-k-no', price:'', type:'Vegetarian', rating:4.9, total:7},
          {id:2, name:`Strawberry Fields Cafe`, img:'https://lh5.googleusercontent.com/p/AF1QipPcjpvV9FNinKE8zPCXYpMZqSMtWajewgXhBVSC=w408-h272-k-no', price:'', type:'Cafe', rating:4.4, total:167},
          {id:3, name:'The Dancing Dog Eatery & Juicery', img:'https://lh5.googleusercontent.com/p/AF1QipNdHaOiRvOm1zCrD-vAlleGiq8ycZX3qu5iEvn9=w426-h240-k-no', price:'$$', type:'Vegan', rating:4.5, total:278},
          {id:4, name:'Red Herring Vegetarian Restaurant', img:'https://lh5.googleusercontent.com/p/AF1QipOHCVaHj_cOU_ZTXllu_h_y7pHsgz8AjNLBn_Np=w408-h306-k-no', price:'$$', type:'Vegan', rating:4.5, total:167},
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


   
      if (!fontLoaded) {
        return null;
      }
   
    return (
        <View style={styles.container}>
           
            <View style={{ marginTop: '10%', marginHorizontal:'5%' }}>
                <View style={{flexDirection:'row', display:'flex', width:350}}><Icon name="chevron-left" type="entypo" size={30} color="#FFF"></Icon>
                
                <Text style={{color:"#FFF",fontSize:17, fontFamily:'M', textAlign:'right', alignSelf:'flex-end', marginLeft:'auto'}}>Urbana–Champaign</Text>
                <Icon name="location-pin" type="entypo" size={25} color="#FFF" style={{alignSelf:'flex-end', textAlign:'right', marginLeft:'auto',}}></Icon>
                </View>
                <Text style={{textAlign:'justify', color:"#FFF",fontSize:30, fontFamily:'S', marginTop:'15%', marginLeft:'5%'}}>Vegan Dine</Text>
                <Text style={{textAlign:'left', color:"#FFF",fontSize:17, fontFamily:'M', marginHorizontal:'5%'}}>Nearby restaurants that serve the best vegan food </Text>
            </View>
            
            
          
            <View style={{marginLeft:'7.5%', top:'30%', flexDirection:'row', display:'flex', overflow:'scroll', position:'absolute', zIndex:2}}>
                <ScrollView horizontal style={{paddingBottom:'1.5%'}} showsHorizontalScrollIndicator={false}>
              {Restaurants}
                </ScrollView>
            </View>


            <Text style={{textAlign:'justify', color:"#97AD40",fontSize:20, fontFamily:'S', marginHorizontal:'10%', marginTop:'-25%'}} onPress={()=>navigation.navigate('Explore')}>Vegan MerryDiners</Text>
            <Text style={{textAlign:'left', color:"#9C7569",fontSize:15, fontFamily:'M', marginHorizontal:'10%'}}>Connect with your vegan friends and explore vegan restaurants together</Text>
            <ScrollView style={{height:400}}>
            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%', marginTop:'5%'}}>
            <Avatar.Image size={50} source={{uri:'https://images.pexels.com/photos/2599509/pexels-photo-2599509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}} />
            <View>
                <Text style={{fontFamily:'B', marginLeft:'15%', fontSize:20, color:"#9C7569"}}>John</Text>
                <Text style={{fontFamily:'R', marginLeft:'15%', fontSize:15, marginTop:'-5%', color:'#FF8533'}}>Vegan</Text>
            </View>
            </View>

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

            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%', marginTop:'5%'}}>
            <Avatar.Image size={50} source={{uri:'https://images.pexels.com/photos/2905825/pexels-photo-2905825.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}} />
            <View>
                <Text style={{fontFamily:'B', marginLeft:'15%', fontSize:20, color:"#9C7569"}}>Emma</Text>
                <Text style={{fontFamily:'R', marginLeft:'15%', fontSize:15, marginTop:'-5%', color:'#FF8533'}}>Vegan</Text>
            </View>
            
            </View>

            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%', marginTop:'5%'}}>
            <Avatar.Image size={50} source={{uri:'https://images.pexels.com/photos/2364618/pexels-photo-2364618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}} />
            <View>
                <Text style={{fontFamily:'B', marginLeft:'10%', fontSize:20, color:"#9C7569"}}>Kevin</Text>
                <Text style={{fontFamily:'R', marginLeft:'10%', fontSize:15, marginTop:'-5%', color:'#FF8533'}}>Vegan, Organic</Text>
            </View>
            
            </View></ScrollView>

          
            
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