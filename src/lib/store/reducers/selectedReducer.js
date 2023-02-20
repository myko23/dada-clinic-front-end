import { createSlice } from "@reduxjs/toolkit";

const selectedInitialState = {
	patientID: "1",
	consultationID: "1",
	admissionID: "1",
};

const slice = createSlice({
	name: "selected",
	initialState: selectedInitialState,
	reducers: {
		patientIDSet: (selected, action) => {
			selected.patientID = action.payload;
		},
		consultationIDSet: (selected, action) => {
			selected.consultationID = action.payload;
		},
		admissionIDSet: (selected, action) => {
			selected.admissionID = action.payload;
		},
		selectedReset: () => selectedInitialState,
	},
});

export default slice.reducer;
const { patientIDSet, consultationIDSet, admissionIDSet, selectedReset } = slice.actions;

export const setStatePatientID = (dispatch) => (id) => {
	dispatch(patientIDSet(id));
};

export const setStateConsultationID = (dispatch) => (id) => {
	dispatch(consultationIDSet(id));
};
export const setStateAdmissionID = (dispatch) => (id) => {
	dispatch(admissionIDSet(id));
};
export const resetSelected = (dispatch) => {
	dispatch(selectedReset());
};

export const getSelectedState = (state) => state.selected;
