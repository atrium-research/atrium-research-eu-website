/* @jsxImportSource react */

import {
	createAssetOptions,
	createContentFieldOptions,
	createSingleton,
} from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

import { socialMediaKinds } from "@/lib/keystatic/component-options";
import { createVideo } from "@/lib/keystatic/components";
import * as validation from "@/lib/keystatic/validation";

export const createIndexPage = createSingleton("/index-page/", (paths, locale) => {
	return singleton({
		label: "Home page",
		path: paths.contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			hero: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					leadIn: fields.text({
						label: "Lead in",
						validation: { isRequired: true },
						multiline: true,
					}),
					images: fields.array(
						fields.image({
							label: "Image",
							validation: { isRequired: true },
							...createAssetOptions(paths.assetPath),
						}),
						{
							label: "Images",
							itemLabel(props) {
								return props.value?.filename ?? "Image";
							},
							validation: { length: { min: 1 } },
						},
					),
				},
				{
					label: "Hero section",
				},
			),
			main: fields.object(
				{
					content: fields.mdx({
						label: "Content",
						options: createContentFieldOptions(paths.assetPath),
						components: {
							// ...createFigure(paths.assetPath, locale),
							// ...createFootnote(paths.assetPath, locale),
							// ...createGrid(paths.assetPath, locale),
							// ...createHeadingId(paths.assetPath, locale),
							// ...createLink(paths.assetPath, locale),
							// ...createLinkButton(paths.assetPath, locale),
							// ...createThumbnail(paths.assetPath, locale),
							// ...createTweet(paths.assetPath, locale),
							...createVideo(paths.assetPath, locale),
						},
					}),
				},
				{
					label: "Main content",
				},
			),
			latest: fields.object(
				{
					items: fields.array(
						fields.object(
							{
								item: fields.conditional(
									fields.select({
										label: "Collection",
										options: [
											{ label: "Events", value: "events" },
											{ label: "News", value: "news" },
											{ label: "Tweets", value: "tweets" },
										],
										defaultValue: "events",
									}),
									{
										events: fields.relationship({
											label: "Event",
											validation: { isRequired: true },
											collection: "events",
										}),
										news: fields.relationship({
											label: "News",
											validation: { isRequired: true },
											collection: "news",
										}),
										tweets: fields.text({
											label: "Tweet ID",
											validation: { isRequired: true },
										}),
									},
								),
							},
							{
								label: "Item",
							},
						),
						{
							label: "Items",
							itemLabel(props) {
								if (props.fields.item.discriminant === "tweets" && props.fields.item.value.value) {
									return `Tweet ID ${props.fields.item.value.value}`;
								}

								return props.fields.item.value.value ?? props.fields.item.discriminant;
							},
							validation: { length: { min: 3 } },
						},
					),
				},
				{
					label: "Latest events and news",
				},
			),
		},
	});
});

export const createImprint = createSingleton("/imprint/", (paths, _locale) => {
	return singleton({
		label: "Imprint",
		path: paths.contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			privacyPolicy: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					content: fields.mdx({
						label: "Content",
						options: createContentFieldOptions(paths.assetPath),
						components: {
							// ...createFigure(paths.assetPath, locale),
							// ...createFootnote(paths.assetPath, locale),
							// ...createGrid(paths.assetPath, locale),
							// ...createHeadingId(paths.assetPath, locale),
							// ...createLink(paths.assetPath, locale),
							// ...createLinkButton(paths.assetPath, locale),
							// ...createThumbnail(paths.assetPath, locale),
							// ...createTweet(paths.assetPath, locale),
							// ...createVideo(paths.assetPath, locale),
						},
					}),
				},
				{
					label: "Privacy policy",
				},
			),
		},
	});
});

export const createMetadata = createSingleton("/metadata/", (paths, _locale) => {
	return singleton({
		label: "Metadata",
		path: paths.contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			title: fields.text({
				label: "Title",
				validation: { isRequired: true },
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true },
			}),
			twitter: fields.object(
				{
					creator: fields.text({
						label: "Creator",
						validation: { isRequired: true, pattern: validation.twitterHandle },
					}),
					site: fields.text({
						label: "Site",
						validation: { isRequired: true, pattern: validation.twitterHandle },
					}),
				},
				{
					label: "Twitter",
				},
			),
			manifest: fields.object(
				{
					name: fields.text({
						label: "Name",
						validation: { isRequired: true },
					}),
					"short-name": fields.text({
						label: "Short name",
						validation: { isRequired: true },
					}),
					description: fields.text({
						label: "Description",
						validation: { isRequired: true },
					}),
				},
				{
					label: "Webmanifest",
				},
			),
		},
	});
});

const links = {
	link: fields.object(
		{
			label: fields.text({
				label: "Label",
				validation: { isRequired: true },
			}),
			href: fields.url({
				label: "URL",
				validation: { isRequired: true },
			}),
		},
		{
			label: "Link",
		},
	),
	page: fields.object(
		{
			label: fields.text({
				label: "Label",
				validation: { isRequired: true },
			}),
			id: fields.relationship({
				label: "Page",
				validation: { isRequired: true },
				collection: "pages",
			}),
		},
		{
			label: "Page",
		},
	),
	separator: fields.empty(),
};

export const createNavigation = createSingleton("/navigation/", (paths, _locale) => {
	return singleton({
		label: "Navigation",
		path: paths.contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			links: fields.blocks(
				{
					link: {
						label: "Link",
						itemLabel(props) {
							return `${props.fields.label.value} (Link)`;
						},
						schema: links.link,
					},
					page: {
						label: "Page",
						itemLabel(props) {
							return `${props.fields.label.value} (Page)`;
						},
						schema: links.page,
					},
					separator: {
						label: "Separator",
						schema: links.separator,
					},
					menu: {
						label: "Menu",
						itemLabel(props) {
							return `${props.fields.label.value} (Menu)`;
						},
						schema: fields.object(
							{
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								links: fields.blocks(
									{
										link: {
											label: "Link",
											itemLabel(props) {
												return props.fields.label.value;
											},
											schema: links.link,
										},
										page: {
											label: "Page",
											itemLabel(props) {
												return `${props.fields.label.value} (Page)`;
											},
											schema: links.page,
										},
										separator: {
											label: "Separator",
											schema: links.separator,
										},
									},
									{
										label: "Links",
										validation: { length: { min: 1 } },
									},
								),
							},
							{
								label: "Menu",
							},
						),
					},
				},
				{
					label: "Links",
					validation: { length: { min: 1 } },
				},
			),
		},
	});
});

export const createSocialMedia = createSingleton("/social-media/", (paths, _locale) => {
	return singleton({
		label: "Social media",
		path: paths.contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			email: fields.text({
				label: "Email",
				validation: { isRequired: true, pattern: validation.email },
			}),
			links: fields.array(
				fields.object(
					{
						kind: fields.select({
							label: "Kind",
							options: socialMediaKinds,
							defaultValue: "youtube",
						}),
						href: fields.url({
							label: "URL",
							validation: { isRequired: true },
						}),
					},
					{
						label: "Social media link",
					},
				),
				{
					label: "Social media links",
					itemLabel(props) {
						return props.fields.href.value ?? props.fields.kind.value;
					},
					validation: { length: { min: 1 } },
				},
			),
		},
	});
});
