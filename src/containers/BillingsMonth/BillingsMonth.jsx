import _ from "lodash";
import { DateTime } from "luxon";
import React from "react";
import { useState } from "react";
import InputBox from "../../components/InputBox/InputBox";
import Table from "../../components/Table/Table";
import Total from "../../components/Total/Total";
import { useFetchQuery } from "../../lib/hooks/useFetchQuery";
import { useHMO } from "../../lib/hooks/useHMO";
import setTableConfigs from "../../lib/utils/setTableConfigs";
import "./BillingsMonth.css";

const BillingsMonth = () => {
	const patientData = useFetchQuery(["patients"]);
	const [year, setYear] = useState(DateTime.now().year);
	const [month, setMonth] = useState(DateTime.now().month);
	const { sortedHmoData, totalHMO, hmoOptions } = useHMO({ month, year });

	const [hmoSelect, setHmoSelect] = useState(0);

	const renderOptionYear = () => {
		const yearNow = DateTime.now().year;
		let totalYear = [];
		for (let y = yearNow - 10; y <= yearNow + 10; y++) {
			totalYear.push(y);
		}

		return totalYear.map((foo) => {
			return { label: foo, value: foo };
		});
	};

	const filteredHmoData = hmoSelect == 0 ? sortedHmoData : sortedHmoData.filter((foo) => foo.hmo === hmoSelect);
	console.log(hmoSelect);
	console.log({ filteredHmoData, sortedHmoData });

	const renderHMOSet = () => {
		return filteredHmoData.map((hmo, index) => {
			const { tableData, tableHeaders, tableWidth } = setTableConfigs(
				hmo.data,
				[
					{
						header: "Date of Consult",
						content: (item) => {
							return DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").toFormat("MMMM dd, yyyy");
						},
						width: 30,
					},
					{
						header: "Patient",
						content: (item) => {
							const newPatient = _.find(patientData, (foo) => foo._id === item.patient_id);

							return `${newPatient.lastname}, ${newPatient.firstname}`;
						},
						width: 30,
					},
					{
						header: "Assessment",
						content: (item) => {
							return item.assessment;
						},
						width: 30,
					},

					{
						header: "BILL",
						content: (item) => {
							return `P ${item.bill}`;
						},
						width: 10,
					},
				],
				{ defaultItem: "dateofconsult", sortItem: "", sortOrder: "desc" }
			);

			return (
				<div key={index} className="BillingsMonth__hmo-set">
					<h4 className="BillingsMonth__hmo-header">
						<span className="BillingsMonth__hmo-title h6">HMO:</span>
						{hmo.hmo}
					</h4>
					<Table
						className="BillingsMonth__table"
						data={tableData}
						dataHeaders={tableHeaders}
						dataWidth={tableWidth}
						rowSelected={"0"}
						rowClick={() => {}}
						rowDoubleClick={() => {}}
						emptyTableString="Empty String"
					/>
					<Total total={hmo.total.toString()} />
				</div>
			);
		});
	};
	return (
		<div className="BillingsMonth">
			<div className="BillingsMonth__search-container">
				<InputBox
					label="HMO"
					placeholder="Search..."
					className="BillingsMonth__search"
					size="h6"
					state={hmoSelect}
					setState={setHmoSelect}
					type="select"
					width="15rem"
					options={[{ label: "All HMO", value: 0 }, ...hmoOptions]}
				/>
				<InputBox
					label="Month"
					placeholder="Search..."
					className="BillingsMonth__search"
					size="h6"
					state={month}
					setState={setMonth}
					type="select"
					width="15rem"
					options={[
						{ label: "January", value: 1 },
						{ label: "February", value: 2 },
						{ label: "March", value: 3 },
						{ label: "April", value: 4 },
						{ label: "May", value: 5 },
						{ label: "June", value: 6 },
						{ label: "July", value: 7 },
						{ label: "August", value: 8 },
						{ label: "September", value: 9 },
						{ label: "October", value: 10 },
						{ label: "November", value: 11 },
						{ label: "December", value: 12 },
					]}
				/>
				<InputBox
					label="Year"
					placeholder="Search..."
					className="BillingsMonth__search"
					size="h6"
					state={year}
					setState={setYear}
					type="select"
					width="15rem"
					options={renderOptionYear()}
				/>
				<Total total={totalHMO.toString()} />
			</div>
			<div className="BillingsMonth__hmo-container">{renderHMOSet()}</div>
		</div>
	);
};

export default BillingsMonth;
