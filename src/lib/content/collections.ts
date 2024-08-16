import { collection, fields } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createCollection } from "@/lib/content/create-collection";
import { createComponents, headingLevels } from "@/lib/content/create-components";
import { createCollectionPaths } from "@/lib/content/create-paths";
// import { createPreviewUrl } from "@/lib/content/create-preview-url";
import * as _fields from "@/lib/content/fields";

export const eventTags = [
	{ label: "Organised", value: "organised" },
	{ label: "Presented at", value: "presented-at" },
	{ label: "Supported", value: "supported" },
] as const;

export const partnerKinds = [
	{ label: "Research Infrastructure", value: "research-infrastructure" },
	{ label: "Beneficiary", value: "beneficiary" },
	{ label: "Affiliated Entity", value: "affiliated" },
] as const;

export const events = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/events/", locale);

	return collection({
		label: "Events",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/events/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			tags: fields.multiselect({
				label: "Tags",
				options: eventTags,
				defaultValue: [],
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			date: fields.date({
				label: "Start date",
				validation: { isRequired: true },
			}),
			endDate: fields.date({
				label: "End date",
				// validation: { isRequired: false },
			}),
			location: fields.text({
				label: "Location",
				validation: { isRequired: true },
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			bannerImage: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const news = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/news/", locale);

	return collection({
		label: "News",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/news/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			bannerImage: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const pages = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/pages/", locale);

	return collection({
		label: "Pages",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const partners = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/partners/", locale);

	return collection({
		label: "Partners",
		path: contentPath,
		slugField: "name",
		format: { data: "json" },
		// previewUrl: createPreviewUrl("/partners/{slug}"),
		entryLayout: "content",
		columns: ["name", "kind"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			kind: fields.select({
				label: "Kind",
				options: partnerKinds,
				defaultValue: "research-infrastructure",
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetPaths(assetPath),
			}),
			website: fields.url({
				label: "Website",
				validation: { isRequired: true },
			}),
		},
	});
});
