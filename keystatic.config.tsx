import { createUrl, pick } from "@acdh-oeaw/lib";
import {
	type Collection,
	collection,
	type ComponentSchema,
	config,
	fields,
	NotEditable,
	type Singleton,
	singleton,
} from "@keystatic/core";
import { block, mark, repeating, wrapper } from "@keystatic/core/content-components";
import {
	DownloadIcon,
	GridIcon,
	ImageIcon,
	InfoIcon,
	LinkIcon,
	ListIcon,
	SuperscriptIcon,
	TwitterIcon,
	VideoIcon,
} from "lucide-react";
import { Tweet } from "react-tweet";

import { Logo } from "@/components/logo";
import { createAssetPaths, createPreviewUrl } from "@/config/content.config";
import { env } from "@/config/env.config";
import { defaultLocale, type Locale } from "@/config/i18n.config";
import { useObjectUrl } from "@/lib/content/use-object-url";

function createCollection<T extends Record<string, ComponentSchema>, U extends string>(
	path: `/${string}/`,
	create: (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		path: Collection<any, any>["path"],
		assetPath: `/${string}/`,
		locale: Locale,
	) => Collection<T, U>,
) {
	return function createI18nCollection(locale = defaultLocale): Collection<T, U> {
		const collection = create(`./content/${locale}${path}**`, `/content/${locale}${path}`, locale);

		return collection;
	};
}

function createSingleton<T extends Record<string, ComponentSchema>>(
	path: `/${string}/`,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	create: (path: Singleton<any>["path"], assetPath: `/${string}/`, locale: Locale) => Singleton<T>,
) {
	return function createI18nCollection(locale = defaultLocale): Singleton<T> {
		const collection = create(`./content/${locale}${path}`, `/content/${locale}${path}`, locale);

		return collection;
	};
}

