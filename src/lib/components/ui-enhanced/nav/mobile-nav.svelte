<script lang="ts">
	import { Icons } from "../icons/index.js";
	import MobileLink from "./mobile-link.svelte";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { siteConfig } from "$lib/config/site.js";
	import * as m from '$lib/paraglide/messages.js';

	let open = false;
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
		>
			<Icons.Hamburger class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<MobileLink href="/" class="flex items-center" bind:open>
			<Icons.logo class="mr-2 h-4 w-4" />
			<span class="font-bold">{m.title()}</span>
		</MobileLink>
		<ScrollArea orientation="both" class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
			<!-- <div class="flex flex-col space-y-3">
						<MobileLink href="/math" bind:open class="text-foreground">
							{m.nav_math()}
						</MobileLink>
			</div> -->
			<div class="flex flex-col space-y-2">
					<div class="flex flex-col space-y-3 pt-6">
						<h4 class="font-medium">{m.nav_math()}</h4>
							<MobileLink href="/math" bind:open>
								{m.math_bf_title()}
									<span
										class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
									>
										1
									</span>
							</MobileLink>
					</div>
			</div>
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>
