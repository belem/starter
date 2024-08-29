export const siteConfig = {
	name: "Kuibu",
	url: "https://kuibu",
	ogImage: "https://shadcn-svelte.com/og.png",
	description: "KB",
	links: {
		twitter: "https://twitter.com/",
		github: "https://github.com/",
	},
	keywords: `KB`,
  nav: [
    {
      title: "Math",
      href: "/math"
    }
  ],
  sidebarNav: [
		{
			title: "Math",
			items: [
				{
					title: "Math",
					href: "/math",
					items: [],
				}
			]
		}
	],
}