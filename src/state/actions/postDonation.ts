import railsAxios from '@util/railsAxios';
import { NewDonation } from '../../../declarations';

const postDonation = async (_store, donation: NewDonation) => {
	const endpoint = '/donations/create';
	const { user, jwt } = _store.state;
	const payload = {
		donation: {
			donor_id: user.id,
			status: 'active',
			...donation,
		},
	};
	try {
		const response = await railsAxios(jwt).post(endpoint, payload);
		return response.request.status || 'Error';
	} catch (error) {
		console.log(error);
		return 500;
	}
};

export { postDonation };
