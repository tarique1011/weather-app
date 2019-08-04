import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeScreenWithRedux, LocationScreenWithRedux } from './screens';

const switchNavigator = createSwitchNavigator({
	Location: LocationScreenWithRedux,
	Home: HomeScreenWithRedux
});

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;
