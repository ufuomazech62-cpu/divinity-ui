// Divinity Companion — UI/UX showcase mock data.
// Static demo content only: no backend, no auth, no live data.

export type Gradient = [string, string];

export type Character = {
  id: string;
  name: string;
  role: string;
  emoji: string;
  gradient: Gradient;
  online?: boolean;
};

export const owner: Character = {
  id: "owner",
  name: "Zech",
  role: "World Owner",
  emoji: "👑",
  gradient: ["#7c5bd9", "#9b7deb"],
  online: true,
};

export const characters: Character[] = [
  { id: "seraphina", name: "Seraphina Vale", role: "Moonlit Oracle", emoji: "🌙", gradient: ["#7c5bd9", "#c084fc"], online: true },
  { id: "kael", name: "Kael Ironwood", role: "Warden of the Gate", emoji: "⚔️", gradient: ["#f59e0b", "#fbbf24"], online: true },
  { id: "luna", name: "Luna Ashcroft", role: "Tide Caller", emoji: "🌊", gradient: ["#14b8a6", "#2dd4bf"], online: true },
  { id: "nyx", name: "Nyx", role: "Dream Merchant", emoji: "🔮", gradient: ["#d946ef", "#f0abfc"] },
  { id: "wen", name: "Minister Wen", role: "Keeper of Records", emoji: "📜", gradient: ["#78716c", "#a8a29e"], online: true },
  { id: "aria", name: "Aria Sparks", role: "Stage Idol", emoji: "🎤", gradient: ["#f43f5e", "#fb7185"] },
  { id: "tao", name: "Grandma Tao", role: "Tea House Owner", emoji: "🍵", gradient: ["#10b981", "#34d399"] },
  { id: "rune", name: "Rune", role: "Farm Sprite", emoji: "🌾", gradient: ["#84cc16", "#bef264"] },
];

export const byId = (id: string): Character =>
  [...characters, owner].find((c) => c.id === id) ?? owner;

export type Conversation = {
  id: string;
  who: string[]; // character ids (2+ = group)
  groupName?: string;
  last: string;
  time: string;
  unread?: number;
  pinned?: boolean;
  muted?: boolean;
  kind?: "official" | "subscription";
};

export const conversations: Conversation[] = [
  { id: "c1", who: ["seraphina"], last: "The moon pool is glowing again tonight. Come see it before it fades.", time: "23:41", unread: 2, pinned: true },
  { id: "c2", who: ["kael", "luna", "rune"], groupName: "Gate Watch", last: "Rune: harvested 12 starfruit from the north plot 🌟", time: "23:12", unread: 5, pinned: true },
  { id: "c3", who: ["official"], kind: "official", groupName: "Enclave Concierge", last: "Your world backup finished. 2 new scenes were added to the Enclave atlas.", time: "21:07" },
  { id: "c4", who: ["luna"], last: "Voice note · 0:14", time: "20:48" },
  { id: "c5", who: ["tao"], last: "Fresh pot of cloud tea is on the house, owner. ☕", time: "19:33", unread: 1 },
  { id: "c6", who: ["subscription"], kind: "subscription", groupName: "Subscription Inbox", last: "Seraphina Vale · 3 new moments, Aria Sparks went live", time: "18:20" },
  { id: "c7", who: ["nyx"], last: "I left a dream parcel at your doorstep. Do NOT open it before midnight.", time: "16:02", muted: true },
  { id: "c8", who: ["wen"], last: "Ledger sealed for the lunar cycle. All stalls accounted for.", time: "14:15" },
  { id: "c9", who: ["aria"], last: "Tonight's stage setlist is up — vote for the encore! 🎶", time: "12:40" },
  { id: "c10", who: ["rune"], last: "The farm sprite union demands more fertilizer. And snacks.", time: "Yesterday", muted: true },
];

export type Moment = {
  id: string;
  author: string;
  time: string;
  text: string;
  tiles?: Gradient[];
  tileEmoji?: string[];
  likes: number;
  comments: { who: string; text: string }[];
  liked?: boolean;
  tag?: string;
};

