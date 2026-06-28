import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { getSession } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }: { request: Request; locale: string }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

const handleAuth: Handle = async ({ event, resolve }) => {
	if (!building) {
		const session = await getSession(event.request.headers);
		if (session) {
			event.locals.user = session.user;
			event.locals.session = session.session;
		}
	}
	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth);
