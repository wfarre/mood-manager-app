<script lang="ts">
	import { moodRank } from '$lib/constants';
	import type { Mood } from '$lib/models/Mood';
	import { getAverageMood, getAverageSleep, getSleepHoursRange } from '$lib/utils';

	interface Props {
		moodsList: null | Mood[];
	}

	const sleepIcon = '/images/icon-sleep.svg';
	const decoImg = '/images/bg-pattern-averages.svg';

	let { moodsList }: Props = $props();
	let averageMood = $state(0);
	let averageSleep = $state(0);
	let averageMoodText = $derived(moodRank[String(averageMood)]);
	let averageSleepRange = $derived(getSleepHoursRange(averageSleep));

	$effect(() => {
		if (moodsList) {
			const lastFiveEntries = moodsList.slice(-5);
			averageMood = getAverageMood(lastFiveEntries);
			averageSleep = getAverageSleep(lastFiveEntries);
		}
	});
</script>

<article class="card card--4">
	<ul class="inner-cards">
		<li class="inner-cards__item">
			<div class="header">
				<h2 class="">Average Mood <span class="last-checkin">(Last 5 check-ins)</span></h2>
			</div>
			<div class="card card--inner card--inner--neutral">
				<div class="deco-img-wrapper">
					<img src={decoImg} alt="" />
				</div>
				<div class="card__header card__header--lg">
					<img src={sleepIcon} alt="" />
					<h3>{averageMoodText}</h3>
				</div>
				<div>
					<p>Same as the previous 5 check-ins</p>
				</div>
			</div>
		</li>

		<li class="inner-cards__item">
			<div class="header">
				<h2>Average Mood <span class="last-checkin">(Last 5 check-ins)</span></h2>
			</div>
			<div class="card card--inner card--inner--dark">
				<div class="deco-img-wrapper">
					<img src={decoImg} alt="" />
				</div>
				<div class="card__header card__header--lg">
					<img src={sleepIcon} alt="" />
					<h3>{averageSleepRange} hours</h3>
				</div>
				<div>
					<p>Same as the previous 5 check-ins</p>
				</div>
			</div>
		</li>
	</ul>
</article>

<style>
	@import '../../style.css';

	.card--inner--neutral {
		background-color: var(--color-blue-300);
	}

	.card--inner--dark {
		background-color: var(--color-blue-600);
		color: var(--color-neutral-0);
	}

	.card--inner {
		padding: 40px 20px;
		position: relative;
		gap: 12px;
	}

	.last-checkin {
		font-size: 15px;
		color: var(--color-neutral-600);
	}

	.inner-cards {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.inner-cards__item .header {
		margin-bottom: 12px;
	}

	.deco-img-wrapper {
		position: absolute;
		right: 0;
		bottom: 0;
		height: 100px;
		width: 100px;
	}

	.deco-img-wrapper img {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.card--4 {
		grid-column-start: 1;
		grid-column-end: 5;
		grid-row-start: 5;
		grid-row-end: 6;
	}
</style>