export const moments: Moment[] = [
  {
    id: "m1", author: "seraphina", time: "22 minutes ago", tag: "Moonlit Arc",
    text: "Blessed the moon pool tonight. The reflections showed a door that isn't there yet — I wrote the coordinates down.",
    tiles: [["#312e81", "#7c5bd9"], ["#0f766e", "#2dd4bf"], ["#7c5bd9", "#f0abfc"]],
    tileEmoji: ["🌙", "🌊", "✨"],
    likes: 128, liked: true,
    comments: [
      { who: "kael", text: "Tell me before you walk through any doors. Please." },
      { who: "luna", text: "The tide matches this exactly. See you at the pool." },
    ],
  },
  {
    id: "m2", author: "rune", time: "1 hour ago", tag: "Yinjie Farm",
    text: "Harvest day!! The north plot finally produced gold-grade starfruit 🌟 Take what you need, owner gets first pick.",
    tiles: [["#84cc16", "#bef264"], ["#f59e0b", "#fde68a"]],
    tileEmoji: ["🌾", "⭐"],
    likes: 64,
    comments: [{ who: "tao", text: "I'll trade you a season of tea for two baskets." }],
  },
  {
    id: "m3", author: "aria", time: "3 hours ago", tag: "Stage",
    text: "Rehearsal for the Midnight Arc concert. The encore poll is open — I already know Grandma Tao will pick the ballad. 🎤",
    tiles: [["#f43f5e", "#fb7185"], ["#7c5bd9", "#9b7deb"]],
    tileEmoji: ["🎶", "💜"],
    likes: 233,
    comments: [
      { who: "tao", text: "The ballad. Obviously." },
      { who: "nyx", text: "Vote dreamcore remix or riot." },
    ],
  },
  {
    id: "m4", author: "wen", time: "Yesterday", tag: "Records",
    text: "Cycle 12 ledger is sealed: 41 stalls renewed, 3 new residents, 0 incidents. The Enclave is calm — enjoy it while it lasts.",
    likes: 41,
    comments: [{ who: "owner", text: "Great work, Minister." }],
  },
];

export type FeedPost = {
  id: string;
  author: string;
  title: string;
  duration: string;
  gradient: Gradient;
  emoji: string;
  views: string;
  tag: string;
};

export const feedPosts: FeedPost[] = [
  { id: "f1", author: "luna", title: "Tide calling at the glass shore — full guide", duration: "12:04", gradient: ["#0f766e", "#2dd4bf"], emoji: "🌊", views: "18.2K", tag: "Scenes" },
  { id: "f2", author: "kael", title: "Gate Watch training drills you can copy", duration: "08:41", gradient: ["#b45309", "#fbbf24"], emoji: "⚔️", views: "9.7K", tag: "Training" },
  { id: "f3", author: "tao", title: "Cloud tea ceremony, from leaf to cup", duration: "15:33", gradient: ["#047857", "#34d399"], emoji: "🍵", views: "24.1K", tag: "Calm" },
  { id: "f4", author: "nyx", title: "I opened the midnight parcel. (do not try this)", duration: "06:20", gradient: ["#86198f", "#f0abfc"], emoji: "🔮", views: "31.5K", tag: "Dreams" },
  { id: "f5", author: "rune", title: "Starfruit to gold grade in one season", duration: "09:58", gradient: ["#4d7c0f", "#bef264"], emoji: "🌾", views: "12.8K", tag: "Farm" },
];

export type Article = {
  id: string;
  channel: string;
  title: string;
  excerpt: string;
  time: string;
  reads: string;
  emoji: string;
  gradient: Gradient;
};

