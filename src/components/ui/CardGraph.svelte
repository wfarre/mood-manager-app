<script lang="ts">
	import { Chart } from 'chart.js';
	import { BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';
	import type { Mood } from '$lib/models/Mood';

	interface Props {
		moodsList: null | Mood[];
	}

	let ctx;
	let chartCanvas;
	let { moodsList = null }: Props = $props();

	function loadImages(sources: string[]): Promise<HTMLImageElement[]> {
		return Promise.all(
			sources.map(
				(src) =>
					new Promise<HTMLImageElement>((resolve, reject) => {
						const img = new Image();
						img.src = src;
						img.onload = () => resolve(img);
						img.onerror = reject;
					})
			)
		);
	}

	let loadedImages: HTMLImageElement[] = [];

	const svgPlugin = {
		id: 'svgIconsPlugin',
		afterDatasetsDraw(chart: Chart) {
			const { ctx } = chart;
			const meta = chart.getDatasetMeta(0);

			meta.data.forEach((bar, index) => {
				const img = loadedImages[index];
				if (!img) return;

				const imgWidth = 30;
				const imgHeight = 30;
				const x = bar.x - imgWidth / 2;
				const y = bar.y - imgHeight - 5 + 40;

				ctx.drawImage(img, x, y, imgWidth, imgHeight);
			});
		}
	};

	Chart.register(BarController, BarElement, CategoryScale, LinearScale);

	let chartInstance: Chart | null = null;

	function createChart(sleepScores: number[], moodDates: string[], moodColors: string[]) {
		if (chartInstance) {
			chartInstance.destroy(); // cleanup before re-render
		}

		ctx = document.getElementById('myChart') as HTMLCanvasElement;
		chartCanvas = ctx.getContext('2d');

		chartInstance = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: moodDates,
				datasets: [
					{
						data: sleepScores,
						borderWidth: 1,
						backgroundColor: moodColors,
						borderRadius: {
							topLeft: 20,
							topRight: 20,
							bottomLeft: 20,
							bottomRight: 20
						},
						barThickness: 40
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						max: 10,
						ticks: {
							stepSize: 2,
							callback: (value) => value + ' hrs'
						}
					}
				}
			},
			plugins: [svgPlugin]
		});
	}

	$effect(() => {
		if (!moodsList || moodsList.length === 0) return;

		// Process data
		(async () => {
			const moodColors = moodsList.map((m) => m.moodColor);
			const sleepScores = moodsList.map((m) => m.sleepHours);
			const moodDates = moodsList.map((m) => {
				const date = new Date(m.createdAt);
				return date.getMonth() + 1 + '/' + date.getDate();
			});
			const moodIcons = moodsList.map((m) => m.moodEmojiWhite);
			loadedImages = await loadImages(moodIcons);
			createChart(sleepScores, moodDates, moodColors);
		})();
	});
</script>

<article class="card card--5">
	<header class="card__header--lg">
		<h2>Mood and sleep trends</h2>
	</header>
	<div class="wrapper">
		<canvas class="graph" bind:this={ctx} id="myChart"></canvas>
	</div>
</article>

<style>
	@import '../../style.css';
	.card__header--lg h2 {
		font-size: 32px;
		font-weight: 400;
	}

	.wrapper {
		position: relative;
		width: 100%;
		height: 40vh;
	}

	.graph {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.card--5 {
		grid-column-start: 5;
		grid-column-end: 13;
		grid-row-start: 5;
		grid-row-end: 6;
	}
</style>
