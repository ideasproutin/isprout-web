import { Facebook, Linkedin, Share2, Tag } from "lucide-react";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { COLORS } from "../../helpers/constants/Colors";

interface BlogsShareProps {
	keywords: string[];
	blogTitle: string;
	blogUrl: string;
}

const BlogsShare = ({ keywords, blogTitle, blogUrl }: BlogsShareProps) => {
	const shareToSocialMedia = (platform: string) => {
		const encodedTitle = encodeURIComponent(blogTitle);
		const encodedUrl = encodeURIComponent(blogUrl);

		const shareUrls: { [key: string]: string } = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
			twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
			whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		};

		const url = shareUrls[platform];
		if (url) {
			window.open(url, "_blank", "width=600,height=400");
		}
	};

	return (
		<div
			className='py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8'
			style={{ backgroundColor: "#ffffff"}}
		>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center'>
					{/* Left - Keywords */}
					<div>
						<h3
							className='text-base sm:text-lg font-semibold flex items-center gap-2 mb-2'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							<Tag size={20} />
							TAGS
						</h3>
						<p
							className='text-sm sm:text-base'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray,
								fontWeight: 400,
							}}
						>
							{keywords.join(", ")}
						</p>
					</div>

					{/* Right - Share Icons */}
					<div className='flex items-center justify-start md:justify-end gap-3 sm:gap-4'>
						<span
							className='text-base sm:text-lg font-semibold flex items-center gap-2'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							<Share2 size={20} />
							Share:
						</span>
						<button
							onClick={() => shareToSocialMedia("facebook")}
							className='p-2 sm:p-2.5 rounded-full transition-all hover:scale-110'
							style={{
								backgroundColor: COLORS.brandBlue,
								color: COLORS.white,
							}}
							aria-label='Share on Facebook'
						>
							<Facebook size={20} />
						</button>
						<button
							onClick={() => shareToSocialMedia("twitter")}
							className='p-2 sm:p-2.5 rounded-full transition-all hover:scale-110'
							style={{
								backgroundColor: COLORS.brandBlue,
								color: COLORS.white,
							}}
							aria-label='Share on X (Twitter)'
						>
							<FaXTwitter size={20} />
						</button>
						<button
							onClick={() => shareToSocialMedia("whatsapp")}
							className='p-2 sm:p-2.5 rounded-full transition-all hover:scale-110'
							style={{
								backgroundColor: COLORS.brandBlue,
								color: COLORS.white,
							}}
							aria-label='Share on WhatsApp'
						>
							<FaWhatsapp size={20} />
						</button>
						<button
							onClick={() => shareToSocialMedia("linkedin")}
							className='p-2 sm:p-2.5 rounded-full transition-all hover:scale-110'
							style={{
								backgroundColor: COLORS.brandBlue,
								color: COLORS.white,
							}}
							aria-label='Share on LinkedIn'
						>
							<Linkedin size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogsShare;
