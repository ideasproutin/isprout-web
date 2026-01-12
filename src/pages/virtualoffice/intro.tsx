import heroImage from "../../assets/virtualoffice/virtualoffice_herosection.png";
import formImage from "../../assets/virtualoffice/virtualoffice_form_img.png";
import officeImage from "../../assets/virtualoffice/virtualoffice.png";
import WhyVirtualOffice from "./whyvirtualoffice";
import Locations from "../home/components/locations";
import VirtualOfficeProcess from "./virtualoffice_process";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import { COLORS } from "../../helpers/constants/Colors";

// SVG path definitions
const svgPaths = {
  p3c7a1100: "M16 8C18.2091 8 20 9.79086 20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8ZM16 18C19.3137 18 22 20.6863 22 24V26H10V24C10 20.6863 12.6863 18 16 18Z",
  p1702f600: "M9 419C9 416.333 10 411 14 411C18 411 25 414 28.5 419"
};

function UserIcon() {
  return (
    <div className="[grid-area:1_/_1] ml-[12px] mt-[12px] relative size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.p3c7a1100} fill="#F4F3F8" />
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-[#ffde00] ml-0 mt-0 rounded-[18px] size-[48px]" />
      <UserIcon />
    </div>
  );
}

function FeatureCard({ title, subtitle, style }: { title: string; subtitle: string; style: React.CSSProperties }) {
  return (
    <div className="absolute bg-[#f4f3f8] content-stretch flex gap-[12px] h-[104px] items-start p-[24px] rounded-[24px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.15)] w-[247px] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0px_16px_40px_0px_rgba(0,0,0,0.2)] cursor-pointer" style={style}>
      <Icon />
      <div className="content-stretch flex flex-col items-start leading-[normal] not-italic relative shrink-0 text-left">
        <p className="relative shrink-0 text-[#333] text-[18px] font-medium">{title}</p>
        <p className="relative shrink-0 text-[#909090] text-[14px]">{subtitle}</p>
      </div>
    </div>
  );
}

const VirtualOfficeIntro = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white relative w-full min-h-screen flex items-start justify-center pt-10 sm:pt-10">
        <div className="relative w-full max-w-[1000px] h-[580px] mt-0 mx-auto px-4 sm:px-6 lg:px-8">
         
          {/* Black background ellipse with shadow */}
          <div className="absolute h-[560px] left-[28.5%] sm:left-[285px] top-[-40px] w-[62.5%] sm:w-[625px]">
            <div className="absolute inset-[0_-0.94%_-1.83%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 855 777">
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="777" id="filter0_d_1_68" width="855" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dx="4" dy="10" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_68" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_68" mode="normal" result="shape" />
                  </filter>
                </defs>
                <ellipse cx="423.5" cy="381.5" fill="black" rx="423.5" ry="381.5" filter="url(#filter0_d_1_68)" />
              </svg>
            </div>
          </div>
   
          {/* Virtual office image in circle with border */}
          <div className="absolute h-[530px] left-[30.2%] sm:left-[302px] top-[-28px] w-[59%] sm:w-[590px]">
            <div className="w-full h-full rounded-[50%] overflow-hidden border-[2px] border-black">
              <img alt="Modern office workspace with laptop" className="block max-w-none size-full object-cover" src={heroImage} />
            </div>
          </div>
   
          {/* Yellow speech bubble ellipse with shadow and border */}
          <div className="absolute h-[310px] left-[5%] sm:left-[50px] top-[105px] w-[31.8%] sm:w-[318px]">
            <div className="absolute inset-[0_0_-1.91%_-2.1%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 437 427">
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="427" id="filter0_d_1_66" width="437" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dx="-5" dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_66" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_66" mode="normal" result="shape" />
                  </filter>
                </defs>
                <ellipse cx="223" cy="209.5" fill="#FFDE00" rx="214" ry="209.5" stroke="black" strokeWidth="2" filter="url(#filter0_d_1_66)" />
                <path d={svgPaths.p1702f600} stroke="black" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
   
          {/* Small yellow decorative circle */}
          <div className="absolute left-[89.8%] sm:left-[878px] size-[52px] top-[218px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
              <circle cx="35" cy="35" fill="#FFDE00" r="34" stroke="black" strokeWidth="2" />
            </svg>
          </div>
   
          {/* Virtual Office heading */}
          <p className="absolute font-bold leading-normal left-[9.8%] sm:left-[98px] text-[24px] sm:text-[30px] whitespace-nowrap top-[200px]" style={{ color: COLORS.textBlack }}>
            Virtual Office
          </p>
   
          {/* Subtitle */}
          <p className="absolute font-normal leading-normal left-[9.2%] sm:left-[92px] text-[16px] sm:text-[18px] whitespace-nowrap top-[270px]" style={{ color: COLORS.textBlack }}>
            Your Business, Anywhere. Instantly
          </p>
   
          {/* Feature cards */}
          <FeatureCard
            title="Flexible"
            subtitle="Cost-Effective"
            style={{ left: '2%', top: '360px', width: '200px', height: '76px', padding: '16px' }}
          />
          <FeatureCard
            title="Secure"
            subtitle="Verified Handling"
            style={{ left: '24%', top: '420px', width: '200px', height: '76px', padding: '16px' }}
          />
          <FeatureCard
            title="Hassle-Free"
            subtitle="Quick Setup"
            style={{ left: '46%', top: '480px', width: '200px', height: '76px', padding: '16px' }}
          />
        </div>
      </div>

      {/* Set Up Your Virtual Office Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-3xl md:text-4xl mb-6"
                style={{ fontFamily: "Outfit, sans-serif", color: "#00275c" }}
              >
                <span>Set Up Your </span>
                <span style={{ color: "#FFDE00" }}>Virtual Office</span>
                <span> Today</span>
              </h2>
              <p
                className="text-lg md:text-xl mb-8"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Submit your details to activate your virtual workspace, business
                address and mail services.
              </p>
              <div className="rounded-xl overflow-hidden max-w-md">
                <img
                  alt="Virtual Office Space"
                  className="w-full h-full"
                  src={formImage}
                />
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl">
              <form className="space-y-6">
                <div>
                  <label
                    className="block text-lg mb-2"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#00275c",
                    }}
                  >
                    Full Name:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{
                        border: "2px solid #00275c",
                        fontFamily: "Outfit, sans-serif",
                      }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: COLORS.textBlack }}>
                      👤
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-lg mb-2"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#00275c",
                    }}
                  >
                    Your Email:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{
                        border: "2px solid #00275c",
                        fontFamily: "Outfit, sans-serif",
                      }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: COLORS.textBlack }}>
                      ✉️
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-lg mb-2"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#00275c",
                    }}
                  >
                    Phone Number:
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{
                        border: "2px solid #00275c",
                        fontFamily: "Outfit, sans-serif",
                      }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: COLORS.textBlack }}>
                      📞
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-lg mb-2"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#00275c",
                    }}
                  >
                    Preferred City:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{
                        border: "2px solid #00275c",
                        fontFamily: "Outfit, sans-serif",
                      }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: COLORS.textBlack }}>
                      📍
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-lg mb-2"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#00275c",
                    }}
                  >
                    Company Name:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full px-4 py-3 focus:outline-none"
                      style={{
                        border: "2px solid #00275c",
                        fontFamily: "Outfit, sans-serif",
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-5 h-5"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm italic"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    I agree to the{" "}
                    <span className="underline">terms & policy</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-12 py-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: "#FFDE00",
                    color: "#00275c",
                    fontFamily: "Outfit, sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e6c900")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#FFDE00")
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Virtual Office Component */}
      <WhyVirtualOffice />

      {/* Locations Component */}
      <Locations />

      {/* Virtual Office Process and FAQs */}
      <VirtualOfficeProcess />

      {/* Future of Work Component */}
      <FutureOfWork />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VirtualOfficeIntro;
