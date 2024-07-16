import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Keyboard,
} from 'react-native';
import { Divider } from 'react-native-paper';
import useGlobal from '@state';
import { Title, LinkButton, FormTextInput, SpacerInline, Icon } from '@elements';
import validate from 'validate.js';
import clientConstraints from '@util/constraints/clientRegistration';
import { ClientRegisterProps } from '@state/actions/register';
import { IAlert, UseGlobalType, StatusCode } from '@state/index.types';
import styles from './RegistrationScreen.styles';

interface ValidateError {
	[key: string]: string[];
}

export default function RegistrationScreen() {
	const { navigate, goBack } = useNavigation();
	const [state, actions] = useGlobal() as UseGlobalType;
	const { register, updateAlert } = actions;

	const [termsOfService, setTermsOfService] = useState(false);
	const [validateError, setValidateError] = useState<ValidateError>({});
	const [newClient, setNewClient] = useState<ClientRegisterProps>({
		email: '',
		password: '',
		retypedPassword: '',
		firstName: '',
		lastName: '',
	});

	const passwordRef = useRef<TextInput>(null);
	const confirmPasswordRef = useRef<TextInput>(null);
	const firstNameRef = useRef<TextInput>(null);
	const lastNameRef = useRef<TextInput>(null);

	const toggleTermsOfService = () => {
		setTermsOfService(!termsOfService);
	};

	const registerPressHandler = async () => {
		Keyboard.dismiss();
		await validateInputs();
	};

	const validateInputs = async () => {
		const validateResults = validate(newClient, clientConstraints);
		if (validateResults) {
			setValidateError(validateResults);
		} else {
			const statusCode: StatusCode = await register(newClient);
			switch (statusCode) {
				case 201: {
					navigate('LoginSuccessScreen');
					break;
				}
				case 500: {
					updateAlert({
						title: 'Error',
						message: `Network Issues (Error code:${statusCode})`,
						dismissable: true,
					} as IAlert);
					console.log(state);
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
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			enabled={true}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
		>
			<View style={styles.header}>
				<Title text="Registration" />
			</View>
			<ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				<FormTextInput
					label="Email"
					value={newClient.email}
					setValue={v => setNewClient({ ...newClient, email: v })}
					style={styles.input}
					placeholder="info@bananaapp.org"
					errorMessage={validateError.email?.[0]}
					autoFocus={true}
					onSubmitEditing={() => passwordRef?.current?.focus()}
					autoCapitalize="none"
				/>

				<FormTextInput
					label="Password"
					value={newClient.password}
					setValue={v => setNewClient({ ...newClient, password: v })}
					type="password"
					style={styles.input}
					errorMessage={validateError.password?.[0]}
					ref={passwordRef}
					onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
				/>

				<FormTextInput
					label="Confirm Password"
					value={newClient.retypedPassword}
					setValue={v => setNewClient({ ...newClient, retypedPassword: v })}
					style={styles.input}
					type="password"
					errorMessage={validateError.retypedPassword?.[0]}
					ref={confirmPasswordRef}
					onSubmitEditing={() => firstNameRef?.current?.focus()}
				/>

				<Divider style={{ marginVertical: 20 }} />

				<FormTextInput
					label="First Name"
					value={newClient.firstName}
					setValue={v => setNewClient({ ...newClient, firstName: v })}
					style={styles.input}
					errorMessage={validateError.firstName?.[0]}
					ref={firstNameRef}
					onSubmitEditing={() => lastNameRef?.current?.focus()}
				/>

				<FormTextInput
					label="Last Name"
					value={newClient.lastName}
					setValue={v => setNewClient({ ...newClient, lastName: v })}
					style={styles.input}
					errorMessage={validateError.lastName?.[0]}
					ref={lastNameRef}
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
				<View style={{ flex: 1 }} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
