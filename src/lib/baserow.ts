import { assert, createUrl, createUrlSearchParams, request } from "@acdh-oeaw/lib";

import { env } from "@/config/env.config";

interface Subscription {
	email: string;
	lastName: string;
	firstName: string;
	institution?: string;
}

export async function createNewsletterSubscription(subscription: Subscription) {
	assert(env.BASEROW_API_BASE_URL, "Missing baserow api base url.");
	assert(env.BASEROW_API_KEY, "Missing baserow api key.");
	assert(env.BASEROW_TABLE_ID, "Missing baserow table id.");

	const url = createUrl({
		baseUrl: env.BASEROW_API_BASE_URL,
		pathname: `/api/database/rows/table/${String(env.BASEROW_TABLE_ID)}/`,
		searchParams: createUrlSearchParams({ user_field_names: true }),
	});

	const data = await request(url, {
		method: "post",
		headers: {
			Authorization: `Token ${env.BASEROW_API_KEY}`,
		},
		body: {
			"Last name": subscription.lastName,
			"First name": subscription.firstName,
			"Email address": subscription.email,
			Institution: subscription.institution,
			Date: new Date().toISOString(),
			Subscribed: false,
		},
	});

	return data;
}
