<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ProfileSettingModalView from '../Views/ProfileSettingModalView.svelte';

	let { picProfile = $bindable(), userName = $bindable(), userEmail } = $props();

	const iconArrow = '/images/icon-dropdown-arrow.svg';

	let isSettingModalOpen = $state(false);
	let isMenuOpen = $state(false);

	onMount(() => {
		window?.addEventListener('click', (e: Event) => {
			if (!(e.target as HTMLElement).closest('.open-menu-btn')) {
				isMenuOpen = false;
			}
		});
	});
</script>

<nav class="navbar">
	<div>
		<img src="/images/logo.svg" alt="" />
	</div>

	<button id="open-btn" class="btn open-menu-btn" onclick={() => (isMenuOpen = !isMenuOpen)}>
		<div class="avatar">
			<img src={picProfile} alt="" />
		</div>
		<img src={iconArrow} alt="" />
	</button>

	{#if isMenuOpen}
		<div id={'menu-modal'} class="modal">
			<figure class="user-info">
				<figcaption class="user-info__name">{userName}</figcaption>
				<p class="user-info__email">{userEmail}</p>
			</figure>
			<ul class="settings">
				<li class="settings__item">
					<button class="btn" onclick={() => (isSettingModalOpen = true)}>
						<img src="/images/icon-settings.svg" alt="" />
						Settings
					</button>
				</li>
				<li class="settings__item">
					<form
						action="?/logout"
						method="POST"
						use:enhance={() => {
							return ({ update, result }) => {
								if (result.type === 'success') {
									goto('/login');
								}
							};
						}}
					>
						<button class="btn" type="submit">
							<img src="/images/icon-logout.svg" alt="" />
							Log out
						</button>
					</form>
				</li>
			</ul>
		</div>
	{/if}
</nav>

{#if isSettingModalOpen}
	<ProfileSettingModalView bind:isSettingModalOpen {picProfile} {userName} />
{/if}

<style>
	@import '../../style.css';

	.navbar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40px 0;
		margin-bottom: 44px;
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: transparent;
		border: none;
		cursor: pointer;
		gap: 10px;
	}
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}
	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal {
		position: absolute;
		top: 75%;
		right: 0;
		background-color: white;
		padding: 12px 16px;
		border-radius: 10px;
		color: var(--color-neutral-900);
		font-size: 15px;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--color-neutral-100);
		width: calc(200px - 24px);
	}

	.user-info__name {
		font-size: 18px;
	}

	.user-info__email {
		color: var(--color-neutral-300);
	}

	.settings {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 12px;
	}
</style>
