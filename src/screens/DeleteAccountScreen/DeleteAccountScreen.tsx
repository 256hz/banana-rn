import React from 'react';
import {
	ScrollView, Text, View,
} from 'react-native';
import { LinkButton, ContentHeader } from '@elements';
import { useNavigation } from '@react-navigation/native';
import useGlobal from '@state';
import styles from './DeleteAccountScreen.styles';

interface DeleteAccountScreenParams {
	backDestination?: string;
}

function DeleteAccountScreen({ backDestination }: DeleteAccountScreenParams) {
	const { navigate, goBack } = useNavigation();
	const [ globalState, globalActions ] = useGlobal() as any;
	const { deleteData } = globalActions;
	const { userIdentity, user } = globalState;

	const handleDeleteRequest = async () => {
		console.log('DELETE ACCOUNT!: ', userIdentity);
		const response = await deleteData(userIdentity, user.id);
		navigate('DeletedAccountScreen');
	};

	return (
		<ScrollView>
			<View>
				<ContentHeader headerSize="large" title="Delete Your Data" />
				<View style={styles.bodyMessage}>
					<Text style={styles.bodyMessageTitle}>
						Consent to Delete Data
					</Text>
					<Text style={styles.bodyMessageBody}>
						{'By deleting your data and your account with Banana App, you are requesting to remove your data from our active databases and all other records. This action is irreversible, and your data cannot be retrieved once deletion is completed.\n\n'
						+ 'Please note:\n'
						+ '1. Your data will be permanently deleted, and cannot be recovered.\n'
						+ '2. Should you choose to return to our services in the future, you will need to create a new account.\n'
						+ '3. Any services or features that rely on your personal data will no longer be accessible.\n\n'
						+ 'By proceeding, you acknowledge and consent to the complete deletion of your data, understanding that you will not be able to retrieve it in the future and will need to re-register for new service access.\n\n'
						+ 'If you have any questions or require further clarification, feel free to contact us.'}
					</Text>
				</View>
				<LinkButton text="Delete Data" onPress={handleDeleteRequest} />
				<LinkButton text="Back" onPress={backDestination ? () => navigate(backDestination) : () => goBack()} />
			</View>
		</ScrollView>
	);
}

export default DeleteAccountScreen;
