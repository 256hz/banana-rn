import railsAxios from '@util/railsAxios';
import { GlobalState } from '@state/index';
// import { AxiosError } from "axios";

export const logIn = async (
  loginUrl: string,
  userIdentity: string,
  email: string,
  password: string,
): Promise<Partial<GlobalState>> => {
  try {
    const { data, status, statusText } = await railsAxios().post(
      loginUrl,
      JSON.stringify({
        [userIdentity]: {
          email,
          password,
        },
      }),
    );

    return {
      jwt: data?.jwt || '',
      user: data?.[userIdentity] || '',
      responseStatus: {
        code: status,
        message: statusText,
      },
    };
  /* TODO: add type for error below maybe AxiosError<any> */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error', error);
    return {
      jwt: '',
      user: undefined,
      responseStatus: {
        // title: error.response.statusText,
        code: error.response.status,
        message: error.response.data.message,
      },
    };
  }
};
