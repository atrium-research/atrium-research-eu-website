import { createPreset } from "@acdh-oeaw/tailwindcss-preset";
import type { Config } from "tailwindcss";

const preset = createPreset();

const config: Config = {
	content: [
		"./keystatic.config.tsx",
		"./content/**/*.@(md|mdx)",
		"./src/@(components|layouts|pages)/**/*.@(astro|css|ts|tsx)",
		"./src/styles/**/*.css",
	],
	presets: [preset],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#a6503e",
					intent: "#ae6051",
					light: "#ae503e",
					// text: "#ebdcca",
					/** Adjusted to fix color contrast. */
					text: "#f5ede3",
					bg: "#e8dac8",
					brown: "#3a3736",
				},
				/** @see https://drive.google.com/file/d/16XtcoYy2o6m58xbWXo8Ol1DW-7ehnAfx/view */
				"red-clay": "#a6503e",
				sunbleached: "#e8dac8",
				sandstone: "#d39770",
				granite: "#3a3736",
			},
			screens: {
				lg: "68rem",
			},
			typography(theme: (key: string) => string) {
				return {
					DEFAULT: {
						css: {
							maxWidth: "none",
							/** Don't add quotes around `blockquote`. */
							"blockquote p:first-of-type::before": null,
							"blockquote p:last-of-type::after": null,
							/** Don't add backticks around inline `code`. */
							"code::before": null,
							"code::after": null,
							a: {
								color: theme("colors.brand.DEFAULT"),
							},
						},
					},
				};
			},
		},
	},
};

export default config;
