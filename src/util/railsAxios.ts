import axios from 'axios';
import getEnv from './environment';

export default (jwt?: string) => {
	const JSON_HEADERS = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};
	const AUTH_HEADER = {
		Authorization: `Bearer ${jwt}`,
	};
	const { API_BASE_URL } = getEnv();
	return axios.create({
		headers: jwt ? { ...JSON_HEADERS, ...AUTH_HEADER } : { ...JSON_HEADERS },
		baseURL: API_BASE_URL,
	});
};
