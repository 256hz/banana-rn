import { DrawerActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(name, params?) {
  if (navigator) {
    navigator.navigate({
      name,
      params,
    });
  }
}

function goBack() {
  if (navigator && navigator.canGoBack()) {
    navigator.goBack();
  }
}

function toggleDrawer() {
  if (navigator) {
    navigator.dispatch(DrawerActions.toggleDrawer());
  }
}

export {
  navigate,
  setTopLevelNavigator,
  toggleDrawer,
  goBack,
};
