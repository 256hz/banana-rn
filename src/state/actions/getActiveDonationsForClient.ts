import railsAxios from '@util/railsAxios';
import { IDonation } from '../../../declarations';

export const getActiveDonationsForClient = async (store): Promise<IDonation[] | []> => {
	const { jwt, user } = store.state;
	if (!user.coords) {
		return [];
	}
	const endpoint = `/donations/active?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;
	try {
		const response = await railsAxios(jwt).get(endpoint);
		const { data } = response;
		const sortedData = data.sort((a, b) => a.created_at < b.created_at);
		if (sortedData) {
			const activeDonations = sortedData.filter(donation => donation.status === 'active');
			await store.setState({ donationsOrClaims: activeDonations });
			return sortedData;
		}
	} catch (error) {
		console.log(error);
	}
	await store.setState({ donationsOrClaims: [] });
	return [];
};
