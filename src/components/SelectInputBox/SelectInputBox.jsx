import React from "react";
import "./SelectInputBox.css";
import cls from "classnames";
import { PropTypes } from "prop-types";

const SelectInputBox = ({ label = "Default", state, setState, options = [], className }) => {
	const renderOptions = () => {
		return options.map((item, index) => (
			<option key={index} className="SelectInputBox__options" value={item.value}>
				{item.label}
			</option>
		));
	};

	return (
		<div className={cls("SelectInputBox", className)}>
			<h6 className="SelectInputBox__label">{label}</h6>
			<select className="SelectInputBox__select h6" value={state} onChange={(e) => setState(e.target.value)}>
				{renderOptions()}
			</select>
		</div>
	);
};
SelectInputBox.propTypes = {
	label: PropTypes.string,
	state: PropTypes.string,
	setState: PropTypes.any,
	options: PropTypes.array,
	className: PropTypes.string,
};

export default SelectInputBox;
