import { getFormDataValues, log } from "@acdh-oeaw/lib";
import type { APIContext } from "astro";
import * as v from "valibot";

import { defaultLocale as locale } from "@/config/i18n.config";
import { createNewsletterSubscription } from "@/lib/baserow";
import { createI18n } from "@/lib/i18n";

export const prerender = false;

const NewsletterFormSchema = v.object({
	"accept-tos": v.literal("on"),
	email: v.pipe(v.string(), v.email()),
	lastName: v.pipe(v.string(), v.nonEmpty()),
	firstName: v.pipe(v.string(), v.nonEmpty()),
	institution: v.optional(v.string()),
	/** Honeypot field. */
	url: v.optional(v.string()),
});

export async function POST(context: APIContext) {
	const accept = context.request.headers.get("accept");
	// const referer = context.request.headers.get("referer");
	const formData = await context.request.formData();
	const result = await v.safeParseAsync(NewsletterFormSchema, getFormDataValues(formData));

	const { t } = await createI18n(locale);

	if (!result.success) {
		return Response.json({ message: t("actions.newsletter.invalid-input") }, { status: 400 });
	}

	if (result.output.url != null) {
		return Response.json({ message: t("actions.newsletter.invalid-input") }, { status: 400 });
	}

	try {
		await createNewsletterSubscription(result.output);

		if (accept === "application/json") {
			return Response.json({ message: t("actions.newsletter.success") }, { status: 200 });
		}

		return context.redirect("/success", 303);
	} catch (error) {
		log.error(error);

		if (accept === "application/json") {
			return Response.json({ message: t("actions.newsletter.unknown-error") }, { status: 500 });
		}

		return context.redirect(`/500?error=${t("actions.newsletter.unknown-error")}`, 303);
	}
}
