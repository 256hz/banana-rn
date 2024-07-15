import railsAxios from '@util/railsAxios';
import { IClaim } from '../../../declarations';

export const getClaimHistoryForClient = async (store: {
	state: { jwt: string; user: { id: number } };
	setState: (state: Partial<{ claimHistory: IClaim[] }>) => void;
}): Promise<IClaim[] | false> => {
	const { jwt, user } = store.state;
	const endpoint = `/clients/${user.id}/claims_history`;
	try {
		const response = await railsAxios(jwt).get(endpoint);
		const { data } = response;
		const sortedData = data.sort(
			(a: IClaim, b: IClaim) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);
		if (sortedData) {
			await store.setState({ claimHistory: sortedData });
			return sortedData;
		}
		return false;
	} catch (error) {
		console.log(error);
		await store.setState({ claimHistory: [] });
		return false;
	}
};
