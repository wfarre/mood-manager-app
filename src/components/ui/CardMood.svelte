<script lang="ts">
	import { generateCurrentQuote } from '$lib/utils';
	const quoteImg = '/images/icon-quote.svg';

	let { moodQuote, moodIcon, moodString } = $props();
	// let currentMoodIndex = $state(0);
	// let currentQuote = $state('');

	// $effect(() => {
	// 	currentMoodIndex = currentMood?.mood;
	// 	currentQuote = generateCurrentQuote(currentMoodIndex, moodQuotes);
	// });
</script>

<article class="card card--mood card--1">
	<div class="card__content">
		<p class="verb">I'm feeling</p>
		<p class="mood">{moodString}</p>
		<div class="quote">
			<img src={quoteImg} alt="" />
			<p>{moodQuote}</p>
		</div>
	</div>
	<div class="img-wrapper">
		<img src={moodIcon} alt="" />
	</div>
</article>

<style>
	@import '../../style.css';

	.card--mood {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	.card--mood .card__content {
		max-width: 246px;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.card--mood .card__content .verb {
		font-size: 32px;
		font-weight: 400;
		color: var(--color-neutral-600);
	}
	.card--mood .card__content .mood {
		font-size: 40px;
		font-weight: 700;
		color: var(--color-blue-900);
	}

	.card--mood .card__content .quote {
		margin-top: auto;
		font-size: 18px;
		color: var(--color-neutral-900);
		font-style: italic;
	}

	.card--mood .img-wrapper {
		position: absolute;
		height: 320px;
		width: 320px;
		top: 50px;
		right: 40px;
	}

	.img-wrapper img {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		object-fit: cover;
	}

	.card--1 {
		grid-column-start: 1;
		grid-column-end: 8;
		grid-row: 1 / 4;
		overflow: hidden;
	}
</style>
