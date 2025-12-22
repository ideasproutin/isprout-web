import managedOfficeImg from '../../assets/managedofficeintro/managedofficeimg.png';
 
// SVG path definitions
const svgPaths = {
  p3c7a1100: "M16 8C18.2091 8 20 9.79086 20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8ZM16 18C19.3137 18 22 20.6863 22 24V26H10V24C10 20.6863 12.6863 18 16 18Z",
  p1702f600: "M9 419C9 416.333 10 411 14 411C18 411 25 414 28.5 419",
  p373bfa80: "M11.4444 20.9689C24.9634 26.9825 39.4945 30.3203 54.3589 30.8227C57.8807 30.9604 62.1739 31.0982 64.6958 28.5764C66.0735 27.1987 66.7624 25.1325 66.7624 23.066C66.7624 21.6883 66.418 20.3106 65.3847 19.6217C60.7966 16.7554 54.3589 20.6551 49.7708 23.066C43.3331 26.6213 36.2064 28.9208 29.4241 32.1317C28.0464 32.8206 26.3243 34.5427 27.702 35.9204C28.7353 36.9537 30.1131 36.2648 31.4908 35.9204C39.4173 33.9652 47.3437 31.6657 55.2701 29.7105C57.2253 29.3661 59.8694 28.6772 61.4804 30.2883C62.858 31.666 62.1692 33.7322 61.4804 35.2315C60.4471 37.5309 58.7249 39.486 56.6587 40.8637C51.0372 44.7634 43.6775 44.4189 37.2398 42.8079C29.0797 40.8637 21.2643 37.5309 14.1376 33.165C12.4155 32.1317 9.08269 30.7538 9.42713 28.3432C9.77157 26.2769 12.7599 25.9325 14.4821 25.588C20.5753 24.5547 26.6686 23.8658 32.762 23.7547C36.5508 23.7547 42.2996 22.7214 44.7109 26.2769",
  p1aefb600: "M53.2042 20.856C53.2042 20.856 54.3587 16.4986 56.0953 14.4176"
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
 
const IntroSection: React.FC = () => {
  return (
    <div className="bg-white relative w-full min-h-screen flex items-start justify-center pt-0 -mt-24 sm:-mt-28">
      {/* Main container scaled for laptop screens */}
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
     
        {/* Office image in circle with border - perfectly centered within black ellipse */}
        <div className="absolute h-[530px] left-[30.2%] sm:left-[302px] top-[-28px] w-[59%] sm:w-[590px]">
          <div className="w-full h-full rounded-[50%] overflow-hidden border-[2px] border-black">
        <img alt="Office reception area" className="block max-w-none size-full object-cover" src={managedOfficeImg} />
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
     
        {/* Small yellow decorative circle - positioned on the right edge of black ellipse */}
        <div className="absolute left-[89.8%] sm:left-[878px] size-[52px] top-[218px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <circle cx="35" cy="35" fill="#FFDE00" r="34" stroke="black" strokeWidth="2" />
          </svg>
        </div>
     
        {/* Managed Office heading - centered on yellow circle */}
        <p className="absolute font-bold leading-normal left-[9.8%] sm:left-[98px] text-[24px] sm:text-[30px] text-black whitespace-nowrap top-[200px]">
          Managed Office
        </p>
     
        {/* Subtitle - centered on yellow circle */}
        <p className="absolute font-normal leading-normal left-[9.2%] sm:left-[92px] text-[16px] sm:text-[18px] text-black whitespace-nowrap top-[270px]">
          Work where ideas spark fast.
        </p>
     
        {/* Feature cards - diagonal cascade from yellow circle (reduced size) */}
        <FeatureCard
          title="Innovation"
          subtitle="stands out"
          style={{ left: '2%', top: '360px', width: '200px', height: '76px', padding: '16px' }}
        />
        <FeatureCard
          title="Flexibility"
          subtitle="& Comfort"
          style={{ left: '24%', top: '420px', width: '200px', height: '76px', padding: '16px' }}
        />
        <FeatureCard
          title="Vibrant"
          subtitle="Community"
          style={{ left: '46%', top: '480px', width: '200px', height: '76px', padding: '16px' }}
        />
     
      </div>
    </div>
  );
 
}
export default IntroSection;
