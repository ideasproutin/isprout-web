import {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
	useEffect,
	type ComponentType,
} from "react";
import type ReCAPTCHAType from "react-google-recaptcha";
import type { ReCAPTCHAProps } from "react-google-recaptcha";

// react-google-recaptcha is browser-only — never imported during SSR
type ReCAPTCHAComponent = ComponentType<
	ReCAPTCHAProps & { ref?: React.Ref<ReCAPTCHAType> }
>;

interface V2RecaptchaProps {
	/** Kept for API compatibility with forms that passed an `action` prop (unused in v2) */
	action?: string;
	onVerify: (token: string, isVerified: boolean) => void;
}

export interface V2RecaptchaHandle {
	reset: () => void;
}

const V2Recaptcha = forwardRef<V2RecaptchaHandle, V2RecaptchaProps>(
	function V2Recaptcha({ onVerify }, ref) {
		const recaptchaRef = useRef<ReCAPTCHAType>(null);
		const [ReCAPTCHA, setReCAPTCHA] = useState<ReCAPTCHAComponent | null>(
			null,
		);

		// Dynamically load the library on the client only
		useEffect(() => {
			import("react-google-recaptcha").then((mod) => {
				setReCAPTCHA(
					() => mod.default as unknown as ReCAPTCHAComponent,
				);
			});
		}, []);

		useImperativeHandle(ref, () => ({
			reset() {
				recaptchaRef.current?.reset();
				onVerify("", false);
			},
		}));

		const handleChange = (token: string | null) => {
			if (token) {
				onVerify(token, true);
			} else {
				onVerify("", false);
			}
		};

		// Not yet loaded on client (or running in SSR) — render nothing
		if (!ReCAPTCHA) return null;

		return (
			<ReCAPTCHA
				ref={recaptchaRef}
				sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
				onChange={handleChange}
				onExpired={() => onVerify("", false)}
				onErrored={() => onVerify("", false)}
			/>
		);
	},
);

export default V2Recaptcha;
