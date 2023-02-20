import React, { useEffect, useState } from "react";
import FormGroup from "../Forms/FormGroup/FormGroup";
import FormRow from "../Forms/FormRow/FormRow";
import FormSection from "../Forms/FormSection/FormSection";
import InputBox from "../InputBox/InputBox";
import "./AdmissionForm.css";
import { PropTypes } from "prop-types";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import cls from "classnames";
import { checkArray } from "../../lib/utils/checkArray";
import { DateTime } from "luxon";
import { useSelected } from "../../lib/hooks/useSelected";
import CheckBox from "../CheckBox/CheckBox";
import { useHMO } from "../../lib/hooks/useHMO";

const AdmissionForm = ({ formik, editFormat = false, editArray }) => {
	const [duration, setDuration] = useState("");
	const { selectedPatient } = useSelected();
	const [age, setAge] = useState("");
	const { selectedAdmission } = useSelected();
	const [newHMO, setNewHMO] = useState(false);
	const { hmoOptions, hmoData } = useHMO();

	useEffect(() => {
		setAge(getDateDiff(formik.values.dateofconsult, selectedPatient.birthday) || "0");
		if (formik.values.dateofdischarge)
			setDuration(getDateDiff(formik.values.dateofdischarge, formik.values.dateofconsult, "days") || "0");
	}, [formik.values.dateofconsult, formik.values.dateofdischarge]);

	return (
		<div className="AdmissionForm">
			<FormGroup>
				<FormSection header="Admission Details">
					<FormRow>
						<InputBox
							placeholder="Date of Admission"
							label="Date of Admission"
							size="h5"
							name="dateofconsult"
							width="28rem"
							className={cls(
								"AdmissionForm__input",
								checkArray("dateofconsult", editArray) && editFormat && "AdmissionForm__input--edited"
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
							className="AdmissionForm__input"
							disabled={true}
							state={age}
							setState={setAge}
						/>
						<CheckBox
							active={formik.values.dateofdischarge ? true : false}
							className="AdmissionForm__check-box"
							onClick={() => {
								formik.setFieldValue(
									"dateofdischarge",
									formik.values.dateofdischarge
										? ""
										: selectedAdmission.dateofdischarge || DateTime.now().toFormat("MM-dd-yyyy")
								);
							}}
							item="Discharge?"
						/>
					</FormRow>
					{formik.values.dateofdischarge && (
						<FormRow>
							<InputBox
								placeholder="Date of Discharge"
								label="Date of Discharge"
								size="h5"
								name="dateofdischarge"
								width="28rem"
								className={cls(
									"AdmissionForm__input",
									checkArray("dateofdischarge", editArray) &&
										editFormat &&
										"AdmissionForm__input--edited"
								)}
								formtype="formik"
								state={formik.values.dateofdischarge}
								type="datepicker"
								setState={formik.setFieldValue}
							/>
							<InputBox
								placeholder="Duration"
								label="Duration"
								size="h5"
								name="duration"
								width="10rem"
								className="AdmissionForm__input"
								disabled={true}
								state={`${duration} days`}
								setState={setDuration}
							/>
						</FormRow>
					)}
					<FormRow>
						<FormRow>
							<InputBox
								placeholder="Disposition"
								label="Disposition"
								size="h5"
								name="disposition"
								className={cls(
									"AdmissionForm__input",
									checkArray("disposition", editArray) && editFormat && "AdmissionForm__input--edited"
								)}
								width="25rem"
								formtype="formik"
								state={formik.values.disposition}
								setState={formik.handleChange}
							/>
						</FormRow>
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
								"AdmissionForm__input",
								checkArray("chiefcomplaint", editArray) && editFormat && "AdmissionForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.chiefcomplaint}
							setState={formik.handleChange}
							errorMessage={formik.errors.chiefcomplaint}
						/>
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Plan"
							label="Plan"
							size="h5"
							name="plan"
							className={cls(
								"AdmissionForm__input",
								checkArray("plan", editArray) && editFormat && "AdmissionForm__input--edited"
							)}
							formtype="formik"
							state={formik.values.plan}
							setState={formik.handleChange}
							type="textarea"
							rows="4"
						/>
					</FormRow>
					<FormRow>
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
					</FormRow>
					<FormRow>
						<InputBox
							placeholder="Assessment"
							label="Assessment"
							size="h5"
							name="assessment"
							className={cls(
								"AdmissionForm__input",
								checkArray("assessment", editArray) && editFormat && "AdmissionForm__input--edited"
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
									"AdmissionForm__input",
									checkArray("hmo", editArray) && editFormat && "AdmissionForm__input--edited"
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
									"AdmissionForm__input",
									checkArray("hmo", editArray) && editFormat && "AdmissionForm__input--edited"
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
							className={"AdmissionForm__hmo-select"}
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
AdmissionForm.propTypes = {
	formik: PropTypes.object,
	editFormat: PropTypes.bool,
	editArray: PropTypes.array,
};

export default AdmissionForm;
