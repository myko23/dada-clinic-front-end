import { DateTime } from "luxon";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CheckBox from "../../components/CheckBox/CheckBox";
import Header from "../../components/Header/Header";
import InputBox from "../../components/InputBox/InputBox";
import PatientCRUD from "../../components/PatientCRUD/PatientCRUD";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SelectInputBox from "../../components/SelectInputBox/SelectInputBox";
import Table from "../../components/Table/Table";
import User from "../../components/User/User";
import { useDeletePatientMutation } from "../../lib/api/patientsAPI";
import { useAdmittedPatientData } from "../../lib/hooks/useAdmittedPatientsData";
import { useSelected } from "../../lib/hooks/useSelected";
import { patientSortHeader } from "../../lib/schema/patientSchema";
import { setStateRoute } from "../../lib/store/reducers/routeReducer";
import { setStatePatientID } from "../../lib/store/reducers/selectedReducer";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import { searchTable } from "../../lib/utils/searchTable";
import setTableConfigs from "../../lib/utils/setTableConfigs";
import "./Patients.css";

const Patients = () => {
	const [checkboxActive, setCheckboxActive] = useState(false);
	const [addPatientModal, setAddPatientModal] = useState(false);
	const [searchField, setSearchField] = useState("");
	const [confirmDelete, setConfirmDelete] = useState(false);

	const [sortItem, setSortItem] = useState("hello");
	const [sortOrder, setSortOrder] = useState("asc");

	const { selectedPatient } = useSelected();
	const { patientData } = useAdmittedPatientData(checkboxActive);
	const deletePatient = useDeletePatientMutation();

	const dispatch = useDispatch();

	const deletePatientButton = async () => {
		try {
			await deletePatient.mutateAsync(selectedPatient._id);
		} catch (err) {
			console.error(err.message);
		}
	};

	const { tableData, tableHeaders, tableWidth } = setTableConfigs(
		patientData,
		[
			{
				header: "Name",
				content: (item) => {
					return `${item.firstname} ${item.lastname}`;
				},
				width: 40,
			},
			{
				header: "Birthday",
				content: (item) => DateTime.fromFormat(item.birthday, "MM-dd-yyyy").toFormat("MMMM dd, yyyy"),
				width: 20,
			},
			{ header: "Age", content: (item) => `${getDateDiff("now", item.birthday, "years")} Years`, width: 20 },
		],
		{ defaultItem: "datecreated", sortItem, sortOrder }
	);

	return (
		<div className="Patients">
			<div className="Patients__header-container">
				<Header header="Patients" />
				<User />
			</div>
			<div className="Patients__search-container">
				<InputBox
					placeholder="Search..."
					className="Patients__search"
					size="h5"
					state={searchField}
					setState={setSearchField}
					width="34rem"
				/>
				<CheckBox
					active={checkboxActive}
					onClick={() => {
						setCheckboxActive(!checkboxActive);
					}}
					item="Admitted Patients"
					className="Patients__admitted"
				/>
			</div>
			<div className="Patients__sort-container">
				<SelectInputBox label="Item" options={patientSortHeader} state={sortItem} setState={setSortItem} />
				<SelectInputBox
					label="Order"
					options={[
						{ label: "Ascending", value: "asc" },
						{ label: "Descending", value: "desc" },
					]}
					state={sortOrder}
					setState={setSortOrder}
				/>
			</div>
			<div className="Patients__table-container">
				<Table
					data={searchTable(tableData, searchField)}
					dataHeaders={tableHeaders}
					dataWidth={tableWidth}
					rowSelected={selectedPatient?._id}
					rowClick={(item) => {
						setStatePatientID(dispatch)(item._id);
					}}
					rowDoubleClick={() => {
						setStateRoute(dispatch)("general");
					}}
					emptyTableString="No Patient Records"
				/>
			</div>
			<div className="Patients__button-container">
				<PrimaryButton
					title="View Patient"
					className="Patients__button"
					onClick={() => {
						setStateRoute(dispatch)("general");
					}}
				/>
				<PrimaryButton
					title="Add Patient"
					className="Patients__button"
					onClick={() => {
						setAddPatientModal(true);
					}}
				/>
				<PrimaryButton
					title="Delete Patient"
					className="Patients__button"
					onClick={() => {
						setConfirmDelete(true);
					}}
				/>
			</div>
			<PatientCRUD
				deletePatientButton={deletePatientButton}
				addPatientObj={{ addPatientModal, setAddPatientModal }}
				deletePatientObj={{ confirmDelete, setConfirmDelete }}
			/>
		</div>
	);
};

export default Patients;
