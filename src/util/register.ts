// import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import railsAxios from './railsAxios';

interface RegisterProps {
  organizationName: string;
  email: string;
  password: string;
  license: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  termsOfService: boolean;
}

export default async ({
  organizationName,
  email,
  password,
  license,
  street,
  city,
  state,
  zip,
}: RegisterProps) => {
  const response = await railsAxios().post(
    '/donors/create',
    JSON.stringify({
      donor: {
        email,
        password,
        organization_name: organizationName,
        business_license: license,
        address_street: street,
        address_city: city,
        address_zip: zip,
        address_state: state,
      },
    }),
  );

  // TODO: refactor to new syntax `useAsyncStorage`
  // response.data
  //   ? await AsyncStorage.setItem('jwt', response.data.jwt)
  //   : await AsyncStorage.removeItem('jwt');

  return response.request.status || 'Error';
};
