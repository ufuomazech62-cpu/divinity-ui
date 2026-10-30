"use client";

// Games hub + Yinjie Farm playable-screen mock + mini programs.

import { useState } from "react";
import { Droplets, Leaf, Moon, Sprout, Star, Sun, Trophy } from "lucide-react";
import { games, miniPrograms } from "./data";
import { Badge, Card, Cell, SectionTitle, Tile, TopBar, grad, toast } from "./kit";
import { cn } from "@/lib/utils";

export function GamesPage({ onBack, onOpenFarm }: { onBack: () => void; onOpenFarm: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Game center" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <div className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-[0_10px_30px_rgba(124,91,217,0.3)]" style={grad(["#4c3575", "#7c5bd9"])}>
          <Trophy className="absolute right-4 top-4 h-8 w-8 text-white/25" />
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Season ranking</div>
          <div className="mt-1 text-2xl font-bold">#12 in the Enclave</div>
          <div className="mt-1 text-xs text-white/80">+3 places this cycle · 1,240 ✦ earned</div>
        </div>

        <SectionTitle>Continue playing</SectionTitle>
        <Card className="flex items-center gap-4 p-4" onClick={onOpenFarm}>
          <Tile g={games[0].gradient} emoji={games[0].emoji} className="h-20 w-20 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-[#1c1430]">{games[0].name}</div>
            <div className="text-xs text-[#837791]">{games[0].desc}</div>
            <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-[#f2eefb]">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#7c5bd9] to-[#9b7deb]" />
            </div>
          </div>
          <Badge tone="green">Ready</Badge>
        </Card>

        <SectionTitle>All games</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {games.slice(1).map((g) => (
            <button key={g.id} onClick={() => toast(`${g.name} — UI demo`)} className="text-left transition active:scale-[0.97]">
              <Tile g={g.gradient} emoji={g.emoji} className="aspect-[4/3] w-full shadow-sm" overlay={
                g.status ? (
                  <span className="absolute right-2 top-2">
                    <Badge tone={g.status === "Hot" ? "rose" : g.status === "New" ? "brand" : "amber"}>{g.status}</Badge>
                  </span>
                ) : null
              } />
              <div className="mt-1.5 truncate text-[13px] font-semibold text-[#1c1430]">{g.name}</div>
              <div className="truncate text-[11px] text-[#837791]">{g.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FarmPage({ onBack }: { onBack: () => void }) {
  const plots = [
    { id: 1, crop: "🌾", stage: "Ready", water: 100 },
    { id: 2, crop: "🌾", stage: "Ready", water: 100 },
    { id: 3, crop: "🌱", stage: "Growing · 62%", water: 45 },
    { id: 4, crop: "🌱", stage: "Sprouting · 20%", water: 20 },
    { id: 5, crop: "", stage: "Empty", water: 0 },
    { id: 6, crop: "🌙", stage: "Moonflower · 80%", water: 70 },
  ];
  const [watered, setWatered] = useState<Record<number, boolean>>({});
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1e1b3a] to-[#4c3575]">
      <TopBar
        title={<span className="text-white">Yinjie Farm</span>}
        onBack={onBack}
        right={
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> 128
          </span>
        }
      />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-24 pt-3">
        <div className="flex items-center justify-between rounded-3xl bg-white/10 px-4 py-3 text-white backdrop-blur">
          <div className="flex items-center gap-2 text-sm"><Sun className="h-4 w-4 text-amber-300" /> Day cycle · moonlight in 2h</div>
          <div className="flex items-center gap-2 text-sm"><Moon className="h-4 w-4 text-violet-300" /> Boost ×1.4</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {plots.map((p) => {
            const isWatered = watered[p.id];
            const done = p.stage === "Ready";
            return (
              <button
                key={p.id}
                onClick={() => {
                  if (done) toast("Harvested! +12 gold starfruit (demo)");
                  else if (p.crop) setWatered((w) => ({ ...w, [p.id]: true }));
                  else toast("Plant a seed — UI demo");
                }}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-3xl border transition active:scale-[0.96]",
                  p.crop ? "border-white/20 bg-white/10 backdrop-blur" : "border-dashed border-white/25 bg-white/5",
                )}
              >
                {isWatered && p.water < 100 && <div className="absolute inset-x-0 bottom-0 bg-sky-400/25 transition-all" style={{ height: "60%" }} />}
                <div className="relative flex h-full flex-col items-center justify-center gap-1">
                  <span className="text-3xl">{p.crop || "＋"}</span>
                  <span className="px-1 text-center text-[9px] leading-tight text-white/85">{done ? "Tap to harvest!" : p.stage}</span>
                </div>
                {done && <span className="absolute right-2 top-2 h-2.5 w-2.5 animate-ping rounded-full bg-amber-300" />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => toast("Watered all plots (demo)")} className="flex items-center justify-center gap-2 rounded-2xl bg-sky-400/20 py-3 text-sm font-semibold text-white backdrop-blur active:scale-95">
            <Droplets className="h-4 w-4" /> Water all
          </button>
          <button onClick={() => toast("Moonlight boost activated (demo)")} className="flex items-center justify-center gap-2 rounded-2xl bg-violet-400/25 py-3 text-sm font-semibold text-white backdrop-blur active:scale-95">
            <Moon className="h-4 w-4" /> Boost ×1.4
          </button>
        </div>

        <div className="rounded-3xl bg-white/10 p-4 text-white backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold"><Sprout className="h-4 w-4 text-lime-300" /> Rune&apos;s tip</div>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            Water before moonrise for a ×1.4 growth bonus. Keep one row of moonflowers — the Tide Caller checks them nightly.
          </p>
        </div>

        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🧺" title="Barn" sub="24 starfruit · 6 moonflower" onClick={() => toast("Barn — UI demo")} />
          <Cell emoji="🛒" title="Farm market" sub="Sell harvests to residents" onClick={() => toast("Market — UI demo")} />
          <Cell emoji="🤝" title="Co-op members" sub="Gate Watch · 3 of 4 slots" onClick={() => toast("Co-op — UI demo")} />
        </Card>
      </div>
    </div>
  );
}

export function MiniProgramsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Mini programs" onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-24">
        <SectionTitle>Recently used</SectionTitle>
        <Card className="mb-4 p-4">
          <div className="grid grid-cols-4 gap-4">
            {miniPrograms.slice(0, 4).map((m) => (
              <button key={m.id} onClick={() => toast(`${m.name} — UI demo`)} className="flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm" style={grad(m.gradient)}>
                  {m.emoji}
                </div>
                <span className="w-full truncate text-center text-[10px] text-[#463a5c]">{m.name}</span>
              </button>
            ))}
          </div>
        </Card>
        <SectionTitle>All mini programs</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {miniPrograms.map((m) => (
            <Cell key={m.id} emoji={m.emoji} iconGradient={m.gradient} title={m.name} onClick={() => toast(`${m.name} — UI demo`)} />
          ))}
        </Card>
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#a99db9]">
          <Leaf className="h-3.5 w-3.5" /> Mini programs run inside the world — no install, no exit.
        </div>
      </div>
    </div>
  );
}
