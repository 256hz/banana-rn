import { Paragraph } from '@elements';
import React from 'react';
import InfoScreen from '../InfoScreen';

export default () => (
	<InfoScreen
		title="You're Account and Data Have Been Deleted."
		nextScreenTitle="Log In"
		nextScreenDestination="Login"
		showBackButton={false}
	>
		<Paragraph fontSize={20}>Take Care!</Paragraph>
	</InfoScreen>
);