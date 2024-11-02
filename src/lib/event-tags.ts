import { eventTags } from "@/lib/keystatic/component-options";

export const tags = [{ label: "All", value: "all" }, ...eventTags] as const;
