import React, { useState } from 'react';
import { View } from 'react-native';
import {
  LinkButton, SpacerInline, Title,
} from '@elements';
import getEnv from '@util/environment';
import Terms from '@assets/documents/SampleToS';
import { goBack } from '@util/navigationService';
import ScrollContainer from '../../elements/ScrollContainer/ScrollContainer';
import styles from './TermsScreen.styles';

export default function TermsScreen() {
  const [ button, setButton ] = useState(true);
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Title text="Terms & conditions" />
        </View>
      </View>
      <View style={styles.outerContainer}>
        <SpacerInline height={20} />
        <ScrollContainer
          documentText={
            getEnv().USER_IDENTITY === 'client'
              ? Terms.client
              : Terms.donor
          }
          onScrollToEnd={() => {
            setButton(false);
          }}
        />
        <SpacerInline height={40} />
        <LinkButton
          text="back"
          disabled={button}
          onPress={() => goBack()}
        />
      </View>
    </>
  );
}
