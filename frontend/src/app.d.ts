// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {dcUser} from "$lib/intern/functions/discord.server";

declare global {
	namespace App {
		// interface Error {}
        interface Locals {
            authorized: boolean;
            user?: dcUser;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
