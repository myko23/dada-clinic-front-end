import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { PropTypes } from "prop-types";
import "./SuccessModal.css";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const SuccessModal = ({
	successMessage = { header: "Success", message: "This is my messsage" },
	onClose = () => {},
}) => {
	const { header, message } = successMessage;
	return (
		<div className="SuccessModal">
			<div className="SuccessModal__card">
				<FontAwesomeIcon icon={faCircleCheck} className="SuccessModal__icon" />
			</div>
			<div className="SuccessModal__text-container">
				<h4 className="SuccessModal__header">{header}</h4>
				<h6 className="SuccessModal__message">{message}</h6>
				<PrimaryButton onClick={onClose} title="Close" className="SuccessModal__close" />
			</div>
		</div>
	);
};

SuccessModal.propTypes = {
	successMessage: PropTypes.object,
	onClose: PropTypes.func,
};

export default SuccessModal;
