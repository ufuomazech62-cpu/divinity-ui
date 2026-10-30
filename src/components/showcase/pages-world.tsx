"use client";

// World tab: the living world hub + scene view, world characters, cyber avatar.

import { useState } from "react";
import {
  Activity,
  Compass,
  DoorOpen,
  Flame,
  MapPin,
  Plus,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { byId, cyberAvatars, owner, scenes, worldCharactersOnline, characters } from "./data";
import { Avatar, Badge, Card, Cell, PrimaryButton, SectionTitle, Tile, TopBar, grad, toast } from "./kit";

/* ============ World hub ============ */

export function WorldPage({ onOpenScene }: { onOpenScene: (s: (typeof scenes)[number]) => void }) {
  const hour = new Date().getHours();
  const phase = hour >= 22 || hour < 5 ? "Midnight Arc is live" : hour >= 18 ? "Dusk cycle" : "Day cycle";
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-24 pt-3">
        {/* hero */}
        <div className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-[0_10px_30px_rgba(124,91,217,0.35)]" style={grad(["#4c3575", "#9b7deb"])}>
          <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-6 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" /> Beyond Reality
            </div>
            <div className="mt-2 text-2xl font-bold tracking-wide">The Enclave</div>
            <div className="mt-1 text-sm text-white/85">
              {phase} · world sync healthy · cycle 12
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                {worldCharactersOnline.online} residents online
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <MapPin className="h-3.5 w-3.5" /> 5 scenes open
              </span>
            </div>
          </div>
        </div>

        {/* owner card */}
        <Card className="flex items-center gap-3 p-4">
          <Avatar char={owner} size={52} square />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-[#1c1430]">{owner.name}</span>
              <Badge>Owner</Badge>
            </div>
            <div className="text-xs text-[#837791]">Enclave ID ZC-0001 · steward since cycle 3</div>
          </div>
          <button onClick={() => toast("World settings — UI demo")} className="rounded-full bg-[#f2eefb] px-3 py-1.5 text-xs font-medium text-[#7c5bd9]">
            Manage
          </button>
        </Card>

        {/* daily quests */}
        <div>
          <SectionTitle action={<button className="text-[11px] font-medium text-[#7c5bd9]" onClick={() => toast("Quest log — UI demo")}>View all</button>}>Daily quests</SectionTitle>
          <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
            {[
              { icon: <Flame className="h-4 w-4" />, t: "Visit two scenes", r: "+80 ✦", done: true, p: 100 },
              { icon: <Users className="h-4 w-4" />, t: "Talk with 3 residents", r: "+120 ✦", done: false, p: 66 },
              { icon: <Wand2 className="h-4 w-4" />, t: "Bless one farm plot", r: "+60 ✦", done: false, p: 0 },
            ].map((q) => (
              <div key={q.t} className="flex items-center gap-3 px-4 py-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${q.done ? "bg-emerald-500/10 text-emerald-600" : "bg-[#7c5bd9]/10 text-[#7c5bd9]"}`}>
                  {q.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1c1430]">{q.t}</span>
                    <span className="text-xs text-[#837791]">{q.r}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#f2eefb]">
                    <div className="h-full rounded-full" style={{ width: `${q.p}%`, background: q.done ? "#10b981" : "linear-gradient(90deg,#7c5bd9,#9b7deb)" }} />
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* scenes */}
        <div>
          <SectionTitle action={<button className="text-[11px] font-medium text-[#7c5bd9]" onClick={() => toast("Scene atlas — UI demo")}>Atlas</button>}>Scenes · live now</SectionTitle>
          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {scenes.map((s) => (
              <button key={s.id} onClick={() => onOpenScene(s)} className="w-40 shrink-0 text-left transition active:scale-[0.97]">
                <Tile g={s.gradient} emoji={s.emoji} className="h-28 w-full shadow-sm" />
                <div className="mt-2 px-1">
                  <div className="truncate text-sm font-semibold text-[#1c1430]">{s.name}</div>
                  <div className="text-[11px] text-[#837791]">{s.people} present · hosted by {byId(s.who).name.split(" ")[0]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* residents online */}
        <div>
          <SectionTitle>Residents</SectionTitle>
          <Card className="p-4">
            <div className="flex flex-wrap gap-4">
              {characters.map((c) => (
                <button key={c.id} onClick={() => toast(`Open ${c.name}'s profile — UI demo`)} className="flex w-16 flex-col items-center gap-1.5">
                  <Avatar char={c} size={48} />
                  <span className="w-full truncate text-center text-[10px] text-[#463a5c]">{c.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* world status */}
        <Card className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
            <Activity className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1 text-sm">
            <div className="font-semibold text-[#1c1430]">World status · healthy</div>
            <div className="text-xs text-[#837791]">Last backup 21:07 · 2 new scenes added today</div>
          </div>
          <DoorOpen className="h-4 w-4 text-[#c9bfd9]" />
        </Card>
      </div>
    </div>
  );
}

/* ============ Scene view ============ */

export function ScenePage({ sceneName, onBack }: { sceneName: string; onBack: () => void }) {
  const scene = scenes.find((s) => s.name === sceneName) ?? scenes[0];
  const host = byId(scene.who);
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <div className="relative shrink-0">
        <div className="h-44 w-full" style={grad(scene.gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.3),transparent_50%)]" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f4f1fb] to-transparent" />
          <div className="absolute left-1/2 top-10 -translate-x-1/2 text-7xl drop-shadow-lg">{scene.emoji}</div>
        </div>
        <div className="absolute left-3 top-3">
          <TopBar transparent title="" onBack={onBack} />
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-24">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-[#1c1430]">{scene.name}</div>
            <div className="text-xs text-[#837791]">Hosted by {host.name} · {scene.people} present</div>
          </div>
          <Badge tone="green">Live</Badge>
        </div>

        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="💬" title="Open scene chat" sub="Everyone present" onClick={() => toast("Scene chat — UI demo")} />
          <Cell emoji="🎧" title="Ambient sound" sub="Moon pool · loops 4:32" right={<Badge tone="gray">On</Badge>} chevron={false} onClick={() => toast("Ambient toggled (demo)")} />
          <Cell emoji="🔖" title="Save to favorites" onClick={() => toast("Saved to favorites (demo)")} chevron={false} />
        </Card>

        <div>
          <SectionTitle>Present here</SectionTitle>
          <Card className="p-4">
            <div className="flex flex-wrap gap-4">
              {characters.slice(0, 5).map((c) => (
                <div key={c.id} className="flex w-16 flex-col items-center gap-1.5">
                  <Avatar char={c} size={48} />
                  <span className="w-full truncate text-center text-[10px] text-[#463a5c]">{c.name.split(" ")[0]}</span>
                </div>
              ))}
              <button onClick={() => toast("Join scene — UI demo")} className="flex h-12 w-12 items-center justify-center self-start rounded-full border-2 border-dashed border-[#c9bfd9] text-[#837791]">
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </Card>
        </div>

        <PrimaryButton onClick={() => toast("Entering scene… (demo)")}>
          <span className="inline-flex items-center justify-center gap-2"><Compass className="h-4 w-4" /> Enter scene</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ============ World characters ============ */

export function WorldCharactersPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="World characters" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="p-4">
          <div className="text-sm font-semibold text-[#1c1430]">Your world has {characters.length} characters</div>
          <div className="mt-1 text-xs text-[#837791]">Characters are AI residents with memory, moods and schedules. They post, host scenes and answer messages.</div>
        </Card>
        {characters.map((c) => (
          <Card key={c.id} className="flex items-center gap-3 p-4">
            <Avatar char={c} size={54} square />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-[#1c1430]">{c.name}</span>
                {c.online && <Badge tone="green">Online</Badge>}
              </div>
              <div className="text-xs text-[#837791]">{c.role}</div>
              <div className="mt-1 flex gap-1.5">
                <Badge tone="gray">Memory 87%</Badge>
                <Badge tone="brand">Bond {40 + c.name.length * 3}</Badge>
              </div>
            </div>
            <button onClick={() => toast(`Messaging ${c.name} — UI demo`)} className="rounded-full bg-[#7c5bd9] px-3.5 py-1.5 text-xs font-semibold text-white">
              Message
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============ Cyber avatar ============ */

export function CyberAvatarPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Cyber avatar" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <div className="relative overflow-hidden rounded-[28px] p-5 text-white" style={grad(["#1e1b3a", "#4c3575"])}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Your digital self</div>
          <div className="mt-1 text-xl font-bold">Neon Seraph</div>
          <div className="mt-0.5 text-xs text-white/70">Cyber portrait · violet halo · Gen II</div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl text-4xl shadow-inner" style={grad(["#7c5bd9", "#f0abfc"])}>😇</div>
            <div className="flex-1">
              <div className="text-xs text-white/80">Signature mood</div>
              <div className="text-sm font-semibold">Luminous · +12 aura this cycle</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#9b7deb] to-[#f0abfc]" />
              </div>
            </div>
          </div>
        </div>
        <SectionTitle>Portrait collection</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          {cyberAvatars.map((a) => (
            <button key={a.id} onClick={() => toast(`${a.name} — UI demo`)} className="text-left transition active:scale-[0.97]">
              <Tile g={a.gradient} emoji={a.emoji} className="aspect-[3/4] w-full shadow-sm" />
              <div className="mt-1.5 truncate text-xs font-semibold text-[#1c1430]">{a.name}</div>
              <div className="truncate text-[10px] text-[#837791]">{a.status}</div>
            </button>
          ))}
        </div>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🎭" title="Edit avatar style" onClick={() => toast("Avatar editor — UI demo")} />
          <Cell emoji="🖼️" title="Use as profile portrait" onClick={() => toast("Portrait updated (demo)")} chevron={false} />
          <Cell emoji="✨" title="Mint new portrait" sub="120 ✦ per mint" onClick={() => toast("Mint flow — UI demo")} />
        </Card>
      </div>
    </div>
  );
}
