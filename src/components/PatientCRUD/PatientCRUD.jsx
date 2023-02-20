import React from "react";
import AddPatientForm from "../../containers/AddPatientForm/AddPatientForm";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Modal from "../Modal/Modal";
import { PropTypes } from "prop-types";

const PatientCRUD = ({
	deletePatientButton = () => {},
	addPatientObj = { addPatientModal: false, setAddPatientModal: () => {} },
	deletePatientObj = { confirmDelete: false, setConfirmDelete: () => {} },
}) => {
	const { addPatientModal, setAddPatientModal } = addPatientObj;
	const { confirmDelete, setConfirmDelete } = deletePatientObj;

	return (
		<>
			{addPatientModal && (
				<Modal onClose={() => setAddPatientModal(false)}>
					<AddPatientForm onClose={() => setAddPatientModal(false)} />
				</Modal>
			)}
			{confirmDelete && (
				<ConfirmModal
					onClose={() => {
						setConfirmDelete(false);
					}}
					onConfirm={() => {
						deletePatientButton();
					}}
					confirmHeader={{
						header: "Delete",
						message: `Do you want to delete patient`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully deleted patient`,
					}}
				/>
			)}
		</>
	);
};
PatientCRUD.propTypes = {
	deletePatientButton: PropTypes.func,
	addPatientObj: PropTypes.object,
	deletePatientObj: PropTypes.object,
};

export default PatientCRUD;
