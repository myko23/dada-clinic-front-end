import React, { useState } from "react";
import "./DischargeModal.css";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import InputBox from "../InputBox/InputBox";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { useDischargeAdmissionMutation } from "../../lib/api/admissionAPI";
import _ from "lodash";
import * as Yup from "yup";

const DischargeModal = ({ onClose = () => {}, id }) => {
	const [confirmModal, setConfirmModal] = useState(false);
	const dischageAdmission = useDischargeAdmissionMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofdischarge: DateTime.now().toFormat("MM-dd-yyyy"),
			disposition: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: Yup.object().shape({
			dateofdischarge: Yup.string(),
			disposition: Yup.string().required("Disposition is required"),
		}),
		onSubmit: async (values) => {
			try {
				await dischageAdmission.mutateAsync({ id, body: values });
			} catch (err) {
				console.error(err.message);
			}
		},
	});

	return (
		<div className="DischargeModal">
			<div className="DischargeModal__header-container">
				<h4 className="DischargeModal__header">Discharge Patient</h4>
				<FontAwesomeIcon className="DischargeModal__close" icon={faCircleXmark} onClick={onClose} />
			</div>
			<div className="DischargeModal__form-container">
				<InputBox
					placeholder="Date of Discharge"
					label="Date of Discharge"
					name="dateofdischarge"
					width="15rem"
					formtype="formik"
					type="datepicker"
					state={formik.values.dateofdischarge}
					setState={formik.setFieldValue}
				/>
				<InputBox
					placeholder="Disposition"
					label="Disposition"
					name="disposition"
					formtype="formik"
					state={formik.values.disposition}
					setState={formik.handleChange}
					errorMessage={formik.errors.disposition}
				/>
			</div>
			<div className="DischargeModal__button-container">
				<PrimaryButton
					title="Discharge Patient"
					className="DischargeModal__button"
					onClick={async () => {
						const errors = await formik.validateForm();
						if (_.isEmpty(errors)) setConfirmModal(true);
					}}
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
						header: "Discharge the patient",
						message: `Do you want to discharge the patient?`,
					}}
					successMessage={{
						header: "Success",
						message: `You have discharged the patient `,
					}}
				/>
			)}
		</div>
	);
};
DischargeModal.propTypes = {
	onClose: PropTypes.func,
	id: PropTypes.string,
};

export default DischargeModal;
