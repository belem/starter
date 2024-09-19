<script lang="ts">
	import Moon from "svelte-radix/Moon.svelte";
	import Sun from "svelte-radix/Sun.svelte";
	import AutoTheme from "$lib/components/ui-enhanced/icons/auto-theme.svelte";
	import { resetMode, setMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as m from '$lib/paraglide/messages.js';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="h-8 w-8 px-0">
			<Sun
				class="dark:-roate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => setMode("light")}><Sun class="dark:-roate-90 h-[1.0rem] w-[1.0rem] rotate-0 scale-100 transition-all mr-1" /> {m.nav_theme_light()}</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => setMode("dark")}><Moon class="h-[1.0rem] w-[1.0rem] rotate-0 scale-100 transition-all dark:rotate-0 mr-1" /> {m.nav_theme_dark()}</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => resetMode()}>
			<AutoTheme class="mr-1 h-[1.0rem] w-[1.0rem]" />{m.nav_theme_system()}</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
