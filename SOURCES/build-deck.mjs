import pptxgen from "pptxgenjs";

/* ------------------------------------------------------------------ *
 *  KAYA x Stellar — Pitch Deck generator
 *  Modern dark theme, built with pptxgenjs
 * ------------------------------------------------------------------ */

const pptx = new pptxgen();
pptx.defineLayout({ name: "KAYA", width: 13.333, height: 7.5 });
pptx.layout = "KAYA";
pptx.author = "KAYA Team";
pptx.company = "KAYA";
pptx.title = "KAYA x Stellar — Hackathon Pitch";

/* ---------------------------- palette ----------------------------- */
const C = {
  bg:      "0A0A12",
  bg2:     "0E0E1A",
  card:    "15151F",
  card2:   "1B1B27",
  border:  "2B2B3C",
  text:    "F6F6F9",
  muted:   "9AA0AE",
  faint:   "6B7280",
  violet:  "8B5CF6",
  indigo:  "6366F1",
  cyan:    "22D3EE",
  emerald: "34D399",
  gold:    "FBBF24",
  rose:    "FB7185",
  white:   "FFFFFF",
};

const FONT = "Segoe UI";
const FONT_L = "Segoe UI Light";
const FONT_SB = "Segoe UI Semibold";

const W = 13.333;
const H = 7.5;
const M = 0.6;

/* --------------------------- helpers ------------------------------ */
let pageNo = 0;

function glow(slide, x, y, d, color, transparency = 88) {
  // stacked translucent ovals to fake a soft gradient blob
  for (let i = 0; i < 3; i++) {
    const grow = i * d * 0.22;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x - grow / 2,
      y: y - grow / 2,
      w: d + grow,
      h: d + grow,
      fill: { color, transparency: Math.min(96, transparency + i * 3) },
      line: { type: "none" },
    });
  }
}

function baseSlide({ dark = true } = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: dark ? C.bg : C.bg2 };
  // ambient glows
  glow(slide, -1.4, -1.6, 4.2, C.violet, 90);
  glow(slide, W - 2.6, H - 2.4, 4.0, C.indigo, 91);
  return slide;
}

function footer(slide, { showNo = true } = {}) {
  pageNo += 1;
  slide.addShape(pptx.ShapeType.line, {
    x: M, y: H - 0.55, w: W - 2 * M, h: 0,
    line: { color: C.border, width: 0.75 },
  });
  slide.addText(
    [
      { text: "KAYA", options: { color: C.violet, bold: true } },
      { text: "  ·  Kaya mo 'to.", options: { color: C.faint } },
    ],
    { x: M, y: H - 0.5, w: 6, h: 0.3, fontFace: FONT, fontSize: 9, align: "left", valign: "middle" }
  );
  slide.addText("APEC x Stellar Hackathon 2026", {
    x: W - 5.6, y: H - 0.5, w: 4.2, h: 0.3, fontFace: FONT, fontSize: 9,
    color: C.faint, align: "right", valign: "middle",
  });
  if (showNo) {
    slide.addText(String(pageNo).padStart(2, "0"), {
      x: W - 1.0, y: H - 0.5, w: 0.5, h: 0.3, fontFace: FONT, fontSize: 9,
      color: C.muted, align: "right", valign: "middle",
    });
  }
}

function kicker(slide, text, color = C.violet, x = M, y = 0.55, w = 8) {
  slide.addShape(pptx.ShapeType.rect, { x, y: y + 0.04, w: 0.28, h: 0.12, fill: { color }, line: { type: "none" } });
  slide.addText(text.toUpperCase(), {
    x: x + 0.38, y: y - 0.07, w, h: 0.35, fontFace: FONT_SB, fontSize: 11.5, bold: true,
    color, charSpacing: 3, align: "left", valign: "middle",
  });
}

function title(slide, text, { x = M, y = 0.92, w = W - 2 * M, size = 30, color = C.text } = {}) {
  slide.addText(text, {
    x, y, w, h: 0.9, fontFace: FONT_SB, fontSize: size, bold: true,
    color, align: "left", valign: "middle", lineSpacingMultiple: 0.95,
  });
}

function pill(slide, text, color, x, y, w = 2.4, h = 0.38) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: h / 2,
    fill: { color, transparency: 82 },
    line: { color, width: 1, transparency: 35 },
  });
  slide.addText(text.toUpperCase(), {
    x, y, w, h, fontFace: FONT_SB, fontSize: 9.5, bold: true, color,
    align: "center", valign: "middle", charSpacing: 2,
  });
}

function card(slide, { x, y, w, h, fill = C.card, accent = null }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: fill },
    line: { color: C.border, width: 1 },
    shadow: { type: "outer", color: "000000", blur: 10, offset: 3, angle: 90, opacity: 0.35 },
  });
  if (accent) {
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 0.09, h, rectRadius: 0.04,
      fill: { color: accent }, line: { type: "none" },
    });
  }
}

