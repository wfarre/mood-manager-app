<script lang="ts">
	import CardMood from '../components/ui/CardMood.svelte';
	import Navbar from '../components/layout/Navbar.svelte';
	import CardSleep from '../components/ui/CardSleep.svelte';
	import CardReflection from '../components/ui/CardReflection.svelte';
	import CardAverage from '../components/ui/CardAverage.svelte';
	import CardGraph from '../components/ui/CardGraph.svelte';
	import { onMount } from 'svelte';
	import type { Mood, MoodApi } from '$lib/models/Mood';
	import { MoodFactory } from '$lib/factories/MoodFactory';
	import FormModal from '../components/layout/FormModal.svelte';
	import Button from '../components/ui/Button.svelte';

	let mood: null | Mood[] = $state(null);
	let moodQuotes = $state([]);
	let isFormModalOpen = $state(false);

	onMount(async () => {
		await fetch('/data/data.json')
			.then((res) => res.json())
			.then((fetchedData) => {
				mood = fetchedData.moodEntries.map((m: MoodApi) => new MoodFactory(m, 'json'));
				moodQuotes = fetchedData.moodQuotes;
				console.log(fetchedData);
			})
			.catch((err) => console.log(err));
	});

	let todayMood: undefined | null | Mood = $state(null);

	$effect(() => {
		todayMood = mood?.[mood?.length - 1];
	});

	const handleOpenModal = () => {
		isFormModalOpen = true;
	};
</script>

{#if isFormModalOpen}
	<FormModal />
{/if}

<div class="container">
	<!-- <pre>{JSON.stringify(mood, null, 2)}</pre> -->

	<Navbar />
	<header class="header">
		<p class="greetings">Hello, Lisa!</p>
		<h1 class="title">How are you feeling today?</h1>
		<p class="date">Wednesday, April 16th, 2025</p>

		<Button onclick={handleOpenModal}>Log today's Mood</Button>
	</header>

	<main>
		<section>
			<div class="grid">
				<CardMood
					moodQuote={todayMood?.getMoodQuote(moodQuotes)}
					moodIcon={todayMood?.moodEmojiColor}
					moodString={todayMood?.moodString}
				/>
				<CardSleep sleepHours={todayMood?.sleepHours} />
				<CardReflection reflection={todayMood?.journalEntry} tags={todayMood?.feelings} />
				<CardAverage moodsList={mood} />
				<CardGraph moodsList={mood} />
			</div>
		</section>
	</main>
</div>

<style>
	@import '../style.css';
	.container {
		background-color: var(--color-blue-100);
	}

	:global(.container > *) {
		max-width: min(1170px, calc(100vw - 270px));
		margin: 0 auto;
		/* padding: 0 135px; */
	}

	.header {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		margin-bottom: 64px;
	}

	.greetings {
		color: var(--color-blue-600);
		font-size: 2rem;
	}

	.header .title {
		color: var(--color-neutral-900);
		font-size: 52px;
		font-weight: 700;
	}

	.header .date {
		color: var(--color-neutral-600);
		font-size: 18px;
	}

	:global(.card) {
		position: relative;
		padding: 32px;
		border-radius: 10px;
		background-color: var(--color-neutral-0);
		box-shadow: 0px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 16px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 123px 20px 197px 32px 453px;
		column-gap: 32px;
		height: 925px;
		width: 100%;
	}

	:global(.card__header) {
		display: flex;
		gap: 12px;
		font-size: 18px;
	}

	:global(.card__header h2) {
		font-size: 18px;
		font-weight: 400;
	}

	.card__header--lg {
		font-size: 24px;
		gap: 16px;
	}

	.card__header--lg h3 {
		font-size: 24px;
		font-weight: 400;
	}

	.header .btn {
		margin-top: 64px;
	}

	.mood-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
