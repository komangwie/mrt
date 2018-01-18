/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Select,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  View,
  BackHandler,
  Modal,
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { StackNavigator  } from 'react-navigation';

var{width,height}=Dimensions.get('window');

import { Picker, Container, Item, Input, Content, ListItem, CheckBox, Header, Left, Right, Body, Button, Icon, Title, Subtitle, Thumbnail, CardItem, Card , Fab} from 'native-base';
export default class News extends Component {

constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    this.state = {
        NY:{
            lat : -8.806789 ,
            lng:115.178232 ,
        },
        myLatitude: -8.806789, // ambil posisi user dari dashboard
        myLongitude : 115.178232,// ambil posisi user dari dashboard
        adminArea : null,//mengambil nama area
        imagePath :"uri of image", //path gambar untuk ditampilkan pada aplikasi
        imageUploadPath : null, //path gambar untuk diupload ke storage
        resizeImageUploadPath : null,
        title:null,//judul event/news
        description : '', // deskripsi event/news
        placeName : '', //nama tempat yang di cari
        eventAddress : null,
        childKey : null, //menyimpan nama child setelah push
        dateStart : null,
        dateEnd : null,
        url : '',
        username : '',
        imageHeight : 200,
        imageWidth : 200,
        results: {
            items: []
        },
        modalVisible : false,
        animating : true,
        modalImage : false
    }
}
static navigationOptions = {
    header: null,
};

render() {
    const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;

    return (
    <View style={{height : height, width : width, backgroundColor : 'white'}}>
            <StatusBar
                backgroundColor = {"rgba(16, 19, 22,0.2)"}
                translucent
            />
      
            {/*header bar*/}
            <View style={{backgroundColor : 'white', width : width, height : 70, flexDirection : 'row'}}>
                <View style={{marginTop : 30, marginLeft : 10}}>
                    <TouchableOpacity style={{width : 20}}>
                        <Icon name="ios-arrow-back" style={{color : "grey", fontSize : 30}}/>
                    </TouchableOpacity>
                </View>
                <View style={{ width : width-80, marginTop : 30}}>
                    <Text style={{color : 'gray', textAlign : 'center', fontSize : 18, marginTop : 5}}>Create News</Text>
                </View>
            </View>
            <View style={{flexDirection : 'row', borderBottomWidth : 0.18, paddingBottom : 10}}>
                <View style={{height : 50, width : 50, backgroundColor : 'grey', borderRadius : 25, marginLeft : 10, marginTop : 20}}>
                    <Icon name="person" style={{color : 'white', textAlign : 'center', marginTop : 10}}/>
                </View>
                <Text style={{marginTop : 35, marginLeft : 5}}>Mangwie</Text>
            </View>
            <Content>
                <Button style={{marginTop: '5%',alignSelf:'center', backgroundColor:'#f39c12', width : width-150, borderRadius : 50, paddingLeft: (width-150)/2.7}} onPress={()=>{this.uploadEvent();}}>
                    <Icon name="camera" style={{color : 'white', textAlign : 'center'}}/>
                </Button>
                <View style={{flexDirection : 'row',width : width, paddingLeft : 10, marginTop : 30}}>
                    <Icon name="ios-calendar" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
                    <TextInput underlineColorAndroid="gray" style={{color : 'gray', width : width-50, marginLeft : 10}} placeholder="News Date" placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
                </View>
                <View style={{flexDirection : 'row',width : width, paddingLeft : 10, marginTop : 10}}>
                    <Icon name="ios-brush" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
                    <TextInput underlineColorAndroid="gray" style={{color : 'gray', width : width-50, marginLeft : 10}} placeholder="News Title" placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
                </View>
                <View style={{flexDirection : 'row',width : width, paddingLeft : 10,}}>
                    <Icon name="ios-book" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
                    <TextInput multiline={true} underlineColorAndroid="transparent" style={{borderWidth : 1,borderColor : 'gray', borderRadius : 10,color : 'gray', width : width-50, marginLeft : 18}} placeholder="News Description..." placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
                </View>

                <View style={{width : width, marginTop : 20}}>
                          
                <View style={{backgroundColor : "white"}}>

                <View style={styles.mapView}>
                    <Item rounded style={{alignSelf:"center",height:40,width:"95%", marginTop: '2%', backgroundColor : "rgba(44,28,1,0.1)",borderWidth:0.01, borderColor : "white"}}>
                        <Input placeholder='Search or drag the marker' style={{fontSize:18}} onChangeText={(placeName)=>this.setState({placeName})}/>
                        <TouchableOpacity onPress={()=>this.searchLocation()}>
                            <Icon style={{color:'orange'}} name="ios-search" />
                        </TouchableOpacity>
                    </Item>
                </View>

                    {/** MapView START **/}
                <MapView style={{height: 300, width:width}}
                    initialRegion={{
                    latitude : this.state.myLatitude,
                    longitude: this.state.myLongitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    }}
                    region={{
                    latitude : this.state.myLatitude,
                    longitude: this.state.myLongitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    }}

                >
                    {/** membuat koordinat user START  **/}
                    <MapView.Marker draggable
                    onDragEnd={(e)=>{
                    this.setState({myLatitude:e.nativeEvent.coordinate.latitude,
                    myLongitude : e.nativeEvent.coordinate.longitude,});
                    this.getAdminAreaBasedLocation();
                    }
                    }
                    coordinate ={{
                        latitude: this.state.myLatitude,
                        longitude: this.state.myLongitude,
                    }}
                    title = "News location"
                    description = "long press to drag the marker"
                    >
                    <View style={styles.marker2}>
                    <View style={styles.marker1}>
                        <View style={styles.marker0}>
                        <Text style={styles.content}>N</Text>
                        </View>
                    </View>
                    </View>
                    </MapView.Marker>
                    {/** membuat koordinat END **/}

                </MapView>

                <Fab onPress={()=>this.focusToMarker()} style={{width : 30, height : 30, backgroundColor : "transparent"}}>
                    <Image  source={require('./btn-backtolocation.png')}
                        style={{width: 30, height:30}}
                    />
                </Fab>

                </View>
                <Button style={{marginTop: '2%',alignSelf:'center', backgroundColor:'#f39c12', width : width-50, borderRadius : 50}} onPress={()=>{this.uploadEvent();}}>
                        <Text style={{fontSize:18, color: '#fff', marginLeft : width/3.5}} >Let's Share</Text>
                </Button>
                <View style={{height : 10}}></View>
                {/** MapView END **/}
                </View>
            </Content>
         </View>
            );
        }
}
const styles = StyleSheet.create({
  fitImageWithSize: {
    height: 200,
    width: 200,
  },
  mapView : {
    height : 50,
    width : width-20,
    alignSelf : "center",
    position : "absolute",
    zIndex : 1
  },
  content : {
    color: 'white',
    fontWeight: "bold",
    transform: [{ rotate: '45deg'}],
    left : 4,
    top : 3
  },
  marker0:{
    height : 20,
    width : 20,
    backgroundColor:"orange",
    borderRadius : 10,
    left : 3,
    top : 5
  },
   marker1:{
    width : 30,
    height : 30,
    backgroundColor:"black",
    borderWidth: 1,
    borderColor: 'black',
    transform: [{ rotate: '-45deg'}],
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius : 50
  },
  marker2:{
    width : 40,
    height : 37,
    paddingLeft : 3,
    paddingRight : 3,
  }
});