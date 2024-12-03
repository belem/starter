<!-- <script lang="js">
	import { Icons } from '$lib/components/ui-enhanced/index';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button href="/auth/login" variant="ghost">Login</Button>
<Button href="/math" variant="ghost">Math</Button>

<Button on:click={toggleMode} variant="outline" size="icon">
	<Icons.sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Icons.moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button> -->

<script>
	import { Home } from "$lib/components/home";
	import * as m from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.title()} - {m.seo_math_title()}, {m.seo_schulte_title()}</title>
	<meta name="keywords" content="{m.seo_math_keywords()}, {m.seo_schulte_keywords()}">
	<meta name="description" content="{m.seo_description()}, {m.seo_math_description()}, {m.seo_schulte_description()}">
</svelte:head>
<Home />