import railsAxios from './railsAxios';

interface DonationProps {
	donorId: number;
	jwt: string;
	name: string;
	perPerson: string | number;
	servingName: string;
	sixtyMinuteLimit: boolean;
	pickupLocation: string;
	totalServings: string | number;
}

export default async ({
	donorId,
	jwt,
	name,
	sixtyMinuteLimit,
	totalServings,
	servingName,
	perPerson,
	pickupLocation,
}: DonationProps) => {
	const response = await railsAxios(jwt).post(
		'/donations/create',
		JSON.stringify({
			donation: {
				donor_id: donorId,
				food_name: name,
				duration_minutes: sixtyMinuteLimit ? 60 : 30,
				total_servings: totalServings,
				measurement: servingName,
				per_person: perPerson,
				image_url: '',
				pickup_location: pickupLocation,
				canceled: false,
			},
		})
	);

	return response.request.status || 'Error';
};
