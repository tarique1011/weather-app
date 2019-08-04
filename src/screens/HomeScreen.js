import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Share from 'react-native-share';
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

	shareQuote = () => {
		const shareOptions = {
			title: 'Share via',
			url: this.state.quoteData.quoteLink
		};
		Share.open(shareOptions);
	};

	renderWeatherCardHeader() {
		return (
			<View style={styles.weatherCardHeaderStyle}>
				<TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={this.onPressLocation}>
					<Text style={styles.cityTextStyle}>{this.props.city.cityData.title}</Text>
					<Image source={Images.location} style={styles.locationImageStyle} resizeMode="contain" />
				</TouchableOpacity>

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

	renderShareButton() {
		return (
			<TouchableOpacity onPress={this.shareQuote} style={styles.shareButtonStyle}>
				<Text style={styles.shareButtonTextStyle}>Share</Text>
			</TouchableOpacity>
		);
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
				{this.renderShareButton()}
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
		alignItems: 'center',
		backgroundColor: Colors.backgroundBG
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
		borderWidth: 2,
		borderRadius: 8
	},
	quoteHeaderStyle: {
		fontSize: 22,
		fontFamily: 'Roboto',
		marginVertical: 10,
		color: Colors.black
	},
	quoteTextStyle: {
		marginTop: 10,
		fontWeight: '400',
		fontSize: 28,
		fontStyle: 'italic',
		color: Colors.black
	},
	quoteAuthorStyle: {
		fontSize: 18,
		fontWeight: '400',
		fontStyle: 'italic',
		alignSelf: 'flex-end',
		marginTop: 5
	},
	shareButtonStyle: {
		marginTop: 30,
		marginBottom: 5,
		alignSelf: 'center',
		width: '80%',
		height: 40,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: Colors.blue,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
		elevation: 5
	},
	shareButtonTextStyle: {
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: '500',
		color: Colors.blue
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
