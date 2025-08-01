<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const iconArrow = '/images/icon-dropdown-arrow.svg';
</script>

<nav class="navbar">
	<div>
		<img src="/images/logo.svg" alt="" />
	</div>

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
			<div class="avatar">
				<img src="/images/avatar-lisa.jpg" alt="" />
			</div>
			<img src={iconArrow} alt="" />
		</button>
	</form>
</nav>

<style>
	.navbar {
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
</style>
