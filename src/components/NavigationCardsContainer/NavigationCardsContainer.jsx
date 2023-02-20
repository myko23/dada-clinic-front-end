import { Health, Profile2User, SearchZoomIn1 } from "iconsax-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRouteState, setStateRoute } from "../../lib/store/reducers/routeReducer";
import NavigationCard from "../NavigationCard/NavigationCard";
import "./NavigationCardsContainer.css";

const NavigationCardsContainer = () => {
	const { route } = useSelector(getRouteState);
	const dispatch = useDispatch();
	return (
		<div className="NavigationCardsContainer">
			<NavigationCard
				title="General"
				icon={<Profile2User size="32" variant="Bold" className="NavigationCard__icon" />}
				active={route === "general"}
				onClick={() => {
					setStateRoute(dispatch)("general");
				}}
			/>
			<NavigationCard
				title="Consultations"
				icon={<SearchZoomIn1 size="32" variant="Bold" className="NavigationCard__icon" />}
				active={route === "consultations"}
				onClick={() => {
					setStateRoute(dispatch)("consultations");
				}}
			/>
			<NavigationCard
				title="Admissions"
				icon={<Health size="32" variant="Bold" className="NavigationCard__icon" />}
				active={route === "admissions"}
				onClick={() => {
					setStateRoute(dispatch)("admissions");
				}}
			/>
		</div>
	);
};

export default NavigationCardsContainer;