export const articles: Article[] = [
  { id: "a1", channel: "Enclave Herald", title: "Patch notes: the Midnight Arc opens this cycle", excerpt: "A new night-only district unlocks with 14 scenes, a stage for Aria, and one door Seraphina swears wasn't there last week.", time: "2h", reads: "8.4K", emoji: "🌆", gradient: ["#312e81", "#7c5bd9"] },
  { id: "a2", channel: "Farm Weekly", title: "Gold-grade starfruit: the rune-approved method", excerpt: "Rune shares the exact watering rhythm, moonlight windows, and the snack budget that keeps the sprite union happy.", time: "6h", reads: "5.1K", emoji: "🌾", gradient: ["#4d7c0f", "#bef264"] },
  { id: "a3", channel: "Enclave Herald", title: "Who guards the guardians? Inside Gate Watch", excerpt: "Kael Ironwood on drills, duty rotations, and why the gate hums when the moon pool glows.", time: "1d", reads: "6.9K", emoji: "🛡️", gradient: ["#92400e", "#fbbf24"] },
  { id: "a4", channel: "Tea House Journal", title: "Grandma Tao's cloud tea, decoded", excerpt: "Five pours, three silences, one secret ingredient the Tea House will neither confirm nor deny.", time: "2d", reads: "11.2K", emoji: "🍵", gradient: ["#065f46", "#34d399"] },
];

export const officialAccounts = [
  { id: "o1", name: "Enclave Herald", emoji: "📰", gradient: ["#7c5bd9", "#9b7deb"] as Gradient, desc: "Official world news, patch notes and events", badge: "Official" },
  { id: "o2", name: "Enclave Concierge", emoji: "🛎️", gradient: ["#0f766e", "#2dd4bf"] as Gradient, desc: "Service account · backups, bills, world status", badge: "Service" },
  { id: "o3", name: "Farm Weekly", emoji: "🌾", gradient: ["#4d7c0f", "#bef264"] as Gradient, desc: "Farming guides and market prices", badge: "Official" },
  { id: "o4", name: "Tea House Journal", emoji: "🍵", gradient: ["#065f46", "#34d399"] as Gradient, desc: "Stories from the tea house, weekly", badge: "" },
];

export const games = [
  { id: "g1", name: "Yinjie Farm", desc: "Your farm · 4 plots ready", emoji: "🌾", gradient: ["#4d7c0f", "#bef264"] as Gradient, status: "Continue" },
  { id: "g2", name: "Midnight Runner", desc: "Season 3 · new map", emoji: "🌙", gradient: ["#312e81", "#7c5bd9"] as Gradient, status: "New" },
  { id: "g3", name: "Gate Defense", desc: "Co-op with Gate Watch", emoji: "🛡️", gradient: ["#92400e", "#fbbf24"] as Gradient, status: "Event" },
  { id: "g4", name: "Tea House Tycoon", desc: "Idle · offline earnings", emoji: "🫖", gradient: ["#065f46", "#34d399"] as Gradient, status: "" },
  { id: "g5", name: "Rune Puzzle", desc: "Daily puzzle streak 12", emoji: "🧩", gradient: ["#86198f", "#f0abfc"] as Gradient, status: "" },
  { id: "g6", name: "Stage Stars", desc: "Rhythm game · Aria pack", emoji: "🎤", gradient: ["#be123c", "#fb7185"] as Gradient, status: "Hot" },
];

export const miniPrograms = [
  { id: "mp1", name: "World Atlas", emoji: "🗺️", gradient: ["#7c5bd9", "#9b7deb"] as Gradient },
  { id: "mp2", name: "Spark Pay", emoji: "💳", gradient: ["#0f766e", "#2dd4bf"] as Gradient },
  { id: "mp3", name: "Stall Manager", emoji: "🏪", gradient: ["#b45309", "#fbbf24"] as Gradient },
  { id: "mp4", name: "Dream Radio", emoji: "📻", gradient: ["#86198f", "#f0abfc"] as Gradient },
  { id: "mp5", name: "Star Mail", emoji: "📬", gradient: ["#be123c", "#fb7185"] as Gradient },
  { id: "mp6", name: "Pet Enclave", emoji: "🐾", gradient: ["#4d7c0f", "#bef264"] as Gradient },
  { id: "mp7", name: "Weather Rune", emoji: "🌦️", gradient: ["#0369a1", "#7dd3fc"] as Gradient },
  { id: "mp8", name: "Portal Pass", emoji: "🎫", gradient: ["#1e293b", "#64748b"] as Gradient },
];

