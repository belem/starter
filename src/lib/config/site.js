import * as m from '$lib/paraglide/messages.js';

const siteTitle = m.title();
const siteDescription = m.description();
const navMath = m.nav_math();

export const siteConfig = {
	name: siteTitle,
	url: "https://kuibu",
	ogImage: "https://shadcn-svelte.com/og.png",
	description: siteDescription,
	links: {
		twitter: "https://twitter.com/",
		github: "https://github.com/",
	},
	keywords: siteTitle,
  nav: [
    {
      title: navMath,
      href: "/math"
    }
  ],
  sidebarNav: [
		{
			title: navMath,
			items: [
				{
					title: navMath,
					href: "/math",
					items: [],
				}
			]
		}
	],
}