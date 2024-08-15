import { createUrl } from "@acdh-oeaw/lib";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { defaultLocale } from "@/config/i18n.config";
import { createReader } from "@/lib/content/create-reader";
import { createI18n } from "@/lib/i18n";

export async function GET(context: APIContext) {
	const locale = defaultLocale;

	const { t } = await createI18n(locale);

	const metadata = t("metadata");

	const reader = createReader();
	const events = await reader.collections.events.all();
	const news = await reader.collections.news.all();

	return rss({
		title: metadata.title,
		description: metadata.description,

		site: context.site!,
		/** @see https://docs.astro.build/en/guides/rss/#generating-items */
		items: [
			...events.map((event) => {
				return {
					link: String(
						createUrl({ baseUrl: import.meta.env.SITE, pathname: `/events/${event.slug}/` }),
					),
					title: event.entry.title,
					pubDate: new Date(event.entry.publicationDate),
					description: event.entry.summary,
				};
			}),
			...news.map((item) => {
				return {
					link: String(
						createUrl({ baseUrl: import.meta.env.SITE, pathname: `/events/${item.slug}/` }),
					),
					title: item.entry.title,
					pubDate: new Date(item.entry.publicationDate),
					description: item.entry.summary,
				};
			}),
		],
		customData: `<language>${locale}</language>`,
	});
}
