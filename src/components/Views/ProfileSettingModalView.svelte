<script lang="ts">
	import SettingForm from '../forms/SettingForm.svelte';
	import Modal from '../layout/Modal.svelte';
	interface Props {
		isSettingModalOpen: boolean;
		picProfile: string;
		userName: string;
	}

	let { isSettingModalOpen = $bindable(), picProfile, userName }: Props = $props();

	const closeModal = () => {
		isSettingModalOpen = false;
	};
</script>

<Modal
	modalTitle="Log your mood"
	modalSubtitle="Personalize your account with your name and photo."
	onCloseModal={closeModal}
>
	<SettingForm {userName} {picProfile} closeModal={() => (isSettingModalOpen = false)} />
</Modal>
