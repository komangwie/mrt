/**
 * WRITTEN BY I GEDE ARI PUTRA
 */

import React, { Component } from 'react'; 
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  BackHandler
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StackNavigator } from 'react-navigation';
import { Content, Icon } from 'native-base';
import Geocoder from 'react-native-geocoder';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
var{width,height} = Dimensions.get('window');

export default class Dashboard extends Component<{}>{

  static navigationOptions = {
    header: null,
  }; 

  constructor(props){
    super(props);
    this.state={
      myLatitude : -8.602317,
      myLongitude : 115.247312,
      tujuanLatitude : -8.652317,
      tujuanLongitude : 115.267312,
      provinsi : '',
      alamatPosisiUser : '',
      alamatTujuan : '',
      driver : false
    };
    //panggil fungsi untuk menentukan lokasi user sekarang
    this.getCurrentLocation();
    //panggil fungsi cek apakah gps on atau off
    this.checkGPS();
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }
  
  backPressed = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelectScreen({ menuPage: true });
    return true;
  }

 //fungsi untuk menentukan lokasi user sekarang
  getCurrentLocation=()=>{
    //geolocation using getCurrentPosition
    navigator.geolocation.getCurrentPosition(
      (position)=>{
         this.setState({
                myLongitude: position.coords.longitude,
                myLatitude : position.coords.latitude
            });
        var area = {
          lat : this.state.myLatitude,
          lng : this.state.myLongitude
        };
        Geocoder.geocodePosition(area).then(res => {
              // res is an Array of geocoding object (see below)
              this.setState({
                provinsi : res[0].adminArea,
                alamatPosisiUser : res[0].formattedAddress
              });
            alert(res[0].adminArea);
           
          })
          .catch(err => alert(err));
      },(error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
    //getCurrentPositionEnd
  }
  //fungsi cek apakah gps on atau off
  checkGPS=()=>{
    //check gps is on or not
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true // false => Directly catch method is called if location services are turned off
    }).then(function(success) {
    //alert(JSON.stringify(success)); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
    }).catch((error) => {
        //alert(JSON.stringify(error.message)); // error.message => "disabled"
    });
    //check gps end
  }
  //set lokasi mulai dan tujuan
  setLocation=()=>{
    alert(JSON.stringify(this.state.alamatPosisiUser));
  }

  pesanDriver=()=>{
    Alert.alert(
      'Pesan Driver',
      'Apakah Anda yakin ingin memesan driver ini? pesanan anda akan dikirim ke driver ini',
      [
        {text: 'yes', onPress: () => this.pesan()},
        {text: 'no'},
      ],
      { cancelable: false }
    );
  }
  pesan=()=>{

  }
  render(){
    const { navigate } = this.props.navigation
    return(
      <View style={styles.container}>
      {/*status bar color and transparecy*/}
      <StatusBar
          backgroundColor = {"rgba(16, 19, 22,0.05)"}
          translucent
      />
      
      {/*header bar*/}
      <View style={{backgroundColor : '#01BEFE', width : width, height : 70, flexDirection : 'row'}}>
          <View style={{marginTop : 30, marginLeft : 10}}>
              <TouchableOpacity style={{width : 20}} onPress={()=>this.backPressed()}>
                  <Icon name="ios-arrow-back" style={{color : "white", fontSize : 30}}/>
              </TouchableOpacity>
          </View>
          <View style={{ width : width-80, marginTop : 30}}>
              <Text style={{color : 'white', textAlign : 'center', fontSize : 18, marginTop : 5}}>Cari Driver</Text>
          </View>
          <View style={{position : 'absolute', top : 30, right : 10}}>
              <TouchableOpacity style={{width : 20}}>
                  <Icon name="refresh" style={{color : "white", fontSize : 30}}/>
              </TouchableOpacity>
          </View>
      </View>
        {/*modal untuk menampilkan info driver dan order driver*/}
        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.driver} onRequestClose ={()=>this.setState({driver : false})}>
          <TouchableWithoutFeedback onPress={()=>this.setState({driver : false})}>
            <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
              <TouchableWithoutFeedback>
                <View style={{backgroundColor : 'white', height : height/1.6, width : width-50, borderRadius : 5, alignSelf : 'center', marginTop : height/9}}>
                  <View style={{height : 35, width : width-50, backgroundColor : '#01BEFE', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                    <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Driver</Text>
                  </View>
                  <Content>
                    <Image source={require('./../images/wi.jpg')} style={{height : 100, width : 100, borderRadius : 50, marginTop : 10, alignSelf : 'center'}}/>
                    <Text style={{color : 'black', fontSize : 15, textAlign : 'left', marginTop : height/20, marginLeft : 10}}>Nama : Wiratma Jaya</Text>
                    <Text style={{color : 'black', fontSize : 15, textAlign : 'left', marginTop : 4, marginLeft : 10}}>No. Telepon : 087853947663</Text>
                    <Text style={{color : 'black', fontSize : 15, textAlign : 'left', marginTop : 3, marginLeft : 10}}>Posisi : Jln Raya Canggu, Denpasar Utara, Bali</Text>
                    <Text style={{color : 'black', fontSize : 15, textAlign : 'left', marginTop : 3, marginLeft : 10}}>Tujuan : Jln Raya By Pass Ngurah Rai, Denpasar Utara, Bali</Text>
                  
                    <View style={{height : 20, width : 100}}></View>
                  </Content>
                  <View style={{position : 'absolute', bottom : 0}}>
                    <TouchableOpacity onPress={()=>this.pesanDriver()} style={{backgroundColor : '#01BEFE', height : 40, width : width-50, borderRadius : 5}}>
                      <Text style={{textAlign : 'center', color : 'white', fontSize : 16, marginTop : 10}}>Pesan Sekarang</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      <Content>
          {/*bagian lokasi user, tujuan, dan tombol set lokasi*/}
          <View>
             {/*pencarian lokasi user*/}
            <GooglePlacesAutocomplete
              placeholder='Lokasi Anda'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              value={this.state.alamatPosisiUser}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                //console.log(data, details);
                this.setState({
                  alamatPosisiUser : data.description
                });
              }}
              getDefaultValue={() => this.state.alamatPosisiUser}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyD-M55No-GmqnQKF_wGICpNbzRaGX88gZ8',
                language: 'id', // language of the results
                types: '(cities)' // default: 'geocode'
              }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    alignSelf : 'center',
                    width : width-20,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                    borderBottomWidth : 2
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                }}
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
            {/*pencarian lokasi tujuan user*/}
            <GooglePlacesAutocomplete
              placeholder='Tujuan Anda'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                //console.log(data, details);
                this.setState({
                  alamatTujuan : data.description
                });
              }}
              getDefaultValue={() => ''}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyD-M55No-GmqnQKF_wGICpNbzRaGX88gZ8',
                language: 'id', // language of the results
                types: '(cities)' // default: 'geocode'
              }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    alignSelf : 'center',
                    width : width-20,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                    borderBottomWidth : 2
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                }}
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
            {/*tombol set lokasi*/}
            <View style={{marginTop : 10,width : width-100, height : 50, backgroundColor : "#01BEFE", alignSelf : "center", borderRadius : 40}}>
              <TouchableOpacity onPress={()=>this.setLocation()} style={{width : width-100, height : 50, alignSelf : "center", borderRadius : 40}}>
                <Text style={{color : 'white', fontSize : 16, textAlign : 'center', marginTop : 15}}>Set Lokasi</Text>
              </TouchableOpacity>
            </View>
            {/*gap dibawah button set lokasi*/}
            <View style={{height : 10}}></View>
          </View>
          {/*Map main View*/}
          <MapView style={{height : height-100, width : width}} initialRegion={{
              latitude : this.state.myLatitude,
              longitude : this.state.myLongitude,
              latitudeDelta : 0.0922,
              longitudeDelta : 0.0421
          }}
          >
            {/*Marker posisi user*/}
            <MapView.Marker draggable
                onDragEnd={(e)=>{
                  this.setState({myLatitude:e.nativeEvent.coordinate.latitude,
                  myLongitude : e.nativeEvent.coordinate.longitude,});
                  }
                }
                coordinate ={{
                    latitude: this.state.myLatitude,
                    longitude: this.state.myLongitude,
                }}
                title = "Lokasi Anda Saat Ini"
                description = "Tekan dan geser untuk memindahkan marker"
            >
                <View style={styles.marker2}>
                <View style={styles.marker1}>
                    <View style={styles.marker0}>
                    <Icon name="person" style={styles.content}/>
                   
                    </View>
                </View>
                </View>
            </MapView.Marker>

             {/*Marker tujuan user*/}
             <MapView.Marker draggable
                onDragEnd={(e)=>{
                  this.setState({myLatitude:e.nativeEvent.coordinate.latitude,
                  myLongitude : e.nativeEvent.coordinate.longitude,});
                  }
                }
                coordinate ={{
                    latitude: this.state.tujuanLatitude,
                    longitude: this.state.tujuanLongitude,
                }}
                title = "Tujuan Anda"
                description = "Jln. Raya By Pass Ngurah Rai"
            >
                <View style={styles.marker2}>
                <View style={styles.marker1}>
                    <View style={styles.markerTujuan}>
                    <Icon name="flag" style={styles.contentTujuan}/>
                   
                    </View>
                </View>
                </View>
            </MapView.Marker>

            {/*Marker kendaraan yg tersedia*/}
            <MapView.Marker draggable
                onDragEnd={(e)=>{
                  this.setState({myLatitude:e.nativeEvent.coordinate.latitude,
                  myLongitude : e.nativeEvent.coordinate.longitude,});
                  }
                }
                coordinate ={{
                    latitude: -8.552317,
                    longitude: 115.267312,
                }}
                title = "Gede Ari Putra"
                description = "Jln. Danau Toba, Denpasar Timur"
            >
                <View style={styles.marker2}>
                <View style={styles.marker1}>
                    <View style={styles.markerKendaraan}>
                    <Icon name="car" style={styles.contentkendaraan}/>
                   
                    </View>
                </View>
                </View>
            </MapView.Marker>

              {/*Marker kendaraan yg tersedia*/}
              <MapView.Marker draggable
                onDragEnd={(e)=>{
                  this.setState({myLatitude:e.nativeEvent.coordinate.latitude,
                  myLongitude : e.nativeEvent.coordinate.longitude,});
                  }
                }
                coordinate ={{
                    latitude: -8.595817,
                    longitude: 115.267312,
                }}
                title = "Santa Yana"
                description = "Jln. Raya Celuk, Denpasar Timur"
            >
                <View style={styles.marker2}>
                <View style={styles.marker1}>
                    <View style={styles.markerKendaraan}>
                    <Icon name="car" style={styles.contentkendaraan}/>
                   
                    </View>
                </View>
                </View>
            </MapView.Marker>

              {/*Marker kendaraan yg tersedia*/}
              <MapView.Marker draggable
                onCalloutPress={()=>this.setState({driver : true})}
                onDragEnd={(e)=>{
                  this.setState({myLatitude:e.nativeEvent.coordinate.latitude,
                  myLongitude : e.nativeEvent.coordinate.longitude,});
                  }
                }
                coordinate ={{
                    latitude: -8.612317,
                    longitude: 115.287312,
                }}
                title = "Wiratma Jaya"
                description = "Jln. Danau Toba, Denpasar Timur"
            >
                <View style={styles.marker2}>
                <View style={styles.marker1}>
                    <View style={styles.markerKendaraan}>
                    <Icon name="bicycle" style={styles.contentkendaraan}/>
                   
                    </View>
                </View>
                </View>
            </MapView.Marker>

            {/*jalan dari lokasi user ke tujuan*/}
            <MapViewDirections
                origin={{latitude :this.state.myLatitude, longitude : this.state.myLongitude }}
                destination={{latitude : this.state.tujuanLatitude, longitude : this.state.tujuanLongitude}}
                apikey={"AIzaSyDi8pAFaNLoQPDgUaeH9tg4sN1G3jRc50o"}
                strokeWidth={3}
                strokeColor="blue"
            />
          </MapView>
      </Content>
    </View>
    );
  }
}
  
const styles = StyleSheet.create({

container : {
  flex : 1,
  backgroundColor : 'white',
  height : height,
  width : width
},
box:{
  width : 600,
  height : 50
},
content : {
  color: 'white',
  fontWeight: "bold",
  transform: [{ rotate: '45deg'}],
  left : 4,
  top : 3.8,
  fontSize : 17
},
contentTujuan : {
  color: 'white',
  fontWeight: "bold",
  transform: [{ rotate: '45deg'}],
  left : 4,
  top : 6,
  fontSize : 17
},
markerTujuan:{
  height : 20,
  width : 20,
  backgroundColor:"red",
  borderRadius : 10,
  left : 3,
  top : 5
},
contentkendaraan : {
  color: 'white',
  fontWeight: "bold",
  transform: [{ rotate: '45deg'}],
  left : 2.5,
  top : 4,
  fontSize : 17
},
markerKendaraan:{
  height : 20,
  width : 20,
  backgroundColor:"green",
  borderRadius : 10,
  left : 3,
  top : 5
},
marker0:{
  height : 20,
  width : 20,
  backgroundColor:"#01BEFE",
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

