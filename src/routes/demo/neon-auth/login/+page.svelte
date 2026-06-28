<script lang='ts'>
	import { authClient } from '$lib/auth';

	let error = $state('');
	let email = $state('');
	let password = $state('');
	let name = $state('');

	async function signIn() {
		error = '';
		const result = await authClient.signIn.email({ email, password });
		if (result.error) {
			error = result.error.message || 'Sign in failed';
		} else {
			location.assign('/demo/neon-auth');
		}
	}

	async function signUp() {
		error = '';
		const result = await authClient.signUp.email({ email, password, name });
		if (result.error) {
			error = result.error.message || 'Registration failed';
		} else {
			location.assign('/demo/neon-auth');
		}
	}
</script>

<h1>Login</h1>
<label>
	Email
	<input type="email" bind:value={email} />
</label>
<label>
	Password
	<input type="password" bind:value={password} />
</label>
<label>
	Name (for registration)
	<input bind:value={name} />
</label>
<button onclick={signIn}>Login</button>
<button onclick={signUp}>Register</button>
<p style="color: red">{error}</p>
