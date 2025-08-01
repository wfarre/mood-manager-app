<script lang="ts">
	let { title, subtitle, linkText, linkUrl, children } = $props();
</script>

<section class="form-wrapper">
	<header class="form-wrapper__header">
		<h2 class="title">{title}</h2>
		<p class="subtitle">{subtitle}</p>
	</header>
	{@render children()}
	<footer class="form-wrapper__footer">
		<p>
			{linkUrl === '/login' ? "Haven't an account yet?" : 'Already got an account?'}
			<a href={linkUrl}>{linkText}</a>
		</p>
	</footer>
</section>

<style>
	@import '../../style.css';

	.form-wrapper {
		margin-inline: auto;
		background-color: var(--color-neutral-0);
		padding: 40px 2rem;
		max-width: 530px;
		border-radius: 16px;
	}

	.form-wrapper__header .title {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-neutral-900);
		margin-bottom: 8px;
	}

	.form-wrapper__header .subtitle {
		font-size: 18px;
		color: var(--color-neutral-600);
	}

	.form-wrapper__header {
		margin-bottom: 2rem;
	}

	.form-wrapper__footer {
		text-align: center;
		font-size: 18px;
		color: var(--color-neutral-600);
	}

	.form-wrapper__footer a {
		color: var(--color-blue-600);
	}
</style>
