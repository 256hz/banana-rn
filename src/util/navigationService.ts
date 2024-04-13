import { DrawerActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(name, params?) {
  navigator?.navigate({
    name,
    params,
  });
}

function goBack() {
  if (navigator) {
    navigator.goBack();
  } else {
    console.log('no navigator to go back');
  }
}

function toggleDrawer() {
  if (navigator) {
    console.log('dispatch', navigator);
    navigator.dispatch(DrawerActions.toggleDrawer());
  } else {
    console.log('No navigator to toggle drawer');
  }
}

export {
  navigate,
  setTopLevelNavigator,
  toggleDrawer,
  goBack,
};
