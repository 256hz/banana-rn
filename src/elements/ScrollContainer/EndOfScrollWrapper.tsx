import React, { ReactNode } from 'react';
import { ScrollView, NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from 'react-native';

interface EndOfScrollWrapperProps {
	onScrollToEnd: () => void;
	style?: ViewStyle;
	children: ReactNode;
}

export default function EndOfScrollWrapper({ onScrollToEnd, style, children }: EndOfScrollWrapperProps) {
	const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
	};

	return (
		<ScrollView
			onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
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
