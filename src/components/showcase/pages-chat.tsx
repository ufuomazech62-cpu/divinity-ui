"use client";

// Chat tab: conversation list, chat room, conversation details, global search.

import { useState } from "react";
import {
  BellOff,
  BellRing,
  ChevronRight,
  Image as ImageIcon,
  Mic,
  MoreHorizontal,
  Paperclip,
  Phone,
  Pin,
  Plus,
  QrCode,
  Search,
  Smile,
  UserPlus,
  Users,
  Video,
  WalletCards,
} from "lucide-react";
import {
  byId,
  chatThread,
  conversations,
  owner,
  type Conversation,
} from "./data";
import { Avatar, Badge, Card, Cell, SearchBar, SectionTitle, Segmented, Tile, Toggle, TopBar, grad, toast } from "./kit";
import { cn } from "@/lib/utils";

/* ============ Chat list ============ */

export function ChatListPage({ onOpenChat, onOpenSearch }: { onOpenChat: (c: Conversation) => void; onOpenSearch?: () => void }) {
  const [query, setQuery] = useState("");
  const list = conversations.filter(
    (c) =>
      !query ||
      (c.groupName ?? byId(c.who[0]).name).toLowerCase().includes(query.toLowerCase()),
  );
  const pinned = list.filter((c) => c.pinned);
  const rest = list.filter((c) => !c.pinned);
  const totalUnread = list.reduce((n, c) => n + (c.unread ?? 0), 0);

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 space-y-3 px-4 pb-2 pt-3">
        <div className="flex items-center justify-between">
          <div className="text-[22px] font-bold tracking-wide text-[#1c1430]">Chats</div>
          <div className="flex items-center gap-2">
            <button onClick={() => toast("QR scanner is UI-only in this showcase")} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#463a5c] shadow-sm active:scale-95">
              <QrCode className="h-4.5 w-4.5" />
            </button>
            <button onClick={() => toast("Add friend — UI demo")} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#463a5c] shadow-sm active:scale-95">
              <UserPlus className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
        <SearchBar placeholder="Search conversations" value={query} onChange={setQuery} />
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-24">
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[
            { icon: <Plus className="h-5 w-5" />, label: "New chat", g: ["#7c5bd9", "#9b7deb"] as const },
            { icon: <Users className="h-5 w-5" />, label: "Groups", g: ["#0f766e", "#2dd4bf"] as const },
            { icon: <WalletCards className="h-5 w-5" />, label: "Inbox", g: ["#b45309", "#fbbf24"] as const },
            { icon: <Search className="h-5 w-5" />, label: "Search", g: ["#86198f", "#f0abfc"] as const, open: true },
          ].map((a) => (
            <button key={a.label} onClick={() => ("open" in a && a.open && onOpenSearch ? onOpenSearch() : toast(`${a.label} — UI demo`))} className="flex flex-col items-center gap-1.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm transition active:scale-95" style={grad([...a.g])}>
                {a.icon}
              </div>
              <span className="text-[11px] text-[#463a5c]">{a.label}</span>
            </button>
          ))}
        </div>

        {totalUnread > 0 && (
          <Card className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7c5bd9]/10 text-[#7c5bd9]">
              <BellRing className="h-5 w-5" />
            </div>
            <div className="flex-1 text-sm text-[#1c1430]">
              <span className="font-semibold">{totalUnread} unread messages</span>
              <div className="text-xs text-[#837791]">Tap to mark all as read</div>
            </div>
            <button onClick={() => toast("All conversations marked as read (demo)")} className="rounded-full bg-[#f2eefb] px-3 py-1.5 text-xs font-medium text-[#7c5bd9]">
              Mark read
            </button>
          </Card>
        )}

        {pinned.length > 0 && (
          <>
            <SectionTitle>Pinned</SectionTitle>
            <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
              {pinned.map((c) => (
                <ConversationRow key={c.id} c={c} onOpen={onOpenChat} />
              ))}
            </Card>
          </>
        )}
        <SectionTitle>Conversations</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {rest.map((c) => (
            <ConversationRow key={c.id} c={c} onOpen={onOpenChat} />
          ))}
        </Card>
      </div>
    </div>
  );
}

