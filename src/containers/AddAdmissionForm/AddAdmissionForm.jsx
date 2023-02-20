import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { PropTypes } from "prop-types";
import "./AddAdmissionForm.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { useSelected } from "../../lib/hooks/useSelected";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import AdmissionForm from "../../components/AdmissionForm/AdmissionForm";
import { useAddAdmissionsMutation } from "../../lib/api/admissionAPI";
import _ from "lodash";
import { recordsYupSchema } from "../../lib/schema/recordsSchema";
import SelectedPatientModal from "../../components/SelectPatientModal/SelectedPatientModal";
import { useSelector } from "react-redux";
import { getUserState } from "../../lib/store/reducers/userReducer";

const AddAdmissionForm = ({ onClose = () => {} }) => {
	const [confirmModal, setConfirmModal] = useState(false);
	const [selectPatientModal, setSelectPatientModal] = useState(false);
	const { selectedPatient } = useSelected();
	const { id: userID } = useSelector(getUserState);
	const addAdmission = useAddAdmissionsMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: DateTime.now().toFormat("MM-dd-yyyy"),
			dateofdischarge: "",
			disposition: "The patient is healing",
			subjective: ``,
			objective: ``,
			labs: ``,
			plan: "",
			assessment: "He has cough",
			chiefcomplaint: "My input chief complaint",
			hmo: "",
			bill: 0,
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: recordsYupSchema,
		onSubmit: async (values) => {
			try {
				await addAdmission.mutateAsync({ patient_id: selectedPatient._id, user_id: userID, ...values });
			} catch (err) {
				console.error(err.message);
			}
		},
	});

	return (
		<div className="AddAdmissionForm">
			<div className="AddAdmissionForm__header-container">
				<h3
					className="AddAdmissionForm__patient"
					onClick={() => setSelectPatientModal(true)}
				>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h3>
				<FontAwesomeIcon icon={faCircleXmark} className="AddAdmissionForm__close" onClick={onClose} />
			</div>
			<h4 className="AddAdmissionForm__title-container">
				<div className="AddAdmissionForm__title">Add Admission Form</div>
			</h4>
			<div className="AddAdmissionForm__form-container">
				<AdmissionForm patient={selectedPatient} formik={formik} />
			</div>
			<div className="AddAdmissionForm__button-container">
				<PrimaryButton
					onClick={async () => {
						const errors = await formik.validateForm();
						if (_.isEmpty(errors)) setConfirmModal(true);
					}}
					title="Save Admission"
					className="AddAdmissionForm__button"
				/>
				<PrimaryButton
					onClick={async () => {
						formik.handleReset();
					}}
					title="Reset"
					className="AddAdmissionForm__button AddAdmissionForm__button-reset"
				/>
			</div>
			{confirmModal && (
				<ConfirmModal
					onClose={(cancel = false) => {
						setConfirmModal(false);
						if (!cancel) onClose();
					}}
					onConfirm={() => {
						formik.handleSubmit();
					}}
					successModal={true}
					confirmHeader={{
						header: "New Admission",
						message: `Do you want to add ${formik.values.chiefcomplaint} as an admission`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully addded ${formik.values.chiefcomplaint}`,
					}}
				/>
			)}
			{selectPatientModal && (
				<SelectedPatientModal
					admitted={false}
					onClose={() => {
						setSelectPatientModal(false);
					}}
				/>
			)}
		</div>
	);
};
AddAdmissionForm.propTypes = {
	onClose: PropTypes.func,
};

export default AddAdmissionForm;
