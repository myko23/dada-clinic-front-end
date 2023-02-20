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
import "./BillingsDay.css";

const BillingsDayDay = () => {
	const patientData = useFetchQuery(["patients"]);
	const [dateSearch, setDateSearch] = useState(DateTime.now().toFormat("MM-dd-yyyy"));
	const { sortedHmoData, totalHMO } = useHMO(dateSearch);

	const renderHMOSet = () => {
		return sortedHmoData.map((hmo, index) => {
			const { tableData, tableHeaders, tableWidth } = setTableConfigs(
				hmo.data,
				[
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
				<div key={index} className="BillingsDay__hmo-set">
					<h4 className="BillingsDay__hmo-header">
						<span className="BillingsDay__hmo-title h6">HMO:</span>
						{hmo.hmo}
					</h4>
					<Table
						className="BillingsDay__table"
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
		<div className="BillingsDay">
			<div className="BillingsDay__search-container">
				<InputBox
					label="Date"
					placeholder="Search..."
					className="ConsultationList__search"
					size="h6"
					state={dateSearch}
					setState={setDateSearch}
					type="datepicker"
					width="15rem"
				/>
				<Total total={totalHMO.toString()} />
			</div>
			<div className="BillingsDay__hmo-container">{renderHMOSet()}</div>
		</div>
	);
};

export default BillingsDayDay;
