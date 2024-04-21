import React from 'react';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import * as colors from '@util/constants/colors';
import { navigate, goBack } from '@util/navigationService';
import styles from './LinkButton.styles';

interface LinkButtonProps {
  text: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean;
  destination?: string; // TODO: should be `type {Screen1 | Screen2 | etc.}`
  onPress?: (any) => void;
}

export default function LinkButton({
  text,
  destination,
  textColor = colors.NAVY_BLUE,
  borderColor = colors.BANANA_YELLOW,
  disabled = false,
  onPress = () => {},
}: LinkButtonProps) {
  const buttonFunction = destination && navigate
    ? () => navigate(destination)
    : onPress && (func => onPress(func));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.3}
        onPress={buttonFunction}
      >
        <View style={[ styles.textContainer, { borderColor } ]}>
          <Text
            style={[
              styles.text,
              {
                color: disabled
                  ? colors.LIGHT_GRAY_DISABLED
                  : textColor,
              },
            ]}
          >
            {text.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
