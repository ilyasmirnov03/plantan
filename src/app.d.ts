// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface NeonAuthUser {
			id: string;
			name: string;
			email: string;
			emailVerified: boolean;
			image: string | null;
			createdAt: string;
			updatedAt: string;
		}
		interface NeonAuthSession {
			id: string;
			userId: string;
			token: string;
			expiresAt: string;
			createdAt: string;
			updatedAt: string;
			ipAddress: string | null;
			userAgent: string | null;
		}
		interface Locals { user?: NeonAuthUser; session?: NeonAuthSession }

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
