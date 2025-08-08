<script lang="ts">
	import type { Snippet } from 'svelte';
	import InputWithLabel from '../ui/InputWithLabel.svelte';
	const IconClose = '/images/icon-close.svg';

	interface Props {
		onCloseModal: () => void;
		modalTitle: string;
		modalSubtitle: string;
		modalBg?: string;
		children: Snippet;
	}

	const { onCloseModal, modalTitle, modalSubtitle, children, modalBg }: Props = $props();
</script>

<div class="modal-wrapper">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-bg" onclick={onCloseModal}></div>
	<section class={`modal ${modalBg === 'primary' && 'modal--primary'}`}>
		<header class="modal__header">
			<h2 class="title">{modalTitle}</h2>
			<p>{modalSubtitle}</p>
			<button class="close-btn" onclick={onCloseModal}>
				<img height="15" width="15" src={IconClose} alt="close icon" />
			</button>
		</header>
		{@render children()}
	</section>
</div>

<style>
	@import '../../style.css';
	.close-btn {
		position: absolute;
		right: -7.5px;
		top: 0;
		background-color: transparent;
		cursor: pointer;
	}

	.modal-wrapper {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		min-width: 100vw;
		min-height: 100vh;
		z-index: 10;
	}

	.modal-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal {
		background-color: var(--color-neutral-0);
		width: calc(600px - 96px);
		padding: 48px 40px;
		border-radius: 16px;
		max-height: 90vh;
		overflow-y: auto;
		z-index: 50;
	}

	.modal--primary {
		background-color: var(--color-blue-100);
	}

	.modal__header {
		position: relative;
		margin-bottom: 32px;
	}

	.modal__header .title {
		font-size: 40px;
		font-weight: 700;
		color: var(--color-neutral-900);
	}
</style>
