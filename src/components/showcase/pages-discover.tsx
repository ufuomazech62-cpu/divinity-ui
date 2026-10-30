"use client";

// Discover tab: hub, moments (social feed), moments publish, video feed, channels, official accounts.

import { useState } from "react";
import {
  Bookmark,
  Camera,
  Gamepad2,
  Heart,
  ImagePlus,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Newspaper,
  Play,
  PlaySquare,
  Radio,
  Send,
  ShoppingBag,
  Sparkles,
  UserPlus,
  UsersRound,
  Video,
} from "lucide-react";
import { articles, byId, feedPosts, moments, officialAccounts, owner } from "./data";
import { Avatar, Badge, Card, Cell, PrimaryButton, SearchBar, SectionTitle, Tile, TopBar, grad, toast } from "./kit";
import { cn } from "@/lib/utils";

/* ============ Discover hub ============ */

export function DiscoverPage({
  onOpen,
}: {
  onOpen: (v: "moments" | "feed" | "channels" | "encounters" | "scene" | "games" | "mini-programs" | "official") => void;
}) {
  const entries = [
    { key: "moments", icon: <Camera className="h-5 w-5" />, g: ["#7c5bd9", "#9b7deb"] as const, t: "Moments", s: "Friend feed" },
    { key: "channels", icon: <Newspaper className="h-5 w-5" />, g: ["#b45309", "#fbbf24"] as const, t: "Channels", s: "3 new articles" },
    { key: "feed", icon: <PlaySquare className="h-5 w-5" />, g: ["#be123c", "#fb7185"] as const, t: "Video feed", s: "Trending in Enclave" },
    { key: "encounters", icon: <UserPlus className="h-5 w-5" />, g: ["#0f766e", "#2dd4bf"] as const, t: "Encounters", s: "3 nearby travelers" },
    { key: "scene", icon: <MapPin className="h-5 w-5" />, g: ["#4d7c0f", "#bef264"] as const, t: "Nearby scenes", s: "5 scenes open now" },
    { key: "games", icon: <Gamepad2 className="h-5 w-5" />, g: ["#86198f", "#f0abfc"] as const, t: "Games", s: "Farm ready to harvest" },
    { key: "mini-programs", icon: <ShoppingBag className="h-5 w-5" />, g: ["#1e293b", "#64748b"] as const, t: "Mini programs", s: "" },
    { key: "official", icon: <MessageSquareText className="h-5 w-5" />, g: ["#0369a1", "#7dd3fc"] as const, t: "Official accounts", s: "" },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-4 pb-2 pt-3">
        <div className="text-[22px] font-bold tracking-wide text-[#1c1430]">Discover</div>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-24">
        <SearchBar placeholder="Search the Enclave" onFocus={() => toast("Global search — open from Chats tab (demo)")} />

        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {entries.map((e) => (
            <Cell
              key={e.key}
              iconGradient={[...e.g]}
              icon={e.icon}
              title={e.t}
              sub={e.s || undefined}
              onClick={() => onOpen(e.key as "moments")}
            />
          ))}
        </Card>

        <SectionTitle>From the video feed</SectionTitle>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {feedPosts.slice(0, 3).map((p) => (
            <button key={p.id} onClick={() => onOpen("feed")} className="w-44 shrink-0 text-left transition active:scale-[0.97]">
              <Tile g={p.gradient} emoji={p.emoji} className="h-24 w-full shadow-sm" overlay={
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              } />
              <div className="relative -mt-7 px-2">
                <div className="truncate text-xs font-semibold text-white drop-shadow">{p.title}</div>
                <div className="text-[10px] text-white/80">{p.views} views · {p.duration}</div>
              </div>
              <div className="mt-1 px-1 text-[10px] text-[#837791]">by {byId(p.author).name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ Moments (friend feed) ============ */

export function MomentsPage({ onBack, onPublish }: { onBack: () => void; onPublish: () => void }) {
  const [liked, setLiked] = useState<Record<string, boolean>>(
    Object.fromEntries(moments.map((m) => [m.id, Boolean(m.liked)])),
  );
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title="Moments"
        onBack={onBack}
        right={
          <button onClick={onPublish} className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold text-[#7c5bd9] shadow-sm">
            <ImagePlus className="h-4 w-4" /> Post
          </button>
        }
      />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 pb-24">
        {moments.map((m) => {
          const a = byId(m.author);
          const isLiked = liked[m.id];
          return (
            <Card key={m.id} className="p-4">
              <div className="flex items-center gap-3">
                <Avatar char={a} size={44} square />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-[#1c1430]">{a.name}</span>
                    {m.tag && <Badge tone="brand">{m.tag}</Badge>}
                  </div>
                  <div className="text-[11px] text-[#a99db9]">{m.time}</div>
                </div>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[#1c1430]">{m.text}</p>
              {m.tiles && (
                <div className={cn("mt-3 grid gap-2", m.tiles.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
                  {m.tiles.map((g, i) => (
                    <Tile key={i} g={g} emoji={m.tileEmoji?.[i]} className={cn("shadow-sm", m.tiles!.length === 3 ? "aspect-square" : "aspect-[4/3]")} />
                  ))}
                </div>
              )}
              <div className="mt-3 flex items-center gap-5 border-t border-[rgba(76,40,130,0.05)] pt-3">
                <button
                  onClick={() => setLiked((s) => ({ ...s, [m.id]: !s[m.id] }))}
                  className={cn("flex items-center gap-1.5 text-xs font-medium transition active:scale-110", isLiked ? "text-rose-500" : "text-[#837791]")}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-rose-500")} /> {m.likes + (isLiked ? (m.liked ? 0 : 1) : -1)}
                </button>
                <button onClick={() => toast("Comments — UI demo")} className="flex items-center gap-1.5 text-xs text-[#837791]">
                  <MessageCircle className="h-4 w-4" /> {m.comments.length}
                </button>
                <button onClick={() => toast("Shared to a chat (demo)")} className="ml-auto text-xs text-[#837791]">
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {m.comments.length > 0 && (
                <div className="mt-3 space-y-1.5 rounded-2xl bg-[#f7f4fd] px-3 py-2.5">
                  {m.comments.map((c, i) => (
                    <div key={i} className="text-xs leading-relaxed">
                      <span className="font-semibold text-[#7c5bd9]">{byId(c.who).name.split(" ")[0]}</span>
                      <span className="text-[#463a5c]">: {c.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ============ Moments publish ============ */

export function MomentPublishPage({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("The gate plaza lanterns are up for the Midnight Arc preview 🏮");
  const [who, setWho] = useState("All residents");
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title="New moment"
        onBack={onBack}
        right={
          <button onClick={() => toast("Moment published (demo)")} className="rounded-full bg-[#7c5bd9] px-4 py-1.5 text-xs font-semibold text-white shadow">
            Publish
          </button>
        }
      />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Share something from your world…"
            className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-[#1c1430] outline-none placeholder:text-[#a99db9]"
          />
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Tile g={["#4c3575", "#9b7deb"]} emoji="🏮" className="aspect-square" />
            <button onClick={() => toast("Photo picker — UI demo")} className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#ded4ee] text-[#a99db9]">
              <ImagePlus className="h-5 w-5" />
              <span className="text-[10px]">Add photo</span>
            </button>
            <button onClick={() => toast("Camera — UI demo")} className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#ded4ee] text-[#a99db9]">
              <Camera className="h-5 w-5" />
              <span className="text-[10px]">Camera</span>
            </button>
          </div>
        </Card>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="📍" title="Location" sub="Enclave · Gate Plaza" onClick={() => toast("Location — UI demo")} />
          <Cell emoji="🏷️" title="Tag scene" sub="Midnight Arc" onClick={() => toast("Tag scene — UI demo")} />
          <Cell
            emoji="👥"
            title="Who can see this"
            sub={who}
            right={undefined}
            onClick={() => setWho(who === "All residents" ? "Inner circle" : "All residents")}
          />
        </Card>
        <PrimaryButton onClick={() => toast("Moment published (demo)")}>Publish to Moments</PrimaryButton>
      </div>
    </div>
  );
}

/* ============ Video feed ============ */

export function FeedPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState("For you");
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title="Video feed"
        onBack={onBack}
        right={
          <button onClick={() => toast("Live now — UI demo")} className="flex h-9 items-center gap-1.5 rounded-full bg-rose-500/10 px-3.5 text-xs font-semibold text-rose-500">
            <Radio className="h-4 w-4" /> Live
          </button>
        }
      />
      <div className="shrink-0 px-4 pb-3">
        <div className="flex gap-2">
          {["For you", "Scenes", "Farm", "Training"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                tab === t ? "bg-[#1c1430] text-white shadow" : "bg-white text-[#837791]",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {feedPosts.map((p) => (
            <button key={p.id} onClick={() => toast("Video player — UI demo")} className="text-left transition active:scale-[0.98]">
              <Tile g={p.gradient} emoji={p.emoji} className="aspect-[3/4] w-full shadow-sm" overlay={
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 backdrop-blur">
                      <Play className="h-5 w-5 fill-white text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-x-2 bottom-2">
                    <div className="line-clamp-2 text-[11px] font-semibold leading-snug text-white">{p.title}</div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-white/85">
                      <span>{p.views} views</span>
                      <span>{p.duration}</span>
                    </div>
                  </div>
                </>
              } />
              <div className="mt-1.5 flex items-center gap-1.5 px-0.5">
                <Avatar char={byId(p.author)} size={20} />
                <span className="truncate text-[10px] text-[#837791]">{byId(p.author).name.split(" ")[0]} · {p.tag}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ Channels ============ */

export function ChannelsPage({ onBack, onOpenArticle }: { onBack: () => void; onOpenArticle: (id: string) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Channels" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 pb-24">
        {articles.map((a) => (
          <Card key={a.id} className="flex gap-3 p-3" onClick={() => onOpenArticle(a.id)}>
            <Tile g={a.gradient} emoji={a.emoji} className="h-20 w-24 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="line-clamp-2 text-sm font-semibold leading-snug text-[#1c1430]">{a.title}</div>
              <div className="mt-1 line-clamp-1 text-xs text-[#837791]">{a.excerpt}</div>
              <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#a99db9]">
                <span className="font-medium text-[#7c5bd9]">{a.channel}</span>
                <span>{a.time}</span>
                <span>{a.reads} reads</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ArticlePage({ articleId, onBack }: { articleId: string; onBack: () => void }) {
  const a = articles.find((x) => x.id === articleId) ?? articles[0];
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar
        title={a.channel}
        onBack={onBack}
        right={
          <button onClick={() => toast("Subscribed to channel (demo)")} className="rounded-full bg-[#7c5bd9] px-3.5 py-1.5 text-xs font-semibold text-white">
            Follow
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-24">
        <Tile g={a.gradient} emoji={a.emoji} className="mt-4 h-44 w-full shadow-sm" />
        <h1 className="mt-4 text-xl font-bold leading-snug text-[#1c1430]">{a.title}</h1>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#a99db9]">
          <span>{a.time} ago</span>·<span>{a.reads} reads</span>
        </div>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#463a5c]">
          <p>{a.excerpt}</p>
          <p>
            The change lands with tonight&apos;s dusk cycle. Residents will see the new district gates glow violet after
            the second bell; stalls can claim night permits from the Stall Manager mini program starting tomorrow.
          </p>
          <p>
            Seraphina Vale asked residents to stay clear of unregistered doors. &ldquo;If it hums, note it. If it opens,
            note it louder,&rdquo; the Moonlit Oracle told the Herald.
          </p>
        </div>
        <Card className="mt-5 flex items-center gap-3 p-4">
          <Avatar char={owner} size={40} />
          <div className="flex-1 text-xs text-[#837791]">What do you think about the new district?</div>
          <button onClick={() => toast("Comment posted (demo)")} className="rounded-full bg-[#7c5bd9] px-3.5 py-1.5 text-xs font-semibold text-white">
            Comment
          </button>
        </Card>
      </div>
    </div>
  );
}

/* ============ Official accounts ============ */

export function OfficialAccountsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f1fb]">
      <TopBar title="Official accounts" onBack={onBack} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          {officialAccounts.map((o) => (
            <Cell
              key={o.id}
              emoji={o.emoji}
              iconGradient={o.gradient}
              title={
                <span className="flex items-center gap-2">
                  {o.name} {o.badge && <Badge tone={o.badge === "Service" ? "green" : "brand"}>{o.badge}</Badge>}
                </span>
              }
              sub={o.desc}
              onClick={() => toast(`${o.name} opened — UI demo`)}
            />
          ))}
        </Card>
        <SectionTitle>Recommended</SectionTitle>
        <Card className="divide-y divide-[rgba(76,40,130,0.05)] overflow-hidden">
          <Cell emoji="🎭" title="Stage Weekly" sub="Setlists, idols, encore polls" onClick={() => toast("Stage Weekly — UI demo")} />
          <Cell emoji="🌌" title="Dream Atlas" sub="Nyx's field notes on dreams" onClick={() => toast("Dream Atlas — UI demo")} />
        </Card>
      </div>
    </div>
  );
}
