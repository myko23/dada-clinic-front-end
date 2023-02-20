import { DateTime } from "luxon";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AdmissionCRUD from "../../components/AdmissionCRUD/AdmissionCRUD";
import Header from "../../components/Header/Header";
import InputBox from "../../components/InputBox/InputBox";
import NavigationCardsContainer from "../../components/NavigationCardsContainer/NavigationCardsContainer";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SelectInputBox from "../../components/SelectInputBox/SelectInputBox";
import Table from "../../components/Table/Table";
import User from "../../components/User/User";
import { useDeleteAdmissionMutation } from "../../lib/api/admissionAPI";
import { useSelected } from "../../lib/hooks/useSelected";
import { useSelectedRecords } from "../../lib/hooks/useSelectedRecords";
import { consultationSortHeader } from "../../lib/schema/recordsSchema";
import { setStateAdmissionID } from "../../lib/store/reducers/selectedReducer";
import { searchTable } from "../../lib/utils/searchTable";
import setTableConfigs from "../../lib/utils/setTableConfigs";
import "./Admission.css";

const Admission = () => {
	const { selectedPatient, selectedAdmission, patientAdmitted } = useSelected();
	const { selectedAdmissionRecords } = useSelectedRecords();
	const [searchField, setSearchField] = useState("");
	const [addAdmissionModal, setAddAdmissionModal] = useState(false);
	const [editAdmissionModal, setEditAdmissionModal] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const deleteAdmission = useDeleteAdmissionMutation();
	const dispatch = useDispatch();

	const [sortItem, setSortItem] = useState("hello");
	const [sortOrder, setSortOrder] = useState("asc");

	const deleteAdmissionButton = async () => {
		try {
			await deleteAdmission.mutateAsync(selectedAdmission._id);
		} catch (err) {
			console.error(err.message);
		}
	};

	const { tableData, tableHeaders, tableWidth } = setTableConfigs(
		selectedAdmissionRecords,
		[
			{
				header: "Date of Admission",
				content: (item) => {
					return DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").toFormat("MMMM dd, yyyy");
				},
				width: 30,
			},
			{
				header: "Date of Discharge",
				content: (item) => {
					return item?.dateofdischarge
						? DateTime.fromFormat(item.dateofdischarge, "MM-dd-yyyy").toFormat("MMMM dd, yyyy")
						: "NA";
				},
				width: 30,
			},
			{
				header: "Remarks",
				content: (item) => {
					return item?.disposition ? `${item.disposition}` : "NA";
				},
				width: 40,
			},
		],
		{ defaultItem: "dateofconsult", sortItem, sortOrder }
	);

	return (
		<div className="Admission">
			<div className="Admission__header-container">
				<Header
					label="Patient"
					header={`${selectedPatient.firstname} ${selectedPatient.lastname}`}
					admitted={patientAdmitted ? true : false}
				/>
				<User />
			</div>
			<div className="Admission__navigation-container">
				<NavigationCardsContainer />
			</div>

			<div className="Admission__search-container">
				<InputBox
					placeholder="Search..."
					className="Admission__search"
					size="h5"
					width="34rem"
					state={searchField}
					setState={setSearchField}
					label="Search"
				/>
				<SelectInputBox label="Item" options={consultationSortHeader} state={sortItem} setState={setSortItem} />
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
			<div className="Admission__table-container">
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

			<div className="Admission__button-container">
				<PrimaryButton
					title="View Admission"
					className="Admission__add-button"
					onClick={() => {
						setEditAdmissionModal(true);
					}}
					disabled={selectedAdmission?.patient_id !== selectedPatient._id}
				/>
				<PrimaryButton
					title="Add Admission"
					className="Admission__add-button"
					onClick={() => {
						setAddAdmissionModal(true);
					}}
					disabled={patientAdmitted ? true : false}
				/>
				<PrimaryButton
					title="Delete Admission"
					className="Admission__add-button"
					onClick={() => {
						setConfirmDelete(true);
					}}
					disabled={selectedAdmission?.patient_id !== selectedPatient._id}
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

export default Admission;
