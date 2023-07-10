export const getData = async (url) => {
	const rawData = await fetch(url);
	return rawData.json();
};
