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
  ImageBackground,
  Image, 
  BackHandler,
  Modal,
  AsyncStorage,
  StatusBar,
  Dimensions
} from 'react-native';

import { Content, Icon } from 'native-base';

import { StackNavigator } from 'react-navigation';
var{width,height} = Dimensions.get('window');


export default class Signup extends Component<{}>{

  static navigationOptions = {
    header: null,
  }; 

  constructor(props){
    super(props);
    this.state =({
      nama :'',
      email : '',
      password : '',
      Confirm  : '',
      signuptext : 'S I G N UP'
    
    });
    
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
  navigation.state.params.onSelect({ loginPage: true });
  return true;
}

signup=()=>{
  const { navigate } = this.props.navigation;
  navigate("Menu");
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
              <TouchableOpacity style={{width : 20}}>
                  <Icon name="ios-arrow-back" style={{color : "white", fontSize : 30}}/>
              </TouchableOpacity>
          </View>
          <View style={{ width : width-80, marginTop : 30}}>
              <Text style={{color : 'white', textAlign : 'center', fontSize : 18, marginTop : 5}}>Buat Akun</Text>
          </View>
      </View>
      <Content>
         <View style={{flexDirection : 'row',width : width, paddingLeft : 20, marginTop : 100}}>
            <Icon name="person" style={{color : "white", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="white" style={{color : 'white', width : width-50, marginLeft : 10}} placeholder="Nama" placeholderTextColor='#fff' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20,}}>
            <Icon name="ios-phone-portrait" style={{color : "white", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="white" style={{color : 'white', width : width-50, marginLeft : 18}} placeholder="Nomor Telepon" placeholderTextColor='#fff' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20,}}>
            <Icon name="ios-mail" style={{color : "white", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="white" style={{color : 'white', width : width-50, marginLeft : 10}} placeholder="Email" placeholderTextColor='#fff' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20}}>
            <Icon name="ios-key" style={{color : "white", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="white" secureTextEntry={true} style={{color : 'white', width : width-50, marginLeft : 6}} placeholder="Password" placeholderTextColor='#fff' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20}}>
            <Icon name="ios-key" style={{color : "white", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="white" secureTextEntry={true} style={{color : 'white', width : width-50, marginLeft : 6}} placeholder="Masukkan ulang password" placeholderTextColor='#fff' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <TouchableOpacity style={{width : width-150, height : 40, backgroundColor : '#000', borderRadius : 20, alignSelf : 'center', marginTop : 20, paddingTop : 8}} onPress={()=> this.signup()}>
            <Text style={{color : 'white', textAlign : 'center', fontSize : 18}}>D A F T A R</Text>
          </TouchableOpacity>
          <Text style={{color : 'white', textAlign : 'center', marginTop : 25}}>Dengan menekan Daftar anda telah menyetujui persyaratan dan ketentuan yang berlaku</Text>
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

  container : {
    flex : 1,
    backgroundColor : '#01BEFE',
    height : height,
    width : width
  },
  
  loginButn: {
    width: width-150,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 27,
    marginVertical: 25,
    justifyContent: 'center',
    alignSelf : 'center'
  },

   kotakInput: {
    width:300,
    borderColor: '#fff',
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor:'transparent',


  },
  TombolLogin: {
    fontSize: 25,
    color: '#02ff06',
    textAlign: 'center'
  },
  loginButn: {
    width: 150,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 27,
    marginVertical: 15,
    justifyContent: 'center'
  }
});

