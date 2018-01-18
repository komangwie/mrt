import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,
    Image,
    View,
    Dimensions,
    StatusBar,
    Modal,
    ActivityIndicator,
    ImageBackground,
    Alert
} from 'react-native';
import { StackNavigator, navigate } from 'react-navigation';
import {
    Container, Content,Input, Text, Button, Form, Item
} from 'native-base';

var{width,height}=Dimensions.get('window');

export default class Login extends Component{
  constructor(props) {
      super(props);
      console.ignoredYellowBox = ['Setting a timer'];
      this.state = {
          email : null,
          password: null,
          uid: null,
          modalVisible : false,
          animating: true
      };
  }

static navigationOptions = {
    header: null,
}; 
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>

        <StatusBar
            backgroundColor = {"rgba(48, 18, 18, 0.1)"}
            translucent
        />

       <ImageBackground
        source={require('./background.png')}
        style={styles.backgroundImage}>
        <Modal
                animationType = {"fade"}
                transparent   = {true}
                visible       = {this.state.modalVisible} onRequestClose ={()=>{}}
            >
              <View style={{height : height, width : null,  backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>

                <View style={{
                    backgroundColor : 'white',
                    borderRadius: 5,
                    alignSelf : 'center',
                    height: 80,
                    width : width/1.5,
                    marginTop: '70%',
                    flexDirection : 'row'
                    
                }} >
                    <ActivityIndicator
                        animating={this.state.animating}
                        color="orange"
                        size = 'large'
                        style={{marginTop:5, marginLeft : 25}}
                    />
                    <Text style={{color : "grey", marginTop : 30, marginLeft : 10}}>Authenticating...</Text>
                </View>
              </View>
            </Modal>

            <Content style={{width:width}}>
                <Image source={require('./logo.png')} style={{width:100, height : 150, alignSelf:"center", marginTop : "20%"}}/>
                <Input
                    placeholder='Email'
                    placeholderTextColor="#F9F9F9"
                    style={{color:'white', borderWidth:0.5,borderColor:'white',borderRadius : 30, width : width-50, alignSelf : 'center', marginTop : 30}}
                    onChangeText={(email)=>this.setState({email})}
                />
                <Input
                    placeholder='Password'
                    placeholderTextColor="#F9F9F9"
                    style={{color:'white', borderWidth:0.5,borderColor:'white' ,borderRadius : 30, width : width-50, alignSelf : 'center', marginTop : 10}}
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}
                />
                <Button login
                        style={{
                            backgroundColor:'#ff8c00',
                            alignSelf:'center',
                            marginTop:'8%',
                            width : width-50
                            ,borderRadius : 30,
                        }}
                >
                        <Text style={{marginLeft : width/3}}>
                            Login
                        </Text>
                </Button>
                <View style={{width : width-50, alignSelf : 'center', flexDirection : 'row', marginTop : 20}}>
                    <View style={{height : 2, width : width/3, backgroundColor : 'white', marginTop : 26}}></View>
                    <View style={{ width : 72, height : 50, marginTop : 10}}>
                        <Text style={{textAlign : 'center', marginTop:'5%', color:'white'}}>
                            OR
                        </Text>
                    </View>
                    <View style={{height : 1, width : width/3, backgroundColor : 'white', position : 'absolute', right : 0, top : 26}}></View> 
                </View>
                <Button login onPress={()=>navigate('Signup')} style={{backgroundColor:'#2f2f2f',borderRadius : 30, alignSelf:'center', marginTop:'0%', width : width-50}}><Text style={{marginLeft : width/3.3}}> Sign Up </Text></Button>
                <View style={{height : 10}}></View>
            </Content>   
    
        </ImageBackground>
      </View>
    );
   }
}

const styles = StyleSheet.create({
  backgroundImage : {
     flex: 1,
        width: null,
        height: null,
  },
  container :{
    flex : 1
  }
});