import type { Entry } from "@keystatic/core/reader";

import type config from "~/keystatic.config";

export type Imprint = Entry<(typeof config)["singletons"]["imprint"]>;

export type IndexPage = Entry<(typeof config)["singletons"]["indexPage"]>;

export type Metadata = Entry<(typeof config)["singletons"]["metadata"]>;

export type Navigation = Entry<(typeof config)["singletons"]["navigation"]>;

export type SocialMedia = Entry<(typeof config)["singletons"]["socialMedia"]>;

export type Event = Entry<(typeof config)["collections"]["events"]>;

export type News = Entry<(typeof config)["collections"]["news"]>;

export type Page = Entry<(typeof config)["collections"]["pages"]>;

export type Partner = Entry<(typeof config)["collections"]["partners"]>;
