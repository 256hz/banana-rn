/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStore } from '@state/index.types';
import railsAxios from '@util/railsAxios';

interface ResetPasswordPropsBase {
	onComplete: () => void;
	input: string;
	setIsSubmitting: (value: boolean) => void;
	setError: (value: string) => void;
}

export type RequestResetTokenProps = ResetPasswordPropsBase;

export const requestResetToken = async (
	store: IStore,
	{ onComplete, input, setIsSubmitting, setError }: RequestResetTokenProps
) => {
	const { userIdentity } = store.state;
	const endpoint = `/password_resets/${userIdentity}/`;
	const email = JSON.stringify({ email: input });
	try {
		await railsAxios().post(endpoint, email);
		setIsSubmitting(false);
		onComplete();
	} catch (e: any) {
		setIsSubmitting(false);
		setError(e.response ? e.response.data.message : "We're sorry, but there was an error. Please try again.");
	}
};

export interface SubmitResetTokenProps extends ResetPasswordPropsBase {
	setToken: (value: string) => void;
}

export const submitResetToken = async (
	store: IStore,
	{ onComplete, input, setIsSubmitting, setError, setToken }: SubmitResetTokenProps
) => {
	const { userIdentity } = store.state;
	const endpoint = `/password_resets/${userIdentity}/${input}/`;
	try {
		await railsAxios().get(endpoint);
		setIsSubmitting(false);
		setToken(input);
		onComplete();
	} catch (e: any) {
		setIsSubmitting(false);
		setError(e.response ? e.response.data.message : "We're sorry, but there was an error. Please try again.");
	}
};

export interface SubmitNewPasswordProps extends ResetPasswordPropsBase {
	token: string;
}

export const submitNewPassword = async (
	store: IStore,
	{ input, token, setIsSubmitting, onComplete, setError }: SubmitNewPasswordProps
) => {
	const { userIdentity } = store.state;
	const password = JSON.stringify({ password: input });
	const endpoint = `/password_resets/${userIdentity}/${token}`;
	try {
		await railsAxios().patch(endpoint, password);
		setIsSubmitting(false);
		onComplete();
	} catch (e: any) {
		setIsSubmitting(false);
		setError(e.response ? e.response.data.message : "We're sorry, but there was an error. Please try again.");
	}
};
