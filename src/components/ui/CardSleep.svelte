<script>
	import { getSleepHoursRange } from '$lib/utils';

	const sleepIcon = '/images/icon-sleep.svg';

	let { sleepHours } = $props();

	let sleepHoursRange = $state('');

	$effect(() => {
		sleepHoursRange = getSleepHoursRange(sleepHours);
	});
</script>

<article class="card card--2">
	<header class="card__header">
		<img src={sleepIcon} alt="" />
		<h2>Sleep</h2>
	</header>
	<div>
		<p class="sleep-hours">{sleepHoursRange} hours</p>
	</div>
</article>

<style>
	@import '../../style.css';
	.card .sleep-hours {
		color: var(--color-neutral-900);
		font-size: 32px;
		font-weight: 700;
	}

	.card--2 {
		grid-column-start: 8;
		grid-column-end: 13;
		grid-row-start: 1;
		grid-row-end: 2;
	}
</style>
