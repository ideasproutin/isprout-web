import aboutusImg1 from '../../assets/aboutus_intro/aboutus_img1.png';
import aboutusImg2 from '../../assets/aboutus_intro/aboutus_img2.png';
import aboutusImg3 from '../../assets/aboutus_intro/aboutus_img3.png';
import { COLORS } from '../../helpers/constants/Colors';

interface StatLeafProps {
  value: string;
  label: string;
  variant: 'tl' | 'tr' | 'bl' | 'br';
}

const IntroSection = () => {
  const StatLeaf = ({ value, label, variant }: StatLeafProps) => {
    const borderRadiusMap = {
      tl: '200px 0 200px 0',
      tr: '0 200px 0 200px',
      bl: '0 200px 0 200px',
      br: '200px 0 200px 0',
    };

    return (
      <div
        className="w-full aspect-[4/3] flex flex-col items-center justify-center shadow-sm"
        style={{
          backgroundColor: COLORS.brandYellow,
          borderRadius: borderRadiusMap[variant],
        }}
      >
        <p
          className="text-lg sm:text-xl font-bold"
          style={{ color: COLORS.textBlack }}
        >
          {value}
        </p>
        <p
          className="text-xs sm:text-sm"
          style={{ color: COLORS.textBlack }}
        >
          {label}
        </p>
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden pt-0 pb-12 sm:pb-16 lg:pb-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="text-xs tracking-widest mb-2"
                style={{ color: COLORS.textGray600 }}
              >
                A BIT
              </p>
              <h1
                className="text-3xl sm:text-4xl lg:text-6xl font-bold"
                style={{ color: COLORS.textGray900 }}
              >
                ABOUT US
              </h1>
            </div>

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: COLORS.textGray700 }}
            >
              At iSprout, we're a bunch of dreamers and doers who believe that
              workspaces should be anything but boring. We're on a mission to
              create offices that people actually look forward to every day.
            </p>

            <button
              className="w-fit px-8 py-4 rounded-full text-sm sm:text-base font-semibold transition hover:opacity-90"
              style={{
                backgroundColor: COLORS.brandBlue,
                color: COLORS.textWhite,
              }}
            >
              EXPLORE MORE
            </button>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md pt-4">
              <StatLeaf value="8" label="Cities" variant="tl" />
              <StatLeaf value="26" label="Centers" variant="tr" />
              <StatLeaf value="39k+" label="Workstations" variant="bl" />
              <StatLeaf value="2.4Mn" label="Square feet" variant="br" />
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto">

            {/* MOBILE STACK */}
            <div className="flex flex-col gap-6 lg:hidden">
              <img
                src={aboutusImg1}
                alt="iSprout Office"
                className="rounded-2xl w-full object-cover"
              />
              <img
                src={aboutusImg2}
                alt="iSprout Team"
                className="rounded-2xl w-full object-cover"
              />
              <div className="relative">
                <img
                  src={aboutusImg3}
                  alt="iSprout Workspace"
                  className="rounded-2xl w-full object-cover"
                />

                {/* Badge */}
                <div
                  className="absolute -bottom-4 -right-4 px-6 py-3 rounded-lg shadow-lg"
                  style={{ backgroundColor: COLORS.brandYellow }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: COLORS.textPrimary }}
                  >
                    17k+
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: COLORS.textPrimary }}
                  >
                    Places
                  </p>
                </div>
              </div>
            </div>

            {/* DESKTOP OVERLAP */}
            <div className="hidden lg:block relative h-[520px]">
              <img
                src={aboutusImg1}
                alt="iSprout Office"
                className="absolute top-0 left-12 w-[75%] rounded-2xl object-cover z-10"
              />

              <img
                src={aboutusImg2}
                alt="iSprout Team"
                className="absolute top-32 right-0 w-[45%] rounded-2xl object-cover z-20"
              />

              <div className="absolute bottom-16 left-16      w-[35%] z-30">
                <img
                  src={aboutusImg3}
                  alt="iSprout Workspace"
                  className="rounded-2xl object-cover"
                />

                <div
                  className="absolute -bottom-4 -right-6 px-6 py-3 rounded-lg shadow-lg"
                  style={{ backgroundColor: COLORS.brandYellow }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: COLORS.textPrimary }}
                  >
                    17k+
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: COLORS.textPrimary }}
                  >
                    Places
                  </p>
                </div>
              </div>

              {/* Decorative Ring */}
                <svg
                className="absolute bottom-30 right-[-32px] w-56 h-56 pointer-events-none"
                viewBox="0 0 192 192"
                aria-hidden="true"
                >
                <circle
                  cx="96"
                  cy="96"
                  r="72"
                  stroke={COLORS.brandYellow}
                  strokeWidth="22"
                  fill="none"
                />
                </svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
