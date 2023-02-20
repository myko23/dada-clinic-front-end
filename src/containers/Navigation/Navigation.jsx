import React from "react";
import "./Navigation.css";
import { getRouteState, resetRoute, setStateRoute } from "../../lib/store/reducers/routeReducer";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { resetUser } from "../../lib/store/reducers/userReducer";
import { resetSelected } from "../../lib/store/reducers/selectedReducer";
import { ArrowSquareLeft, Health, Home3, MoneyAdd, Profile2User, SearchZoomIn1, Setting2 } from "iconsax-react";
import cls from "classnames";
import _ from "lodash";

const Navigation = () => {
	const dispatch = useDispatch();
	const cookieFunction = useCookies();
	const { route } = useSelector(getRouteState);

	return (
		<div className="Navigation">
			<div className="Navigation__logo-container">
				<img className="Navigation__logo" src="/logo.png" alt="Logo" />
			</div>
			<div className="Navigation__menu-container">
				<div
					className={cls("Navigation__navitem", route === "home" && "Navigation__navitem--selected")}
					onClick={() => {
						setStateRoute(dispatch)("home");
					}}
				>
					<Home3 size="32" variant="Bold" className="Navigation__navitem-icon" />
					<h6 className="Navigation__navitem-text">Home</h6>
				</div>
				<div
					className={cls(
						"Navigation__navitem",
						_.includes(["patients", "consultations", "admissions", "general"], route) &&
							"Navigation__navitem--selected"
					)}
					onClick={() => {
						setStateRoute(dispatch)("patients");
					}}
				>
					<Profile2User size="32" variant="Bold" className="Navigation__navitem-icon" />
					<h6 className="Navigation__navitem-text">Patients</h6>
				</div>
				<div
					className={cls(
						"Navigation__navitem",
						route === "consultationlists" && "Navigation__navitem--selected"
					)}
					onClick={() => {
						setStateRoute(dispatch)("consultationlists");
					}}
				>
					<SearchZoomIn1 size="32" variant="Bold" className="Navigation__navitem-icon" />
					<h6 className="Navigation__navitem-text">Consultation</h6>
				</div>
				<div
					className={cls(
						"Navigation__navitem",
						route === "admissionlists" && "Navigation__navitem--selected"
					)}
					onClick={() => {
						setStateRoute(dispatch)("admissionlists");
					}}
				>
					<Health size="32" variant="Bold" className="Navigation__navitem-icon" />
					<h6 className="Navigation__navitem-text">Admission</h6>
				</div>
				<div
					className={cls("Navigation__navitem", route === "usersettings" && "Navigation__navitem--selected")}
					onClick={() => {
						setStateRoute(dispatch)("usersettings");
					}}
				>
					<Setting2 size="32" variant="Bold" className="Navigation__navitem-icon" />
					<h6 className="Navigation__navitem-text">Settings</h6>
				</div>
				<div
					className={cls("Navigation__navitem", route === "billings" && "Navigation__navitem--selected")}
					onClick={() => {
						setStateRoute(dispatch)("billings");
					}}
				>
					<MoneyAdd size="32" variant="Bold" className="Navigation__navitem-icon" />
					<h6 className="Navigation__navitem-text">Bilings</h6>
				</div>
			</div>
			<div className="Navigatin__logout-container">
				<ArrowSquareLeft
					className="Navigation__logout"
					onClick={() => {
						cookieFunction[2]("user");
						resetUser(dispatch);
						resetRoute(dispatch);
						resetSelected(dispatch);
					}}
				/>
			</div>
		</div>
	);
};

export default Navigation;
