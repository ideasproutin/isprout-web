import React, { useState, useRef } from "react";

interface BaseProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  icon?: React.ReactNode;
}

export function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  required,
  icon
}: BaseProps & { type?: string }) {
  const [focus, setFocus] = useState(false);
  const float = focus || value;
  const id = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full border border-[#204758] rounded-full px-5 py-3 bg-white focus:ring-2 focus:ring-[#204758] outline-none"
      />
      <label
        htmlFor={id}
        className={`absolute left-5 px-1 bg-white text-gray-600 transition-all cursor-pointer ${
          float ? "-top-2 text-xs" : "top-1/2 -translate-y-1/2"
        }`}
      >
        {label}
      </label>
      {icon && (
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#204758]">
          {icon}
        </span>
      )}
    </div>
  );
}

export function FloatingSelect({
  label,
  value,
  onChange,
  options,
  required
}: BaseProps & { options: string[] }) {
  const [focus, setFocus] = useState(false);
  const float = focus || value.length > 0;
  const id = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleContainerClick = () => {
    if (selectRef.current && !focus) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  return (
    <div className="relative" onClick={handleContainerClick}>
      <select
        id={id}
        ref={selectRef}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full border border-[#204758] rounded-full px-5 py-3 pr-10 bg-white appearance-none cursor-pointer"
      >
        <option value=""></option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <label
        className={`absolute left-5 px-1 bg-white text-gray-600 transition-all pointer-events-none ${
          float ? "-top-2 text-xs" : "top-1/2 -translate-y-1/2"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function FloatingTextarea({
  label,
  value,
  onChange
}: BaseProps) {
  const [focus, setFocus] = useState(false);
  const float = focus || value.length > 0;
  const id = `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        rows={3}
        className="w-full border border-[#204758] rounded-xl px-5 py-3 bg-white resize-none"
      />
      <label
        htmlFor={id}
        className={`absolute left-5 px-1 bg-white text-gray-600 transition-all cursor-pointer ${
          float ? "-top-2 text-xs" : "top-4"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
