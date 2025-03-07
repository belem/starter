<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { SiteFooter } from '$lib/components/ui-enhanced/index';
	import * as m from '$lib/paraglide/messages.js';
	import { poem } from '$lib/config/poem.js';
	import { fade, fly } from 'svelte/transition';

	let displayedPoems = [];
	let isRefreshing = false;
	let touchStartY = 0;
	let touchEndY = 0;

	function getRandomPoems() {
		// Create a copy of the poem array to avoid modifying the original
		const poemsCopy = [...poem];
		
		// Shuffle the array using Fisher-Yates algorithm
		for (let i = poemsCopy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[poemsCopy[i], poemsCopy[j]] = [poemsCopy[j], poemsCopy[i]];
		}

		// Return first 5 poems
		return poemsCopy.slice(0, 5);
	}

	function refreshPoems() {
		if (isRefreshing) return;

		isRefreshing = true;
		displayedPoems = getRandomPoems();

		// Reset refresh state after animation
		setTimeout(() => {
			isRefreshing = false;
		}, 500);
	}

	function handleTouchStart(event) {
		touchStartY = event.touches[0].clientY;
	}

	function handleTouchMove(event) {
		touchEndY = event.touches[0].clientY;
	}

	function handleTouchEnd() {
		// If user pulls down more than 100 pixels
		if (touchEndY - touchStartY > 100 && window.scrollY === 0) {
			refreshPoems();
		}
	}

	onMount(() => {
		// Initial poem selection
		displayedPoems = getRandomPoems();

		// Add touch event listeners
		window.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchEnd);

		// Cleanup event listeners
		return () => {
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	});
</script>

<svelte:head>
	<title>{m.title()} - {m.seo_poem_title()}</title>
	<meta name="keywords" content="{m.seo_poem_keywords()}, {m.seo_poem_keywords()}" />
	<meta name="description" content="{m.seo_poem_description()}, {m.seo_poem_description()}" />
</svelte:head>

<h2 class="pb-4 text-lg font-semibold mt-4 flex flex-col items-center justify-center">{m.poem_title()}</h2>	

<div 
	class="px-4 items-center justify-center"
>
	<div 
		class="poem shadow-sm rounded-lg border border-gray-100 dark:border-gray-600 flex flex-col md:px-8 md:grid md:grid-cols-4 gap-0 md:items-center md:justify-center {isRefreshing ? 'animate-pulse' : ''}"
	>
		{#each displayedPoems as poemItem (poemItem.name)}
			<div 
				transition:fly={{ y: 50, duration: 300 }}
				class="hover:shadow-sm transition-all duration-300 ease-in-out transform hover:-translate-y-1"
			>
				{#if poemItem.url}
					<a href={poemItem.url} rel="noopener noreferrer" class="p-4 border-solid border-b-[1px] border-gray-100 dark:border-gray-600 flex flex-col gap-2 items-center justify-center">
						<h2 class="text-xl font-bold text-gray-800 dark:text-white">{poemItem.name}</h2>
						<p class="text-gray-500 md:mt-[-10px] text-md">{poemItem.author}</p>
					</a>
				{:else}
					<div class="p-4 border-solid border-b-[1px] border-gray-100 dark:border-gray-600 flex flex-row md:flex-col gap-2 items-center justify-center">
						<h2 class="text-xl font-bold text-gray-800 dark:text-white">{poemItem.name}</h2>
						<p class="text-gray-500 md:mt-[-10px] text-md">{poemItem.author}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-4 text-center text-gray-100 text-sm">
		{m.poem_pull_down()}
	</div>
</div>

<div class="md:rounded-lg md:border md:border-gray-100 z-1 fixed md:static bottom-0 left-0 w-screen md:w-auto grid grid-cols-3 justify-items-stretch mx-0 md:mx-4 md:mt-4 text-muted-foreground text-center text-md p-4 backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60 border-solid border-t-[1px] border-gray-100 dark:border-gray-600 hover:shadow-sm transition-all duration-300 ease-in-out transform hover:-translate-y-1">
	<a href="https://haitang.app/collections/423">沪教版</a> 
	<a href="https://haitang.app/collections/421">苏教版</a>
	<a href="https://haitang.app/collections/420">人教版</a>
</div>

<!-- <div class="schulte flex h-full flex-col">
	<h2 class="text-lg font-semibold">{m.poem_title()}</h2>

	<div class="mt-4">
		 
	</div>
	<SiteFooter></SiteFooter>
</div> -->

<style>
	::-webkit-scrollbar {
		width: 6px;
	}
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 3px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