export const friendRequests = [
  { id: "fr1", key: "mirabel", name: "Mirabel Quinn", role: "Lantern Keeper", note: "Met at the Midnight Arc preview — loved your stall setup!", time: "2h", emoji: "🏮", gradient: ["#be123c", "#fb7185"] as Gradient },
  { id: "fr2", key: "oskar", name: "Oskar Brandt", role: "Cartographer", note: "Mapping the new district, would love your gate notes.", time: "1d", emoji: "🗺️", gradient: ["#0f766e", "#2dd4bf"] as Gradient },
  { id: "fr3", key: "pip", name: "Pip", role: "Farm Sprite (independent)", note: "rune said you have snacks", time: "3d", emoji: "🧚", gradient: ["#4d7c0f", "#bef264"] as Gradient },
];

export const worldCharactersOnline = {
  total: characters.length,
  online: characters.filter((c) => c.online).length,
};

export const wallet = {
  sparks: 12860,
  gems: 342,
  income: 2380,
  spend: 1640,
  transactions: [
    { id: "t1", name: "Stall rent · Tea House corner", amount: -320, time: "Today 09:12", emoji: "🏪" },
    { id: "t2", name: "Starfruit sold · gold grade ×12", amount: +960, time: "Today 07:40", emoji: "🌾" },
    { id: "t3", name: "Concert ticket · Midnight Arc", amount: -180, time: "Yesterday", emoji: "🎤" },
    { id: "t4", name: "Tip received · Seraphina Vale", amount: +200, time: "Yesterday", emoji: "💜" },
    { id: "t5", name: "Spark pack · traveler bundle", amount: -648, time: "Mon", emoji: "✨" },
  ],
};

export const shopItems = [
  { id: "s1", name: "Moonlight Lantern", desc: "Lights your stall until dawn", price: 120, emoji: "🏮", gradient: ["#be123c", "#fb7185"] as Gradient },
  { id: "s2", name: "Cloud Tea Set", desc: "Grandma Tao approved", price: 260, emoji: "🍵", gradient: ["#065f46", "#34d399"] as Gradient },
  { id: "s3", name: "Gate Watch Cloak", desc: "+5 presence at the gate", price: 480, emoji: "🧥", gradient: ["#1e293b", "#64748b"] as Gradient },
  { id: "s4", name: "Dream Parcel (sealed)", desc: "Do not open before midnight", price: 66, emoji: "🔮", gradient: ["#86198f", "#f0abfc"] as Gradient },
  { id: "s5", name: "Starfruit Basket", desc: "Gold grade · farm fresh", price: 90, emoji: "🌾", gradient: ["#4d7c0f", "#bef264"] as Gradient },
  { id: "s6", name: "Stage Pass", desc: "Front row · Midnight Arc", price: 180, emoji: "🎫", gradient: ["#312e81", "#7c5bd9"] as Gradient },
];

export const favorites = [
  { id: "fv1", kind: "Moment", title: "Seraphina · The moon pool coordinates", emoji: "🌙", time: "Saved 2d ago" },
  { id: "fv2", kind: "Article", title: "Gold-grade starfruit: the rune-approved method", emoji: "🌾", time: "Saved 5d ago" },
  { id: "fv3", kind: "Scene", title: "Café · window seat at dusk", emoji: "☕", time: "Saved 1w ago" },
  { id: "fv4", kind: "Post", title: "Tide calling at the glass shore — full guide", emoji: "🌊", time: "Saved 1w ago" },
];

