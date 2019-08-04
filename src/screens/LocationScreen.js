import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
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

	async componentDidMount() {
		const cityToken = await AsyncStorage.getItem('city');

		if (cityToken) {
			this.props.updateCityData(JSON.parse(cityToken));
			this.props.navigation.navigate('Home');
		}
	}

	async onPress(item) {
		this.props.updateCityData(item);
		await AsyncStorage.setItem('city', JSON.stringify(item));
		this.props.navigation.navigate('Home');
	}

	updateCity = async city => {
		this.setState({ isLoading: true });
		await this.setState({ city });

		let cityName = this.state.city;
		cityName = cityName.toLowerCase();

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

	renderFlatList() {
		return <FlatList data={this.state.data} renderItem={this.renderItem} keyExtractor={(item, index) => index} />;
	}

	renderHeader() {
		return (
			<View style={styles.headerStyle}>
				<Text style={styles.headerTextStyle}>Select your Location</Text>
			</View>
		);
	}

	renderSearchBar() {
		return <SearchBar lightTheme placeholder="Type Here..." onChangeText={this.updateCity} value={this.state.city} />;
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
				{this.renderSearchBar()}
				{this.renderBottomContainer()}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1
	},
	headerStyle: {
		height: 50,
		padding: 20,
		justifyContent: 'center'
	},
	headerTextStyle: {
		fontSize: 25,
		color: 'black',
		fontWeight: '500',
		fontFamily: 'Roboto'
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
