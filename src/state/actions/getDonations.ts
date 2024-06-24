import railsAxios from '@util/railsAxios';

export const getDonations = async store => {
	const { jwt, user } = store.state;
	const endpoint = `/donors/${user.id}/get_active_donations`;

	try {
		const response = await railsAxios(jwt).get(endpoint);
		const { data } = response;
		const sortedData = data.sort((a, b) => a.created_at < b.created_at);
		if (sortedData) {
			await store.setState({ donationsOrClaims: sortedData });
			return sortedData;
		}
		return false;
	} catch (error) {
		console.log(error);
		await store.setState({ donationsOrClaims: [] });
		return false;
	}
};
