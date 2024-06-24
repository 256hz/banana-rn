import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import useGlobal from '@state';
import { Icon, SpacerInline, TextButton } from '@elements';
import * as colors from '@util/colors';
import typography from '@util/typography';
import { ButtonStyle } from '@elements/Button';
import claimStyles from '@util/claimStyles';
import styles from './MakeClaimScreen.styles';
import { UseGlobalType } from '@state/index.types';

function MakeClaimScreen() {
	const isFocused = useIsFocused();
	const { navigate, goBack } = useNavigation();
	const [globalState, globalActions] = useGlobal() as UseGlobalType;
	const { claimDonation, getTravelTimes } = globalActions;
	const { user } = globalState;
	const route = useRoute();
	const { donation } = route.params;
	const { donor } = donation;
	const pendingTravelTimes = {
		pedestrian: 'calculating..',
		publicTransport: 'calculating..',
		bicycle: 'calculating..',
	};
	const unavailableTravelTimes = {
		pedestrian: 'not available',
		publicTransport: 'not available',
		bicycle: 'not available',
	};
	const [travelTimes, setTravelTimes] = useState(pendingTravelTimes);

	const cancelBtnStyle: ButtonStyle = {
		default: {
			background: colors.BANANA_YELLOW,
			foreground: colors.NAVY_BLUE,
		},
	};

	const claimBtnStyle: ButtonStyle = {
		default: {
			background: colors.NAVY_BLUE,
			foreground: colors.WHITE,
		},
	};

	const handleClaim = async () => {
		const response = await claimDonation(donation.id, user.id);
		if (response.status !== 202) {
			console.log('Handle this error better');
		} else {
			navigate('ClaimDetails', { claim: response.claim, donation });
		}
	};

	const handleCancel = () => {
		goBack();
	};

	const fetchTravelTimes = async () => {
		// const result = await getTravelTimes(donation.donor_id, user.coords.latitude, user.coords.longitude);
		// TODO: Fix getTravelTimes
		const result = { status: 500 };
		if (result?.status === 200) {
			setTravelTimes(result.times);
		} else {
			setTravelTimes(unavailableTravelTimes);
		}
	};

	useEffect(() => {
		if (isFocused) {
			fetchTravelTimes();
		}
	}, [isFocused]);

	return (
		<View style={claimStyles.outerContainer}>
			<ScrollView>
				<View>
					<ImageBackground source={require('@assets/images/bananas.jpg')} style={claimStyles.header}>
						<Text onPress={() => goBack()} style={[typography.h2, claimStyles.closeLnk]}>
							X
						</Text>
					</ImageBackground>
				</View>
				<View style={claimStyles.mainContent}>
					<View style={claimStyles.section}>
						<View style={claimStyles.title}>
							<Text style={typography.h3}>{donation.food_name}</Text>
						</View>
						<View style={claimStyles.itemWithIcon}>
							<Icon name="location" size={16} />
							<Text style={typography.body4}>{donor.donor_name}</Text>
						</View>
						<View style={claimStyles.itemWithIcon}>
							<Icon name="distance" size={16} />
							<Text style={typography.body4}>{donation.distance && `${donation.distance.toFixed(1)} mi`}</Text>
						</View>
					</View>
					<View style={claimStyles.section}>
						<View style={claimStyles.title}>
							<Text style={typography.h3}>Pick Up Info</Text>
						</View>
						<View style={claimStyles.smallTitle}>
							<Text style={typography.h4}>Address</Text>
						</View>
						<View style={claimStyles.item}>
							<Text
								style={typography.body4}
							>{`${donor.address_street} ${donor.address_city}, ${donor.address_state}, ${donor.address_zip}`}</Text>
						</View>
						<View style={claimStyles.smallTitle}>
							<Text style={typography.h4}>Instructions</Text>
						</View>
						<View style={claimStyles.item}>
							<Text style={typography.body4}>{donation.pickup_instructions}</Text>
						</View>
					</View>
					<View>
						<View>
							<Text style={typography.h3}>How to get There</Text>
						</View>
						<View style={claimStyles.itemWithIcon}>
							<Icon name="walk" size={16} />
							<SpacerInline width={2} />
							<Text style={typography.body4}>{`Walking ${travelTimes.pedestrian} min`}</Text>
						</View>
						<View style={claimStyles.itemWithIcon}>
							<Icon name="transit" size={16} />
							<SpacerInline width={2} />
							<Text style={typography.body4}>{`Public Transit ${travelTimes.publicTransport} min`}</Text>
						</View>
						<View style={claimStyles.itemWithIcon}>
							<Icon name="bike" size={16} />
							<SpacerInline width={2} />
							<Text style={typography.body4}>{`Bike ${travelTimes.bicycle} min`}</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.buttonPanel}>
				<TextButton text="Cancel" buttonStyle={cancelBtnStyle} outlined={false} onPress={handleCancel} />
				<SpacerInline width={10} />
				<TextButton text="Claim" buttonStyle={claimBtnStyle} onPress={handleClaim} />
			</View>
		</View>
	);
}

export default MakeClaimScreen;
