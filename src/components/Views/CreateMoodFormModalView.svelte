<script lang="ts">
	import CreateMoodForm from '../forms/CreateMoodForm.svelte';
	import Modal from '../layout/Modal.svelte';

	let { isFormModalOpen = $bindable() }: { isFormModalOpen: boolean } = $props();

	const closeModal = () => {
		isFormModalOpen = false;
	};
</script>

<Modal
	modalTitle="Log your mood"
	modalSubtitle="Personalize your account with your name and photo."
	onCloseModal={closeModal}
	modalBg="primary"
>
	<CreateMoodForm bind:isFormModalOpen />
</Modal>
