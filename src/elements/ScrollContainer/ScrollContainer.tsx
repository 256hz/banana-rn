import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { SpacerInline } from '@elements/SpacerInline';
import EndOfScrollWrapper from './EndOfScrollWrapper';
import styles from './ScrollContainer.styles';

interface ScrollContainerProps {
	onScrollToEnd?: () => void;
	documentText: string;
}

export default function ScrollContainer({ onScrollToEnd, documentText }: ScrollContainerProps) {
	const handleScrollToEnd = () => {
		if (onScrollToEnd) {
			onScrollToEnd();
		}
	};

	return (
		<EndOfScrollWrapper onScrollToEnd={handleScrollToEnd} style={styles.documentContainer as ViewStyle}>
			<Text style={styles.documentText}>{documentText}</Text>
			<SpacerInline height={50} />
		</EndOfScrollWrapper>
	);
}
