<script lang="ts">
	import * as PageHeader from "$lib/components/ui-enhanced/page-header/index.js";
	import Announcement from "$lib/components/ui-enhanced/announcement.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import Logo from "../ui-enhanced/icons/logo.svelte";
	import * as m from '$lib/paraglide/messages.js';
</script>

<div class="container relative pb-10">
	<PageHeader.Root>
		<!-- <Announcement /> -->
		<div class="flex text-4xl md:text-5xl font-medium gap-x-1 md:gap-x-3 mt-4 items-center text-gray-800 dark:text-white">
			<Logo class="h-10 w-10 md:h-12 md:w-12" /> {m.title()}
		</div>
		<div class="text-lg md:text-2xl text-gray-400 my-4">
			{m.description()}
		</div>
		<section class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-center justify-center py-4 md:pb-10">
			<Button href="/poem" variant="outline" class="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 dark:border-gray-700 rounded-[6px] p-4 py-8 text-xl">{m.poem_title()}</Button>
			<Button href="/mathquiz" variant="outline" class="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 dark:border-gray-700 rounded-[6px] p-4 py-8 text-xl">{m.qcz_title()}</Button>
			<Button href="/math" variant="outline" class="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 dark:border-gray-700 rounded-[6px] p-4 py-8 text-xl">{m.math_bf_title()}</Button>
			<Button href="/schulte" variant="outline" class="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 dark:border-gray-700 rounded-[6px] p-4 py-8 text-xl">{m.game_schulte()}</Button>
			<!-- <Button href="/auth/login" variant="outline" class="rounded-[6px]">{m.user_login()}</Button> -->
		</section>
	</PageHeader.Root>
</div>
