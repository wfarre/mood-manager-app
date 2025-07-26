<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		list: any[];
		snippet: Snippet<[any]>;
		alignment?: 'vertical' | 'horizontal';
	}

	let { list, snippet, alignment = 'vertical' }: Props = $props();
</script>

<ul class={`flex ${alignment === 'horizontal' ? 'flex--horizontal' : ''}`}>
	{#each list as item}
		<li>
			{@render snippet(item)}
		</li>
	{/each}
</ul>

<style>
	@import '../../style.css';
	.flex {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.flex.flex--horizontal {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 16px;
	}
</style>
