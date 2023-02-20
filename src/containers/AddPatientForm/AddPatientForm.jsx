import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { PropTypes } from "prop-types";
import "./AddPatientForm.css";
import { DateTime } from "luxon";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { useAddPatientMutation } from "../../lib/api/patientsAPI";
import { useFormik } from "formik";
import { patientYupSchema } from "../../lib/schema/patientSchema";
import _ from "lodash";

const AddPatientForm = ({ onClose = () => {} }) => {
	const [confirmModal, setConfirmModal] = useState(false);
	const addPatient = useAddPatientMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstname: "John",
			middlename: "",
			lastname: "Doe",
			birthday: DateTime.now().toFormat("MM-dd-yyyy"),
			contactno: "",
			address: "",
			guardian: "",
			relationship: "",
			religion: "",
			past_history: "",
			current_condition: "",
			allergies: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: patientYupSchema,
		onSubmit: async (values) => {
			try {
				await addPatient.mutateAsync(values);
			} catch (err) {
				console.error(err.response.data);
			}
		},
	});

	return (
		<div className="AddPatientForm">
			<div className="AddPatientForm__header-container">
				<h3 className="AddPatientForm__header">Patient Form</h3>
				<FontAwesomeIcon className="AddPatientForm__close" icon={faCircleXmark} onClick={onClose} />
			</div>
			<div className="AddPatientForm__form-container">
				<GeneralForm editFormat={false} formik={formik} />
			</div>
			<div className="AddPatientForm__button-container">
				<PrimaryButton
					onClick={async () => {
						const errors = await formik.validateForm();
						if (_.isEmpty(errors)) setConfirmModal(true);
					}}
					title="Add Patient"
					className="AddPatientForm__button"
				/>
				<PrimaryButton
					onClick={() => {
						formik.resetForm();
					}}
					title="Reset"
					className="AddPatientForm__button AddPatientForm__button-reset"
				/>
				<PrimaryButton
					onClick={onClose}
					title="Cancel"
					className="AddPatientForm__button AddPatientForm__button-cancel"
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
						header: "Add New Patient",
						message: `Do you want to add ${formik.values.firstname} ${formik.values.lastname}`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully addded ${formik.values.firstname} ${formik.values.lastname}`,
					}}
				/>
			)}
		</div>
	);
};

AddPatientForm.propTypes = {
	onClose: PropTypes.func,
};

export default AddPatientForm;
