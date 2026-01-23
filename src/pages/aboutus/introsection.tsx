import aboutusImg1 from '../../assets/aboutus_intro/aboutus_img1.png';
import aboutusImg2 from '../../assets/aboutus_intro/aboutus_img2.png';
import aboutusImg3 from '../../assets/aboutus_intro/aboutus_img3.png';
import { COLORS } from '../../helpers/constants/Colors';
import InfoStrip from '../careers/info-strip';

const IntroSection = () => {
  return (
    <>
    <section className="relative w-full overflow-hidden pt-12 sm:pt-16 lg:pt-10 pb-0 mb-[-250px]">
      {/* ✅ SINGLE SOURCE OF HORIZONTAL ALIGNMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
 
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-15 pt-8 lg:pt-12">
            <div>
              <p className="text-xs tracking-widest mb-2" style={{ color: COLORS.textGray600 }}>
                A BIT
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold" style={{ color: COLORS.textGray900 }}>
                ABOUT US
              </h1>
            </div>
 
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: COLORS.textGray700 }}>
              At iSprout, we're a bunch of dreamers and doers who believe that
              workspaces should be anything but boring. We're on a mission to
              create offices that people actually look forward to every day.
            </p>
 
            <button
              className="w-fit px-8 py-4 rounded-full text-sm sm:text-base font-semibold transition hover:opacity-90"
              style={{ backgroundColor: COLORS.brandBlue, color: COLORS.textWhite }}
            >
              EXPLORE MORE
            </button>
          </div>
 
          {/* Right Column - Images */}
          <div className="relative h-full flex items-center justify-center">
            {/* Container for the overlapping images */}
            <div className="relative w-full max-w-[700px] h-[900px]">
              {/* Top Left Image - Behind others */}
              <div className="absolute top-0 bottom-2 left-14 w-[85%] z-10">
                <img 
                  alt="iSprout Office" 
                  className="w-full rounded-[20px]" 
                  src={aboutusImg1} 
                />
              </div>

              {/* Middle Right Image - Center layer */}
              <div className="absolute top-[26%] right-[20%] w-[50%] z-20">
                <img 
                  alt="iSprout Team" 
                  className="w-full rounded-[20px]" 
                  src={aboutusImg2} 
                />
              </div>

              {/* Bottom Left Image with Badge - Front layer */}
              <div className="absolute bottom-90 left-[8%] w-[35%] z-30">
                {/* White border box */}
                <div className="bg-white p-3 rounded-3xl">
                  <img 
                    alt="iSprout Workspace" 
                    className="w-full rounded-2xl" 
                    src={aboutusImg3} 
                  />
                </div>
              </div>

              {/* Decorative Ring - Bottom right of images */}
                <div className="absolute bottom-90 right-0 z-10 opacity-100 pointer-events-none">
                  <svg
                  className="w-64 h-64"
                  viewBox="0 0 192 192"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  >
                  <circle cx="96" cy="96" r="72" stroke="#FFDE00" strokeWidth="22" fill="none" />
                  </svg>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* INFO STRIP */}
    <InfoStrip />
    </>
  );
};
 
export default IntroSection;
 
 