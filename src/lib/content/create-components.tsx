import { createUrl, pick } from "@acdh-oeaw/lib";
import { fields, NotEditable } from "@keystatic/core";
import {
	block,
	type ContentComponent,
	inline,
	mark,
	repeating,
	wrapper,
} from "@keystatic/core/content-components";
import {
	BookTextIcon,
	// CaptionsIcon,
	DownloadIcon,
	// ExpandIcon,
	GridIcon,
	HeadingIcon,
	ImageIcon,
	// InfoIcon,
	LinkIcon,
	// ListIcon,
	// SquareIcon,
	SuperscriptIcon,
	TwitterIcon,
	VideoIcon,
} from "lucide-react";
import { Tweet } from "react-tweet";

import type { Locale } from "@/config/i18n.config";
import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { useObjectUrl } from "@/lib/content/use-object-url";

/** @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts */
// const calloutKinds = [
// 	{ label: "Caution", value: "caution" },
// 	{ label: "Important", value: "important" },
// 	{ label: "Note", value: "note" },
// 	{ label: "Tip", value: "tip" },
// 	{ label: "Warning", value: "warning" },
// ] as const;

export const figureAlignments = [
	{ label: "Center", value: "center" },
	{ label: "Stretch", value: "stretch" },
] as const;

const gridVariants = [
	{ label: "Two columns", value: "two-columns" },
	{ label: "Three columns", value: "three-columns" },
	{ label: "Four columns", value: "four-columns" },
	{ label: "Two columns, right is 2x as wide", value: "one-two-columns" },
	{ label: "Two columns, right is 3x as wide", value: "one-three-columns" },
	{ label: "Two columns, right is 4x as wide", value: "one-four-columns" },
] as const;

const videoProviders = [{ label: "YouTube", value: "youtube" }] as const;

