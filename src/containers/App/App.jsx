import React from "react";
import Login from "../Login/Login";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Main from "../Main/Main";
import { getRouteState, loginApp } from "../../lib/store/reducers/routeReducer";
import { useQuery } from "@tanstack/react-query";
import API from "../../lib/configs/axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { decodeToken } from "react-jwt";
import { setUser } from "../../lib/store/reducers/userReducer";

function App() {
	const [cookie] = useCookies();
	const dispatch = useDispatch();
	const { isSuccess } = useQuery(["patients"], async () => {
		const response = await API.get("/patients");
		return response.data;
	});
	useQuery(["consultations"], async () => {
		const response = await API.get("/consultations");
		return response.data;
	});
	useQuery(["admissions"], async () => {
		const response = await API.get("/admissions");
		return response.data;
	});

	useEffect(() => {
		if (cookie.user && isSuccess) {
			const User = decodeToken(cookie.user);
			setUser(dispatch)(User);
			loginApp(dispatch)(true);
		}
	}, [cookie.user, isSuccess]);

	const { login: loginState } = useSelector(getRouteState);
	return <div className="App">{!loginState ? <Login databaseConnect={isSuccess} /> : <Main />}</div>;
}

export default App;
