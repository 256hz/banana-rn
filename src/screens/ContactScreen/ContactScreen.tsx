import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';
import { ContentHeader, SpacerInline, LinkButton, Icon } from '@elements';
import { IconName } from '@elements/Icon';
import { useNavigation } from '@react-navigation/native';
import useGlobal from '@state';
import styles, { ListItem } from './ContactScreen.styles';
import { UseGlobalType } from '@state/index.types';

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
	backDestination?: string;
}

export default function ContactScreen({ backDestination }: ContactScreenParams) {
	const { navigate, goBack } = useNavigation();
	const [state, { updateAlert }] = useGlobal();

	const openLink = async (url: string) => {
		try {
			const supported = await Linking.canOpenURL(url);

			if (supported) {
				await Linking.openURL(url);
			} else {
				if (url.startsWith('mailto:')) {
					updateAlert({
						title: 'Email Error',
						message: "It looks like you don't have an email client configured.",
						dismissable: true,
						type: 'default',
					});
				} else {
					updateAlert({
						title: 'Oops!',
						message: `There was an error connecting to ${url}-- please try again later.`,
						dismissable: true,
						type: 'default',
					});
				}
			}
		} catch (error) {
			updateAlert({
				title: 'Error',
				message: `An error occurred while trying to open ${url}: ${error.message}`,
				dismissable: true,
				type: 'default',
			});
		}
	};

	return (
		<View style={styles.outerContainer}>
			<ContentHeader headerSize="large" title="Contact Us" />

			<ScrollView style={styles.bodyContainer}>
				<View style={styles.bodyMessage}>
					<Text style={styles.bodyMessageTitle}>We are here to help.</Text>

					<Text style={styles.bodyMessageBody}>
						{'Feel free to reach out to us with any questions or inquiries!' +
							' \nWe will get back to you in 1-2 business days.'}
					</Text>
				</View>

				<View>
					{contactList.map((contact, i) => (
						<TouchableOpacity key={contact.title} onPress={() => openLink(contact.link)}>
							<View style={[ListItem.container, i === 0 && ListItem.firstContainer]}>
								<View style={ListItem.title}>
									<View style={ListItem.titleIcon}>
										<Icon name={contact.iconName} size={24} />
									</View>

									<Text style={ListItem.titleText}>{contact.title}</Text>
								</View>

								<Text style={ListItem.message}>{contact.message}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>

				<SpacerInline height={44} />
				<LinkButton text="Back" onPress={backDestination ? () => navigate(backDestination) : () => goBack()} />
			</ScrollView>
		</View>
	);
}
