import { Paragraph, SpacerInline } from '@elements';
import React from 'react';
import InfoScreen from '../InfoScreen';

export default function () {
	return (
		<InfoScreen
			title="Your account is incomplete. ):"
			nextScreenTitle="Contact Us"
			nextScreenDestination="ContactScreen"
		>
			<Paragraph fontSize={20}>Looks like your application needs further review.</Paragraph>
			<SpacerInline height={20} />
			<Paragraph fontSize={20}>
				Please expect to receive a call from us within 24-48 hours regarding your account.
			</Paragraph>
			<SpacerInline height={20} />
			<Paragraph fontSize={20}>If you don't hear from us, please contact us via email.</Paragraph>
		</InfoScreen>
	);
}
