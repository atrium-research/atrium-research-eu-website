import { createUrl, createUrlSearchParams, request } from "@acdh-oeaw/lib";

import { env } from "@/config/env.config";

type IsoDateString = string;

type ItemCategory =
	| "dataset"
	| "publication"
	| "tool-or-service"
	| "training-material"
	| "workflow";

interface ItemSearchResponse {
	hits: number;
	count: number;
	page: number;
	perpage: number;
	pages: number;
	order: Array<"label" | "score">;
	items: Array<{
		id: number;
		persistentId: string;
		category: ItemCategory;
		label: string;
		lastInfoUpdate: IsoDateString;
		description: string;
		contributors: Array<unknown>;
		properties: Array<unknown>;
		status: string;
		owner: string;
	}>;
	categories: {
		"tool-or-service": {
			count: number;
			checked: boolean;
			label: "Tools & Services";
		};
		"training-material": {
			count: number;
			checked: boolean;
			label: "Training Materials";
		};
		publication: {
			count: number;
			checked: boolean;
			label: "Publications";
		};
		dataset: {
			count: number;
			checked: boolean;
			label: "Datasets";
		};
		workflow: {
			count: number;
			checked: boolean;
			label: "Workflows";
		};
		step: {
			count: number;
			checked: boolean;
			label: "Steps";
		};
	};
	facets: {
		activity: Record<string, { count: number; checked: boolean }>;
		source: Record<string, { count: number; checked: boolean }>;
		keyword: Record<string, { count: number; checked: boolean }>;
		language: Record<string, { count: number; checked: boolean }>;
	};
}

export async function getSshOpenMarketplaceItems() {
	const url = createUrl({
		baseUrl: env.PUBLIC_SSHOC_API_BASE_URL,
		pathname: "/api/item-search",
		searchParams: createUrlSearchParams({
			"f.keyword": "ATRIUM catalogue",
			order: "label",
			perpage: 100,
		}),
	});

	const data = (await request(url, { responseType: "json" })) as ItemSearchResponse;

	return { items: data.items, total: data.hits };
}

export function createSshOpenMarketplaceItemUrl(category: ItemCategory, persistentId: string): URL {
	const url = createUrl({
		baseUrl: env.PUBLIC_SSHOC_BASE_URL,
		pathname: `/${category}/${persistentId}`,
	});

	return url;
}