function createComponents(
	assetPath: `/${string}/`,
	components?: Array<
		| "Callout"
		| "Download"
		| "Figure"
		| "Footnote"
		| "Grid"
		| "GridItem"
		| "LinkButton"
		| "TableOfContents"
		| "Tweet"
		| "Video"
	>,
) {
	const allComponents = {
		Callout: wrapper({
			label: "Callout",
			description: "Additional information.",
			icon: <InfoIcon />,
			schema: {
				kind: fields.select({
					label: "Kind",
					/** @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts */
					options: [
						{ label: "Caution", value: "caution" },
						{ label: "Important", value: "important" },
						{ label: "Note", value: "note" },
						{ label: "Tip", value: "tip" },
						{ label: "Warning", value: "warning" },
					],
					defaultValue: "note",
				}),
			},
		}),
		Download: mark({
			label: "Download",
			// description: "A link to an uploaded file.",
			tag: "a",
			className: "underline decoration-dotted",
			icon: <DownloadIcon />,
			schema: {
				href: fields.file({
					label: "File",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
			},
		}),
		Figure: wrapper({
			label: "Figure",
			description: "An image with caption.",
			icon: <ImageIcon />,
			schema: {
				href: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				alt: fields.text({
					label: "Image description for screen readers",
					// validation: { isRequired: false },
				}),
			},
			ContentView(props) {
				const contentType = props.value.href?.extension === "svg" ? "image/svg+xml" : undefined;
				const url = useObjectUrl(props.value.href?.data ?? null, contentType);

				return (
					<NotEditable>
						<figure>
							<img alt={props.value.alt} src={url ?? undefined} />
							<figcaption>{props.children}</figcaption>
						</figure>
					</NotEditable>
				);
			},
		}),
		Footnote: mark({
			label: "Footnote",
			icon: <SuperscriptIcon />,
			className: "underline decoration-dotted align-super text-xs",
			schema: {},
		}),
		Grid: repeating({
			label: "Grid",
			description: "A grid layout.",
			icon: <GridIcon />,
			children: ["GridItem"],
			schema: {
				variant: fields.select({
					label: "Variant",
					options: [
						{
							label: "Two columns",
							value: "two-columns",
						},
						{
							label: "Three columns",
							value: "three-columns",
						},
						{
							label: "Four columns",
							value: "four-columns",
						},
						{
							label: "Two columns, right is 2x as wide",
							value: "one-two-columns",
						},
						{
							label: "Two columns, right is 3x as wide",
							value: "one-three-columns",
						},
						{
							label: "Two columns, right is 4x as wide",
							value: "one-four-columns",
						},
					],
					defaultValue: "two-columns",
				}),
			},
		}),
		GridItem: wrapper({
			label: "Grid item",
			description: "A grid cell.",
			icon: <GridIcon />,
			forSpecificLocations: true,
			schema: {},
		}),
		LinkButton: block({
			label: "Link button",
			description: "A link which looks like a button.",
			icon: <LinkIcon />,
			schema: {
				label: fields.text({
					label: "Label",
					validation: { isRequired: true },
				}),
				href: fields.url({
					label: "URL",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				return <NotEditable>{props.value.label}</NotEditable>;
			},
		}),
		TableOfContents: block({
			label: "Table of contents",
			description: "Insert a table of contents",
			icon: <ListIcon />,
			schema: {
				title: fields.text({
					label: "Title",
					// validation: { isRequired: false },
				}),
			},
		}),
		Tweet: block({
			label: "Tweet",
			description: "A tweet.",
			icon: <TwitterIcon />,
			schema: {
				id: fields.text({
					label: "ID",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				return (
					<NotEditable>
						<Tweet id={props.value.id} />
					</NotEditable>
				);
			},
		}),
		Video: block({
			label: "Video",
			description: "An embedded video.",
			icon: <VideoIcon />,
			schema: {
				provider: fields.select({
					label: "Video provider",
					options: [
						{
							label: "YouTube",
							value: "youtube",
						},
					],
					defaultValue: "youtube",
				}),
				id: fields.text({
					label: "Video ID",
					validation: { isRequired: true },
				}),
				caption: fields.text({
					label: "Caption",
					// validation: { isRequired: false },
				}),
			},
			ContentView(props) {
				const { caption, id } = props.value;

				const href = String(
					createUrl({
						baseUrl: "https://www.youtube-nocookie.com",
						pathname: `/embed/${id}`,
					}),
				);

				return (
					<NotEditable>
						<figure>
							<iframe allowFullScreen={true} src={href} title="Video" />
							{caption ? <figcaption>{caption}</figcaption> : null}
						</figure>
					</NotEditable>
				);
			},
		}),
	};

	if (components == null) return allComponents;

	return pick(allComponents, components);
}

const collections = {
	events: createCollection("/events/", (path, assetPath) => {
		return collection({
			label: "Events",
			path,
			slugField: "title",
			format: { contentField: "content" },
			previewUrl: createPreviewUrl("/{slug}"),
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
					options: [
						{ label: "Endorsed", value: "endorsed" },
						{ label: "Organised", value: "organised" },
						{ label: "Presented at", value: "presented-at" },
						{ label: "Supported", value: "supported" },
					],
					defaultValue: [],
				}),
				publicationDate: fields.date({
					label: "Publication date",
					validation: { isRequired: true },
					defaultValue: { kind: "today" },
				}),
				date: fields.date({
					label: "Date",
					validation: { isRequired: true },
				}),
				endDate: fields.date({
					label: "Date",
					// validation: { isRequired: false },
				}),
				location: fields.text({
					label: "Location",
					validation: { isRequired: true },
				}),
				image: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				summary: fields.text({
					label: "Summary",
					multiline: true,
					validation: { isRequired: true },
				}),
				content: fields.mdx({
					label: "Content",
					options: {
						image: createAssetPaths(assetPath),
					},
					components: createComponents(assetPath),
				}),
			},
		});
	}),
	news: createCollection("/news/", (path, assetPath) => {
		return collection({
			label: "News",
			path,
			slugField: "title",
			format: { contentField: "content" },
			previewUrl: createPreviewUrl("/{slug}"),
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
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				summary: fields.text({
					label: "Summary",
					multiline: true,
					validation: { isRequired: true },
				}),
				content: fields.mdx({
					label: "Content",
					options: {
						image: createAssetPaths(assetPath),
					},
					components: createComponents(assetPath),
				}),
			},
		});
	}),
	pages: createCollection("/pages/", (path, assetPath) => {
		return collection({
			label: "Pages",
			path,
			slugField: "title",
			format: { contentField: "content" },
			previewUrl: createPreviewUrl("/{slug}"),
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
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				summary: fields.text({
					label: "Summary",
					multiline: true,
					validation: { isRequired: true },
				}),
				content: fields.mdx({
					label: "Content",
					options: {
						image: createAssetPaths(assetPath),
					},
					components: createComponents(assetPath),
				}),
			},
		});
	}),
	partners: createCollection("/partners/", (path, assetPath) => {
		return collection({
			label: "Partners",
			path,
			slugField: "name",
			format: { data: "json" },
			previewUrl: createPreviewUrl("/{slug}"),
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
					options: [
						{ label: "Research Infrastructure", value: "research-infrastructure" },
						{ label: "Beneficiary", value: "beneficiary" },
						{ label: "Affiliated Entity", value: "affiliated" },
					],
					defaultValue: "research-infrastructure",
				}),
				image: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				website: fields.url({
					label: "Website",
					validation: { isRequired: true },
				}),
			},
		});
	}),
};

