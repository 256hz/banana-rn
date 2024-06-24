import * as SecureStore from 'expo-secure-store';
import railsAxios from './railsAxios';

interface RegisterProps {
	organizationName: string;
	email: string;
	password: string;
	license: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	termsOfService: boolean;
}

export default async ({ organizationName, email, password, license, street, city, state, zip }: RegisterProps) => {
	const response = await railsAxios().post(
		'/donors/create',
		JSON.stringify({
			donor: {
				email,
				password,
				organization_name: organizationName,
				business_license: license,
				address_street: street,
				address_city: city,
				address_zip: zip,
				address_state: state,
			},
		})
	);

	response.data ? await SecureStore.setItemAsync('jwt', response.data.jwt) : await SecureStore.deleteItemAsync('jwt');

	return response.request.status || 'Error';
};
