import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe replacement for useLayoutEffect.
 * Uses useLayoutEffect on the client (browser) and useEffect during SSR
 * to avoid the "useLayoutEffect does nothing on the server" React warning.
 */
const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
