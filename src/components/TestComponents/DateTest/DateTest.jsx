import React from "react";
import InputBox from "../../InputBox/InputBox";
import DatePicker from "react-datepicker";
import "./DateTest.css";
import { useFormik } from "formik";

const DateTest = () => {
	const formik = useFormik({ initialValues: { fire: new Date(), text: "" } });
	console.log(formik.values.fire);

	return (
		<div className="DateTest">
			<DatePicker
				className="DateTest__datepicker"
				selected={formik.values.fire}
				onChange={(e) => {
					formik.setFieldValue("fire", e);
				}}
				dateFormat="MMMM dd, yyyy"
				id="fire"
			/>
			<InputBox
				label="Show Date"
				state={formik.values.fire}
				name="fire"
				setState={(e) => {
					formik.setFieldValue("fire", e);
				}}
				type="datepicker"
				formtype="formik"
				placeholder="Show Date"
			/>
			<InputBox
				label="Show Date"
				state={formik.text}
				name="text"
				setState={(e) => {
					console.log(e);
					formik.handleChange(e);
				}}
				formtype="formik"
				placeholder="Show Date"
			/>
		</div>
	);
};

export default DateTest;
