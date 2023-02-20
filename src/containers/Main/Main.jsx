import React from "react";
import { useSelector } from "react-redux";
import { getRouteState } from "../../lib/store/reducers/routeReducer";
import Admission from "../Admission/Admission";
import AdmissionList from "../AdmissionList/AdmissionList";
import Billings from "../Billings/Billings";
import Consultation from "../Consultation/Consultation";
import ConsultationList from "../ConsultationList/ConsultationList";
import General from "../General/General";
import Home from "../Home/Home";
import Navigation from "../Navigation/Navigation";
import Patients from "../Patients/Patients";
import UserSettings from "../UserSettings/UserSettings";
import "./Main.css";

const Main = () => {
	const { route } = useSelector(getRouteState);

	const renderRoute = () => {
		switch (route) {
			case "home":
				return <Home />;
			case "patients":
				return <Patients />;
			case "general":
				return <General />;
			case "consultations":
				return <Consultation />;
			case "admissions":
				return <Admission />;
			case "consultationlists":
				return <ConsultationList />;
			case "admissionlists":
				return <AdmissionList />;
			case "billings":
				return <Billings />;
			case "usersettings":
				return <UserSettings />;
			default:
				return <Patients />;
		}
	};

	return (
		<div className="Main">
			<Navigation />
			{renderRoute()}
		</div>
	);
};

export default Main;
