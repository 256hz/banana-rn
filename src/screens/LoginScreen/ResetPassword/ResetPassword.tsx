import React, { useState, FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import { Modal } from '@elements';
import { ResetForm, CodeForm, NewPasswordForm } from './Forms';
import styles from './ResetPassword.styles';

export enum PasswordResetStage {
	REQUEST_LINK = 'REQUEST_LINK',
	VERIFY = 'VERIFY',
	RESET = 'RESET',
	SUCCESS = 'SUCCESS',
}

interface ResetPasswordProps {
	onSuccess: () => void;
	onDismiss: () => void;
	initialStage?: PasswordResetStage;
	onRequest: (value: PasswordResetStage) => void;
	onBack: () => void;
}

export const ResetPassword: FunctionComponent<ResetPasswordProps> = ({
	onDismiss,
	initialStage,
	onSuccess,
	onRequest,
	onBack,
}) => {
	const [stage, setStage] = useState(initialStage || PasswordResetStage.REQUEST_LINK);
	const [token, setToken] = useState('');

	const handleComplete = () => {
		switch (stage) {
			case PasswordResetStage.REQUEST_LINK:
				setStage(PasswordResetStage.VERIFY);
				onRequest(PasswordResetStage.VERIFY);
				break;
			case PasswordResetStage.VERIFY:
				setStage(PasswordResetStage.RESET);
				break;
			case PasswordResetStage.RESET:
				setStage(PasswordResetStage.SUCCESS);
				break;
			case PasswordResetStage.SUCCESS:
				onSuccess();
				setStage(PasswordResetStage.REQUEST_LINK);
				break;
			default:
				console.log('Unexpected passwordResetStage: ', stage);
		}
	};

	const handleBack = () => {
		switch (stage) {
			case PasswordResetStage.VERIFY:
				setStage(PasswordResetStage.REQUEST_LINK);
				onBack();
				break;
			default:
				console.log('Unexpected passwordResetStage: ', stage);
		}
	};

	return (
		<Modal
			title="Reset Password"
			open={true}
			onDismiss={() => {
				if (stage === PasswordResetStage.SUCCESS) handleComplete();
				onDismiss();
			}}
			style={{ position: 'absolute' }}
		>
			<View>
				{stage === PasswordResetStage.REQUEST_LINK && <ResetForm onComplete={handleComplete} />}
				{stage === PasswordResetStage.VERIFY && (
					<CodeForm onComplete={handleComplete} setToken={setToken} onBack={handleBack} />
				)}
				{stage === PasswordResetStage.RESET && <NewPasswordForm onComplete={handleComplete} token={token} />}
				{stage === PasswordResetStage.SUCCESS && (
					<Text style={styles.text}>Your password has been successfully reset. Please login.</Text>
				)}
			</View>
		</Modal>
	);
};
