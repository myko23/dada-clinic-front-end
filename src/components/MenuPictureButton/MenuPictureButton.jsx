import React from "react";
import { PropTypes } from "prop-types";
import "./MenuPictureButton.css";

const MenuPictureButton = ({ header = "Header", subheader = "This is the subheader", picture, onClick = () => {} }) => {
	return (
		<div className="MenuPictureButton" onClick={onClick}>
			<div className="MenuPictureButton__text-container">
				<h4 className="MenuPictureButton__header">{header}</h4>
				<h6 className="MenuPictureButton__subheader">{subheader}</h6>
			</div>
			<img
				className="MenuPictureButton__img"
				src={picture ? picture : "/Default Image.jpg"}
				alt="This is the image"
			/>
		</div>
	);
};
MenuPictureButton.propTypes = {
	header: PropTypes.string,
	subheader: PropTypes.string,
	picture: PropTypes.string,
	onClick: PropTypes.func,
};

export default MenuPictureButton;
