import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Title, NavBar, EmptyStateView } from '@elements';

import Donation from '@library/Donations/Donation/Donation';

import { IDonation } from '../../../declarations';
import useGlobal from '@state';

import styles from './DonorHistoryScreen.styles';
import { UseGlobalType } from '@state/index.types';

function DonorHistoryScreen() {
	const isFocused = useIsFocused();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, actions] = useGlobal() as UseGlobalType;
	const [donations, setDonations] = useState<IDonation[]>([]);
	const { getDonationHistory } = actions;

	useEffect(() => {
		if (isFocused) {
			getDonationHistory().then(data => setDonations(data));
		}
	}, [isFocused]);

	return (
		<View style={styles.outerContainer}>
			<NavBar showBackButton={true} />

			<View style={styles.contentContainer}>
				<Title text="Donations" />
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View>
						<Text style={styles.activeHeader}>History</Text>
					</View>
				</View>
				{donations && donations.length > 0 ? (
					<ScrollView>
						{donations.map(donation => (
							<View key={donation.id}>
								<Donation donation={donation} key={donation.id} isHistory={true} />
							</View>
						))}
					</ScrollView>
				) : (
					<EmptyStateView lowerText="You currently don't have any donations." />
				)}
			</View>
		</View>
	);
}

export default DonorHistoryScreen;
