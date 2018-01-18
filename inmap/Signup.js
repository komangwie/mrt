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
              <Text style={{color : 'gray', textAlign : 'center', fontSize : 18, marginTop : 5}}>Create Account</Text>
          </View>
      </View>
      <Content>
         <View style={{flexDirection : 'row',width : width, paddingLeft : 20, marginTop : 100}}>
            <Icon name="person" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="gray" style={{color : 'gray', width : width-50, marginLeft : 10}} placeholder="Nama" placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20,}}>
            <Icon name="ios-phone-portrait" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="gray" style={{color : 'gray', width : width-50, marginLeft : 18}} placeholder="Nomor Telepon" placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20,}}>
            <Icon name="ios-mail" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="gray" style={{color : 'gray', width : width-50, marginLeft : 10}} placeholder="Email" placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20}}>
            <Icon name="ios-key" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="gray" secureTextEntry={true} style={{color : 'gray', width : width-50, marginLeft : 6}} placeholder="Password" placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20}}>
            <Icon name="ios-key" style={{color : "gray", fontSize : 25, marginTop : 10}}/>
            <TextInput underlineColorAndroid="gray" secureTextEntry={true} style={{color : 'gray', width : width-50, marginLeft : 6}} placeholder="Masukkan ulang password" placeholderTextColor='gray' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <TouchableOpacity style={{width : width-150, height : 40, backgroundColor : 'orange', borderRadius : 20, alignSelf : 'center', marginTop : 20, paddingTop : 8}} onPress={()=> this.signup()}>
            <Text style={{color : 'white', textAlign : 'center', fontSize : 18}}>S I G N U P</Text>
          </TouchableOpacity>
          <Text style={{color : 'gray', textAlign : 'center', marginTop : 25}}>By clicking SIGNUP you agree to our terms and service</Text>
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
    backgroundColor : 'white',
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
    borderColor: 'gray',
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

