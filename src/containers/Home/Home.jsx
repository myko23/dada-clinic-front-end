import { Health, HeartAdd, MoneyAdd, SearchZoomIn, Setting2 } from "iconsax-react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdmissionCRUD from "../../components/AdmissionCRUD/AdmissionCRUD";
import ConsultationCRUD from "../../components/ConsultationCRUD/ConsultationCRUD";
import Header from "../../components/Header/Header";
import MenuIconButton from "../../components/MenuIconButton/MenuIconButton";
import MenuPictureButton from "../../components/MenuPictureButton/MenuPictureButton";
import PatientCRUD from "../../components/PatientCRUD/PatientCRUD";
import User from "../../components/User/User";
import { setStateRoute } from "../../lib/store/reducers/routeReducer";
import "./Home.css";

const Home = () => {
	const dispatch = useDispatch();

	const [addConsultationModal, setAddConsultationModal] = useState(false);
	const [addPatientModal, setAddPatientModal] = useState(false);
	const [addAdmissionModal, setAddAdmissionModal] = useState(false);

	return (
		<div className="Home">
			<div className="Home__header-container">
				<Header header={"Dada Clinic"} />
				<User />
			</div>
			<div className="Home__items-container">
				<div className="Home__item-list-container">
					<div className="Home__item-list">
						<MenuPictureButton
							onClick={() => {
								setStateRoute(dispatch)("patients");
							}}
							header="Patients"
							subheader="View the patients list"
							picture="/Prescription Pad.webp"
						/>
					</div>
					<div className="Home__item-list">
						<MenuPictureButton
							header="Consultations"
							subheader="Check out the daily billing records"
							picture="/stetoscope.jpg"
							onClick={() => setStateRoute(dispatch)("consultationlists")}
						/>
					</div>
					<div className="Home__item-list">
						<MenuPictureButton
							header="Admissions"
							subheader="Adjust user settings and details"
							picture="/flatline.jpg"
							onClick={() => setStateRoute(dispatch)("admissionlists")}
						/>
					</div>
				</div>
				<div className="Home__item-row">
					<div className="Home__item">
						<MenuIconButton
							icon={<HeartAdd className="MenuIconButton__icon" />}
							header="Add New Patients"
							subheader="Add new Patient to records"
							onClick={() => {
								setAddPatientModal(true);
							}}
						/>
					</div>
					<div className="Home__item">
						<MenuIconButton
							icon={<SearchZoomIn className="MenuIconButton__icon" />}
							header="Check Up Patient"
							subheader="Add new consultation to patient"
							onClick={() => setAddConsultationModal(true)}
						/>
					</div>

					<div className="Home__item">
						<MenuIconButton
							icon={<Health className="MenuIconButton__icon" />}
							header="Admit Patient"
							subheader="Add new Admission to the records"
							onClick={() => setAddAdmissionModal(true)}
						/>
					</div>
				</div>
				<div className="Home__item-row Home__item-row--small">
					<div className="Home__item Home__item--small" onClick={() => setStateRoute(dispatch)("billings")}>
						<MenuIconButton
							variant="small"
							icon={<MoneyAdd className="MenuIconButton__icon" />}
							header="Billings"
							subheader="Check out the daily billing records"
						/>
					</div>
					<div className="Home__item Home__item--small">
						<MenuIconButton
							variant="small"
							icon={<Setting2 className="MenuIconButton__icon" />}
							header="User Settings"
							subheader="Adjust user settings and details."
						/>
					</div>
				</div>
			</div>
			<ConsultationCRUD addConsultObj={{ addConsultationModal, setAddConsultationModal }} />
			<PatientCRUD addPatientObj={{ addPatientModal, setAddPatientModal }} />
			<AdmissionCRUD addAdmitObj={{ addAdmissionModal, setAddAdmissionModal }} />
		</div>
	);
};

export default Home;