const components = {
	// Callout() {
	// 	return wrapper({
	// 		label: "Callout",
	// 		description: "A panel with additional information.",
	// 		icon: <InfoIcon />,
	// 		schema: {
	// 			kind: fields.select({
	// 				label: "Kind",
	// 				options: calloutKinds,
	// 				defaultValue: "note",
	// 			}),
	// 			title: fields.text({
	// 				label: "Title",
	// 				// validation: { isRequired: false },
	// 			}),
	// 		},
	// 		ContentView(props) {
	// 			const { children, value } = props;

	// 			return (
	// 				<aside>
	// 					{isNonEmptyString(value.title) ? (
	// 						<NotEditable>
	// 							<strong>{value.title}</strong>
	// 						</NotEditable>
	// 					) : null}
	// 					{children}
	// 				</aside>
	// 			);
	// 		},
	// 	});
	// },
	// Card() {
	// 	return wrapper({
	// 		label: "Card",
	// 		description: "A card.",
	// 		icon: <SquareIcon />,
	// 		schema: {
	// 			title: fields.text({
	// 				label: "Title",
	// 				validation: { isRequired: true },
	// 			}),
	// 			href: fields.url({
	// 				label: "URL",
	// 				validation: { isRequired: true },
	// 			}),
	// 		},
	// 		ContentView(props) {
	// 			const { children, value } = props;

	// 			if (value.href == null) {
	// 				return null;
	// 			}

	// 			return (
	// 				<div>
	// 					<NotEditable>
	// 						<header>
	// 							<h3>{value.title}</h3>
	// 						</header>
	// 					</NotEditable>
	// 					<div>{children}</div>
	// 					<footer>
	// 						<a href={value.href}>Read more</a>
	// 					</footer>
	// 				</div>
	// 			);
	// 		},
	// 	});
	// },
	// Disclosure() {
	// 	return wrapper({
	// 		label: "Disclosure",
	// 		description: "An expandable panel.",
	// 		icon: <ExpandIcon />,
	// 		schema: {
	// 			title: fields.text({
	// 				label: "Title",
	// 				validation: { isRequired: true },
	// 			}),
	// 		},
	// 	});
	// },
	DownloadLink(assetPath) {
		return mark({
			label: "Download link",
			icon: <DownloadIcon />,
			tag: "a",
			className: "underline decoration-dotted",
			schema: {
				href: fields.file({
					label: "File",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
			},
		});
	},
	// Embed() {
	// 	return wrapper({
	// 		label: "Embed",
	// 		description: "Another website, embedded via iframe.",
	// 		icon: <VideoIcon />,
	// 		schema: {
	// 			src: fields.url({
	// 				label: "URL",
	// 				description: "The URL of the iframe.",
	// 				validation: { isRequired: true },
	// 			}),
	// 		},
	// 	});
	// },
	Figure(assetPath) {
		return wrapper({
			label: "Figure",
			description: "An image with caption.",
			icon: <ImageIcon />,
			schema: {
				src: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				alt: fields.text({
					label: "Image description for screen readers",
					// validation: { isRequired: false },
				}),
				alignment: fields.select({
					label: "Alignment",
					options: figureAlignments,
					defaultValue: "stretch",
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				const contentType = value.src?.extension === "svg" ? "image/svg+xml" : undefined;
				const src = useObjectUrl(value.src?.data ?? null, contentType);

				if (src == null) {
					return null;
				}

				return (
					<NotEditable>
						<figure>
							<img alt={props.value.alt} src={src} />
							<figcaption>{children}</figcaption>
						</figure>
					</NotEditable>
				);
			},
		});
	},
	Footnote() {
		return mark({
			label: "Footnote",
			icon: <SuperscriptIcon />,
			className: "underline decoration-dotted align-super text-sm",
			schema: {},
		});
	},
	Grid() {
		return repeating({
			label: "Grid",
			description: "A grid layout.",
			icon: <GridIcon />,
			children: ["GridItem"],
			schema: {
				variant: fields.select({
					label: "Variant",
					options: gridVariants,
					defaultValue: "two-columns",
				}),
			},
		});
	},
	GridItem() {
		return wrapper({
			label: "Grid item",
			description: "A grid cell.",
			icon: <GridIcon />,
			forSpecificLocations: true,
			schema: {},
		});
	},
	HeadingId() {
		return inline({
			label: "Heading ID",
			description: "A custom heading id as a link target.",
			icon: <HeadingIcon />,
			schema: {
				id: fields.text({
					label: "Identifier",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				const { value } = props;

				return (
					<NotEditable>
						<span className="opacity-50">#{value.id}</span>
					</NotEditable>
				);
			},
		});
	},
	LinkButton() {
		return block({
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
				const { value } = props;

				return <NotEditable>{value.label}</NotEditable>;
			},
		});
	},
	ResourceLink(_assetPath, _locale) {
		return mark({
			label: "Resource link",
			icon: <BookTextIcon />,
			tag: "a",
			schema: {
				resource: fields.conditional(
					fields.select({
						label: "Collection",
						options: [
							{ label: "Events", value: "events" },
							{ label: "News", value: "news" },
							{ label: "Pages", value: "pages" },
							{ label: "Partners", value: "partners" },
						],
						defaultValue: "pages",
					}),
					{
						events: fields.relationship({
							label: "Event",
							collection: "events",
							validation: { isRequired: true },
						}),
						news: fields.relationship({
							label: "News",
							collection: "news",
							validation: { isRequired: true },
						}),
						pages: fields.relationship({
							label: "Page",
							collection: "pages",
							validation: { isRequired: true },
						}),
						partners: fields.relationship({
							label: "Partner",
							collection: "partners",
							validation: { isRequired: true },
						}),
					},
				),
			},
		});
	},
	// Tab() {
	// 	return wrapper({
	// 		label: "Tab",
	// 		description: "A tab.",
	// 		icon: <CaptionsIcon />,
	// 		forSpecificLocations: true,
	// 		schema: {
	// 			title: fields.text({
	// 				label: "Title",
	// 				validation: { isRequired: true },
	// 			}),
	// 		},
	// 	});
	// },
	/** Needs to be enabled in `@/lib/content/with-table-of-contents.js`. */
	// TableOfContents() {
	// 	return block({
	// 		label: "Table of contents",
	// 		description: "Insert a table of contents",
	// 		icon: <ListIcon />,
	// 		schema: {
	// 			title: fields.text({
	// 				label: "Title",
	// 				// validation: { isRequired: false },
	// 			}),
	// 		},
	// 	});
	// },
	// Tabs() {
	// 	return repeating({
	// 		label: "Tabs",
	// 		description: "Multiple tabs.",
	// 		icon: <CaptionsIcon />,
	// 		children: ["Tab"],
	// 		schema: {},
	// 	});
	// },
	Thumbnail(assetPath) {
		return wrapper({
			label: "Thumbnail",
			description: "A thumbnail image.",
			icon: <ImageIcon />,
			schema: {
				src: fields.image({
					label: "Thumbnail",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
			},
		});
	},
	Tweet() {
		return wrapper({
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
					<figure>
						<NotEditable>
							<Tweet id={props.value.id} />
						</NotEditable>
						{props.children ? <figcaption>{props.children}</figcaption> : null}
					</figure>
				);
			},
		});
	},
	Video() {
		return wrapper({
			label: "Video",
			description: "A YouTube video.",
			icon: <VideoIcon />,
			schema: {
				provider: fields.select({
					label: "Provider",
					options: videoProviders,
					defaultValue: "youtube",
				}),
				id: fields.text({
					label: "Video identifier",
					validation: { isRequired: true },
				}),
				startTime: fields.number({
					label: "Start time",
					// validation: { isRequired: false },
				}),
			},
			ContentView(props) {
				const { id } = props.value;

				const href = String(
					createUrl({
						baseUrl: "https://www.youtube-nocookie.com",
						pathname: `/embed/${id}`,
					}),
				);

				return (
					<figure>
						<NotEditable>
							<iframe allowFullScreen={true} src={href} title="Video" />
						</NotEditable>
						{props.children ? <figcaption>{props.children}</figcaption> : null}
					</figure>
				);
			},
		});
	},
} satisfies Record<string, (assetPath: `/${string}/`, locale: Locale) => ContentComponent>;

export function createComponents(
	assetPath: `/${string}/`,
	locale: Locale,
	include?: Array<keyof typeof components>,
) {
	const _components = include ? pick(components, include) : components;

	return Object.fromEntries(
		Object.entries(_components).map(([key, value]) => {
			return [key, value(assetPath, locale)];
		}),
	);
}

export const headingLevels = [2, 3, 4, 5] as const;
