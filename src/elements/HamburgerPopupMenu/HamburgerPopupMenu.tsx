import React from 'react';
import { TouchableOpacity } from 'react-native';
import { toggleDrawer } from '@util/navigationService';
import { Icon } from '@elements';
import { NAVBAR_ICON_SIZE } from '@util/constants/icons';

export default function HamburgerPopupMenu() {
  return (
    <TouchableOpacity onPress={() => toggleDrawer()}>
      <Icon name="menu" size={NAVBAR_ICON_SIZE} />
    </TouchableOpacity>
  );
}
