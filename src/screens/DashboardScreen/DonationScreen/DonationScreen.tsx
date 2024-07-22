import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, KeyboardAvoidingView, ScrollView, Platform, Text, Image } from 'react-native';
import useGlobal from '@state';
import { NavBar, SpacerInline, FormTextInput, LinkButton } from '@elements';
import validate from 'validate.js';
import { NewDonation } from '../../../../declarations';
import donationConstraints from '@util/constraints/donation';
import { categoryImage } from '@util/donationCategory';
import styles from './DonationScreen.styles';
import { UseGlobalType } from '@state/index.types';

function DonationScreen() {
	const [state, actions] = useGlobal() as UseGlobalType;
	const { updateAlert } = actions;
	const { user } = state;
	const foodCategories: Array<string> = ['Bread', 'Dairy', 'Hot Meal', 'Produce', 'Protein', 'Other'];
	const emptyDonation: NewDonation = {
		pickup_location: `${user?.address_street} ${user?.address_city}, ${user?.address_state} ${user?.address_zip}`,
		category: foodCategories[3],
		food_name: '',
		pickup_instructions: '',
		total_amount: '',
	};

	const [newDonation, setNewDonation] = useState<NewDonation>(emptyDonation);
	const [validateError, setValidateError] = useState<Partial<NewDonation>>({});
	const { postDonation } = actions;

	const { navigate, goBack } = useNavigation();

	const hasUnsavedChanges = Boolean(
		newDonation.food_name ||
			newDonation.total_amount ||
			newDonation.pickup_instructions !== newDonation.pickup_instructions
	);
	const preventBack = () => {
		updateAlert({
			title: '',
			message: '',
			type: 'incomplete form',
			dismissable: false,
			confirmFn: () => goBack(),
		});
	};
	const validateInputs = async () => {
		console.log(newDonation);
		const validateResults = validate(newDonation, donationConstraints);
		console.log(validateResults);
		if (validateResults) {
			setValidateError(validateResults);
		} else {
			setValidateError({});
			const result = await postDonation(newDonation);
			if (result === 201) {
				// updateAlert({ type: 'donation published', dismissable: false });
				setNewDonation(emptyDonation);
				navigate('DonorDashboardScreen');
			} else {
				// TODO: communicate failures better
				console.log('There was a problem creating the donation');
			}
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidContainer}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Android and iOS both interact with this prop differently
			enabled={true}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
		>
			<NavBar showBackButton={true} backButtonFn={hasUnsavedChanges ? preventBack : undefined} />
			<ScrollView style={styles.scrollContainer}>
				<View style={styles.imageInputContainer}>
					<Image source={categoryImage(newDonation.category)} style={styles.icon} />
				</View>

				<SpacerInline height={20} />
				<FormTextInput
					label="Item Name"
					value={newDonation.food_name}
					setValue={s => setNewDonation({ ...newDonation, food_name: s })}
					style={styles.input}
					errorMessage={validateError.food_name}
					autoFocus={true}
				/>

				<FormTextInput
					label="Food Category"
					dropdownData={foodCategories}
					setValue={s => setNewDonation({ ...newDonation, category: s })}
					defaultValue={foodCategories[2]}
					value={newDonation.category}
					type="dropdown"
					errorMessage={validateError.category}
				/>

				<FormTextInput
					label="Total Amount"
					value={newDonation.total_amount}
					setValue={s => setNewDonation({ ...newDonation, total_amount: s })}
					style={styles.input}
					errorMessage={validateError.total_amount}
				/>

				<View>
					<Text style={styles.pickupAddressLabel}>PICKUP ADDRESS</Text>
					<Text style={styles.pickupAddressStyle}>{newDonation.pickup_location}</Text>
				</View>

				<FormTextInput
					label="Pickup Instructions"
					value={newDonation.pickup_instructions}
					setValue={s => setNewDonation({ ...newDonation, pickup_instructions: s })}
					style={styles.input}
					errorMessage={validateError.pickup_instructions}
				/>

				<View style={styles.button}>
					<LinkButton text="Publish" onPress={validateInputs} />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default DonationScreen;
