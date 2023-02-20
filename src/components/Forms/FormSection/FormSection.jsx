import React from "react";
import { PropTypes } from "prop-types";
import "./FormSection.css";

const FormSection = ({ header = "Default Header", children }) => {
	return (
		<div className="FormSection">
			<h5 className="FormSection__header">{header}</h5>
			{children}
		</div>
	);
};

FormSection.propTypes = {
	header: PropTypes.string,
	children: PropTypes.any,
};

export default FormSection;
