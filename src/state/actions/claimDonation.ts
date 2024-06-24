import railsAxios from '@util/railsAxios';

const claimDonation = async (_store, donationId: number, clientId: number) => {
	const endpoint = `/donations/${donationId}/claim`;
	const { jwt } = _store.state;
	const payload = {
		client_id: clientId,
	};
	try {
		const response = await railsAxios(jwt).post(endpoint, payload);
		return { status: response.request.status, claim: response.data.claim };
	} catch (error) {
		return 500;
	}
};

export { claimDonation };