const singletons = {
	indexPage: createSingleton("/index-page/", (path, assetPath) => {
		return singleton({
			label: "Home page",
			path,
			format: { data: "json" },
			entryLayout: "form",
			previewUrl: createPreviewUrl("/"),
			schema: {
				hero: fields.object(
					{
						title: fields.text({
							label: "Title",
							validation: { isRequired: true },
						}),
						images: fields.array(
							fields.image({
								label: "Image",
								...createAssetPaths(assetPath),
								validation: { isRequired: true },
							}),
							{
								label: "Images",
								itemLabel(props) {
									return props.value?.filename ?? "Image";
								},
								validation: { length: { min: 1 } },
							},
						),
						leadIn: fields.text({
							label: "Lead in",
							multiline: true,
							validation: { isRequired: true },
						}),
					},
					{
						label: "Hero section",
					},
				),
				main: fields.object(
					{
						content: fields.mdx({
							label: "Content",
						}),
					},
					{ label: "Main content" },
				),
			},
		});
	}),
	metadata: createSingleton("/metadata/", (path, _assetPath) => {
		return singleton({
			label: "Metadata",
			path,
			format: { data: "json" },
			entryLayout: "form",
			schema: {
				title: fields.text({
					label: "Site title",
					validation: { isRequired: true },
				}),
				shortTitle: fields.text({
					label: "Short site title",
					validation: { isRequired: true },
				}),
				description: fields.text({
					label: "Site description",
					validation: { isRequired: true },
				}),
				twitter: fields.text({
					label: "Twitter handle",
					// validation: { isRequired: false },
				}),
			},
		});
	}),
	navigation: createSingleton("/navigation/", (path, _assetPath) => {
		return singleton({
			label: "Navigation",
			path,
			format: { data: "json" },
			entryLayout: "form",
			schema: {
				links: fields.blocks(
					{
						link: {
							label: "Link",
							itemLabel(props) {
								return props.fields.label.value + " (Link)";
							},
							schema: fields.object({
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								href: fields.url({
									label: "URL",
									validation: { isRequired: true },
								}),
							}),
						},
						page: {
							label: "Page",
							itemLabel(props) {
								return props.fields.label.value + " (Page)";
							},
							schema: fields.object({
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								reference: fields.relationship({
									label: "Page",
									collection: "pages",
									validation: { isRequired: true },
								}),
							}),
						},
						menu: {
							label: "Menu",
							itemLabel(props) {
								return props.fields.label.value + " (Menu)";
							},
							schema: fields.object({
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								links: fields.blocks(
									{
										link: {
											label: "Link",
											itemLabel(props) {
												return props.fields.label.value + " (Link)";
											},
											schema: fields.object(
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
										},
										page: {
											label: "Page",
											itemLabel(props) {
												return props.fields.label.value + " (Page)";
											},
											schema: fields.object(
												{
													label: fields.text({
														label: "Label",
														validation: { isRequired: true },
													}),
													reference: fields.relationship({
														label: "Page",
														collection: "pages",
														validation: { isRequired: true },
													}),
												},
												{
													label: "Page",
												},
											),
										},
										separator: {
											label: "Separator",
											schema: fields.empty(),
										},
									},
									{
										label: "Links",
										validation: { length: { min: 1 } },
									},
								),
							}),
						},
					},
					{
						label: "Links",
						validation: { length: { min: 1 } },
					},
				),
			},
		});
	}),
};

export default config({
	ui: {
		brand: {
			name: "ATRIUM",
			// @ts-expect-error `ReactNode` is a valid return type.
			mark: Logo,
		},
		navigation: {
			Pages: ["indexPage", "pages"],
			Data: ["events", "news", "partners"],
			Navigation: ["navigation"],
			Settings: ["metadata"],
		},
	},
	storage:
		/**
		 * @see https://keystatic.com/docs/github-mode
		 */
		env.PUBLIC_KEYSTATIC_MODE === "github" &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
			? {
					kind: "github",
					repo: {
						owner: env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	collections: {
		events: collections.events(),
		news: collections.news(),
		pages: collections.pages(),
		partners: collections.partners(),
	},
	singletons: {
		indexPage: singletons.indexPage(),
		metadata: singletons.metadata(),
		navigation: singletons.navigation(),
	},
});
