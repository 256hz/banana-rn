import React from 'react';
import { Text } from 'react-native';
import useGlobal from '@state';
import { Paragraph, SpacerInline } from '@elements';
import InfoScreen from '../InfoScreen';
import AccountSuspendedScreen from '../AccountSuspendedScreen';
import ApplicationPendingScreen from '../ApplicationPendingScreen';
import ApplicationApprovedScreen from '../ApplicationApprovedScreen';
import ApplicationIncompleteScreen from '../ApplicationIncompleteScreen';
import DashboardScreen from '../DashboardScreen';
import DonorDashboardScreen from '../DonorDashboardScreen';

export default function () {
	const [state] = useGlobal();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { user = {} as any, jwt = '', userIdentity } = state;
	const { id } = user;
	if (!jwt || !user) {
		return <Text>Loading...</Text>;
	}

	switch (user?.account_status) {
		case 'incomplete':
			return <ApplicationIncompleteScreen />;
		case 'suspended':
			return <AccountSuspendedScreen />;
		case 'inactive':
			return (
				<InfoScreen title="Account Inactive" nextScreenTitle="Contact Us" nextScreenDestination="ContactScreen">
					<Paragraph fontSize={20}>Your account has been deactivated.</Paragraph>
					<SpacerInline height={20} />
					<Paragraph fontSize={20}>Please contact us for more information.</Paragraph>
				</InfoScreen>
			);
		case 'closed':
			return (
				<InfoScreen title="Account Closed" nextScreenTitle="Contact Us" nextScreenDestination="ContactScreen">
					<Paragraph fontSize={20}>Your account has been closed.</Paragraph>
					<SpacerInline height={20} />
					<Paragraph fontSize={20}>Please contact us for more information.</Paragraph>
				</InfoScreen>
			);
		case 'processing':
			return <ApplicationPendingScreen />;
		case 'approved':
			return <ApplicationApprovedScreen id={id} jwt={jwt} />;
		case 'active':
			return userIdentity === 'client' ? <DashboardScreen /> : <DonorDashboardScreen />;
		default:
			return (
				<InfoScreen title="Login error" nextScreenDestination="Login" nextScreenTitle="Login">
					<Paragraph fontSize={20}>Something went wrong.</Paragraph>
				</InfoScreen>
			);
	}
}
