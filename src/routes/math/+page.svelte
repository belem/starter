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
  import Print from '$lib/components/ui-enhanced/icons/print.svelte'

	import * as m from '$lib/paraglide/messages.js';

	const getKeyFromValue = (value) => {
    // Use Object.entries() to create an array of key-value pairs, then find the entry with the matching value
    return Object.entries(types).find(([key, val]) => val === value)?.[0];
	}

	let numberSelector, rangeSelector;

	let mathWorksheet = $state({});
	mathWorksheetStore.subscribe((value) => {
			mathWorksheet = value;
	});

	const updateMathWorksheet = (value) => {
		mathWorksheetStore.update(() => value);
	};

	const updateCarrying = () => {
		carrying = !carrying;
	}

	const updateBorrowing = () => {
		borrowing = !borrowing;
	}

	let type = $state('');
	let types = {
		'horizontal': 0,
		'blank': 1,
		'vertical': 2
	};

	let typeId = $derived(types[type]);
	let carrying = $state(false);
	let borrowing = $state(false);

	$effect(() => {
		mathWorksheet.config.type = typeId;
		mathWorksheet.config.number = numberSelector?.getSelectedNumber()[0];
		mathWorksheet.config.range = rangeSelector?.getSelectedRange();
		mathWorksheet.config.carrying = carrying;
		mathWorksheet.config.borrowing = borrowing;
		updateMathWorksheet(mathWorksheet);
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
		}

		if(!mathWorksheet.config || !Object.keys(mathWorksheet.config).length > 0) {
			updateMathWorksheet(mathWorksheetInit);
		} else {
			// carrying = mathWorksheet.config.carrying;
		}
	});
</script>

<div class="flex h-full flex-col">
	<div
		class="container flex flex-col md:flex-row items-center justify-between space-y-0 px-4 py-4 md:h-16 2xl:px-0"
	>
		<h2 class="text-lg font-semibold">{m.math_bf_title()}</h2>
		<div class="space-y-2 md:space-y-0">
			<Button variant="secondary"><Print class="h-4 mr-1" /> {m.math_bf_print()}</Button>
			<Button variant="secondary" class="ml-2"><PDF class="h-4 mr-1" /> {m.math_bf_pdf()}</Button>
			<Button variant="secondary" class="ml-2"><PDF class="h-4 mr-1" /> {m.math_bf_pdf_answer()}</Button>
		</div>
	</div>
	<Separator />
	<div class="container h-full px-4 py-6 2xl:px-0">
		<Tabs.Root bind:value={type}>
			<div
				class="grid h-full grid-rows-[360px_1fr] items-stretch gap-6 md:grid-cols-[200px_1fr] md:grid-rows-1"
			>
				<div class="flex flex-col space-y-4 md:order-1">
					<ProblemsSelector />
					<div class="grid gap-2">
						<HoverCard.Root openDelay={200}>
							<HoverCard.Trigger asChild let:builder>
								<span
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
					<NumberSelector value={[20]} bind:this={numberSelector}/>
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
									<Switch id="borrowing" checked={borrowing} onCheckedChange={updateBorrowing}/>
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								{m.math_bf_sb_o6_hover()}
							</HoverCard.Content>
						</HoverCard.Root>
					</div>
					<div class="flex items-center justify-between">
						<Button>{ m.math_bf_btn_generate()}</Button>
						<Button variant="secondary">
							<span class="sr-only">Show history</span>
							<CounterClockwiseClock class="h-4 w-4" />
						</Button>
					</div>
				</div>
				<div class="mt-4 md:order-2 md:mt-0">
					<Tabs.Content value="horizontal" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-4">H</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="blank" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-4">B</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="vertical" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-4">V</div>
						</div>
					</Tabs.Content>
				</div>
			</div>
		</Tabs.Root>
	</div>
	<div class="flex items-center justify-center">
		{#if mathWorksheet.config}
			{mathWorksheet.config.fact}
			{mathWorksheet.config.type}
			{mathWorksheet.config.number}
			{mathWorksheet.config.range}
			{mathWorksheet.config.carrying}
			{mathWorksheet.config.borrowing}
		{/if}
	</div>
</div>

<!-- {worksheet?.config.fact}
{worksheet?.config.number}
{worksheet?.config.range}
{worksheet?.config.type} -->
