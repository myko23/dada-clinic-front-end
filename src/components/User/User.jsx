import React from "react";
import { useSelector } from "react-redux";
import { getUserState } from "../../lib/store/reducers/userReducer";
import "./User.css";

const User = () => {
	const userData = useSelector(getUserState);
	const renderUserTitle = () => {
		switch (userData.title) {
			case "Doctor":
				return "Dr.";
			default:
				return "";
		}
	};
	return (
		<div className="User">
			<img src={userData.imgurl} alt="user image" className="User__logo" />
			<h5 className="User__name">{`${renderUserTitle()} ${userData.firstname} ${userData.lastname}`}</h5>
		</div>
	);
};

export default User;
