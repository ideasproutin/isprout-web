import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import V2Recaptcha, {
	type V2RecaptchaHandle,
} from "../../components/Recaptcha/V2Recaptcha";
import "./auth.css";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLoginSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
	isOpen,
	onClose,
	onLoginSuccess,
}) => {
	const navigate = useNavigate();

	// Auth hook — owns all token/session logic
	const {
		isLoading,
		error,
		sendOtpAction,
		verifyOtpAction,
		completeSignupAction,
		clearError,
		resetAuth,
	} = useAuth();

	// Step tracking
	const [step, setStep] = useState<"email" | "otp" | "signup">("email");

	// Email / OTP
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState(["", "", "", ""]);

	// Signup fields (for new users only)
	const [signupName, setSignupName] = useState("");
	const [signupPhone, setSignupPhone] = useState("");
	const mode = "email"; // For future extensibility (e.g., phone-based auth)

	// UI-only state
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	// reCAPTCHA
	const recaptchaRef = useRef<V2RecaptchaHandle>(null);
	const [recaptchaVerified, setRecaptchaVerified] = useState(false);
	const [recaptchaToken, setRecaptchaToken] = useState<string>("");

	// Lock body scroll when modal is open
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	// ─── Helpers ──────────────────────────────────────────────────────────────

	const resetModal = () => {
		setStep("email");
		setEmail("");
		setOtp(["", "", "", ""]);
		setSignupName("");
		setSignupPhone("");
		setSuccessMsg(null);
		setRecaptchaVerified(false);
		setRecaptchaToken("");
		recaptchaRef.current?.reset();
		resetAuth();
	};

	const handleClose = () => {
		resetModal();
		onClose();
	};

	const finishLogin = () => {
		onLoginSuccess?.();
		navigate("/dashboard");
		onClose();
		resetModal();
	};

	// ─── OTP input handlers ────────────────────────────────────────────────────

	const handleOtpChange = (index: number, value: string) => {
		if (value.length <= 1 && /^\d*$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);
			if (value && index < 3) {
				document.getElementById(`otp-${index + 1}`)?.focus();
			}
		}
	};

	const handleOtpKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			document.getElementById(`otp-${index - 1}`)?.focus();
		}
	};

	// ─── Step 1: Send OTP ─────────────────────────────────────────────────────

	const handleSendOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim() || !recaptchaVerified) return;
		const ok = await sendOtpAction(email.trim(), recaptchaToken, mode);
		if (ok) {
			setSuccessMsg("OTP sent to your email. Check your inbox (and spam folder).");
			setStep("otp");
		}
		// Always reset captcha after attempt
		recaptchaRef.current?.reset();
		setRecaptchaVerified(false);
		setRecaptchaToken("");
	};

	// ─── Step 2: Verify OTP ───────────────────────────────────────────────────

	const handleVerifyOtp = async () => {
		const enteredOtp = otp.join("");
		if (enteredOtp.length !== 4) return;
		const result = await verifyOtpAction(email.trim(), enteredOtp , mode);
		if (result.success) {
			// Use the isProfileCreated value directly from API response
			// false = new user needs to complete signup
			// true = existing user, go to dashboard
			if (result.isProfileCreated === false) {
				setStep("signup");
			} else {
				finishLogin();
			}
		}
	};

	// ─── Step 3: Complete signup (new users) ──────────────────────────────────

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!signupName.trim() || !signupPhone.trim()) return;
		const ok = await completeSignupAction(signupName.trim(), signupPhone.trim(), email.trim());
		if (ok) finishLogin();
	};

	if (!isOpen) return null;

	return (
		<div className='auth-overlay' onClick={handleClose}>
			<div
				className={`auth-container ${step === "signup" ? "active" : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				
				{/* ── Login / OTP Form ── */}
				<div className='auth-form-box login'>
					<form
						onSubmit={
							step === "email"
								? handleSendOtp
								: (e) => e.preventDefault()
						}
					>
						<h1>Login</h1>

						{error && <p className='auth-error'>{error}</p>}
						{successMsg && step === "otp" && (
							<p className='auth-success'>{successMsg}</p>
						)}

						{/* Email input */}
						<div className='auth-input-box'>
							<input
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={step !== "email" || isLoading}
								required
							/>
							<i className='bx bxs-envelope'></i>
						</div>

						{/* OTP inputs (shown after email submit) */}
						{step === "otp" && (
							<div className='auth-otp-container'>
								<label className='auth-otp-label'>
									Enter OTP sent to your email
								</label>
								<div className='auth-otp-inputs'>
									{otp.map((digit, index) => (
										<input
											key={index}
											id={`otp-${index}`}
											type='text'
											inputMode='numeric'
											maxLength={1}
											value={digit}
											onChange={(e) =>
												handleOtpChange(
													index,
													e.target.value,
												)
											}
											onKeyDown={(e) =>
												handleOtpKeyDown(index, e)
											}
											className='auth-otp-input'
											disabled={isLoading}
											autoFocus={index === 0}
										/>
									))}
									<button
										type='button'
										className='auth-verify-btn'
										onClick={handleVerifyOtp}
										disabled={
											otp.join("").length !== 4 ||
											isLoading
										}
									>
										{isLoading ? "…" : "Verify"}
									</button>
								</div>
							</div>
						)}

						{/* reCAPTCHA — shown on email step only */}
						{step === "email" && (
							<div className='auth-recaptcha-wrapper'>
								<V2Recaptcha
									ref={recaptchaRef}
									size='normal'
									onVerify={(token, verified) => {
										setRecaptchaVerified(verified);
										setRecaptchaToken(verified ? token : "");
									}}
								/>
							</div>
						)}

						{/* Action button */}
						{step === "email" && (
							<button
								type='submit'
								className='auth-btn'
								disabled={
									isLoading ||
									!email.trim() ||
									!recaptchaVerified
								}
							>
								{isLoading ? "Sending…" : "Send OTP"}
							</button>
						)}

						{step === "otp" && (
							<button
								type='button'
								className='auth-btn-secondary'
								onClick={() => {
									setStep("email");
									setOtp(["", "", "", ""]);
									clearError();
									setSuccessMsg(null);
								}}
								disabled={isLoading}
							>
								← Change Email
							</button>
						)}
					</form>
				</div>

				{/* ── Signup Form (new users) ── */}
				<div className='auth-form-box register'>
					<form onSubmit={handleSignup}>
						<h1>Complete Sign Up</h1>

						{error && <p className='auth-error'>{error}</p>}

						<div className='auth-input-box'>
							<input
								type='text'
								placeholder='Full Name'
								value={signupName}
								onChange={(e) => setSignupName(e.target.value)}
								disabled={isLoading}
								required
							/>
							<i className='bx bxs-user'></i>
						</div>

						<div className='auth-input-box'>
							<input
								type='email'
								placeholder='Email'
								value={email}
								readOnly
							/>
							<i className='bx bxs-envelope'></i>
						</div>

						<div className='auth-input-box'>
							<input
								type='tel'
								placeholder='Phone Number'
								value={signupPhone}
								onChange={(e) => setSignupPhone(e.target.value)}
								disabled={isLoading}
								required
							/>
							<i className='bx bxs-phone'></i>
						</div>

						<button
							type='submit'
							className='auth-btn'
							disabled={
								isLoading ||
								!signupName.trim() ||
								!signupPhone.trim()
							}
						>
							{isLoading ? "Saving…" : "Sign Up"}
						</button>
					</form>
				</div>

				{/* Toggle Box */}
				<div className='auth-toggle-box'>
					<div className='auth-toggle-panel toggle-left'>
						<h1>Hello, Welcome!</h1>
					</div>
					<div className='auth-toggle-panel toggle-right'>
						<h1>Welcome Back!</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
