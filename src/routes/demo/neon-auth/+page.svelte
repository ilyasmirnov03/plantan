<script lang="ts">
	import { authClient } from '$lib/auth';
	import type { PageServerData } from "./$types";

	let { data }: { data: PageServerData } = $props();

	async function signOut() {
		await authClient.signOut();
		location.assign('/demo/neon-auth/login');
	}
</script>

<h1>Hi, {data.user.name}!</h1>
<p>Your user ID is {data.user.id}.</p>
<button onclick={signOut}>Sign out</button>
