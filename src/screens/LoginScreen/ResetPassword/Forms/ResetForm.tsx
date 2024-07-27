import React, { useState, FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import { FormTextInput, LinkButton, SpacerInline } from '@elements';
import useGlobal from '@state';
import styles from '../ResetPassword.styles';

interface ResetFormProps {
	onComplete: () => void;
}

const ResetForm: FunctionComponent<ResetFormProps> = ({ onComplete }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState('');
	const [error, setError] = useState('');
	const [, actions] = useGlobal() as UseGlobalType;
	const { requestResetToken } = actions;

	const isValidEmail = () => {
		if (!formData.includes('@') || !formData.includes('.')) {
			setError('Must be a valid email address.');
			return false;
		}
		return true;
	};

	const requestResetProps = {
		input: formData,
		setIsSubmitting,
		onComplete,
		setError,
	};
	const handleSubmit = () => {
		if (isValidEmail() && !isSubmitting) {
			setIsSubmitting(true);
			requestResetToken(requestResetProps);
		}
	};

	return (
		<View>
			<SpacerInline height={20} />
			<Text style={styles.text}>
				If you are a valid user in our system, we will email you password reset instructions.
			</Text>
			<SpacerInline height={20} />

			<FormTextInput
				label="email"
				placeholder="info@bananaapp.org"
				value={formData}
				setValue={text => {
					setError('');
					setFormData(text);
				}}
				autoCorrect={false}
				enablesReturnKeyAutomatically={true}
				autoCapitalize="none"
				autoComplete="username"
				textContentType="username"
				keyboardType="email-address"
				returnKeyType="next"
				blurOnSubmit={true}
			/>
			<View style={styles.errorContainer}>
				<Text style={styles.errors}>{error || null}</Text>
			</View>
			<SpacerInline height={20} />
			<View>
				<LinkButton disabled={isSubmitting} text="Submit" onPress={handleSubmit} />
			</View>
		</View>
	);
};

export default ResetForm;
