import { useFormik } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import Header from "../../components/Header/Header";
import NavigationCardsContainer from "../../components/NavigationCardsContainer/NavigationCardsContainer";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import User from "../../components/User/User";
import { useEditPatientMutation } from "../../lib/api/patientsAPI";
import { useSelected } from "../../lib/hooks/useSelected";
import { patientYupSchema } from "../../lib/schema/patientSchema";
import { getDiffObj } from "../../lib/utils/getDiffObj";
import "./General.css";

const General = () => {
	const { selectedPatient, patientAdmitted } = useSelected();
	const [confirmModal, setConfirmModal] = useState(false);
	const editPatient = useEditPatientMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstname: selectedPatient.firstname,
			middlename: selectedPatient.middlename,
			lastname: selectedPatient.lastname,
			birthday: selectedPatient.birthday,
			contactno: selectedPatient.contactno,
			address: selectedPatient.address,
			guardian: selectedPatient.guardian,
			relationship: selectedPatient.relationship,
			religion: selectedPatient.religion,
			past_history: selectedPatient.past_history,
			current_condition: selectedPatient.current_condition,
			allergies: selectedPatient.allergies,
		},
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: patientYupSchema,
		onSubmit: async (values) => {
			try {
				await editPatient.mutateAsync({ id: selectedPatient._id, body: values });
			} catch (err) {
				console.error(err.message);
			}
		},
	});

	const editArray = getDiffObj(formik.values, selectedPatient);

	return (
		<div className="General">
			<div className="General__header-container">
				<Header
					label="Patient"
					header={`${selectedPatient.firstname} ${selectedPatient.lastname}`}
					admitted={patientAdmitted ? true : false}
				/>

				<User />
			</div>
			<div className="General__navigation-container">
				<NavigationCardsContainer />
			</div>
			<div className="General__form-container">
				<GeneralForm editFormat={true} editArray={editArray} formik={formik} />
			</div>
			<div className="General__button-container">
				<PrimaryButton
					title="Save Details"
					className="General__button"
					disabled={editArray.length === 0}
					onClick={async () => {
						const errors = await formik.validateForm();
						if (_.isEmpty(errors)) setConfirmModal(true);
					}}
				/>
				<PrimaryButton
					title="Reset"
					className="General__button-reset"
					disabled={editArray.length === 0}
					onClick={() => {
						formik.resetForm();
					}}
				/>
			</div>
			{confirmModal && (
				<ConfirmModal
					onClose={() => {
						setConfirmModal(false);
					}}
					onConfirm={() => {
						formik.handleSubmit();
					}}
					successModal={true}
					confirmHeader={{
						header: "New Admission",
						message: `Do you want to edit ${formik.values.firstname} ${formik.values.lastname} as an admission`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully edited ${formik.values.firstname} ${formik.values.lastname}`,
					}}
				/>
			)}
		</div>
	);
};

export default General;
