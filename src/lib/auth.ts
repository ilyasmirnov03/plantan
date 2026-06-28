import { browser } from "$app/environment";
import { createAuthClient } from "@neondatabase/auth";

export const authClient = browser
  ? createAuthClient(window.location.origin + "/api/auth")
  : ({} as ReturnType<typeof createAuthClient>);
