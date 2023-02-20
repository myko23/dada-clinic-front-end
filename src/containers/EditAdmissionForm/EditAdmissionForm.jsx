import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { PropTypes } from "prop-types";
import "./EditAdmissionForm.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { useSelected } from "../../lib/hooks/useSelected";
import { useFormik } from "formik";
import AdmissionForm from "../../components/AdmissionForm/AdmissionForm";
import { getDiffObj } from "../../lib/utils/getDiffObj";
import Modal from "../../components/Modal/Modal";
import DischargeModal from "../../components/DischargeModal/DischargeModal";
import { useEditAdmissionMutation } from "../../lib/api/admissionAPI";
import { recordsYupSchema } from "../../lib/schema/recordsSchema";
import _ from "lodash";

const EditAdmissionForm = ({ onClose = () => {} }) => {
	const [confirmModal, setConfirmModal] = useState(false);
	const { selectedPatient, selectedAdmission } = useSelected();
	const [dischargeModal, setDischargeModal] = useState(false);
	const editAdmission = useEditAdmissionMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: selectedAdmission.dateofconsult,
			dateofdischarge: selectedAdmission.dateofdischarge,
			disposition: selectedAdmission.disposition ?? "",
			subjective: selectedAdmission.subjective,
			objective: selectedAdmission.objective,
			labs: selectedAdmission.labs,
			plan: selectedAdmission.plan,
			chiefcomplaint: selectedAdmission.chiefcomplaint,
			assessment: selectedAdmission.assessment,
			hmo: selectedAdmission.hmo,
			bill: selectedAdmission.bill,
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: recordsYupSchema,
		onSubmit: async (values) => {
			console.log({ values });
			try {
				await editAdmission.mutateAsync({ id: selectedAdmission._id, body: values });
			} catch (err) {
				console.error(err.message);
			}
		},
	});

	const editArray = getDiffObj(formik.values, selectedAdmission);

	return (
		<div className="EditAdmissionForm">
			<div className="EditAdmissionForm__header-container">
				<h3 className="EditAdmissionForm__patient">{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h3>
				<FontAwesomeIcon icon={faCircleXmark} className="EditAdmissionForm__close" onClick={onClose} />
			</div>
			<h4 className="EditAdmissionForm__title-container">
				<div className="EditAdmissionForm__title">Edit Admission Form</div>
			</h4>
			<div className="EditAdmissionForm__form-container">
				<AdmissionForm patient={selectedPatient} formik={formik} editArray={editArray} editFormat={true} />
			</div>
			<div className="EditAdmissionForm__button-container">
				<PrimaryButton
					onClick={async () => {
						const errors = await formik.validateForm();
						if (_.isEmpty(errors)) setConfirmModal(true);
					}}
					title="Save Admission"
					className="AddAdmissionForm__button"
					disabled={editArray.length !== 0 ? false : true}
				/>
				<PrimaryButton
					onClick={async () => {
						formik.handleReset();
					}}
					title="Reset"
					className="AddAdmissionForm__button AddAdmissionForm__button-reset"
					disabled={editArray.length !== 0 ? false : true}
				/>
			</div>
			{dischargeModal && (
				<Modal
					size={{ height: "20rem", width: "30rem" }}
					onClose={() => {
						setDischargeModal(false);
					}}
				>
					<DischargeModal
						id={selectedAdmission._id}
						onClose={() => {
							setDischargeModal(false);
						}}
					/>
				</Modal>
			)}
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
						header: "Edit Admission",
						message: `Do you want to edit ${formik.values.chiefcomplaint} as an admission`,
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
EditAdmissionForm.propTypes = {
	onClose: PropTypes.func,
};

export default EditAdmissionForm;
