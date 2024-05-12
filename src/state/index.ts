import React from 'react';
import getEnv from '@util/environment';
import useGlobalHook from 'use-global-hook';
import { Actions, InitialState, UseGlobalType } from './index.types';

import * as actions from './actions';

const {
	USER_IDENTITY,
	API_BASE_URL,
	LOGIN_URL,
	CREATE_URL,
} = getEnv();

export const initialState: InitialState = {
	userIdentity: USER_IDENTITY as 'donor' | 'client',
	apiBaseUrl: API_BASE_URL,
	loginUrl: LOGIN_URL,
	createUrl: CREATE_URL,
	alert: undefined,
	donationsOrClaims: [],
	jwt: undefined,
	user: undefined,
};

// Paste the following into your code to use global state & actions:

// import useGlobal from '@state';
// const [ state, actions ] = useGlobal;

console.log('###ACTIONS FROM IMPORT: ', actions);
const actionFunctions: Actions = actions as unknown as Actions;

const useGlobalUntyped = useGlobalHook<InitialState, Actions>(React, initialState, actionFunctions);

const useGlobal = (): UseGlobalType => useGlobalUntyped();

export default useGlobal;
