/* @jsxImportSource react */

import { createAssetOptions, createComponent } from "@acdh-oeaw/keystatic-lib";
import { fields, NotEditable } from "@keystatic/core";
import { block, inline, mark, repeating, wrapper } from "@keystatic/core/content-components";
import {
	GridIcon,
	HashIcon,
	ImageIcon,
	LinkIcon,
	SquareIcon,
	SuperscriptIcon,
	TwitterIcon,
	VideoIcon,
} from "lucide-react";

import { figureAlignments, gridLayouts, videoProviders } from "@/lib/keystatic/component-options";
import { createLinkSchema } from "@/lib/keystatic/create-link-schema";
import {
	FigurePreview,
	LinkButtonPreview,
	ThumbnailPreview,
	TweetPreview,
	VideoPreview,
} from "@/lib/keystatic/previews";

export const createFigure = createComponent((assetPath, _locale) => {
	return {
		Figure: wrapper({
			label: "Figure",
			description: "An image with caption.",
			icon: <ImageIcon />,
			schema: {
				src: fields.image({
					label: "Image",
					validation: { isRequired: true },
					...createAssetOptions(assetPath),
				}),
				alt: fields.text({
					label: "Image description for screen readers",
					validation: { isRequired: false },
				}),
				alignment: fields.select({
					label: "Alignment",
					options: figureAlignments,
					defaultValue: "stretch",
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				return (
					<FigurePreview alignment={value.alignment} alt={value.alt} src={value.src}>
						{children}
					</FigurePreview>
				);
			},
		}),
	};
});

export const createFootnote = createComponent((_assetPath, _locale) => {
	return {
		Footnote: mark({
			label: "Footnote",
			icon: <SuperscriptIcon />,
			schema: {},
			className: "underline decoration-dotted align-super text-sm",
		}),
	};
});

export const createGrid = createComponent((_assetPath, _locale) => {
	return {
		Grid: repeating({
			label: "Grid",
			description: "A grid layout.",
			icon: <GridIcon />,
			schema: {
				layout: fields.select({
					label: "Layout",
					options: gridLayouts,
					defaultValue: "two-columns",
				}),
			},
			children: ["GridItem"],
			// ContentView(props) {
			// 	const { children, value } = props;

			// 	return <GridPreview layout={value.layout}>{children}</GridPreview>;
			// },
		}),
		GridItem: wrapper({
			label: "Grid item",
			description: "A grid cell.",
			icon: <SquareIcon />,
			schema: {},
			forSpecificLocations: true,
			// ContentView(props) {
			// 	const { children } = props;

			// 	return <GridItemPreview>{children}</GridItemPreview>;
			// },
		}),
	};
});

export const createHeadingId = createComponent((_assetPath, _locale) => {
	return {
		HeadingId: inline({
			label: "HeadingId",
			description: "A custom heading id as a link target.",
			icon: <HashIcon />,
			schema: {
				id: fields.text({
					label: "ID",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				const { value } = props;

				return (
					<NotEditable>
						<span className="opacity-50">#{value.id}</span>;
					</NotEditable>
				);
			},
		}),
	};
});

export const createLink = createComponent((assetPath, locale) => {
	return {
		Link: mark({
			label: "Link",
			icon: <LinkIcon />,
			schema: {
				link: createLinkSchema(assetPath, locale),
			},
			tag: "a",
		}),
	};
});

export const createLinkButton = createComponent((assetPath, locale) => {
	return {
		Link: block({
			label: "LinkButton",
			description: "A link which looks like a button.",
			icon: <LinkIcon />,
			schema: {
				label: fields.text({
					label: "Label",
					validation: { isRequired: true },
				}),
				link: createLinkSchema(assetPath, locale),
			},
			ContentView(props) {
				const { value } = props;

				return <LinkButtonPreview>{value.label}</LinkButtonPreview>;
			},
		}),
	};
});

export const createThumbnail = createComponent((assetPath, _locale) => {
	return {
		Thumbnail: wrapper({
			label: "Thumbnail",
			description: "A thumbnail image.",
			icon: <ImageIcon />,
			schema: {
				src: fields.image({
					label: "Thumbnail",
					validation: { isRequired: true },
					...createAssetOptions(assetPath),
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				return <ThumbnailPreview src={value.src}>{children}</ThumbnailPreview>;
			},
		}),
	};
});

export const createTweet = createComponent((_assetPath, _locale) => {
	return {
		Tweet: wrapper({
			label: "Tweet",
			description: "A tweet.",
			// eslint-disable-next-line @typescript-eslint/no-deprecated
			icon: <TwitterIcon />,
			schema: {
				id: fields.text({
					label: "ID",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				return <TweetPreview id={value.id}>{children}</TweetPreview>;
			},
		}),
	};
});

export const createVideo = createComponent((_assetPath, _locale) => {
	return {
		Video: wrapper({
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
					label: "ID",
					validation: { isRequired: true },
				}),
				startTime: fields.number({
					label: "Start time",
					validation: { isRequired: false },
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				return (
					<VideoPreview id={value.id} provider={value.provider} startTime={value.startTime}>
						{children}
					</VideoPreview>
				);
			},
		}),
	};
});
