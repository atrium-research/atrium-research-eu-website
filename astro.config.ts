import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

// import { createConfig as createMdxConfig } from "./src/config/mdx.config";

const env = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
	adapter: node({
		mode: "standalone",
	}),
	base: env.PUBLIC_APP_BASE_PATH,
	/**
	 * Keep html whitespace handling (astro v6 default), instead of jsx-style whitespace stripping.
	 * Must match `astro.compressHTML` in `.oxfmtrc.json`.
	 */
	compressHTML: true,
	integrations: [
		icon({
			/** @see https://www.astroicon.dev/reference/configuration/#include */
			include: {
				lucide: [
					"check",
					"chevron-down",
					"chevron-right",
					"file-text",
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
				simpleIcons: ["bluesky", "linkedin", "x", "youtube"],
			},
		}),
		/** Only needed to make the astro jsx runtime work correctly. */
		mdx(),
		/**
		 * @see https://github.com/Thinkmill/keystatic/discussions/951
		 */
		react({
			include: ["**/content/**", "**/keystatic/**"],
		}),
		sitemap(),
	],
	/** Use `@/lib/keystatic/compile-mdx.ts` instead of astro's built-in markdown processor. */
	// // @ts-expect-error Astro types are incomplete.
	// markdown: {
	// 	...(await createMdxConfig()),
	// 	gfm: false,
	// 	smartypants: false,
	// 	syntaxHighlight: false,
	// },
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	redirects: {
		"/admin": {
			destination: env.PUBLIC_APP_BASE_PATH
				? `${env.PUBLIC_APP_BASE_PATH.replace(/\/$/, "")}/keystatic`
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
		/**
		 * Trust `Host` and `X-Forwarded-*` headers only for the app's own domain. Without this,
		 * astro uses `localhost` as the request origin, which breaks keystatic's github oauth
		 * `redirect_uri` and the origin check for form submissions.
		 */
		allowedDomains: env.PUBLIC_APP_BASE_URL
			? [{ hostname: new URL(env.PUBLIC_APP_BASE_URL).hostname }]
			: [],
	},
	server: {
		/** Required by keystatic. */
		host: "127.0.0.1",
		port: 3000,
	},
	site: env.PUBLIC_APP_BASE_URL,
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			/**
			 * Mirrors `compilerOptions.paths` in `tsconfig.json`. Astro only reads those when
			 * `compilerOptions.baseUrl` is set, which `oxlint-tsgolint` does not support.
			 */
			alias: {
				"@/": fileURLToPath(new URL("./src/", import.meta.url)),
				"~/": fileURLToPath(new URL("./", import.meta.url)),
			},
			/** `react-tweet` imports css modules, which need to be processed by vite in all environments. */
			noExternal: ["react-tweet"],
		},
	},
});
