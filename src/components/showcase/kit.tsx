"use client";

// Design-system primitives for the Divinity Companion UI showcase.
// Tokens mirror the production app (brand #7c5bd9, canvas #f4f1fb, soft violet borders).

import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Character, type Gradient } from "./data";

export const BRAND = "#7c5bd9";
export const BRAND_2 = "#9b7deb";
export const CANVAS = "#f4f1fb";
export const INK = "#1c1430";
export const INK_2 = "#463a5c";
export const MUTED = "#837791";

export const grad = (g: Gradient): CSSProperties => ({
  backgroundImage: `linear-gradient(135deg, ${g[0]}, ${g[1]})`,
});

/* ---------------- Avatar ---------------- */

export function Avatar({
  char,
  size = 44,
  online,
  ring,
  square,
}: {
  char: Character;
  size?: number;
  online?: boolean;
  ring?: boolean;
  square?: boolean;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className={cn(
          "flex h-full w-full items-center justify-center text-white shadow-sm",
          square ? "rounded-[28%]" : "rounded-full",
          ring && "ring-2 ring-white/80",
        )}
        style={{ ...grad(char.gradient), fontSize: size * 0.42 }}
      >
        <span className="leading-none">{char.emoji}</span>
      </div>
      {(online ?? char.online) && (
        <span
          className="absolute bottom-0 right-0 block rounded-full border-2 border-white bg-emerald-500"
          style={{ width: size * 0.26, height: size * 0.26 }}
        />
      )}
    </div>
  );
}

/* ---------------- Top bar ---------------- */

export function TopBar({
  title,
  onBack,
  right,
  transparent,
}: {
  title: ReactNode;
  onBack?: () => void;
  right?: ReactNode;
  transparent?: boolean;
}) {
  return (
    <div
      className={cn(
        "sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 px-3",
        transparent ? "bg-transparent" : "border-b border-[rgba(76,40,130,0.06)] bg-[#f4f1fb]/90 backdrop-blur-xl",
      )}
    >
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#1c1430] shadow-sm transition active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <div className="min-w-0 flex-1 truncate text-[17px] font-semibold tracking-wide text-[#1c1430]">{title}</div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

/* ---------------- Search ---------------- */

export function SearchBar({
  placeholder,
  value,
  onChange,
  onFocus,
  className,
  autoFocus,
}: {
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
  onFocus?: () => void;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_1px_4px_rgba(76,40,130,0.06)]", className)}>
      <Search className="h-4 w-4 shrink-0 text-[#837791]" />
      <input
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-[#1c1430] outline-none placeholder:text-[#a99db9]"
      />
    </div>
  );
}

/* ---------------- Cards & cells ---------------- */

export function Card({ className, children, onClick }: { className?: string; children: ReactNode; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-3xl border border-[rgba(76,40,130,0.07)] bg-white shadow-[0_2px_10px_rgba(76,40,130,0.05)]",
        onClick && "cursor-pointer transition active:scale-[0.99]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Cell({
  icon,
  emoji,
  iconGradient,
  title,
  sub,
  right,
  onClick,
  chevron = true,
  danger,
  className,
}: {
  icon?: ReactNode;
  emoji?: string;
  iconGradient?: Gradient;
  title: ReactNode;
  sub?: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
  chevron?: boolean;
  danger?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:bg-[#f7f4fd]",
        className,
      )}
    >
      {(iconGradient || emoji) && (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg shadow-sm"
          style={iconGradient ? grad(iconGradient) : { background: "#f2eefb" }}
        >
          {emoji ?? icon}
        </div>
      )}
      {icon && !emoji && !iconGradient && <div className="shrink-0">{icon}</div>}
      <div className="min-w-0 flex-1">
        <div className={cn("truncate text-[15px] font-medium", danger ? "text-rose-600" : "text-[#1c1430]")}>{title}</div>
        {sub && <div className="mt-0.5 truncate text-xs text-[#837791]">{sub}</div>}
      </div>
      {right}
      {chevron && <ChevronRight className="h-4 w-4 shrink-0 text-[#c9bfd9]" />}
    </button>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-2 flex items-center justify-between px-1">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#837791]">{children}</div>
      {action}
    </div>
  );
}

export function Badge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "green" | "amber" | "rose" | "gray" }) {
  const tones: Record<string, string> = {
    brand: "bg-[#7c5bd9]/10 text-[#7c5bd9]",
    green: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    rose: "bg-rose-500/10 text-rose-600",
    gray: "bg-black/5 text-[#837791]",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide", tones[tone])}>
      {children}
    </span>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-[#7c5bd9]" : "bg-[#e4ddf0]",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
          checked ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}

export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-full bg-white p-1 shadow-[0_1px_4px_rgba(76,40,130,0.06)]">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "flex-1 rounded-full px-3 py-1.5 text-xs font-medium transition",
            value === o ? "bg-[#7c5bd9] text-white shadow" : "text-[#837791]",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Fake media tiles ---------------- */

export function Tile({
  g,
  emoji,
  className,
  overlay,
}: {
  g: Gradient;
  emoji?: string;
  className?: string;
  overlay?: ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)} style={grad(g)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
      {emoji && (
        <div className="absolute inset-0 flex items-center justify-center text-4xl drop-shadow">{emoji}</div>
      )}
      {overlay}
    </div>
  );
}

/* ---------------- Toast ---------------- */

type ToastMsg = { id: number; text: string };
let toastSeq = 0;
const toastListeners = new Set<(t: ToastMsg) => void>();

export function toast(text: string) {
  const t = { id: ++toastSeq, text };
  toastListeners.forEach((l) => l(t));
}

export function ToastHost() {
  const [items, setItems] = useState<ToastMsg[]>([]);
  useEffect(() => {
    const l = (t: ToastMsg) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 2200);
    };
    toastListeners.add(l);
    return () => {
      toastListeners.delete(l);
    };
  }, []);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 z-50 flex flex-col items-center gap-2 px-8">
      {items.map((t) => (
        <div
          key={t.id}
          className="animate-[toast-in_.25s_ease] rounded-full bg-[#1c1430]/90 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Bottom sheet ---------------- */

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative animate-[sheet-up_.28s_cubic-bezier(.32,.72,.24,1)] rounded-t-[28px] bg-white pb-6 shadow-2xl">
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <div className="text-[15px] font-semibold text-[#1c1430]">{title}</div>
          <button onClick={onClose} className="rounded-full bg-[#f2eefb] px-3 py-1 text-xs text-[#837791]">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------------- Buttons ---------------- */

export function PrimaryButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(124,91,217,0.35)] transition active:scale-[0.98]",
        className,
      )}
      style={grad([BRAND, BRAND_2])}
    >
      {children}
    </button>
  );
}
