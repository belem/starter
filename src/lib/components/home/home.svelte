<script lang="ts">
	import * as PageHeader from "$lib/components/ui-enhanced/page-header/index.js";
	import Announcement from "$lib/components/ui-enhanced/announcement.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as m from '$lib/paraglide/messages.js';
</script>

<div class="container relative pb-10">
	<PageHeader.Root>
		<Announcement />
		<PageHeader.Heading class="hidden md:block">{m.title()}</PageHeader.Heading>
		<PageHeader.Heading class="md:hidden">{m.title()}</PageHeader.Heading>
		<PageHeader.Description>
			{m.description()}
		</PageHeader.Description>
		<section class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
			<Button href="/docs" class="rounded-[6px]">Get Started</Button>
			<Button href="/components" variant="outline" class="rounded-[6px]">Components</Button>
		</section>
	</PageHeader.Root>
</div>
