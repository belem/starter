import * as m from '$lib/paraglide/messages.js';

const siteTitle = m.title();
const siteDescription = m.description();
const navMath = m.nav_math();
const game =  m.game_game();
const navSchulte = m.game_schulte();

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
    },
		{
      title: navSchulte,
      href: "/schulte"
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
		},
		{
			title: game,
			items: [
				{
					title: navSchulte,
					href: "/schulte",
					items: [],
				}
			]
		}
	],
}