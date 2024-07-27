import { LinkButton, SpacerInline, Title } from '@elements';
import React from 'react';
import { View } from 'react-native';
import styles from './InfoScreen.styles';

type InfoScreenProps = {
	title: string;
	nextScreenTitle?: string;
	nextScreenDestination?: string;
	// backDestination?: string;
	showBackButton?: boolean;
	children: React.ReactNode;
};

function InfoScreen({ title, nextScreenTitle, nextScreenDestination, children }: InfoScreenProps) {
	return (
		<View style={styles.outerContainer}>
			<View>
				<Title text={title} />
				<SpacerInline height={40} />
				<View>{children}</View>
			</View>

			<View>
				{nextScreenTitle && nextScreenDestination && (
					<LinkButton text={nextScreenTitle} destination={nextScreenDestination} />
				)}
			</View>
		</View>
	);
}

export default InfoScreen;
