import _ from "lodash";
import { getDateConfig } from "../utils/getDateConfigs";
import { useRecordData } from "./useRecordData";

export const useHMO = (date) => {
	let recordsData = useRecordData();

	if (date) {
		if (typeof date === "string") {
			recordsData = recordsData.filter((foo) => foo.dateofconsult === date);
		}
		if (typeof date === "object") {
			recordsData = recordsData.filter((foo) => {
				const { year, month } = getDateConfig(foo.dateofconsult);
				if (parseInt(date.month) === month && parseInt(date.year) === year) return foo;
			});
		}
	}

	const hmoData = _.map(recordsData, (foo) => {
		return foo.hmo;
	});

	const hmoOptions = _.uniq(hmoData).map((hmo) => {
		return { label: hmo, value: hmo };
	});

	const sortedHmoData = _.uniq(hmoData).map((foo) => {
		const data = recordsData.filter((bar) => foo === bar.hmo);

		const total = data.reduce((sum, value) => sum + value.bill, 0);

		return { hmo: foo, data: data, total };
	});

	const totalHMO = sortedHmoData.reduce((sum, value) => sum + value.total, 0);

	return {
		hmoData: _.uniq(hmoData),
		hmoOptions,
		sortedHmoData,
		totalHMO,
	};
};
