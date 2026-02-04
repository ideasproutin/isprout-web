import { useParams } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";
import { MdPerson, MdPhone, MdEmail, MdBusiness } from "react-icons/md";
import { useCityCenters } from "../../hooks/useCityCentre";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import Description from "./Description";
import CityCenters from "./CityCenters";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";

const Hero = () => {
  const { data: cityCentersData } = useCityCenters();
  const { cityName } = useParams<{ cityName: string }>();
  const [, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    workEmail: "",
    companyName: "",
    requiredSeats: "" as number | "",
    acceptTerms: false,
  });

  // Captcha state
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  // Form submission hook
  const { submit: submitFormData, isSubmitting: isApiSubmitting } =
    useFormSubmit({
      successMessage:
        "Your inquiry has been submitted successfully! We'll contact you soon.",
      onSuccess: () => {
        setFormData({
          fullName: "",
          phoneNumber: "",
          workEmail: "",
          companyName: "",
          requiredSeats: "",
          acceptTerms: false,
        });
        setCaptchaToken("");
        setIsCaptchaVerified(false);
        setSubmissionResult("Form submitted successfully!");
      },
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Captcha verification callback
  const handleCaptchaVerify = useCallback(
    (token: string, isVerified: boolean) => {
      console.log("📝 Form received captcha:", { token, isVerified });
      setCaptchaToken(token);
      setIsCaptchaVerified(isVerified);
    },
    [],
  );

  // Form validation
  const isFormValid =
    formData.fullName &&
    formData.workEmail &&
    formData.phoneNumber &&
    formData.companyName &&
    formData.requiredSeats &&
    formData.acceptTerms &&
    isCaptchaVerified &&
    captchaToken &&
    !submitting &&
    !isApiSubmitting;

  const handleIncrementSeats = () => {
    setFormData((prev) => ({
      ...prev,
      requiredSeats:
        (typeof prev.requiredSeats === "number" ? prev.requiredSeats : 0) + 1,
    }));
  };

  const handleDecrementSeats = () => {
    setFormData((prev) => ({
      ...prev,
      requiredSeats: Math.max(
        1,
        (typeof prev.requiredSeats === "number" ? prev.requiredSeats : 1) - 1,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Double-check captcha is verified
    if (!isCaptchaVerified || !captchaToken) {
      console.error("Captcha not verified");
      return;
    }

    setSubmissionResult(null);
    setSubmitting(true);
    console.log("🚀 Submitting form with captcha token:", captchaToken);

    // Build payload
    const payload = buildFormPayload("CONTACT_US", {
      ...formData,
      email: formData.workEmail,
      city: cityName,
    });

    try {
      await submitFormData(payload, captchaToken);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionResult(null);
    } finally {
      setSubmitting(false);
    }
  };

  // Get hero image from city data (API only)
  const city =
    cityCentersData?.find(
      (c: any) => c.id === (cityName?.toLowerCase() || "hyderabad"),
    ) || cityCentersData?.[0];

  const selectedHeroImage = city?.heroImage;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={selectedHeroImage}
            alt={`${cityName} workspace`}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Right Side - Form */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-16 z-20 w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 lg:p-8"
            style={{ backgroundColor: "#00000066" }}
          >
            {/* Full Name */}
            <div className="mb-4">
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Full Name:"
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderColor: "white",
                  }}
                  required
                />
                <MdPerson
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: "white" }}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <div className="relative">
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("phoneNumber")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Phone Number:"
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderColor: "white",
                  }}
                  required
                />
                <MdPhone
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: "white" }}
                />
              </div>
            </div>

            {/* Work Email */}
            <div className="mb-4">
              <div className="relative">
                <input
                  id="workEmail"
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("workEmail")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Work Email:"
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderColor: "white",
                  }}
                  required
                />
                <MdEmail
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: "white" }}
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="mb-6">
              <div className="relative">
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("companyName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Company Name:"
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderColor: "white",
                  }}
                  required
                />
                <MdBusiness
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: "white" }}
                />
              </div>
            </div>

            {/* Required Seats */}
            <div className="mb-6 group">
              <div className="relative">
                <input
                  id="requiredSeats"
                  type="number"
                  name="requiredSeats"
                  value={formData.requiredSeats}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? "" : parseInt(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      requiredSeats: value as number,
                    }));
                  }}
                  onBlur={(e) => {
                    const value = Math.max(1, parseInt(e.target.value) || 1);
                    setFormData((prev) => ({
                      ...prev,
                      requiredSeats: value,
                    }));
                    setFocusedField(null);
                  }}
                  onFocus={() => setFocusedField("requiredSeats")}
                  placeholder="Required Seats:"
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-left [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderColor: "white",
                  }}
                  min="1"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={handleIncrementSeats}
                    className="text-white hover:opacity-70 transition-opacity p-0 leading-none"
                    style={{
                      background: "none",
                      border: "none",
                    }}
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="white">
                      <path d="M5 0L10 6H0L5 0Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleDecrementSeats}
                    className="text-white hover:opacity-70 transition-opacity p-0 leading-none"
                    style={{
                      background: "none",
                      border: "none",
                    }}
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="white">
                      <path d="M5 6L0 0H10L5 6Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="mb-6 flex items-center gap-3">
              <input
                id="acceptTerms"
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    acceptTerms: e.target.checked,
                  }))
                }
                className="w-4 h-4 rounded border-2 border-white cursor-pointer"
                style={{ accentColor: "white" }}
                required
              />
              <label
                htmlFor="acceptTerms"
                className="text-white text-sm cursor-pointer"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                I accept the terms and conditions
              </label>
            </div>

						{/* ReCAPTCHA */}
						<div className='mb-6'>
							<V3Recaptcha
								action='hero_form_submit'
								onVerify={handleCaptchaVerify}
							/>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={!isFormValid}
							className='w-full py-3 rounded-lg font-semibold text-base transition-all duration-300'
							style={{
								backgroundColor: isFormValid
									? "#FFDE00"
									: "#f5f5f5",
								color: COLORS.brandBlue,
								fontFamily: "Outfit, sans-serif",
								cursor: isFormValid ? "pointer" : "not-allowed",
								opacity: isFormValid ? 1 : 0.6,
							}}
						>
							{submitting || isApiSubmitting
								? "Submitting..."
								: "Request Call Back"}
						</button>
					</form>
				</div>

        {/* Bottom Left - Hero Text and Button */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 lg:px-16 pb-8">
          <div className="max-w-7xl mx-auto w-full">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <span className="text-white">Managed Offices </span>
              <span
                className="font-bold"
                style={{
                  fontFamily: "Otomanopee One, sans-serif",
                  color: COLORS.brandYellow,
                }}
              >
                {(cityName?.charAt(0).toUpperCase() ?? "") +
                  (cityName?.slice(1) ?? "")}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Description Section with Map */}
      <div className="mt-4 lg:mt-6">
        <Description cityName={cityName} />
      </div>

      {/* City Centers Section */}
      <CityCenters cityName={cityName} />

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Hero;
