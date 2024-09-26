<script lang="ts">
	import { onMount } from 'svelte';
	import { mathWorksheetStore } from '$lib/store/store';
	import CounterClockwiseClock from 'svelte-radix/CounterClockwiseClock.svelte';
	import { Horizontal, Blank, Vertical } from '$lib/components/ui-enhanced/icons/math/facts/index';
	import { NumberSelector, ProblemsSelector, RangeSelector } from './components/index';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import PDF from '$lib/components/ui-enhanced/icons/pdf.svelte';
	import Print from '$lib/components/ui-enhanced/icons/print.svelte';

	import * as m from '$lib/paraglide/messages.js';

	const getKeyFromValue = (value) => {
		// Use Object.entries() to create an array of key-value pairs, then find the entry with the matching value
		return Object.entries(types).find(([key, val]) => val === value)?.[0];
	};

	let factSelector, numberSelector, rangeSelector;

	let mathWorksheet = $state({});
	mathWorksheetStore.subscribe((value) => {
		mathWorksheet = value;
	});

	const updateMathWorksheet = (value) => {
		mathWorksheetStore.update(() => value);
	};

	const updateCarrying = () => {
		carrying = !carrying;
	};

	const updateBorrowing = () => {
		borrowing = !borrowing;
	};

	let type = $state('');
	let types = {
		horizontal: 0,
		blank: 1,
		vertical: 2
	};
	let blackWidth = $state('w-4');

	let typeId = $derived(types[type]);
	let carrying = $state(false);
	let borrowing = $state(false);

	const randomBoolean = () => {
		return Math.random() < 0.5;
	}

	$effect(() => {
		// mathWorksheet.config.fact = factSelector?.getSelectedFactId();
		// mathWorksheet.config.type = typeId;
		// mathWorksheet.config.number = numberSelector?.getSelectedNumber()[0];
		// mathWorksheet.config.range = rangeSelector?.getSelectedRange();
		// mathWorksheet.config.carrying = carrying;
		// mathWorksheet.config.borrowing = borrowing;
		// updateMathWorksheet(mathWorksheet);
	});

	onMount(async () => {
		const mathWorksheetInit = {
			config: {
				fact: 0,
				number: 20,
				range: 10,
				type: 0,
				carrying: false,
				borrowing: false
			},
			worksheet: []
		};

		if (!mathWorksheet.config || !Object.keys(mathWorksheet.config).length > 0) {
			updateMathWorksheet(mathWorksheetInit);
		} else {
			// carrying = mathWorksheet.config.carrying;
		}
	});

	function generateMathWorksheet(
		fact: number,
		number: number,
		range: number,
		carrying: boolean,
		borrowing: boolean
	) {
		const worksheet = [];
		let obj = {
			a: 0,
			o: '',
			b: 0,
			c: 0
		};

		// Helper to generate random numbers within a given range, excluding specific values
		function randomNumExcluding(max, exclude = []) {
			let num;
			do {
				num = Math.floor(Math.random() * (max + 1));
			} while (exclude.includes(num));
			return num;
		}

		// Split number into an array of its digits
		function splitIntoDigits(num) {
			return num.toString().split('').map(Number);
		}

		// Addition with proper carrying option
		function generateAddition() {
			obj = {
				a: 0,
				o: '',
				b: 0,
				c: 0
			};
			let a, b;
			do {
				a = randomNumExcluding(range, [0]); // Exclude 0
				b = randomNumExcluding(range, [0]); // Exclude 0
			} while (!ensureResultInRange(a, b, 'add') || (!carrying && wouldCauseCarry(a, b)));

			const c = a + b;
			obj.a = a;
			obj.b = b;
			obj.o = '+';
			obj.c = c;
			return obj;
		}

		// Check if the addition would cause carrying
		function wouldCauseCarry(a, b) {
			const aDigits = splitIntoDigits(a);
			const bDigits = splitIntoDigits(b);

			// Compare each column (ones, tens, etc.)
			for (let i = 0; i < Math.max(aDigits.length, bDigits.length); i++) {
				const aDigit = aDigits[aDigits.length - 1 - i] || 0;
				const bDigit = bDigits[bDigits.length - 1 - i] || 0;

				if (aDigit + bDigit >= 10) return true; // Carry would occur
			}
			return false; // No carry
		}

		// Subtraction with proper borrowing option
		function generateSubtraction() {
			obj = {
				a: 0,
				o: '',
				b: 0,
				c: 0
			};
			let a, b;
			do {
				a = randomNumExcluding(range, [0]); // Exclude 0
				b = randomNumExcluding(range, [0]); // Exclude 0
			} while (
				!ensureResultInRange(a, b, 'sub') ||
				a === b ||
				(!borrowing && wouldCauseBorrow(a, b))
			);

			if (a < b) [a, b] = [b, a]; // Ensure a is always larger

			const c = a - b;
			obj.a = a;
			obj.b = b;
			obj.o = '-';
			obj.c = c;
			return obj;
		}

		// Check if the subtraction would cause borrowing
		function wouldCauseBorrow(a, b) {
			const aDigits = splitIntoDigits(a);
			const bDigits = splitIntoDigits(b);

			// Compare each column (ones, tens, etc.)
			for (let i = 0; i < Math.max(aDigits.length, bDigits.length); i++) {
				const aDigit = aDigits[aDigits.length - 1 - i] || 0;
				const bDigit = bDigits[bDigits.length - 1 - i] || 0;

				if (aDigit < bDigit) return true; // Borrow would occur
			}
			return false; // No borrow
		}

		// Multiplication
		function generateMultiplication() {
			obj = {
				a: 0,
				o: '',
				b: 0,
				c: 0
			};
			let a, b;
			do {
				a = randomNumExcluding(range, [0, 1]); // Exclude 0 and 1
				b = randomNumExcluding(range, [0, 1]); // Exclude 0 and 1
			} while (!ensureResultInRange(a, b, 'mul'));

			const c = a * b;
			obj.a = a;
			obj.b = b;
			obj.o = '*';
			obj.c = c;
			return obj;
		}

		// Division (ensure no remainder)
		function generateDivision() {
			obj = {
				a: 0,
				o: '',
				b: 0,
				c: 0
			};
			let a, b;
			do {
				b = randomNumExcluding(range - 1, [0, 1]); // Exclude 0 and 1 for b
				const multiplier = randomNumExcluding(Math.floor(range / b), [0]); // Ensure multiplier is not zero
				a = b * multiplier; // Make sure a is a multiple of b
			} while (!ensureResultInRange(a, b, 'div'));

			const c = a / b;
			obj.a = a;
			obj.b = b;
			obj.o = '/';
			obj.c = c;
			return obj;
		}

		// Ensure that the result stays within the range
		function ensureResultInRange(a, b, operation) {
			switch (operation) {
				case 'add':
					return a + b <= range;
				case 'sub':
					return a - b >= 0;
				case 'mul':
					return a * b <= range;
				case 'div':
					return b !== 0 && a % b === 0 && a / b <= range;
				default:
					return false;
			}
		}

		// Generate problems based on selected fact type
		function generateProblem(fact) {
			switch (fact) {
				case 0:
					return generateAddition();
				case 1:
					return generateSubtraction();
				case 2:
					return generateMultiplication();
				case 3:
					return generateDivision();
				case 4:
					return Math.random() > 0.5 ? generateAddition() : generateSubtraction();
				case 5:
					return Math.random() > 0.5 ? generateAddition() : generateMultiplication();
				case 6:
					return Math.random() > 0.5 ? generateMultiplication() : generateDivision();
				case 7:
					// Mix all operations
					const randomFact = Math.floor(Math.random() * 4);
					return generateProblem(randomFact);
				default:
					return 'Invalid fact type.';
			}
		}

		// Generate the specified number of problems
		for (let i = 0; i < number; i++) {
			worksheet.push(generateProblem(fact));
		}

		console.log(worksheet);

		mathWorksheet.worksheet = worksheet;
		updateMathWorksheet(mathWorksheet);

		// return worksheet;
	}

	const generate = () => {
		let factId = factSelector?.getSelectedFactId();
		let number = numberSelector?.getSelectedNumber()[0];
		let range = rangeSelector?.getSelectedRange();
		blackWidth = 'w-4';
		if (range <=10) {
			blackWidth = 'w-4';
		} else if (range > 10 && range <=100) {
			blackWidth = 'w-6';
		} else if (range > 100 && range <=1000) {
			blackWidth = 'w-8';
		} else if (range > 1000 && range <=10000) {
			blackWidth = 'w-10';
		} else {
			blackWidth = 'w-12';
		}

		mathWorksheet.config.fact = factId;
		mathWorksheet.config.type = typeId;
		mathWorksheet.config.number = number;
		mathWorksheet.config.range = range;
		mathWorksheet.config.carrying = carrying;
		mathWorksheet.config.borrowing = borrowing;
		updateMathWorksheet(mathWorksheet);

		generateMathWorksheet(factId, number, range, carrying, borrowing);
	};