function chevron(slide, x, y, color = C.faint) {
  slide.addShape(pptx.ShapeType.chevron, {
    x, y, w: 0.32, h: 0.32, fill: { color, transparency: 30 }, line: { type: "none" },
  });
}

/* ============================ SLIDE 1 — COVER ============================ */
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  glow(s, -1.8, -1.8, 5.6, C.violet, 86);
  glow(s, W - 3.2, -2.0, 5.0, C.indigo, 88);
  glow(s, W - 4.0, H - 3.2, 5.4, C.cyan, 92);

  // logo mark
  s.addShape(pptx.ShapeType.roundRect, {
    x: M, y: 0.85, w: 0.95, h: 0.95, rectRadius: 0.22,
    fill: { color: C.violet }, line: { type: "none" },
    shadow: { type: "outer", color: C.violet, blur: 18, offset: 0, angle: 90, opacity: 0.55 },
  });
  s.addText("K", { x: M, y: 0.85, w: 0.95, h: 0.95, fontFace: FONT_SB, fontSize: 40, bold: true, color: C.white, align: "center", valign: "middle" });
  s.addText("KAYA", { x: M + 1.15, y: 0.9, w: 6, h: 0.9, fontFace: FONT_SB, fontSize: 34, bold: true, color: C.text, align: "left", valign: "middle", charSpacing: 2 });

  // big wordmark with gradient-feel
  s.addText(
    [
      { text: "Kaya", options: { color: C.violet } },
      { text: " mo ", options: { color: C.cyan } },
      { text: "'to.", options: { color: C.emerald } },
    ],
    { x: M, y: 2.35, w: W - 2 * M, h: 1.7, fontFace: FONT_SB, fontSize: 78, bold: true, align: "left", valign: "middle" }
  );

  s.addText(
    "An AI budgeting copilot that turns impulse spending into on-chain savings, gasless payments, and real financial credibility — built on Stellar.",
    { x: M, y: 4.15, w: 9.4, h: 1.0, fontFace: FONT_L, fontSize: 17, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.1 }
  );

  // track pills
  const tracks = [
    ["Practical Payments", C.violet],
    ["Meaningful DeFi", C.emerald],
    ["Localized Tools", C.cyan],
    ["Composability", C.gold],
  ];
  let tx = M;
  tracks.forEach(([t, c]) => { pill(s, t, c, tx, 5.35, 2.45); tx += 2.65; });

  s.addShape(pptx.ShapeType.line, { x: M, y: 6.25, w: W - 2 * M, h: 0, line: { color: C.border, width: 0.75 } });
  s.addText("APEC x Stellar Hackathon (SEA)  ·  May–Jul 2026", { x: M, y: 6.4, w: 7, h: 0.4, fontFace: FONT, fontSize: 12, color: C.faint, align: "left", valign: "middle" });
  s.addText("Team: [your team name]", { x: W - 5.6, y: 6.4, w: 5, h: 0.4, fontFace: FONT, fontSize: 12, color: C.faint, align: "right", valign: "middle" });
}

/* ============================ SLIDE 2 — PROBLEM ============================ */
{
  const s = baseSlide();
  kicker(s, "The Problem · why it's local", C.rose);
  title(s, "Young Filipinos can spend in one tap — but can't save, can't buffer, can't borrow.");

  const probs = [
    ["Impulse by default", "E-wallets make spending frictionless and saving an afterthought. A ₱250 coffee, weekly, is the gap between a buffer and none.", C.rose],
    ["No safety net", "A large share of young Filipinos hold near-zero liquid savings. One emergency = high-interest debt.", C.gold],
    ["Thin credit files", "Banks have almost no data on a 22-year-old's discipline. Good behavior is invisible and unrewarded.", C.cyan],
    ["Passive savings", "Even money that is saved just sits in a wallet earning nothing.", C.violet],
  ];
  const cw = (W - 2 * M - 3 * 0.4) / 4;
  probs.forEach(([t, d, c], i) => {
    const x = M + i * (cw + 0.4);
    card(s, { x, y: 2.5, w: cw, h: 3.1, accent: c });
    s.addText(t, { x: x + 0.3, y: 2.8, w: cw - 0.5, h: 0.6, fontFace: FONT_SB, fontSize: 16, bold: true, color: C.text, align: "left", valign: "top" });
    s.addText(d, { x: x + 0.3, y: 3.5, w: cw - 0.5, h: 1.9, fontFace: FONT, fontSize: 12, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.12 });
  });

  s.addText(
    [
      { text: "The gap:  ", options: { bold: true, color: C.text } },
      { text: "no tool closes the loop between behavior, productive assets, payments, and credibility. KAYA does — and Stellar is the rail that makes it possible.", options: { color: C.muted } },
    ],
    { x: M, y: 5.95, w: W - 2 * M, h: 0.6, fontFace: FONT, fontSize: 13.5, align: "left", valign: "middle", lineSpacingMultiple: 1.1 }
  );
  footer(s);
}

