import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeScreenWithRedux, LocationScreenWithRedux, LoadingScreenWithRedux } from './screens';

const switchNavigator = createSwitchNavigator({
	Loading: LoadingScreenWithRedux,
	Location: LocationScreenWithRedux,
	Home: HomeScreenWithRedux
});

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;
