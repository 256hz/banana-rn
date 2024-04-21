import {
  LinkButton, SpacerInline, Title,
} from '@elements';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { goBack } from '@util/navigationService';
import styles from './InfoScreen.styles';

type InfoScreenProps = {
  title: string;
  nextScreenTitle?: string;
  nextScreenDestination?: string; // TODO: should be `type {Screen1 | Screen2 | etc.}` (see `<LinkButton>`)
  showBackButton?: boolean;

  // TODO: add type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
};

const InfoScreen: FunctionComponent<InfoScreenProps> = ({
  title,
  nextScreenTitle,
  nextScreenDestination,
  showBackButton,
  children,
}) => (
  <View style={styles.outerContainer}>
    <View>
      <Title text={title} />
      <SpacerInline height={40} />
      <View>{children}</View>
    </View>

    <View>
      {nextScreenTitle && nextScreenDestination && (
        <LinkButton
          text={nextScreenTitle}
          destination={nextScreenDestination}
        />
      )}
      {showBackButton && (
        <LinkButton
          text="Back"
          onPress={() => goBack()}
        />
      )}
    </View>
  </View>
);

export default InfoScreen;
