import railsAxios from '@util/railsAxios';

const deleteData = async (_store, userType: string, userId: number) => {
	const endpoint = `/${userType}s/${userId}/update`;
	const { jwt } = _store.state;
	const firstName = `FirstName${userId}`;
	const lastName = `LastName${userId}`;
	const organizationName = `OrganizationName${userId}`;
	const email = `${userType}.email${userId}@deleted.com`;
	const streetAddress = `${userId} Deleted Street`;
	const city = `Deleted City ${userId}`;
	const state = 'WA';
	const zipCode = '98119';

	// TODO: Update for client user
	const payload = {
		first_name: firstName,
		last_name: lastName,
		organization_name: organizationName,
		email,
		address_street: streetAddress,
		address_city: city,
		address_state: state,
		address_zip: zipCode,
	};

	try {
		const response = await railsAxios(jwt).patch(endpoint, payload);
		return { status: response.request.status };
	} catch (error) {
		console.error('error');
		return 500;
	}
};

export { deleteData };
