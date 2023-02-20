import React, { useEffect, useState } from "react";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import FormGroup from "../Forms/FormGroup/FormGroup";
import FormRow from "../Forms/FormRow/FormRow";
import FormSection from "../Forms/FormSection/FormSection";
import InputBox from "../InputBox/InputBox";
import "./GeneralForm.css";
import cls from "classnames";
import { PropTypes } from "prop-types";
import { checkArray } from "../../lib/utils/checkArray";

const GeneralForm = ({ editFormat = false, formik, editArray }) => {
	const [age, setAge] = useState("");

	useEffect(() => {
		setAge(getDateDiff("now", formik.values.birthday) || "0");
	}, [formik.values.birthday]);

	return (
		<div className="GeneralForm">
			<FormGroup>
				<FormSection header="Basic Information">
					<FormRow>
						<InputBox
							placeholder="First Name"
							label="First Name"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("firstname", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.firstname}
							setState={formik.handleChange}
							name="firstname"
							errorMessage={formik.errors.firstname}
						/>
						<InputBox
							placeholder="Middle Name"
							label="Middle Name"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("middlename", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.middlename}
							setState={formik.handleChange}
							name="middlename"
							errorMessage={formik.errors.middlename}
						/>
						<InputBox
							placeholder="Last Name"
							label="Last Name"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("lastname", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.lastname}
							setState={formik.handleChange}
							name="lastname"
							errorMessage={formik.errors.lastname}
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Birthday"
							label="Birthday"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("birthday", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="15rem"
							formtype="formik"
							type="datepicker"
							state={formik.values.birthday}
							setState={formik.setFieldValue}
							name="birthday"
						/>
						<InputBox
							placeholder="Age"
							label="Age"
							size="h5"
							className="GeneralForm__input"
							width="4.5rem"
							state={age}
							disabled={true}
						/>
						<InputBox
							placeholder="Religion"
							label="Religion"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("religion", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="20rem"
							formtype="formik"
							state={formik.values.religion}
							setState={formik.handleChange}
							name="religion"
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Address"
							label="Address"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("address", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="100%"
							formtype="formik"
							state={formik.values.address}
							setState={formik.handleChange}
							name="address"
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Emergency Contact"
							label="Emergency Contact"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("guardian", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="20rem"
							formtype="formik"
							state={formik.values.guardian}
							setState={formik.handleChange}
							name="guardian"
						/>
						<InputBox
							placeholder="Relationship"
							label="Relationship"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("relationship", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="20rem"
							formtype="formik"
							state={formik.values.relationship}
							setState={formik.handleChange}
							name="relationship"
						/>
						<InputBox
							placeholder="Contact No."
							label="Contact No."
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("contactno", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="20rem"
							formtype="formik"
							state={formik.values.contactno}
							setState={formik.handleChange}
							name="contactno"
						/>
					</FormRow>
				</FormSection>
				<FormSection header="Medical History">
					<FormRow>
						<InputBox
							placeholder="Past History"
							label="Past History"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("past_history", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="100%"
							formtype="formik"
							state={formik.values.past_history}
							setState={formik.handleChange}
							name="past_history"
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Current Condition"
							label="Current Condition"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("current_condition", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="100%"
							formtype="formik"
							state={formik.values.current_condition}
							setState={formik.handleChange}
							name="current_condition"
						/>
					</FormRow>

					<FormRow>
						<InputBox
							placeholder="Allergies"
							label="Allergies"
							size="h5"
							className={cls(
								"GeneralForm__input",
								checkArray("allergies", editArray) && editFormat && "GeneralForm__input--edited"
							)}
							width="100%"
							formtype="formik"
							state={formik.values.allergies}
							setState={formik.handleChange}
							name="allergies"
						/>
					</FormRow>
				</FormSection>
			</FormGroup>
		</div>
	);
};

GeneralForm.propTypes = {
	editFormat: PropTypes.bool,
	formik: PropTypes.any,
	editArray: PropTypes.array,
};

export default GeneralForm;
