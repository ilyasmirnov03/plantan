import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const fallback: RequestHandler = async ({ request, params, url }) => {
	const target = new URL(`${env.NEON_AUTH_BASE_URL}/${params.path}`);
	url.searchParams.forEach((v, k) => target.searchParams.set(k, v));

	const headers = new Headers(request.headers);
	headers.delete('host');

	const body =
		request.method !== 'GET' && request.method !== 'HEAD'
			? await request.arrayBuffer()
			: undefined;

	const res = await fetch(target, { method: request.method, headers, body });

	// Strip Domain from Set-Cookie so cookies bind to our origin, not Neon Auth's
	const responseHeaders = new Headers();
	for (const [key, value] of res.headers) {
		if (key.toLowerCase() === 'set-cookie') {
			responseHeaders.append(key, value.replace(/;\s*[Dd]omain=[^;]*/g, ''));
		} else {
			responseHeaders.set(key, value);
		}
	}

	return new Response(res.body, { status: res.status, statusText: res.statusText, headers: responseHeaders });
};
