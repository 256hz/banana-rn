import railsAxios from './railsAxios';

export default async ({ id, jwt }) => {
	const response = await railsAxios(jwt).patch(`/donors/${id}/updateStatus`, {
		status: 'active',
	});

	return response.request.status || 'Error';
};