export const notes = [
  { id: "n1", title: "Midnight Arc — door log", excerpt: "Night 3: the door at the pool showed 7 stars. Kael says don't knock twice…", time: "Edited 23:12", emoji: "🌙", pinned: true },
  { id: "n2", title: "Farm rotation plan", excerpt: "North plot → starfruit, east → cloud rice, keep one row of moonflowers for Luna.", time: "Edited Yesterday", emoji: "🌾", pinned: false },
  { id: "n3", title: "Gift ideas (Tea House)", excerpt: "Cloud tea set for the concierge, dream parcel for NOBODY.", time: "Edited Mon", emoji: "🎁", pinned: false },
];

export const scenes = [
  { id: "sc1", name: "Café at Dusk", who: "tao", people: 12, emoji: "☕", gradient: ["#7c5bd9", "#f0abfc"] as Gradient },
  { id: "sc2", name: "Moon Pool", who: "seraphina", people: 5, emoji: "🌙", gradient: ["#312e81", "#7c5bd9"] as Gradient },
  { id: "sc3", name: "Glass Shore", who: "luna", people: 8, emoji: "🌊", gradient: ["#0f766e", "#2dd4bf"] as Gradient },
  { id: "sc4", name: "Midnight Stage", who: "aria", people: 24, emoji: "🎤", gradient: ["#be123c", "#fb7185"] as Gradient },
  { id: "sc5", name: "Gate Plaza", who: "kael", people: 16, emoji: "🛡️", gradient: ["#92400e", "#fbbf24"] as Gradient },
];

export const chatThread = [
  { id: 1, from: "seraphina", text: "Owner. The pool is doing the thing again.", time: "23:32" },
  { id: 2, from: "owner", text: "The glow, or the door thing?", time: "23:33" },
  { id: 3, from: "seraphina", text: "Both. Definitely both.", time: "23:33" },
  { id: 4, from: "seraphina", text: "The reflections showed a door that isn't in the atlas yet. I wrote the coordinates down before it faded.", time: "23:34" },
  { id: 5, from: "owner", text: "You wrote down coordinates for a door that doesn't exist?", time: "23:36" },
  { id: 6, from: "seraphina", text: "I wrote them down BEFORE deciding if it exists. Order of operations. 🔮", time: "23:37" },
  { id: 7, from: "owner", text: "Fine. I'm coming to the pool. Don't knock on anything.", time: "23:40" },
  { id: 8, from: "seraphina", text: "No promises. Bring tea — Grandma Tao's batch. It steadies the reflections.", time: "23:41" },
];

export const encounterCards = [
  { id: "e1", key: "mirabel", name: "Mirabel Quinn", role: "Lantern Keeper · 2.1 km", emoji: "🏮", gradient: ["#be123c", "#fb7185"] as Gradient, bio: "Collecting lantern stories for the Midnight Arc. Ask me about the parade route." },
  { id: "e2", key: "oskar", name: "Oskar Brandt", role: "Cartographer · 900 m", emoji: "🗺️", gradient: ["#0f766e", "#2dd4bf"] as Gradient, bio: "Redrawing the atlas every cycle. Currently lost on purpose." },
  { id: "e3", key: "pip", name: "Pip", role: "Independent Sprite · 400 m", emoji: "🧚", gradient: ["#4d7c0f", "#bef264"] as Gradient, bio: "Not union. Just enthusiastic. Will trade maps for snacks." },
];

export const cyberAvatars = [
  { id: "ca1", name: "Neon Seraph", style: "Cyber portrait · violet halo", emoji: "😇", gradient: ["#7c5bd9", "#f0abfc"] as Gradient, status: "Owned" },
  { id: "ca2", name: "Chrome Ronin", style: "Cyber portrait · steel edge", emoji: "🤖", gradient: ["#334155", "#94a3b8"] as Gradient, status: "Mint 120 ✦" },
  { id: "ca3", name: "Static Bloom", style: "Cyber portrait · glitch petals", emoji: "🌸", gradient: ["#be123c", "#fb7185"] as Gradient, status: "New drop" },
];
