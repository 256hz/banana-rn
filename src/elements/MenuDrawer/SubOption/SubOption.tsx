import React from 'react';
import { Text } from 'react-native';

import styles from './SubOption.styles';

const SubOption = ({ text }) => <Text style={styles.subOption}>{text}</Text>;
// console.log('suboption: ', text);

export default SubOption;
