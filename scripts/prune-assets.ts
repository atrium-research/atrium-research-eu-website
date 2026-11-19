/**
 * Removes original images uploaded via keystatic from the build output, which are not linked
 * directly.
 *
 * Images in `public/assets/content/` are imported via `import.meta.glob` (see
 * `@/lib/get-image-import`), so astro emits optimised versions (and hashed copies for on-demand
 * rendered routes) to `dist/client/_astro/`. The verbatim copies of `public/` are therefore only
 * needed for files which are linked to directly, e.g. downloads.
 *
 * Only run this after `astro build`, for the production docker image.
 */

import { readdir, readFile, rm, stat } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";

const clientFolder = join("dist", "client");
const contentAssetsFolder = join(clientFolder, "assets", "content");
const contentFolder = "content";

const imageExtensions = new Set([
	".avif",
	".bmp",
	".gif",
	".jpeg",
	".jpg",
	".png",
	".svg",
	".webp",
]);
const outputExtensions = new Set([".html", ".json", ".txt", ".webmanifest", ".xml"]);
const sourceExtensions = new Set([".json", ".mdx"]);

/** Any reference in the build output, e.g. `href`, `src`, `og:image`. */
const outputReferenceRegex = /\/assets\/content\/[^"'\s()<>?#]+/g;
/** Only direct links in content, not image fields, which are rendered via `astro:assets`. */
const sourceReferenceRegexes = [
	/"discriminant":"download","value":"(\/assets\/content\/[^"]+)"/g,
	/\]\((\/assets\/content\/[^)\s]+)\)/g,
	/href="(\/assets\/content\/[^"]+)"/g,
];

async function* walk(folder: string): AsyncGenerator<string> {
	for (const entry of await readdir(folder, { withFileTypes: true })) {
		const path = join(folder, entry.name);
		if (entry.isDirectory()) {
			yield* walk(path);
		} else {
			yield path;
		}
	}
}

function normalize(reference: string): string {
	try {
		return decodeURI(reference);
	} catch {
		return reference;
	}
}

const references = new Set<string>();

for await (const path of walk(clientFolder)) {
	if (path.startsWith(contentAssetsFolder + sep)) continue;
	if (!outputExtensions.has(extname(path))) continue;
	const text = await readFile(path, { encoding: "utf-8" });
	for (const match of text.matchAll(outputReferenceRegex)) {
		references.add(normalize(match[0]));
	}
}

for await (const path of walk(contentFolder)) {
	if (!sourceExtensions.has(extname(path))) continue;
	const text = await readFile(path, { encoding: "utf-8" });
	for (const regex of sourceReferenceRegexes) {
		for (const match of text.matchAll(regex)) {
			references.add(normalize(match[1]!));
		}
	}
}

let count = 0;
let bytes = 0;

for await (const path of walk(contentAssetsFolder)) {
	if (!imageExtensions.has(extname(path).toLowerCase())) continue;
	const publicPath = `/${relative(clientFolder, path).split(sep).join("/")}`;
	if (references.has(publicPath)) continue;
	bytes += (await stat(path)).size;
	await rm(path);
	count++;
}

// oxlint-disable-next-line no-console
console.log(
	`Removed ${String(count)} unreferenced original images (${String(Math.round(bytes / 1024 / 1024))} MB) from "${contentAssetsFolder}", kept ${String(references.size)} referenced files.`,
);
