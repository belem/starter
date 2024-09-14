<script lang="ts">
	import { Icons } from "../icons/index.js";
	import { page } from "$app/stores";
	import { cn } from "$lib/utils.js";
	import * as m from '$lib/paraglide/messages.js';
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icons.logo class="h-6 w-6" />
		<span class="hidden font-bold md:inline-block">
			{m.title()}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">
		<a
			href='./math'
			class={cn(
				"hover:text-foreground/80 transition-colors",
				$page.url.pathname.startsWith('math') ? "text-foreground" : "text-foreground/60"
			)}
		>
		{m.nav_math()}
		</a>
	</nav>
</div>
