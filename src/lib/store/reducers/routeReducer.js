import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const routeInitialState = {
	login: false,
	route: "home",
};

const slice = createSlice({
	name: "route",
	initialState: routeInitialState,
	reducers: {
		appLoginSet: (route, action) => {
			route.login = action.payload;
		},
		routeSet: (route, action) => {
			route.route = action.payload;
		},
		routeReset: () => routeInitialState,
	},
});

export default slice.reducer;
const { appLoginSet, routeSet, routeReset } = slice.actions;

export const loginApp = (dispatch) => (login) => {
	dispatch(appLoginSet(login));
};
export const setStateRoute = (dispatch) => (route) => {
	let payloadRoute = _.find(
		[
			"patients",
			"general",
			"consultations",
			"admissions",
			"home",
			"consultationlists",
			"admissionlists",
			"billings",
			"usersettings",
		],
		(check) => check === route
	);
	if (!payloadRoute) payloadRoute = "patients";
	dispatch(routeSet(payloadRoute));
};
export const resetRoute = (dispatch) => {
	dispatch(routeReset());
};

export const getRouteState = (state) => state.route;
