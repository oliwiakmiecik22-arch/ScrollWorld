import { forwardRef } from "react";

/** One semantic button contract; visual variants never change keyboard behavior. */
export const Action = forwardRef(function Action({
  variant = "secondary", size = "default", selected,
  loading = false, loadingLabel = "Preparing…", disabled = false,
  className = "", children, type = "button", ...props
}, ref) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={`sip-action sip-action--${variant} sip-action--${size}${className ? ` ${className}` : ""}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-pressed={selected}
    >
      <span className="sip-action__content">{loading ? loadingLabel : children}</span>
    </button>
  );
});

export function ArrowIcon({ direction = "right" }) {
  return (
    <svg className={`sip-icon sip-icon--${direction}`} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg className="sip-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