/* ============================ SLIDE 3 — USERS ============================ */
{
  const s = baseSlide();
  kicker(s, "Who it's for", C.cyan);
  title(s, "Built for the segment fintech forgets.");

  const people = [
    ["Iskolar", "The Student · 18–24", "Allowance-based, tempted by food delivery & online sales, zero savings.", "Turns saved ₱250 coffees into a growing, yield-earning balance.", C.violet],
    ["Yuppie", "Young Professional · 23–30", "First real income, lifestyle creep, wants to save but lacks discipline.", "Automated cooling-off savings, gasless payments, and a credit reputation.", C.cyan],
    ["Negosyante", "Micro-Merchant (peer)", "Accepts QRPh, wants instant settlement.", "Receives the asset they want via Stellar path payments, instantly.", C.emerald],
  ];
  const cw = (W - 2 * M - 2 * 0.45) / 3;
  people.forEach(([name, role, sit, give, c], i) => {
    const x = M + i * (cw + 0.45);
    card(s, { x, y: 2.45, w: cw, h: 3.6 });
    s.addShape(pptx.ShapeType.roundRect, { x: x + 0.35, y: 2.8, w: 0.85, h: 0.85, rectRadius: 0.2, fill: { color: c, transparency: 78 }, line: { color: c, width: 1, transparency: 30 } });
    s.addText(name[0], { x: x + 0.35, y: 2.8, w: 0.85, h: 0.85, fontFace: FONT_SB, fontSize: 28, bold: true, color: c, align: "center", valign: "middle" });
    s.addText(name, { x: x + 0.35, y: 3.8, w: cw - 0.7, h: 0.4, fontFace: FONT_SB, fontSize: 18, bold: true, color: C.text, align: "left", valign: "middle" });
    s.addText(role.toUpperCase(), { x: x + 0.35, y: 4.2, w: cw - 0.7, h: 0.3, fontFace: FONT, fontSize: 9.5, color: c, charSpacing: 1.5, align: "left", valign: "middle" });
    s.addText(sit, { x: x + 0.35, y: 4.55, w: cw - 0.7, h: 0.8, fontFace: FONT, fontSize: 11.5, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.1 });
    s.addText(
      [{ text: "KAYA → ", options: { bold: true, color: c } }, { text: give, options: { color: C.text } }],
      { x: x + 0.35, y: 5.35, w: cw - 0.7, h: 0.6, fontFace: FONT, fontSize: 11.5, align: "left", valign: "top", lineSpacingMultiple: 1.1 }
    );
  });
  s.addText("Primary market: Philippines · designed to extend across SEA by swapping in local anchors + stablecoins.", { x: M, y: 6.25, w: W - 2 * M, h: 0.3, fontFace: FONT, fontSize: 11.5, color: C.faint, align: "left", valign: "middle" });
  footer(s);
}

/* ============================ SLIDE 4 — MONEY LOOP ============================ */
{
  const s = baseSlide();
  kicker(s, "The Solution", C.violet);
  title(s, "One continuous behavioral-financial loop.");
  s.addText("Every stage is powered by an existing Stellar building block — composability first.", { x: M, y: 1.75, w: W - 2 * M, h: 0.4, fontFace: FONT, fontSize: 13, color: C.muted, align: "left", valign: "middle" });

  const steps = [
    ["1", "Fund In", "Fiat → local stablecoin via Stellar anchor", C.cyan],
    ["2", "AI Coach", "\u201CKaya mo ba 'to?\u201D on every purchase", C.violet],
    ["3", "Save / Pay", "Vault it (lockup) or QR-pay it, gaslessly", C.emerald],
    ["4", "Reputation", "Discipline recorded on-chain", C.gold],
    ["5", "Credit", "Future: under-collateralized loans", C.rose],
  ];
  const n = steps.length;
  const gap = 0.42;
  const cw = (W - 2 * M - (n - 1) * gap) / n;
  const cy = 2.75, ch = 2.7;
  steps.forEach(([num, t, d, c], i) => {
    const x = M + i * (cw + gap);
    card(s, { x, y: cy, w: cw, h: ch });
    s.addShape(pptx.ShapeType.roundRect, { x: x + (cw - 0.7) / 2, y: cy + 0.35, w: 0.7, h: 0.7, rectRadius: 0.18, fill: { color: c, transparency: 80 }, line: { color: c, width: 1, transparency: 30 } });
    s.addText(num, { x: x + (cw - 0.7) / 2, y: cy + 0.35, w: 0.7, h: 0.7, fontFace: FONT_SB, fontSize: 22, bold: true, color: c, align: "center", valign: "middle" });
    s.addText(t, { x: x + 0.1, y: cy + 1.2, w: cw - 0.2, h: 0.4, fontFace: FONT_SB, fontSize: 15, bold: true, color: C.text, align: "center", valign: "middle" });
    s.addText(d, { x: x + 0.15, y: cy + 1.62, w: cw - 0.3, h: 0.95, fontFace: FONT, fontSize: 10.5, color: C.muted, align: "center", valign: "top", lineSpacingMultiple: 1.08 });
    if (i < n - 1) chevron(s, x + cw + (gap - 0.32) / 2, cy + ch / 2 - 0.16, c);
  });

  s.addText(
    [
      { text: "Fund in → AI coaches → ", options: { color: C.muted } },
      { text: "Save it (vault) ", options: { color: C.emerald, bold: true } },
      { text: "or ", options: { color: C.muted } },
      { text: "Pay it (QR)", options: { color: C.violet, bold: true } },
      { text: " → build reputation → unlock credit.", options: { color: C.muted } },
    ],
    { x: M, y: 5.75, w: W - 2 * M, h: 0.5, fontFace: FONT, fontSize: 13.5, align: "center", valign: "middle" }
  );
  footer(s);
}

