import railsAxios from '@util/railsAxios';

const getTravelTimes = async (_store, donorId: number, clientLat: number, clientLong: number) => {
	const endpoint = `/clients/${donorId}/travel_times?client_lat=${clientLat}&client_long=${clientLong}`;
	const { jwt } = _store.state;
	try {
		const response = await railsAxios(jwt).get(endpoint);
		return { status: response.request.status, times: response.data };
	} catch (error) {
		return 500;
	}
};

export { getTravelTimes };
