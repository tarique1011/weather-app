import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Images, Colors } from '../res';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weather_state_name: '',
			weather_state_abbr: '',
			applicable_date: '',
			source: '',
			quoteData: {},
			isLoading: true
		};
	}

	componentDidMount() {
		axios.get(`https://www.metaweather.com/api/location/${this.props.city.cityData.woeid}`).then(res => {
			const { weather_state_name, weather_state_abbr, applicable_date } = res.data.consolidated_weather[0];
			this.setState({ weather_state_abbr, weather_state_name, applicable_date });

			axios
				.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
				.then(quoteData => this.setState({ quoteData: quoteData.data, isLoading: false }));
		});
	}

	onPressLocation = () => {
		AsyncStorage.removeItem('city');
		this.props.navigation.navigate('Location');
	};

	renderWeatherCardHeader() {
		return (
			<View style={styles.weatherCardHeaderStyle}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Text style={styles.cityTextStyle}>{this.props.city.cityData.title}</Text>
					<TouchableOpacity onPress={this.onPressLocation}>
						<Image source={Images.location} style={styles.locationImageStyle} resizeMode="contain" />
					</TouchableOpacity>
				</View>
				<Text style={{ fontSize: 20 }}>{this.state.applicable_date}</Text>
			</View>
		);
	}

	renderWeatherInfo() {
		return (
			<View style={styles.weatherInfoContainer}>
				<Image
					style={{ width: 80, height: 80 }}
					source={{ uri: `https://www.metaweather.com/static/img/weather/png/${this.state.weather_state_abbr}.png` }}
				/>
				<View style={styles.weatherTextStyle}>
					<Text style={{ fontSize: 18 }}>Today's Weather Condition</Text>
					<Text style={{ fontSize: 30, color: 'black' }}>{this.state.weather_state_name}</Text>
				</View>
			</View>
		);
	}

	renderQuoteView() {
		return (
			<View>
				<Text style={styles.quoteHeaderStyle}>Quote of the day</Text>
				<Text style={styles.quoteTextStyle}>"{this.state.quoteData.quoteText}"</Text>
				<Text style={styles.quoteAuthorStyle}>- {this.state.quoteData.quoteAuthor}</Text>
			</View>
		);
	}

	renderShareButtons() {
		return <View />;
	}

	renderWeatherCard() {
		return (
			<View style={styles.weatherCardContainer}>
				{this.renderWeatherCardHeader()}
				{this.renderWeatherInfo()}
			</View>
		);
	}

	renderQuoteContainer() {
		return (
			<View style={styles.quoteContainerStyle}>
				{this.renderQuoteView()}
				{this.renderShareButtons()}
			</View>
		);
	}

	renderSpinner() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ fontSize: 20, marginVertical: 10 }}>Please Wait...</Text>
				<ActivityIndicator size={40} color={'black'} />
			</View>
		);
	}
	render() {
		if (this.state.isLoading) {
			return this.renderSpinner();
		}

		return (
			<View style={styles.container}>
				{this.renderWeatherCard()}
				{this.renderQuoteContainer()}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		alignItems: 'center'
	},
	weatherCardContainer: {
		margin: 20,
		height: 200,
		width: '90%',
		padding: 10,
		borderRadius: 5
	},
	weatherCardHeaderStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	cityTextStyle: {
		fontSize: 25,
		color: Colors.black
	},
	locationImageStyle: {
		height: 20,
		width: 15,
		margin: 5
	},
	weatherInfoContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	weatherTextStyle: {
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%'
	},
	quoteContainerStyle: {
		width: '90%',
		padding: 10,
		marginTop: 20,
		borderWidth: 1,
		borderRadius: 5
	},
	quoteHeaderStyle: {
		fontSize: 20,
		fontWeight: '500',
		fontFamily: 'Roboto',
		marginVertical: 10,
		color: Colors.black
	},
	quoteTextStyle: {
		fontSize: 28,
		fontStyle: 'italic',
		color: Colors.blue
	},
	quoteAuthorStyle: {
		fontSize: 18,
		fontStyle: 'italic',
		alignSelf: 'flex-end',
		marginTop: 5
	}
};

mapStateToProps = state => {
	return {
		city: state.city
	};
};

export const HomeScreenWithRedux = connect(
	mapStateToProps,
	null
)(HomeScreen);
