<script>
	const reflectionIcon = '/images/icon-reflection.svg';
	let { reflection, tags } = $props();
</script>

<article class="card card--3">
	<header class="card__header">
		<img src={reflectionIcon} alt="" />
		<h2>Reflection on the day</h2>
	</header>
	<div>
		<p>{reflection}</p>
	</div>
	<footer class="card__footer">
		<ul class="tags">
			{#each tags as tag}
				<li>#{tag}</li>
			{/each}
		</ul>
	</footer>
</article>

<style>
	@import '../../style.css';

	.card__footer {
		margin-top: auto;
	}

	.tags {
		display: flex;
		gap: 12px;
	}

	.card--3 {
		grid-column-start: 8;
		grid-column-end: 13;
		grid-row-start: 3;
		grid-row-end: 4;
	}
</style>
