import React from "react";
import "./Table.css";
import { PropTypes } from "prop-types";
import _ from "lodash";
import cls from "classnames";

const Table = ({
	data,
	dataHeaders,
	dataWidth,
	rowSelected = "1",
	rowClick = () => {},
	rowDoubleClick = () => {},
	headerClick = () => {},
	emptyTableString = "Add more data to the table",
	className,
}) => {
	const findIdIndex = _.findIndex(dataHeaders, (key) => key === "_id");

	const renderTableHeader = () => {
		return (
			<>
				{dataHeaders?.map((item, index) => {
					if (index === findIdIndex) return;
					return (
						<div
							key={index}
							className="Table__header h6"
							style={{ width: `${dataWidth[index - 1]}%` }}
							onClick={() => headerClick(item)}
						>
							{item}
						</div>
					);
				})}
			</>
		);
	};

	const renderCards = () => {
		return (
			<>
				{data?.map((item, index) => {
					return (
						<div
							key={index}
							className={cls("Table__data", item._id === rowSelected && "Table__data--selected")}
							onClick={() => {
								rowClick(item);
							}}
							onDoubleClick={() => {
								rowDoubleClick(item);
							}}
						>
							{Object.values(item).map((row, index) => {
								if (index === findIdIndex) return;
								return (
									<div
										key={index}
										className="Table__data-item h4"
										style={{ width: `${dataWidth[index - 1]}%` }}
									>
										{row}
									</div>
								);
							})}
						</div>
					);
				})}
			</>
		);
	};

	return (
		<div className={cls("Table", className)}>
			<div className="Table__header-container">{renderTableHeader()}</div>
			{data?.length !== 0 ? (
				<div className="Table__data-container">{renderCards()}</div>
			) : (
				<div className="Table__empty-message h4">{emptyTableString}</div>
			)}
		</div>
	);
};

Table.propTypes = {
	data: PropTypes.array,
	dataHeaders: PropTypes.array,
	dataWidth: PropTypes.array,
	rowSelected: PropTypes.string,
	rowClick: PropTypes.func,
	headerClick: PropTypes.func,
	emptyTableString: PropTypes.string,
	rowDoubleClick: PropTypes.func,
	className: PropTypes.string,
};

export default Table;
