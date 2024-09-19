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
		<div class="flex text-5xl md:text-6xl gap-x-1 md:gap-x-3 mt-4 items-center">
			<Logo class="h-10 w-10 md:h-12 md:w-12" /> {m.title()}
		</div>
		<div class="text-lg md:text-2xl text-gray-400 my-4">
			{m.description()}
		</div>
		<section class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
			<Button href="/math" class="rounded-[6px]">{m.math_bf_title()}</Button>
			<Button href="/auth/login" variant="outline" class="rounded-[6px]">{m.user_login()}</Button>
		</section>
	</PageHeader.Root>
</div>
