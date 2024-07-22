import { SpacerInline, Paragraph } from '@elements';

import setAccountToActive from '@util/setAccountToActive';
import React, { FunctionComponent, useState } from 'react';
import InfoScreen from '../InfoScreen';

type ApplicationApprovedScreenProps = {
	id: number;
	jwt: string;
};

const ApplicationApprovedScreen: FunctionComponent<ApplicationApprovedScreenProps> = ({ id, jwt }) => {
	const [activated, setActivated] = useState(false);
	setAccountToActive({ jwt, id }).then(() => setActivated(true));

	return activated ? (
		<InfoScreen
			title="Your application is approved! (:"
			nextScreenTitle="Start"
			nextScreenDestination="DashboardScreen"
			showBackButton={false}
		>
			<Paragraph fontSize={20}>Welcome to the Banana App! We are so excited to have you join our family.</Paragraph>
			<SpacerInline height={40} />
			<Paragraph emphasized={true} fontSize={20}>
				CLICK "START" TO BEGIN YOUR FIRST DONATION!
			</Paragraph>
		</InfoScreen>
	) : (
		<></>
	);
};

export default ApplicationApprovedScreen;
