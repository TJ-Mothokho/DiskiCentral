import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "filter";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  active?: boolean;
};

export function Button({
  variant = "primary",
  active = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "filter"
      ? `ui-button--filter ui-button--${active ? "primary" : "tertiary"}`
      : `ui-button--${variant}`;

  return (
    <button
      {...props}
      type={type}
      aria-pressed={variant === "filter" ? active : undefined}
      className={`ui-button ${variantClass} ${className}`.trim()}
    />
  );
}
