import React from 'react';
import {
	Text, View,
} from 'react-native';
import { NavBar, LinkButton, ContentHeader } from '@elements';
import { useNavigation } from '@react-navigation/native';
import styles from './DeleteAccountScreen.styles';

interface DeleteAccountScreenParams {
	backDestination?: string;
}

function DeleteAccountScreen({ backDestination }: DeleteAccountScreenParams) {
	const { navigate, goBack } = useNavigation();
	return (
		<View>
			<ContentHeader headerSize="large" title="Delete Your Data" />
			<View style={styles.bodyMessage}>
					<Text style={styles.bodyMessageTitle}>
						Instructions
					</Text>

					<Text style={styles.bodyMessageBody}>
						{
							'1. Send us an email from your registered email address to, superbanana@begoodproject.onmicrosoft.com, requesting your account to be deleted.'
							+ ' \n\n2. We will process your request within 1-2 business days. A confirmation email will be sent to you once your data has been deleted.'
							+ "\n\n If you have any questions or need further help, don't hesitate to contact us."
						}
					</Text>
				</View>
			<LinkButton text="Back" onPress={backDestination ? () => navigate(backDestination) : () => goBack()} />
		</View>
	);
}

export default DeleteAccountScreen;
