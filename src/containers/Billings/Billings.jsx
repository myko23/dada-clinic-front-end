import React from "react";
import Header from "../../components/Header/Header";
import User from "../../components/User/User";
import "./Billings.css";
import BillingsDay from "../BillingsDay/BillingsDay";
import NavigationCard from "../../components/NavigationCard/NavigationCard";
import { useState } from "react";
import BillingsMonth from "../BillingsMonth/BillingsMonth";
import { Calendar, Calendar1 } from "iconsax-react";

const Billings = () => {
	const [route, setRoute] = useState("day");

	const renderBillings = () => {
		switch (route) {
			case "day":
				return <BillingsDay />;
			case "month":
				return <BillingsMonth />;
			default:
				return <BillingsDay />;
		}
	};
	return (
		<div className="Billings">
			<div className="Billings__header-container">
				<Header header={"Billings"} />
				<User />
			</div>
			<div className="Billings__navigation-container">
				<NavigationCard
					title="Day"
					icon={<Calendar1 size="32" variant="Bold" className="NavigationCard__icon" />}
					active={route === "day"}
					onClick={() => {
						setRoute("day");
					}}
				/>
				<NavigationCard
					title="Month"
					icon={<Calendar size="32" variant="Bold" className="NavigationCard__icon" />}
					active={route === "month"}
					onClick={() => {
						setRoute("month");
					}}
				/>
			</div>
			{renderBillings()}
		</div>
	);
};

export default Billings;
