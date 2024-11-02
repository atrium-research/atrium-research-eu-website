import type { Entry } from "@keystatic/core/reader";

import type config from "~/keystatic.config";

export type Imprint = Entry<(typeof config)["singletons"]["en:imprint"]>;

export type IndexPage = Entry<(typeof config)["singletons"]["en:indexPage"]>;

export type Metadata = Entry<(typeof config)["singletons"]["en:metadata"]>;

export type Navigation = Entry<(typeof config)["singletons"]["en:navigation"]>;

export type SocialMedia = Entry<(typeof config)["singletons"]["en:socialMedia"]>;

export type BlogPost = Entry<(typeof config)["collections"]["en:blog"]>;

export type Event = Entry<(typeof config)["collections"]["en:events"]>;

export type News = Entry<(typeof config)["collections"]["en:news"]>;

export type Page = Entry<(typeof config)["collections"]["en:pages"]>;

export type Partner = Entry<(typeof config)["collections"]["en:partners"]>;
