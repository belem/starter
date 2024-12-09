<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from "$lib/utils.js";
	import { page } from "$app/stores";
  import { SiteFooter } from '$lib/components/ui-enhanced/index';
	import * as m from '$lib/paraglide/messages.js';
	onMount(() => {
	});
</script>

<svelte:head>
	<title>{m.title()} - {m.seo_schulte_title()} - About</title>
	<meta name="keywords" content="{m.seo_keywords()}, {m.seo_schulte_keywords()}">
	<meta name="description" content="{m.seo_description()}, {m.seo_schulte_description()}">
</svelte:head>

<div class="schulte flex h-full flex-col">
	<h2 class="text-lg font-semibold">{m.about()}</h2>

  {m.title()}
  <br/><br/>
  {m.description()}
  <br/><br/>
  {m.seo_description()}

  <SiteFooter></SiteFooter>
 
</div>

<style>
	/* You can add your CSS styles here if needed */
</style>
