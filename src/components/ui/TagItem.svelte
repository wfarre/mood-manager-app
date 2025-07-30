<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	interface Props {
		tag: string;
		name: string;
		onchange: ChangeEventHandler<HTMLInputElement>;
	}

	let { tag, name, onchange }: Props = $props();
</script>

<label class="tag-item" for={tag}>
	<input class="tag-item__input" type="checkbox" {name} id={tag} value={tag} {onchange} />
	{tag}
</label>

<style>
	.tag-item {
		background-color: var(--color-neutral-0);
		display: flex;
		align-items: center;
		padding: 16px;
		border-radius: 10px;
		font-size: 18px;
		gap: 8px;
	}
</style>
