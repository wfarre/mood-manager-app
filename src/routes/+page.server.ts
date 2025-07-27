export const load = async ({ fetch }) => {
	const fetchData = async () => {
		return await fetch('/data/data.json')
			.then((res) => res.json())
			.then((fetchedData) => {
				return fetchedData;
			})
			.catch((err) => console.log(err));
	};

	const getMoodData = async () => {
		return await fetch('http://127.0.0.1:8000/moods')
			.then((res) => res.json())
			.then((fetchedData) => {
				return fetchedData;
			})
			.catch((err) => console.log(err));
	};

	const data = await fetchData();

	return {
		moodEntries: await getMoodData(),
		moodQuotes: data.moodQuotes
	};
};
