import React from 'react';
import { Text } from 'react-native';
import { SpacerInline } from '@elements/SpacerInline';
import EndOfScrollWrapper from './EndOfScrollWrapper';
import styles from './ScrollContainer.styles';

interface ScrollContainerProps {
	onScrollToEnd?: Function;
	documentText: string;
}

export default function ScrollContainer({ onScrollToEnd = () => {}, documentText }: ScrollContainerProps) {
	return (
		<EndOfScrollWrapper onScrollToEnd={onScrollToEnd} style={styles.documentContainer}>
			<Text style={styles.documentText}>{documentText}</Text>
			<SpacerInline height={50} />
		</EndOfScrollWrapper>
	);
}
