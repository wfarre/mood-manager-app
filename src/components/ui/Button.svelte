<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		onclick?: () => void;
		type?: 'button' | 'submit' | 'reset';
		form?: string;
		disabled?: boolean;
	}

	let { children, onclick, type = 'button', form, disabled = false }: Props = $props();
</script>

<button {disabled} {form} {type} class="btn" {onclick}>{@render children()}</button>

<style>
	@import '../../style.css';
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
</style>
