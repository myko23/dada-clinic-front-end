import _ from "lodash";
import { useFetchQuery } from "./useFetchQuery";

export const useAdmittedPatientData = (active, admitted = true) => {
	const patientData = useFetchQuery(["patients"]);
	const admissionData = useFetchQuery(["admissions"]);

	if (admitted === "all") return { patientData };

	const admittedPatientsData = patientData?.filter((patient) => {
		const admissionRecords = admissionData?.filter((admission) => admission.patient_id === patient._id);

		let patientAdmitted = _.find(admissionRecords, (item) => !item.dateofdischarge);

		if (admitted === true) if (patientAdmitted) return patient;
		if (admitted === false) if (!patientAdmitted) return patient;
	});
	return { patientData: active ? admittedPatientsData : patientData };
};
