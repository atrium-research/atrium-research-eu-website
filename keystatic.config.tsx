import { config } from "@keystatic/core";

import { Logo } from "@/components/logo";
import { env } from "@/config/env.config";
import { defaultLocale } from "@/config/i18n.config";
import { blog, events, news, pages, partners } from "@/lib/content/collections";
import { imprint, indexPage, metadata, navigation, socialMedia } from "@/lib/content/singletons";

export default config({
	collections: {
		blog: blog(defaultLocale),
		events: events(defaultLocale),
		news: news(defaultLocale),
		pages: pages(defaultLocale),
		partners: partners(defaultLocale),
	},
	singletons: {
		imprint: imprint(defaultLocale),
		indexPage: indexPage(defaultLocale),
		metadata: metadata(defaultLocale),
		navigation: navigation(defaultLocale),
		socialMedia: socialMedia(defaultLocale),
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
			data: ["events", "news", "partners", "blog"],
			pages: ["indexPage", "pages", "imprint"],
			settings: ["metadata", "navigation", "socialMedia"],
		},
	},
});
