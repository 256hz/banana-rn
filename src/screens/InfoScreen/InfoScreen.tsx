import {
	LinkButton, SpacerInline, Title,
} from '@elements';
import React, { FunctionComponent, ReactNode } from 'react';
import { View } from 'react-native';
import styles from './InfoScreen.styles';

type InfoScreenProps = {
	title: string;
	nextScreenTitle?: string;
	nextScreenDestination?: string;
	backDestination?: string;
	showBackButton?: boolean;
	children?: ReactNode;
};

const InfoScreen: FunctionComponent<InfoScreenProps> = ({
	title,
	nextScreenTitle,
	nextScreenDestination,
	children,
}) => (
	<View style={styles.outerContainer}>
		<View>
			<Title text={title} />
			<SpacerInline height={40} />
			<View>
				{children}
			</View>
		</View>

		<View>
			{ nextScreenTitle && nextScreenDestination && (
				<LinkButton text={nextScreenTitle} destination={nextScreenDestination} />
			)}
		</View>
	</View>
);

export default InfoScreen;
