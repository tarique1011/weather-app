import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCityData } from '../actions';

class LocationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			data: [],
			isLoading: false
		};
		this.renderItem = this.renderItem.bind(this);
	}

	onPress(item) {
		this.props.updateCityData(item);
		this.props.navigation.navigate('Home');
	}

	updateCity = async city => {
		this.setState({ isLoading: true });
		await this.setState({ city });
		let cityName = this.state.city;
		cityName = cityName.toLowerCase();
		console.log(cityName);
		axios
			.get(`https://www.metaweather.com/api/location/search/?query=${cityName}`)
			.then(res => this.setState({ data: res.data, isLoading: false }))
			.catch(err => this.setState({ isLoading: false }));
	};

	renderItem({ item }) {
		return (
			<TouchableOpacity style={styles.cellStyle}>
				<Text style={styles.cellTextStyle} onPress={() => this.onPress(item)}>
					{item.title}
				</Text>
			</TouchableOpacity>
		);
	}

	renderHeader() {
		return <SearchBar placeholder="Type Here..." onChangeText={this.updateCity} value={this.state.city} />;
	}

	renderFlatList() {
		return <FlatList data={this.state.data} renderItem={this.renderItem} keyExtractor={(item, index) => index} />;
	}

	renderBottomContainer() {
		if (this.state.isLoading) {
			return (
				<View style={{ margin: 10 }}>
					<ActivityIndicator size={40} color="black" />
				</View>
			);
		}

		return this.renderFlatList();
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderHeader()}
				{this.renderBottomContainer()}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1
	},
	cellStyle: {
		height: 50,
		justifyContent: 'center',
		paddingLeft: 20,
		borderBottomWidth: 1
	},
	cellTextStyle: {
		fontSize: 16
	}
};

export const LocationScreenWithRedux = connect(
	null,
	{ updateCityData }
)(LocationScreen);
