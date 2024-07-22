import React, { useState, RefObject, createRef, FunctionComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import { FormTextInput, LinkButton, SpacerInline } from '@elements';
import useGlobal from '@state';
import styles from '../ResetPassword.styles';

interface NewPasswordFormProps {
	onComplete: () => void;
	token: string;
}

const NewPasswordForm: FunctionComponent<NewPasswordFormProps> = ({ onComplete, token }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');
	const passwordInputRef: RefObject<TextInput> = createRef();
	const [, actions] = useGlobal() as UseGlobalType;
	const { submitNewPassword } = actions;

	const isPasswordValid = () => {
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match.');
			return false;
		}
		if (formData.password.length < 8) {
			setError('Password must be at least 8 characters.');
			return false;
		}
		return true;
	};

	const submitPasswordProps = {
		input: formData.password,
		token,
		setIsSubmitting,
		onComplete,
		setError,
	};

	const handleSubmit = () => {
		if (isPasswordValid() && !isSubmitting) {
			setError('');
			setIsSubmitting(true);
			submitNewPassword(submitPasswordProps);
		}
	};

	return (
		<View>
			<SpacerInline height={20} />
			<Text style={styles.text}>Enter a new password:</Text>
			<Text style={styles.smallText}>(at least 8 characters)</Text>
			<SpacerInline height={20} />
			<FormTextInput
				label="Password"
				type="password"
				value={formData.password}
				setValue={text => {
					setError('');
					setFormData({ ...formData, password: text });
				}}
				ref={passwordInputRef}
				autoComplete="password"
				blurOnSubmit={false}
			/>
			<SpacerInline height={20} />
			<FormTextInput
				label="Confirm Password"
				type="password"
				value={formData.confirmPassword}
				setValue={text => {
					setError('');
					setFormData({ ...formData, confirmPassword: text });
				}}
				ref={passwordInputRef}
				autoComplete="password"
				blurOnSubmit={false}
			/>
			<Text style={styles.errors}>{error || null}</Text>
			<SpacerInline height={20} />
			<View>
				<LinkButton disabled={isSubmitting} text="Reset Password" onPress={handleSubmit} />
			</View>
		</View>
	);
};

export default NewPasswordForm;
