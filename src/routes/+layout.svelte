<script>
	let { children } = $props();
</script>

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		height: fit-content;
		min-height: 100vh;
		min-width: 100vw;
		background-color: var(--color-blue-100);
	}

	:global(.container > *) {
		margin: 0 auto;
	}
</style>
