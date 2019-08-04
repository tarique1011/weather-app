import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weather_state_name: '',
			weather_state_abbr: '',
			applicable_date: '',
			source: ''
		};
	}

	componentDidMount() {
		axios.get(`https://www.metaweather.com/api/location/${this.props.city.cityData.woeid}`).then(res => {
			const { weather_state_name, weather_state_abbr, applicable_date } = res.data.consolidated_weather[0];
			this.setState({ weather_state_abbr, weather_state_name, applicable_date });
		});
	}

	renderWeatherCard() {
		return (
			<View style={{ margin: 20, height: 200, width: '90%', padding: 10, borderRadius: 5, borderWidth: 1 }}>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
					<Text style={{ fontSize: 20, color: 'black' }}>{this.props.city.cityData.title}</Text>
					<Text style={{ fontSize: 20 }}>{this.state.applicable_date}</Text>
				</View>
				<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
					<Image
						style={{ width: 80, height: 80 }}
						source={{ uri: `https://www.metaweather.com/static/img/weather/png/${this.state.weather_state_abbr}.png` }}
					/>
					<View style={{ justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
						<Text style={{ fontSize: 18 }}>Today's Weather Condition</Text>
						<Text style={{ fontSize: 30, color: 'black' }}>{this.state.weather_state_name}</Text>
					</View>
				</View>
			</View>
		);
	}
	render() {
		return <View style={styles.container}>{this.renderWeatherCard()}</View>;
	}
}

const styles = {
	container: {
		flex: 1,
		alignItems: 'center'
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
