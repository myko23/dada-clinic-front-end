import React from "react";
import "./CheckBox.css";
import cls from "classnames";
import PropTypes from "prop-types";

const CheckBox = ({ item, className, active, onClick }) => {
	return (
		<div className={cls("CheckBox", className)} onClick={onClick}>
			<div className="CheckBox__checkbox">{active && <div className="CheckBox__mark"></div>}</div>
			<h6 className="CheckBox__label">{item}</h6>
		</div>
	);
};

CheckBox.propTypes = {
	item: PropTypes.string.isRequired,
	className: PropTypes.string,
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func,
};

export default CheckBox;
