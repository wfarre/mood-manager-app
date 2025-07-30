export class MoodQuotes {
	private _quotes: { [key: number]: string[] };

	constructor(quotes: { [key: number]: string[] }) {
		this._quotes = quotes;
	}

	public get quotes(): { [key: number]: string[] } {
		return this._quotes;
	}

	public getQuote(mood: number): string {
		const list = this._quotes[mood];
		if (!list || list.length === 0) return 'No quote available.';
		return list[Math.floor(Math.random() * list.length)];
	}
}