</script>

<div class="flex h-full flex-col">
	<div
		class="container flex flex-col items-center justify-between space-y-0 px-4 py-4 md:h-16 md:flex-row 2xl:px-0"
	>
		<h2 class="text-lg font-semibold">{m.math_bf_title()}</h2>
		<div class="space-y-2 md:space-y-0">
			<Button variant="secondary"><Print class="mr-1 h-4" /> {m.math_bf_print()}</Button>
			<Button variant="secondary" class="ml-2"><PDF class="mr-1 h-4" /> {m.math_bf_pdf()}</Button>
			<Button variant="secondary" class="ml-2"
				><PDF class="mr-1 h-4" /> {m.math_bf_pdf_answer()}</Button
			>
		</div>
	</div>
	<Separator />
	<div class="container h-full px-4 py-6 2xl:px-0">
		<Tabs.Root bind:value={type}>
			<div
				class="grid h-full grid-rows-[360px_1fr] items-stretch gap-6 md:grid-cols-[200px_1fr] md:grid-rows-1"
			>
				<div class="flex flex-col space-y-4 md:order-1">
					<ProblemsSelector bind:this={factSelector} />
					<div class="grid gap-2">
						<HoverCard.Root openDelay={200}>
							<HoverCard.Trigger asChild let:builder>
								<span
									class="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-sm"
									use:builder.action
									{...builder}
								>
									{m.math_bf_sb_o2_title()}
								</span>
							</HoverCard.Trigger>
							<HoverCard.Content class="w-[240px] text-sm" side="left">
								{m.math_bf_sb_o2_hover()}
							</HoverCard.Content>
						</HoverCard.Root>
						<Tabs.List class="grid grid-cols-3">
							<Tabs.Trigger value="horizontal">
								<HoverCard.Root>
									<HoverCard.Trigger>
										<span class="sr-only">{m.math_bf_sb_o2_h()}</span>
										<Horizontal />
									</HoverCard.Trigger>
									<HoverCard.Content class="w-[160px] text-sm">
										{m.math_bf_sb_o2_h()}
									</HoverCard.Content>
								</HoverCard.Root>
							</Tabs.Trigger>
							<Tabs.Trigger value="blank">
								<HoverCard.Root>
									<HoverCard.Trigger>
										<span class="sr-only">{m.math_bf_sb_o2_b()}</span>
										<Blank />
									</HoverCard.Trigger>
									<HoverCard.Content class="w-[160px] text-sm">
										{m.math_bf_sb_o2_b()}
									</HoverCard.Content>
								</HoverCard.Root>
							</Tabs.Trigger>
							<Tabs.Trigger value="vertical">
								<HoverCard.Root>
									<HoverCard.Trigger>
										<span class="sr-only">{m.math_bf_sb_o2_v()}</span>
										<Vertical />
									</HoverCard.Trigger>
									<HoverCard.Content class="w-[160px] text-sm">
										{m.math_bf_sb_o2_v()}
									</HoverCard.Content>
								</HoverCard.Root>
							</Tabs.Trigger>
						</Tabs.List>
					</div>
					<NumberSelector value={[20]} bind:this={numberSelector} />
					<RangeSelector bind:this={rangeSelector} />
					<!-- <Label for="number">Options</Label>
						<ToggleGroup.Root type="multiple">
							<ToggleGroup.Item value="carry" aria-label="Toggle carry" class="align-center px-4 py-2">
								<div>Carry</div>
							</ToggleGroup.Item>
							<ToggleGroup.Item value="borrow" aria-label="Toggle borrow" class="align-center px-4 py-2">
								<div>Borrow</div>
							</ToggleGroup.Item>
						</ToggleGroup.Root> -->
					<div class="flex items-center justify-between">
						<HoverCard.Root>
							<HoverCard.Trigger>
								<div class="flex items-center space-x-1">
									<Label for="carrying">{m.math_bf_sb_o5_title()}</Label>
									<Switch id="carrying" checked={carrying} onCheckedChange={updateCarrying} />
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								{m.math_bf_sb_o5_hover()}
							</HoverCard.Content>
						</HoverCard.Root>
						<HoverCard.Root>
							<HoverCard.Trigger>
								<div class="flex items-center space-x-1">
									<Label for="borrowing">{m.math_bf_sb_o6_title()}</Label>
									<Switch id="borrowing" checked={borrowing} onCheckedChange={updateBorrowing} />
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								{m.math_bf_sb_o6_hover()}
							</HoverCard.Content>
						</HoverCard.Root>
					</div>
					<div class="flex items-center justify-between">
						<Button on:click={generate} class="w-24">{m.math_bf_btn_generate()}</Button>
						<Button variant="secondary" class="w-24">
							<span class="sr-only">Show history</span>
							<CounterClockwiseClock class="h-4 w-4" />
						</Button>
					</div>
				</div>
				<div class="mt-4 md:order-2 md:mt-0">
					<Tabs.Content value="horizontal" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-8">
								{#if mathWorksheet?.worksheet?.length > 0}
									<div class="flex flex-wrap px-8">
										{#each mathWorksheet?.worksheet as { a, b, c, o }, i}
											<div class="mt-2 flex w-1/2 flex-shrink-0 items-center text-lg">
												<div class="mr-4 text-sm text-gray-200">
													{#if i < 9}0{/if}{i + 1}.
												</div>
												{a}
												{#if o === '*'}
													×
												{:else if o === '/'}
													÷
												{:else}
													{o}
												{/if}
												{b} =
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="blank" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-8">
								{#if mathWorksheet?.worksheet?.length > 0}
									<div class="flex flex-wrap px-8">
										{#each mathWorksheet?.worksheet as { a, b, c, o }, i}
											<div class="mt-2 flex w-1/2 flex-shrink-0 items-center text-lg">
												<div class="mr-4 text-sm text-gray-200">
													{#if i < 9}0{/if}{i + 1}.
												</div>
												{#if randomBoolean()}
													{a}
													{#if o === '*'}
													×
												{:else if o === '/'}
													÷
												{:else}
													{o}
												{/if}
												<div class="{blackWidth} h-4 border-solid border-b border-gray-200 mx-2">

												</div>
												{:else}
												<div class="{blackWidth} h-4 border-solid border-b border-gray-200 mr-2"></div>
													{#if o === '*'}
													×
												{:else if o === '/'}
													÷
												{:else}
													{o}
												{/if}
												{b}
												{/if}
												 = {c}
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="vertical" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-8">
								{#if mathWorksheet?.worksheet?.length > 0}
									<div class="flex flex-wrap px-8">
										{#each mathWorksheet?.worksheet as { a, b, c, o }, i}
											<div class="mb-1.6 flex w-1/5 text-lg">
												<div class="text-sm text-gray-200">
													{#if i < 9}0{/if}{i + 1}.
												</div>
												<div class="mx-4 mb-8 flex-1 pr-4 text-right">
													<div class="mr-9 flex flex-col">
														<div class="flex">
															<div class="flex-1"></div>
															<div class="flex-1">{a}</div>
														</div>
														<div class="flex">
															<div class="flex-1">
																{#if o === '*'}
																	×
																{:else if o === '/'}
																	÷
																{:else}
																	{o}
																{/if}
															</div>
															<div class="flex-1">{b}</div>
														</div>
													</div>
													<div class="border-cool-gray-800 border-t"></div>
													<div class="mr-9 flex">
														<div class="flex-1"></div>
														<div class="flex-1">&nbsp;</div>
													</div>
												</div>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</Tabs.Content>
				</div>
			</div>
		</Tabs.Root>
	</div>
	<!-- <div class="flex items-center justify-center">
		{#if mathWorksheet.config}
			{mathWorksheet.config.fact}
			{mathWorksheet.config.type}
			{mathWorksheet.config.number}
			{mathWorksheet.config.range}
			{mathWorksheet.config.carrying}
			{mathWorksheet.config.borrowing}
		{/if}
	</div> -->
</div>
