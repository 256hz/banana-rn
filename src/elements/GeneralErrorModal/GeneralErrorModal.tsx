import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import { SpacerInline } from '@elements/SpacerInline';
import { TextButton } from '@elements/Button/TextButton';
import { useScheme } from '@util/colorSchemes';
import Modal from '../Modal/Modal';
import styles from './GeneralErrorModal.styles';

interface GeneralErrorProps {
	onDismiss: () => void;
}

const GeneralError: FunctionComponent<GeneralErrorProps> = ({ onDismiss }) => {
	const scheme = useScheme();
	return (
		<Modal title="UH-OH!" open={true} onDismiss={() => onDismiss()} style={{ position: 'absolute' }}>
			<View style={styles.container}>
				<SpacerInline height={60} />
				<Text style={styles.text}>Something went wrong.</Text>
				<Text style={styles.text}>Please try again later.</Text>
				<SpacerInline height={80} />
				<View style={styles.button}>
					<TextButton
						text="OK"
						buttonStyle={{
							default: scheme.primary,
							pressed: scheme.secondary,
							disabled: scheme.disabled,
						}}
						onPress={() => onDismiss()}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default GeneralError;
