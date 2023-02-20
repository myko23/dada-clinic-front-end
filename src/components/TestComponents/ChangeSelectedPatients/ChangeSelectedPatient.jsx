import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelected } from "../../../lib/hooks/useSelected";
import { setStatePatientID } from "../../../lib/store/reducers/selectedReducer";
import InputBox from "../../InputBox/InputBox";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";

import "./ChangeSelectedPatient.css";

const ChangeSelectedPatient = () => {
	const { selectedPatient } = useSelected();
	const dispatch = useDispatch();

	const [idBox, setIdBox] = useState("");

	useEffect(() => {
		if (selectedPatient) setIdBox(selectedPatient?._id);
		else setIdBox("NA");
	}, [selectedPatient]);

	const handleClick = () => {
		setStatePatientID(dispatch)(idBox);
	};

	return (
		<div className="ChangeSelectedPatient">
			<InputBox label="Patient ID" placeholder="Enter ID" state={idBox} setState={setIdBox} />
			<PrimaryButton onClick={handleClick} title="Change" />
		</div>
	);
};

export default ChangeSelectedPatient;
