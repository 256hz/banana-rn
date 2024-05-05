import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Title, NavBar, EmptyStateView } from '@elements';
import Donation from '@library/DonationClientView/Donation';
import useGlobal from '@state';
import {
	InitialState, Actions, Donation as DonationType, Claim,
} from '@state/index.types';
import styles from './ClientHistoryScreen.styles';

const useGlobalTyped = useGlobal as () => [InitialState, Actions];

const ClientHistoryScreen = () => {
	const isFocused = useIsFocused();
	const [ , actions ] = useGlobalTyped();
	const [ claims, setClaims ] = useState<DonationType[] | Claim[] >([]);
	const [ loaded, setLoaded ] = useState(false);

	// THINK ABOUT: Add spinner while data is fetching / !loaded
	const getClaims = async () => {
		const { getClaimHistoryForClient } = actions;
		const data = await getClaimHistoryForClient();
		if (data) {
			setClaims(data);
			setLoaded(true);
		}
	};

	// THINK ABOUT: Should !loaded by condition for running getClaims()?
	useEffect(() => {
		if (isFocused) {
			getClaims();
		}
	}, [ isFocused ]);

	return (
		<View style={styles.outerContainer}>
			<NavBar showBackButton={false} />

			<View style={styles.contentContainer}>
				<Title text="Claims" />
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				>
					<View>
						<Text style={styles.activeHeader}>History</Text>
					</View>
				</View>
				{ !loaded && <Text>Loading...</Text> }
				{(claims && claims.length > 0) ? (
					<ScrollView>
						{claims
							.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
							.map(claim => (
								<View key={'id' in claim ? claim.id : claim.food_name}>
									<Donation
										donation={claim}
										key={claim.id}
										isHistory={true}
										isClaim={true}
									/>
								</View>
							))}
					</ScrollView>
				) : (
					<EmptyStateView lowerText="You don't have a history of claims." />
				)}
			</View>
		</View>
	);
};

export default ClientHistoryScreen;
