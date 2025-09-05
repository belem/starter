<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { SiteFooter } from '$lib/components/ui-enhanced/index';
	import * as Table from '$lib/components/ui/table';
	import * as m from '$lib/paraglide/messages.js';
	import { poem } from '$lib/config/poem.js';
	import { fade, fly } from 'svelte/transition';

	onMount(() => {});
</script>

<svelte:head>
	<title>课程表 一(3)班</title>
	<meta name="keywords" content="{m.seo_poem_keywords()}, {m.seo_poem_keywords()}" />
	<meta name="description" content="{m.seo_poem_description()}, {m.seo_poem_description()}" />
</svelte:head>

<h2 class="pb-4 text-lg font-semibold mt-4 flex flex-col items-center justify-center">
	课程表 一&lt;3&gt;班
</h2>

<div class="px-4">
	<div class="rounded-md border">
		<Table.Root>
			<Table.Caption>一(3)班课程表</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="text-center"></Table.Head>
					<Table.Head class="text-center">一</Table.Head>
					<Table.Head class="text-center">二</Table.Head>
					<Table.Head class="text-center">三</Table.Head>
					<Table.Head class="text-center">四</Table.Head>
					<Table.Head class="text-center">五</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="text-center">上 1</Table.Cell>
					<Table.Cell class="text-center">数学</Table.Cell>
					<Table.Cell class="text-center">数学</Table.Cell>
					<Table.Cell class="text-center">综合实践活动</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
					<Table.Cell class="text-center">科学</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="text-center">2</Table.Cell>
					<Table.Cell class="text-center">外语</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
					<Table.Cell class="text-center">科学</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="text-center">3</Table.Cell>
					<Table.Cell class="text-center">道德与法治</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
					<Table.Cell class="text-center">道德与法治</Table.Cell>
					<Table.Cell class="text-center">音乐</Table.Cell>
					<Table.Cell class="text-center">体育与健康</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="text-center">4</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
					<Table.Cell class="text-center">体育与健康</Table.Cell>
					<Table.Cell class="text-center">数学</Table.Cell>
					<Table.Cell class="text-center">外语</Table.Cell>
					<Table.Cell class="text-center">音乐</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="text-center">下 5</Table.Cell>
					<Table.Cell class="text-center">体育与健康</Table.Cell>
					<Table.Cell class="text-center">美术</Table.Cell>
					<Table.Cell class="text-center">体育与健康</Table.Cell>
					<Table.Cell class="text-center">体育与健康</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="text-center">6</Table.Cell>
					<Table.Cell class="text-center">语文</Table.Cell>
					<Table.Cell class="text-center">美术</Table.Cell>
					<Table.Cell class="text-center">班团队活动</Table.Cell>
					<Table.Cell class="text-center">劳动</Table.Cell>
					<Table.Cell class="text-center">外语项目化</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="text-center">7</Table.Cell>
					<Table.Cell class="text-center">作业</Table.Cell>
					<Table.Cell class="text-center">作业</Table.Cell>
					<Table.Cell class="text-center">作业</Table.Cell>
					<Table.Cell class="text-center">作业</Table.Cell>
					<Table.Cell class="text-center">作业</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell class="text-center">8</Table.Cell>
					<Table.Cell class="text-center">多元智能活动</Table.Cell>
					<Table.Cell class="text-center">兴趣活动</Table.Cell>
					<Table.Cell class="text-center">体育活动</Table.Cell>
					<Table.Cell class="text-center">体育活动</Table.Cell>
					<Table.Cell class="text-center">体育活动</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</div>
</div>

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
