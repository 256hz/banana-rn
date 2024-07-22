import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Title, NavBar, EmptyStateView } from '@elements';
import Donation from '@library/DonationClientView/Donation';
import useGlobal from '@state';
import styles from './ClientHistoryScreen.styles';
import { UseGlobalType, IClaim } from '@state/index.types';

function ClientHistoryScreen() {
	const isFocused = useIsFocused();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, actions] = useGlobal() as UseGlobalType;
	const [claims, setClaims] = useState<IClaim[]>([]);
	const [loaded, setLoaded] = useState(false);

	const getClaims = async () => {
		const { getClaimHistoryForClient } = actions;
		const data = await getClaimHistoryForClient();
		if (data) {
			setClaims(data as IClaim[]);
		}
		setLoaded(true);
	};

	useEffect(() => {
		if (isFocused) {
			getClaims();
		}
	}, [isFocused]);

	return (
		<View style={styles.outerContainer}>
			<NavBar showBackButton={true} />
			<View style={styles.contentContainer}>
				<Title text="Claims" />
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View>
						<Text style={styles.activeHeader}>History</Text>
					</View>
				</View>
				{!loaded ? (
					<Text>Loading...</Text>
				) : claims.length > 0 ? (
					<ScrollView>
						{claims
							.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
							.map(claim => (
								<View key={claim.id}>
									<Donation donation={claim} isHistory={true} isClaim={true} />
								</View>
							))}
					</ScrollView>
				) : (
					<EmptyStateView lowerText="You don't have a history of claims." />
				)}
			</View>
		</View>
	);
}

export default ClientHistoryScreen;
