"use client";

// Profile tab + wallet, shop, favorites, notes, settings, account security, language.

import { useState } from "react";
import {
  BookText,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  Heart,
  LayoutGrid,
  LogOut,
  MessageSquareText,
  Receipt,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  UserPlus,
} from "lucide-react";
import { favorites, notes, owner, shopItems, wallet } from "./data";
import { Avatar, Badge, Card, Cell, SectionTitle, Sheet, Tile, Toggle, TopBar, grad, toast } from "./kit";

/* ============ Profile ============ */

export function ProfilePage({
  onOpen,
}: {
  onOpen: (v: "wallet" | "shop" | "favorites" | "notes" | "settings" | "security" | "language" | "feedback") => void;
}) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-24 pt-3">
        {/* header */}
        <Card className="relative overflow-hidden p-5">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full opacity-15" style={grad(owner.gradient)} />
          <div className="relative flex items-center gap-4">
            <Avatar char={owner} size={68} square />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#1c1430]">{owner.name}</span>
                <Badge>Owner</Badge>
              </div>
              <div className="mt-0.5 text-xs text-[#837791]">Enclave ID ZC-0001</div>
              <div className="mt-2 flex gap-1.5">
                <Badge tone="amber">✦ Spark tiers</Badge>
                <Badge tone="green">Steward</Badge>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#c9bfd9]" />
          </div>
          <div className="relative mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { n: "128", l: "Moments" },
              { n: "8", l: "Residents" },
              { n: "12", l: "Scenes" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-[#f7f4fd] py-2.5">
                <div className="text-lg font-bold text-[#1c1430]">{s.n}</div>
                <div className="text-[10px] text-[#837791]">{s.l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* quick grid */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { icon: <CreditCard className="h-5 w-5" />, label: "Wallet", g: ["#0f766e", "#2dd4bf"], v: "wallet" },
            { icon: <Store className="h-5 w-5" />, label: "Shop", g: ["#b45309", "#fbbf24"], v: "shop" },
            { icon: <Star className="h-5 w-5" />, label: "Favorites", g: ["#f59e0b", "#fde68a"], v: "favorites" },
            { icon: <BookText className="h-5 w-5" />, label: "Notes", g: ["#7c5bd9", "#9b7deb"], v: "notes" },
          ].map((q) => (
            <button key={q.label} onClick={() => onOpen(q.v as "wallet")} className="flex flex-col items-center gap-1.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm transition active:scale-95" style={grad([...q.g] as [string, string])}>
                {q.icon}
              </div>
              <span className="text-[11px] text-[#463a5c]">{q.label}</span>
            </button>
          ))}
        </div>

        {/* subscription banner */}
        <Card className="mt-4 flex items-center gap-3 overflow-hidden p-0" onClick={() => toast("Subscription — UI demo")}>
          <div className="self-stretch px-4 py-4 text-white" style={grad(["#4c3575", "#9b7deb"])}>
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1 py-3.5 pr-3">
            <div className="text-sm font-semibold text-[#1c1430]">Enclave Steward tier</div>
            <div className="text-xs text-[#837791]">Renews in 18 days · 2× spark earnings</div>
          </div>
          <ChevronRight className="mr-3 h-4 w-4 text-[#c9bfd9]" />
        </Card>

        {/* menu */}
        <div className="mt-4">
          <SectionTitle>Settings &amp; more</SectionTitle>
          <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
            <Cell emoji="⚙️" title="Settings" onClick={() => onOpen("settings")} />
            <Cell emoji="🛡️" title="Account security" onClick={() => onOpen("security")} />
            <Cell emoji="🌐" title="Language" sub="English (US)" onClick={() => onOpen("language")} />
            <Cell emoji="🛍️" title="My orders" onClick={() => onOpen("shop")} />
            <Cell emoji="✉️" title="Feedback & suggestions" onClick={() => onOpen("feedback")} />
            <Cell emoji="🚪" title="Sign out" danger chevron={false} onClick={() => setLogoutOpen(true)} />
          </Card>
        </div>
      </div>

      <Sheet open={logoutOpen} onClose={() => setLogoutOpen(false)} title="Sign out?">
        <div className="px-5">
          <p className="pb-4 text-sm text-[#463a5c]">
            This is a UI showcase — nothing real happens when you sign out. But the dialog looks great, right?
          </p>
          <div className="relative z-10 flex gap-3">
            <button onClick={() => setLogoutOpen(false)} className="flex-1 rounded-2xl bg-[#f2eefb] py-3 text-sm font-semibold text-[#837791]">
              Stay
            </button>
            <button
              onClick={() => {
                setLogoutOpen(false);
                toast("Signed out (demo) — nothing left the world");
              }}
              className="flex-1 rounded-2xl bg-rose-500 py-3 text-sm font-semibold text-white shadow"
            >
              Sign out
            </button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

/* ============ Wallet ============ */

export function WalletPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Spark wallet" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <div className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-[0_10px_30px_rgba(124,91,217,0.35)]" style={grad(["#4c3575", "#9b7deb"])}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Balance</div>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-4xl font-bold">{wallet.sparks.toLocaleString()}</span>
            <span className="pb-1.5 text-sm text-white/80">✦ sparks</span>
          </div>
          <div className="mt-1 text-xs text-white/75">+ {wallet.gems} gems · vault tier 3</div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => toast("Top up — UI demo")} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#7c5bd9]">Top up</button>
            <button onClick={() => toast("Transfer — UI demo")} className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">Transfer</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="text-xs text-[#837791]">Income this cycle</div>
            <div className="mt-1 text-xl font-bold text-emerald-600">+{wallet.income.toLocaleString()} ✦</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-[#837791]">Spent this cycle</div>
            <div className="mt-1 text-xl font-bold text-rose-500">−{wallet.spend.toLocaleString()} ✦</div>
          </Card>
        </div>

        <SectionTitle>Transactions</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {wallet.transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f7f4fd] text-lg">{t.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-[#1c1430]">{t.name}</div>
                <div className="text-[11px] text-[#a99db9]">{t.time}</div>
              </div>
              <span className={t.amount > 0 ? "text-sm font-bold text-emerald-600" : "text-sm font-bold text-[#1c1430]"}>
                {t.amount > 0 ? "+" : "−"}{Math.abs(t.amount).toLocaleString()} ✦
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ============ Shop ============ */

export function ShopPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"shop" | "orders">("shop");
  const orders = shopItems.slice(0, 3);
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title="World shop"
        onBack={onBack}
        right={
          <div className="flex rounded-full bg-white p-1 shadow-sm">
            {(["shop", "orders"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${tab === t ? "bg-[#7c5bd9] text-white" : "text-[#837791]"}`}>
                {t}
              </button>
            ))}
          </div>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-24">
        {tab === "shop" ? (
          <div className="grid grid-cols-2 gap-3">
            {shopItems.map((s) => (
              <button key={s.id} onClick={() => toast(`${s.name} — purchase flow is UI demo`)} className="text-left transition active:scale-[0.97]">
                <Tile g={s.gradient} emoji={s.emoji} className="aspect-square w-full shadow-sm" />
                <div className="mt-1.5 truncate text-[13px] font-semibold text-[#1c1430]">{s.name}</div>
                <div className="truncate text-[11px] text-[#837791]">{s.desc}</div>
                <div className="mt-0.5 text-sm font-bold text-[#7c5bd9]">{s.price} ✦</div>
              </button>
            ))}
          </div>
        ) : (
          <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
            {orders.map((o, i) => (
              <div key={o.id} className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl" style={grad(o.gradient)}>{o.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-[#1c1430]">{o.name}</div>
                  <div className="text-[11px] text-[#a99db9]">Order #EN-120{i} · delivered to stall</div>
                </div>
                <Badge tone={i === 0 ? "amber" : "green"}>{i === 0 ? "In transit" : "Delivered"}</Badge>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}

/* ============ Favorites ============ */

export function FavoritesPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Favorites" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {favorites.map((f) => (
            <Cell
              key={f.id}
              emoji={f.emoji}
              title={f.title}
              sub={`${f.kind} · ${f.time}`}
              right={<Heart className="h-4 w-4 fill-rose-400 text-rose-400" />}
              onClick={() => toast("Saved item — UI demo")}
            />
          ))}
        </Card>
        <div className="text-center text-[11px] text-[#a99db9]">Favorites sync with your world backup automatically.</div>
      </div>
    </div>
  );
}

/* ============ Notes ============ */

export function NotesPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title="Notes"
        onBack={onBack}
        right={
          <button onClick={() => toast("New note — UI demo")} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7c5bd9] shadow-sm">
            <FileText className="h-4 w-4" />
          </button>
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 pb-24">
        {notes.map((n) => (
          <Card key={n.id} className="p-4" onClick={() => toast("Note editor — UI demo")}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{n.emoji}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-[#1c1430]">{n.title}</span>
              {n.pinned && <Badge tone="brand">Pinned</Badge>}
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#837791]">{n.excerpt}</p>
            <div className="mt-2 text-[10px] text-[#a99db9]">{n.time}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============ Settings ============ */

export function SettingsPage({ onBack, onOpen }: { onBack: () => void; onOpen: (v: "security" | "language") => void }) {
  const [prefs, setPrefs] = useState({ notif: true, moments: true, sound: false, autoBackup: true });
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Settings" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <SectionTitle>Notifications</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {[
            { k: "notif" as const, t: "Push notifications", s: "Messages, requests, world events" },
            { k: "moments" as const, t: "Moment alerts", s: "When residents post" },
            { k: "sound" as const, t: "In-app sounds", s: "Bubbles, harvest chimes" },
            { k: "autoBackup" as const, t: "Auto world backup", s: "Nightly at 03:00" },
          ].map((r) => (
            <div key={r.k} className="flex items-center justify-between px-4 py-3.5">
              <div>
                <div className="text-[15px] text-[#1c1430]">{r.t}</div>
                <div className="text-xs text-[#837791]">{r.s}</div>
              </div>
              <Toggle checked={prefs[r.k]} onChange={(v) => setPrefs((p) => ({ ...p, [r.k]: v }))} />
            </div>
          ))}
        </Card>

        <SectionTitle>Account</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🛡️" title="Account security" onClick={() => onOpen("security")} />
          <Cell emoji="🌐" title="Language" sub="English (US)" onClick={() => onOpen("language")} />
          <Cell emoji="💾" title="Storage" sub="World data · 2.4 GB" onClick={() => toast("Storage — UI demo")} />
          <Cell emoji="📜" title="Privacy & terms" onClick={() => toast("Privacy — UI demo")} />
        </Card>

        <div className="pb-2 text-center text-[11px] text-[#a99db9]">Divinity Companion · UI showcase build 1.0.0</div>
      </div>
    </div>
  );
}

/* ============ Account security ============ */

export function SecurityPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Account security" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="flex items-center gap-3 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[#1c1430]">Security score: 92 / 100</div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#f2eefb]">
              <div className="h-full w-[92%] rounded-full bg-emerald-500" />
            </div>
          </div>
        </Card>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🔑" title="Sign-in method" sub="Google · zechycreative@gmail.com" chevron={false} />
          <Cell emoji="📵" title="Trusted devices" sub="2 devices · this browser" onClick={() => toast("Devices — UI demo")} />
          <Cell emoji="🧯" title="Recovery phrase" sub="Backed up in world vault" right={<Badge tone="green">Safe</Badge>} onClick={() => toast("Recovery — UI demo")} />
          <Cell emoji="⏳" title="Session history" sub="Last sign-in today, 09:12" onClick={() => toast("Sessions — UI demo")} />
          <Cell emoji="🗑️" title="Delete world account" danger onClick={() => toast("Deletion is disabled in the showcase")} />
        </Card>
      </div>
    </div>
  );
}

/* ============ Language ============ */

export function LanguagePage({ onBack }: { onBack: () => void }) {
  const [lang, setLang] = useState("English (US)");
  const langs = ["English (US)", "English (UK)", "中文（简体）", "日本語", "Deutsch", "Español"];
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Language" onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-24">
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {langs.map((l) => (
            <button key={l} onClick={() => { setLang(l); toast(`Language set to ${l} (demo)`); }} className="flex w-full items-center justify-between px-4 py-3.5 text-left">
              <span className="text-[15px] text-[#1c1430]">{l}</span>
              {lang === l && <span className="text-sm font-bold text-[#7c5bd9]">✓</span>}
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ============ Feedback ============ */

export function FeedbackPage({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("");
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Feedback & suggestions" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="p-4">
          <div className="text-sm font-semibold text-[#1c1430]">Tell the Keepers</div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="What should the Enclave improve? Bug reports, scene ideas, balance notes — everything lands on Minister Wen's desk."
            className="mt-3 w-full resize-none rounded-2xl bg-[#f7f4fd] p-3 text-sm leading-relaxed outline-none placeholder:text-[#a99db9]"
          />
          <div className="mt-3 flex gap-2">
            {["Bug", "Idea", "Balance", "Other"].map((tag) => (
              <button key={tag} onClick={() => toast(`Tag: ${tag}`)} className="rounded-full bg-[#f2eefb] px-3 py-1.5 text-xs font-medium text-[#7c5bd9]">
                {tag}
              </button>
            ))}
          </div>
        </Card>
        <button
          onClick={() => { toast(text ? "Feedback sent to the Keepers (demo)" : "Write something first"); setText(""); }}
          className="w-full rounded-2xl py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(124,91,217,0.35)]"
          style={grad(["#7c5bd9", "#9b7deb"])}
        >
          Send feedback
        </button>
      </div>
    </div>
  );
}
