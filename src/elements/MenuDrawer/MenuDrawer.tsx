import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrawerItem, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import useGlobalStore from '@state';
import { navigate } from '@util/navigationService';
import { NAVY_BLUE } from '@util/constants/colors';
import MainOption from './MainOption/MainOption';
import styles from './MenuDrawer.styles';

// Assuming drawerItems comes from a parent component or context
interface DrawerItemOptions {
  drawerLabel: () => React.ReactNode;
  showNavBar: boolean;
}

interface DrawerItemConfig {
  // TODO: remove and update `any` type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  options: DrawerItemOptions;
}

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  drawerItems: Record<string, DrawerItemConfig>;
}

const MenuDrawer: React.FC<CustomDrawerContentProps> = ({ drawerItems, ...drawerProps }) => {
  const logOut = useGlobalStore(state => state.logOut);
  const user = useGlobalStore(state => state.user);
  let userName = '';

  if (user) {
    if ('organization_name' in user) {
      userName = user.organization_name as string;
    } else if ('first_name' in user) {
      userName = user.first_name as string;
    }
  }

  return (
    <DrawerContentScrollView {...drawerProps} style={{ backgroundColor: NAVY_BLUE }}>
      <View style={styles.drawerHeader}>
        <Text style={{ ...styles.username, marginBottom: 0 }}>Hello,</Text>
        <Text style={styles.username}>{userName}</Text>
      </View>
      <SafeAreaView style={styles.container}>
        {Object.entries(drawerItems).map(([ key, { component: { name }, options: { drawerLabel, showNavBar } } ]) => (
          <DrawerItem
            key={key}
            label={drawerLabel}
            onPress={() => navigate(name, { showNavBar })}
          />
        ))}
      </SafeAreaView>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={async () => {
          await logOut();
        }}
      >
        <MainOption icon="logout" text="Log Out" />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default MenuDrawer;
