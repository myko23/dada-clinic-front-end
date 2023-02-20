import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
	id: "",
	title: "",
	firstname: "",
	lastname: "",
	imgurl: "",
	administrator: [],
};

const slice = createSlice({
	name: "user",
	initialState: userInitialState,
	reducers: {
		userSet: (user, action) => {
			user.id = action.payload.id;
			user.title = action.payload.title;
			user.firstname = action.payload.firstname;
			user.lastname = action.payload.lastname;
			user.imgurl = action.payload.imgurl || "https://unsplash.com/photos/jgSAuqMmJUE";
			user.administrator = action.payload.administrator || [];
		},
		userReset: () => userInitialState,
	},
});

export default slice.reducer;
const { userSet, userReset } = slice.actions;

export const setUser = (dispatch) => (user) => {
	dispatch(userSet(user));
};

export const resetUser = (dispatch) => {
	dispatch(userReset());
};

export const getUserState = (state) => state.user;
