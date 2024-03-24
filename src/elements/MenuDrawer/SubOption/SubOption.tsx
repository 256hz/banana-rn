import React from 'react';
import { Text } from 'react-native';

import styles from './SubOption.styles';

function SubOption({ text }) {
  return <Text style={styles.subOption}>{text}</Text>;
}

export default SubOption;
