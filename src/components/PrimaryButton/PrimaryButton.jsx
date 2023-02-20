import React from "react";
import "./PrimaryButton.css";
import cls from "classnames";
import PropTypes from "prop-types";

const PrimaryButton = ({ title, onClick, className, disabled = false }) => {
	return (
		<button
			className={cls("PrimaryButton h5", className, disabled && "PrimaryButton--disabled")}
			onClick={onClick}
			disabled={disabled}
			type="submit"
		>
			{title}
		</button>
	);
};
PrimaryButton.propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
};

export default PrimaryButton;
