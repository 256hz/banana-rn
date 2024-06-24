import { CommonActions, DrawerActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
	navigator = navigatorRef;
}

function navigate(routeName, params?) {
	navigator.dispatch(
		CommonActions.navigate({
			name: routeName,
			params,
		})
	);
}

function goBack() {
	navigator.dispatch(CommonActions.goBack());
}

function toggleDrawer() {
	navigator.dispatch(DrawerActions.toggleDrawer());
}

export default {
	navigate,
	setTopLevelNavigator,
	goBack,
	toggleDrawer,
};
