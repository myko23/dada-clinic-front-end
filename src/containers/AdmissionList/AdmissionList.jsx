import _ from "lodash";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdmissionCRUD from "../../components/AdmissionCRUD/AdmissionCRUD";
import Header from "../../components/Header/Header";
import InputBox from "../../components/InputBox/InputBox";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SelectInputBox from "../../components/SelectInputBox/SelectInputBox";
import Table from "../../components/Table/Table";
import User from "../../components/User/User";
import { useDeleteAdmissionMutation } from "../../lib/api/admissionAPI";
import { useFetchQuery } from "../../lib/hooks/useFetchQuery";
import { useSelected } from "../../lib/hooks/useSelected";
import { consultationSortHeader } from "../../lib/schema/recordsSchema";
import { setStateAdmissionID } from "../../lib/store/reducers/selectedReducer";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import { searchTable } from "../../lib/utils/searchTable";
import setTableConfigs from "../../lib/utils/setTableConfigs";
import "./AdmissionList.css";

const AdmissionList = () => {
	const [searchField, setSearchField] = useState("");
	const [sortItem, setSortItem] = useState("");
	const [sortOrder, setSortOrder] = useState("desc");
	const { selectedPatient, selectedAdmission } = useSelected();
	const patientData = useFetchQuery(["patients"]);

	const [addAdmissionModal, setAddAdmissionModal] = useState(false);
	const [editAdmissionModal, setEditAdmissionModal] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const deleteAdmission = useDeleteAdmissionMutation();
	const dispatch = useDispatch();
	const admissionData = useFetchQuery(["admissions"]);

	const deleteAdmissionButton = async () => {
		try {
			await deleteAdmission.mutateAsync(selectedAdmission._id);
		} catch (err) {
			console.error(err.message);
		}
	};

	const newAdmissionsData = _.filter(admissionData, (foo) => !foo?.dateofdischarge);

	const mergedAdmissionData = _.map(newAdmissionsData, (admission) => {
		const newPatient = _.find(patientData, (foo) => foo._id === admission.patient_id);
		const { firstname, lastname, middlename } = newPatient;
		return { ...admission, firstname, lastname, middlename };
	});

	const checkSelectedAdmission = () => {
		const checkAdmission = _.find(newAdmissionsData, (foo) => foo._id === selectedAdmission?._id);
		if (!checkAdmission) return true;
		else return false;
	};

	const { tableData, tableHeaders, tableWidth } = setTableConfigs(
		mergedAdmissionData,
		[
			{
				header: "Patient",
				content: (item) => {
					const newPatient = _.find(patientData, (foo) => foo._id === item.patient_id);

					return `${newPatient.lastname}, ${newPatient.firstname}`;
				},
				width: 30,
			},
			{
				header: "Age",
				content: (item) => {
					return `${getDateDiff(item.dateofconsult, selectedPatient.birthday, "years")}`;
				},
				width: 5,
			},
			{
				header: "Assessment",
				content: (item) => {
					return item.assessment;
				},
				width: 25,
			},
			{
				header: "Chief Complaint",
				content: (item) => {
					return item.chiefcomplaint;
				},
				width: 25,
			},

			{
				header: "HMO",
				content: (item) => {
					return item.hmo;
				},
				width: 15,
			},
			{
				header: "BILL",
				content: (item) => {
					return `P ${item.bill}`;
				},
				width: 10,
			},
		],
		{ defaultItem: "dateofconsult", sortItem, sortOrder }
	);
	return (
		<div className="AdmissionList">
			<div className="AdmissionList__header-container">
				<Header header={"Admission Lists"} />
				<User />
			</div>
			<div className="AdmissionList__search-container">
				<InputBox
					placeholder="Search..."
					className="AdmissionList__search"
					size="h6"
					state={searchField}
					setState={setSearchField}
					width="20rem"
				/>
				<SelectInputBox
					className="AdmissionList__search"
					label="Item"
					options={[
						{
							label: "First Name",
							value: "firstname",
						},
						{
							label: "Middle Name",
							value: "middlename",
						},
						{
							label: "Last Name",
							value: "lastname",
						},
						...consultationSortHeader,
					]}
					state={sortItem}
					setState={setSortItem}
				/>
				<SelectInputBox
					label="Order"
					className="AdmissionList__search"
					options={[
						{ label: "Ascending", value: "asc" },
						{ label: "Descending", value: "desc" },
					]}
					state={sortOrder}
					setState={setSortOrder}
				/>
			</div>
			<div className="AdmissionList__table-container">
				<Table
					data={searchTable(tableData, searchField)}
					dataHeaders={tableHeaders}
					dataWidth={tableWidth}
					rowSelected={selectedAdmission?._id}
					rowClick={(item) => {
						setStateAdmissionID(dispatch)(item._id);
					}}
					rowDoubleClick={() => {
						setEditAdmissionModal(true);
					}}
					emptyTableString="No Admission Records"
				/>
			</div>
			<div className="AdmissionList__button-container">
				<PrimaryButton
					title="View Admission"
					className="AdmissionList__button"
					onClick={() => {
						setEditAdmissionModal(true);
					}}
					disabled={checkSelectedAdmission()}
				/>
				<PrimaryButton
					title="Add Admission"
					className="AdmissionList__button"
					onClick={() => {
						setAddAdmissionModal(true);
					}}
				/>
				<PrimaryButton
					title="Delete Admission"
					className="AdmissionList__button"
					onClick={() => {
						setConfirmDelete(true);
					}}
					disabled={checkSelectedAdmission()}
				/>
			</div>
			<AdmissionCRUD
				deleteAdmissionButton={deleteAdmissionButton}
				addAdmitObj={{ addAdmissionModal, setAddAdmissionModal }}
				editAdmitObj={{ editAdmissionModal, setEditAdmissionModal }}
				deleteAdmitObj={{ confirmDelete, setConfirmDelete }}
			/>
		</div>
	);
};

export default AdmissionList;
