/**
 * WRITTEN BY I GEDE ARI PUTRA
 */

import React, { Component } from 'react'; 
import {
  Platform, 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image, 
  BackHandler,
  Modal,
  AsyncStorage,
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';
import { Content, Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
var{width,height} = Dimensions.get('window');

export default class SplashScreen extends Component<{}>{

static navigationOptions = {
header: null,
}; 

constructor(props){
  super(props);
  this.state = {
    animatedValue : new Animated.Value(0),
    interpolatedColorAnimation : null,
  };
  //cek gps on/off
  this.checkGPS();
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
  }).then((success)=>{
  //alert(JSON.stringify(success.enabled)); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
    if(success.enabled == true || success.enabled == "true"){
          AsyncStorage.getItem("email").then((data)=>{
            const { navigate } = this.props.navigation
            if(data==null){
              Animated.timing(this.state.animatedValue, {
                toValue: 100,
                duration: 1000
              }).start(()=>{
                  navigate("Login");
              }); 
            }
            else{
              Animated.timing(this.state.animatedValue, {
                toValue: 100,
                duration: 2000
              }).start(()=>{
              //navigate("Menu");
              }); 
            }
          });
    }
    else{
        
    }
  }).catch((error) => {
    //   alert(JSON.stringify(error.message)); // error.message => "disabled"
      BackHandler.exitApp();
  });
  //check gps end
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
        <View style={{width : 220, height : 220, borderRadius : 105, paddingTop : 3, paddingLeft : 3, borderWidth : 2, borderColor : 'white'}}>
            <View style={{width : 210, height : 210, borderRadius : 105, paddingTop : 4, paddingLeft : 4, borderWidth : 1, borderColor : 'white'}}>
            <View style={{width : 200, height : 200, backgroundColor : "rgb(210,210,210)", borderRadius : 100, paddingTop : 30}}>
                <Image source={require('./logo.png')}  style={{height : 160, width : 120, alignSelf : 'center'}}/>
            </View>
            </View>
        </View>
			</View>

		);
	}
}

const styles = StyleSheet.create({

  gambarBelakang: {
    flex :1
  },
logoText: {
    fontSize: 25,
    color:'#000',
    marginBottom:26,
    paddingBottom: 60
      },

 tekss :{
    justifyContent: 'center',
    alignItems : 'center'
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
    backgroundColor: 'orange'
  },
  daftar: {
    color: '#ffff',
    textAlign : 'center'
  },
   kotakInput: {
    width:300,
    borderColor: '#fff',
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor:'transparent',
  },
  TombolLogin: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  loginButn: {
    width: width-150,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 27,
    marginVertical: 25,
    justifyContent: 'center',
    alignSelf : 'center'
  }
});

