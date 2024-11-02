import type { ValueForReading } from "@keystatic/core";

import type { createLinkSchema } from "@/lib/keystatic/create-link-schema";

export type LinkSchema = ValueForReading<ReturnType<typeof createLinkSchema>>;

export function getLinkProps(params: LinkSchema) {
	switch (params.discriminant) {
		case "download": {
			return { download: true, href: params.value };
		}

		case "external": {
			return { href: params.value };
		}

		case "index-page": {
			return { href: "/" };
		}

		case "blog": {
			return { href: `/blog/${params.value}/` };
		}

		case "events": {
			return { href: `/events/${params.value}/` };
		}

		case "news": {
			return { href: `/news/${params.value}/` };
		}

		case "pages": {
			return { href: `/${params.value}/` };
		}

		case "partners": {
			return { href: `/partners/${params.value}/` };
		}
	}
}
