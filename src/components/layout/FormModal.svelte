<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';
	import FormStepper from '../ui/FormStepper.svelte';
	import MoodFormFieldset from '../ui/MoodFormFieldset.svelte';
	import RadioItem from '../ui/RadioItem.svelte';
	import TagItem from '../ui/TagItem.svelte';
	import Button from '../ui/Button.svelte';
	import ListView from './ListView.svelte';
	import { feelingsList, moodsSelection } from '$lib/constants';
	import { sleepHours } from '$lib/constants';

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
					<ListView list={moodsSelection} snippet={moodsSelectionItemSnippet} />
				</MoodFormFieldset>
			{:else if currentStep === 1}
				<MoodFormFieldset legend="How was your mood today?" subtitle="Select up to 3 tags">
					<ListView list={feelingsList} snippet={feelingsListItemSnippet} alignment="horizontal" />
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
					<ListView list={sleepHours} snippet={sleepHoursItemSnippet} />
				</MoodFormFieldset>
			{/if}

			{#if currentStep === 3}
				<Button onclick={handleNextStep}>Submit</Button>
			{:else}
				<Button onclick={handleNextStep}>Continue</Button>
			{/if}
		</form>
	</section>
</div>

{#snippet moodsSelectionItemSnippet(item: { text: string; value: number; id: string })}
	<RadioItem
		id={item.id}
		value={item.value}
		text={item.text}
		name="mood"
		handleChange={handleMoodChange}
	/>
{/snippet}

{#snippet feelingsListItemSnippet(item: string)}
	<TagItem tag={item} name="feelings" />
{/snippet}

{#snippet sleepHoursItemSnippet(item: { text: string; value: number; id: string })}
	<RadioItem
		id={item.id}
		value={item.value}
		text={item.text}
		isImage={false}
		name="sleepHours"
		handleChange={handleSleepHoursChange}
	/>
{/snippet}

<style>
	@import '../../style.css';

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
