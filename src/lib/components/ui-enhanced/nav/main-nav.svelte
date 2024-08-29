<script lang="ts">
	import { Icons } from "../icons/index.js";
	import { page } from "$app/stores";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icons.logo class="h-6 w-6" />
		<span class="hidden font-bold md:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">
		{#each siteConfig.nav as nav}
		<a
			href={nav.href}
			class={cn(
				"hover:text-foreground/80 transition-colors",
				$page.url.pathname.startsWith(nav.href) ? "text-foreground" : "text-foreground/60"
			)}
		>
			{nav.title}
		</a>
		{/each}
	</nav>
</div>
