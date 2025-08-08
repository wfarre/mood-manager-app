<script>
	import AvatarUploadInput from '../ui/InputAvatarUpload.svelte';
	import Button from '../ui/Button.svelte';
	import InputWithLabel from '../ui/InputWithLabel.svelte';
	import { enhance } from '$app/forms';
</script>

<form
	id="setting-form"
	class="setting-form"
	enctype="multipart/form-data"
	action="?/updateProfile"
	method="POST"
	use:enhance
>
	<InputWithLabel label="Name" id="name" placeholder="name" type="text" />
	<AvatarUploadInput isError={false} />

	<div class="btn-wrapper">
		<Button form="setting-form" type="submit">Submit</Button>
	</div>
</form>

<style>
	@import '../../style.css';

	.setting-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.btn-wrapper {
		margin-top: 12px;
		display: flex;
		flex-direction: column;
	}
</style>
