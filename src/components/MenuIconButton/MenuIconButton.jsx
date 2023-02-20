import { MagicStar } from "iconsax-react";
import React from "react";
import { PropTypes } from "prop-types";
import "./MenuIconButton.css";
import cls from "classnames";

const MenuIconButton = ({
	header = "Header",
	subheader = "this is a subheader",
	onClick = () => {},
	icon,
	variant = "fill",
}) => {
	return (
		<div className={cls("MenuIconButton", variant === "small" && "MenuIconButton--small")} onClick={onClick}>
			{icon ? icon : <MagicStar className="MenuIconButton__icon" />}
			<div className="MenuIconButton__text-container">
				<h4 className="MenuIconButton__header">{header}</h4>
				<h6 className="MenuIconButton__subheader">{subheader}</h6>
			</div>
		</div>
	);
};
MenuIconButton.propTypes = {
	header: PropTypes.string,
	subheader: PropTypes.string,
	onClick: PropTypes.func,
	icon: PropTypes.any,
	variant: PropTypes.string,
};

export default MenuIconButton;
