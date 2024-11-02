/* @jsxImportSource react */

import { withI18nPrefix } from "@acdh-oeaw/keystatic-lib";
import { config } from "@keystatic/core";

import { env } from "@/config/env.config";
import { defaultLocale } from "@/config/i18n.config";
import {
	createBlog,
	createEvents,
	createNews,
	createPages,
	createPartners,
} from "@/lib/keystatic/collections";
import { Logo } from "@/lib/keystatic/logo";
import {
	createImprint,
	createIndexPage,
	createMetadata,
	createNavigation,
	createSocialMedia,
} from "@/lib/keystatic/singletons";

export default config({
	collections: {
		[withI18nPrefix("blog", defaultLocale)]: createBlog(defaultLocale),
		[withI18nPrefix("events", defaultLocale)]: createEvents(defaultLocale),
		[withI18nPrefix("news", defaultLocale)]: createNews(defaultLocale),
		[withI18nPrefix("pages", defaultLocale)]: createPages(defaultLocale),
		[withI18nPrefix("partners", defaultLocale)]: createPartners(defaultLocale),
	},
	singletons: {
		[withI18nPrefix("imprint", defaultLocale)]: createImprint(defaultLocale),
		[withI18nPrefix("indexPage", defaultLocale)]: createIndexPage(defaultLocale),
		[withI18nPrefix("metadata", defaultLocale)]: createMetadata(defaultLocale),
		[withI18nPrefix("navigation", defaultLocale)]: createNavigation(defaultLocale),
		[withI18nPrefix("socialMedia", defaultLocale)]: createSocialMedia(defaultLocale),
	},
	storage:
		env.PUBLIC_KEYSTATIC_MODE === "github" &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
			? {
					kind: "github",
					repo: {
						owner: env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	ui: {
		brand: {
			mark() {
				return <Logo />;
			},
			name: "ATRIUM",
		},
		navigation: {
			data: [
				withI18nPrefix("events", defaultLocale),
				withI18nPrefix("news", defaultLocale),
				withI18nPrefix("partners", defaultLocale),
				withI18nPrefix("blog", defaultLocale),
			],
			pages: [
				withI18nPrefix("indexPage", defaultLocale),
				withI18nPrefix("pages", defaultLocale),
				withI18nPrefix("imprint", defaultLocale),
			],
			settings: [
				withI18nPrefix("metadata", defaultLocale),
				withI18nPrefix("navigation", defaultLocale),
				withI18nPrefix("socialMedia", defaultLocale),
			],
		},
	},
});
