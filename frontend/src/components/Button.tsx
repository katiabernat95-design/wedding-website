import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  selected?: boolean;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[15px] cursor-pointer font-medium tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

function variantClasses(variant: Variant, selected: boolean): string {
  if (variant === "primary") {
    return "bg-[var(--color-sage-600)] text-[var(--color-paper)] hover:bg-[var(--color-sage-700)] active:bg-[var(--color-sage-800)]";
  }
  if (variant === "secondary") {
    return selected
      ? "bg-[var(--color-sage-400)] text-[var(--color-paper)] border border-[var(--color-sage-400)]"
      : "bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-line)] hover:border-[var(--color-sage-400)] hover:text-[var(--color-sage-700)]";
  }
  if (variant === "outline") {
    return "bg-transparent text-[var(--color-sage-700)] border border-[var(--color-sage-400)] hover:bg-[var(--color-sage-50)]";
  }
  return "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-cream)]";
}

export function Button({
  variant = "primary",
  selected = false,
  fullWidth = true,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        base,
        variantClasses(variant, selected),
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
