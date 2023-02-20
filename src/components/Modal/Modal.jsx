import React from "react";
import "./Modal.css";
import cls from "classnames";
import { PropTypes } from "prop-types";

const Modal = ({ children, onClose = () => {}, className, size = { height: "90%", width: "90%" } }) => {
	const { height, width } = size;
	return (
		<div className={cls("Modal", className)}>
			<div className="Modal__overlay" onClick={onClose} />
			<div className="Modal__content" style={{ height, width }}>
				{children}
			</div>
		</div>
	);
};
Modal.propTypes = {
	children: PropTypes.any,
	onClose: PropTypes.func,
	className: PropTypes.string,
	size: PropTypes.object,
};

export default Modal;
