// TODO: remove this eslint rule and fix **ALL** `any` types
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from '@elements';
import { ButtonStyle } from '@elements/Button';
import * as colors from '@util/constants/colors';
import Selector from '@elements/NavBar/Selector';
import useGlobalStore from '@state';
import { NAVBAR_ICON_SIZE } from '@util/constants/icons';
import HamburgerPopupMenu from '@elements/HamburgerPopupMenu';
import {
  navigate,
  toggleDrawer,
  goBack,
} from '@util/navigationService';
import styles from './NavBar.styles';

interface NavBarProps {
  backDestination?: string;
  showMenu?: boolean;
  showBackButton?: boolean;
  leftButton?: 'qrCode' | 'back';
  showSelector?: boolean;
  position?: 'map' | 'list';
  onMap?: () => any;
  onList?: () => any;
  backButtonFn?: () => void;
}

export default function NavBar({
  showMenu = true,
  showBackButton = true,
  leftButton = 'back',
  backDestination,
  showSelector,
  position,
  onMap,
  onList,
  backButtonFn,
}: NavBarProps) {
  const buttonStyle: ButtonStyle = {
    default: {
      background: colors.LIGHT_GRAY,
      foreground: colors.NAVY_BLUE,
    },
  };

  const updateAlert = useGlobalStore(state => state.updateAlert);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.backContainer}>
        {leftButton === 'back' && showBackButton && (
          <Button
            buttonStyle={buttonStyle}
            onPress={
              backButtonFn
              || (backDestination
                ? () => navigate(backDestination)
                : () => goBack())
            }
          >
            {_ => <Icon size={NAVBAR_ICON_SIZE} color="blue" name="back" />}
          </Button>
        )}
        {leftButton === 'qrCode' && (
          <Button
            buttonStyle={buttonStyle}
            onPress={() => navigate('QRCodeScannerScreen')}
          >
            {_ => <Icon size={NAVBAR_ICON_SIZE} color="blue" name="qrCode" />}
          </Button>
        )}
      </View>
      {showSelector && position && (
        <Selector position={position} onMap={onMap} onList={onList} />
      )}
      <View style={styles.notificationContainer}>
        <Button
          buttonStyle={buttonStyle}
          style={{
            marginTop: 4,
            marginRight: 8,
          }}
          onPress={() => {
            updateAlert({
              title: 'Coming Soon',
              type: 'coming soon',
              message: 'coming soon',
              dismissible: false,
            });
          }}
        >
          {foregroundColor => <Icon size={NAVBAR_ICON_SIZE} color={foregroundColor} name="bell" />}
        </Button>
        {showMenu && <HamburgerPopupMenu toggleDrawer={toggleDrawer} />}
      </View>
    </View>
  );
}
