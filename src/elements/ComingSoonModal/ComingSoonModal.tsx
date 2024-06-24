import React from 'react';
import { Text, View } from 'react-native';
import useGlobal from '@state';
import { Icon } from '@elements/Icon';
import { Modal } from '@elements/Modal';
import { TextButton } from '@elements/Button/TextButton';
import { IAlert, UseGlobalType } from '@state/index.types';
import { useScheme } from '@util/colorSchemes';
import typography from '@util/typography';
import styles from './ComingSoonModal.styles';

export default function () {
	const [globalState, globalActions] = useGlobal() as UseGlobalType;
	const { alert: alertObj }: { alert: IAlert } = globalState;
	const { clearAlert } = globalActions;
	const scheme = useScheme();

	const handleCloseButtonPress = () => {
		clearAlert();
	};

	const handleDismiss = () => {
		if (alertObj.dismissable) {
			clearAlert();
		}
	};

	if (!alertObj) return null;
	if (!alertObj.type || alertObj.type === 'default') {
		return (
			<Modal
				style={styles.container}
				title={alertObj?.title || 'Alert'}
				palette="accent"
				open={alertObj !== undefined}
				onDismiss={handleDismiss}
			>
				<View style={styles.body}>
					<View style={styles.textContainer}>
						<Text style={typography.body1}>{alertObj?.message || 'Uh oh, an unknown error occurred!'}</Text>
					</View>

					<TextButton
						text="OK"
						style={{
							width: 104,
						}}
						buttonStyle={{
							default: scheme.primary,
							pressed: scheme.secondary,
							disabled: scheme.disabled,
						}}
						onPress={handleCloseButtonPress}
					/>
				</View>
			</Modal>
		);
	}
	if (alertObj.type === 'coming soon') {
		return (
			<Modal
				style={styles.container}
				title={alertObj?.title || 'COMING SOON!'}
				palette="secondary"
				open={alertObj !== undefined}
				onDismiss={handleDismiss}
			>
				<View style={styles.body}>
					<Icon name="smile" size={75} />
					<View
						style={{
							padding: 5,
							flexGrow: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={typography.body1}>{alertObj?.message || 'This feature will be available soon.'}</Text>
					</View>

					<TextButton
						text="OK"
						style={{
							width: 104,
						}}
						buttonStyle={{
							default: scheme.primary,
							pressed: scheme.secondary,
							disabled: scheme.disabled,
						}}
						onPress={handleCloseButtonPress}
					/>
				</View>
			</Modal>
		);
	}
	return null;
}
