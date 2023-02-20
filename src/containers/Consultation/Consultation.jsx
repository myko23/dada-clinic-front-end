import { DateTime } from "luxon";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ConsultationCRUD from "../../components/ConsultationCRUD/ConsultationCRUD";
import Header from "../../components/Header/Header";
import InputBox from "../../components/InputBox/InputBox";
import NavigationCardsContainer from "../../components/NavigationCardsContainer/NavigationCardsContainer";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SelectInputBox from "../../components/SelectInputBox/SelectInputBox";
import Table from "../../components/Table/Table";
import User from "../../components/User/User";
import { useDeleteConsultationMutation } from "../../lib/api/consultationAPI";
import { useSelected } from "../../lib/hooks/useSelected";
import { useSelectedRecords } from "../../lib/hooks/useSelectedRecords";
import { consultationSortHeader } from "../../lib/schema/recordsSchema";
import { setStateConsultationID } from "../../lib/store/reducers/selectedReducer";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import { searchTable } from "../../lib/utils/searchTable";
import setTableConfigs from "../../lib/utils/setTableConfigs";
import "./Consultation.css";

const Consultation = () => {
	const { selectedPatient, selectedConsultation, patientAdmitted } = useSelected();
	const { selectedConsultationRecords } = useSelectedRecords();
	const [searchField, setSearchField] = useState("");

	const [addConsultationModal, setAddConsultationModal] = useState(false);
	const [editConsultationModal, setEditConsultationModal] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const deleteConsultation = useDeleteConsultationMutation();

	const [sortItem, setSortItem] = useState("hello");
	const [sortOrder, setSortOrder] = useState("asc");

	const dispatch = useDispatch();

	const deleteConsultationButton = async () => {
		try {
			await deleteConsultation.mutateAsync(selectedConsultation._id);
		} catch (err) {
			console.error(err.message);
		}
	};

	const { tableData, tableHeaders, tableWidth } = setTableConfigs(
		selectedConsultationRecords,
		[
			{
				header: "Date of Consultation",
				content: (item) => {
					return DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").toFormat("MMMM dd, yyyy");
				},
				width: 30,
			},
			{
				header: "Age",
				content: (item) => {
					return `${getDateDiff(item.dateofconsult, selectedPatient.birthday, "years")} years`;
				},
				width: 15,
			},
			{
				header: "Chief Complaint",
				content: (item) => {
					return item.chiefcomplaint;
				},
				width: 25,
			},
			{
				header: "Assessment",
				content: (item) => {
					return item.assessment || "NA";
				},
				width: 30,
			},
		],
		{ defaultItem: "dateofconsult", sortItem, sortOrder }
	);

	return (
		<div className="Consultation">
			<div className="Consultation__header-container">
				<Header
					label="Patient"
					header={`${selectedPatient.firstname} ${selectedPatient.lastname}`}
					admitted={patientAdmitted ? true : false}
				/>
				<User />
			</div>
			<div className="Consultation__navigation-container">
				<NavigationCardsContainer />
			</div>

			<div className="Consultation__search-container">
				<InputBox
					placeholder="Search..."
					className="Consultation__search"
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
			<div className="Consultation__table-container">
				<Table
					data={searchTable(tableData, searchField)}
					dataHeaders={tableHeaders}
					dataWidth={tableWidth}
					rowSelected={selectedConsultation?._id}
					rowClick={(item) => {
						setStateConsultationID(dispatch)(item._id);
					}}
					rowDoubleClick={() => {
						setEditConsultationModal(true);
					}}
					emptyTableString="No Consultation Records"
				/>
			</div>

			<div className="Consultation__button-container">
				<PrimaryButton
					title="View Consultation"
					className="Consultation__add-button"
					onClick={() => {
						setEditConsultationModal(true);
					}}
					disabled={selectedConsultation?.patient_id !== selectedPatient._id}
				/>
				<PrimaryButton
					title="Add Consultation"
					className="Consultation__add-button"
					onClick={() => {
						setAddConsultationModal(true);
					}}
				/>
				<PrimaryButton
					title="Delete Consultation"
					className="Consultation__add-button"
					onClick={() => {
						setConfirmDelete(true);
					}}
					disabled={selectedConsultation?.patient_id !== selectedPatient._id}
				/>
			</div>
			<ConsultationCRUD
				deleteConsultationButton={deleteConsultationButton}
				addConsultObj={{ addConsultationModal, setAddConsultationModal }}
				editConsultObj={{ editConsultationModal, setEditConsultationModal }}
				deleteConsultObj={{ confirmDelete, setConfirmDelete }}
			/>
		</div>
	);
};

export default Consultation;
