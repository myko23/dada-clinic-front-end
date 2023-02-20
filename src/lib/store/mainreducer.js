import { combineReducers } from "redux";
import routeReducer from "./reducers/routeReducer";
import selectedReducer from "./reducers/selectedReducer";
import userReducer from "./reducers/userReducer";

export default combineReducers({
	route: routeReducer,
	selected: selectedReducer,
	user: userReducer,
});
