import React from "react";
import { Mail, Phone, User, Building2 } from "lucide-react";
import contactFormImage from "../../assets/contactus/contact-form.png";
import { FloatingInput, FloatingTextarea } from "./FloatingLabelInput";

interface FormData {
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  message: string;
  acceptTerms: boolean;
}

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({
  formData,
  setFormData,
  onSubmit
}: Props) {
  return (
    <section className="w-full min-h-screen bg-[#eaf4fb]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT – IMAGE */}
          <div className="relative hidden lg:block rounded-2xl overflow-hidden">
            <img
              src={contactFormImage}
              alt="Office"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Yellow semi-circle */}
            <div className="absolute right-[-1%] top-0 bottom-0 w-[55%]">
              <svg
                viewBox="0 0 376 851"
                className="h-full w-auto absolute right-0"
              >
                <path
                  d="M375.7 0C167.8 29.6 8 206.9 8 421.1C8 635.4 167.8 812.6 375.7 842.3V0Z"
                  fill="#00275c"
                />
              </svg>
            </div>

            {/* Teal semi-circle */}
            {/* <div className="absolute right-[0%] top-0 bottom-0 w-[45%]">
              <svg
                viewBox="0 0 320 760"
                className="h-[90%] w-auto absolute right-0 top-[49%] -translate-y-1/2"
              >
                <path
                  d="M320 0V760C143 760 0 590 0 380S143 0 320 0Z"
                  fill="#204758"
                />
              </svg>
            </div> */}

            {/* TEXT */}
            <div className="absolute right-[3%] top-1/2 -translate-y-1/2 text-center">
              <p className="text-white/80 text-5xl font-serif leading-tight tracking-widest">
                GET <br /> IN <br /> TOUCH
              </p>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 lg:p-10 flex items-center">
            <form onSubmit={onSubmit} className="space-y-5 w-full">

              <FloatingInput
                label="Full Name"
                value={formData.fullName}
                onChange={(v) => setFormData({ ...formData, fullName: v })}
                icon={<User size={18} />}
                required
              />

              <FloatingInput
                label="Work Email"
                type="email"
                value={formData.workEmail}
                onChange={(v) => setFormData({ ...formData, workEmail: v })}
                icon={<Mail size={18} />}
                required
              />

              <FloatingInput
                label="Phone Number"
                type="tel"
                value={formData.phoneNumber}
                onChange={(v) => setFormData({ ...formData, phoneNumber: v })}
                icon={<Phone size={18} />}
                required
              />

              <FloatingInput
                label="Company Name"
                value={formData.companyName}
                onChange={(v) => setFormData({ ...formData, companyName: v })}
                icon={<Building2 size={18} />}
                required
              />

              <FloatingTextarea
                label="Comments / Enquiry"
                value={formData.message}
                onChange={(v) => setFormData({ ...formData, message: v })}
              />

              <label className="flex gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptTerms: e.target.checked })
                  }
                  required
                />
                I accept all of iSprout’s terms & conditions
              </label>

              <button
                type="submit"
                className="mx-auto block bg-[#00275c]! text-white! px-14 py-3 rounded-xl hover:bg-[#00275c]! transition shadow-md"
              >
                Submit
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
