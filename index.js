
import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Signup from './source/pages/Signup';
import Dashboard from './source/pages/Dashboard';
import Menu from './source/pages/Menu';
import Profile from './source/pages/profile';
import Splash from './source/pages/Splash';
import Riwayat from './source/pages/Riwayat';
import Login from './source/pages/Login';

export default class Index extends Component {

	 static navigationOptions = {
    header: null,
  };
  constructor(props){
	  super(props);
	  this.state={
		  tes : 'Menu'
	  };
  }
	render(){
		const { navigation } = this.props;
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.container}>

			<Login navigation={navigation}/>

			</View>
		);
	}
}

const SimpleNav = StackNavigator ({
	Splash : {screen : Splash},
	Login : { screen:Login },
	Signup: { screen:Signup },
	Dashboard: { screen:Dashboard },
	Menu : {screen : Menu},
	Profile : {screen : Profile},
	Riwayat : {screen : Riwayat}
});

const styles = StyleSheet.create({

	container:{
		flex: 1
	}
  
});
AppRegistry.registerComponent('MRT', () => SimpleNav);
