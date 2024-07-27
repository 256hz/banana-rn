import { Paragraph } from '@elements';
import React from 'react';
import InfoScreen from '../InfoScreen';

export default function () {
	return (
		<InfoScreen
			title="You are logged out."
			nextScreenTitle="Log In"
			nextScreenDestination="Login"
			showBackButton={false}
		>
			<Paragraph fontSize={20}>We hope to see you soon!</Paragraph>
		</InfoScreen>
	);
}
