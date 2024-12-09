<script lang="ts">
	import { onMount } from 'svelte';
	import { SiteFooter } from '$lib/components/ui-enhanced/index';
	import * as m from '$lib/paraglide/messages.js';
	onMount(() => {});
</script>

<svelte:head>
	<title>{m.title()} - {m.seo_schulte_title()} - Terms of Service</title>
	<meta name="keywords" content="{m.seo_keywords()}, {m.seo_schulte_keywords()}" />
	<meta name="description" content="{m.seo_description()}, {m.seo_schulte_description()}" />
</svelte:head>

<div class="schulte flex h-full flex-col">
	<h2 class="text-lg font-semibold">{m.title()} Terms of Service</h2>
	<div id="tos">
		<h3>Welcome to Kuibu!</h3>
		<h4>1. Acceptance of Terms</h4>
		<ol>
			<li>By using Kuibu, you agree that you have parental/guardian permission</li>
			<li>
				If you are under 18, you must have a parent or legal guardian's consent to use our platform
			</li>
		</ol>

		<h4>2. User Eligibility</h4>
		<ol>
			<li>Kuibu is designed for users aged 3-18</li>
			<li>Children under 18 may use Kuibu only with direct parental supervision</li>
			<li>Parents/guardians are responsible for monitoring their children's usage</li>
		</ol>

		<h4>3. Privacy and Safety</h4>
		<ol>
			<li>We don't collect personal information</li>
			<li>No user data is collected</li>
		</ol>

		<h4>4. User Conduct</h4>
		<ol>
			<li>Be kind and respectful to other users</li>
			<li>Do not share personal identifying information</li>
			<li>Report any concerning interactions immediately</li>
		</ol>

		<h4>6. Content Responsibility</h4>
		<ol>
			<li>Users are responsible for the content they create and share</li>
			<li>We reserve the right to remove any content violating our guidelines</li>
		</ol>

		<h4>7. Account Termination</h4>
		<ol>
			<li>Kuibu may terminate users that violate these terms</li>
			<li>Repeated violations will result in permanent platform ban</li>
		</ol>

		<h4>8. Contact Information</h4>
		For any questions or concerns, please contact: - Email: hi@live.com with title starts with "Kuibu:
		"

		<h4>9. Changes to Terms</h4>
		<ol>
			<li>We may update these terms periodically</li>
			<li>Parents will be notified of any significant changes</li>
			<li>Continued use of Kuibu implies acceptance of updated terms</li>
		</ol>

		<h4>Last Updated: Dec 9, 2024</h4> 
		<h4>Kuibu: Growing together, learning with joy</h4>
	</div>

	<SiteFooter></SiteFooter>
</div>

<style>
	#tos {
		text-align: left;
	}

	h4 {
		font-weight: 500;
		margin-top: 1rem;
	}

	ol {
		margin-left: 2rem;
	}

	ol li {
		list-style-type:circle;
	}
</style>
