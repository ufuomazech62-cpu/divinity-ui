"use client";

// Contacts tab: index, new friend requests, add friend, starred.

import { useState } from "react";
import { Handshake, Megaphone, Star, UserPlus, Users } from "lucide-react";
import { byId, characters, friendRequests } from "./data";
import { Avatar, Badge, Card, Cell, PrimaryButton, SearchBar, SectionTitle, TopBar, toast } from "./kit";

/* ============ Contacts ============ */

export function ContactsPage({
  onOpenRequests,
  onAddFriend,
}: {
  onOpenRequests: () => void;
  onAddFriend: () => void;
}) {
  const [q, setQ] = useState("");
  const list = characters.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  const letters = [...new Set(list.map((c) => c.name[0]))].sort();
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 space-y-3 px-4 pb-2 pt-3">
        <div className="flex items-center justify-between">
          <div className="text-[22px] font-bold tracking-wide text-[#1c1430]">Contacts</div>
          <button onClick={onAddFriend} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#463a5c] shadow-sm active:scale-95">
            <UserPlus className="h-4.5 w-4.5" />
          </button>
        </div>
        <SearchBar placeholder="Search contacts" value={q} onChange={setQ} />
      </div>
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden px-4 pb-24">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
            <Cell emoji="🤝" title="New friends" sub={`${friendRequests.length} requests`} right={<Badge tone="rose">{friendRequests.length}</Badge>} onClick={onOpenRequests} />
            <Cell emoji="👥" title="Group chats" sub="Gate Watch, Co-op Farm" onClick={() => toast("Group chats — UI demo")} />
            <Cell emoji="⭐" title="Starred contacts" onClick={() => toast("Starred — UI demo")} />
            <Cell emoji="📰" title="Official accounts" onClick={() => toast("Official accounts — UI demo")} />
            <Cell emoji="🏷️" title="Tags" onClick={() => toast("Contact tags — UI demo")} />
          </Card>

          {letters.map((l) => (
            <div key={l}>
              <SectionTitle>{l}</SectionTitle>
              <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
                {list
                  .filter((c) => c.name[0] === l)
                  .map((c) => (
                    <div key={c.id} className="flex items-center gap-3 px-4 py-3 transition active:bg-[#f7f4fd]" role="button" onClick={() => toast(`Open ${c.name} — UI demo`)}>
                      <Avatar char={c} size={44} square />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[15px] font-medium text-[#1c1430]">{c.name}</span>
                          {c.online && <Badge tone="green">Online</Badge>}
                        </div>
                        <div className="truncate text-xs text-[#837791]">{c.role}</div>
                      </div>
                    </div>
                  ))}
              </Card>
            </div>
          ))}
        </div>
        <div className="hidden w-6 shrink-0 flex-col items-center gap-1 pt-2 text-[10px] font-semibold text-[#7c5bd9] sm:flex">
          {letters.map((l) => (
            <button key={l} onClick={() => toast(`Jump to ${l} (demo)`)}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ New friends (requests) ============ */

export function FriendRequestsPage({ onBack }: { onBack: () => void }) {
  const [handled, setHandled] = useState<Record<string, "accepted" | "declined">>({});
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="New friends" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🔍" title="Search by Enclave ID" onClick={() => toast("ID search — UI demo")} />
          <Cell emoji="📇" title="Add from encounter" sub="3 travelers nearby" onClick={() => toast("Encounter — open Discover tab (demo)")} />
        </Card>
        <SectionTitle>Requests</SectionTitle>
        {friendRequests.map((r) => (
          <Card key={r.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ backgroundImage: `linear-gradient(135deg, ${r.gradient[0]}, ${r.gradient[1]})` }}>
                {r.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-[#1c1430]">{r.name}</span>
                  <span className="text-[11px] text-[#a99db9]">{r.time}</span>
                </div>
                <div className="text-xs text-[#837791]">{r.role}</div>
                <p className="mt-1.5 rounded-2xl bg-[#f7f4fd] px-3 py-2 text-xs leading-relaxed text-[#463a5c]">{r.note}</p>
                {handled[r.id] ? (
                  <div className="mt-3 text-xs font-semibold text-[#837791]">
                    {handled[r.id] === "accepted" ? "✓ Accepted — say hi in Chats" : "Request declined"}
                  </div>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setHandled((h) => ({ ...h, [r.id]: "declined" }))} className="flex-1 rounded-full bg-[#f2eefb] py-2 text-xs font-semibold text-[#837791]">
                      Decline
                    </button>
                    <button onClick={() => setHandled((h) => ({ ...h, [r.id]: "accepted" }))} className="flex-1 rounded-full bg-[#7c5bd9] py-2 text-xs font-semibold text-white shadow">
                      Accept
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============ Add friend ============ */

export function AddFriendPage({ onBack }: { onBack: () => void }) {
  const [id, setId] = useState("");
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Add friend" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="p-4">
          <div className="text-sm font-semibold text-[#1c1430]">Add by Enclave ID</div>
          <div className="mt-3 flex gap-2">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="e.g. SV-0417"
              className="min-w-0 flex-1 rounded-2xl bg-[#f7f4fd] px-4 py-3 text-sm outline-none placeholder:text-[#a99db9]"
            />
            <button
              onClick={() => toast(id ? `Looking up ${id}… (demo)` : "Enter an Enclave ID first")}
              className="rounded-2xl bg-[#7c5bd9] px-5 text-sm font-semibold text-white shadow active:scale-95"
            >
              Search
            </button>
          </div>
          {id.toUpperCase() === "SV-0417" && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#f7f4fd] p-3">
              <Avatar char={byId("seraphina")} size={44} square />
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#1c1430]">Seraphina Vale</div>
                <div className="text-xs text-[#837791]">Moonlit Oracle · already in your world</div>
              </div>
              <Badge tone="green">Friend</Badge>
            </div>
          )}
        </Card>

        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="📷" title="Scan Enclave QR code" onClick={() => toast("QR scanner — UI demo")} />
          <Cell emoji="🤝" title="Invite from encounter history" onClick={() => toast("Encounter history — UI demo")} />
          <Cell emoji="🔗" title="Share invite link" sub="Earn 200 ✦ per new resident" onClick={() => toast("Invite link copied (demo)")} chevron={false} />
        </Card>

        <PrimaryButton onClick={() => toast("Invite sheet — UI demo")}>
          <span className="inline-flex items-center justify-center gap-2"><Handshake className="h-4 w-4" /> Invite a friend to the Enclave</span>
        </PrimaryButton>
      </div>
    </div>
  );
}
