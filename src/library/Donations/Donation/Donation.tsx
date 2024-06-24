import React from 'react';
// import { useNavigation } from 'react-navigation-hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import typography from '@util/typography';
import { categoryImage } from '@util/donationCategory';
import formatDate from '@util/formatDate';
import { Icon } from '@elements';
import { IDonation } from '../../../../declarations';
import styles from './Donation.styles';

interface IDonationComponentProps {
	donation: IDonation;
}

export default function ({ donation }: IDonationComponentProps) {
	const { navigate } = useNavigation();
	const { isHistory, food_name, total_amount, category, updated_at } = donation;

	const icon = categoryImage(category);
	const updatedAt = formatDate(updated_at);
	return (
		<TouchableOpacity onPress={() => navigate('DonationsDetailScreen', { donation })}>
			<View style={styles.infoContainer}>
				<View
					style={{
						flexDirection: 'column',
						alignItems: 'center',
						width: 100,
						justifyContent: 'center',
					}}
				>
					<Text style={typography.h5}>{category}</Text>
					<Image source={icon} style={styles.icon} />
				</View>
				<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
					<View>
						<Text style={typography.h3}>{food_name}</Text>
					</View>
					<View>
						{isHistory ? (
							<View style={{ flexDirection: 'row' }}>
								<Icon name="time" color="blue" size={20} />
								<Text style={{ ...typography.h5, marginLeft: 5 }}>{updatedAt}</Text>
							</View>
						) : (
							<Text style={typography.h5}>{`about ${total_amount}`}</Text>
						)}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}
