import React from "react";
import "./Header.css";
import { PropTypes } from "prop-types";

const Header = ({ header, admitted, label }) => {
	return (
		<div className="Header">
			{label && <h6 className="Header__label">{label}</h6>}
			<h3 className="Header__text">{header}</h3>
			{admitted && <h6 className="Header__admitted">Admitted</h6>}
		</div>
	);
};

Header.propTypes = {
	label: PropTypes.string,
	header: PropTypes.string,
	admitted: PropTypes.bool,
};

export default Header;
