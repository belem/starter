<script lang="ts">
	import CounterClockwiseClock from "svelte-radix/CounterClockwiseClock.svelte";
	import { NumberSelector, ProblemsSelector } from "./components/index";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
	import Label from "$lib/components/ui/label/label.svelte";
</script>

<div class="h-full flex-col flex">
	<div
		class="container px-4 2xl:px-0 flex flex-row items-center justify-between py-4 space-y-0 md:h-16"
	>
		<h2 class="text-lg font-semibold">Mathematics - Basic Facts</h2>
		<Button variant="secondary">Print</Button>
	</div>
	<Separator />
	<Tabs.Root value="horizontal" class="flex-1">
		<div class="container px-4 2xl:px-0 h-full py-6">
			<div class="grid h-full items-stretch gap-6 grid-rows-[300px_1fr] md:grid-cols-[200px_1fr]">
				<div class="flex-col space-y-4 flex md:order-1">
					<ProblemsSelector />
					<div class="grid gap-2">
						<HoverCard.Root openDelay={200}>
							<HoverCard.Trigger asChild let:builder>
								<span
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									use:builder.action
									{...builder}
								>
									Mode
								</span>
							</HoverCard.Trigger>
							<HoverCard.Content class="w-[320px] text-sm" side="left">
								Choose the interface that best suits your task. You can provide: a
								simple prompt to complete, starting and ending text to insert a
								completion within, or some text with instructions to edit it.
							</HoverCard.Content>
						</HoverCard.Root>
						<Tabs.List class="grid grid-cols-3">
							<Tabs.Trigger value="horizontal">
								<span class="sr-only">Horizontal Form</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="none"
									class="h-5 w-5"
								>
									<rect
										x="4"
										y="3"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="7"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="13"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
								</svg>
							</Tabs.Trigger>
							<Tabs.Trigger value="blank">
								<span class="sr-only">Fill in the Blank</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="none"
									class="h-5 w-5"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="13"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
								</svg>
							</Tabs.Trigger>
							<Tabs.Trigger value="vertical">
								<span class="sr-only">Vertical Form</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="none"
									class="h-5 w-5"
								>
									<rect
										x="4"
										y="3"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="7"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="15"
										width="4"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<path
										d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
										fill="currentColor"
									/>
								</svg>
							</Tabs.Trigger>
						</Tabs.List>
					</div>
					<NumberSelector value={[20]} />
					<Label for="number">Options</Label>
					<ToggleGroup.Root type="multiple">
						<ToggleGroup.Item value="carry" aria-label="Toggle carry" class="align-center px-4 py-2">
							<div>Carry</div>
						</ToggleGroup.Item>
						<ToggleGroup.Item value="borrow" aria-label="Toggle borrow" class="align-center px-4 py-2">
							<div>Borrow</div>
						</ToggleGroup.Item>
					</ToggleGroup.Root>
				</div>
				<div class="md:order-2">
					<Tabs.Content value="horizontal" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<div placeholder="We is going to the market."
								class="rounded-md border min-h-80 flex-1 p-4"
							></div>
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
							<div
								class="rounded-md border min-h-80 flex-1 p-4"
							>B</div>
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
							<div
								class="rounded-md border min-h-80 flex-1 p-4"
							>V</div>
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
