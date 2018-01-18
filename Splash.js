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
  Dimensions
} from 'react-native';
import { Content, Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
var{width,height} = Dimensions.get('window');
export default class Splash extends Component<{}>{

  static navigationOptions = {
    header: null,
  }; 

  constructor(props){
    super(props);
    this.state =({
      email : '',
      password : '',
      loginText : 'L O G I N'
    });
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
  }).then(function(success) {
  //alert(JSON.stringify(success)); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
  }).catch((error) => {
      //alert(JSON.stringify(error.message)); // error.message => "disabled"
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
        <Content style={{width : width, height : height}}>
          <View>
            <Image source={require('./../images/mrt.png')}  style={{height : 150, width : 160, alignSelf : 'center', marginTop : 80}}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20, marginTop : 100}}>
            <Icon name="ios-person" style={{color : "white", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="white" style={{color : 'white', width : width-50, marginLeft : 10}} placeholder="Email" placeholderTextColor='#fff' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20}}>
            <Icon name="ios-key" style={{color : "white", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="white" secureTextEntry={true} style={{color : 'white', width : width-50, marginLeft : 6}} placeholder="Password" placeholderTextColor='#fff' onChangeText={(email)=>this.setState({email})}/>
          </View>
        
          <TouchableOpacity style={styles.loginButn} onPress={()=> navigate('Menu')}>
            <Text style={styles.TombolLogin}>{this.state.loginText}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigate('Signup')}>
          <Text style = {styles.daftar}>Tidak ada akun ? Silahkan Daftar.</Text>
          </TouchableOpacity>
        </Content>
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
   
    backgroundColor: '#01BEFE'
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

