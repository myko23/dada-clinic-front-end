import { DateTime } from "luxon";

export const getDateConfig = (date) => {
	const year = DateTime.fromFormat(date, "MM-dd-yyyy").year;
	const day = DateTime.fromFormat(date, "MM-dd-yyyy").day;
	const month = DateTime.fromFormat(date, "MM-dd-yyyy").month;
	return { year, day, month };
};
