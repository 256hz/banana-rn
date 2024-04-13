import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import useGlobalStore from '@state';
import MainOption from './MainOption/MainOption';
import styles from './MenuDrawer.styles';

function MenuDrawer(props) {
  const logOut = useGlobalStore(state => state.logOut);
  const user = useGlobalStore(state => state.user);
  let name = '';

  if (user) {
    if ('organization_name' in user) {
      name = user.organization_name as string;
    } else if ('first_name' in user) {
      name = user.first_name as string;
    }
  }

  return (
    <ScrollView>
      <View style={styles.drawerHeader}>
        <Text
          style={{
            ...styles.username,
            marginBottom: 0,
          }}
        >
          Hello,
        </Text>
        <Text style={styles.username}>{name}</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <DrawerItem
          {...props}
          labelStyle={styles.labelText}
          itemStyle={styles.menuItem}
          onItemPress={async ({ route }) => {
            props.navigation.toggleDrawer();
            props.navigation.navigate(route.routeName);
          }}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={async () => {
          props.navigation.toggleDrawer();
          props.navigation.navigate('LogoutScreen');
          await logOut();
        }}
      >
        <MainOption icon="logout" text="Log Out" />
      </TouchableOpacity>
    </ScrollView>
  );
}

export default MenuDrawer;
