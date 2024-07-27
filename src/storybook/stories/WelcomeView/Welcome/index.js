import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export default class Welcome extends React.Component {
	styles = {
		wrapper: {
			flex: 1,
			padding: 24,
			justifyContent: 'center',
		},
		header: {
			fontSize: 18,
			marginBottom: 18,
		},
		content: {
			fontSize: 12,
			marginBottom: 10,
			lineHeight: 18,
		},
	};

	showApp = event => {
		const { showApp } = this.props;
		event.preventDefault();

		if (showApp) {
			showApp();
		}
	};

	render() {
		return (
			<View style={this.styles.wrapper}>
				<Text style={this.styles.header}>Welcome to React Native Storybook</Text>
				<Text style={this.styles.content}>
					Hi, here is the storybook for banana App, you could see all the documented components in navigator, and the
					related documentation is on wiki of our github repo. Visit wiki of any component via link attached in add-on
					notes.
				</Text>
			</View>
		);
	}
}

Welcome.defaultProps = {
	showApp: null,
};

Welcome.propTypes = {
	showApp: PropTypes.func,
};
