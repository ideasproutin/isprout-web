import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
	const navigate = useNavigate();
	const [isActive, setIsActive] = useState(false);
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [isOtpVerified, setIsOtpVerified] = useState(false);

	// Signup fields
	const [signupName, setSignupName] = useState("");
	const [signupEmail, setSignupEmail] = useState("");
	const [signupPhone, setSignupPhone] = useState("");

	const DUMMY_OTP = "1234";

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const handleOtpChange = (index: number, value: string) => {
		if (value.length <= 1 && /^\d*$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);

			// Auto-focus next input
			if (value && index < 3) {
				const nextInput = document.getElementById(`otp-${index + 1}`);
				nextInput?.focus();
			}
		}
	};

	const handleOtpKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			const prevInput = document.getElementById(`otp-${index - 1}`);
			prevInput?.focus();
		}
	};

	const handleSendOtp = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setIsOtpSent(true);
			// Simulate sending OTP
			console.log("OTP sent to:", email);
		}
	};

	const handleVerifyOtp = () => {
		const enteredOtp = otp.join("");
		if (enteredOtp === DUMMY_OTP) {
			setIsOtpVerified(true);
			// Check if user is new (dummy logic)
			const userExists = false; // Set to false to trigger signup
			if (!userExists) {
				setSignupEmail(email);
				setTimeout(() => {
					setIsActive(true);
				}, 100);
			} else {
				// Existing user - redirect to dashboard
				navigate("/dashboard");
				onClose();
			}
		} else {
			alert("Invalid OTP. Please use 1234");
		}
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (isOtpVerified) {
			navigate("/dashboard");
			onClose();
		}
	};

	const handleSignup = (e: React.FormEvent) => {
		e.preventDefault();
		if (signupName && signupEmail && signupPhone) {
			// Simulate signup
			console.log("Signup:", { signupName, signupEmail, signupPhone });
			navigate("/dashboard");
			onClose();
		}
	};

	const resetModal = () => {
		setIsActive(false);
		setEmail("");
		setOtp(["", "", "", ""]);
		setIsOtpSent(false);
		setIsOtpVerified(false);
		setSignupName("");
		setSignupEmail("");
		setSignupPhone("");
	};

	const handleClose = () => {
		resetModal();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='auth-overlay' onClick={handleClose}>
			<div
				className={`auth-container ${isActive ? "active" : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Login Form */}
				<div className='auth-form-box login'>
					<form onSubmit={handleLogin}>
						{/* <button
							type='button'
							className='auth-close-btn'
							onClick={handleClose}
						>
							×
						</button> */}
						<h1>Login</h1>

						<div className='auth-input-box'>
							<input
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isOtpSent}
								required
							/>
							<i className='bx bxs-envelope'></i>
						</div>

						{isOtpSent && (
							<div className='auth-otp-container'>
								<label className='auth-otp-label'>
									Enter OTP
								</label>
								<div className='auth-otp-inputs'>
									{otp.map((digit, index) => (
										<input
											key={index}
											id={`otp-${index}`}
											type='text'
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
										/>
									))}
									<button
										type='button'
										className='auth-verify-btn'
										onClick={handleVerifyOtp}
										disabled={otp.join("").length !== 4}
									>
										Verify
									</button>
								</div>
							</div>
						)}

						{!isOtpSent ? (
							<button
								type='button'
								className='auth-btn'
								onClick={handleSendOtp}
							>
								Send OTP
							</button>
						) : (
							<button
								type='submit'
								className='auth-btn'
								disabled={!isOtpVerified}
							>
								Login
							</button>
						)}
					</form>
				</div>

				{/* Signup Form */}
				<div className='auth-form-box register'>
					<form onSubmit={handleSignup}>
						{/* <button
							type='button'
							className='auth-close-btn'
							onClick={handleClose}
						>
							×
						</button> */}
						<h1>Sign Up</h1>

						<div className='auth-input-box'>
							<input
								type='text'
								placeholder='Full Name'
								value={signupName}
								onChange={(e) => setSignupName(e.target.value)}
								required
							/>
							<i className='bx bxs-user'></i>
						</div>

						<div className='auth-input-box'>
							<input
								type='email'
								placeholder='Email'
								value={signupEmail}
								onChange={(e) =>
									setSignupEmail(e.target.value)
								}
								required
							/>
							<i className='bx bxs-envelope'></i>
						</div>

						<div className='auth-input-box'>
							<input
								type='tel'
								placeholder='Phone Number'
								value={signupPhone}
								onChange={(e) =>
									setSignupPhone(e.target.value)
								}
								required
							/>
							<i className='bx bxs-phone'></i>
						</div>

						<button type='submit' className='auth-btn'>
							Sign Up
						</button>
					</form>
				</div>

				{/* Toggle Box */}
				<div className='auth-toggle-box'>
					<div className='auth-toggle-panel toggle-left'>
						<h1>Hello, Welcome!</h1>
						{/* <p>Already have an account?</p>
						<button
							className='auth-btn register-btn'
							onClick={() => setIsActive(false)}
						>
							Login
						</button> */}
					</div>
					<div className='auth-toggle-panel toggle-right'>
						<h1>Welcome Back!</h1>
						{/* <p>Don't have an account?</p>
						<button
							className='auth-btn login-btn'
							onClick={() => setIsActive(true)}
						>
							Sign Up
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
