# KAYA — Application Form Answers (ready to paste)

Copy-paste answers for the fields most hackathon application forms ask for. Two versions for the free-text fields: a **short** one (for tight character limits) and a **long** one. Replace anything in `[brackets]`.

---

## Basic info

- **Project / Team name:** KAYA  *(team: [your team name])*
- **Tagline (≤ 12 words):** Kaya mo 'to. — AI budgeting that turns impulse spending into on-chain savings.
- **Category / Track(s):** Practical Payments · Meaningful DeFi · Localized Financial Tools · Composability
- **Blockchain:** Stellar (Soroban smart contracts)
- **Region / Market:** Philippines (extensible across Southeast Asia)
- **Stage:** Concept / pre-build (idea submission)
- **Team members:** [name — role], [name — role], [name — role]
- **Contact email:** [email]
- **Links:** [demo or landing], [GitHub], [pitch deck PDF], [video]

---

## One-line description
KAYA is a mobile AI money coach for young Filipinos that redirects impulse spending into a yield-earning Stellar savings vault, enables gasless local QR payments, and builds an on-chain financial reputation users can borrow against.

---

## Problem (short)
Young Filipinos spend frictionlessly through GCash/Maya but save nothing, hold no emergency buffer, and have thin credit files — so good financial behavior is invisible and unrewarded. Existing apps only *track* spending; none change behavior, put idle money to work, and turn discipline into creditworthiness.

## Problem (long)
E-wallets made spending effortless for millions of young Filipinos, but saving stayed an afterthought. The result is a generation living transaction-to-transaction: a large share have near-zero liquid savings, one emergency pushes them into high-interest debt, and because lenders have almost no data on their spending discipline, even responsible 22-year-olds are rejected or charged predatory rates. Meanwhile, any money they do save sits idle, earning nothing. The missing piece is a single tool that closes the loop between behavior, productive assets, payments, and credibility.

---

## Solution (short)
KAYA's "money loop": fund in fiat → a local stablecoin via a Stellar anchor; an AI coach evaluates each purchase ("Kaya afford it?"); if unwise, one tap moves the money into a Soroban yield vault with a 48-hour cooling-off lockup; if approved, the user pays a merchant by QR via a gasless Stellar path payment; every disciplined action builds an on-chain Financial Health Score that future micro-lenders can read.

## Solution (long)
KAYA wraps four Stellar building blocks into one behavioral-financial loop:
1. **Fund in / cash out** via SEP-24/SEP-6 anchors (GCash, Maya, bank) → receive a local stablecoin.
2. **AI coaching** on every purchase. When it flags an unwise buy, KAYA offers "Save it Instead."
3. **The Delayed-Gratification Vault** — a Soroban contract that locks redirected money for 48 hours in a yield pool, breaking the impulse cycle while earning micro-yield.
4. **"Kaya Afford It? Pay It!"** — AI-approved purchases settle via Stellar path payments to QRPh merchants, made gasless with fee-bump (sponsored) transactions.
5. **On-chain Financial Health Score** — disciplined behavior is recorded as attestations in a Soroban reputation registry, a composable primitive other Stellar protocols can read to extend under-collateralized loans.

---

## How we use Stellar / composability
We build only the thin layer (AI coaching, the cooling-off vault logic, the reputation schema, and consumer UX) and reuse the ecosystem for the heavy lifting:
- **On/off-ramps:** existing SEA Stellar anchors (SEP-24/6, SEP-10/12).
- **DeFi & liquidity:** existing yield pools + Stellar's native DEX/AMM.
- **Payments:** Stellar path payments + fee-bump for gasless UX.
- **Wallets & identity:** Freighter/passkey wallets + on-chain attestations.

## Why it's a fit for this hackathon (short)
It's a user-facing financial app solving a real local problem, built on practical payments, meaningful DeFi with real assets, and deep local-anchor integration — and it's explicitly composable, plugging into existing wallets, anchors, and DeFi rather than reinventing them.

---

## Target users
Filipino students (18–24) and young professionals (23–30); merchants benefit on the receiving side via instant QR settlement. Designed to extend across SEA.

## Business model (if asked)
- Small spread / fee on off-ramp and in-app conversions.
- Optional premium coaching tier.
- Revenue share with partner lenders that consume the KAYA Score.
(Free core budgeting + savings to maximize adoption.)

## Traction / what exists today (if asked)
Concept stage. Validated direction, defined architecture, pitch deck + concept note prepared; testnet build planned for the hackathon window (see roadmap).

## Roadmap (short)
May–Jun: wallet + testnet stablecoin + SEP-24 deposit. Jun: Soroban vault (48h lockup + yield) + QR path-payment + fee-bump. Jul: AI coaching + reputation score, end-to-end demo. Aug–Sep: anchor partnerships, pilot users, micro-lending integration.

## The ask (if asked)
Stellar mentorship (Soroban + anchors), introductions to SEA anchor and lending partners, and prize support to fund a pilot.

---

## Honest note to include if there's a "risks/assumptions" field
A fully public production PH fiat anchor with open SEP access is still maturing, so our hackathon build integrates the Stellar anchor reference/testnet implementation, with the UX wired exactly as it will be for live GCash/Maya/bank anchors at launch.
