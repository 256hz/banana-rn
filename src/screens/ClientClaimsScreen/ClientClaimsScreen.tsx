import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Donation from '@library/DonationClientView/Donation';
import useGlobal from '@state';
import {
	EmptyStateView, NavBar, SpacerInline, Title,
} from '@elements';
import { InitialState, Actions } from '@state/index.types';
import styles from './ClientClaimsScreen.styles';

const useGlobalTyped = useGlobal as () => [InitialState, Actions];

const ClientClaimsScreen = () => {
	const isFocused = useIsFocused();
	const [ state, actions ] = useGlobalTyped();

	const [ claimedDonations, setClaimedDonations ] = useState(state.donationsOrClaims);
	const [ loaded, setLoaded ] = useState(false);

	const getClaims = async () => {
		const { getClaimedDonationsForClient, getLocation } = actions;
		await getLocation();
		const data = await getClaimedDonationsForClient();
		if (data) {
			setClaimedDonations(data);
			setLoaded(true);
		}
	};

	// TODO: Check if isFocused is causing the getClaims() to be called multiple times
	// When I was logging claimedDonations it indicated so.
	useEffect(() => {
		if (isFocused) {
			getClaims();
		}
	}, [ isFocused ]);

	return (
		<View style={styles.outerContainer}>

			<NavBar
				showBackButton={true}
			/>

			<View style={styles.contentContainer}>
				<Title text="Claims" />
				<SpacerInline height={20} />
				{ !loaded && <Text>Loading...</Text> }
				{loaded && claimedDonations && Array.isArray(claimedDonations) && claimedDonations.length > 0
					? (
						<ScrollView>
							{
								claimedDonations?.map(claimedDonation => (
									<View key={claimedDonation.id}>
										<Donation
											donation={claimedDonation}
											key={claimedDonation.id}
											isClaim={true}
											isHistory={false}
										/>
									</View>
								))
							}
							<SpacerInline height={200} />
						</ScrollView>
					) : (
						<EmptyStateView
							upperText="You don't currently have any outstanding claimed donations."
						/>
					)}
			</View>

		</View>
	);
};

export default ClientClaimsScreen;
