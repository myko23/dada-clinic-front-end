import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { PropTypes } from "prop-types";
import "./EditConsultationForm.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ConsultationForm from "../../components/ConsultationForm/ConsultationForm";
import { useSelected } from "../../lib/hooks/useSelected";
import { useFormik } from "formik";
import { getDiffObj } from "../../lib/utils/getDiffObj";
import { useEditConsultationMutation } from "../../lib/api/consultationAPI";
import _ from "lodash";

const EditConsultationForm = ({ onClose = () => {} }) => {
	const [confirmModal, setConfirmModal] = useState(false);
	const { selectedPatient, selectedConsultation } = useSelected();
	const editConsultation = useEditConsultationMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: selectedConsultation.dateofconsult,
			subjective: selectedConsultation.subjective,
			objective: selectedConsultation.objective,
			assessment: selectedConsultation.assessment,
			labs: selectedConsultation.labs,
			plan: selectedConsultation.plan,
			chiefcomplaint: selectedConsultation.chiefcomplaint,
			hmo: selectedConsultation.hmo,
			bill: selectedConsultation.bill,
		},
		onSubmit: async (values) => {
			try {
				await editConsultation.mutateAsync({ id: selectedConsultation._id, body: values });
			} catch (err) {
				console.error(err.message);
			}
		},
	});

	const editArray = getDiffObj(formik.values, selectedConsultation);

	return (
		<div className="EditConsultationForm">
			<div className="EditConsultationForm__header-container">
				<h3 className="EditConsultationForm__patient">{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h3>
				<FontAwesomeIcon icon={faCircleXmark} className="EditConsultationForm__close" onClick={onClose} />
			</div>
			<h4 className="EditConsultationForm__title-container">
				<div className="EditConsultationForm__title">Edit Consultation Form</div>
			</h4>
			<div className="EditConsultationForm__form-container">
				<ConsultationForm patient={selectedPatient} formik={formik} editArray={editArray} editFormat={true} />
			</div>
			<div className="EditConsultationForm__button-container">
				<PrimaryButton
					onClick={async () => {
						const errors = await formik.validateForm();
						if (_.isEmpty(errors)) setConfirmModal(true);
					}}
					title="Save Consultation"
					className="EditConsultationForm__button"
					disabled={editArray.length !== 0 ? false : true}
				/>
				<PrimaryButton
					onClick={async () => {
						formik.handleReset();
					}}
					title="Reset"
					className="EditConsultationForm__button EditConsultationForm__button-reset"
					disabled={editArray.length !== 0 ? false : true}
				/>
			</div>
			{confirmModal && (
				<ConfirmModal
					onClose={() => {
						setConfirmModal(false);
						onClose();
					}}
					onConfirm={() => {
						formik.handleSubmit();
					}}
					successModal={true}
					confirmHeader={{
						header: "New Consultation",
						message: `Do you want to edit ${formik.values.chiefcomplaint} as a consultation`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully edited ${formik.values.chiefcomplaint}`,
					}}
				/>
			)}
		</div>
	);
};
EditConsultationForm.propTypes = {
	onClose: PropTypes.func,
};

export default EditConsultationForm;
