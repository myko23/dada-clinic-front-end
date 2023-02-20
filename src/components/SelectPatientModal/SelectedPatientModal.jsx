import React from "react";
import Modal from "../Modal/Modal";
import "./SelectedPatientModal.css";
import { PropTypes } from "prop-types";
import InputBox from "../InputBox/InputBox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStatePatientID } from "../../lib/store/reducers/selectedReducer";
import cls from "classnames";
import { useSelected } from "../../lib/hooks/useSelected";
import { useAdmittedPatientData } from "../../lib/hooks/useAdmittedPatientsData";

const SelectedPatientModal = ({ onClose, admitted = false }) => {
	const [searchfield, setSearchField] = useState("");
	const { patientData } = useAdmittedPatientData(true, admitted);
	const dispatch = useDispatch();
	const { selectedPatient } = useSelected();


	const filteredPatients = patientData.filter((item) => {
		if (item?.firstname.toLowerCase().includes(searchfield.toLowerCase())) return item;
		if (item?.lastname.toLowerCase().includes(searchfield.toLowerCase())) return item;
		if (item?.middlename.toLowerCase().includes(searchfield.toLowerCase())) return item;
	});

	const renderPatientList = () => {
		return filteredPatients.map((item) => {
			return (
				<h5
					className={cls(
						"SelectedPatientModal__patient",
						selectedPatient._id === item._id && "SelectedPatientModal__patient--selected"
					)}
					key={item._id}
					onClick={() => {
						setStatePatientID(dispatch)(item._id);
					}}
				>{`${item.lastname}, ${item.firstname}`}</h5>
			);
		});
	};
	return (
		<Modal onClose={onClose} size={{ height: "25rem", width: "25rem" }}>
			<div className="SelectedPatientModal">
				<InputBox
					className="SelectedPatientModal__input"
					placeholder="Search Patient"
					size="h5"
					state={searchfield}
					setState={setSearchField}
				/>
				<div className="SelectedPatientModal__patient-container">{renderPatientList()}</div>
			</div>
		</Modal>
	);
};
SelectedPatientModal.propTypes = {
	onClose: PropTypes.func,
	admitted: PropTypes.bool,
};

export default SelectedPatientModal;
