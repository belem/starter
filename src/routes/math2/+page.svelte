<script lang="ts">
	import CounterClockwiseClock from 'svelte-radix/CounterClockwiseClock.svelte';
	import { NumberSelector, ProblemsSelector } from './components/index';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	// import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as m from '$lib/paraglide/messages.js'
	import { languageTag } from '$lib/paraglide/runtime.js'
</script>

<div class="flex h-full flex-col">
	<div
		class="container flex flex-row items-center justify-between space-y-0 px-4 py-4 md:h-16 2xl:px-0"
	>
		<h2 class="text-lg font-semibold">Mathematics - Basic Facts</h2>
		<Button variant="secondary">Print</Button>
		{languageTag()}
		<h1>{m.hello_world()}</h1>
		<p>{m.greetings({ name: "param" })}</p>
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
									Mode
								</span>
							</HoverCard.Trigger>
							<HoverCard.Content class="w-[320px] text-sm" side="left">
								Mode: Horizontal Form, Fill in the Blank and Vertical Form
							</HoverCard.Content>
						</HoverCard.Root>
						<Tabs.List class="grid grid-cols-3">
							<Tabs.Trigger value="horizontal">
								<span class="sr-only">Horizontal Form</span>
								<svg
									width="20"
									viewBox="0 0 230 187"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M31.7685 0.181816V70H17.0071V14.1932H16.598L0.609375 24.2159V11.125L17.8935 0.181816H31.7685ZM69.2259 59.3636V11.0909H81.4304V59.3636H69.2259ZM51.1918 41.3295V29.125H99.4645V41.3295H51.1918ZM112.555 57.7273V46.1023L141.703 0.181816H151.726V16.2727H145.794L127.419 45.3523V45.8977H168.839V57.7273H112.555ZM146.067 70V54.1818L146.339 49.0341V0.181816H160.18V70H146.067ZM182.084 29.8409V17.7045H229.163V29.8409H182.084ZM182.084 52.4773V40.3409H229.163V52.4773H182.084ZM10.8111 186L39.7543 128.727V128.25H6.03835V116.182H55.027V128.42L26.0497 186H10.8111ZM97.9048 145.33V156.852H66.0639V145.33H97.9048ZM135.643 186.955C130.825 186.955 126.53 186.068 122.757 184.295C119.007 182.523 116.03 180.08 113.825 176.966C111.621 173.852 110.473 170.284 110.382 166.261H124.7C124.859 168.966 125.996 171.159 128.109 172.841C130.223 174.523 132.734 175.364 135.643 175.364C137.962 175.364 140.007 174.852 141.78 173.83C143.575 172.784 144.973 171.341 145.973 169.5C146.996 167.636 147.507 165.5 147.507 163.091C147.507 160.636 146.984 158.477 145.939 156.614C144.916 154.75 143.496 153.295 141.678 152.25C139.859 151.205 137.78 150.67 135.439 150.648C133.393 150.648 131.405 151.068 129.473 151.909C127.564 152.75 126.075 153.898 125.007 155.352L111.882 153L115.189 116.182H157.871V128.25H127.359L125.553 145.739H125.962C127.189 144.011 129.041 142.58 131.518 141.443C133.996 140.307 136.768 139.739 139.837 139.739C144.041 139.739 147.791 140.727 151.087 142.705C154.382 144.682 156.984 147.398 158.893 150.852C160.803 154.284 161.746 158.239 161.723 162.716C161.746 167.42 160.655 171.602 158.45 175.261C156.268 178.898 153.212 181.761 149.28 183.852C145.371 185.92 140.825 186.955 135.643 186.955ZM175.428 145.841V133.705H222.507V145.841H175.428ZM175.428 168.477V156.341H222.507V168.477H175.428Z"
										fill="#333333"
									/>
								</svg>
							</Tabs.Trigger>
							<Tabs.Trigger value="blank">
								<span class="sr-only">Fill in the Blank</span>
								<svg
									width="20"
									viewBox="0 0 244 187"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M31.8778 0.181816V70H17.1165V14.1932H16.7074L0.71875 24.2159V11.125L18.0028 0.181816H31.8778ZM69.3352 59.3636V11.0909H81.5398V59.3636H69.3352ZM51.3011 41.3295V29.125H99.5739V41.3295H51.3011ZM112.959 70V0.975996H181.983V70H112.959ZM118.719 64.24H176.223V6.736H118.719V64.24ZM195.974 36.7955V24.6932H243.054V36.7955H195.974ZM195.974 59.4318V47.3295H243.054V59.4318H195.974ZM3.41163 186V116.976H72.4356V186H3.41163ZM9.17163 180.24H66.6756V122.736H9.17163V180.24ZM115.78 145.33V156.852H83.9389V145.33H115.78ZM153.518 186.955C148.7 186.955 144.405 186.068 140.632 184.295C136.882 182.523 133.905 180.08 131.7 176.966C129.496 173.852 128.348 170.284 128.257 166.261H142.575C142.734 168.966 143.871 171.159 145.984 172.841C148.098 174.523 150.609 175.364 153.518 175.364C155.837 175.364 157.882 174.852 159.655 173.83C161.45 172.784 162.848 171.341 163.848 169.5C164.871 167.636 165.382 165.5 165.382 163.091C165.382 160.636 164.859 158.477 163.814 156.614C162.791 154.75 161.371 153.295 159.553 152.25C157.734 151.205 155.655 150.67 153.314 150.648C151.268 150.648 149.28 151.068 147.348 151.909C145.439 152.75 143.95 153.898 142.882 155.352L129.757 153L133.064 116.182H175.746V128.25H145.234L143.428 145.739H143.837C145.064 144.011 146.916 142.58 149.393 141.443C151.871 140.307 154.643 139.739 157.712 139.739C161.916 139.739 165.666 140.727 168.962 142.705C172.257 144.682 174.859 147.398 176.768 150.852C178.678 154.284 179.621 158.239 179.598 162.716C179.621 167.42 178.53 171.602 176.325 175.261C174.143 178.898 171.087 181.761 167.155 183.852C163.246 185.92 158.7 186.955 153.518 186.955ZM193.303 145.841V133.705H240.382V145.841H193.303ZM193.303 168.477V156.341H240.382V168.477H193.303Z"
										fill="#333333"
									/>
								</svg>
							</Tabs.Trigger>
							<Tabs.Trigger value="vertical">
								<span class="sr-only">Vertical Form</span>
								<svg
									width="20"
									viewBox="0 0 272 260"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M77.1477 192.364V144.091H89.3523V192.364H77.1477ZM59.1136 174.33V162.125H107.386V174.33H59.1136ZM164.915 190.727V179.102L194.062 133.182H204.085V149.273H198.153L179.778 178.352V178.898H221.199V190.727H164.915ZM198.426 203V187.182L198.699 182.034V133.182H212.54V203H198.426Z"
										fill="#333333"
									/>
									<path d="M6 223H266" stroke="black" stroke-width="12" stroke-linecap="round" />
									<path
										d="M195.325 108.955C190.234 108.955 185.7 108.08 181.723 106.33C177.768 104.557 174.643 102.125 172.348 99.0341C170.075 95.9205 168.905 92.3295 168.837 88.2614H183.7C183.791 89.9659 184.348 91.4659 185.371 92.7614C186.416 94.0341 187.803 95.0227 189.53 95.7273C191.257 96.4318 193.2 96.7841 195.359 96.7841C197.609 96.7841 199.598 96.3864 201.325 95.5909C203.053 94.7955 204.405 93.6932 205.382 92.2841C206.359 90.875 206.848 89.25 206.848 87.4091C206.848 85.5455 206.325 83.8977 205.28 82.4659C204.257 81.0114 202.78 79.875 200.848 79.0568C198.939 78.2386 196.666 77.8295 194.03 77.8295H187.518V66.9886H194.03C196.257 66.9886 198.223 66.6023 199.928 65.8295C201.655 65.0568 202.996 63.9886 203.95 62.625C204.905 61.2386 205.382 59.625 205.382 57.7841C205.382 56.0341 204.962 54.5 204.121 53.1818C203.303 51.8409 202.143 50.7955 200.643 50.0455C199.166 49.2955 197.439 48.9205 195.462 48.9205C193.462 48.9205 191.632 49.2841 189.973 50.0114C188.314 50.7159 186.984 51.7273 185.984 53.0455C184.984 54.3636 184.45 55.9091 184.382 57.6818H170.234C170.303 53.6591 171.45 50.1136 173.678 47.0455C175.905 43.9773 178.905 41.5795 182.678 39.8523C186.473 38.1023 190.757 37.2273 195.53 37.2273C200.348 37.2273 204.564 38.1023 208.178 39.8523C211.791 41.6023 214.598 43.9659 216.598 46.9432C218.621 49.8977 219.621 53.2159 219.598 56.8977C219.621 60.8068 218.405 64.0682 215.95 66.6818C213.518 69.2955 210.348 70.9545 206.439 71.6591V72.2045C211.575 72.8636 215.484 74.6477 218.166 77.5568C220.871 80.4432 222.212 84.0568 222.189 88.3977C222.212 92.375 221.064 95.9091 218.746 99C216.45 102.091 213.28 104.523 209.234 106.295C205.189 108.068 200.553 108.955 195.325 108.955Z"
										fill="#333333"
									/>
								</svg>
							</Tabs.Trigger>
						</Tabs.List>
					</div>
					<NumberSelector value={[20]} />
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
						<div class="flex items-center space-x-2">
							<Label for="carry">Carry</Label>
							<Switch id="carry" />
						</div>
						<div class="flex items-center space-x-2">
							<Label for="borrow">Borrow</Label>
							<Switch id="borrow" />
						</div>
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
