import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';





export default function Home() {
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        B: require('../assets/fonts/b.ttf'),
        M: require('../assets/fonts/m.ttf'),
        S: require('../assets/fonts/s.ttf'),

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
            <View style={{ marginTop: '10%', marginHorizontal:'5%' }}>
                <View style={{flexDirection:'row', display:'flex'}}><Icon name="chevron-left" type="entypo" size={30} color="#FF8533"></Icon>
                <Text style={{textAlign:'justify', color:"#FF8533",fontSize:25, fontFamily:'S'}}>Preferences</Text>
                </View>
                <Text style={{textAlign:'left', color:"#FF8533",fontSize:25, fontFamily:'S', marginHorizontal:'5%', marginTop:'15%'}}>Hey Malèna, what kind of food do you prefer? </Text>
            </View>
            <View style={{marginHorizontal:'7.5%', marginTop:'5%', flexDirection:'row', display:'flex', flexWrap:'wrap'}}>
               <TouchableOpacity><View>
                   <Image source={require('../assets/everything.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'10%', fontSize:12}}>Everything</Text>
                </View></TouchableOpacity>
                <TouchableOpacity><View>
                   <Image source={require('../assets/vegan.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'15%', fontSize:12}}>Vegan</Text>
                </View></TouchableOpacity>
                <TouchableOpacity><View>
                   <Image source={require('../assets/halal.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'15%', fontSize:12}}>Halal</Text>
                </View></TouchableOpacity>
                <TouchableOpacity><View>
                   <Image source={require('../assets/fastfood.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'7.5%', fontSize:12}}>Fast Food</Text>
                </View></TouchableOpacity>
                <TouchableOpacity><View>
                   <Image source={require('../assets/glutenfree.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'10%', fontSize:12}}>Gluten-free</Text>
                </View></TouchableOpacity>
                <TouchableOpacity><View>
                   <Image source={require('../assets/organic.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'10%', fontSize:12}}>Organic</Text>
                </View></TouchableOpacity>
                <TouchableOpacity><View>
                   <Image source={require('../assets/kosher.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'15%', fontSize:12}}>Kosher</Text>
                </View></TouchableOpacity>
                <View>
                   <Image source={require('../assets/other.png')} style={{height:70, width:70, resizeMode:'contain'}}></Image>
                   <Text style={{fontFamily:'M', marginLeft:'10%', fontSize:12}}>Others</Text>
                </View> 
            </View>
            <Text style={{textAlign:'justify', color:"#FF8533",fontSize:20, fontFamily:'S', marginHorizontal:'10%', marginTop:'15%'}}>Food Allergies</Text>
            <Text style={{textAlign:'justify', color:"#9C7569",fontSize:15, fontFamily:'M', marginHorizontal:'10%'}}>(select all intolerances that apply)</Text>
            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'10%', flexWrap:'wrap'}}>
            <Chip onPress={() =>{setCowMilk(!cowmilk)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={cowmilk}>Cow Milk</Chip>
            <Chip onPress={() =>{setEggs(!eggs)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={eggs}>Eggs</Chip>
            <Chip onPress={() =>{setPeanut(!peanut)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={peanut}>Peanuts</Chip>
            <Chip onPress={() =>{setFish(!fish)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={fish}>Fish</Chip>
            <Chip onPress={() =>{setWheat(!wheat)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={wheat}>Wheat</Chip>
            <Chip onPress={() =>{setSoy(!soy)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={soy}>Soy</Chip>
            <Chip onPress={() =>{setShellfish(!shellfish)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={shellfish}>Shellfish</Chip>
            <Chip onPress={() =>{setGluten(!gluten)} } style={{width:'30%', marginRight:'2.5%', marginBottom:'2.5%', backgroundColor:"#FF8533"}} textStyle={{fontFamily:'S', fontSize:12, textAlign:'center'}} selectedColor="#FFF" selected={gluten}>Gluten</Chip>
            </View>
            <View style={{flexDirection:'row', display:'flex', marginHorizontal:'5%'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Dine')}><View style={{marginTop:'25%', width:'90%', backgroundColor:'#FF8533', marginLeft:'10%', borderRadius:50, display:'flex', flexDirection:'row'}}>
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