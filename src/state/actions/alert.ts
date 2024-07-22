import { IAlert } from '../index.types';

export const updateAlert = (store, alert: IAlert) => {
	store.setState({ alert });
};

export const clearAlert = store => {
	store.setState({ alert: undefined });
};
