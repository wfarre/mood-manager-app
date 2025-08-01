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
	import { checkIfLengthIsValid } from '$lib/utils';
	import { enhance } from '$app/forms';
	import CreateMoodForm from './CreateMoodForm.svelte';

	let { isFormModalOpen = $bindable() }: { isFormModalOpen: boolean } = $props();
</script>

<div class="modal-wrapper">
	<section class="modal">
		<header class="modal__header">
			<h2 class="title">Log your mood</h2>
		</header>
		<CreateMoodForm bind:isFormModalOpen />
	</section>
</div>

<style>
	@import '../../style.css';

	.modal-wrapper {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		min-width: 100vw;
		min-height: 100vh;
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
</style>
