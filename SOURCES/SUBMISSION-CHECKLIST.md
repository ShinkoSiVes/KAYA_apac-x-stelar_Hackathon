# KAYA — Submission Package & Checklist

A safe, common-denominator package for an idea/application-stage hackathon submission. It covers the four containers organizers ask for in almost every combination: a **form**, a **deck**, a **written concept note**, and a **video**.

## What's in this folder

| File | Purpose | Format to submit |
|---|---|---|
| `KAYA-Deck.pdf` | Pitch deck (14 slides, designed) | Upload as-is (PDF is universally accepted) |
| `KAYA-Deck.pptx` | Editable source of the deck | Keep for edits; upload if PPTX is required |
| `KAYA-Concept-Note.pdf` | Written concept note / proposal | Upload as-is, or attach as the "concept" doc |
| `KAYA-Concept-Note.html` | Editable source of the note | Keep for edits |
| `PITCH.md` | Full narrative proposal (source) | Source for Google Docs export if needed |
| `ONE-PAGER.md` | Condensed one-page summary | Source for a quick-read attachment |
| `APPLICATION-FORM.md` | Ready-to-paste answers for form fields | Copy/paste into the online form |
| `DEMO-VIDEO-SCRIPT.md` | 90s + 60s video scripts + shot list | Use to record the video |

## Pre-submission checklist

- [ ] Confirm the **official submission format** (this package is a safe default; match exact rules if available).
- [ ] Fill placeholders everywhere: **team name, members, email, links** (deck cover + closing, concept note header, form answers).
- [ ] Decide the **mobile framework** wording (currently "React Native / Flutter").
- [ ] If there's a **slide limit**, trim the deck (core 10: Cover, Problem, Users, Money Loop, the 4 Features, Criteria, Ask). Ask me and I'll generate the trimmed version.
- [ ] If a **video** is required, record from the script (a clickable Figma prototype is fine at idea stage).
- [ ] Upload deck as **PDF** unless PPTX is explicitly requested.
- [ ] Paste form answers from `APPLICATION-FORM.md` (use the short variants if there are character limits).
- [ ] Double-check the **honest anchor note** is included anywhere they ask about risks/feasibility.
- [ ] Verify all **links work** (deck, repo/landing, video) before submitting.

## If you later get the exact rules
Send them to me and I'll: trim/expand the deck to the slide cap, reformat the concept note to any page/word limit, adjust track wording, and tailor the form answers to the real field names.

## How to regenerate (after editing placeholders)
- Deck: edit `build-deck.mjs` (or the PPTX directly), then `node build-deck.mjs`.
- Deck PDF: open the PPTX in PowerPoint → Save As / Export → PDF.
- Concept note PDF: edit `KAYA-Concept-Note.html`, open in Word/browser → Save/Print as PDF.
