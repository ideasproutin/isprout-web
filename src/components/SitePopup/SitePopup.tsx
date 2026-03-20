import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
	ExternalLink,
} from "lucide-react";
import type { SitePopupData } from "../../services/sitePopupApi";

interface SitePopupProps {
	isOpen: boolean;
	onClose: () => void;
	popupData: SitePopupData | null;
}

const isValidLink = (value: string) => {
	if (!value.trim()) return false;
	return /^(https?:\/\/|\/|mailto:|tel:)/i.test(value.trim());
};

const isExternalLink = (value: string) => /^https?:\/\//i.test(value);
const isInternalLink = (value: string) => /^\/(?!\/)/.test(value);

const SitePopup = ({ isOpen, onClose, popupData }: SitePopupProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", onEsc);

		return () => {
			window.removeEventListener("keydown", onEsc);
			document.body.style.overflow = originalOverflow;
		};
	}, [isOpen, onClose]);

	if (!isOpen || !popupData) {
		return null;
	}

	const ctaLink = isValidLink(popupData.ctaLink)
		? popupData.ctaLink.trim()
		: "";
	const isExternal = ctaLink ? isExternalLink(ctaLink) : false;
	const isInternal = ctaLink ? isInternalLink(ctaLink) : false;
	const hasImage = Boolean(popupData.imageUrl.trim());

	return (
		<div
			className='fixed inset-0 z-[1200] flex items-center justify-center bg-[#111827]/75 px-4 py-6 backdrop-blur-[2px] sm:px-8'
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div
				role='dialog'
				aria-modal='true'
				aria-labelledby='site-popup-title'
				className='relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_25px_80px_rgba(0,0,0,0.4)]'
			>
				<button
					type='button'
					onClick={onClose}
					className='absolute right-2 top-1 z-30 m-0 cursor-pointer border-0 bg-transparent p-0 text-4xl font-bold leading-none text-[#111827] transition hover:text-black focus:outline-none sm:right-2 sm:top-1'
					style={{
						border: "none",
						background: "transparent",
						borderRadius: 0,
						boxShadow: "none",
					}}
					aria-label='Close popup'
				>
					<span aria-hidden='true' className='block leading-none'>
						&times;
					</span>
				</button>

				<div className='grid grid-cols-1 md:grid-cols-[44%_56%]'>
					<div className='h-60 bg-[#f3f4f6] sm:h-72 md:h-full md:min-h-[500px]'>
						{hasImage ? (
							<img
								src={popupData.imageUrl}
								alt={popupData.heading || "iSprout announcement"}
								className='h-full w-full object-cover'
								loading='lazy'
							/>
						) : (
							<div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dbeafe] via-[#f8fafc] to-[#fde68a] px-6'>
								<p className='text-center text-xl font-bold text-[#1f2937] sm:text-2xl'>
									iSprout
								</p>
							</div>
						)}
					</div>

					<div className='flex flex-col justify-center px-5 py-7 text-center sm:px-8 sm:py-10 md:px-12 md:text-left'>
						<h2
							id='site-popup-title'
							className='text-3xl font-extrabold uppercase leading-tight text-[#111827] sm:text-4xl'
						>
							{popupData.heading || "Special Announcement"}
						</h2>

						{popupData.subheading && (
							<p className='mt-3 text-sm font-semibold text-[#6b7280] sm:text-base'>
								{popupData.subheading}
							</p>
						)}

						{popupData.content && (
							<p className='mt-4 text-sm leading-relaxed text-[#4b5563] sm:mt-5 sm:text-base'>
								{popupData.content}
							</p>
						)}

						<div className='mt-6 sm:mt-8'>
							{popupData.ctaButtonText ? (
								ctaLink ? (
									isInternal ? (
										<Link
											to={ctaLink}
											onClick={onClose}
											className='inline-flex items-center justify-center gap-2 rounded-md bg-[#111827] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#00275c]'
										>
											<span>{popupData.ctaButtonText}</span>
										</Link>
									) : (
										<a
											href={ctaLink}
											target={isExternal ? "_blank" : undefined}
											rel={isExternal ? "noopener noreferrer" : undefined}
											className='inline-flex items-center justify-center gap-2 rounded-md bg-[#111827] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#00275c]'
										>
											<span>{popupData.ctaButtonText}</span>
											{isExternal && <ExternalLink size={14} />}
										</a>
									)
								) : (
									<button
										type='button'
										onClick={onClose}
										className='inline-flex items-center justify-center rounded-md bg-[#111827] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#00275c]'
									>
										{popupData.ctaButtonText}
									</button>
								)
							) : null}
						</div>

					</div>
				</div>
			</div>
		</div>
	);
};

export default SitePopup;