/* ============================ FEATURE SLIDES 5–8 ============================ */
const features = [
  {
    n: 1, track: "Meaningful DeFi", color: C.emerald,
    name: "The \u201CDelayed Gratification\u201D Vault",
    sub: "\u201CSave it Instead\u201D — DeFi mechanics used to break the impulse cycle, not just farm yield.",
    story: "Maya wants a ₱250 latte. KAYA flags it: she's over her \u201Cwants\u201D budget. Instead of guilt, it offers a \u201CSave it Instead\u201D button. One tap moves ₱250 into her vault — earning micro-yield, locked for 48 hours so the craving passes.",
    how: [
      "Soroban smart contract (\u201CKAYA Vault\u201D) accepts local-stablecoin deposits",
      "Idle funds routed into an existing Stellar yield aggregator / liquidity pool",
      "The twist: a 48-hour cooling-off lockup enforced per deposit",
    ],
    win: "DeFi with a genuine human purpose, tied to a real asset and a real local problem — not yield for yield's sake.",
    compose: "Soroban contract + third-party yield pool + anchor-issued stablecoin, stitched into one feature.",
  },
  {
    n: 2, track: "On / Off-Ramps", color: C.cyan,
    name: "Native KAYA Wallet Funding & Cash-Out",
    sub: "Move pesos in and out using rails people already trust.",
    story: "Carlo links GCash, taps \u201CAdd ₱1,000,\u201D confirms in the familiar flow, and seconds later sees ₱1,000 spendable in KAYA. \u201CCash Out\u201D returns pesos to his bank or e-wallet.",
    how: [
      "SEP-24 (hosted) + SEP-6 (programmatic) against existing SEA anchors",
      "Deposit via GCash, Maya, bank → anchor issues local stablecoin to the wallet",
      "SEP-10 wallet auth + SEP-12 KYC handoff (KAYA never custodies IDs)",
    ],
    win: "The clearest proof of \u201Cbuild on existing rails, not your own gateway.\u201D We explicitly consume anchor infrastructure.",
    compose: "Zero payment-gateway code — KAYA is a thin, friendly client over standardized anchor SEPs.",
  },
  {
    n: 3, track: "Practical Payments", color: C.violet,
    name: "\u201CKaya Afford It? Pay It!\u201D QR Payments",
    sub: "AI green-lights the buy → scan → paid in pesos, gaslessly.",
    story: "The AI approves Maya's groceries — \u201CKaya mo 'to!\u201D A \u201CPay Now\u201D button appears. She scans the store's QRPh code and the exact amount is paid. She never thinks about crypto, gas, or conversion.",
    how: [
      "QR scanner compatible with QRPh / regional EMVCo standards",
      "Stellar path payment converts her stablecoin to the merchant's asset atomically",
      "Fee-bump (sponsored fees): KAYA's backend pays the XLM fee → fully gasless",
    ],
    win: "A real purchase, at a real merchant, on a real local QR standard — UX indistinguishable from GCash.",
    compose: "Uses Stellar's native DEX/AMM for conversion + built-in fee-bump for gasless UX. No custom relayer.",
  },
  {
    n: 4, track: "Identity & Credibility", color: C.gold,
    name: "On-Chain Financial Health Score",
    sub: "Turn proven discipline into real borrowing power.",
    story: "After months of hitting goals and respecting cooling-off periods, Carlo has a verifiable KAYA Score. When a Stellar micro-lender later offers a low-collateral loan, it's because it could read his track record on-chain.",
    how: [
      "Good habits recorded as on-chain attestations / Soroban reputation registry",
      "The score is a portable, user-controlled Web3 primitive",
      "Other Stellar micro-lenders read it to grant under-collateralized loans",
    ],
    win: "Extends a simple \u201Chealth score\u201D into durable, ecosystem-wide utility — exactly what composability unlocks.",
    compose: "Designed to be consumed by others — KAYA becomes a building block in the wider Stellar credit stack.",
  },
];

