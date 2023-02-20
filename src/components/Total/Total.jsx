import React from "react";
import { PropTypes } from "prop-types";
import "./Total.css";

const Total = ({ total }) => {
	return (
		<div className="Total">
			<h5 className="Total__label">Total: </h5>
			<h4 className="Total__amount">{`Php ${total}`}</h4>
		</div>
	);
};
Total.propTypes = {
	total: PropTypes.string,
};

export default Total;
