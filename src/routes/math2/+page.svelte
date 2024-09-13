<script lang="ts">
	import CounterClockwiseClock from 'svelte-radix/CounterClockwiseClock.svelte';
	import { Horizontal, Blank, Vertical } from '$lib/components/ui-enhanced/icons/math/facts/index';
	import { NumberSelector, ProblemsSelector, RangeSelector } from './components/index';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	// import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as m from '$lib/paraglide/messages.js';
</script>

<div class="flex h-full flex-col">
	<div
		class="container flex flex-row items-center justify-between space-y-0 px-4 py-4 md:h-16 2xl:px-0"
	>
		<h2 class="text-lg font-semibold">{m.math_bf_title()}</h2>
		<Button variant="secondary">{m.math_bf_print()}</Button>
	</div>
	<Separator />
	<Tabs.Root value="horizontal" class="flex-1">
		<div class="container h-full px-4 py-6 2xl:px-0">
			<div class="grid h-full grid-rows-[300px_1fr] items-stretch gap-6 md:grid-cols-[200px_1fr]">
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
					<NumberSelector value={[20]} />
					<RangeSelector />
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
								<div class="flex items-center space-x-2">
									<Label for="carry">{m.math_bf_sb_o5_title()}</Label>
									<Switch id="carry" />
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								{m.math_bf_sb_o5_hover()}
							</HoverCard.Content>
						</HoverCard.Root>
						<HoverCard.Root>
							<HoverCard.Trigger>
								<div class="flex items-center space-x-2">
									<Label for="borrow">{m.math_bf_sb_o6_title()}</Label>
									<Switch id="borrow" />
								</div>
							</HoverCard.Trigger>
							<HoverCard.Content>
								{m.math_bf_sb_o6_hover()}
							</HoverCard.Content>
						</HoverCard.Root>
					</div>
				</div>
				<div class="md:order-2">
					<Tabs.Content value="horizontal" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-4"></div>
							<div class="flex items-center space-x-2">
								<Button>Generate</Button>
								<Button variant="secondary">
									<span class="sr-only">Show history</span>
									<CounterClockwiseClock class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="blank" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-4">B</div>
							<div class="flex items-center space-x-2">
								<Button>Generate</Button>
								<Button variant="secondary">
									<span class="sr-only">Show history</span>
									<CounterClockwiseClock class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="vertical" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div class="min-h-80 flex-1 rounded-md border p-4">V</div>
							<div class="flex items-center space-x-2">
								<Button>Generate</Button>
								<Button variant="secondary">
									<span class="sr-only">Show history</span>
									<CounterClockwiseClock class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</Tabs.Content>
				</div>
			</div>
		</div>
	</Tabs.Root>
</div>
