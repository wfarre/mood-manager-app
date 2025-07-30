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
		return await fetch('http://127.0.0.1:8000/api/moods')
			.then((res) => res.json())
			.then((fetchedData) => {
				return fetchedData;
			})
			.catch((err) => console.log(err));
	};

	const data = await fetchData();

	return {
		moodEntries: await getMoodData(),
		// moodEntries: data.moodEntries,
		moodQuotes: data.moodQuotes
	};
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		console.log(data.get('formData'));
		const formDataString = data.get('formData');
		const formData = JSON.parse(formDataString as string);
		console.log(formData);

		const newMood = {
			mood: formData.mood,
			feelings: formData.feelings,
			journal_entry: formData.journalEntry,
			sleep_hours: formData.sleepHours
		};

		console.log(newMood);

		return await fetch('http://127.0.0.1:8000/api/moods', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(newMood)
		})
			.then((res) => res.json())
			.then((fetchedData) => {
				console.log(fetchedData);
			})
			.catch((err) => console.log(err));
	}
};
