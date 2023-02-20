import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { PropTypes } from "prop-types";
import "./ConfirmModal.css";
import Modal from "../Modal/Modal";
import SuccessModal from "../SuccessModal/SuccessModal";

const ConfirmModal = ({
	onClose = () => {},
	onConfirm = () => {},
	icon = faMessage,
	confirmHeader = { header: "Header Message", message: "this is our message this time" },
	successMessage = { header: "Success", message: "You have been successful" },
	successModal = true,
}) => {
	const [sucessModalState, setSuccessModalState] = useState(false);
	const { header, message } = confirmHeader;
	return (
		<Modal onClose={onClose} size={{ height: "12.25rem", width: "25rem" }}>
			<div className="ConfirmModal">
				<div className="ConfirmModal__header-container">
					<FontAwesomeIcon icon={icon} className="ConfirmModal__icon" />
					<div className="ConfirmModal__header-text">
						<h4 className="ConfirmModal__header">{header}</h4>
						<h6 className="ConfirmModal__message">{message}</h6>
					</div>
				</div>
				<div className="ConfirmModal__button-container">
					<PrimaryButton
						onClick={() => {
							if (successModal) {
								onConfirm();
								setSuccessModalState(true);
							} else onConfirm();
						}}
						title="Confirm"
					/>
					<PrimaryButton onClick={() => onClose(true)} title="Cancel" className="ConfirmModal__cancel" />
				</div>
				{sucessModalState && (
					<Modal
						onClose={() => {
							setSuccessModalState(false);
							onClose();
						}}
						size={{ height: "20rem", width: "20rem" }}
					>
						<SuccessModal
							successMessage={successMessage}
							onClose={() => {
								setSuccessModalState(false);
								onClose();
							}}
						/>
					</Modal>
				)}
			</div>
		</Modal>
	);
};
ConfirmModal.propTypes = {
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	icon: PropTypes.any,
	confirmHeader: PropTypes.object,
	successModal: PropTypes.bool,
	successMessage: PropTypes.object,
};

export default ConfirmModal;
