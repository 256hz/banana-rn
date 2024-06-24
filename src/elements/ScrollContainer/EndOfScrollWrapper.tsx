import React from 'react';
import { ScrollView } from 'react-native';

interface EndOfScrollWrapperProps {
	onScrollToEnd: Function;
	style: any;
	children: any;
}

export default function EndOfScrollWrapper({ onScrollToEnd, style, children }: EndOfScrollWrapperProps) {
	const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
	};

	return (
		<ScrollView
			onScroll={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent)) {
					onScrollToEnd();
				}
			}}
			style={style}
			scrollEventThrottle={400}
		>
			{children}
		</ScrollView>
	);
}
