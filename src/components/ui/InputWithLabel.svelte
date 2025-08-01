<script lang="ts">
	interface Props {
		id: string;
		label: string;
		placeholder?: string;
		type?: 'email' | 'password' | 'text';
	}

	let { id, label, placeholder = '', type = 'text' }: Props = $props();
</script>

<label class="form-with-label" for={id}>
	{label}
	<input {type} name={id} {id} {placeholder} />
</label>

<style>
	@import '../../style.css';

	.form-with-label {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-with-label input {
		border: 1px solid var(--color-neutral-300);
		border-radius: 10px;
		padding: 12px 16px;
		font-size: 18px;
	}
</style>
