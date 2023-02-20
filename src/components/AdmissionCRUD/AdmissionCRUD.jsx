import React from "react";
import { PropTypes } from "prop-types";
import Modal from "../Modal/Modal";
import AddAdmissionForm from "../../containers/AddAdmissionForm/AddAdmissionForm";
import EditAdmissionForm from "../../containers/EditAdmissionForm/EditAdmissionForm";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const AdmissionCRUD = ({
	deleteAdmissionButton = () => {},
	addAdmitObj = { addAdmissionModal: false, setAddAdmissionModal: () => {} },
	editAdmitObj = { editAdmissionModal: false, setEditAdmissionModal: () => {} },
	deleteAdmitObj = { confirmDelete: false, setConfirmDelete: () => {} },
}) => {
	const { addAdmissionModal, setAddAdmissionModal } = addAdmitObj;
	const { editAdmissionModal, setEditAdmissionModal } = editAdmitObj;
	const { confirmDelete, setConfirmDelete } = deleteAdmitObj;

	return (
		<>
			{addAdmissionModal && (
				<Modal
					onClose={() => {
						setAddAdmissionModal(false);
					}}
				>
					<AddAdmissionForm
						onClose={() => {
							setAddAdmissionModal(false);
						}}
					/>
				</Modal>
			)}
			{editAdmissionModal && (
				<Modal
					onClose={() => {
						setEditAdmissionModal(false);
					}}
				>
					<EditAdmissionForm
						onClose={() => {
							setEditAdmissionModal(false);
						}}
					/>
				</Modal>
			)}
			{confirmDelete && (
				<ConfirmModal
					onClose={() => {
						setConfirmDelete(false);
					}}
					onConfirm={deleteAdmissionButton}
					successModal={true}
					confirmHeader={{
						header: "Delete Admission",
						message: `Do you want to delete this admission`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully deleted the admission`,
					}}
				/>
			)}
		</>
	);
};
AdmissionCRUD.propTypes = {
	deleteAdmissionButton: PropTypes.func,
	addAdmitObj: PropTypes.object,
	editAdmitObj: PropTypes.object,
	deleteAdmitObj: PropTypes.object,
};

export default AdmissionCRUD;
