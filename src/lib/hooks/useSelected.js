import _ from "lodash";
import { useSelector } from "react-redux";
import { getSelectedState } from "../store/reducers/selectedReducer";
import { useFetchQuery } from "./useFetchQuery";
import { useSelectedRecords } from "./useSelectedRecords";

export const useSelected = () => {
	const { patientID, consultationID, admissionID } = useSelector(getSelectedState);
	const patientData = useFetchQuery(["patients"]);
	const consultationData = useFetchQuery(["consultations"]);
	const admissionData = useFetchQuery(["admissions"]);

	const { selectedAdmissionRecords } = useSelectedRecords();

	const selectedPatient = _.find(patientData, (item) => item._id === patientID);
	const selectedConsultation = _.find(consultationData, (item) => item._id === consultationID);
	const selectedAdmission = _.find(admissionData, (item) => item._id === admissionID);

	let patientAdmitted = _.find(selectedAdmissionRecords, (item) => !item.dateofdischarge);

	return { selectedPatient, selectedConsultation, selectedAdmission, patientAdmitted };
};
