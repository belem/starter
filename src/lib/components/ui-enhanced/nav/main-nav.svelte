<script lang="ts">
	import { Icons } from '../icons/index.js';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';
	import * as m from '$lib/paraglide/messages.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icons.logo class="h-6 w-6" />
		<span class="hidden font-bold md:inline-block">
			{m.title()}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="ghost"
					builders={[builder]}
					class="h-auto px-0 py-0 font-normal text-foreground/60 transition-colors hover:bg-transparent hover:text-foreground/80"
				>
					{m.nav_language()}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.RadioGroup>
					<DropdownMenu.RadioItem value="fff">
						<a href="./poem">
							{m.nav_poem()}
						</a>
					</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="ghost"
					builders={[builder]}
					class="h-auto px-0 py-0 font-normal text-foreground/60 transition-colors hover:bg-transparent hover:text-foreground/80"
				>
					{m.nav_math()}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.RadioGroup>
					<DropdownMenu.RadioItem value="fff">
						<a
							href="./math"
							class={cn(
								'transition-colors hover:text-foreground/80',
								$page.url.pathname.startsWith('math') ? 'text-foreground' : 'text-foreground/60'
							)}
						>
							{m.nav_math()}
						</a>
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="fff">
						<a
							href="./mathquiz"
							class={cn(
								'transition-colors hover:text-foreground/80',
								$page.url.pathname.startsWith('mathquiz') ? 'text-foreground' : 'text-foreground/60'
							)}
						>
							{m.qcz_title()}
						</a>
					</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<a
			href="./schulte"
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname.startsWith('schulte') ? 'text-foreground' : 'text-foreground/60'
			)}
		>
			{m.game_schulte()}
		</a>
		<a
			href="./timetable"
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname.startsWith('timetable') ? 'text-foreground' : 'text-foreground/60'
			)}
		>
		 Timetable
		</a>
		<a
			href="./about"
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname.startsWith('about') ? 'text-foreground' : 'text-foreground/60'
			)}
		>
			{m.about()}
		</a>
	</nav>
</div>
