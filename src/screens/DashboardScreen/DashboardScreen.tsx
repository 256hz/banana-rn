import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Donation from '@library/DonationClientView/Donation';
import useGlobal from '@state';
import { EmptyStateView, NavBar, SpacerInline, Title } from '@elements';
import { UseGlobalType } from '@state/index.types';

import styles from './DashboardScreen.styles';

function DashboardScreen() {
	const isFocused = useIsFocused();
	const [state, actions] = useGlobal() as UseGlobalType;
	const { navigate } = useNavigation();
	const [donations, setDonations] = useState(state.donationsOrClaims);
	const [loaded, setLoaded] = useState(false);

	const getActiveDonationsForLocation = async () => {
		setLoaded(false);
		const { getActiveDonationsForClient, getLocation } = actions;
		await getLocation();
		const data = await getActiveDonationsForClient();
		if (data) {
			setDonations(data);
			setLoaded(true);
		}
		setLoaded(true);
	};

	useEffect(() => {
		if (isFocused) {
			getActiveDonationsForLocation();
		}
	}, [isFocused, actions]);

	return (
		<View style={styles.outerContainer}>
			<NavBar
				showBackButton={false}
				showSelector={true}
				onMap={() => {
					navigate('MapScreen');
				}}
				position="list"
			/>

			<View style={styles.contentContainer}>
				<Title text="Donations" />
				<SpacerInline height={20} />
				{!loaded && <Text>Loading...</Text>}
				{loaded && state.user?.coords && state.alert && (
					<EmptyStateView
						upperText="We are unable to get your current location."
						lowerText="Please check your app settings to make sure location permissions are enabled."
					/>
				)}
				{loaded && donations && Array.isArray(donations) && donations.length > 0 ? (
					<ScrollView>
						{donations.map(donation => (
							<View key={donation.id}>
								<Donation donation={donation} key={donation.id} isClaim={false} isHistory={false} />
							</View>
						))}
						<SpacerInline height={200} />
					</ScrollView>
				) : (
					<EmptyStateView
						upperText="No available donations near you."
						lowerText={'We will notify you when new donations are available.\nOR\nPlease check back later.'}
					/>
				)}
			</View>
		</View>
	);
}

export default DashboardScreen;
