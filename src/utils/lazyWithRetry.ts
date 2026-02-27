import { lazy, type ComponentType } from "react";

/**
 * A wrapper around React.lazy that retries the dynamic import on failure.
 * When a new build is deployed, old JS chunks are replaced with new ones.
 * Users who have stale HTML cached will reference old chunk hashes that no
 * longer exist, causing a 404. This utility catches that failure and forces
 * a full page reload so the browser fetches the new HTML (and thus the
 * correct chunk references).
 *
 * A sessionStorage flag prevents infinite reload loops.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
	importFn: () => Promise<{ default: T }>,
	chunkName: string,
) {
	return lazy<T>(() =>
		importFn().catch((error: unknown) => {
			const storageKey = `chunk_retry_${chunkName}`;
			const hasRetried = sessionStorage.getItem(storageKey);

			if (!hasRetried) {
				sessionStorage.setItem(storageKey, "1");
				window.location.reload();
				// Return a never-resolving promise so React doesn't render the error
				return new Promise<{ default: T }>(() => {});
			}

			// Already retried once — clear flag and let the error propagate
			sessionStorage.removeItem(storageKey);
			throw error;
		}),
	);
}
