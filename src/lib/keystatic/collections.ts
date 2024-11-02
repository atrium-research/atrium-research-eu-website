/* @jsxImportSource react */

import {
	createAssetOptions,
	createCollection,
	createContentFieldOptions,
} from "@acdh-oeaw/keystatic-lib";
import { collection, fields } from "@keystatic/core";

import { eventTags, partnerKinds } from "@/lib/keystatic/component-options";
import {
	createFigure,
	createFootnote,
	createGrid,
	createHeadingId,
	createLink,
	createLinkButton,
	createThumbnail,
	createTweet,
	createVideo,
} from "@/lib/keystatic/components";

export const createBlog = createCollection("/blog/", (paths, locale) => {
	return collection({
		label: "Blog",
		path: paths.contentPath,
		format: { contentField: "content" },
		slugField: "title",
		columns: ["title"],
		entryLayout: "content",
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
				...createAssetOptions(paths.assetPath),
			}),
			authors: fields.array(
				fields.text({
					label: "Name",
					validation: { isRequired: true },
				}),
				{
					label: "Authors",
					itemLabel(props) {
						return props.value;
					},
					validation: { length: { min: 1 } },
				},
			),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			bannerImage: fields.image({
				label: "Banner image",
				validation: { isRequired: false },
				...createAssetOptions(paths.assetPath),
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
				components: {
					...createFigure(paths.assetPath, locale),
					...createFootnote(paths.assetPath, locale),
					...createGrid(paths.assetPath, locale),
					...createHeadingId(paths.assetPath, locale),
					...createLink(paths.assetPath, locale),
					...createLinkButton(paths.assetPath, locale),
					...createThumbnail(paths.assetPath, locale),
					...createTweet(paths.assetPath, locale),
					...createVideo(paths.assetPath, locale),
				},
			}),
		},
	});
});

export const createEvents = createCollection("/events/", (paths, locale) => {
	return collection({
		label: "Events",
		path: paths.contentPath,
		format: { contentField: "content" },
		slugField: "title",
		columns: ["title"],
		entryLayout: "content",
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
				validation: { isRequired: false },
			}),
			location: fields.text({
				label: "Location",
				validation: { isRequired: true },
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetOptions(paths.assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			bannerImage: fields.image({
				label: "Banner image",
				validation: { isRequired: false },
				...createAssetOptions(paths.assetPath),
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
				components: {
					...createFigure(paths.assetPath, locale),
					...createFootnote(paths.assetPath, locale),
					...createGrid(paths.assetPath, locale),
					...createHeadingId(paths.assetPath, locale),
					...createLink(paths.assetPath, locale),
					...createLinkButton(paths.assetPath, locale),
					...createThumbnail(paths.assetPath, locale),
					...createTweet(paths.assetPath, locale),
					...createVideo(paths.assetPath, locale),
				},
			}),
		},
	});
});

export const createNews = createCollection("/news/", (paths, locale) => {
	return collection({
		label: "News",
		path: paths.contentPath,
		format: { contentField: "content" },
		slugField: "title",
		columns: ["title"],
		entryLayout: "content",
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
				...createAssetOptions(paths.assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			bannerImage: fields.image({
				label: "Banner image",
				validation: { isRequired: false },
				...createAssetOptions(paths.assetPath),
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
				components: {
					...createFigure(paths.assetPath, locale),
					...createFootnote(paths.assetPath, locale),
					...createGrid(paths.assetPath, locale),
					...createHeadingId(paths.assetPath, locale),
					...createLink(paths.assetPath, locale),
					...createLinkButton(paths.assetPath, locale),
					...createThumbnail(paths.assetPath, locale),
					...createTweet(paths.assetPath, locale),
					...createVideo(paths.assetPath, locale),
				},
			}),
		},
	});
});

export const createPages = createCollection("/pages/", (paths, locale) => {
	return collection({
		label: "Pages",
		path: paths.contentPath,
		format: { contentField: "content" },
		slugField: "title",
		columns: ["title"],
		entryLayout: "content",
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
				...createAssetOptions(paths.assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
				components: {
					...createFigure(paths.assetPath, locale),
					...createFootnote(paths.assetPath, locale),
					...createGrid(paths.assetPath, locale),
					...createHeadingId(paths.assetPath, locale),
					...createLink(paths.assetPath, locale),
					...createLinkButton(paths.assetPath, locale),
					...createThumbnail(paths.assetPath, locale),
					...createTweet(paths.assetPath, locale),
					...createVideo(paths.assetPath, locale),
				},
			}),
		},
	});
});

export const createPartners = createCollection("/partners/", (paths, _locale) => {
	return collection({
		label: "Partners",
		path: paths.contentPath,
		format: { data: "json" },
		slugField: "name",
		columns: ["name", "kind"],
		entryLayout: "content",
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
				...createAssetOptions(paths.assetPath),
			}),
			website: fields.url({
				label: "Website",
				validation: { isRequired: true },
			}),
		},
	});
});
