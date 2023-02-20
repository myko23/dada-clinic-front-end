import React from "react";
import "./TableOptions.css";
import { PropTypes } from "prop-types";

const TableOptions = ({ options, onClose = () => {} }) => {
	return (
		<div className="TableOptions">
			<>
				{options.options.map((item, index) => {
					return (
						<div
							key={index}
							className="TableOptions__options"
							onClick={() => item.configs({ item: options.item, onClose: onClose })}
						>
							<h5 className="TableOptions__select-box">{item.title}</h5>
						</div>
					);
				})}
				<h5 className="TableOptions__options Table__options--close">
					<div className="TableOptions__select-box" onClick={onClose}>
						close
					</div>
				</h5>
			</>
		</div>
	);
};
TableOptions.propTypes = {
	options: PropTypes.object,
	onClose: PropTypes.func,
};
export default TableOptions;