for (const f of features) {
  const s = baseSlide();
  kicker(s, `Feature ${f.n} / 4`, f.color);
  pill(s, f.track, f.color, W - M - 3.0, 0.5, 3.0, 0.42);
  title(s, f.name, { size: 27, w: 9.5 });
  s.addText(f.sub, { x: M, y: 1.62, w: 9.6, h: 0.5, fontFace: FONT_L, fontSize: 14, color: C.muted, align: "left", valign: "middle", lineSpacingMultiple: 1.05 });

  // Left: user story
  const lx = M, lw = 5.0, ly = 2.4, lh = 3.55;
  card(s, { x: lx, y: ly, w: lw, h: lh, fill: C.card2, accent: f.color });
  s.addText("USER STORY", { x: lx + 0.35, y: ly + 0.28, w: lw - 0.6, h: 0.3, fontFace: FONT_SB, fontSize: 10.5, bold: true, color: f.color, charSpacing: 2 });
  s.addText(f.story, { x: lx + 0.35, y: ly + 0.7, w: lw - 0.7, h: lh - 1.0, fontFace: FONT, fontSize: 14.5, color: C.text, align: "left", valign: "top", lineSpacingMultiple: 1.22 });

  // Right: how it works
  const rx = lx + lw + 0.4, rw = W - M - rx, ry = 2.4;
  card(s, { x: rx, y: ry, w: rw, h: 2.35 });
  s.addText("HOW IT WORKS ON STELLAR", { x: rx + 0.35, y: ry + 0.25, w: rw - 0.6, h: 0.3, fontFace: FONT_SB, fontSize: 10.5, bold: true, color: C.cyan, charSpacing: 2 });
  s.addText(
    f.how.map((h) => ({ text: h, options: { bullet: { code: "2022", indent: 14 }, color: C.muted, paraSpaceAfter: 8, breakLine: true } })),
    { x: rx + 0.35, y: ry + 0.62, w: rw - 0.7, h: 1.6, fontFace: FONT, fontSize: 12.5, align: "left", valign: "top", lineSpacingMultiple: 1.05 }
  );

  // Right-lower: why it judges well
  const wy = ry + 2.55;
  card(s, { x: rx, y: wy, w: rw, h: 1.0, fill: f.color, accent: null });
  // overlay translucent dark to keep text readable while tinting
  s.addShape(pptx.ShapeType.roundRect, { x: rx, y: wy, w: rw, h: 1.0, rectRadius: 0.1, fill: { color: "000000", transparency: 78 }, line: { color: f.color, width: 1, transparency: 30 } });
  s.addText(
    [
      { text: "WHY IT JUDGES WELL   ", options: { bold: true, color: f.color, fontSize: 10.5, charSpacing: 2 } },
      { text: f.win, options: { color: C.text, fontSize: 12.5 } },
    ],
    { x: rx + 0.35, y: wy + 0.14, w: rw - 0.7, h: 0.75, fontFace: FONT, align: "left", valign: "middle", lineSpacingMultiple: 1.05 }
  );

  // bottom composability strip
  s.addText(
    [
      { text: "Composability:  ", options: { bold: true, color: C.gold } },
      { text: f.compose, options: { color: C.muted } },
    ],
    { x: M, y: 6.15, w: W - 2 * M, h: 0.4, fontFace: FONT, fontSize: 11.5, align: "left", valign: "middle" }
  );
  footer(s);
}

