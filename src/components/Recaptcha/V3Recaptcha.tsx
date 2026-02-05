import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface V3RecaptchaProps {
	action?: string;
	onVerify: (token: string, isVerified: boolean) => void;
	variant?: "light" | "dark"; // Light variant for light backgrounds, dark variant for dark backgrounds
}

function V3Recaptcha({
	action = "form_submit",
	onVerify,
	variant = "light",
}: V3RecaptchaProps) {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const location = useLocation();
	const [status, setStatus] = useState<
		"idle" | "verifying" | "verified" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const isExecutingRef = useRef(false);

	// Styling based on variant
	const isDark = variant === "dark";
	const styles = {
		border: isDark ? "border-white" : "border-gray-800",
		text: isDark ? "text-white/70" : "text-gray-700",
		textPrimary: isDark ? "text-white" : "text-gray-900",
		bgCheckbox: isDark ? "bg-white/10" : "bg-gray-100",
		bgCheckboxHover: isDark ? "hover:bg-white/20" : "hover:bg-gray-200",
		textBranding: isDark ? "text-white/50" : "text-gray-500",
	};

	// Reset reCAPTCHA when route/path changes
	useEffect(() => {
		// Reset state when location changes
		setStatus("idle");
		setErrorMessage(null);
		isExecutingRef.current = false;
		onVerify("", false);
	}, [location.pathname, onVerify]);

	// Reset reCAPTCHA when component unmounts (additional cleanup)
	useEffect(() => {
		return () => {
			// Cleanup on unmount
			setStatus("idle");
			setErrorMessage(null);
			isExecutingRef.current = false;
		};
	}, []);

	// Notify parent whenever verification status changes
	useEffect(() => {
		if (status === "idle" || status === "verifying" || status === "error") {
			onVerify("", false);
		}
	}, [status, onVerify]);

	// Handle checkbox click - triggers verification
	const handleCheckboxClick = useCallback(async () => {
		// Only allow click when idle or error
		if (status !== "idle" && status !== "error") {
			return;
		}

		// Prevent multiple executions
		if (isExecutingRef.current) {
			return;
		}

		// Check if reCAPTCHA is ready
		if (!executeRecaptcha) {
			setStatus("error");
			setErrorMessage("reCAPTCHA not ready. Please refresh the page.");
			return;
		}

		isExecutingRef.current = true;
		setStatus("verifying");
		setErrorMessage(null);

		try {
			const token = await executeRecaptcha(action);

			if (token) {
				console.log("✅ reCAPTCHA Token Received:", token);
				setStatus("verified");
				setErrorMessage(null);
				onVerify(token, true);
			} else {
				setStatus("error");
				setErrorMessage("Verification failed. Please try again.");
				onVerify("", false);
			}
		} catch (err) {
			console.error("reCAPTCHA error:", err);
			setStatus("error");
			setErrorMessage("Verification error. Please try again.");
			onVerify("", false);
		} finally {
			isExecutingRef.current = false;
		}
	}, [executeRecaptcha, action, status, onVerify]);

	// Reset to idle state (for retry)
	const handleReset = useCallback(() => {
		setStatus("idle");
		setErrorMessage(null);
		isExecutingRef.current = false;
		onVerify("", false);
	}, [onVerify]);

	return (
		<div className='flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg bg-white'>
			{/* Checkbox area */}
			<div
				className='relative flex items-center justify-center w-7 h-7 border-2 border-gray-400 rounded cursor-pointer bg-white hover:bg-gray-50'
				onClick={
					status === "idle" || status === "error"
						? handleCheckboxClick
						: undefined
				}
				style={{
					cursor:
						status === "idle" || status === "error"
							? "pointer"
							: "default",
				}}
			>
				{/* Idle - empty checkbox */}
				{status === "idle" && (
					<div className='w-full h-full hover:bg-gray-100 transition-colors rounded' />
				)}

				{/* Verifying - spinner */}
				{status === "verifying" && (
					<svg
						className='animate-spin h-4 w-4 text-gray-800'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						></path>
					</svg>
				)}

				{/* Verified - green checkmark */}
				{status === "verified" && (
					<div className='w-full h-full bg-green-500 flex items-center justify-center rounded'>
						<svg
							className='w-4 h-4 text-white'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={3}
								d='M5 13l4 4L19 7'
							/>
						</svg>
					</div>
				)}

				{/* Error - red X with click to retry */}
				{status === "error" && (
					<div className='w-full h-full bg-red-100 flex items-center justify-center rounded hover:bg-red-200 transition-colors'>
						<svg
							className='w-4 h-4 text-red-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</div>
				)}
			</div>

			{/* Label text */}
			<div className='flex-1'>
				{status === "idle" && (
					<span
						className='text-sm text-gray-800 cursor-pointer select-none font-medium'
						onClick={handleCheckboxClick}
					>
						I'm not a robot
					</span>
				)}
				{status === "verifying" && (
					<span className='text-sm text-gray-800 font-medium'>
						Verifying...
					</span>
				)}
				{status === "verified" && (
					<span className='text-sm text-green-600 font-medium'>
						✓ Verified
					</span>
				)}
				{status === "error" && (
					<span className='text-sm text-red-600 font-medium'>
						{errorMessage || "Failed"} -{" "}
						<button
							type='button'
							onClick={handleReset}
							className='underline hover:no-underline'
						>
							Retry
						</button>
					</span>
				)}
			</div>

			{/* reCAPTCHA branding */}
			<div className='flex flex-col items-end text-xs text-gray-600'>
				<span>reCAPTCHA</span>
				<div className='flex gap-1 text-[10px]'>
					<a
						href='https://policies.google.com/privacy'
						target='_blank'
						rel='noopener noreferrer'
						className='hover:underline'
					>
						Privacy
					</a>
					<span>-</span>
					<a
						href='https://policies.google.com/terms'
						target='_blank'
						rel='noopener noreferrer'
						className='hover:underline'
					>
						Terms
					</a>
				</div>
			</div>
		</div>
	);
}

export default V3Recaptcha;
