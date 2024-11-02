/* @jsxImportSource react */

import { useObjectUrl, type UseObjectUrlParams } from "@acdh-oeaw/keystatic-lib/preview";
import { cn } from "@acdh-oeaw/style-variants";
import { NotEditable } from "@keystatic/core";
import type { ReactNode } from "react";
import { Tweet as StaticTweet } from "react-tweet";

import type { VideoProvider } from "@/lib/keystatic/component-options";
import { createVideoUrl } from "@/lib/keystatic/create-video-url";
import type { LinkSchema } from "@/lib/keystatic/get-link-props";

interface FigurePreviewProps {
	/** @default "stretch" */
	alignment?: "center" | "stretch";
	alt?: string;
	children?: ReactNode;
	src: UseObjectUrlParams | null;
}

export function FigurePreview(props: FigurePreviewProps): ReactNode {
	const { alignment = "stretch", alt = "", children, src } = props;

	const url = useObjectUrl(src);

	if (url == null) return null;

	return (
		<figure className={cn("grid gap-y-2", alignment === "center" ? "justify-center" : undefined)}>
			<NotEditable>
				<img alt={alt} className="rounded w-full overflow-hidden" src={url} />
			</NotEditable>
			<figcaption>{children}</figcaption>
		</figure>
	);
}

// interface GridPreviewProps {
// 	children: ReactNode;
// 	/** @default "two-columns" */
// 	layout: GridLayout;
// }

// export function GridPreview(props: GridPreviewProps): ReactNode {
// 	const { children, layout } = props;

// 	const gridStyles = styles({
// 		base: "grid content-start gap-8",
// 		variants: {
// 			layout: {
// 				"two-columns": "sm:grid-cols-2",
// 				"three-columns": "sm:grid-cols-3",
// 				"four-columns": "sm:grid-cols-4",
// 				"one-two-columns": "sm:grid-cols-[1fr_2fr]",
// 				"one-three-columns": "sm:grid-cols-[1fr_3fr]",
// 				"one-four-columns": "sm:grid-cols-[1fr_4fr]",
// 				"two-one-columns": "sm:grid-cols-[2fr_1fr]",
// 				"three-one-columns": "sm:grid-cols-[3fr_1fr]",
// 				"four-one-columns": "sm:grid-cols-[4fr_1fr]",
// 			},
// 		},
// 		defaults: {
// 			layout: "two-columns",
// 		},
// 	});

// 	return <div className={gridStyles({ layout })}>{children}</div>;
// }

// interface GridItemPreviewProps {
// 	children: ReactNode;
// }

// export function GridItemPreview(props: GridItemPreviewProps): ReactNode {
// 	const { children } = props;

// 	return <div>{children}</div>;
// }

interface LinkButtonPreviewProps {
	children: ReactNode;
	link: LinkSchema;
}

export function LinkButtonPreview(props: LinkButtonPreviewProps): ReactNode {
	const { children } = props;

	if (children == null || children === "") return null;

	return (
		<div className="inline-flex cursor-pointer select-none rounded-md bg-red-clay px-6 py-2 font-semibold text-white no-underline transition hover:bg-red-clay-intent">
			{children}
		</div>
	);
}

interface ThumbnailPreviewProps {
	children?: ReactNode;
	src: UseObjectUrlParams | null;
}

export function ThumbnailPreview(props: ThumbnailPreviewProps): ReactNode {
	const { children, src } = props;

	const url = useObjectUrl(src);

	if (url == null) return null;

	return (
		<div className="grid grid-cols-[1fr_4fr] items-center gap-8">
			<NotEditable>
				<img alt="" src={url} />
			</NotEditable>
			<div>{children}</div>
		</div>
	);
}

interface TweetPreviewProps {
	children?: ReactNode;
	id: string;
}

export function TweetPreview(props: TweetPreviewProps): ReactNode {
	const { children, id } = props;

	return (
		<figure className="grid gap-y-2">
			<NotEditable>
				<StaticTweet id={id} />
			</NotEditable>
			<figcaption>{children}</figcaption>
		</figure>
	);
}

interface VideoPreviewProps {
	children?: ReactNode;
	id: string;
	provider: VideoProvider;
	startTime?: number | null;
}

export function VideoPreview(props: VideoPreviewProps): ReactNode {
	const { children, id, provider, startTime } = props;

	const href = String(createVideoUrl(provider, id, startTime));

	return (
		<figure className="grid gap-y-2">
			<NotEditable>
				{/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
				<iframe
					allowFullScreen={true}
					className="rounded aspect-video w-full overflow-hidden"
					src={href}
				/>
			</NotEditable>
			<figcaption>{children}</figcaption>
		</figure>
	);
}
