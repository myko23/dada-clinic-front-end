import React, { useState } from "react";
import "./InputBox.css";
import cls from "classnames";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

const InputBox = ({
	placeholder,
	label,
	type = "text",
	className,
	size = "h6",
	state,
	setState,
	name,
	formtype = "internal",
	width = "100%",
	disabled = false,
	errorMessage,
	refProp,
	options = {},
	...props
}) => {
	const [inState, setInState] = useState("");

	const onChangeType = (e) => {
		if (formtype === "formik") return setState(e);
		if (state || setState) return setState(e.target.value);
		return setInState(e.target.value);
	};

	const renderOptions = () => {
		return options?.map((item, index) => (
			<option key={index} className="SelectInputBox__options" value={item.value}>
				{item.label}
			</option>
		));
	};

	const renderInput = () => {
		switch (type) {
			case "datepicker":
				return (
					<DatePicker
						ref={refProp}
						className={cls("InputBox__input", size)}
						selected={DateTime.fromFormat(state, "MM-dd-yyyy").toJSDate()}
						onChange={(e) => {
							const newDate = DateTime.fromJSDate(e).toFormat("MM-dd-yyyy");
							if (formtype === "formik") {
								setState(name, newDate);
							} else {
								setState(newDate);
							}
						}}
						dateFormat="MMMM dd, yyyy"
						id={name}
						onKeyDown={(e) => {
							e.preventDefault();
						}}
						showMonthDropdown
						showYearDropdown
						dropdownMode="select"
						disabled={disabled}
					/>
				);
			case "select":
				return (
					<select
						{...props}
						ref={refProp}
						name={name}
						type={type}
						value={state || setState ? state : inState}
						onChange={onChangeType}
						placeholder={placeholder}
						className={cls("InputBox__input InputBox__select", size)}
						disabled={disabled}
					>
						{renderOptions()}
					</select>
				);
			case "textarea":
				return (
					<textarea
						{...props}
						ref={refProp}
						name={name}
						type={type}
						value={state || setState ? state : inState}
						onChange={onChangeType}
						placeholder={placeholder}
						className={cls("InputBox__textarea", size)}
						disabled={disabled}
						style={{ resize: "none" }}
					/>
				);
			default:
				return (
					<input
						{...props}
						ref={refProp}
						name={name}
						type={type}
						value={state || setState ? state : inState}
						onChange={onChangeType}
						placeholder={placeholder}
						className={cls("InputBox__input", size)}
						disabled={disabled}
					/>
				);
		}
	};

	return (
		<div className={cls("InputBox", className, disabled && "InputBox--disabled")} style={{ width }}>
			{label && <h6 className="InputBox__label">{label}</h6>}
			{renderInput()}
			{errorMessage && <h6 className="InputBox__error-messsage">{errorMessage}</h6>}
		</div>
	);
};

InputBox.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.string,
	state: PropTypes.any,
	setState: PropTypes.func,
	name: PropTypes.string,
	formtype: PropTypes.string,
	width: PropTypes.string,
	disabled: PropTypes.bool,
	errorMessage: PropTypes.string,
	refProp: PropTypes.any,
	options: PropTypes.array,
};
export default InputBox;
