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
  BackHandler,
  Modal,
  AsyncStorage,
  StatusBar,
  Dimensions,
} from 'react-native';

import { Content, Icon } from 'native-base';

import { StackNavigator } from 'react-navigation';
var{width,height} = Dimensions.get('window');


export default class Profile extends Component<{}>{

  static navigationOptions = {
    header: null,
  }; 

  constructor(props){
    super(props);
    this.state =({
      nama :'Wiratma Jaya',
      email : 'wiratmajaya82@gmail.com',
      telp : "087853947663"
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
  navigation.state.params.onSelectScreen({ menuPage: true });
  return true;
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
                  <Icon  name="ios-arrow-back" style={{color : "white", fontSize : 30}}/>
              </TouchableOpacity>
          </View>
          <View style={{ width : width-60, marginTop : 30}}>
              <Text style={{color : 'white', textAlign : 'center', fontSize : 18, marginTop : 5}}>Profil</Text>
          </View>
      </View>
      <Content>
        <View style={{width : 100, height : 100, backgroundColor : 'gray', marginTop : 50, alignSelf : 'center', borderRadius : 50}}>
             <TouchableOpacity style={{height : 100, width : 100}}>
                <View style={{position : 'absolute', zIndex : 1}}>
                  <Image source={require('./../images/wi.jpg')} style={{height : 100, width : 100, borderRadius : 50,alignSelf : 'center'}}/>
                </View>
                <Icon style={{color : 'white', textAlign : 'center', marginTop : 10,fontSize : 70}} name = "person"/>
             </TouchableOpacity>
        </View>

         <View style={{flexDirection : 'row',width : width, paddingLeft : 20, marginTop : 10}}>
            <Icon name="person" style={{color : "black", fontSize : 25, marginTop : 10}}/>
            <TextInput value={this.state.nama} underlineColorAndroid="black" style={{color : 'black', width : width-50, marginLeft : 10}} placeholder="Nama" placeholderTextColor='black' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20,}}>
            <Icon name="ios-phone-portrait" style={{color : "black", fontSize : 25, marginTop : 10}}/>
            <TextInput  value={this.state.telp} underlineColorAndroid="black" style={{color : 'black', width : width-50, marginLeft : 18}} placeholder="Nomor Telepon" placeholderTextColor='black' onChangeText={(email)=>this.setState({email})}/>
          </View>
          <View style={{flexDirection : 'row',width : width, paddingLeft : 20,}}>
            <Icon name="ios-mail" style={{color : "black", fontSize : 25, marginTop : 10}}/>
            <TextInput  value={this.state.email} underlineColorAndroid="black" style={{color : 'black', width : width-50, marginLeft : 10}} placeholder="Email" placeholderTextColor='black' onChangeText={(email)=>this.setState({email})}/>
          </View>
         
          <TouchableOpacity style={{width : width-100, height : 40, backgroundColor : '#01BEFE', borderRadius : 20, alignSelf : 'center', marginTop : 20, paddingTop : 8}} onPress={()=> navigate('Menu')}>
            <Text style={{color : 'white', textAlign : 'center', fontSize : 16}}>Simpan Perubahan</Text>
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

