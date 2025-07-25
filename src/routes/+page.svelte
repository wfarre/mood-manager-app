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
	import { moodRank, moodSvgColor } from '$lib/constants';
	import FormStepper from '../components/ui/FormStepper.svelte';
	import RadioItem from '../components/ui/RadioItem.svelte';
	import TagItem from '../components/ui/TagItem.svelte';
	import MoodFormFieldset from '../components/ui/MoodFormFieldset.svelte';
	import type { ChangeEventHandler, EventHandler } from 'svelte/elements';

	let mood: null | Mood[] = $state(null);
	let moodQuotes = $state([]);

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

	const moodsSelection = [
		{
			text: 'Very Happy',
			value: 2,
			id: 'very-happy'
		},
		{
			text: 'Happy',
			value: 1,
			id: 'happy'
		},
		{
			text: 'Neutral',
			value: 0,
			id: 'neutral'
		},
		{
			text: 'Sad',
			value: -1,
			id: 'sad'
		},
		{
			text: 'Very Sad',
			value: -2,
			id: 'very-sad'
		}
	];

	const sleepHours = [
		{
			text: '0-2 hours',
			value: 1,
			id: '0-2-hours'
		},
		{
			text: '3-4 hours',
			value: 3,
			id: '3-4-hours'
		},
		{
			text: '5-6 hours',
			value: 5,
			id: '5-6-hours'
		},
		{
			text: '7-8 hours',
			value: 7,
			id: '7-8-hours'
		},
		{
			text: '9+ hours',
			value: 9,
			id: '9+-hours'
		}
	];

	const feelingsList = [
		'Joyful',
		'Down',
		'Anxious',
		'Calm',
		'Excited',
		'Frustrated',
		'Lonely',
		'Grateful',
		'Overwhelmed',
		'Motivated',
		'Irritable',
		'Peaceful',
		'Tired',
		'Hopeful',
		'Confident',
		'Stressed',
		'Content',
		'Disappointed',
		'Optimistic',
		'Restless'
	];

	let currentStep = $state(0);

	const handleNextStep = () => {
		currentStep++;
	};

	const formInput = {
		mood: 0,
		sleepHours: 0,
		journalEntry: '',
		feelings: []
	};

	const handleMoodChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log((e.target as HTMLInputElement).value);
		formInput.mood = Number((e.target as HTMLInputElement).value);
	};

	const handleSleepHoursChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log((e.target as HTMLInputElement).value);
		formInput.sleepHours = Number((e.target as HTMLInputElement).value);
	};

	const handleJournalEntryChange = (e: Event) => {
		formInput.journalEntry = (e.target as HTMLInputElement).value;
	};
</script>

<div class="modal-wrapper">
	<section class="modal">
		<header class="modal__header">
			<h2 class="title">Log your mood</h2>
		</header>
		<form class="form">
			<FormStepper {currentStep} />
			{#if currentStep === 0}
				<MoodFormFieldset legend="How was your mood today?">
					<ul class="mood-list">
						{#each moodsSelection as mood}
							<li>
								<RadioItem
									id={mood.id}
									value={mood.value}
									text={mood.text}
									name="mood"
									handleChange={handleMoodChange}
								/>
							</li>
						{/each}
					</ul>
				</MoodFormFieldset>
			{:else if currentStep === 1}
				<MoodFormFieldset legend="How was your mood today?" subtitle="Select up to 3 tags">
					<ul class="tags-list">
						{#each feelingsList as feeling}
							<li>
								<TagItem tag={feeling} name="feelings" />
							</li>
						{/each}
					</ul>
				</MoodFormFieldset>
			{:else if currentStep === 2}
				<MoodFormFieldset legend="How was your mood today?">
					<textarea
						class="journal-entry-input"
						name="journal-entry"
						id="journal-entry"
						cols="30"
						rows="10"
						placeholder="Today, I felt..."
						oninput={handleJournalEntryChange}
						value={formInput.journalEntry}
					></textarea>
				</MoodFormFieldset>
			{:else}
				<MoodFormFieldset legend="How many hours did you sleep last night?">
					<ul class="mood-list">
						{#each sleepHours as sleepHour}
							<li>
								<RadioItem
									id={sleepHour.id}
									value={sleepHour.value}
									text={sleepHour.text}
									isImage={false}
									name="sleepHours"
									handleChange={handleSleepHoursChange}
								/>
							</li>
						{/each}
					</ul>
				</MoodFormFieldset>
			{/if}

			<button class="btn btn-primary" onclick={handleNextStep}>Continue</button>
		</form>
	</section>
</div>

<div class="container">
	<!-- <pre>{JSON.stringify(mood, null, 2)}</pre> -->

	<Navbar />
	<header class="header">
		<p class="greetings">Hello, Lisa!</p>
		<h1 class="title">How are you feeling today?</h1>
		<p class="date">Wednesday, April 16th, 2025</p>

		<button class="btn btn--primary">Log today's Mood</button>
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

	.btn {
		background-color: var(--color-blue-600);
		color: var(--color-neutral-0);
		border: 0;
		padding: 16px 32px;
		border-radius: 10px;
		font-size: 20px;
		cursor: pointer;
	}

	.btn:hover {
		opacity: 0.7;
	}

	.mood-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.modal-wrapper {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}

	.modal {
		background-color: var(--color-blue-100);
		width: calc(600px - 96px);
		padding: 48px 40px;
		border-radius: 16px;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal__header {
		margin-bottom: 32px;
	}

	.modal__header .title {
		font-size: 40px;
		font-weight: 700;
		color: var(--color-neutral-900);
	}

	.form {
		display: flex;
		flex-direction: column;
		/* gap: 32px; */
	}

	.form .btn {
		margin-top: 32px;
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.journal-entry-input {
		width: 100%;
		border-radius: 10px;
		border: 1px solid var(--color-neutral-300);
		padding: 12px 16px;
		height: 150px;
	}

	.journal-entry-input::placeholder {
		color: var(--color-neutral-600);
		font-style: italic;
	}
</style>
