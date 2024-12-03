<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';

	// State management
	let currentNumber = $state(1);
	let isGameActive = $state(false);
	let hasStartedGame = $state(false);

	// References to DOM elements
	let nextNumberElement: HTMLElement;
	let gridSizeElement: HTMLSelectElement;
	let bestTimeElement: HTMLElement;
	let highlightToggleElement: HTMLInputElement;
	let timerElement: HTMLElement;
	let congratulationElement: HTMLElement;
	let gridElement: HTMLDivElement;

	// Game state
	let timerInterval: number;
	let startTime: number;
	let bestTimes: Record<number, number> = {};

	function createGrid(size: number): void {
		if (!gridElement) return;

		gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
		gridElement.innerHTML = '';

		const numbers = Array.from({ length: size * size }, (_, i) => i + 1);
		shuffle(numbers);

		numbers.forEach((num) => {
			const cell = document.createElement('button');
			cell.className = 'cell';
			cell.textContent = num.toString();
			cell.onclick = () => handleCellClick(cell, num);
			gridElement.appendChild(cell);
		});
	}

	function shuffle<T>(array: T[]): T[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function handleCellClick(cell: HTMLButtonElement, number: number): void {
		// Start the game timer on first click if not already started
		if (!hasStartedGame) {
			startGameTimer();
		}

		if (!isGameActive) return;

		if (number === currentNumber) {
			const highlightEnabled = highlightToggleElement.checked;
			if (highlightEnabled) {
				cell.classList.add('correct');
			}
			currentNumber++;

			if (nextNumberElement) {
				nextNumberElement.textContent = currentNumber.toString();
			}

			const gridSize = parseInt(gridSizeElement.value);
			if (currentNumber > gridSize * gridSize) {
				endGame();
			}
		} else {
			cell.classList.add('wrong');
			setTimeout(() => cell.classList.remove('wrong'), 300);
		}
	}

	function startGame(): void {
		if (!gridSizeElement || !nextNumberElement || !timerElement) return;

		const gridSize = parseInt(gridSizeElement.value);
		if (gridSize === 6) {
			let className = gridElement.getAttribute('class').replace(' six', '');
			gridElement.setAttribute('class', className + ' six');
		} else {
			let className = gridElement.getAttribute('class').replace(' six', '');
			gridElement.setAttribute('class', className);
		}
		createGrid(gridSize);

		currentNumber = 1;
		nextNumberElement.textContent = currentNumber.toString();

		// Reset game state
		clearInterval(timerInterval);
		timerElement.textContent = '00:00:00';
		hasStartedGame = false;
		isGameActive = true;

		// Reset congratulation message
		if (congratulationElement) {
			congratulationElement.innerHTML = '';
		}
	}

	function startGameTimer(): void {
		hasStartedGame = true;
		startTime = Date.now();
		timerInterval = setInterval(updateTimer, 10) as unknown as number;
	}

	function endGame(): void {
		if (!timerElement || !bestTimeElement || !congratulationElement) return;

		isGameActive = false;
		clearInterval(timerInterval);

		const finalTime = (Date.now() - startTime) / 1000;
		const showFinalTime = formatTime(finalTime);
		const gridSize = parseInt(gridSizeElement.value);

		if (!bestTimes[gridSize] || finalTime < bestTimes[gridSize]) {
			bestTimes[gridSize] = finalTime;
			bestTimeElement.textContent = showFinalTime;
		}

		congratulationElement.innerHTML = `${m.game_schulte_result()} ${showFinalTime}`;
	}

	function updateTimer(): void {
		if (!timerElement) return;

		const elapsed = (Date.now() - startTime) / 1000;
		timerElement.textContent = formatTime(elapsed);
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0');
		const secs = Math.floor(seconds % 60)
			.toString()
			.padStart(2, '0');
		const ms = Math.floor((seconds % 1) * 100)
			.toString()
			.padStart(2, '0');
		return `${mins}:${secs}:${ms}`;
	}

	function handleGridSizeChange(): void {
		startGame();
	}

	onMount(() => {
		startGame();
	});
</script>

<svelte:head>
	<title>{m.title()} - {m.seo_schulte_title()}</title>
	<meta name="keywords" content="{m.seo_keywords()}, {m.seo_schulte_keywords()}">
	<meta name="description" content="{m.seo_description()}, {m.seo_schulte_description()}">
</svelte:head>

<div class="schulte flex h-full flex-col">
	<h2 class="text-lg font-semibold">{m.game_schulte()}</h2>

	<div class="stats g3">
		<div class="next">
			{m.game_schulte_next_number()}: <span bind:this={nextNumberElement}>1</span>
		</div>
		<div class="best">
			{m.game_schulte_best()}: <span bind:this={bestTimeElement}>--:--:--</span>
		</div>
		<div class="timer" bind:this={timerElement}>00:00:00</div>
	</div>

	<div class="grid-container" bind:this={gridElement}></div>

	<div class="stats">
		<p bind:this={congratulationElement}></p>
	</div>

	<div class="controls">
		<select bind:this={gridSizeElement} onchange={handleGridSizeChange}>
			<option value="3">3x3</option>
			<option value="4">4x4</option>
			<option value="5" selected>5x5</option>
			<option value="6">6x6</option>
		</select>
		<button onclick={startGame}>{m.game_schulte_new()}</button>
	</div>

	<div class="switch-container mt-2 text-sm">
		<label class="switch">
			<input type="checkbox" bind:this={highlightToggleElement} />
			<span class="slider"></span>
		</label>
		<span>{m.game_schulte_highlight()}</span>
	</div>
</div>

<style>
	/* You can add your CSS styles here if needed */
</style>
