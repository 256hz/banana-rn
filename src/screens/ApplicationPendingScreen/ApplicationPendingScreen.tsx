import { SpacerInline, Paragraph } from '@elements';

import React from 'react';
import InfoScreen from '../InfoScreen';

export default function () {
	return (
		<InfoScreen
			title="Your application is being reviewed."
			// showBackButton={false}
		>
			<Paragraph fontSize={20}>
				Please allow 24-48 hours for your registration to be reviewed. We will send you an email once the application
				has been processed.
			</Paragraph>
			<SpacerInline height={40} />
			<Paragraph emphasized={true} fontSize={20}>
				THANK YOU!
			</Paragraph>
		</InfoScreen>
	);
}
