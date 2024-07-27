export default (dateStr: string | number | Date) => {
	const date = new Date(dateStr);
	const actualMonth = date.getMonth() + 1;
	const mm = actualMonth < 10 ? `0${actualMonth}` : actualMonth;
	const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	const yyyy = date.getFullYear();
	return `${mm}/${dd}/${yyyy}`;
};
