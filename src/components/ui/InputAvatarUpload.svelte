<script lang="ts">
	interface Props {
		isError: boolean;
	}

	let { isError }: Props = $props();
</script>

<div class="avatar-upload-wrapper">
	<img src="/images/avatar-placeholder.svg" alt="" />
	<div class="avatar-upload">
		<p class="avatar-upload__title">Upload Image</p>
		<span class="avatar-upload__subtitle">Max 250KB, PNG or JPEG</span>
		<label class="avatar-upload__label" for="file-upload">Upload</label>

		{#if isError}
			<span class="error-message">
				<img src="/images/icon-info-red.svg" alt="" />
				Unsupported file type. Please upload a PNG or JPEG
			</span>
		{/if}
		<input name="file-upload" id="file-upload" type="file" hidden accept="image/*" />
	</div>
</div>

<style>
	@import '../../style.css';

	.avatar-upload-wrapper {
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}

	.avatar-upload {
		display: flex;
		flex-direction: column;
		color: var(--color-neutral-900);
	}

	.avatar-upload .avatar-upload__title {
		margin-bottom: 6px;
		color: var(--color-neutral-900);
		font-size: 18px;
	}

	.avatar-upload .avatar-upload__subtitle {
		color: var(--color-neutral-300);
		font-size: 15px;
	}

	.avatar-upload__label {
		margin-top: 16px;
		border: 1px solid var(--color-neutral-300);
		border-radius: 8px;
		padding: 8px 16px;
		cursor: pointer;
		font-size: 15px;
	}
</style>
