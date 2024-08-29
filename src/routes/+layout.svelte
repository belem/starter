<script>
	import '../app.css';
	import { SiteFooter, SiteHeader, TailwindIndicator } from '$lib/components/ui-enhanced/index';
	import { ModeWatcher } from "mode-watcher";
	import { dev } from '$app/environment';
</script>

<ModeWatcher />
<SiteHeader></SiteHeader>
<slot></slot>
<SiteFooter></SiteFooter>
{#if dev}
	<TailwindIndicator></TailwindIndicator>
{/if}
