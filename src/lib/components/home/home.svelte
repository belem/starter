<script lang="ts">
	import * as PageHeader from "$lib/components/ui-enhanced/page-header/index.js";
	import Announcement from "$lib/components/ui-enhanced/announcement.svelte";
	import {
		DashboardMainNav,
		Search,
		UserNav,
	} from "./index.js";
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="container relative pb-10">
	<PageHeader.Root>
		<Announcement />
		<PageHeader.Heading class="hidden md:block">Check out some examples</PageHeader.Heading>
		<PageHeader.Heading class="md:hidden">Examples</PageHeader.Heading>
		<PageHeader.Description>
			Dashboard, cards, authentication. Some examples built using the components. Use this as
			a guide to build your own.
		</PageHeader.Description>
		<section class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
			<Button href="/docs" class="rounded-[6px]">Get Started</Button>
			<Button href="/components" variant="outline" class="rounded-[6px]">Components</Button>
		</section>
	</PageHeader.Root>
</div>
