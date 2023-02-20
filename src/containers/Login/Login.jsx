import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputBox from "../../components/InputBox/InputBox";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { loginApp } from "../../lib/store/reducers/routeReducer";
import { PropTypes } from "prop-types";
import "./Login.css";
import { setUser } from "../../lib/store/reducers/userReducer";
import { useLoginMutation } from "../../lib/api/userAPI";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import { useRef } from "react";

const Login = ({ databaseConnect }) => {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState(false);
	const passwordInput = useRef();
	const loginUser = useLoginMutation();
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie] = useCookies(["user"]);

	const formik = useFormik({
		initialValues: { email: "joseagerico@gmail.com", password: "password" },
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: Yup.object().shape({
			email: Yup.string().min(5, "Email must be valid").required("Email must not be empty"),
			password: Yup.string()
				.min(5, "Password must be at least 5 characters")
				.required("Password must not be empty"),
		}),

		onSubmit: async (values) => {
			if (databaseConnect) {
				try {
					const loginStatus = await loginUser.mutateAsync(values);

					setCookie("user", loginStatus.data);

					const decodedToken = jwtDecode(loginStatus.data);

					setErrorMessage(undefined);
					setUser(dispatch)(decodedToken);
					loginApp(dispatch)(true);
				} catch (err) {
					setErrorMessage("Email or Password is invalid");
					console.log(err.response.data);
				}
			} else {
				setErrorMessage("Database not connected");
			}
		},
	});

	return (
		<div className="Login">
			<div className="Login__container">
				<div className="Login__header-container">
					<div className="Login__logo"></div>
					<h4 className="Login__header bold">Sign In</h4>
				</div>
				<div className="Login__input-container">
					<InputBox
						className="Login__input"
						placeholder="email address"
						name="email"
						formtype="formik"
						state={formik.values.email}
						setState={formik.handleChange}
						errorMessage={formik.errors.email}
					/>
					<InputBox
						className="Login__input"
						placeholder="password"
						type="password"
						name="password"
						formtype="formik"
						state={formik.values.password}
						setState={formik.handleChange}
						errorMessage={formik.errors.password}
						refProp={passwordInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") formik.handleSubmit();
						}}
					/>
				</div>
				<div className="Login__button-container">
					{errorMessage && <h6 className="Login__error-message">{errorMessage}</h6>}
					<PrimaryButton
						className="Login__sign-in"
						onClick={() => {
							formik.handleSubmit();
						}}
						title="Sign In"
					/>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = { databaseConnect: PropTypes.any };

export default Login;