/* ============================ SLIDE 9 — ARCHITECTURE ============================ */
{
  const s = baseSlide();
  kicker(s, "Architecture", C.cyan);
  title(s, "Thin, opinionated client over existing Stellar rails.");

  const band = (label, y, color) => {
    s.addText(label, { x: M, y, w: 2.1, h: 1.0, fontFace: FONT_SB, fontSize: 11, bold: true, color, align: "left", valign: "middle", charSpacing: 1.5 });
  };
  const node = (x, y, w, h, t, sub, color) => {
    card(s, { x, y, w, h, fill: C.card });
    s.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.07, rectRadius: 0.03, fill: { color }, line: { type: "none" } });
    s.addText(t, { x: x + 0.18, y: y + 0.12, w: w - 0.3, h: 0.45, fontFace: FONT_SB, fontSize: 12.5, bold: true, color: C.text, align: "left", valign: "middle" });
    if (sub) s.addText(sub, { x: x + 0.18, y: y + 0.55, w: w - 0.3, h: 0.4, fontFace: FONT, fontSize: 9.5, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.0 });
  };

  const colX = 2.55;
  const colW = W - M - colX;
  // Band 1 — client
  band("CLIENT", 2.25, C.violet);
  const c1w = (colW - 2 * 0.3) / 3;
  node(colX, 2.2, c1w, 0.95, "KAYA Mobile App", "React Native / Flutter", C.violet);
  node(colX + c1w + 0.3, 2.2, c1w, 0.95, "AI Budgeting Engine", "\u201CKaya afford it?\u201D coach", C.violet);
  node(colX + 2 * (c1w + 0.3), 2.2, c1w, 0.95, "Stellar Wallet", "Freighter / Passkey", C.violet);

  // Band 2 — backend
  band("BACKEND", 3.55, C.gold);
  node(colX, 3.5, colW, 0.85, "KAYA Backend + Fee-Bump Service", "Orchestrates AI · Stellar SDK · sponsors network fees (gasless UX)", C.gold);

  // Band 3 — stellar
  band("STELLAR", 4.95, C.cyan);
  node(colX, 4.9, c1w, 1.5, "Local Anchor", "SEP-24 / SEP-6\nGCash · Maya · Bank", C.cyan);
  // RPC + 3 contracts column
  const rx = colX + c1w + 0.3;
  const rw = colW - c1w - 0.3;
  node(rx, 4.9, rw, 0.62, "Horizon / Soroban RPC", null, C.emerald);
  const sw = (rw - 2 * 0.3) / 3;
  node(rx, 5.65, sw, 0.75, "Soroban Vault", "48h lockup + yield", C.emerald);
  node(rx + sw + 0.3, 5.65, sw, 0.75, "Path Payment", "→ QR merchant", C.violet);
  node(rx + 2 * (sw + 0.3), 5.65, sw, 0.75, "Reputation Registry", "on-chain score", C.gold);

  footer(s);
}

/* ============================ SLIDE 10 — COMPOSABILITY ============================ */
{
  const s = baseSlide();
  kicker(s, "Composability", C.gold);
  title(s, "We build the thin layer. We reuse the heavy lifting.");

  // build column
  const colW = (W - 2 * M - 0.5) / 2;
  card(s, { x: M, y: 2.35, w: colW, h: 2.5, fill: C.card2, accent: C.violet });
  s.addText("WE BUILD", { x: M + 0.35, y: 2.6, w: colW - 0.6, h: 0.35, fontFace: FONT_SB, fontSize: 12, bold: true, color: C.violet, charSpacing: 2 });
  s.addText(
    [
      "AI coaching layer (the \u201CKaya afford it?\u201D moment)",
      "Cooling-off vault contract logic (48h lockup)",
      "Reputation registry schema",
      "Consumer UX that feels like a normal peso wallet",
    ].map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, color: C.text, paraSpaceAfter: 9, breakLine: true } })),
    { x: M + 0.35, y: 3.05, w: colW - 0.7, h: 1.7, fontFace: FONT, fontSize: 12.5, align: "left", valign: "top" }
  );

  const x2 = M + colW + 0.5;
  card(s, { x: x2, y: 2.35, w: colW, h: 2.5, fill: C.card2, accent: C.emerald });
  s.addText("WE REUSE", { x: x2 + 0.35, y: 2.6, w: colW - 0.6, h: 0.35, fontFace: FONT_SB, fontSize: 12, bold: true, color: C.emerald, charSpacing: 2 });
  s.addText(
    [
      "On/off-ramps → existing SEA Stellar anchors (SEP-24/6)",
      "DeFi & liquidity → yield pools + Stellar native DEX/AMM",
      "Payments → path payments + fee-bump",
      "Wallets & identity → Freighter/passkey + attestations",
    ].map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, color: C.text, paraSpaceAfter: 9, breakLine: true } })),
    { x: x2 + 0.35, y: 3.05, w: colW - 0.7, h: 1.7, fontFace: FONT, fontSize: 12.5, align: "left", valign: "top" }
  );

  // integration pills row
  s.addText("RECOMMENDED INTEGRATIONS — ALL COVERED", { x: M, y: 5.1, w: W - 2 * M, h: 0.3, fontFace: FONT_SB, fontSize: 10.5, bold: true, color: C.faint, charSpacing: 2 });
  const ints = [
    ["On/Off-Ramps", C.cyan],
    ["DeFi & Liquidity", C.emerald],
    ["Payments & Disbursements", C.violet],
    ["Wallets & Identity", C.gold],
  ];
  let px = M;
  ints.forEach(([t, c]) => { pill(s, t, c, px, 5.5, 2.9, 0.45); px += 3.05; });

  s.addText("\u201CPlug into existing wallets, DeFi protocols, and on/off-ramps — don't reinvent the wheel.\u201D  KAYA does exactly that.", { x: M, y: 6.2, w: W - 2 * M, h: 0.35, fontFace: FONT, fontSize: 12, italic: true, color: C.muted, align: "left", valign: "middle" });
  footer(s);
}

