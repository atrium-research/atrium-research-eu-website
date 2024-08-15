import { fields, singleton } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createComponents, headingLevels } from "@/lib/content/create-components";
import { createSingletonPaths } from "@/lib/content/create-paths";
// import { createPreviewUrl } from "@/lib/content/create-preview-url";
import { createSingleton } from "@/lib/content/create-singleton";
import * as validation from "@/lib/content/validation";

export const socialMediaKinds = [
	{ label: "LinkedIn", value: "linkedin" },
	{ label: "Twitter", value: "twitter" },
	{ label: "YouTube", value: "youtube" },
] as const;

export const indexPage = createSingleton((locale) => {
	const { assetPath, contentPath } = createSingletonPaths("/index-page/", locale);

	return singleton({
		label: "Home page",
		path: contentPath,
		format: { data: "json" },
		// previewUrl: createPreviewUrl("/"),
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
							...createAssetPaths(assetPath),
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
						options: {
							heading: headingLevels,
							image: createAssetPaths(assetPath),
						},
						components: createComponents(assetPath, locale),
					}),
				},
				{
					label: "Main content",
				},
			),
		},
	});
});

export const imprint = createSingleton((locale) => {
	const { assetPath, contentPath } = createSingletonPaths("/imprint/", locale);

	return singleton({
		label: "Imprint",
		path: contentPath,
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
						options: {
							heading: headingLevels,
							image: createAssetPaths(assetPath),
						},
						components: createComponents(assetPath, locale),
					}),
				},
				{
					label: "Privacy policy",
				},
			),
		},
	});
});

export const metadata = createSingleton((locale) => {
	const { contentPath } = createSingletonPaths("/metadata/", locale);

	return singleton({
		label: "Metadata",
		path: contentPath,
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

export const navigation = createSingleton((locale) => {
	const { contentPath } = createSingletonPaths("/navigation/", locale);

	return singleton({
		label: "Navigation",
		path: contentPath,
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

export const socialMedia = createSingleton((locale) => {
	const { contentPath } = createSingletonPaths("/social-media/", locale);

	return singleton({
		label: "Social media",
		path: contentPath,
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
