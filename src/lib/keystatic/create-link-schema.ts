import { createAssetOptions, withI18nPrefix } from "@acdh-oeaw/keystatic-lib";
import { fields } from "@keystatic/core";

import type { Locale } from "@/config/i18n.config";
import { linkKinds } from "@/lib/keystatic/component-options";

export function createLinkSchema(assetPath: `/${string}/`, locale: Locale) {
	return fields.conditional(
		fields.select({
			label: "Kind",
			options: linkKinds,
			defaultValue: "external",
		}),
		{
			download: fields.file({
				label: "Download",
				validation: { isRequired: true },
				...createAssetOptions(assetPath),
			}),
			external: fields.url({
				label: "URL",
				validation: { isRequired: true },
			}),
			"index-page": fields.empty(),
			blog: fields.relationship({
				label: "Blog post",
				validation: { isRequired: true },
				collection: withI18nPrefix("blog", locale),
			}),
			events: fields.relationship({
				label: "Event",
				validation: { isRequired: true },
				collection: withI18nPrefix("events", locale),
			}),
			news: fields.relationship({
				label: "News",
				validation: { isRequired: true },
				collection: withI18nPrefix("news", locale),
			}),
			pages: fields.relationship({
				label: "Page",
				validation: { isRequired: true },
				collection: withI18nPrefix("pages", locale),
			}),
			partners: fields.relationship({
				label: "Partner",
				validation: { isRequired: true },
				collection: withI18nPrefix("partners", locale),
			}),
		},
	);
}
