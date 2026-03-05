import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MdEdit } from "react-icons/md";
import V2Recaptcha, {
	type V2RecaptchaHandle,
} from "../../components/Recaptcha/V2Recaptcha";
import "./auth.css";

const NAME_MAX_LENGTH = 50;
const EMAIL_MAX_LENGTH = 254;
const PHONE_LENGTH = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLoginSuccess?: () => void;
	redirectToDashboard?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
	isOpen,
	onClose,
	onLoginSuccess,
	redirectToDashboard = true,
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
	const [emailValidationError, setEmailValidationError] = useState<string | null>(null);
	const [signupNameError, setSignupNameError] = useState<string | null>(null);
	const [signupPhoneError, setSignupPhoneError] = useState<string | null>(null);
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
		setEmailValidationError(null);
		setSignupNameError(null);
		setSignupPhoneError(null);
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

	const finishLogin = async () => {
		await Promise.resolve(onLoginSuccess?.());
		if (redirectToDashboard) {
			navigate("/dashboard");
		}
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

			// If user has entered all 4 digits, auto-verify using the fresh value
			const joined = newOtp.join("");
			if (joined.length === 4) {
				// call verify with the new code to avoid relying on possibly-stale state
				void handleVerifyOtp(joined);
			}
		}
	};

	const handleOtpKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			document.getElementById(`otp-${index - 1}`)?.focus();
			return;
		}

		// When Enter is pressed, attempt verification if 4 digits available
		if (e.key === "Enter") {
			const code = otp.join("");
			if (code.length === 4) {
				// prevent default form submission here; verification will handle flow
				e.preventDefault();
				void handleVerifyOtp(code);
			}
		}
	};

	// ─── Step 1: Send OTP ─────────────────────────────────────────────────────

	const handleSendOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			setEmailValidationError("Email is required.");
			return;
		}
		if (trimmedEmail.length > EMAIL_MAX_LENGTH) {
			setEmailValidationError(`Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`);
			return;
		}
		if (!EMAIL_REGEX.test(trimmedEmail)) {
			setEmailValidationError("Please enter a valid email address.");
			return;
		}
		if (!recaptchaVerified) return;
		setEmailValidationError(null);
		const ok = await sendOtpAction(trimmedEmail, recaptchaToken, mode);
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

	const handleVerifyOtp = async (code?: string) => {
		const enteredOtp = typeof code === "string" ? code : otp.join("");
		if (enteredOtp.length !== 4) return;
		try {
			const result = await verifyOtpAction(email.trim(), enteredOtp, mode);
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
		} catch (err) {
			// Let the existing error handling in the hook display messages
			console.error("OTP verification failed:", err);
		}
	};

	// ─── Step 3: Complete signup (new users) ──────────────────────────────────

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();

		const trimmedName = signupName.trim();
		const trimmedPhone = signupPhone.trim();
		const trimmedEmail = email.trim();

		let hasValidationError = false;

		if (!trimmedName) {
			setSignupNameError("Name is required.");
			hasValidationError = true;
		} else if (trimmedName.length > NAME_MAX_LENGTH) {
			setSignupNameError(`Name cannot exceed ${NAME_MAX_LENGTH} characters.`);
			hasValidationError = true;
		} else if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
			setSignupNameError("Name can contain only letters and spaces.");
			hasValidationError = true;
		} else {
			setSignupNameError(null);
		}

		if (trimmedEmail.length > EMAIL_MAX_LENGTH) {
			setEmailValidationError(`Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`);
			hasValidationError = true;
		} else {
			setEmailValidationError(null);
		}

		if (!/^\d{10}$/.test(trimmedPhone)) {
			setSignupPhoneError("Phone number must be exactly 10 digits.");
			hasValidationError = true;
		} else {
			setSignupPhoneError(null);
		}

		if (hasValidationError) return;

		const ok = await completeSignupAction(trimmedName, trimmedPhone, trimmedEmail);
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
						<div className='auth-input-box' style={{position: 'relative'}}>
							<input
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => {
									const newEmail = e.target.value.slice(0, EMAIL_MAX_LENGTH);
									setEmail(newEmail);
									setEmailValidationError(null);
									// Reset OTP state when email changes
									if (step === 'otp' && otp.some(d => d !== '')) {
										setOtp(['', '', '', '']);
										setSuccessMsg(null);
									}
								}}
								disabled={step !== "email" || isLoading}
								maxLength={EMAIL_MAX_LENGTH}
								required
							/>
							<i className='bx bxs-envelope'></i>
							{step === 'otp' && (
								<MdEdit
									size={16}
									style={{
										position: 'absolute',
										right: '45px',
										top: '50%',
										transform: 'translateY(-50%)',
										cursor: isLoading ? 'not-allowed' : 'pointer',
										color: '#6b7280',
										opacity: isLoading ? 0.5 : 1
									}}
									onClick={() => {
										if (isLoading) return;
										setStep('email');
										setOtp(['', '', '', '']);
										setSuccessMsg(null);
										setEmailValidationError(null);
										clearError();
									}}
									title='Edit email'
								/>
							)}
						</div>
						{emailValidationError && step === "email" && (
							<p className='auth-error'>{emailValidationError}</p>
						)}

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
										onClick={() => handleVerifyOtp()}
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

						{/* Change Email button removed - inline edit icon is used instead */}
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
								onChange={(e) => {
									const value = e.target.value
										.replace(/[^A-Za-z\s]/g, "")
										.slice(0, NAME_MAX_LENGTH);
									setSignupName(value);
									setSignupNameError(null);
								}}
								disabled={isLoading}
								maxLength={NAME_MAX_LENGTH}
								required
							/>
							<i className='bx bxs-user'></i>
						</div>
						{signupNameError && <p className='auth-error'>{signupNameError}</p>}

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
								onChange={(e) => {
									const value = e.target.value
										.replace(/\D/g, "")
										.slice(0, PHONE_LENGTH);
									setSignupPhone(value);
									if (value.length > 0 && value.length < PHONE_LENGTH) {
										setSignupPhoneError(`Phone number must not be less than ${PHONE_LENGTH} digits.`);
									} else {
										setSignupPhoneError(null);
									}
								}}
								disabled={isLoading}
								maxLength={PHONE_LENGTH}
								required
							/>
							<i className='bx bxs-phone'></i>
						</div>
						{signupPhoneError && <p className='auth-error'>{signupPhoneError}</p>}

						<button
							type='submit'
							className='auth-btn'
							disabled={
								isLoading ||
								!signupName.trim() ||
								signupPhone.length !== PHONE_LENGTH
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
						<h1>Welcome </h1>
					</div>
				</div>
			</div>
		</div>
	);
};


export default AuthModal;
