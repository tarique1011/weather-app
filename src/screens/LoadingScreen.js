import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { updateCityData } from '../actions';
import { Colors } from '../res';

class LoadingScreen extends Component {
	async componentDidMount() {
		const cityToken = await AsyncStorage.getItem('city');

		if (cityToken) {
			this.props.updateCityData(JSON.parse(cityToken));
			this.props.navigation.navigate('Home');
		} else {
			this.props.navigation.navigate('Location');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.textStyle}>Weather.in</Text>
				<ActivityIndicator size={40} color={'white'} />
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.blue
	},
	textStyle: {
		fontSize: 40,
		color: Colors.white,
		margin: 10
	}
};

const LoadingScreenWithRedux = connect(
	null,
	{ updateCityData }
)(LoadingScreen);

export { LoadingScreenWithRedux };