function ConversationRow({ c, onOpen }: { c: Conversation; onOpen: (c: Conversation) => void }) {
  const isGroup = !c.kind && c.who.length > 1;
  const chars = c.kind === "official"
    ? [{ name: "x", role: "", emoji: "🛎️", gradient: ["#0f766e", "#2dd4bf"] as [string, string], id: "official" }]
    : c.kind === "subscription"
      ? [{ name: "x", role: "", emoji: "📨", gradient: ["#7c5bd9", "#9b7deb"] as [string, string], id: "sub" }]
      : c.who.map(byId);
  const name = c.groupName ?? byId(c.who[0]).name;
  return (
    <div className="flex items-center gap-3 px-4 py-3 transition active:bg-[#f7f4fd]" onClick={() => onOpen(c)} role="button">
      <div className="relative shrink-0">
        {isGroup ? (
          <div className="grid h-12 w-12 grid-cols-2 gap-0.5 overflow-hidden rounded-2xl">
            {chars.slice(0, 4).map((ch) => (
              <div key={ch.id} className="flex items-center justify-center text-sm" style={grad(ch.gradient)}>
                {ch.emoji}
              </div>
            ))}
          </div>
        ) : (
          <Avatar char={chars[0]} size={48} square online={false} />
        )}
        {c.kind !== "subscription" && chars[0].online && chars.length === 1 && (
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[15px] font-semibold text-[#1c1430]">{name}</span>
          {c.kind === "official" && <Badge tone="green">Service</Badge>}
          {c.pinned && <Pin className="h-3 w-3 rotate-45 text-[#a99db9]" />}
          {c.muted && <BellOff className="h-3 w-3 text-[#a99db9]" />}
        </div>
        <div className="truncate text-[13px] text-[#837791]">{c.last}</div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-[11px] text-[#a99db9]">{c.time}</span>
        {c.unread ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
            {c.unread}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* ============ Chat room ============ */

export function ChatRoomPage({ name, onBack, onDetails }: { name: string; onBack: () => void; onDetails?: () => void }) {
  const them = byId("seraphina");
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState(chatThread);

  const send = () => {
    if (!draft.trim()) return;
    setMsgs((m) => [...m, { id: m.length + 1, from: "owner", text: draft.trim(), time: "Now" }]);
    setDraft("");
    setTimeout(() => {
      setMsgs((m) => [...m, { id: m.length + 1, from: "seraphina", text: "Noted, owner. Meet you by the pool. 🌙", time: "Now" }]);
    }, 900);
  };

  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title={name}
        onBack={onBack}
        right={
          <>
            <button onClick={() => toast("Voice call is UI-only")} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#463a5c] shadow-sm">
              <Phone className="h-4 w-4" />
            </button>
            <button onClick={() => toast("Video call is UI-only")} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#463a5c] shadow-sm">
              <Video className="h-4 w-4" />
            </button>
            <button onClick={() => onDetails?.()} aria-label="Conversation details" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#463a5c] shadow-sm">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </>
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <div className="text-center text-[11px] text-[#a99db9]">Today · Moon Pool coordinates pending</div>
        {msgs.map((m) => {
          const mine = m.from === "owner";
          const ch = byId(m.from);
          return (
            <div key={m.id} className={cn("flex items-end gap-2", mine && "flex-row-reverse")}>
              <Avatar char={ch} size={34} square />
              <div
                className={cn(
                  "max-w-[74%] animate-[bubble-in_.3s_ease] rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed shadow-sm",
                  mine
                    ? "rounded-br-lg bg-[#7c5bd9] text-white"
                    : "rounded-bl-lg border border-[rgba(76,40,130,0.06)] bg-white text-[#1c1430]",
                )}
              >
                {m.text}
              </div>
              <span className="pb-1 text-[10px] text-[#a99db9]">{m.time}</span>
            </div>
          );
        })}
      </div>
      <div className="shrink-0 border-t border-[rgba(76,40,130,0.06)] bg-white/95 px-3 py-2.5 backdrop-blur">
        <div className="flex items-center gap-2">
          <button onClick={() => toast("Voice input is UI-only")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#837791]">
            <Mic className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-1 rounded-full bg-[#f2eefb] px-3 py-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a99db9]"
            />
            <Smile className="h-4.5 w-4.5 shrink-0 text-[#837791]" />
            <Paperclip className="h-4.5 w-4.5 shrink-0 text-[#837791]" />
            <ImageIcon className="h-4.5 w-4.5 shrink-0 text-[#837791]" />
          </div>
          <button
            onClick={send}
            className={cn(
              "flex h-9 shrink-0 items-center rounded-full px-4 text-sm font-semibold text-white transition active:scale-95",
              draft.trim() ? "bg-[#7c5bd9] shadow-[0_4px_12px_rgba(124,91,217,0.4)]" : "bg-[#c9bfd9]",
            )}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ Chat details ============ */

export function ChatDetailsPage({ onBack }: { onBack: () => void }) {
  const ch = byId("seraphina");
  const [mute, setMute] = useState(false);
  const [pin, setPin] = useState(true);
  const [MomentNotify, setMomentNotify] = useState(true);
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Conversation details" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="flex items-center gap-4 p-4">
          <Avatar char={ch} size={64} square />
          <div className="min-w-0 flex-1">
            <div className="text-lg font-bold text-[#1c1430]">{ch.name}</div>
            <div className="text-xs text-[#837791]">{ch.role} · Enclave ID SV-0417</div>
          </div>
          <Badge tone={ch.online ? "green" : "gray"}>{ch.online ? "Online" : "Offline"}</Badge>
        </Card>

        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🔍" title="Chat history search" onClick={() => toast("Chat history search — UI demo")} />
          <Cell emoji="🖼️" title="Chat background" sub="Moonlit Arch · violet" onClick={() => toast("Chat background — UI demo")} />
          <Cell emoji="📎" title="Shared media" sub="246 items" onClick={() => toast("Shared media — UI demo")} />
          <Cell emoji="📍" title="Shared location" sub="Moon Pool · live 12 min" onClick={() => toast("Shared location — UI demo")} />
        </Card>

        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-[15px] text-[#1c1430]">Mute notifications</span>
            <Toggle checked={mute} onChange={setMute} />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-[15px] text-[#1c1430]">Pin to top</span>
            <Toggle checked={pin} onChange={setPin} />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <div className="text-[15px] text-[#1c1430]">Moment alerts</div>
              <div className="text-xs text-[#837791]">Notify when {ch.name.split(" ")[0]} posts</div>
            </div>
            <Toggle checked={MomentNotify} onChange={setMomentNotify} />
          </div>
        </Card>

        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🚩" title="Report or block" danger onClick={() => toast("Report flow — UI demo")} />
          <Cell emoji="🗑️" title="Delete conversation" danger chevron={false} onClick={() => toast("Delete — UI demo")} />
        </Card>
      </div>
    </div>
  );
}

/* ============ Global search ============ */

export function SearchPage({ onBack }: { onBack: () => void }) {
  const [q, setQ] = useState("moon");
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title={
          <SearchBar autoFocus placeholder="Search the world" value={q} onChange={setQ} className="bg-white/80" />
        }
        onBack={onBack}
      />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <SectionTitle>Conversations</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🌙" title="Seraphina Vale" sub="…the moon pool is glowing again tonight…" right={<Badge>2 new</Badge>} onClick={() => toast("Open chat — UI demo")} />
          <Cell emoji="🌾" title="Rune" sub="…moonflowers for Luna…" onClick={() => toast("Open chat — UI demo")} />
        </Card>
        <SectionTitle>Moments</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🌕" title="Moonlit Arc — cycle preview" sub="Seraphina Vale · 22 min ago" onClick={() => toast("Open moment — UI demo")} />
        </Card>
        <SectionTitle>World</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🌙" title="Moon Pool" sub="Scene · 5 residents present" onClick={() => toast("Open scene — UI demo")} />
          <Cell emoji="🌌" title="Moonflower row" sub="Yinjie Farm · your plot" onClick={() => toast("Open farm — UI demo")} />
        </Card>
      </div>
    </div>
  );
}
