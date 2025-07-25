<script lang="ts">
	let { currentStep } = $props();

	let stepsArray = Array(4);
</script>

<ul class="stepper">
	{#each stepsArray as step, index}
		<li>
			<button class="step" aria-label={`Step ${index + 1}`}>
				<div class={`step__fill ${currentStep >= index ? 'step__fill--active' : ''}`}></div>
			</button>
		</li>
	{/each}
</ul>

<style>
	@import '../../style.css';
	.stepper {
		display: flex;
		gap: 16px;
		margin-bottom: 32px;
	}

	.stepper li {
		flex: 1;
	}

	.step {
		content: ' ';
		height: 6px;
		width: 100%;
		background-color: var(--color-blue-200);
	}

	.step__fill {
		height: 6px;
		background-color: var(--color-blue-600);
		transform: scaleX(0);
	}

	.step__fill--active {
		transform: scaleX(1);
	}
</style>
