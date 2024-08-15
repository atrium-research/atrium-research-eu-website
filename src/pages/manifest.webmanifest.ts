import { defaultLocale } from "@/config/i18n.config";
import { createI18n } from "@/lib/i18n";

export async function GET() {
	const locale = defaultLocale;

	const { t } = await createI18n(locale);

	const metadata = t("metadata");

	const manifest = {
		name: metadata.manifest.name,
		short_name: metadata.manifest["short-name"],
		description: metadata.manifest.description,
		icons: [
			{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
			{ src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
			{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
			{ src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
		],
		theme_color: "#a6503e",
		background_color: "#a6503e",
		display: "standalone",
		start_url: "/",
	};

	return Response.json(manifest);
}
