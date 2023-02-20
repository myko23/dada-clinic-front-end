import React from "react";
import AddConsultationForm from "../../containers/AddConsultationForm/AddConsultationForm";
import EditConsultationForm from "../../containers/EditConsultationForm/EditConsultationForm";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Modal from "../Modal/Modal";
import { PropTypes } from "prop-types";

const ConsultationCRUD = ({
	deleteConsultationButton = () => {},
	addConsultObj = { addConsultationModal: false, setAddConsultationModal: () => {} },
	editConsultObj = { editConsultationModal: false, setEditConsultationModal: () => {} },
	deleteConsultObj = { confirmDelete: false, setConfirmDelete: () => {} },
}) => {
	const { addConsultationModal, setAddConsultationModal } = addConsultObj;
	const { editConsultationModal, setEditConsultationModal } = editConsultObj;
	const { confirmDelete, setConfirmDelete } = deleteConsultObj;

	return (
		<>
			{addConsultationModal && (
				<Modal
					onClose={() => {
						setAddConsultationModal(false);
					}}
				>
					<AddConsultationForm
						onClose={() => {
							setAddConsultationModal(false);
						}}
					/>
				</Modal>
			)}
			{editConsultationModal && (
				<Modal
					onClose={() => {
						setEditConsultationModal(false);
					}}
				>
					<EditConsultationForm
						onClose={() => {
							setEditConsultationModal(false);
						}}
					/>
				</Modal>
			)}
			{confirmDelete && (
				<ConfirmModal
					onClose={() => {
						setConfirmDelete(false);
					}}
					onConfirm={deleteConsultationButton}
					successModal={true}
					confirmHeader={{
						header: "Delete Admission",
						message: `Do you want to delete this consultation`,
					}}
					successMessage={{
						header: "Success",
						message: `You have successfully deleted the consultation`,
					}}
				/>
			)}
		</>
	);
};
ConsultationCRUD.propTypes = {
	deleteConsultationButton: PropTypes.func,
	addConsultObj: PropTypes.object,
	editConsultObj: PropTypes.object,
	deleteConsultObj: PropTypes.object,
};

export default ConsultationCRUD;
