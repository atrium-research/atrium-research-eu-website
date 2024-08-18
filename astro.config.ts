import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { loadEnv } from "vite";

// import { createConfig as createMdxConfig } from "./src/config/mdx.config";
import { ensureTrailingSlash } from "./src/lib/ensure-trailing-slash";

const env = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
	/**
	 * When switching to static site generation, place an empty `index.astro` file in
	 * the `src/pages` folder, so `astro` will generate a redirect to the default locale
	 * via `<meta http-equiv="refresh" content="0;url=/en/">`.
	 */
	adapter: node({
		mode: "standalone",
	}),
	base: env.PUBLIC_APP_BASE_PATH,
	integrations: [
		icon({
			/** @see https://www.astroicon.dev/reference/configuration/#include */
			include: {
				lucide: [
					"check",
					"chevron-down",
					// "linkedin",
					"mail",
					"menu",
					"message-circle",
					"search",
					"square-arrow-left",
					"triangle-alert",
					// "twitter",
					"x",
					// "youtube",
				],
				simpleIcons: ["linkedin", "x", "youtube"],
			},
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
		keystatic(),
		mdx(),
		/**
		 * @see https://docs.astro.build/en/guides/integrations-guide/solid-js/#combining-multiple-jsx-frameworks
		 * @see https://github.com/Thinkmill/keystatic/discussions/951
		 */
		react({ include: ["**/keystatic/*"] }),
		sitemap(),
	],
	/** Use `@/lib/content/get-mdx-content.ts` instead of astro's built-in markdown processor. */
	// // @ts-expect-error Astro types are incomplete.
	// markdown: {
	// 	...(await createMdxConfig(defaultLocale)),
	// 	gfm: false,
	// 	smartypants: false,
	// 	syntaxHighlight: false,
	// },
	output: "hybrid",
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	redirects: {
		"/admin": {
			destination: env.PUBLIC_APP_BASE_PATH
				? ensureTrailingSlash(env.PUBLIC_APP_BASE_PATH) + "/keystatic"
				: "/keystatic",
			status: 307,
		},
		"/events": {
			destination: "/events/tag/all",
			status: 307,
		},
	},
	scopedStyleStrategy: "where",
	security: {
		checkOrigin: true,
	},
	server: {
		port: 3000,
	},
	site: env.PUBLIC_APP_BASE_URL,
	vite: {
		ssr: {
			noExternal: ["react-tweet"],
		},
	},
});
