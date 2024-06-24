import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { EmptyStateView, NavBar, Title } from '@elements';
import useGlobal from '@state';
import Donation from '@library/Donations/Donation';
import styles from './DonorDashboardScreen.styles';
import { UseGlobalType } from '@state/index.types';

function DonorDashboardScreen() {
	const { navigate } = useNavigation();
	const isFocused = useIsFocused();
	const [state, actions] = useGlobal() as UseGlobalType;

	const [donations, setDonations] = useState(state.donationsOrClaims);
	const [loaded, setLoaded] = useState(false);

	const getDonorActiveDonations = async () => {
		const { getDonations } = actions;
		const data = await getDonations();
		if (data) {
			await setDonations(data);
			setLoaded(true);
		}
	};

	// const hasUnsavedChanges = false;

	useEffect(() => {
		if (isFocused) {
			getDonorActiveDonations();
		}
	}, [isFocused]);

	return (
		<View style={styles.outerContainer}>
			<NavBar showBackButton={false} />

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
						<Text style={styles.activeHeader}>ACTIVE</Text>
					</View>
					<TouchableOpacity onPress={() => navigate('DonationScreen')}>
						<View>
							<Text style={styles.plus}>+</Text>
						</View>
					</TouchableOpacity>
				</View>
				{!loaded && <Text>Loading...</Text>}
				{loaded && donations && Array.isArray(donations) && donations.length > 0 ? (
					<ScrollView>
						{donations.map((donation, i) => (
							<View key={donation.id}>
								<Donation donation={donation} key={donation.id} resource="donations" />
								{i === donations.length - 1}
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

export default DonorDashboardScreen;
