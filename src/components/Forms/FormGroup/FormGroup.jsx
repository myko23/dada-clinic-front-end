import React from "react";
import "./FormGroup.css";
import { PropTypes } from "prop-types";

const FormGroup = ({ children }) => {
	return <div className="FormGroup">{children}</div>;
};

FormGroup.propTypes = {
	children: PropTypes.any,
};

export default FormGroup;
