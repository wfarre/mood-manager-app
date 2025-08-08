<script lang="ts">
	import { enhance } from '$app/forms';
	import { checkIfLengthIsValid } from '$lib/utils';
	import type { ChangeEventHandler } from 'svelte/elements';
	import FormStepper from '../ui/FormStepper.svelte';
	import MoodFormFieldset from '../ui/MoodFormFieldset.svelte';
	import ListView from '../layout/ListView.svelte';
	import Button from '../ui/Button.svelte';
	import RadioItem from '../ui/InputRadio.svelte';
	import TagItem from '../ui/TagItem.svelte';
	import { feelingsList, moodsSelection, sleepHours } from '$lib/constants';

	interface FormInputs {
		mood: number | null;
		sleepHours: number | null;
		journalEntry: string;
		feelings: string[];
	}

	const errorIcon = '/images/icon-info-red.svg';
	let { isFormModalOpen = $bindable() }: { isFormModalOpen: boolean } = $props();
	let currentStep = $state(0);

	const formInput: FormInputs = $state({
		mood: null,
		feelings: [],
		journalEntry: '',
		sleepHours: null
	});

	const isError: { [key: number]: boolean } = $state({
		0: false,
		1: false,
		2: false,
		3: false
	});

	let journalEntryLength = $derived(formInput.journalEntry.length);

	const errorMsg: { [key: number]: string } = $derived({
		0: 'Please select a mood before continuing',
		1: 'You can only select a maximum of 3 tags',
		2:
			formInput.journalEntry.length === 0
				? 'Please write a few words about your day before continuing.'
				: 'Please write less than 150 characters before continuing.',
		3: 'Please select a sleep hours before continuing.'
	});

	const checkIfStepIsValid = (currentStep: number, inputs: { [key: string]: any }): boolean => {
		const inputsArray = Object.entries(inputs);
		const currentEntry = inputsArray[currentStep][1];
		switch (currentStep) {
			case 0:
				return currentEntry === null;
			case 1:
				return checkIfLengthIsValid(currentEntry, 1, 3) === false;
			case 2:
				return checkIfLengthIsValid(currentEntry, 1, 150) === false;
			case 3:
				return currentEntry === null;
			default:
				return true;
		}
	};

	//Button handlers
	const handleNextStep = () => {
		isError[currentStep] = checkIfStepIsValid(currentStep, formInput);
		if (isError[currentStep]) return;
		currentStep++;
	};

	const handleCreateMoodSubmit = (e: Event) => {
		e.preventDefault();
		isError[currentStep] = checkIfStepIsValid(currentStep, formInput);
		if (isError[currentStep]) return;
	};

	//Input handlers
	const handleMoodChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		formInput.mood = Number((e.target as HTMLInputElement).value);
		isError[currentStep] = checkIfStepIsValid(currentStep, formInput);
	};

	const handleSleepHoursChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		formInput.sleepHours = Number((e.target as HTMLInputElement).value);
		isError[currentStep] = checkIfStepIsValid(currentStep, formInput);
	};

	const handleJournalEntryChange = (e: Event) => {
		formInput.journalEntry = (e.target as HTMLInputElement).value;
		isError[currentStep] = checkIfStepIsValid(currentStep, formInput);
	};

	const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		formInput.feelings = (e.target as HTMLInputElement).checked
			? [...formInput.feelings, (e.target as HTMLInputElement).value]
			: formInput.feelings.filter((tag) => tag !== (e.target as HTMLInputElement).value);
		isError[currentStep] = checkIfStepIsValid(currentStep, formInput);
	};

	const resetForm = () => {
		formInput.mood = null;
		formInput.feelings = [];
		formInput.journalEntry = '';
		formInput.sleepHours = null;
		currentStep = 0;
	};
</script>

<form
	class="form"
	id="create-mood-form"
	method="POST"
	action="?/create"
	use:enhance={() => {
		return async ({ update, result }) => {
			await update();
			console.log(result);

			if (result.type === 'success') {
				resetForm();
				isFormModalOpen = false;
			} else {
				isError[currentStep] = true;
			}
		};
	}}
>
	<input type="hidden" name="formData" value={JSON.stringify(formInput)} />
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
			<div class="textarea-wrapper">
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
				<span class={`character-count ${journalEntryLength > 150 ? 'error' : ''}`}
					>{journalEntryLength}/150</span
				>
			</div>
		</MoodFormFieldset>
	{:else}
		<MoodFormFieldset legend="How many hours did you sleep last night?">
			<ListView list={sleepHours} snippet={sleepHoursItemSnippet} />
		</MoodFormFieldset>
	{/if}

	<div class="form__footer">
		{#if isError[currentStep]}
			<span class="error-message"
				><img src={errorIcon} alt="error icon" /> {errorMsg[currentStep]}</span
			>
		{/if}
		{#if currentStep === 3}
			<Button disabled={isError[currentStep] === true} type="submit" form="create-mood-form"
				>Submit</Button
			>
		{:else}
			<Button disabled={isError[currentStep] === true} onclick={handleNextStep}>Continue</Button>
		{/if}
	</div>
</form>

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
	<TagItem tag={item} name="feelings" onchange={handleTagChange} />
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

	.form__footer {
		margin-top: 32px;
		display: flex;
		flex-direction: column;
	}

	.error-message {
		margin-bottom: 16px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--color-red-700);
		font-size: 15px;
	}

	.form {
		display: flex;
		flex-direction: column;
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

	.textarea-wrapper {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: flex-end;
	}

	.character-count {
		font-size: 13px;
		color: var(--color-neutral-600);
	}

	.character-count.error {
		color: var(--color-red-700);
	}
</style>
