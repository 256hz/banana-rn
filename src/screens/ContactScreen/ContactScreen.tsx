import React from 'react';
import {
	ScrollView,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import * as Linking from 'expo-linking';
import {
	ContentHeader,
	SpacerInline,
	LinkButton,
	Icon,
} from '@elements';
import { IconName } from '@elements/Icon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useGlobal from '@state';
import { InitialState, Actions, RootStackParamList } from '@state/index.types';
import styles, { ListItem } from './ContactScreen.styles';

const useGlobalTyped = useGlobal as () => [InitialState, Actions];

const contactList: Array<{
	title: string;
	message: string;
	link: string;
	iconName: IconName;
}> = [
	{
		title: 'website',
		message: 'www.thebegoodproject.org',
		link: 'https://www.thebegoodproject.org',
		iconName: 'website',
	},
	{
		title: 'email',
		message: 'info@thebegoodproject.org',
		// TODO: When the default iOS email app is uninstalled, this fails.
		link: 'mailto:info@thebegoodproject.org',
		iconName: 'email',
	},
	{
		title: 'facebook',
		message: 'Connect with us on Facebook!',
		link: 'https://facebook.com/BeGoodProject',
		iconName: 'facebook',
	},
	{
		title: 'privacy',
		message: 'https://thebegoodproject.org/privacy-notice',
		link: 'https://thebegoodproject.org/privacy-notice',
		iconName: 'more',
	},
];

interface ContactScreenParams {
	backDestination?: keyof RootStackParamList;
}

export default ({ backDestination }: ContactScreenParams) => {
	const { navigate, goBack } = useNavigation<NavigationProp<RootStackParamList>>();
	const [ , actions ] = useGlobalTyped();

	const { updateAlert } = actions;

	const openLink = async (url: string) => {
		const supported = await Linking.canOpenURL(url);

		supported
			? await Linking.openURL(url)
			: updateAlert({
				title: 'Oops!',
				type: 'bad url',
				message: `There was an error connecting to ${url}-- please try again later.`,
				dismissable: true,
			});
	};

	return (
		<View style={styles.outerContainer}>

			<ContentHeader headerSize="large" title="Contact Us" />

			<ScrollView style={styles.bodyContainer}>
				{/* Body Message */}
				<View style={styles.bodyMessage}>
					<Text style={styles.bodyMessageTitle}>
						We are here to help.
					</Text>

					<Text style={styles.bodyMessageBody}>
						{
							'Feel free to reach out to us with any questions or inquiries!'
							+ ' \nWe will get back to you in 1-2 business days.'
						}
					</Text>
				</View>

				{/* Contact List */}
				<View>
					{
						contactList.map((contact, i) => (
							<TouchableHighlight key={contact.title} onPress={() => openLink(contact.link)}>
								<View style={[ ListItem.container, i === 0 && ListItem.firstContainer ]}>
									<View style={ListItem.title}>
										<View style={ListItem.titleIcon}>
											<Icon name={contact.iconName} size={24} />
										</View>

										<Text style={ListItem.titleText}>
											{contact.title}
										</Text>
									</View>

									<Text style={ListItem.message}>
										{contact.message}
									</Text>
								</View>
							</TouchableHighlight>
						))
					}
				</View>

				<SpacerInline height={44} />
				<LinkButton text="Back" onPress={backDestination ? () => navigate(backDestination) : () => goBack()} />

			</ScrollView>
		</View>
	);
};
