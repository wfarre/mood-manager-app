<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		legend: string;
		subtitle?: string;
		children: Snippet;
	}
	let { legend, subtitle, children }: Props = $props();
</script>

<fieldset>
	<div class="fieldset__header">
		<legend class="legend">{legend}</legend>
		{#if subtitle}
			<span class="subtitle">{subtitle}</span>
		{/if}
	</div>

	{@render children()}
</fieldset>

<style>
	@import '../../style.css';
	.fieldset__header {
		margin-bottom: 32px;
	}

	.fieldset__header .legend {
		font-size: 32px;
		font-weight: 500;
		color: var(--color-neutral-900);
	}

	.fieldset__header .subtitle {
		margin-top: 8px;
		font-size: 18px;
		color: var(--color-neutral-600);
	}
</style>
