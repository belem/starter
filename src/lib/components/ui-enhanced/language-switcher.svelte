<script>
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { i18n } from '$lib/i18n.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import Language from './icons/language.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import '/node_modules/flag-icons/css/flag-icons.min.css';
	import { onMount } from 'svelte';

	let currentLanguage = $state(languageTag());
	let flag = $state('gb');
	onMount(() => {
		if (currentLanguage === 'en') {
			flag = 'us';
		} else {
			flag = currentLanguage;
		}
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]}>
			<span class="fi fi-{flag}"></span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-36">
		<DropdownMenu.RadioGroup bind:value={currentLanguage}>
			{#each availableLanguageTags as lang}
				<DropdownMenu.RadioItem value={lang}>
					<a
						href={i18n.route($page.url.pathname)}
						hreflang={lang}
						aria-current={lang === languageTag() ? 'page' : undefined}
					>
						{#if lang === 'de'}
							<span class="fi fi-de"></span> Deutsch
						{:else if lang === 'cn'}
							<span class="fi fi-cn"></span> 简体中文
						{:else}
							<span class="fi fi-us"></span> English
						{/if}
					</a>
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
