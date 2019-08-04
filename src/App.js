import React, { Component } from 'react';
import { View } from 'react-native';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<AppNavigator />
				</View>
			</Provider>
		);
	}
}

const styles = {
	container: {
		flex: 1
	}
};

export default App;
