<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../ui/Button.svelte';
	import InputWithLabel from '../ui/InputWithLabel.svelte';
	import { goto } from '$app/navigation';

	let { action } = $props();

	let errorMsg: string | null = $state(null);
</script>

<form
	id="form"
	class="form"
	{action}
	method="POST"
	use:enhance={() => {
		return ({ update, result }) => {
			if (result.type === 'success') {
				goto('/');
			} else if (result.type === 'failure') {
				console.log(result);
				errorMsg = result.data?.message ? (result.data?.message as string) : null;
			}
		};
	}}
>
	<InputWithLabel label="Email address" id="email" placeholder="name@email.com" type="email" />
	<InputWithLabel label="Password" id="password" type="password" />
	{#if errorMsg}
		<span class="error-message">{errorMsg}</span>
	{/if}
	<div class="btn-wrapper">
		<Button form="form" type="submit">Log in</Button>
	</div>
</form>

<style>
	@import '../../style.css';

	.form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 20px;
	}

	.btn-wrapper {
		margin-top: 12px;
		display: flex;
		flex-direction: column;
	}

	.error-message {
		color: var(--color-red-700);
		font-size: 15px;
		margin-top: 8px;
	}
</style>
