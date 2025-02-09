/* eslint-disable no-console */
import axios from 'axios';
import railsAxios from '@util/railsAxios';
import * as SecureStore from 'expo-secure-store';

export const logIn = async (store, { email, password }) => {
	const { loginUrl, userIdentity } = store.state;
	try {
		const response = await railsAxios().post(loginUrl, JSON.stringify({ [userIdentity]: { email, password } }));
		await store.setState({
			jwt: response.data?.jwt || '',
			user: response.data?.[userIdentity] || {},
		});
		await SecureStore.setItemAsync('email', email);
		await SecureStore.setItemAsync('password', password);
		return response.status;
	} catch (error: unknown) {
		if (error instanceof Error) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status || 418;
				return status;
			}
			console.error('Non-Axios error:', error.message);
			return 418;
		}
		console.error('Caught an error that is not an Error instance:', error);
		return 418;
	}
};

export const logOut = async store => {
	await store.setState({
		jwt: null,
		user: {},
	});
	await SecureStore.deleteItemAsync('email');
	await SecureStore.deleteItemAsync('password');
	console.log(store.jwt);
};
