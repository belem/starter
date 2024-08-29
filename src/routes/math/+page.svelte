<script>
	let ranges = [10, 20, 50, 100, 1000, 10000];
	let range = $state(ranges[0]);
	let operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];
	let operation = $state(operations[0]);

	let questionCounts = [5, 10, 20, 50, 100];
	let count = $state(questionCounts[2]);

	let questionType = $state('calculation'); // 'fill-blank' or 'calculation'

	// This will hold the generated math problems
	let problems = $state([]);

	// Function to generate/re-generate problems
	const generateProblems = () => {
		problems = [];
		for (let i = 0; i < count; i++) {
			let num1 = Math.floor(Math.random() * (range - 1)) + 1;
			let num2 = Math.floor(Math.random() * (range - 1)) + 1;

			let question;
			switch (operation) {
				case 'Addition':
					question = `${num1} + ${num2} =`;
					break;
				case 'Subtraction':
					question = `${num1} - ${num2} =`;
					break;
				case 'Multiplication':
					question = `${num1} * ${num2} =`;
					break;
				case 'Division':
					num2 = num2 === 0 ? 1 : num2; // Avoid divide by zero
					question = `${num1} / ${num2} =`;
					break;
			}

			// Generate question in the selected format
			if (questionType === 'fill-blank') {
				question = question.replace(/(\d+)/, '___');
			}

			document.startViewTransition(() => {
				problems.push(question);
			});
		}
	};
</script>

<div class="container py-4 px-0">
<h1>Math Problem Generator</h1>

<div>
	<label>Operation:</label>
	<select bind:value={operation}>
		{#each operations as operation}
			<option value={operation}>{operation}</option>
		{/each}
	</select>
</div>

<div>
	<label>Range:</label>
	<select bind:value={range}>
		{#each ranges as range}
			<option value={range}>{range}</option>
		{/each}
	</select>
</div>

<div>
	<label>Number of Questions:</label>
	<select bind:value={count}>
		{#each questionCounts as count}
			<option value={count}>{count}</option>
		{/each}
	</select>
</div>

<div>
	<label>Question Type:</label>
	<select bind:value={questionType}>
		<option value="calculation">Horizontal Form</option>
		<option value="fill-blank">Fill in the Blank</option>
		<option value="">Vertical Form</option>
	</select>
</div>

<button type="submit" onclick={generateProblems}>Generate/Re-generate Mental Math Problems</button>

<!-- List of generated problems -->
<div id="print">
	{#each problems as problem}
		<div>{problem}</div>
	{/each}
</div>

<!-- Button to trigger printing -->
<button onclick={() => window.print()}>Print</button>

</div>
<style>
	::view-transition-old(slide) {
		animation:
			var(--animation-fade-out) forwards,
			var(--animation-slide-out-up) forwards;
		animation-duration: 0.3s;
		animation-timing-function: var(--ease-elastic-in-out-3);
	}

	/* animate entrance */
	::view-transition-new(slide) {
		opacity: 0;
		animation:
			var(--animation-fade-in) forwards,
			var(--animation-slide-in-up) forwards;
		animation-duration: 0.3s;
		animation-delay: 0.1s;
		animation-timing-function: var(--ease-elastic-in-out-3);
	}

	#print {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 10px;
		grid-row-gap: 4px;
		align-items: start;
    view-transition-name: slide;
		font-variant-numeric: tabular-nums;
	}

	@media print {
		#print {
			background-color: white;
			height: 100%;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			margin: 0;
			padding: 30px;
			font-size: 22px;
		}
	}
</style>
