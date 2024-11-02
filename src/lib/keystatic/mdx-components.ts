/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Figure from "@/components/content/figure.astro";
import Grid from "@/components/content/grid.astro";
import GridItem from "@/components/content/grid-item.astro";
import Img from "@/components/content/img.astro";
import Link from "@/components/content/link.astro";
import LinkButton from "@/components/content/link-button.astro";
import Thumbnail from "@/components/content/thumbnail.astro";
import Tweet from "@/components/content/tweet.astro";
import Video from "@/components/content/video.astro";
import Anchor from "@/components/link.astro";

const components = {
	a: Anchor,
	Figure,
	Grid,
	GridItem,
	img: Img,
	Link,
	LinkButton,
	Thumbnail,
	Tweet,
	Video,
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