/* ============================ SLIDE 11 — WHY IT WINS ============================ */
{
  const s = baseSlide();
  kicker(s, "Criteria coverage", C.emerald);
  title(s, "Every requirement in the brief — checked.");

  const items = [
    ["User-facing financial app for real people", "Mobile money coach for young Filipinos"],
    ["Practical payment app (everyday use)", "AI-approved QRPh pay, gasless via fee-bump"],
    ["Meaningful DeFi using real assets", "Soroban yield vault + 48h cooling-off lockup"],
    ["Localized tool / local economy", "GCash/Maya/bank ramps + PHP stablecoin"],
    ["Integrate with local anchors", "SEP-24/SEP-6 against SEA anchors"],
    ["Give assets utility (earn/swap/disburse)", "Vault yield · path-payment swap · QR pay & cash-out"],
    ["Composability — reuse building blocks", "Anchors, yield pools, DEX/AMM, fee-bump, wallets"],
    ["Wallets & identity", "Freighter/passkey + on-chain reputation score"],
  ];
  const colW = (W - 2 * M - 0.5) / 2;
  const rowH = 0.92;
  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (colW + 0.5);
    const y = 2.4 + row * (rowH + 0.18);
    card(s, { x, y, w: colW, h: rowH });
    // check badge
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.22, y: y + rowH / 2 - 0.22, w: 0.44, h: 0.44, fill: { color: C.emerald, transparency: 75 }, line: { color: C.emerald, width: 1, transparency: 20 } });
    s.addText("\u2713", { x: x + 0.22, y: y + rowH / 2 - 0.24, w: 0.44, h: 0.44, fontFace: FONT_SB, fontSize: 16, bold: true, color: C.emerald, align: "center", valign: "middle" });
    s.addText(it[0], { x: x + 0.82, y: y + 0.13, w: colW - 1.0, h: 0.36, fontFace: FONT_SB, fontSize: 12.5, bold: true, color: C.text, align: "left", valign: "middle" });
    s.addText(it[1], { x: x + 0.82, y: y + 0.46, w: colW - 1.0, h: 0.36, fontFace: FONT, fontSize: 10.5, color: C.muted, align: "left", valign: "middle" });
  });
  footer(s);
}

/* ============================ SLIDE 12 — ROADMAP ============================ */
{
  const s = baseSlide();
  kicker(s, "Roadmap", C.violet);
  title(s, "Aligned to the program timeline.");

  const phases = [
    ["Foundations", "May–early Jun", "Wallet + testnet account · issue local stablecoin · SEP-24 deposit demo", C.cyan],
    ["Core DeFi + Pay", "June", "Soroban vault w/ 48h lockup + yield · QR path-payment + fee-bump", C.emerald],
    ["AI + Reputation", "Early–mid Jul", "\u201CKaya afford it?\u201D coaching · Soroban reputation registry + score", C.violet],
    ["Polish + Pitch", "Late Jul", "End-to-end demo · judging submission", C.gold],
    ["Post-hackathon", "Aug–Sep", "Anchor partnerships · pilot users · micro-lending integration", C.rose],
  ];
  const n = phases.length;
  const gap = 0.4;
  const cw = (W - 2 * M - (n - 1) * gap) / n;
  const lineY = 2.85;
  s.addShape(pptx.ShapeType.line, { x: M + cw / 2, y: lineY, w: (W - 2 * M) - cw, h: 0, line: { color: C.border, width: 1.5 } });
  phases.forEach(([t, when, d, c], i) => {
    const x = M + i * (cw + gap);
    const cx = x + cw / 2;
    s.addShape(pptx.ShapeType.ellipse, { x: cx - 0.13, y: lineY - 0.13, w: 0.26, h: 0.26, fill: { color: c }, line: { color: C.bg, width: 2 } });
    s.addText(when.toUpperCase(), { x: x, y: lineY - 0.6, w: cw, h: 0.3, fontFace: FONT_SB, fontSize: 9.5, bold: true, color: c, align: "center", valign: "middle", charSpacing: 1 });
    card(s, { x, y: lineY + 0.4, w: cw, h: 2.6, accent: c });
    s.addText(t, { x: x + 0.2, y: lineY + 0.6, w: cw - 0.4, h: 0.6, fontFace: FONT_SB, fontSize: 14, bold: true, color: C.text, align: "left", valign: "top", lineSpacingMultiple: 0.95 });
    s.addText(d, { x: x + 0.2, y: lineY + 1.25, w: cw - 0.4, h: 1.6, fontFace: FONT, fontSize: 10.5, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.12 });
  });
  footer(s);
}

