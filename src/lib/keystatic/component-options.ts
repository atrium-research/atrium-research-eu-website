export const eventTags = [
	{ label: "Organised", value: "organised" },
	{ label: "Presented at", value: "presented-at" },
	{ label: "Supported", value: "supported" },
] as const;

export type EventTag = (typeof eventTags)[number]["value"];

export const figureAlignments = [
	{ label: "Center", value: "center" },
	{ label: "Stretch", value: "stretch" },
] as const;

export type FigureAlignment = (typeof figureAlignments)[number]["value"];

export const gridLayouts = [
	{ label: "Two columns", value: "two-columns" },
	{ label: "Three columns", value: "three-columns" },
	{ label: "Four columns", value: "four-columns" },

	{ label: "Two columns, right is 2x as wide", value: "one-two-columns" },
	{ label: "Two columns, right is 3x as wide", value: "one-three-columns" },
	{ label: "Two columns, right is 4x as wide", value: "one-four-columns" },

	{ label: "Two columns, left is 2x as wide", value: "two-one-columns" },
	{ label: "Two columns, left is 3x as wide", value: "three-one-columns" },
	{ label: "Two columns, left is 4x as wide", value: "four-one-columns" },
] as const;

export type GridLayout = (typeof gridLayouts)[number]["value"];

export const linkKinds = [
	{ label: "Download", value: "download" },
	{ label: "External", value: "external" },
	{ label: "Home page", value: "index-page" },
	{ label: "Blog", value: "blog" },
	{ label: "Events", value: "events" },
	{ label: "News", value: "news" },
	{ label: "Pages", value: "pages" },
	{ label: "Partners", value: "partners" },
] as const;

export type LinkKind = (typeof linkKinds)[number]["value"];

export const partnerKinds = [
	{ label: "Research Infrastructure", value: "research-infrastructure" },
	{ label: "Beneficiary", value: "beneficiary" },
	{ label: "Affiliated Entity", value: "affiliated" },
] as const;

export type PartnerKind = (typeof partnerKinds)[number]["value"];

export const socialMediaKinds = [
	{ label: "LinkedIn", value: "linkedin" },
	{ label: "Twitter", value: "twitter" },
	{ label: "YouTube", value: "youtube" },
] as const;

export type SocialMediaKind = (typeof socialMediaKinds)[number]["value"];

export const videoProviders = [{ label: "YouTube", value: "youtube" }] as const;

export type VideoProvider = (typeof videoProviders)[number]["value"];
