"use client";

// Showcase shell: phone frame + status bar + navigation stack + tab bar.
// Pure client-side state navigation — no router, no backend.

import { useCallback, useEffect, useState } from "react";
import {
  BatteryFull,
  Compass,
  Globe2,
  Heart,
  MapPin,
  MessageCircle,
  Monitor,
  Signal,
  Smartphone,
  Sparkles,
  UserRound,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { conversations, encounterCards } from "./data";
import { SectionTitle, Tile, ToastHost, TopBar, toast } from "./kit";
import { ChatDetailsPage, ChatListPage, ChatRoomPage, SearchPage } from "./pages-chat";
import {
  ArticlePage,
  ChannelsPage,
  DiscoverPage,
  FeedPage,
  MomentPublishPage,
  MomentsPage,
  OfficialAccountsPage,
} from "./pages-discover";
import { AddFriendPage, ContactsPage, FriendRequestsPage } from "./pages-contacts";
import { FarmPage, GamesPage, MiniProgramsPage } from "./pages-fun";
import {
  FavoritesPage,
  FeedbackPage,
  LanguagePage,
  NotesPage,
  ProfilePage,
  SecurityPage,
  SettingsPage,
  ShopPage,
  WalletPage,
} from "./pages-profile";
import { CyberAvatarPage, ScenePage, WorldCharactersPage, WorldPage } from "./pages-world";

type Tab = "chat" | "world" | "discover" | "contacts" | "profile";
type View = { name: string; arg?: string };

const TABS: { key: Tab; label: string; icon: typeof Compass }[] = [
  { key: "chat", label: "Chats", icon: MessageCircle },
  { key: "world", label: "World", icon: Globe2 },
  { key: "discover", label: "Discover", icon: Compass },
  { key: "contacts", label: "Contacts", icon: Users },
  { key: "profile", label: "Me", icon: UserRound },
];

export function ShowcaseApp() {
  const [tab, setTab] = useState<Tab>("chat");
  const [stack, setStack] = useState<View[]>([]);
  const [mode, setMode] = useState<"phone" | "desktop">("phone");
  const [pageKey, setPageKey] = useState(0); // re-triggers page-in animation

  const push = useCallback((v: View) => {
    setStack((s) => [...s, v]);
    setPageKey((k) => k + 1);
  }, []);
  const pop = useCallback(() => {
    setStack((s) => (s.length ? s.slice(0, -1) : s));
    setPageKey((k) => k + 1);
  }, []);
  const switchTab = useCallback((t: Tab) => {
    setTab(t);
    setStack([]);
    setPageKey((k) => k + 1);
  }, []);

  const top = stack[stack.length - 1];
  const unread = conversations.reduce((n, c) => n + (c.unread ?? 0), 0);

  // keyboard-friendly: Esc pops a page
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") pop();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [pop]);

  return (
    <div className="showcase-root flex min-h-screen flex-col items-center justify-center gap-5 bg-[#eff3f4] py-0 lg:py-10">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_16%_0%,rgba(124,91,217,0.14),transparent_54%),radial-gradient(ellipse_at_88%_16%,rgba(199,125,255,0.1),transparent_46%),radial-gradient(ellipse_at_50%_100%,rgba(148,163,184,0.1),transparent_52%)]" />

      {/* exhibit toolbar */}
      <div className="relative z-10 hidden w-full max-w-4xl items-center justify-between px-4 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c5bd9] to-[#9b7deb] text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-wide text-[#1c1430]">Divinity Companion · UI/UX Showcase</div>
            <div className="text-xs text-[#837791]">Frontend-only build — every page, element and flow, no backend. Static demo data.</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm">
          {([
            ["phone", <Smartphone key="s" className="h-4 w-4" />, "Mobile"],
            ["desktop", <Monitor key="d" className="h-4 w-4" />, "Desktop"],
          ] as const).map(([m, icon, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                mode === m ? "bg-[#7c5bd9] text-white shadow" : "text-[#837791]",
              )}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* device */}
      <div
        className={cn(
          "relative z-10 w-full",
          mode === "phone" ? "flex justify-center" : "flex justify-center",
        )}
      >
        <div
          className={cn(
            "relative flex flex-col overflow-hidden bg-[#f4f1fb] max-lg:h-[100dvh] max-lg:w-full max-lg:rounded-none",
            mode === "phone"
              ? "lg:h-[min(860px,88vh)] lg:w-[402px] lg:rounded-[52px] lg:border-[10px] lg:border-[#1c1430] lg:shadow-[0_40px_90px_rgba(28,20,48,0.4)]"
              : "lg:h-[min(760px,86vh)] lg:w-[min(960px,92vw)] lg:rounded-[36px] lg:border-[10px] lg:border-[#1c1430] lg:shadow-[0_40px_90px_rgba(28,20,48,0.4)]",
          )}
        >
          <ToastHost />

          {/* status bar */}
          <div className="relative z-30 flex h-9 shrink-0 items-center justify-between bg-[#f4f1fb] px-6 pt-1">
            <span className="text-xs font-semibold text-[#1c1430]">9:41</span>
            <div className="flex items-center gap-1.5 text-[#1c1430]">
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <BatteryFull className="h-4 w-4" />
            </div>
          </div>

          {/* body */}
          <div className="relative flex min-h-0 flex-1">
            {/* desktop rail */}
            {mode === "desktop" && (
              <div className="flex w-20 shrink-0 flex-col items-center gap-2 border-r border-[rgba(76,40,130,0.06)] bg-white/70 py-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c5bd9] to-[#9b7deb] text-white shadow">
                  <Sparkles className="h-5 w-5" />
                </div>
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => switchTab(t.key)}
                    className={cn(
                      "flex w-14 flex-col items-center gap-1 rounded-2xl py-2 text-[10px] font-medium transition",
                      tab === t.key && !stack.length ? "bg-[#7c5bd9]/10 text-[#7c5bd9]" : "text-[#837791] hover:bg-black/5",
                    )}
                  >
                    <t.icon className="h-5 w-5" />
                    {t.label}
                  </button>
                ))}
                <div className="mt-auto text-[9px] text-[#a99db9]">v1.0</div>
              </div>
            )}

            {/* page area */}
            <div className="relative min-w-0 flex-1 overflow-hidden">
              <div key={pageKey} className="absolute inset-0 animate-[page-in_.3s_ease] flex flex-col">
                {renderPage({ tab, top, push, pop, unread })}
              </div>

              {/* tab bar (phone mode, at root level) */}
              {mode === "phone" && stack.length === 0 && (
                <div className="absolute inset-x-0 bottom-0 z-30">
                  <div className="border-t border-[rgba(76,40,130,0.06)] bg-white/92 px-2 pb-5 pt-1.5 backdrop-blur-xl">
                    <div className="grid grid-cols-5">
                      {TABS.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => switchTab(t.key)}
                          className={cn(
                            "relative flex flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium transition",
                            tab === t.key ? "text-[#7c5bd9]" : "text-[#a99db9]",
                          )}
                        >
                          <t.icon className={cn("h-6 w-6", tab === t.key && "drop-shadow-[0_2px_6px_rgba(124,91,217,0.45)]")} />
                          {t.label}
                          {t.key === "chat" && unread > 0 && (
                            <span className="absolute right-3 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                              {unread}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* desktop mode keeps a compact bottom bar inside pages w/o tab bar */}
              {mode === "desktop" && stack.length > 0 && (
                <button
                  onClick={pop}
                  className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#1c1430]/85 px-5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>

          {/* home indicator */}
          <div className="flex h-4 shrink-0 items-center justify-center bg-[#f4f1fb]">
            <div className="h-1 w-28 rounded-full bg-[#1c1430]/20" />
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden text-[11px] text-[#a99db9] lg:block">
        Press <kbd className="rounded bg-white px-1.5 py-0.5 shadow-sm">Esc</kbd> to go back · click anything — interactions are wired with demo toasts
      </div>
    </div>
  );
}

/* ---- page resolution ---- */

function renderPage({
  tab,
  top,
  push,
  pop,
  unread,
}: {
  tab: Tab;
  top?: View;
  push: (v: View) => void;
  pop: () => void;
  unread: number;
}) {
  if (top) {
    switch (top.name) {
      case "chat-room":
        return <ChatRoomPage name={top.arg ?? "Seraphina Vale"} onBack={pop} onDetails={() => push({ name: "chat-details" })} />;
      case "chat-details":
        return <ChatDetailsPage onBack={pop} />;
      case "search":
        return <SearchPage onBack={pop} />;
      case "scene":
        return <ScenePage sceneName={top.arg ?? "Moon Pool"} onBack={pop} />;
      case "world-characters":
        return <WorldCharactersPage onBack={pop} />;
      case "cyber-avatar":
        return <CyberAvatarPage onBack={pop} />;
      case "moments":
        return <MomentsPage onBack={pop} onPublish={() => push({ name: "moment-publish" })} />;
      case "moment-publish":
        return <MomentPublishPage onBack={pop} />;
      case "feed":
        return <FeedPage onBack={pop} />;
      case "channels":
        return <ChannelsPage onBack={pop} onOpenArticle={(id) => push({ name: "article", arg: id })} />;
      case "article":
        return <ArticlePage articleId={top.arg ?? "a1"} onBack={pop} />;
      case "official":
        return <OfficialAccountsPage onBack={pop} />;
      case "games":
        return <GamesPage onBack={pop} onOpenFarm={() => push({ name: "farm" })} />;
      case "farm":
        return <FarmPage onBack={pop} />;
      case "mini-programs":
        return <MiniProgramsPage onBack={pop} />;
      case "encounters":
        return <EncountersView onBack={pop} />;
      case "friend-requests":
        return <FriendRequestsPage onBack={pop} />;
      case "add-friend":
        return <AddFriendPage onBack={pop} />;
      case "wallet":
        return <WalletPage onBack={pop} />;
      case "shop":
        return <ShopPage onBack={pop} />;
      case "favorites":
        return <FavoritesPage onBack={pop} />;
      case "notes":
        return <NotesPage onBack={pop} />;
      case "settings":
        return <SettingsPage onBack={pop} onOpen={(v) => push({ name: v })} />;
      case "security":
        return <SecurityPage onBack={pop} />;
      case "language":
        return <LanguagePage onBack={pop} />;
      case "feedback":
        return <FeedbackPage onBack={pop} />;
      default:
        return <WorldPage onOpenScene={(s) => push({ name: "scene", arg: s.name })} />;
    }
  }

  switch (tab) {
    case "chat":
      return <ChatListPage onOpenChat={() => push({ name: "chat-room", arg: "Seraphina Vale" })} onOpenSearch={() => push({ name: "search" })} />;
    case "world":
      return (
        <WorldPage
          onOpenScene={(s) => push({ name: "scene", arg: s.name })}
        />
      );
    case "discover":
      return (
        <DiscoverPage
          onOpen={(v) => {
            if (v === "moments") push({ name: "moments" });
            else if (v === "feed") push({ name: "feed" });
            else if (v === "channels") push({ name: "channels" });
            else if (v === "encounters") push({ name: "encounters" });
            else if (v === "scene") push({ name: "scene", arg: "Moon Pool" });
            else if (v === "games") push({ name: "games" });
            else if (v === "mini-programs") push({ name: "mini-programs" });
            else if (v === "official") push({ name: "official" });
          }}
        />
      );
    case "contacts":
      return (
        <ContactsPage
          onOpenRequests={() => push({ name: "friend-requests" })}
          onAddFriend={() => push({ name: "add-friend" })}
        />
      );
    case "profile":
      return (
        <ProfilePage
          onOpen={(v) => push({ name: v })}
        />
      );
  }
}

/* ---- encounters (swipe cards) ---- */

function EncountersView({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const card = encounterCards[idx];
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <SwipeTopBar onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        {card ? (
          <div className="relative mx-auto w-full max-w-sm">
            <Tile g={card.gradient} emoji={card.emoji} className="aspect-[3/4] w-full shadow-lg" overlay={
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <div className="text-xl font-bold">{card.name}</div>
                  <div className="text-xs text-white/85">{card.role}</div>
                  <p className="mt-2 text-xs leading-relaxed text-white/90">{card.bio}</p>
                </div>
              </>
            } />
            <div className="mt-4 flex items-center justify-center gap-6">
              <button
                onClick={() => setIdx((i) => Math.min(i + 1, encounterCards.length))}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#837791] shadow-lg transition active:scale-90"
                aria-label="Skip"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                onClick={() => {
                  toast(`Say hi to ${card.name} (demo)`);
                  setIdx((i) => Math.min(i + 1, encounterCards.length));
                }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5bd9] to-[#9b7deb] text-white shadow-[0_10px_24px_rgba(124,91,217,0.5)] transition active:scale-90"
                aria-label="Say hi"
              >
                <Heart className="h-7 w-7 fill-white" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {encounterCards.map((c, i) => (
                <span key={c.id} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-[#7c5bd9]" : "w-1.5 bg-[#ded4ee]"}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 pt-20 text-center">
            <MapPin className="h-10 w-10 text-[#c9bfd9]" />
            <div className="text-sm font-semibold text-[#1c1430]">No more travelers nearby</div>
            <div className="max-w-xs text-xs text-[#837791]">
              Walk a new scene or open the Gate Plaza — encounters refresh every dusk cycle.
            </div>
            <button onClick={() => setIdx(0)} className="mt-2 rounded-full bg-[#7c5bd9] px-5 py-2 text-xs font-semibold text-white shadow">
              Reshuffle deck
            </button>
          </div>
        )}
        <SectionTitle>How encounters work</SectionTitle>
        <p className="px-2 text-xs leading-relaxed text-[#837791]">
          Encounters surface residents and travelers who are in the same scene as you. Saying hi opens a chat request —
          they accept, and the Enclave does the rest.
        </p>
      </div>
    </div>
  );
}

function SwipeTopBar({ onBack }: { onBack: () => void }) {
  return <TopBar title="Encounters" onBack={onBack} right={<span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#7c5bd9] shadow-sm">3 nearby</span>} />;
}
