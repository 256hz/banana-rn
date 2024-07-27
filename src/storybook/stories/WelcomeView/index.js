/* eslint-disable import/no-extraneous-dependencies,no-undef */
import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { linkTo } from '@storybook/addon-links';
import Welcome from './Welcome';

const story = storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

export default story;
