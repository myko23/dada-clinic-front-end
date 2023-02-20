import _ from "lodash";
import { DateTime } from "luxon";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ConsultationCRUD from "../../components/ConsultationCRUD/ConsultationCRUD";
import Header from "../../components/Header/Header";
import InputBox from "../../components/InputBox/InputBox";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SelectInputBox from "../../components/SelectInputBox/SelectInputBox";
import Table from "../../components/Table/Table";
import User from "../../components/User/User";
import { useDeleteConsultationMutation } from "../../lib/api/consultationAPI";
import { useFetchQuery } from "../../lib/hooks/useFetchQuery";
import { useSelected } from "../../lib/hooks/useSelected";
import { consultationSortHeader } from "../../lib/schema/recordsSchema";
import { setStateConsultationID } from "../../lib/store/reducers/selectedReducer";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import { searchTable } from "../../lib/utils/searchTable";
import setTableConfigs from "../../lib/utils/setTableConfigs";
import "./ConsultationList.css";

const ConsultationList = () => {
	const [searchField, setSearchField] = useState("");
	const [dateSearch, setDateSearch] = useState(DateTime.now().toFormat("MM-dd-yyyy"));
	const [sortItem, setSortItem] = useState("");
	const [sortOrder, setSortOrder] = useState("desc");
	const { selectedPatient, selectedConsultation } = useSelected();
	const patientData = useFetchQuery(["patients"]);

	const [addConsultationModal, setAddConsultationModal] = useState(false);
	const [editConsultationModal, setEditConsultationModal] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const deleteConsultation = useDeleteConsultationMutation();

	const deleteConsultationButton = async () => {
		try {
			await deleteConsultation.mutateAsync(selectedConsultation._id);
		} catch (err) {
			console.error(err.message);
		}
	};

	const dispatch = useDispatch();
	const consultationData = useFetchQuery(["consultations"]);

	const mergedConsultationData = _.map(consultationData, (consult) => {
		const newPatient = _.find(patientData, (foo) => foo._id === consult.patient_id);
		const { firstname, lastname, middlename } = newPatient;
		return { ...consult, firstname, lastname, middlename };
	});

	const { tableData, tableHeaders, tableWidth } = setTableConfigs(
		_.filter(mergedConsultationData, (item) => item.dateofconsult === dateSearch),
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
		<div className="ConsultationList">
			<div className="ConsultationList__header-container">
				<Header header={"Consultation List"} />
				<User />
			</div>
			<div className="ConsultationList__search-container">
				<InputBox
					placeholder="Search..."
					className="ConsultationList__search"
					size="h6"
					state={searchField}
					setState={setSearchField}
					width="20rem"
				/>
				<InputBox
					label="Sorted Date"
					placeholder="Search..."
					className="ConsultationList__search"
					size="h6"
					state={dateSearch}
					setState={setDateSearch}
					type="datepicker"
					width="15rem"
				/>
				<SelectInputBox
					className="ConsultationList__search"
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
					className="ConsultationList__search"
					options={[
						{ label: "Ascending", value: "asc" },
						{ label: "Descending", value: "desc" },
					]}
					state={sortOrder}
					setState={setSortOrder}
				/>
			</div>
			<div className="ConsultationList__table-container">
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
			<div className="ConsultationList__button-container">
				<PrimaryButton
					title="View Consultation"
					className="ConsultationList__button"
					onClick={() => {
						setEditConsultationModal(true);
					}}
					disabled={selectedConsultation?.dateofconsult !== dateSearch}
				/>
				<PrimaryButton
					title="Add Consultation"
					className="ConsultationList__button"
					onClick={() => {
						setAddConsultationModal(true);
					}}
				/>
				<PrimaryButton
					title="Delete Consultation"
					className="ConsultationList__button"
					onClick={() => {
						setConfirmDelete(true);
					}}
					disabled={selectedConsultation?.dateofconsult !== dateSearch}
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

export default ConsultationList;
