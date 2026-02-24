import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	authenticateUser,
	verifyUser,
	updateUser,
} from "../../services/authApi";
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

	// Step tracking
	const [step, setStep] = useState<"email" | "otp" | "signup">("email");

	// Email / OTP
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState(["", "", "", ""]);

	// Signup fields (for new users only)
	const [signupName, setSignupName] = useState("");
	const [signupPhone, setSignupPhone] = useState("");

	// UI state
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
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
		setIsLoading(false);
		setError(null);
		setSuccessMsg(null);
		setRecaptchaVerified(false);
		setRecaptchaToken("");
		recaptchaRef.current?.reset();
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
		console.log("recaptchaVerified:", recaptchaVerified);
		if (!email.trim() || !recaptchaVerified) return;
		setIsLoading(true);
		setError(null);
		try {
			const res = await authenticateUser({ email: email.trim(), mode: "email", captchaToken: recaptchaToken });
			console.log("[Auth] authenticate-user response:", res.status);
			setSuccessMsg(
				"OTP sent to your email. Check your inbox (and spam folder).",
			);
			setStep("otp");
			// reset captcha after successful send so it can't be reused
			recaptchaRef.current?.reset();
			setRecaptchaVerified(false);
			setRecaptchaToken("");
		} catch (err: unknown) {
			const msg =
				err instanceof Error
					? err.message
					: "Failed to send OTP. Please try again.";
			console.error("[Auth] authenticate-user error:", err);
			setError(msg);
			// reset so user must re-verify on retry
			recaptchaRef.current?.reset();
			setRecaptchaVerified(false);
			setRecaptchaToken("");
		} finally {
			setIsLoading(false);
		}
	};

	// ─── Step 2: Verify OTP ───────────────────────────────────────────────────

	const handleVerifyOtp = async () => {
		const enteredOtp = otp.join("");
		if (enteredOtp.length !== 4) return;
		setIsLoading(true);
		setError(null);
		try {
			const res = await verifyUser({
				email: email.trim(),
				otp: enteredOtp,
			});
			console.log("[Auth] verify-user response:", res);

			// Persist session
			localStorage.setItem("authToken", res.data.token);
			localStorage.setItem("isLoggedIn", "true");
			
			// Save user data with email if not already in response
			if (res.data.user) {
				const userData = {
					...res.data.user,
					email: res.data.user.email || email.trim(),
				};
				localStorage.setItem("authUser", JSON.stringify(userData));
				console.log("[Auth] Saved initial user data to localStorage:", userData);
			}

			if (res.data.isNewUser) {
				// New user → ask for name & phone
				setStep("signup");
			} else {
				// Existing user → go straight to dashboard
				finishLogin();
			}
		} catch (err: unknown) {
			setError(
				err instanceof Error
					? err.message
					: "Invalid OTP. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	// ─── Step 3: Complete signup (new users) ──────────────────────────────────

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!signupName.trim() || !signupPhone.trim()) return;
		setIsLoading(true);
		setError(null);
		try {
			console.log("[Auth] Signup - calling updateUser with:", {
				fullName: signupName.trim(),
				mobile: signupPhone.trim(),
			});
			
			const updated = await updateUser({
				fullName: signupName.trim(),
				mobile: signupPhone.trim(),
			});
			
			console.log("[Auth] Signup - updateUser response:", updated.data);
			
			if (updated.data) {
				// Merge with existing user data to preserve email from OTP verification
				const existingUser = localStorage.getItem("authUser");
				let mergedUser = updated.data;
				
				if (existingUser) {
					try {
						const existing = JSON.parse(existingUser);
						// Merge to ensure we keep email if it's not in the update response
						mergedUser = {
							...existing,
							...updated.data,
							email: updated.data.email || existing.email || email.trim(),
						};
						console.log("[Auth] Signup - merged user data:", mergedUser);
					} catch (err) {
						console.error("[Auth] Failed to merge user data:", err);
					}
				}
				
				localStorage.setItem("authUser", JSON.stringify(mergedUser));
				console.log("[Auth] Signup - saved to localStorage:", mergedUser);
			}
			finishLogin();
		} catch (err: unknown) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to save profile. Please try again.",
			);
			console.error("[Auth] Signup error:", err);
		} finally {
			setIsLoading(false);
		}
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
									setError(null);
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