/* ============================ SLIDE 13 — IMPACT / KPIs / ASK ============================ */
{
  const s = baseSlide();
  kicker(s, "Impact · KPIs · The Ask", C.gold);
  title(s, "Discipline, made measurable — and fundable.");

  // KPI stat cards
  const kpis = [
    ["₱ redirected", "from impulse spend into the vault, per user / month", C.emerald],
    ["% kept", "cooling-off periods that end in keeping the savings", C.cyan],
    ["QR pays", "purchases settled via Stellar path payment", C.violet],
    ["Scores → loans", "KAYA Scores generated · loan offers unlocked", C.gold],
  ];
  const cw = (W - 2 * M - 3 * 0.4) / 4;
  kpis.forEach(([t, d, c], i) => {
    const x = M + i * (cw + 0.4);
    card(s, { x, y: 2.35, w: cw, h: 1.95, accent: c });
    s.addText(t, { x: x + 0.25, y: 2.6, w: cw - 0.45, h: 0.5, fontFace: FONT_SB, fontSize: 17, bold: true, color: c, align: "left", valign: "middle" });
    s.addText(d, { x: x + 0.25, y: 3.15, w: cw - 0.45, h: 1.0, fontFace: FONT, fontSize: 11, color: C.muted, align: "left", valign: "top", lineSpacingMultiple: 1.12 });
  });

  // the ask
  card(s, { x: M, y: 4.55, w: W - 2 * M, h: 1.55, fill: C.card2, accent: C.violet });
  s.addText("THE ASK", { x: M + 0.4, y: 4.78, w: 4, h: 0.3, fontFace: FONT_SB, fontSize: 11, bold: true, color: C.violet, charSpacing: 2 });
  s.addText(
    [
      { text: "Stellar mentorship", options: { bold: true, color: C.text } },
      { text: " (Soroban + anchors)  ·  ", options: { color: C.muted } },
      { text: "intros to SEA anchor & lending partners", options: { bold: true, color: C.text } },
      { text: " for composability  ·  ", options: { color: C.muted } },
      { text: "a shot at the prize pool", options: { bold: true, color: C.text } },
      { text: " to fund a pilot.", options: { color: C.muted } },
    ],
    { x: M + 0.4, y: 5.15, w: W - 2 * M - 0.8, h: 0.85, fontFace: FONT, fontSize: 15, align: "left", valign: "middle", lineSpacingMultiple: 1.15 }
  );
  footer(s);
}

/* ============================ SLIDE 14 — CLOSING ============================ */
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  glow(s, W / 2 - 2.5, 0.4, 5.5, C.violet, 86);
  glow(s, -1.5, H - 2.5, 4.5, C.cyan, 90);
  glow(s, W - 3.0, H - 3.0, 4.8, C.emerald, 90);

  s.addShape(pptx.ShapeType.roundRect, { x: W / 2 - 0.55, y: 1.5, w: 1.1, h: 1.1, rectRadius: 0.26, fill: { color: C.violet }, line: { type: "none" }, shadow: { type: "outer", color: C.violet, blur: 22, offset: 0, angle: 90, opacity: 0.6 } });
  s.addText("K", { x: W / 2 - 0.55, y: 1.5, w: 1.1, h: 1.1, fontFace: FONT_SB, fontSize: 48, bold: true, color: C.white, align: "center", valign: "middle" });

  s.addText(
    [
      { text: "Kaya", options: { color: C.violet } },
      { text: " mo ", options: { color: C.cyan } },
      { text: "'to.", options: { color: C.emerald } },
    ],
    { x: 0, y: 2.9, w: W, h: 1.4, fontFace: FONT_SB, fontSize: 72, bold: true, align: "center", valign: "middle" }
  );
  s.addText("Smarter spending. Real savings. On-chain credibility. For every young Filipino.", { x: 0, y: 4.35, w: W, h: 0.6, fontFace: FONT_L, fontSize: 17, color: C.muted, align: "center", valign: "middle" });

  const tracks = [["Practical Payments", C.violet], ["Meaningful DeFi", C.emerald], ["Localized Tools", C.cyan], ["Composability", C.gold]];
  const total = tracks.length * 2.45 + (tracks.length - 1) * 0.2;
  let tx = (W - total) / 2;
  tracks.forEach(([t, c]) => { pill(s, t, c, tx, 5.2, 2.45); tx += 2.65; });

  s.addText("Team: [your team name]  ·  [email]  ·  [github / demo link]", { x: 0, y: 6.4, w: W, h: 0.4, fontFace: FONT, fontSize: 12, color: C.faint, align: "center", valign: "middle" });
}

/* ---------------------------- write ------------------------------ */
const out = "KAYA-Deck.pptx";
pptx.writeFile({ fileName: out }).then((f) => {
  console.log("WROTE:", f);
}).catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
