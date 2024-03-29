import NextAuth from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		accessToken?: string;
		user_type?: string;
		error?: string;
	}

	interface AdapterUser {
		password: string;
	}

	interface User {
		user_type: any;
	}
}
