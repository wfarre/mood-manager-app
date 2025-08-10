<script lang="ts">
	let { data }: PageProps = $props();

	import CardMood from '../components/ui/CardMood.svelte';
	import Navbar from '../components/layout/Navbar.svelte';
	import CardSleep from '../components/ui/CardSleep.svelte';
	import CardReflection from '../components/ui/CardReflection.svelte';
	import CardAverage from '../components/ui/CardAverage.svelte';
	import CardGraph from '../components/ui/CardGraph.svelte';
	import type { Mood, MoodApi } from '$lib/models/Mood';
	import { MoodFactory } from '$lib/factories/MoodFactory';
	import Button from '../components/ui/Button.svelte';
	import type { PageProps } from './$types';
	import CreateMoodFormModalView from '../components/Views/CreateMoodFormModalView.svelte';

	let mood: null | Mood[] = $state(null);
	let user = data.user;
	let moodQuotes = $state([]);
	let isFormModalOpen = $state(false);
	let todayMood: undefined | null | Mood = $state(null);

	const currenteDate = new Date();

	const formattedCurrentDate = currenteDate.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const dateWithoutTime = (date: Date): string => date.toISOString().split('T')[0];

	$effect(() => {
		if (data) {
			// mood = data.moodEntries?.map((m: MoodApi) => new MoodFactory(m, 'json'));
			mood = data.moodEntries?.map((m: MoodApi) => new MoodFactory(m, 'api'));
			moodQuotes = data.moodQuotes;
		}
	});

	$effect(() => {
		todayMood = mood?.find(
			(m) => dateWithoutTime(new Date(m.createdAt)) === dateWithoutTime(currenteDate)
		);
	});

	const handleOpenModal = () => {
		isFormModalOpen = true;
	};
</script>

{#if isFormModalOpen}
	<CreateMoodFormModalView bind:isFormModalOpen />
{/if}

<div class="container">
	<!-- <pre>{JSON.stringify(mood, null, 2)}</pre> -->

	<Navbar
		bind:picProfile={data.user.avatar}
		bind:userName={data.user.name}
		userEmail={user.email}
	/>
	<header class="header">
		<p class="greetings">Hello, Lisa!</p>
		<h1 class="title">How are you feeling today?</h1>
		<p class="date">{formattedCurrentDate}</p>

		{#if !todayMood}
			<Button onclick={handleOpenModal}>Log today's Mood</Button>
		{/if}
	</header>
	<main>
		<section>
			<div class={`grid  ${todayMood ? '' : 'grid--no-mood'}`}>
				{#if todayMood}
					<CardMood
						moodQuote={todayMood?.getMoodQuote(moodQuotes)}
						moodIcon={todayMood?.moodEmojiColor}
						moodString={todayMood?.moodString}
					/>
					<CardSleep sleepHours={todayMood?.sleepHours} />
					<CardReflection reflection={todayMood?.journalEntry} tags={todayMood?.feelings} />
				{/if}
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
		max-width: min(1170px, calc(100vw - (270 / 1440) * 100vw));
		margin: 0 auto;
	}

	:global(.error-message) {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--color-red-700);
		font-size: 12px;
		margin-top: 8px;
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

	@media all and (max-width: 800px) {
		.grid {
			/* grid-template-columns: 1fr;
			grid-template-rows: auto; */
			display: flex;
			flex-direction: column;
			height: auto;
			grid-template-rows: auto;
			gap: 32px;
		}
	}

	.grid--no-mood {
		grid-template-rows: 0px 0px 0px 0px 453px;
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

	.header .date {
		margin-bottom: 64px;
	}

	.mood-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
