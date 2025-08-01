<script lang="ts">
	import { enhance } from '$app/forms';
	import { redirect } from '@sveltejs/kit';
	import Button from '../ui/Button.svelte';
	import InputWithLabel from '../ui/InputWithLabel.svelte';
	import { goto } from '$app/navigation';

	let { action } = $props();
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
			}
		};
	}}
>
	<InputWithLabel label="Email address" id="email" placeholder="name@email.com" type="email" />
	<InputWithLabel label="Password" id="password" type="password" />
	<div class="btn-wrapper">
		<Button form="form" type="submit">Log in</Button>
	</div>
</form>

<style>
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
</style>
