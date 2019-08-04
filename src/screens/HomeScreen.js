import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class HomeScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>{this.props.city.cityData.title}</Text>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
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
