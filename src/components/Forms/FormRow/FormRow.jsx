import React from "react";
import { PropTypes } from "prop-types";
import "./FormRow.css";

const FormRow = ({ children }) => {
	return <div className="FormRow">{children}</div>;
};

FormRow.propTypes = {
	children: PropTypes.any,
};

export default FormRow;
