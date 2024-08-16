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
			/** @see https://drive.google.com/file/d/16XtcoYy2o6m58xbWXo8Ol1DW-7ehnAfx/view */
			colors: {
				"red-clay": {
					DEFAULT: "#a6503e",
					intent: "#ae6051",
					light: "#ae503e",
				},
				sunbleached: "#e8dac8",
				sandstone: "#d39770",
				granite: "#3a3736",
				positive: "#f5ede3",
				negative: "#f5ede3",
				text: "#f5ede3",
			},
			screens: {
				lg: "68rem",
			},
			typography(theme: (key: string) => string) {
				return {
					DEFAULT: {
						css: {
							"--tw-prose-bullets": "currentColor",
							fontSize: "1.0625rem",
							maxWidth: "none",
							/** Don't add quotes around `blockquote`. */
							"blockquote p:first-of-type::before": null,
							"blockquote p:last-of-type::after": null,
							/** Don't add backticks around inline `code`. */
							"code::before": null,
							"code::after": null,
							a: {
								color: theme("colors.red-clay.DEFAULT"),
							},
						},
					},
				};
			},
		},
	},
};

export default config;
