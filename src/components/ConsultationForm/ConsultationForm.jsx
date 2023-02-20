import React, { useEffect, useState } from "react";
import FormGroup from "../Forms/FormGroup/FormGroup";
import FormRow from "../Forms/FormRow/FormRow";
import FormSection from "../Forms/FormSection/FormSection";
import InputBox from "../InputBox/InputBox";
import "./ConsultationForm.css";
import { PropTypes } from "prop-types";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import cls from "classnames";
import { checkArray } from "../../lib/utils/checkArray";
import { useSelected } from "../../lib/hooks/useSelected";
import { useHMO } from "../../lib/hooks/useHMO";
import CheckBox from "../CheckBox/CheckBox";

const ConsultationForm = ({ formik, editFormat = false, editArray }) => {
	const [age, setAge] = useState("");
	const { selectedPatient } = useSelected();
	const { hmoOptions, hmoData } = useHMO();
	const [newHMO, setNewHMO] = useState(false);

	useEffect(() => {
		setAge(getDateDiff(formik.values.dateofconsult, selectedPatient.birthday) || "0");
	}, [formik.values.dateofconsult]);
	return (
		<div className="ConsultationForm">
			<FormGroup>
				<FormSection header="Consultation Details">
					<FormRow>
						<InputBox
							placeholder="Date of Consult"
							label="Date of Consult"
							size="h5"
							name="dateofconsult"
							width="28rem"
							className={cls(
								"ConsultationForm__input",
								checkArray("dateofconsult", editArray) &&
									editFormat &&
									"ConsultationForm__input--edited"
							)}
							type="datepicker"
							formtype="formik"
							state={formik.values.dateofconsult}
							setState={formik.setFieldValue}
						/>
						<InputBox
							placeholder="Age"
							label="Age"
							size="h5"
							name="age"
							width="4.5rem"
							className="ConsultationForm__input"
							disabled={true}
							state={age}
							setState={setAge}
						/>
					</FormRow>
				</FormSection>
				<FormSection header="Medical Data">
					<FormRow>
						<InputBox
							placeholder="Chief Complaint"
							label="Chief Complaint"
							size="h5"
							name="chiefcomplaint"
							className={cls(
								"ConsultationForm__input",
								checkArray("chiefcomplaint", editArray) &&
									editFormat &&
									"ConsultationForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.chiefcomplaint}
							setState={formik.handleChange}
							errorMessage={formik.errors.chiefcomplaint}
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Subjective"
							label="Subjective"
							size="h5"
							name="subjective"
							className={cls(
								"ConsultationForm__input",
								checkArray("subjective", editArray) && editFormat && "ConsultationForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.subjective}
							setState={formik.handleChange}
							type="textarea"
							rows="4"
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Objective"
							label="Objective"
							size="h5"
							name="objective"
							className={cls(
								"ConsultationForm__input",
								checkArray("objective", editArray) && editFormat && "ConsultationForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.objective}
							setState={formik.handleChange}
							type="textarea"
							rows="4"
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Plan"
							label="Plan"
							size="h5"
							name="plan"
							className={cls(
								"ConsultationForm__input",
								checkArray("plan", editArray) && editFormat && "ConsultationForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.plan}
							setState={formik.handleChange}
							type="textarea"
							rows="4"
						/>
					</FormRow>
					<InputBox
						placeholder="Labs"
						label="Labs"
						size="h5"
						name="labs"
						className={cls(
							"AdmissionForm__input",
							checkArray("labs", editArray) && editFormat && "AdmissionForm__input--edited"
						)}
						formtype="formik"
						state={formik.values.labs}
						setState={formik.handleChange}
						errorMessage={formik.errors.labs}
						type="textarea"
						rows="4"
					/>
					<FormRow>
						<InputBox
							placeholder="Assessment"
							label="Assessment"
							size="h5"
							name="assessment"
							className={cls(
								"ConsultationForm__input",
								checkArray("assessment", editArray) && editFormat && "ConsultationForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.assessment}
							setState={formik.handleChange}
							errorMessage={formik.errors.assessment}
						/>
					</FormRow>
				</FormSection>
				<FormSection header="Billing Data">
					<FormRow>
						{!newHMO ? (
							<InputBox
								placeholder="HMO"
								label="HMO"
								size="h5"
								name="hmo"
								width="30rem"
								type="select"
								options={hmoOptions}
								className={cls(
									"ConsultationForm__input",
									checkArray("hmo", editArray) && editFormat && "ConsultationForm__input--edited"
								)}
								formtype="formik"
								state={formik.values.hmo}
								setState={formik.handleChange}
							/>
						) : (
							<InputBox
								placeholder="HMO"
								label="HMO"
								size="h5"
								name="hmo"
								width="30rem"
								className={cls(
									"ConsultationForm__input",
									checkArray("hmo", editArray) && editFormat && "ConsultationForm__input--edited"
								)}
								formtype="formik"
								state={formik.values.hmo}
								setState={formik.handleChange}
								errorMessage={formik.errors.hmo}
							/>
						)}
						<CheckBox
							active={newHMO}
							item="New HMO"
							className={"ConsultationForm__hmo-select"}
							onClick={() => {
								setNewHMO(!newHMO);

								if (newHMO) formik.setFieldValue("hmo", hmoData[0]);
								else formik.setFieldValue("hmo", "");
							}}
						/>

						<InputBox
							placeholder="Bill"
							label="Bill"
							size="h5"
							name="bill"
							type="number"
							width="20rem"
							className={cls(
								"ConsultationForm__input",
								checkArray("bill", editArray) && editFormat && "ConsultationForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.bill}
							setState={formik.handleChange}
						/>
					</FormRow>
				</FormSection>
			</FormGroup>
		</div>
	);
};
ConsultationForm.propTypes = {
	formik: PropTypes.object,
	editFormat: PropTypes.bool,
	editArray: PropTypes.array,
};

export default ConsultationForm;
