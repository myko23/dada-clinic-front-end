import React from "react";
// import FormGroup from "../../components/Forms/FormGroup/FormGroup";
// import FormRow from "../../components/Forms/FormRow/FormRow";
// import FormSection from "../../components/Forms/FormSection/FormSection";
import Header from "../../components/Header/Header";
// import InputBox from "../../components/InputBox/InputBox";
import User from "../../components/User/User";
import "./UserSettings.css";

const UserSettings = () => {
	return (
		<div className="UserSettings">
			<div className="UserSettings__header-container">
				<Header header={"User Settings"} />
				<User />
			</div>
			<div className="UserSettings__form-container">
				Coming Soon
				{/* <FormGroup>
					<FormSection header="User Details">
						<FormRow>
							<InputBox
								placeholder="Title"
								label="Title"
								size="h5"
								name="title"
								width="20rem"
								className="UserSettings__input"
							/>
						</FormRow>
						<FormRow>
							<InputBox
								placeholder="First Name"
								label="First Name"
								size="h5"
								name="firstname"
								className="UserSettings__input"
							/>
							<InputBox
								placeholder="Last Name"
								label="Last Name"
								size="h5"
								name="lastname"
								className="UserSettings__input"
							/>
						</FormRow>
						<FormRow>
							<InputBox
								placeholder="Password"
								label="Password"
								size="h5"
								name="password"
								type="password"
								width="20rem"
								className="UserSettings__input"
							/>
						</FormRow>
					</FormSection>
				</FormGroup> */}
			</div>
		</div>
	);
};

export default UserSettings;
