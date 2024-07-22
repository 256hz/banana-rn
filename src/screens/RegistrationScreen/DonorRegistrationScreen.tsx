// DonationRegistrationScreen.tsx
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Platform,
	TextInput,
	Keyboard,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { FormTextInput, LinkButton, SpacerInline, Title, Icon } from '@elements';
import useGlobal from '@state';
import { getStateList } from '@util/statesAbbr';
import donorConstraints from '@util/constraints/donorRegistration';
import validate from 'validate.js';
import { DonorRegisterProps } from '@state/actions/register';
import { IAlert, UseGlobalType } from '@state/index.types';
import { formatErrorMessage } from '@util/formatErrorMessage';
import styles from './RegistrationScreen.styles';
import { ValidateError } from './ClientRegistrationScreen';

function DonorRegistrationScreen() {
	const { navigate, goBack } = useNavigation();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_state, actions] = useGlobal() as UseGlobalType;
	const { register, updateAlert } = actions;
	const [newDonor, setNewDonor] = useState<DonorRegisterProps>({
		state: 'WA',
	} as DonorRegisterProps);
	const [validationErrors, setValidationErrors] = useState<ValidateError>({});
	const [termsOfService, setTermsOfService] = useState(false);
	const stateList = getStateList();
	const passwordRef = useRef<TextInput>(null);
	const confirmPasswordRef = useRef<TextInput>(null);
	const firstNameRef = useRef<TextInput>(null);
	const lastNameRef = useRef<TextInput>(null);
	const bizNameRef = useRef<TextInput>(null);
	const bizAddressRef = useRef<TextInput>(null);
	const cityRef = useRef<TextInput>(null);
	const zipRef = useRef<TextInput>(null);
	const pickUpRef = useRef<TextInput>(null);

	const toggleTermsOfService = () => setTermsOfService(!termsOfService);

	const registerPressHandler = async () => {
		Keyboard.dismiss();
		await validateInputs();
	};

	const validateInputs = async () => {
		const validateResults = validate(newDonor, donorConstraints);
		if (validateResults) {
			setValidationErrors(validateResults);
		} else {
			const statusCode = await register(newDonor);
			switch (statusCode) {
				case 201: {
					navigate('LoginSuccessScreen');
					break;
				}
				case 409: {
					updateAlert({
						title: 'Error',
						message: `This email address has already been used (Error code:${statusCode})`,
						dismissable: true,
					} as IAlert);
					break;
				}
				case 500: {
					updateAlert({
						title: 'Error',
						message: `Network Issues (Error code:${statusCode})`,
						dismissable: true,
					} as IAlert);
					break;
				}
				default: {
					updateAlert({
						title: 'Error',
						message: `Unknown Error (Error code:${statusCode})`,
						dismissable: true,
					} as IAlert);
				}
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
			<View style={styles.header}>
				<Title text="Registration" />
			</View>

			<ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				<FormTextInput
					label="Email"
					value={newDonor.email}
					setValue={s => setNewDonor({ ...newDonor, email: s })}
					style={styles.input}
					placeholder="info@bananaapp.org"
					error={!!validationErrors.email}
					errorMessage={formatErrorMessage(validationErrors.email)}
					autoFocus={true}
					onSubmitEditing={() => passwordRef?.current?.focus()}
					autoCapitalize="none"
				/>

				<FormTextInput
					label="Password"
					value={newDonor.password}
					setValue={s => setNewDonor({ ...newDonor, password: s })}
					type="password"
					style={styles.input}
					error={!!validationErrors.password}
					errorMessage={formatErrorMessage(validationErrors.password)}
					ref={passwordRef}
					onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
				/>

				<FormTextInput
					label="Confirm Password"
					value={newDonor.retypedPassword}
					setValue={s => setNewDonor({ ...newDonor, retypedPassword: s })}
					style={styles.input}
					type="password"
					error={!!validationErrors.retypedPassword}
					errorMessage={formatErrorMessage(validationErrors.retypedPassword)}
					ref={confirmPasswordRef}
					onSubmitEditing={() => firstNameRef?.current?.focus()}
				/>
				<Divider style={{ marginVertical: 20 }} />

				<FormTextInput
					label="First Name"
					value={newDonor.firstName}
					setValue={s => setNewDonor({ ...newDonor, firstName: s })}
					style={styles.input}
					error={!!validationErrors.firstName}
					errorMessage={formatErrorMessage(validationErrors.firstName)}
					ref={firstNameRef}
					onSubmitEditing={() => lastNameRef?.current?.focus()}
				/>

				<FormTextInput
					label="Last Name"
					value={newDonor.lastName}
					setValue={s => setNewDonor({ ...newDonor, lastName: s })}
					style={styles.input}
					error={!!validationErrors.lastName}
					errorMessage={formatErrorMessage(validationErrors.lastName)}
					ref={lastNameRef}
					onSubmitEditing={() => bizNameRef?.current?.focus()}
				/>

				<FormTextInput
					label="Business Name"
					value={newDonor.businessName}
					setValue={s => setNewDonor({ ...newDonor, businessName: s })}
					style={styles.input}
					error={!!validationErrors.businessName}
					errorMessage={formatErrorMessage(validationErrors.businessName)}
					ref={bizNameRef}
					onSubmitEditing={() => bizAddressRef?.current?.focus()}
				/>

				<FormTextInput
					label="Business Address"
					value={newDonor.businessAddress}
					setValue={s => setNewDonor({ ...newDonor, businessAddress: s })}
					style={styles.input}
					error={!!validationErrors.businessAddress}
					errorMessage={formatErrorMessage(validationErrors.businessAddress)}
					ref={bizAddressRef}
					onSubmitEditing={() => cityRef?.current?.focus()}
				/>

				<View style={[styles.row, styles.input]}>
					<FormTextInput
						label="City"
						value={newDonor.city}
						setValue={s => setNewDonor({ ...newDonor, city: s })}
						style={{ width: '40%' }}
						autoCapitalize="words"
						error={!!validationErrors.city}
						errorMessage={formatErrorMessage(validationErrors.city)}
						ref={cityRef}
						onSubmitEditing={() => zipRef?.current?.focus()}
					/>
					<FormTextInput
						label="State"
						type="dropdown"
						dropdownData={stateList}
						value={newDonor.state}
						setValue={s => setNewDonor({ ...newDonor, state: s })}
						style={{ width: '20%' }}
						error={!!validationErrors.state}
						errorMessage={formatErrorMessage(validationErrors.state)}
					/>
					<FormTextInput
						label="Zip"
						value={newDonor.zip}
						setValue={s => setNewDonor({ ...newDonor, zip: s })}
						style={{ width: '30%' }}
						autoCapitalize="words"
						error={!!validationErrors.zip}
						errorMessage={formatErrorMessage(validationErrors.zip)}
						ref={zipRef}
						onSubmitEditing={() => pickUpRef?.current?.focus()}
					/>
				</View>
				<FormTextInput
					label="Pick up instructions"
					value={newDonor.pickupInstructions}
					setValue={s => setNewDonor({ ...newDonor, pickupInstructions: s })}
					placeholder="Directions on where to pick up item"
					error={!!validationErrors.pickupInstructions}
					errorMessage={formatErrorMessage(validationErrors.pickupInstructions)}
					ref={pickUpRef}
				/>

				<View style={styles.checkboxRow}>
					<View style={styles.checkBox}>
						<TouchableOpacity style={{ top: 3 }} onPress={toggleTermsOfService}>
							<Icon name={termsOfService ? 'checkboxOn' : 'checkboxOff'} size={24} color="none" />
						</TouchableOpacity>
					</View>
					<SpacerInline width={10} />
					<Text style={styles.text} onPress={toggleTermsOfService}>
						{'I agree to the '}
					</Text>
					<View>
						<TouchableOpacity onPress={() => navigate('TermsScreen')}>
							<Text style={[styles.text, styles.textBold]}>Terms & Conditions</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={[styles.row, { paddingHorizontal: '10%' }]}>
					<LinkButton text="back" onPress={() => goBack()} />
					<LinkButton disabled={!termsOfService} text="Register" onPress={registerPressHandler} />
				</View>
				<SpacerInline height={50} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default DonorRegistrationScreen;
