import { env } from '$env/dynamic/private';

type NeonAuthUser = App.NeonAuthUser;
type NeonAuthSession = App.NeonAuthSession;

export async function getSession(
	headers: Headers
): Promise<{ user: NeonAuthUser; session: NeonAuthSession } | null> {
	const cookie = headers.get('cookie');
	if (!cookie) return null;

	const res = await fetch(`${env.NEON_AUTH_BASE_URL}/get-session`, {
		headers: { cookie }
	});

	if (!res.ok || res.status === 204) return null;
	return res.json().catch(() => null);
}
