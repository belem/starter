<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n'

	import '../app.css';
	import { SiteFooter, SiteHeader, TailwindIndicator } from '$lib/components/ui-enhanced/index';
	import { ModeWatcher } from "mode-watcher";
	import { dev } from '$app/environment';
</script>
<ParaglideJS {i18n}>


<ModeWatcher />
<SiteHeader></SiteHeader>
<slot></slot>
<SiteFooter></SiteFooter>
{#if dev}
	<TailwindIndicator></TailwindIndicator>
{/if}

</ParaglideJS>