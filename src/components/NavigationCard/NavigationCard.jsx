import React from "react";
import "./NavigationCard.css";
import { PropTypes } from "prop-types";
import { faEarDeaf } from "@fortawesome/free-solid-svg-icons";
import cls from "classnames";

const NavigationCard = ({ title, icon = faEarDeaf, active = false, onClick = () => {} }) => {
	return (
		<div className={cls("NavigationCard", active && "NavigationCard--active")} onClick={onClick}>
			{icon}
			<h6 className="NavigationCard__title">{title}</h6>
		</div>
	);
};
NavigationCard.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.any,
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default NavigationCard;
