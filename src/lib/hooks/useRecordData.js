import _ from "lodash";
import { useFetchQuery } from "./useFetchQuery";

export const useRecordData = () => {
	const consultationData = useFetchQuery(["consultations"]);
	const admissionData = useFetchQuery(["admissions"]);

	const recordsData = _.merge(consultationData, admissionData);
	return recordsData;
};
