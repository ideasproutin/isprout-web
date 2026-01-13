import React from "react";
import { Mail, Phone, User, Building2 } from "lucide-react";
import contactFormImage from "../../assets/contactus/contact-form.png";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "./FloatingLabelInput";

interface FormData {
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  requirements: string;
  city: string;
  office: string;
  seats: number;
  source: string;
  message: string;
  acceptTerms: boolean;
}

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  cities: string[];
  officesByCity: Record<string, string[]>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({
  formData,
  setFormData,
  cities,
  officesByCity,
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
                  fill="#FFDE00"
                />
              </svg>
            </div>

            {/* Teal semi-circle */}
            <div className="absolute right-[3%] top-0 bottom-0 w-[45%]">
              <svg
                viewBox="0 0 320 760"
                className="h-[90%] w-auto absolute right-0 top-[49%] -translate-y-1/2"
              >
                <path
                  d="M320 0V760C143 760 0 590 0 380S143 0 320 0Z"
                  fill="#204758"
                />
              </svg>
            </div>

            {/* TEXT */}
            <div className="absolute right-[14%] top-1/2 -translate-y-1/2 text-center">
              <p className="text-white/80 text-5xl font-serif leading-tight tracking-widest">
                GET <br /> IN <br /> TOUCH
              </p>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 lg:p-10">
            <form onSubmit={onSubmit} className="space-y-5">

              <FloatingInput
                label="Full Name"
                value={formData.fullName}
                onChange={(v) => setFormData({ ...formData, fullName: v })}
                icon={<User size={18} />}
                required
              />

              <div className="grid sm:grid-cols-2 gap-4">
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
              </div>

              <FloatingInput
                label="Company Name"
                value={formData.companyName}
                onChange={(v) => setFormData({ ...formData, companyName: v })}
                icon={<Building2 size={18} />}
                required
              />

              <FloatingSelect
                label="Select Your Requirements"
                value={formData.requirements}
                onChange={(v) => setFormData({ ...formData, requirements: v })}
                options={["Managed Office", "Virtual Office", "Meeting Room"]}
                required
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingSelect
                  label="City"
                  value={formData.city}
                  onChange={(v) =>
                    setFormData({ ...formData, city: v, office: "" })
                  }
                  options={cities}
                  required
                />
                <FloatingSelect
                  label="Office"
                  value={formData.office}
                  onChange={(v) => setFormData({ ...formData, office: v })}
                  options={officesByCity[formData.city] || []}
                  required
                />
              </div>

              {/* SEATS */}
              <div className="relative">
                <label className="absolute left-5 -top-2 bg-white px-1 text-xs text-gray-600">
                  Required Seats
                </label>
                <div className="flex items-center justify-between border border-[#204758] rounded-full px-5 py-3 bg-white">
                  <span className="text-base">{formData.seats}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, seats: Math.max(1, formData.seats - 1) })
                      }
                      className="text-xl font-bold w-6 h-6 flex items-center justify-center"
                    >
                      –
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, seats: formData.seats + 1 })
                      }
                      className="text-xl font-bold w-6 h-6 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <FloatingSelect
                label="Where did you find us?"
                value={formData.source}
                onChange={(v) => setFormData({ ...formData, source: v })}
                options={["Google", "Instagram", "LinkedIn", "Email", "Others"]}
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
                className="mx-auto block bg-[#204758]! text-white! px-14 py-3 rounded-xl hover:bg-[#16404f]! transition shadow-md"
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
