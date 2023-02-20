import _ from "lodash";
import { useSelector } from "react-redux";
import { getSelectedState } from "../store/reducers/selectedReducer";
import { useFetchQuery } from "./useFetchQuery";

export const useSelectedRecords = () => {
	const { patientID } = useSelector(getSelectedState);
	const consultationData = useFetchQuery(["consultations"]);
	const admissionData = useFetchQuery(["admissions"]);

	const selectedConsultationRecords = _.filter(consultationData, (item) => item.patient_id === patientID);
	const selectedAdmissionRecords = _.filter(admissionData, (item) => item.patient_id === patientID);

	return {
		selectedConsultationRecords,
		selectedAdmissionRecords,
	};
};
