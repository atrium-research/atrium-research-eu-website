import baseConfig from "@acdh-oeaw/eslint-config";
import astroConfig from "@acdh-oeaw/eslint-config-astro";
import playwrightConfig from "@acdh-oeaw/eslint-config-playwright";
import reactConfig from "@acdh-oeaw/eslint-config-react";
import solidJsConfig from "@acdh-oeaw/eslint-config-solid";
import tailwindcssConfig from "@acdh-oeaw/eslint-config-tailwindcss";
import gitignore from "eslint-config-flat-gitignore";
import nodePlugin from "eslint-plugin-n";

const reactFiles = [
	"keystatic.config.@(ts|tsx)",
	"**/content/**/*.@(ts|tsx)",
	"**/keystatic/**/*.@(ts|tsx)",
];

const config = [
	gitignore({ strict: false }),
	...baseConfig,
	...astroConfig,
	...reactConfig.map((config) => {
		return {
			...config,
			files: reactFiles,
		};
	}),
	...solidJsConfig.map((config) => {
		return {
			...config,
			files: ["**/components/**/*.@(ts|tsx)", "**/ui/**/*.@(ts|tsx)"],
			ignores: reactFiles,
		};
	}),
	...tailwindcssConfig,
	...playwrightConfig,
	{
		rules: {
			"arrow-body-style": ["error", "always"],
			// "@typescript-eslint/explicit-module-boundary-types": "error",
			// "@typescript-eslint/require-array-sort-compare": "error",
			// "@typescript-eslint/strict-boolean-expressions": "error",
			"jsx-a11y/label-has-associated-control": "off",
		},
	},
	{
		plugins: {
			n: nodePlugin,
		},
		rules: {
			"n/prefer-node-protocol": "error",
		},
	},
	{
		files: ["!e2e/**"],
		rules: {
			"no-restricted-syntax": [
				"error",
				{
					selector: 'MemberExpression[computed!=true][object.name="process"][property.name="env"]',
					message: "Please use `@/config/env.config` instead.",
				},
			],
		},
	},
	{
		files: reactFiles,
		rules: {
			"react/jsx-sort-props": ["error", { reservedFirst: true }],
		},
	},
	{
		files: ["**/*.astro"],
		rules: {
			"astro/sort-attributes": "error",
		},
	},
];

export default config;
