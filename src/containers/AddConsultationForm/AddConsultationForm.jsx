import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { PropTypes } from "prop-types";
import "./AddConsultationForm.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ConsultationForm from "../../components/ConsultationForm/ConsultationForm";
import { useSelected } from "../../lib/hooks/useSelected";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { useAddConsultationMutation } from "../../lib/api/consultationAPI";
import { recordsYupSchema } from "../../lib/schema/recordsSchema";
import _ from "lodash";
import SelectedPatientModal from "../../components/SelectPatientModal/SelectedPatientModal";
import { useSelector } from "react-redux";
import { getUserState } from "../../lib/store/reducers/userReducer";

const AddConsultationForm = ({ onClose = () => {} }) => {
	const [confirmModal, setConfirmModal] = useState(false);
	const [selectPatientModal, setSelectPatientModal] = useState(false);
	const { selectedPatient } = useSelected();
	const addConsultation = useAddConsultationMutation();
	const { id: userID } = useSelector(getUserState);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: DateTime.now().toFormat("MM-dd-yyyy"),
			subjective: ``,
			objective: ``,
			labs: ``,
			plan: "",
			chiefcomplaint: "Cough and Colds",
			assessment: "Hand Over",
			hmo: "",
			bill: 0,
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: recordsYupSchema,
		onSubmit: async (values) => {
			try {
				await addConsultation.mutateAsync({ patient_id: selectedPatient._id, user_id: userID, ...values });
			} catch (err) {
				console.err(err.message);
			}
		},
	});

	return (
		<div className="AddConsultationForm">
			<div className="AddConsultationForm__header-container">
				<h3
					className="AddConsultationForm__patient"
					onClick={() => {
						setSelectPatientModal(true);
					}}
				>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h3>
				<FontAwesomeIcon icon={faCircleXmark} className="AddConsultationForm__close" onClick={onClose} />
			</div>
			<h4 className="AddConsultationForm__title-container">
				<div className="AddConsultationForm__title">Add Consultation Form</div>
			</h4>
			<div className="AddConsultationForm__form-container">
				<ConsultationForm patient={selectedPatient} formik={formik} />
			</div>
			<div className="AddConsultationForm__button-container">
				<PrimaryButton
					onClick={async () => {
						const errors = await formik.validateForm();
						if (_.isEmpty(errors)) setConfirmModal(true);
					}}
					title="Save Consultation"
					className="AddConsultationForm__button"
				/>
				<PrimaryButton
					onClick={async () => {
						formik.handleReset();
					}}
					title="Reset"
					className="AddConsultationForm__button AddConsultationForm__button-reset"
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
						header: "New Consultation",
						message: `Do you want to add ${formik.values.chiefcomplaint} as a consultation`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully addded ${formik.values.chiefcomplaint}`,
					}}
				/>
			)}
			{selectPatientModal && (
				<SelectedPatientModal
					admitted="all"
					onClose={() => {
						setSelectPatientModal(false);
					}}
				/>
			)}
		</div>
	);
};
AddConsultationForm.propTypes = {
	onClose: PropTypes.func,
};

export default AddConsultationForm;
