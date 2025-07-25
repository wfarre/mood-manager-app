<script lang="ts">
	import { moodSvgColor } from '$lib/constants';
	import type { ChangeEventHandler } from 'svelte/elements';

	interface Props {
		id: string;
		value: number;
		text: string;
		isImage?: boolean;
		name: string;
		handleChange: ChangeEventHandler<HTMLInputElement>;
	}
	let { id, value, text, isImage = true, name, handleChange }: Props = $props();

	// const handleSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
	// 	console.log((e.target as HTMLInputElement).value);
	// 	handleChange(e);
	// };
</script>

<label class="radio-item" for={id}>
	<input class="radio-item__input" type="radio" {name} {id} {value} onchange={handleChange} />
	{text}
	{#if isImage}
		<img class="radio-item__img" src={moodSvgColor[value]} alt="" />
	{/if}
</label>

<style>
	@import '../../style.css';
	.radio-item {
		background-color: var(--color-neutral-0);
		border-radius: 10px;
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		padding: 17px 20px;
	}

	.radio-item__img {
		height: 20px;
		width: 20px;
		margin-left: auto;
	}
</style>
