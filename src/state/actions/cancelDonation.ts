import railsAxios from '@util/railsAxios';

const cancelDonation = async (_store, donationId: number) => {
	const endpoint = `/donations/${donationId}/update`;
	const { jwt } = _store.state;
	const payload = {
		donation: {
			id: donationId,
			status: 'deleted',
		},
	};
	try {
		const response = await railsAxios(jwt).patch(endpoint, payload);
		return response.request.status || 'Error';
	} catch (error) {
		return 500;
	}
};

export { cancelDonation };
