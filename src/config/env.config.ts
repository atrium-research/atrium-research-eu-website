import { log } from "@acdh-oeaw/lib";
import { createEnv, ValidationError } from "@acdh-oeaw/validate-env/astro";
import * as v from "valibot";

const environment = import.meta.env.SSR
	? // oxlint-disable-next-line no-restricted-properties
		Object.assign({}, process.env, import.meta.env)
	: import.meta.env;

function parse<TSchema extends v.GenericSchema>(
	schema: TSchema,
	input: Record<string, unknown>,
): v.InferOutput<TSchema> {
	const result = v.safeParse(schema, input);

	if (!result.success) {
		const message = "Invalid environment variables";

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		log.error(`${message}:`, v.flatten<any>(result.issues).nested);

		const validationError = new ValidationError(message);
		delete validationError.stack;

		throw validationError;
	}

	return result.output;
}

export const env = createEnv({
	environment,
	schemas: {
		system(input) {
			const Schema = v.object({
				NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "production"),
			});
			return parse(Schema, input);
		},
		private(input) {
			const Schema = v.object({
				BASEROW_API_BASE_URL: v.optional(v.pipe(v.string(), v.url())),
				BASEROW_API_KEY: v.optional(v.pipe(v.string(), v.nonEmpty())),
				BASEROW_TABLE_ID: v.optional(
					v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
				),
				KEYSTATIC_GITHUB_CLIENT_ID: v.optional(v.pipe(v.string(), v.nonEmpty())),
				KEYSTATIC_GITHUB_CLIENT_SECRET: v.optional(v.pipe(v.string(), v.nonEmpty())),
				KEYSTATIC_SECRET: v.optional(v.pipe(v.string(), v.nonEmpty())),
				ZENODO_API_ACCESS_TOKEN: v.optional(v.pipe(v.string(), v.nonEmpty())),
			});
			return parse(Schema, input);
		},
		public(input) {
			const Schema = v.object({
				PUBLIC_APP_BASE_PATH: v.optional(v.pipe(v.string(), v.nonEmpty())),
				PUBLIC_APP_BASE_URL: v.pipe(v.string(), v.url()),
				PUBLIC_BOTS: v.optional(v.picklist(["disabled", "enabled"]), "disabled"),
				PUBLIC_GOOGLE_SITE_VERIFICATION: v.optional(v.string()),
				PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: v.optional(v.pipe(v.string(), v.nonEmpty())),
				PUBLIC_KEYSTATIC_GITHUB_REPO_NAME: v.optional(v.pipe(v.string(), v.nonEmpty())),
				PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER: v.optional(v.pipe(v.string(), v.nonEmpty())),
				PUBLIC_KEYSTATIC_MODE: v.optional(v.picklist(["github", "local"]), "local"),
				PUBLIC_MATOMO_BASE_URL: v.optional(v.pipe(v.string(), v.url())),
				PUBLIC_MATOMO_ID: v.optional(
					v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
				),
				PUBLIC_REDMINE_ID: v.pipe(
					v.string(),
					v.transform(Number),
					v.number(),
					v.integer(),
					v.minValue(1),
				),
				PUBLIC_SSHOC_API_BASE_URL: v.pipe(v.string(), v.url()),
				PUBLIC_SSHOC_BASE_URL: v.pipe(v.string(), v.url()),
			});
			return parse(Schema, input);
		},
	},
	validation: v.parse(
		v.optional(v.picklist(["disabled", "enabled", "public"]), "enabled"),
		environment.ENV_VALIDATION,
	),
});
