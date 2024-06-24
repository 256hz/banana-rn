import React from 'react';
import { Text } from 'react-native';
import styles from './Paragraph.styles';

interface ParagraphProps {
	fontSize: number;
	emphasized?: boolean;
	textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
	children: React.ReactNode;
}

function Paragraph({ fontSize, emphasized, textAlign, children }: ParagraphProps) {
	const style = emphasized
		? [styles.paragraphText, styles.emphasizedParagraphText, { fontSize, textAlign }]
		: [styles.paragraphText, { fontSize, textAlign }];

	return <Text style={style}>{children}</Text>;
}

export default Paragraph;
