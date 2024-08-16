import { eventTags } from "@/lib/content/collections";

export const tags = [{ label: "All", value: "all" }, ...eventTags] as const;
