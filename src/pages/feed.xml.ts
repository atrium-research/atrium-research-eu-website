import { createUrl } from "@acdh-oeaw/lib";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { defaultLocale } from "@/config/i18n.config";
import { createI18n } from "@/lib/i18n";
import { createCollectionResource } from "@/lib/keystatic/resources";

export async function GET(context: APIContext) {
	const locale = defaultLocale;

	const { t } = await createI18n(locale);

	const metadata = t("metadata");

	const events = await createCollectionResource("events", locale).all();
	const news = await createCollectionResource("news", locale).all();

	return rss({
		title: metadata.title,
		description: metadata.description,

		site: context.site!,
		/** @see https://docs.astro.build/en/guides/rss/#generating-items */
		items: [
			...events.map((event) => {
				const { publicationDate, summary, title } = event.data;

				return {
					link: String(
						createUrl({ baseUrl: import.meta.env.SITE, pathname: `/events/${event.id}/` }),
					),
					title,
					pubDate: new Date(publicationDate),
					description: summary,
				};
			}),
			...news.map((item) => {
				const { publicationDate, summary, title } = item.data;

				return {
					link: String(createUrl({ baseUrl: import.meta.env.SITE, pathname: `/news/${item.id}/` })),
					title,
					pubDate: new Date(publicationDate),
					description: summary,
				};
			}),
		],
		customData: `<language>${locale}</language>`,
	});
}
