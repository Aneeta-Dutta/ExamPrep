// Authored study content for Study Mode, keyed by topic id.
//
// Content is rephrased and condensed from standard, well-regarded references
// (Tanenbaum & Forouzan for networks, Silberschatz/Galvin for OS & DBMS,
// Cormen for algorithms, Russell & Norvig for AI, Hopcroft–Ullman for ToC,
// Hearn & Baker for graphics) and re-framed specifically for the way UGC NET
// Paper 2 tests each topic. Diagrams are authored inline as SVG and use the
// app's theme CSS variables so they adapt to light/dark mode.

import type { Block } from "./types";

export const CONTENT: Record<string, Block[]> = {
  // ===================================================================
  // UNIT 1 · TOPIC 1 — MATHEMATICAL LOGIC (educational, beginner→advanced)
  // ===================================================================
  "logical-equivalences": [
    {
      kind: "p",
      text: "Two formulas are **logically equivalent** (written **≡**) when they give the **same answer in every row** of the truth table — they're the same statement wearing different clothes. Spotting this lets you **simplify** a messy expression into a clean one.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Just like **½ = 0.5 = 2/4** are one number written three ways, **p → q** and **¬p ∨ q** are one statement written two ways.",
    },
    { kind: "h", text: "Proof is just a matching truth table" },
    {
      kind: "p",
      text: "To check an equivalence, line up both formulas in a truth table. If their columns match on **every** row, they're equivalent. Here's the most useful example, p → q ≡ ¬p ∨ q:",
    },
    {
      kind: "diagram",
      caption: "The last two columns are identical in every row ⇒ p → q ≡ ¬p ∨ q.",
      svg: `<svg viewBox="0 0 380 180" role="img" aria-label="Truth table showing p to q equals not p or q">
        <g font-family="monospace" font-size="12">
          <rect x="184" y="6" width="190" height="174" rx="4" fill="var(--primary)" opacity="0.08"/>
          <rect x="6" y="6" width="368" height="26" fill="var(--primary)"/>
          ${["p", "q", "p→q", "¬p∨q"]
            .map((h, i) => `<text x="${47 + i * 92}" y="24" text-anchor="middle" fill="#fff" font-weight="700">${h}</text>`)
            .join("")}
          ${[
            ["T", "T", "T", "T"],
            ["T", "F", "F", "F"],
            ["F", "T", "T", "T"],
            ["F", "F", "T", "T"],
          ]
            .map(
              (row, r) =>
                `<rect x="6" y="${32 + r * 34}" width="368" height="34" fill="${r % 2 ? "var(--bg)" : "var(--card)"}" stroke="var(--border)"/>` +
                row
                  .map(
                    (v, i) =>
                      `<text x="${47 + i * 92}" y="${53 + r * 34}" text-anchor="middle" fill="${v === "T" ? "var(--primary)" : "var(--muted)"}" font-weight="${v === "T" ? "700" : "400"}">${v}</text>`,
                  )
                  .join(""),
            )
            .join("")}
        </g>
      </svg>`,
    },
    { kind: "h", text: "The laws toolkit" },
    {
      kind: "p",
      text: "Instead of drawing a table every time, we apply these standard **laws** (each one is itself a proven equivalence). They're the same algebra you know from numbers — identity, commutative, distributive — just on true/false.",
    },
    {
      kind: "table",
      head: ["Law", "Equivalence"],
      rows: [
        ["Identity", "p ∧ T ≡ p   ·   p ∨ F ≡ p"],
        ["Domination", "p ∨ T ≡ T   ·   p ∧ F ≡ F"],
        ["Idempotent", "p ∨ p ≡ p   ·   p ∧ p ≡ p"],
        ["Double negation", "¬(¬p) ≡ p"],
        ["Commutative", "p ∧ q ≡ q ∧ p"],
        ["Associative", "(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)"],
        ["Distributive", "p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)"],
        ["Absorption", "p ∨ (p ∧ q) ≡ p"],
        ["Negation", "p ∨ ¬p ≡ T   ·   p ∧ ¬p ≡ F"],
        ["De Morgan's", "¬(p ∧ q) ≡ ¬p ∨ ¬q"],
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "Two rewrites that unlock most problems",
      text: "**p → q ≡ ¬p ∨ q** removes the arrow so the laws apply. **p ↔ q ≡ (p → q) ∧ (q → p)** breaks a biconditional into two conditionals. Memorise these two and almost any expression becomes simplifiable.",
    },
    { kind: "h", text: "De Morgan's laws — the workhorse" },
    {
      kind: "p",
      text: "When a **NOT sits outside a bracket**, De Morgan's law lets you push it inside — and the connective **flips**: ∧ becomes ∨, and ∨ becomes ∧.",
    },
    {
      kind: "diagram",
      caption: "Push the ¬ inside; ∧ ↔ ∨ flips. (Notice the negations also land on each part.)",
      svg: `<svg viewBox="0 0 384 126" role="img" aria-label="De Morgan's laws flip the connective">
        <g font-family="monospace" font-size="13">
          <rect x="20" y="16" width="120" height="34" rx="6" fill="var(--card)" stroke="var(--border)"/>
          <text x="80" y="38" text-anchor="middle" fill="var(--text)">¬(p ∧ q)</text>
          <text x="172" y="39" text-anchor="middle" font-size="17" fill="var(--muted)">→</text>
          <rect x="208" y="16" width="156" height="34" rx="6" fill="var(--primary-bg)" stroke="var(--primary)"/>
          <text x="286" y="38" text-anchor="middle" fill="var(--text)">¬p <tspan fill="#c0392b" font-weight="700">∨</tspan> ¬q</text>
          <rect x="20" y="64" width="120" height="34" rx="6" fill="var(--card)" stroke="var(--border)"/>
          <text x="80" y="86" text-anchor="middle" fill="var(--text)">¬(p ∨ q)</text>
          <text x="172" y="87" text-anchor="middle" font-size="17" fill="var(--muted)">→</text>
          <rect x="208" y="64" width="156" height="34" rx="6" fill="var(--primary-bg)" stroke="var(--primary)"/>
          <text x="286" y="86" text-anchor="middle" fill="var(--text)">¬p <tspan fill="#c0392b" font-weight="700">∧</tspan> ¬q</text>
          <text x="192" y="116" text-anchor="middle" font-family="sans-serif" font-size="10" fill="var(--muted)">the bracket opens · the connective flips</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**De Morgan's is the most reused idea in the syllabus.** The exact same flip appears in **sets** (¬ → complement: (A∩B)′ = A′∪B′), in **digital circuits** (NAND/NOR), and in code (`NOT (a AND b)` = `(NOT a) OR (NOT b)`). Learn it once here.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Worked simplification",
      text: "Simplify **¬(¬p ∧ q)**:  apply De Morgan's → **¬(¬p) ∨ ¬q**;  apply double negation → **p ∨ ¬q**. Done — three messy symbols become two clean ones, each step justified by a named law.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Common mistakes",
      text: "With De Morgan's you **must flip the connective** — ¬(p ∧ q) is ¬p ∨ ¬q, **not** ¬p ∧ ¬q. Also keep **≡** and **↔** straight: ↔ is a *connective inside* a formula; ≡ is a *fact about two formulas* (p ≡ q means p ↔ q is a tautology).",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Engrave these",
      text: "🔑 **p → q ≡ ¬p ∨ q** (kill the arrow).  🔑 **De Morgan: open the bracket, flip ∧↔∨, negate each part.**  🔑 Equivalent = identical final columns.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Simplify a compound proposition, name the law that justifies a step, apply De Morgan's to a negation, and rewrite p → q as ¬p ∨ q. Knowing the arrow rewrite and De Morgan's cold handles most of these.",
    },
  ],

  "math-logic": [
    {
      kind: "p",
      text: "Before computers could *calculate*, humans needed a way to *reason* without mistakes. **Mathematical logic** is exactly that: a precise language for reasoning, where every statement is either **true** or **false** and conclusions follow by clear rules — not opinion.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "If ordinary mathematics is about *numbers* and how they combine, logic is about *statements* and how they combine. Once you can do arithmetic on truth, a machine can do your reasoning for you — which is precisely what a CPU does billions of times a second.",
    },
    {
      kind: "p",
      text: "We'll build this topic in a deliberate order, each idea resting on the previous one — the way a good course should. Work through the sub-topics top to bottom:",
    },
    {
      kind: "ol",
      items: [
        "**Propositional Logic** — the atoms: true/false statements and how connectives combine them. *Start here.*",
        "**Propositional Equivalences** — when two different-looking statements mean the same thing.",
        "**Normal Forms** — standard ways (CNF/DNF) to write any logical expression.",
        "**Predicates and Quantifiers** — logic about *objects* and *properties* (‘for all’, ‘there exists’).",
        "**Nested Quantifiers** — combining quantifiers, and the order that changes meaning.",
        "**Rules of Inference** — chaining truths together to *prove* new ones.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Logic is the **foundation of the whole syllabus**: digital circuits (Unit 2) are logic in hardware, database queries (Unit 4) are logic over data, and program conditions & proofs of correctness (Units 6–8) are logic in software. Master it once; reuse it everywhere.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Why it matters for NET",
      text: "Mathematical Logic is a near-guaranteed source of 2–4 marks every cycle: truth values, tautology checks, contrapositive, logical equivalence, and quantifier negation. It is high-yield and very scoring once the basics click.",
    },
  ],

  "prop-logic": [
    {
      kind: "p",
      text: "Logic is just **careful thinking written down**. You already do it daily — *‘if it rains, I'll take an umbrella.’* Propositional logic gives this everyday reasoning a fixed set of rules, so any two people always reach the **same answer**.",
    },
    { kind: "h", text: "Step 1 · What is a proposition?" },
    {
      kind: "p",
      text: "A **proposition** is a sentence that is **either true or false — never both, never neither**. That single test is everything. Facts pass; questions, commands and ‘it depends’ sentences fail.",
    },
    {
      kind: "diagram",
      caption: "If you can stamp it True or False, it's a proposition.",
      svg: `<svg viewBox="0 0 384 150" role="img" aria-label="Proposition or not a proposition">
        <g font-size="11">
          <rect x="6" y="8" width="182" height="134" rx="8" fill="#0a8f5b" opacity="0.08"/>
          <rect x="6" y="8" width="182" height="134" rx="8" fill="none" stroke="#0a8f5b"/>
          <text x="97" y="28" text-anchor="middle" fill="#0a8f5b" font-weight="700" font-size="12">✓ Proposition</text>
          <text x="22" y="56" fill="var(--text)">“Delhi is in India.”</text>
          <text x="22" y="69" fill="var(--muted)" font-size="9">→ true</text>
          <text x="22" y="93" fill="var(--text)">“2 + 2 = 5”</text>
          <text x="22" y="106" fill="var(--muted)" font-size="9">→ false (still a proposition)</text>
          <text x="22" y="130" fill="var(--text)">“The Sun is a star.”</text>
          <rect x="196" y="8" width="182" height="134" rx="8" fill="#c0392b" opacity="0.08"/>
          <rect x="196" y="8" width="182" height="134" rx="8" fill="none" stroke="#c0392b"/>
          <text x="287" y="28" text-anchor="middle" fill="#c0392b" font-weight="700" font-size="12">✗ Not a proposition</text>
          <text x="212" y="56" fill="var(--text)">“Close the door.”</text>
          <text x="212" y="69" fill="var(--muted)" font-size="9">→ a command</text>
          <text x="212" y="93" fill="var(--text)">“What time is it?”</text>
          <text x="212" y="106" fill="var(--muted)" font-size="9">→ a question</text>
          <text x="212" y="130" fill="var(--text)">“x + 1 = 3”  → depends on x</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Picture each proposition as a **light switch**: it is either ON (**true** = 1) or OFF (**false** = 0). There is no ‘half-on’. Everything that follows is just **wiring switches together**.",
    },
    { kind: "h", text: "Step 2 · Connecting propositions" },
    {
      kind: "p",
      text: "We name simple propositions with letters (p, q, r) and join them with **connectives** — the logical versions of *not, and, or, if…then,* and *if-and-only-if*.",
    },
    {
      kind: "diagram",
      caption: "AND = the overlap (need both) · OR = either side · NOT = everything outside. (Same idea as the AND/OR/NOT gates in Unit 2.)",
      svg: `<svg viewBox="0 0 384 126" role="img" aria-label="AND OR NOT as shaded regions">
        <defs><clipPath id="pl-and"><circle cx="52" cy="64" r="22"/></clipPath></defs>
        <text x="66" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">p ∧ q (AND)</text>
        <g clip-path="url(#pl-and)"><circle cx="80" cy="64" r="22" fill="var(--primary)" opacity="0.65"/></g>
        <circle cx="52" cy="64" r="22" fill="none" stroke="var(--muted)"/>
        <circle cx="80" cy="64" r="22" fill="none" stroke="var(--muted)"/>
        <text x="40" y="104" font-size="9" fill="var(--muted)">p</text>
        <text x="92" y="104" font-size="9" fill="var(--muted)">q</text>
        <text x="66" y="118" text-anchor="middle" font-size="8.5" fill="var(--muted)">only the overlap</text>
        <text x="192" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">p ∨ q (OR)</text>
        <circle cx="178" cy="64" r="22" fill="var(--primary)" opacity="0.55" stroke="var(--muted)"/>
        <circle cx="206" cy="64" r="22" fill="var(--primary)" opacity="0.55" stroke="var(--muted)"/>
        <text x="166" y="104" font-size="9" fill="var(--muted)">p</text>
        <text x="218" y="104" font-size="9" fill="var(--muted)">q</text>
        <text x="192" y="118" text-anchor="middle" font-size="8.5" fill="var(--muted)">either side counts</text>
        <text x="326" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">¬p (NOT)</text>
        <rect x="288" y="42" width="76" height="46" rx="6" fill="var(--primary)" opacity="0.5"/>
        <circle cx="326" cy="65" r="17" fill="var(--card)" stroke="var(--muted)"/>
        <text x="326" y="69" text-anchor="middle" font-size="9" fill="var(--muted)">p</text>
        <text x="326" y="118" text-anchor="middle" font-size="8.5" fill="var(--muted)">everything outside p</text>
      </svg>`,
    },
    {
      kind: "table",
      head: ["In words", "Symbol", "Output is TRUE when…"],
      rows: [
        ["not p", "¬p", "p is false (it flips the value)"],
        ["p and q", "p ∧ q", "both are true"],
        ["p or q", "p ∨ q", "at least one is true"],
        ["if p then q", "p → q", "everything except: p true and q false"],
        ["p if and only if q", "p ↔ q", "both have the same value"],
      ],
    },
    { kind: "h", text: "Step 3 · The truth table — your calculator" },
    {
      kind: "p",
      text: "A **truth table** writes out the answer for *every* possible input. Two switches → 4 rows, three → 8 rows; in general **2ⁿ rows** for n propositions. Read it like a times-table.",
    },
    {
      kind: "diagram",
      caption: "Every combination of p and q, for all five connectives.",
      svg: `<svg viewBox="0 0 380 175" role="img" aria-label="Truth table of connectives">
        <g font-family="monospace" font-size="12">
          <rect x="6" y="6" width="368" height="26" fill="var(--primary)"/>
          ${["p", "q", "¬p", "p∧q", "p∨q", "p→q", "p↔q"]
            .map((h, i) => `<text x="${30 + i * 50}" y="24" text-anchor="middle" fill="#fff" font-weight="700">${h}</text>`)
            .join("")}
          ${[
            ["T", "T", "F", "T", "T", "T", "T"],
            ["T", "F", "F", "F", "T", "F", "F"],
            ["F", "T", "T", "F", "T", "T", "F"],
            ["F", "F", "T", "F", "F", "T", "T"],
          ]
            .map(
              (row, r) =>
                `<rect x="6" y="${32 + r * 34}" width="368" height="34" fill="${r % 2 ? "var(--bg)" : "var(--card)"}" stroke="var(--border)"/>` +
                row
                  .map(
                    (v, i) =>
                      `<text x="${30 + i * 50}" y="${53 + r * 34}" text-anchor="middle" fill="${v === "T" ? "var(--primary)" : "var(--muted)"}" font-weight="${v === "T" ? "700" : "400"}">${v}</text>`,
                  )
                  .join(""),
            )
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "note",
      title: "Read one row with me",
      text: "Row 2: p = T, q = F. So ¬p = F, p ∧ q = F (both aren't true), p ∨ q = T (one is true), p → q = **F** (the single false case), p ↔ q = F (values differ). That's the whole skill — repeat per row.",
    },
    { kind: "h", text: "Step 4 · The tricky one — ‘if p then q’" },
    {
      kind: "p",
      text: "Almost everyone trips on **p → q**. The fix: read it as a **promise**. A promise is broken in **only one** situation, and that one case is the entire rule.",
    },
    {
      kind: "diagram",
      caption: "“If you score 90% (p), I'll buy a phone (q).” It breaks only when you keep your side but I don't.",
      svg: `<svg viewBox="0 0 384 168" role="img" aria-label="Implication as a promise, four cases">
        <text x="192" y="16" text-anchor="middle" font-size="10.5" fill="var(--text)">When is the promise broken?</text>
        <g font-size="10">
          <rect x="8" y="26" width="182" height="62" rx="8" fill="#0a8f5b" opacity="0.10" stroke="#0a8f5b"/>
          <text x="20" y="46" fill="#0a8f5b" font-weight="700">p = T , q = T</text>
          <text x="20" y="64" fill="var(--text)">Scored & got the phone</text>
          <text x="20" y="80" fill="var(--muted)">→ promise KEPT (T)</text>
          <rect x="194" y="26" width="182" height="62" rx="8" fill="#c0392b" opacity="0.12" stroke="#c0392b" stroke-width="1.6"/>
          <text x="206" y="46" fill="#c0392b" font-weight="700">p = T , q = F</text>
          <text x="206" y="64" fill="var(--text)">Scored but NO phone</text>
          <text x="206" y="80" fill="#c0392b" font-weight="700">→ promise BROKEN (F)</text>
          <rect x="8" y="96" width="182" height="62" rx="8" fill="#0a8f5b" opacity="0.10" stroke="#0a8f5b"/>
          <text x="20" y="116" fill="#0a8f5b" font-weight="700">p = F , q = T</text>
          <text x="20" y="134" fill="var(--text)">Didn't score, still gifted</text>
          <text x="20" y="150" fill="var(--muted)">→ promise KEPT (T)</text>
          <rect x="194" y="96" width="182" height="62" rx="8" fill="#0a8f5b" opacity="0.10" stroke="#0a8f5b"/>
          <text x="206" y="116" fill="#0a8f5b" font-weight="700">p = F , q = F</text>
          <text x="206" y="134" fill="var(--text)">Didn't score, no phone</text>
          <text x="206" y="150" fill="var(--muted)">→ promise KEPT (T)</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**p → q is FALSE only when p is true and q is false (T → F).** Every other row is true — even when p is false (a promise with no trigger can't be broken). If you remember one thing from this page, remember this.",
    },
    { kind: "h", text: "Step 5 · Flipping a conditional" },
    {
      kind: "p",
      text: "From p → q we build three relatives by **swapping** and/or **negating** the two parts. Only **one** keeps the original meaning.",
    },
    {
      kind: "diagram",
      caption: "Swap → converse · negate → inverse · swap + negate → contrapositive (the twin that always agrees).",
      svg: `<svg viewBox="0 0 384 168" role="img" aria-label="Converse inverse contrapositive">
        <g font-size="11">
          <rect x="8" y="10" width="368" height="32" rx="6" fill="var(--primary-bg)" stroke="var(--primary)"/>
          <text x="20" y="30" fill="var(--muted)" font-size="9">ORIGINAL</text>
          <text x="150" y="31" fill="var(--text)" font-weight="700" font-family="monospace">p → q</text>
          <rect x="8" y="48" width="368" height="30" rx="6" fill="var(--card)" stroke="var(--border)"/>
          <text x="20" y="67" fill="var(--muted)" font-size="9">Converse (swap)</text>
          <text x="150" y="68" fill="var(--text)" font-family="monospace">q → p</text>
          <text x="368" y="67" text-anchor="end" fill="#c0392b" font-size="9.5">✗ not equivalent</text>
          <rect x="8" y="84" width="368" height="30" rx="6" fill="var(--card)" stroke="var(--border)"/>
          <text x="20" y="103" fill="var(--muted)" font-size="9">Inverse (negate)</text>
          <text x="150" y="104" fill="var(--text)" font-family="monospace">¬p → ¬q</text>
          <text x="368" y="103" text-anchor="end" fill="#c0392b" font-size="9.5">✗ not equivalent</text>
          <rect x="8" y="120" width="368" height="32" rx="6" fill="#0a8f5b" opacity="0.10" stroke="#0a8f5b" stroke-width="1.6"/>
          <text x="20" y="140" fill="#0a8f5b" font-size="9" font-weight="700">Contrapositive (swap + negate)</text>
          <text x="150" y="141" fill="var(--text)" font-family="monospace" font-weight="700">¬q → ¬p</text>
          <text x="368" y="140" text-anchor="end" fill="#0a8f5b" font-size="9.5" font-weight="700">✓ same as original</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "The **contrapositive ¬q → ¬p always equals the original** — this is why ‘proof by contrapositive’ works. The **converse** and **inverse** do **not** (a favourite exam trap). Handy: converse ≡ inverse (they match each other).",
    },
    { kind: "h", text: "Step 6 · Always-true, always-false" },
    {
      kind: "p",
      text: "Now read just the **last column** of a formula's truth table and name it:",
    },
    {
      kind: "ul",
      items: [
        "**All T → Tautology** — always true, e.g. *p ∨ ¬p* (‘it rains or it doesn't’).",
        "**All F → Contradiction** — always false, e.g. *p ∧ ¬p*.",
        "**A mix → Contingency** — sometimes true, sometimes false (most formulas).",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Three traps to avoid",
      text: "(1) Logic's **OR is inclusive** — true even when *both* are true. (2) **p → q ≠ q → p.** (3) Word tricks: **‘p only if q’ = p → q**, but **‘p if q’ = q → p**; and **‘unless’ means ‘if not’** — *A unless B* = ¬B → A.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Engrave these",
      text: "🔑 Implication breaks only on **T → F**.  🔑 A truth table has **2ⁿ rows**.  🔑 Connective strength: **¬ › ∧ › ∨ › → › ↔** (NOT binds tightest).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Find a formula's truth value, count truth-table rows (2ⁿ), label a formula tautology/contradiction, pick the contrapositive, and convert English ↔ symbols. The ‘only if’ vs ‘if’ and ‘unless’ wordings are the usual traps.",
    },
  ],
  // ---- Unit 1 · Mathematical Logic (remaining subtopics) ----
  "normal-forms": [
    {
      kind: "p",
      text: "Every whole number breaks into a standard form — a product of primes. Logical formulas have **standard shapes** too. Putting a messy formula into one makes it easy to compare, simplify, or feed to a computer. The two shapes are **DNF** and **CNF**.",
    },
    {
      kind: "p",
      text: "First, a **literal** is a variable or its negation (p or ¬p). Now the two forms differ only by which connective sits on the **outside**:",
    },
    {
      kind: "diagram",
      caption: "Read the OUTERMOST connective: OR outside = DNF, AND outside = CNF.",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="DNF versus CNF shapes">
        <g font-family="monospace" font-size="13">
          <text x="16" y="30" font-family="sans-serif" font-size="11" font-weight="700" fill="var(--primary)">DNF — OR of ANDs (sum of products)</text>
          <text x="28" y="56" fill="var(--text)">( p ∧ q ) <tspan fill="#c0392b" font-weight="700">∨</tspan> ( ¬p ∧ r )</text>
          <text x="16" y="92" font-family="sans-serif" font-size="11" font-weight="700" fill="var(--primary)">CNF — AND of ORs (product of sums)</text>
          <text x="28" y="118" fill="var(--text)">( p ∨ q ) <tspan fill="#c0392b" font-weight="700">∧</tspan> ( ¬p ∨ r )</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Never mix them up",
      text: "**D**NF has **D**isjunction (OR) on the outside. **C**NF has **C**onjunction (AND) on the outside. The first letter tells you the outer glue.",
    },
    { kind: "h", text: "Principal (canonical) forms — minterms & maxterms" },
    {
      kind: "p",
      text: "A **principal** form (PDNF/PCNF) is the unique version where *every* term mentions *every* variable. You read it straight off the truth table:",
    },
    {
      kind: "ul",
      items: [
        "**Minterm** — an AND-term true for exactly one row. **PDNF** = OR of the minterms of all **True** rows.",
        "**Maxterm** — an OR-clause false for exactly one row. **PCNF** = AND of the maxterms of all **False** rows.",
        "So: number of minterms = number of **1s**, number of maxterms = number of **0s**, and minterms + maxterms = 2ⁿ.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "DNF/PDNF is the **Sum-Of-Products (SOP)** you'll meet again in Boolean Algebra & digital circuits; CNF/PCNF is **Product-Of-Sums (POS)**. Same idea, different unit — learn it once.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify whether a formula is in CNF or DNF, convert a formula to a normal form, and count minterms/maxterms (= count of True/False rows). Tip: rewrite p → q as ¬p ∨ q first, then distribute.",
    },
  ],

  "predicates-quantifiers": [
    {
      kind: "p",
      text: "Plain propositional logic can't say *‘every student passed’* — it has no notion of ‘every’. **Predicate logic** adds two powers: **predicates** (statements with a variable) and **quantifiers** (how many things they apply to).",
    },
    {
      kind: "p",
      text: "A **predicate** P(x) is a sentence with a blank, like *‘x is even’*. It isn't true or false until we either fix x **or** quantify it. There are two quantifiers:",
    },
    {
      kind: "diagram",
      caption: "∀ demands every element pass; ∃ needs just one.",
      svg: `<svg viewBox="0 0 384 132" role="img" aria-label="Universal and existential quantifiers">
        <g font-size="11">
          <text x="16" y="24" font-weight="700" fill="var(--primary)">∀x P(x) — “for ALL x”</text>
          ${[0, 1, 2, 3]
            .map((i) => `<circle cx="${40 + i * 42}" cy="48" r="14" fill="#0a8f5b" opacity="0.85"/><text x="${40 + i * 42}" y="52" text-anchor="middle" fill="#fff" font-size="11">✓</text>`)
            .join("")}
          <text x="220" y="52" fill="var(--muted)">true only if every one is ✓</text>
          <text x="16" y="92" font-weight="700" fill="var(--primary)">∃x P(x) — “there EXISTS an x”</text>
          ${[0, 1, 2, 3]
            .map((i) => `<circle cx="${40 + i * 42}" cy="112" r="14" fill="${i === 2 ? "#0a8f5b" : "var(--border)"}" opacity="${i === 2 ? "0.85" : "1"}"/>${i === 2 ? `<text x="${40 + i * 42}" y="116" text-anchor="middle" fill="#fff" font-size="11">✓</text>` : ""}`)
            .join("")}
          <text x="220" y="116" fill="var(--muted)">true if at least one is ✓</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "**∀ is a giant AND** (P of first ∧ P of second ∧ …); **∃ is a giant OR** (P of first ∨ P of second ∨ …). Everything about quantifiers follows from that one idea.",
    },
    { kind: "h", text: "Negating a quantifier (the exam favourite)" },
    {
      kind: "p",
      text: "To negate, **flip the quantifier and push the ¬ inside** — exactly De Morgan's law, scaled up:",
    },
    {
      kind: "formula",
      text: "¬∀x P(x) ≡ ∃x ¬P(x)        ¬∃x P(x) ≡ ∀x ¬P(x)",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Translate carefully",
      text: "**‘All P are Q’ = ∀x (P(x) → Q(x))** — uses an arrow. **‘Some P are Q’ = ∃x (P(x) ∧ Q(x))** — uses AND. Using ∧ with ∀ or → with ∃ is the classic mistake.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Translate English ↔ quantified logic, negate a quantified statement (flip ∀↔∃, negate inside), and judge truth over a small domain. Remember ∀ pairs with →, ∃ pairs with ∧.",
    },
  ],

  "nested-quantifiers": [
    {
      kind: "p",
      text: "*‘Everyone has a mother’* and *‘there is one mother of everyone’* use the same words — but mean very different things. With **nested quantifiers**, the **order** is the meaning.",
    },
    {
      kind: "diagram",
      caption: "Swapping ∀ and ∃ changes everything; same-type quantifiers can be swapped freely.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Order of nested quantifiers">
        <g font-size="11">
          <rect x="8" y="10" width="368" height="42" rx="6" fill="var(--primary-bg)" stroke="var(--primary)"/>
          <text x="20" y="28" font-family="monospace" font-weight="700" fill="var(--text)">∀x ∃y  L(x,y)</text>
          <text x="20" y="44" fill="var(--muted)">“everyone loves SOMEone” — y may differ for each x</text>
          <rect x="8" y="60" width="368" height="42" rx="6" fill="var(--card)" stroke="var(--border)"/>
          <text x="20" y="78" font-family="monospace" font-weight="700" fill="var(--text)">∃y ∀x  L(x,y)</text>
          <text x="20" y="94" fill="var(--muted)">“SOMEone is loved by everyone” — one fixed y for all</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**∃y∀x ⇒ ∀x∃y** (the stronger one implies the weaker), but **not** the reverse. Same-type quantifiers commute: ∀x∀y ≡ ∀y∀x and ∃x∃y ≡ ∃y∃x. Only **mixed** ∀/∃ order matters.",
    },
    {
      kind: "p",
      text: "**Negating** a nested statement is mechanical: move ¬ left to right, flipping each quantifier and finally negating the predicate. For example, ¬∀x∃y P(x,y) ≡ ∃x∀y ¬P(x,y).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "State the meaning of a nested statement, decide if two orderings are equivalent (mixed ∀/∃ usually aren't), and negate a nested statement by flipping every quantifier.",
    },
  ],

  "rules-inference": [
    {
      kind: "p",
      text: "A **proof** is a chain of statements where every link is *guaranteed* by the ones before it. **Rules of inference** are the legal moves — the steps you're always allowed to take.",
    },
    {
      kind: "p",
      text: "The famous one is **Modus Ponens**: if ‘p → q’ holds and p is true, you may conclude q.",
    },
    {
      kind: "diagram",
      caption: "Modus Ponens: the engine of forward reasoning.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Modus ponens">
        <g font-family="monospace" font-size="14">
          <text x="150" y="34" text-anchor="middle" fill="var(--text)">p → q</text>
          <text x="150" y="58" text-anchor="middle" fill="var(--text)">p</text>
          <line x1="92" y1="68" x2="208" y2="68" stroke="var(--muted)"/>
          <text x="150" y="92" text-anchor="middle" fill="var(--primary)" font-weight="700">∴ q</text>
          <text x="300" y="40" font-family="sans-serif" font-size="10" fill="var(--muted)">premises</text>
          <text x="300" y="92" font-family="sans-serif" font-size="10" fill="var(--primary)">conclusion</text>
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Rule", "From… you may infer"],
      rows: [
        ["Modus Ponens", "p → q , p  ⊢  q"],
        ["Modus Tollens", "p → q , ¬q  ⊢  ¬p"],
        ["Hypothetical Syllogism", "p → q , q → r  ⊢  p → r"],
        ["Disjunctive Syllogism", "p ∨ q , ¬p  ⊢  q"],
        ["Addition", "p  ⊢  p ∨ q"],
        ["Simplification", "p ∧ q  ⊢  p"],
        ["Resolution", "p ∨ q , ¬p ∨ r  ⊢  q ∨ r"],
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Valid moves vs fallacies",
      text: "Look-alikes are **invalid**: **Affirming the consequent** (p → q, q ⊢ p) ✗ and **Denying the antecedent** (p → q, ¬p ⊢ ¬q) ✗. Valid = affirm p (Ponens) or deny q (Tollens). Notice Modus Tollens is just the **contrapositive** in action.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "An argument is **valid** when the conclusion is true in every row where *all* premises are true — i.e. (premises → conclusion) is a **tautology**. Validity is about *form*, not whether the statements are actually true.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Name the rule used in a step, decide if an argument is valid, and spot the two fallacies. Modus Ponens & Modus Tollens vs their invalid twins is the most common question.",
    },
  ],

  // ---- Unit 1 · remaining topics ----
  "sets-relations": [
    {
      kind: "p",
      text: "A **set** is just a collection of distinct things (its *elements*). Sets are the vocabulary of all of mathematics — and a **relation** is simply a set of ordered pairs that links elements together.",
    },
    { kind: "h", text: "Set operations" },
    {
      kind: "diagram",
      caption: "Union = either, Intersection = both, Difference = in A not B, Complement = outside A.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Set operations Venn diagrams">
        <defs>
          <clipPath id="sr-u"><circle cx="44" cy="60" r="22"/></clipPath>
          <clipPath id="sr-i"><circle cx="180" cy="60" r="22"/></clipPath>
        </defs>
        <text x="56" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)">A ∪ B</text>
        <circle cx="44" cy="60" r="22" fill="var(--primary)" opacity="0.5" stroke="var(--muted)"/>
        <circle cx="72" cy="60" r="22" fill="var(--primary)" opacity="0.5" stroke="var(--muted)"/>
        <text x="192" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)">A ∩ B</text>
        <circle cx="180" cy="60" r="22" fill="none" stroke="var(--muted)"/>
        <circle cx="208" cy="60" r="22" fill="none" stroke="var(--muted)"/>
        <g clip-path="url(#sr-i)"><circle cx="208" cy="60" r="22" fill="var(--primary)" opacity="0.6"/></g>
        <text x="330" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)">A − B</text>
        <circle cx="316" cy="60" r="22" fill="none" stroke="var(--muted)"/>
        <circle cx="344" cy="60" r="22" fill="none" stroke="var(--muted)"/>
        <g clip-path="url(#sr-u)"></g>
        <path d="M316,38 a22,22 0 1,0 0,44 a22,22 0 0,0 0,-44" fill="var(--primary)" opacity="0.5"/>
        <circle cx="344" cy="60" r="22" fill="var(--card)" stroke="var(--muted)"/>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "A set with n elements has **2ⁿ subsets** (its *power set*).",
        "**De Morgan's laws** return here: (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′.",
        "**Inclusion–Exclusion:** |A ∪ B| = |A| + |B| − |A ∩ B|.",
      ],
    },
    { kind: "h", text: "Relations and their properties" },
    {
      kind: "p",
      text: "A **relation R on a set A** is any set of ordered pairs from A. We classify relations by four properties:",
    },
    {
      kind: "table",
      head: ["Property", "Meaning"],
      rows: [
        ["Reflexive", "(a, a) ∈ R for every a (everything relates to itself)"],
        ["Symmetric", "if a R b then b R a"],
        ["Antisymmetric", "if a R b and b R a then a = b"],
        ["Transitive", "if a R b and b R c then a R c"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two star combinations: **Equivalence relation = Reflexive + Symmetric + Transitive** — it *partitions* the set into equivalence classes. **Partial order (POSET) = Reflexive + Antisymmetric + Transitive** — drawn as a **Hasse diagram**.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Common mistake",
      text: "Antisymmetric is **not** ‘not symmetric’. A relation can be both symmetric and antisymmetric (e.g. equality). Also, ‘≤’ is antisymmetric and a partial order; ‘<’ is not reflexive, so not a partial order.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Check which properties a given relation has, count equivalence classes, identify a POSET / draw its Hasse diagram, and apply inclusion–exclusion or the 2ⁿ subset count.",
    },
  ],

  "counting-probability": [
    {
      kind: "p",
      text: "Counting answers *‘in how many ways?’* without listing them all. Two tiny rules start everything: the **sum rule** (either/or → add) and the **product rule** (one then another → multiply).",
    },
    { kind: "h", text: "Permutations vs combinations" },
    {
      kind: "p",
      text: "The single most important distinction: **does order matter?**",
    },
    {
      kind: "diagram",
      caption: "Pick 2 of {A,B,C}: 6 ordered arrangements (P), but only 3 unordered selections (C).",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Permutations versus combinations">
        <g font-size="11" font-family="monospace">
          <text x="16" y="20" font-family="sans-serif" font-weight="700" fill="var(--primary)">Order matters → Permutation ³P₂ = 6</text>
          <text x="20" y="42" fill="var(--text)">AB  BA  AC  CA  BC  CB</text>
          <text x="16" y="78" font-family="sans-serif" font-weight="700" fill="var(--primary)">Order ignored → Combination ³C₂ = 3</text>
          <text x="20" y="100" fill="var(--text)">AB    AC    BC</text>
        </g>
      </svg>`,
    },
    {
      kind: "formula",
      text: "ⁿPᵣ = n! / (n−r)!        ⁿCᵣ = n! / ( r! (n−r)! ) = ⁿPᵣ / r!",
    },
    { kind: "h", text: "Three more must-knows" },
    {
      kind: "ul",
      items: [
        "**Pigeonhole principle:** put n items in m boxes; if n > m, some box holds ≥ 2. In general some box holds ≥ ⌈n/m⌉.",
        "**Inclusion–Exclusion:** |A ∪ B| = |A| + |B| − |A ∩ B|.",
        "**Probability:** P(E) = favourable / total. **Bayes:** P(H | E) = P(E | H)·P(H) / P(E).",
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Decide in one question",
      text: "Ask *‘would swapping two chosen items make a different outcome?’* — **Yes → permutation**, **No → combination**. A handshake/committee is a combination; a ranking/password is a permutation.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute ⁿPᵣ / ⁿCᵣ, apply the pigeonhole minimum, use inclusion–exclusion, and plug into Bayes' theorem. Watch the order-matters cue — it decides P vs C.",
    },
  ],

  // ---- Unit 1 · Graph Theory, Boolean Algebra, Optimization ----
  "graph-theory": [
    {
      kind: "p",
      text: "A **graph** models *things and the links between them* — cities and roads, people and friendships, web pages and links. Formally G = (V, E): a set of **vertices** V and **edges** E joining them.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Handshake lemma:** the sum of all vertex **degrees = 2 × (number of edges)** — because every edge adds 1 to two vertices. Consequence: the number of odd-degree vertices is always even.",
    },
    { kind: "h", text: "Two journeys students confuse" },
    {
      kind: "diagram",
      caption: "Euler trail uses every EDGE once; Hamiltonian uses every VERTEX once.",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Euler versus Hamiltonian">
        <g font-size="10">
          <text x="96" y="16" text-anchor="middle" font-weight="700" fill="var(--primary)">Eulerian — every edge</text>
          <text x="288" y="16" text-anchor="middle" font-weight="700" fill="var(--primary)">Hamiltonian — every vertex</text>
          <g stroke="var(--muted)" stroke-width="1.5">
            <line x1="50" y1="40" x2="150" y2="40"/><line x1="50" y1="40" x2="50" y2="110"/><line x1="150" y1="40" x2="150" y2="110"/><line x1="50" y1="110" x2="150" y2="110"/><line x1="50" y1="40" x2="150" y2="110"/>
          </g>
          <g fill="var(--primary)">${[[50, 40], [150, 40], [50, 110], [150, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/>`).join("")}</g>
          <g stroke="var(--muted)" stroke-width="1.5">
            <line x1="242" y1="40" x2="342" y2="40"/><line x1="342" y1="40" x2="342" y2="110"/><line x1="342" y1="110" x2="242" y2="110"/><line x1="242" y1="110" x2="242" y2="40"/>
          </g>
          <g fill="#0a8f5b">${[[242, 40], [342, 40], [242, 110], [342, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/>`).join("")}</g>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Eulerian** circuit exists ⇔ graph is connected and **every vertex has even degree** (an Euler *path* allows exactly 2 odd-degree vertices).",
        "**Hamiltonian** (visit every vertex once) has **no easy test** — it's an NP-hard style problem.",
        "**Tree:** a connected graph with **no cycles**; n vertices ⇒ exactly **n − 1 edges**. A **spanning tree** reaches all vertices with the fewest edges (MST = cheapest, via Prim/Kruskal).",
        "**Planar** graph can be drawn with no crossings; **Euler's formula** V − E + F = 2. K₅ and K₃,₃ are the smallest non-planar graphs.",
        "**Bipartite** = 2-colourable = contains **no odd cycle**.",
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Engrave the difference",
      text: "**Eul**er → **E**dges (check degree parity). **Ham**ilton → vertices (hard, no shortcut). Tree always has **n − 1** edges.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Apply the handshake lemma, test for an Euler path/circuit by counting odd-degree vertices, use V − E + F = 2, give a tree's edge count, and find chromatic number / check bipartiteness.",
    },
  ],

  "boolean-algebra": [
    {
      kind: "p",
      text: "**Boolean algebra** is the same true/false logic from earlier, now treated as **algebra** for designing circuits. Values are 0 and 1; the operations are **· (AND)**, **+ (OR)** and **¬ (NOT)**.",
    },
    {
      kind: "p",
      text: "A function is usually written as **Sum of Products (SOP)** — an OR of AND-terms (the DNF you already met). The goal is **minimization**: the smallest equivalent expression means the cheapest circuit. The fastest hand tool is the **Karnaugh map (K-map)**.",
    },
    {
      kind: "diagram",
      caption: "K-map: place each 1, then circle the largest groups of adjacent 1s (sizes 1,2,4,8…). One circled group = one simplified term.",
      svg: `<svg viewBox="0 0 384 140" role="img" aria-label="Karnaugh map grouping">
        <g font-size="11" font-family="monospace">
          <text x="22" y="30" fill="var(--muted)">AB→</text>
          ${["00", "01", "11", "10"].map((c, i) => `<text x="${92 + i * 60}" y="30" text-anchor="middle" fill="var(--muted)">${c}</text>`).join("")}
          <text x="30" y="62" fill="var(--muted)">C=0</text>
          <text x="30" y="102" fill="var(--muted)">C=1</text>
          ${[
            ["0", "1", "1", "0"],
            ["0", "1", "1", "0"],
          ]
            .map(
              (row, r) =>
                row
                  .map(
                    (v, i) =>
                      `<rect x="${62 + i * 60}" y="${42 + r * 40}" width="60" height="40" fill="${v === "1" ? "var(--primary)" : "var(--card)"}" opacity="${v === "1" ? "0.18" : "1"}" stroke="var(--border)"/><text x="${92 + i * 60}" y="${67 + r * 40}" text-anchor="middle" fill="var(--text)" font-weight="${v === "1" ? "700" : "400"}">${v}</text>`,
                  )
                  .join(""),
            )
            .join("")}
          <rect x="120" y="46" width="124" height="72" rx="10" fill="none" stroke="#c0392b" stroke-width="2"/>
          <text x="182" y="134" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#c0392b">this group of 4 ones simplifies to just  B</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "Boolean algebra mirrors propositional logic exactly: **AND ↔ ∧, OR ↔ ∨, NOT ↔ ¬**, and the same laws (De Morgan, distributive, duality) apply. Master one and you've mastered both — plus the digital-logic part of Unit 2.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "K-map rules",
      text: "Group only **1s**, in rectangles of size **2ᵏ** (1, 2, 4, 8…), as **large** as possible, wrapping around edges. Bigger groups = fewer variables in the term. Every 1 must be covered at least once.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Minimise a function with a K-map, convert between SOP/POS and minterm/maxterm lists, apply Boolean laws (especially De Morgan & absorption), and use duality. Don't-care terms (×) may be grouped to enlarge groups.",
    },
  ],

  "optimization": [
    {
      kind: "p",
      text: "**Optimization** finds the *best* outcome — maximum profit, minimum cost — subject to limits. **Linear Programming (LP)** is the core case: a linear **objective** to maximise/minimise under linear **constraints** (inequalities).",
    },
    {
      kind: "p",
      text: "With two variables you can solve it by **graphing**. The constraints carve out a **feasible region** (a convex polygon). The magic fact below makes the rest easy:",
    },
    {
      kind: "diagram",
      caption: "Shade the feasible region; the optimum sits on a CORNER (vertex), never inside.",
      svg: `<svg viewBox="0 0 384 150" role="img" aria-label="LP feasible region">
        <line x1="40" y1="120" x2="360" y2="120" stroke="var(--muted)"/>
        <line x1="40" y1="120" x2="40" y2="14" stroke="var(--muted)"/>
        <text x="356" y="138" font-size="10" fill="var(--muted)">x</text>
        <text x="24" y="22" font-size="10" fill="var(--muted)">y</text>
        <polygon points="40,120 40,50 120,30 220,70 230,120" fill="var(--primary)" opacity="0.18" stroke="var(--primary)"/>
        <g fill="var(--primary)">
          <circle cx="40" cy="50" r="4"/><circle cx="120" cy="30" r="4"/><circle cx="220" cy="70" r="4"/><circle cx="230" cy="120" r="4"/><circle cx="40" cy="120" r="4"/>
        </g>
        <text x="128" y="26" font-size="9" fill="var(--text)">optimum is at one of these corners</text>
        <line x1="250" y1="36" x2="320" y2="92" stroke="#c0392b" stroke-dasharray="4 3"/>
        <text x="300" y="34" font-size="9" fill="#c0392b">objective line</text>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**The optimum of an LP always lies at a vertex (corner point) of the feasible region.** So you just evaluate the objective at each corner and pick the best — that's the whole graphical method, and the idea the **Simplex** method automates for many variables.",
    },
    {
      kind: "ul",
      items: [
        "**Simplex method** walks corner-to-corner toward the optimum when there are too many variables to graph; **duality** pairs every LP with a related one whose optimum value matches.",
        "**Transportation & assignment** problems are special LPs solved by table methods (e.g. Hungarian method for assignment).",
        "**PERT/CPM** schedules projects: the **critical path** is the longest chain of dependent tasks — it fixes the minimum project duration.",
      ],
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Evaluate the objective at feasible-region corners to find the optimum, write an LP in standard form, and compute a PERT critical path / project duration. ‘Optimum at a vertex’ answers most graphical questions.",
    },
  ],

  // ===================================================================
  // UNIT 2 — COMPUTER SYSTEM ARCHITECTURE (educational, beginner→advanced)
  // ===================================================================
  "digital-logic-circuits": [
    {
      kind: "p",
      text: "Computers ultimately do everything with **two voltages** — call them 0 and 1. **Logic gates** are tiny circuits that take 0/1 inputs and produce a 0/1 output. Stack enough of them and you get adders, memory, and a whole CPU.",
    },
    {
      kind: "diagram",
      caption: "The basic gates and what they output (1 = true).",
      svg: `<svg viewBox="0 0 384 132" role="img" aria-label="Logic gates">
        <g stroke="var(--primary)" stroke-width="2" fill="none">
          <path d="M40,28 L40,60 L74,44 Z"/><circle cx="79" cy="44" r="5"/>
          <path d="M150,26 L150,62 L168,62 A18,18 0 0 0 168,26 Z"/>
          <path d="M250,26 Q262,44 250,62 Q280,62 296,44 Q280,26 250,26 Z"/>
          <path d="M340,26 Q352,44 340,62 Q370,62 386,44 Q370,26 340,26 Z"/><path d="M334,26 Q346,44 334,62"/>
        </g>
        <g font-size="10" fill="var(--muted)" text-anchor="middle">
          <text x="56" y="80">NOT</text><text x="56" y="92" fill="var(--text)">flips input</text>
          <text x="166" y="80">AND</text><text x="166" y="92" fill="var(--text)">1 if all 1</text>
          <text x="270" y="80">OR</text><text x="270" y="92" fill="var(--text)">1 if any 1</text>
          <text x="360" y="80">XOR</text><text x="360" y="92" fill="var(--text)">1 if differ</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**NAND and NOR are ‘universal’ gates** — any circuit can be built from NAND alone (or NOR alone). That's why chips are mass-produced from them. (NAND = AND then NOT; NOR = OR then NOT.)",
    },
    { kind: "h", text: "Two families of circuits" },
    {
      kind: "table",
      head: ["Type", "Output depends on", "Examples"],
      rows: [
        ["Combinational", "only the current inputs", "Adder, Decoder, Multiplexer, Encoder"],
        ["Sequential", "current inputs + stored state (memory)", "Flip-flops, Registers, Counters"],
      ],
    },
    {
      kind: "ul",
      items: [
        "A **flip-flop** stores 1 bit. Types: **SR, D, JK, T**. The **JK** removes SR's invalid state; **T** (toggle) flips on each clock.",
        "A **decoder** turns an n-bit code into one active line out of 2ⁿ; a **multiplexer (MUX)** selects one of 2ⁿ inputs onto a single output (the reverse is a **demultiplexer**).",
      ],
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A **multiplexer** is a railway switch: many incoming tracks, but the *select* lever decides which single train passes through. n select lines choose among 2ⁿ inputs.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute a gate/circuit output, recall NAND & NOR are universal, count select lines for a MUX (2ⁿ inputs need n select lines), and match flip-flop type ↔ behaviour (JK has no invalid state, T toggles).",
    },
  ],

  "data-representation": [
    {
      kind: "p",
      text: "Inside the machine, *everything* — numbers, letters, colours — is a pattern of bits. **Data representation** is the set of agreed rules for encoding values, and how the computer does arithmetic on them.",
    },
    { kind: "h", text: "Number systems & conversion" },
    {
      kind: "p",
      text: "The same value has different shapes in **binary (base 2), octal (8), decimal (10), hexadecimal (16)**. Group binary in 3s for octal, in 4s for hex.",
    },
    { kind: "h", text: "Signed numbers — 2's complement" },
    {
      kind: "p",
      text: "To store negatives, computers almost always use **2's complement**: to negate a number, **invert every bit and add 1**. It lets one adder handle both addition and subtraction.",
    },
    {
      kind: "diagram",
      caption: "Making −5 from +5 in an 8-bit register.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Two's complement of five">
        <g font-family="monospace" font-size="13">
          <text x="20" y="28" fill="var(--muted)" font-size="10" font-family="sans-serif">+5</text>
          <text x="120" y="28" fill="var(--text)">0000 0101</text>
          <text x="20" y="54" fill="var(--muted)" font-size="10" font-family="sans-serif">invert</text>
          <text x="120" y="54" fill="var(--text)">1111 1010</text>
          <text x="20" y="80" fill="var(--muted)" font-size="10" font-family="sans-serif">+ 1</text>
          <text x="120" y="80" fill="#c0392b" font-weight="700">1111 1011</text>
          <text x="270" y="80" fill="#c0392b" font-size="11" font-family="sans-serif">= −5</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "An **n-bit 2's complement** register holds values from **−2ⁿ⁻¹ to +2ⁿ⁻¹−1** (e.g. 8 bits → −128…+127). The leftmost bit is the **sign** (1 = negative). There is only **one** zero — a key advantage over 1's complement.",
    },
    { kind: "h", text: "Real numbers — floating point" },
    {
      kind: "p",
      text: "Fractions use **floating point** (IEEE 754): a number is stored as **sign · mantissa · 2^exponent**. Single precision = 32 bits (1 sign + 8 exponent + 23 mantissa); double = 64 bits.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Convert between bases, take a 2's complement and do signed add/subtract, state the value range of an n-bit register (−2ⁿ⁻¹ … 2ⁿ⁻¹−1), and break down the IEEE-754 sign/exponent/mantissa fields.",
    },
  ],

  "register-transfer": [
    {
      kind: "p",
      text: "Inside the CPU, work happens by **moving and transforming the contents of registers**. We describe this precisely with **Register Transfer Language (RTL)** — a compact notation for what moves where on each clock pulse.",
    },
    {
      kind: "formula",
      text: "R2 ← R1        (copy contents of R1 into R2)",
    },
    {
      kind: "p",
      text: "Registers usually share a **common bus**: a control signal picks which register drives the bus, and which register reads from it. This saves wiring versus connecting every register to every other.",
    },
    {
      kind: "diagram",
      caption: "Many registers, one shared bus; select lines choose the source.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Common bus transfer">
        <g font-size="11">
          <line x1="40" y1="90" x2="344" y2="90" stroke="var(--primary)" stroke-width="3"/>
          <text x="350" y="94" fill="var(--muted)" font-size="9">bus</text>
          ${["R1", "R2", "R3"]
            .map((r, i) => `<rect x="${60 + i * 100}" y="24" width="60" height="30" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="${90 + i * 100}" y="44" text-anchor="middle" fill="var(--text)" font-weight="700">${r}</text><line x1="${90 + i * 100}" y1="54" x2="${90 + i * 100}" y2="90" stroke="var(--muted)"/>`)
            .join("")}
        </g>
      </svg>`,
    },
    { kind: "h", text: "Micro-operations" },
    {
      kind: "ul",
      items: [
        "**Arithmetic:** add, subtract, increment, decrement (R3 ← R1 + R2).",
        "**Logic:** AND, OR, XOR, complement — bit-by-bit.",
        "**Shift:** logical (fill 0), arithmetic (keep sign), circular/rotate (wrap bits around).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A **micro-operation** is one elementary action done on data in registers during a single clock pulse. Whole instructions are just *sequences* of micro-operations — this is the bridge to control unit design.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Read/predict an RTL statement's effect, compute the result of a shift (logical vs arithmetic vs circular), and count bus/selection lines. A 2ⁿ-register bus needs an n-bit select.",
    },
  ],

  "basic-computer-org": [
    {
      kind: "p",
      text: "A basic computer follows the **stored-program** idea: instructions *and* data live together in memory. The CPU repeatedly **fetches, decodes, and executes** instructions — the famous **instruction cycle**.",
    },
    {
      kind: "diagram",
      caption: "The instruction cycle repeats forever (with an interrupt check each round).",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Instruction cycle">
        <g font-size="11">
          ${([
            ["Fetch", 70],
            ["Decode", 175],
            ["Execute", 285],
          ] as [string, number][])
            .map(([t, x]) => `<rect x="${x - 38}" y="40" width="76" height="34" rx="17" fill="var(--primary)" opacity="0.85"/><text x="${x}" y="62" text-anchor="middle" fill="#fff" font-weight="700">${t}</text>`)
            .join("")}
          <line x1="110" y1="57" x2="135" y2="57" stroke="var(--muted)" stroke-width="2" marker-end="url(#ic)"/>
          <line x1="215" y1="57" x2="245" y2="57" stroke="var(--muted)" stroke-width="2" marker-end="url(#ic)"/>
          <path d="M285,76 Q285,110 178,110 Q70,110 70,76" fill="none" stroke="var(--muted)" stroke-width="2" marker-end="url(#ic)"/>
          <text x="178" y="124" text-anchor="middle" fill="var(--muted)" font-size="9">repeat (check interrupt)</text>
        </g>
        <defs><marker id="ic" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Register", "Role"],
      rows: [
        ["PC — Program Counter", "Address of the NEXT instruction"],
        ["AR — Address Register", "Address currently sent to memory"],
        ["IR — Instruction Register", "Holds the instruction being executed"],
        ["AC — Accumulator", "Main register for results"],
        ["DR — Data Register", "Holds data read from / written to memory"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Direct vs indirect addressing:** direct → the instruction holds the operand's address; indirect → it holds the address *of* the address (one extra memory lookup). Indirect needs **more memory accesses** but allows pointers.",
    },
    {
      kind: "p",
      text: "An **interrupt** lets a device grab the CPU's attention: the current state is saved, the CPU services the device, then resumes — checked at the end of each instruction cycle.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match register ↔ function (PC = next address!), order the instruction-cycle phases, count memory accesses for direct vs indirect, and recall when interrupts are serviced (after the current instruction).",
    },
  ],

  "programming-basic-computer": [
    {
      kind: "p",
      text: "The CPU only understands **machine language** (raw binary). Humans write **assembly language** — short mnemonics like `ADD`, `LDA`, `STA` — and an **assembler** translates it to machine code.",
    },
    {
      kind: "table",
      head: ["Level", "Looks like", "Who runs it"],
      rows: [
        ["Machine language", "0001 0000 0110…", "the CPU directly"],
        ["Assembly language", "LDA X · ADD Y · STA Z", "assembler → machine code"],
        ["High-level language", "z = x + y", "compiler/interpreter → lower levels"],
      ],
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Assembly is a **human-readable nickname** for machine code: `ADD` instead of `0001…`. The **assembler** is the translator that swaps nicknames back to the binary the CPU expects.",
    },
    {
      kind: "ul",
      items: [
        "A **two-pass assembler**: pass 1 builds a **symbol table** (labels → addresses); pass 2 generates the machine code.",
        "**Program loops** repeat code using a counter and a conditional branch.",
        "A **subroutine** (function) is called and returns to where it left off — the **return address** is saved (often on a stack).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The key idea: each layer **translates down** to the one below. Assembly ↔ machine is essentially 1-to-1; high-level languages are 1-to-many (one statement → many machine instructions).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify the role of the assembler & symbol table, distinguish machine vs assembly vs high-level, and trace a small assembly loop. Subroutine = save return address is a common one-liner.",
    },
  ],

  "microprogrammed-control": [
    {
      kind: "p",
      text: "The **control unit** generates the signals that drive every micro-operation. There are two ways to build it: **hardwired** (fixed logic gates) or **microprogrammed** (signals stored as words in a small memory).",
    },
    {
      kind: "diagram",
      caption: "Microprogrammed control: each address in control memory holds a 'control word' of signals + the next address.",
      svg: `<svg viewBox="0 0 384 116" role="img" aria-label="Microprogrammed control unit">
        <g font-size="10.5">
          <rect x="20" y="40" width="70" height="34" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="55" y="61" text-anchor="middle" fill="var(--text)">CAR</text>
          <rect x="130" y="40" width="100" height="34" rx="5" fill="var(--primary)" opacity="0.85"/><text x="180" y="61" text-anchor="middle" fill="#fff">Control Memory</text>
          <rect x="270" y="40" width="94" height="34" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="317" y="57" text-anchor="middle" fill="var(--text)">control word</text><text x="317" y="69" text-anchor="middle" fill="var(--muted)" font-size="8">(signals)</text>
          <line x1="90" y1="57" x2="128" y2="57" stroke="var(--muted)" marker-end="url(#mc)"/>
          <line x1="230" y1="57" x2="268" y2="57" stroke="var(--muted)" marker-end="url(#mc)"/>
          <path d="M317,74 Q317,100 55,100 Q55,90 55,76" fill="none" stroke="var(--muted)" marker-end="url(#mc)"/>
          <text x="186" y="113" text-anchor="middle" fill="var(--muted)" font-size="9">next-address feedback</text>
        </g>
        <defs><marker id="mc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "table",
      head: ["", "Hardwired", "Microprogrammed"],
      rows: [
        ["Built from", "logic gates / flip-flops", "control words in memory"],
        ["Speed", "faster", "slower (memory lookups)"],
        ["Flexibility", "rigid — hard to change", "easy to modify/extend"],
        ["Suits", "RISC (simple instructions)", "CISC (complex instructions)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Trade-off in one line: **hardwired = fast but inflexible; microprogrammed = flexible but slower.** Address sequencing decides which control word runs next.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compare hardwired vs microprogrammed (speed/flexibility), define control memory & control word, and link RISC→hardwired, CISC→microprogrammed.",
    },
  ],

  "cpu": [
    {
      kind: "p",
      text: "The **CPU** is the brain that executes instructions. Its design choices — how registers are arranged, what an instruction looks like, and how it finds operands — decide a machine's speed and style (**RISC** vs **CISC**).",
    },
    { kind: "h", text: "Instruction formats" },
    {
      kind: "p",
      text: "An instruction packs an **opcode** (what to do) plus where the operands are. Designs differ by how many addresses each instruction carries:",
    },
    {
      kind: "table",
      head: ["Format", "Example", "Uses"],
      rows: [
        ["3-address", "ADD R1, R2, R3", "fewest instructions, longer words"],
        ["2-address", "ADD R1, R2", "common in CISC"],
        ["1-address", "ADD M (uses accumulator)", "simple CPUs"],
        ["0-address", "ADD (uses a stack)", "stack machines"],
      ],
    },
    { kind: "h", text: "Addressing modes — how to find the operand" },
    {
      kind: "diagram",
      caption: "Direct: the address field points at the data. Indirect: it points at a location that holds the address.",
      svg: `<svg viewBox="0 0 384 116" role="img" aria-label="Direct versus indirect addressing">
        <g font-size="10">
          <text x="70" y="16" text-anchor="middle" font-weight="700" fill="var(--primary)">Direct</text>
          <rect x="20" y="26" width="100" height="26" rx="4" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="70" y="43" text-anchor="middle" fill="var(--text)">addr → 500</text>
          <rect x="40" y="74" width="60" height="26" rx="4" fill="var(--card)" stroke="var(--muted)"/><text x="70" y="91" text-anchor="middle" fill="var(--text)">DATA</text>
          <line x1="70" y1="52" x2="70" y2="74" stroke="var(--muted)" marker-end="url(#am)"/>
          <text x="290" y="16" text-anchor="middle" font-weight="700" fill="var(--primary)">Indirect</text>
          <rect x="240" y="26" width="100" height="26" rx="4" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="290" y="43" text-anchor="middle" fill="var(--text)">addr → 500</text>
          <rect x="240" y="62" width="100" height="22" rx="4" fill="var(--card)" stroke="var(--muted)"/><text x="290" y="77" text-anchor="middle" fill="var(--text)" font-size="9">500 holds → 800</text>
          <rect x="258" y="92" width="64" height="20" rx="4" fill="var(--card)" stroke="var(--muted)"/><text x="290" y="106" text-anchor="middle" fill="var(--text)" font-size="9">DATA</text>
          <line x1="290" y1="52" x2="290" y2="62" stroke="var(--muted)" marker-end="url(#am)"/>
          <line x1="290" y1="84" x2="290" y2="92" stroke="var(--muted)" marker-end="url(#am)"/>
        </g>
        <defs><marker id="am" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Immediate** — operand is *in* the instruction. **Register** — operand is in a register.",
        "**Direct** — address field is the operand's address. **Indirect** — address field points to the address.",
        "**Indexed / Base / Relative** — effective address = a register + an offset (great for arrays & loops).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**RISC vs CISC:** RISC = few, simple, fixed-length instructions, many registers, mostly hardwired, one instruction per cycle. CISC = many complex variable-length instructions, microprogrammed. RISC trades instruction richness for **speed and pipelining**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute the **effective address** for a given mode, identify a 0/1/2/3-address format, and contrast RISC vs CISC. ‘Indirect needs an extra memory reference’ and ‘stack machine = 0-address’ are favourites.",
    },
  ],

  "pipeline-vector": [
    {
      kind: "p",
      text: "**Pipelining** speeds up the CPU like an assembly line: while one instruction is being executed, the next is being decoded, and a third is being fetched — all at once. No single instruction finishes faster, but **more finish per second**.",
    },
    {
      kind: "diagram",
      caption: "4 instructions through a 4-stage pipeline: stages overlap across clock cycles.",
      svg: `<svg viewBox="0 0 384 132" role="img" aria-label="Pipeline space-time diagram">
        <g font-size="9">
          ${["I1", "I2", "I3", "I4"].map((ins, r) => `<text x="14" y="${42 + r * 22}" fill="var(--text)" font-weight="700">${ins}</text>`).join("")}
          ${["F", "D", "E", "W"]
            .map((stage, s) =>
              [0, 1, 2, 3]
                .map(
                  (r) =>
                    `<rect x="${36 + (s + r) * 42}" y="${30 + r * 22}" width="40" height="18" rx="3" fill="var(--primary)" opacity="${0.35 + s * 0.15}"/><text x="${56 + (s + r) * 42}" y="${43 + r * 22}" text-anchor="middle" fill="#fff" font-size="9">${stage}</text>`,
                )
                .join(""),
            )
            .join("")}
          <text x="200" y="126" text-anchor="middle" fill="var(--muted)">clock cycles →   (F=fetch, D=decode, E=execute, W=write-back)</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "For a **k-stage** pipeline running **n** instructions: total time = **(k + n − 1)** cycles instead of n·k. Ideal **speedup → k** for large n. The catch is **hazards** that stall the line.",
    },
    {
      kind: "ul",
      items: [
        "**Structural hazard** — two stages need the same resource at once.",
        "**Data hazard** — an instruction needs a result not yet produced (fixed by forwarding/stalls).",
        "**Control hazard** — a branch changes what comes next (fixed by branch prediction).",
      ],
    },
    {
      kind: "p",
      text: "**Vector / array processors** push parallelism further: one instruction operates on a whole **array** of data at once (SIMD) — ideal for graphics and scientific computing.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute pipeline cycles **(k + n − 1)**, speedup and efficiency, and identify the hazard type. Numerical pipeline questions appear almost every cycle — practise the formula.",
    },
  ],

  "io-organization": [
    {
      kind: "p",
      text: "The CPU must exchange data with slow outside devices (keyboard, disk, printer). **I/O organization** is about *how* that transfer is coordinated without wasting the fast CPU's time.",
    },
    {
      kind: "table",
      head: ["Mode", "How it works", "CPU involvement"],
      rows: [
        ["Programmed I/O", "CPU keeps polling the device's status", "Highest — CPU busy-waits"],
        ["Interrupt-driven", "Device interrupts the CPU when ready", "Medium — CPU works meanwhile"],
        ["DMA", "A controller moves data directly to/from memory", "Lowest — CPU only sets up & is told when done"],
      ],
    },
    {
      kind: "diagram",
      caption: "DMA: the controller transfers a whole block between device and memory, freeing the CPU.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="DMA data path">
        <g font-size="10">
          <rect x="20" y="40" width="70" height="34" rx="5" fill="var(--card)" stroke="var(--muted)"/><text x="55" y="61" text-anchor="middle" fill="var(--text)">CPU</text>
          <rect x="157" y="40" width="70" height="34" rx="5" fill="var(--primary)" opacity="0.85"/><text x="192" y="61" text-anchor="middle" fill="#fff">DMA</text>
          <rect x="294" y="14" width="70" height="30" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="329" y="33" text-anchor="middle" fill="var(--text)">Memory</text>
          <rect x="294" y="70" width="70" height="30" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="329" y="89" text-anchor="middle" fill="var(--text)">Device</text>
          <line x1="90" y1="57" x2="155" y2="57" stroke="var(--muted)" stroke-dasharray="3 2"/><text x="120" y="51" text-anchor="middle" fill="var(--muted)" font-size="8">setup</text>
          <line x1="227" y1="50" x2="292" y2="32" stroke="var(--primary)" stroke-width="2" marker-end="url(#io)"/>
          <line x1="227" y1="64" x2="292" y2="82" stroke="var(--primary)" stroke-width="2" marker-end="url(#io)"/>
        </g>
        <defs><marker id="io" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--primary)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**DMA (Direct Memory Access)** is the efficient choice for **bulk transfers** (e.g. disk ↔ memory): the CPU is interrupted only once at the end, instead of handling every byte. It briefly 'steals' bus cycles from the CPU.",
    },
    {
      kind: "p",
      text: "When several devices interrupt at once, a **priority** scheme decides order — e.g. a **daisy chain** (devices closer to the CPU win) or a parallel priority encoder.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Rank the three transfer modes by CPU involvement, explain DMA & cycle stealing, and resolve interrupt priority (daisy chain = nearest device highest). DMA for bulk transfer is the classic answer.",
    },
  ],

  "memory-hierarchy": [
    {
      kind: "p",
      text: "Fast memory is expensive and small; cheap memory is large and slow. The fix is a **hierarchy** — keep what you're using *now* in tiny fast memory, and the rest further down. It works because programs show **locality** (they reuse nearby data).",
    },
    {
      kind: "diagram",
      caption: "Top = fastest & smallest (most expensive per bit); bottom = slowest & largest.",
      svg: `<svg viewBox="0 0 384 150" role="img" aria-label="Memory hierarchy pyramid">
        <g font-size="10" text-anchor="middle">
          ${[
            ["Registers", 70, "#fff"],
            ["Cache (SRAM)", 130, "#fff"],
            ["Main memory (DRAM)", 200, "#fff"],
            ["SSD / Disk", 280, "var(--text)"],
            ["Tape / Cloud", 360, "var(--text)"],
          ]
            .map(([label, w, col], i) => `<rect x="${192 - Number(w) / 2}" y="${10 + i * 26}" width="${w}" height="22" rx="3" fill="var(--primary)" opacity="${0.85 - i * 0.15}"/><text x="192" y="${25 + i * 26}" fill="${col}">${label}</text>`)
            .join("")}
          <text x="20" y="22" fill="var(--muted)" font-size="9" text-anchor="start">fast</text>
          <text x="20" y="140" fill="var(--muted)" font-size="9" text-anchor="start">slow</text>
        </g>
      </svg>`,
    },
    { kind: "h", text: "Cache — the speed multiplier" },
    {
      kind: "p",
      text: "**Cache** sits between CPU and main memory, holding recently used blocks. A request that's found is a **hit**; otherwise a **miss** (fetch from main memory).",
    },
    {
      kind: "formula",
      text: "Effective access time = (Hit ratio × cache time) + (Miss ratio × memory time)",
    },
    {
      kind: "ul",
      items: [
        "**Mapping:** *Direct* (each block → one fixed line), *Associative* (block → any line), *Set-associative* (block → any line within a set).",
        "**Virtual memory** uses disk to pretend RAM is larger; the **page table** maps virtual → physical pages, and a missing page causes a **page fault**.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two ideas power the whole topic: **locality** (recent/nearby data is reused) makes caching work, and **effective access time** (above) quantifies the payoff. A high hit ratio is everything.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute effective access time and hit ratio, work out cache mapping (which line/set a block goes to), and reason about page faults & virtual-to-physical translation. Frames = physical memory ÷ page size is a common sub-step.",
    },
  ],

  "multiprocessors": [
    {
      kind: "p",
      text: "A **multiprocessor** has several CPUs sharing the work to go faster than one ever could. The big questions are how they're **connected**, how they stay **consistent**, and how we **classify** such parallel machines.",
    },
    { kind: "h", text: "Flynn's taxonomy — the classic classification" },
    {
      kind: "diagram",
      caption: "Classify by how many Instruction streams × Data streams run at once.",
      svg: `<svg viewBox="0 0 384 134" role="img" aria-label="Flynn's taxonomy">
        <g font-size="11" text-anchor="middle">
          <text x="120" y="16" fill="var(--muted)" font-size="9">single data</text>
          <text x="280" y="16" fill="var(--muted)" font-size="9">multiple data</text>
          <text x="22" y="48" fill="var(--muted)" font-size="9" transform="rotate(-90 22 48)">1 instr</text>
          <text x="22" y="104" fill="var(--muted)" font-size="9" transform="rotate(-90 22 104)">N instr</text>
          ${[
            ["SISD", "ordinary PC", 0, 0],
            ["SIMD", "vector / GPU", 1, 0],
            ["MISD", "rare", 0, 1],
            ["MIMD", "multicore", 1, 1],
          ]
            .map(([t, d, c, r]) => `<rect x="${44 + Number(c) * 162}" y="${24 + Number(r) * 56}" width="150" height="48" rx="6" fill="var(--primary)" opacity="${t === "MISD" ? 0.3 : 0.85}"/><text x="${119 + Number(c) * 162}" y="${46 + Number(r) * 56}" fill="#fff" font-weight="700">${t}</text><text x="${119 + Number(c) * 162}" y="${62 + Number(r) * 56}" fill="#fff" font-size="9">${d}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Interconnection:** shared bus (simple, limited), crossbar switch, or multistage networks.",
        "**Cache coherence:** when each CPU caches the same data, a write by one must not leave others stale — solved by protocols like **MESI** (snooping).",
        "**Multicore:** several CPUs on one chip — today's mainstream MIMD.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Flynn's taxonomy** is the must-know: **SISD** (normal PC), **SIMD** (one instruction on many data — GPUs/vector), **MISD** (rare), **MIMD** (independent cores — multicore). Cache coherence is the price of shared data.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Classify a machine by Flynn's taxonomy (SIMD = vector/GPU, MIMD = multicore), explain cache coherence and the need for it, and compare interconnection structures.",
    },
  ],

  // ===================================================================
  // UNIT 3 — PROGRAMMING LANGUAGES & COMPUTER GRAPHICS (educational)
  // ===================================================================
  "language-design": [
    {
      kind: "p",
      text: "Different problems suit different styles of language. A **programming paradigm** is a *way of thinking* about a program — and most modern languages mix several. Knowing the four families lets you place any language quickly.",
    },
    {
      kind: "diagram",
      caption: "The four paradigms — how each one tells the computer what to do.",
      svg: `<svg viewBox="0 0 384 116" role="img" aria-label="Programming paradigms">
        <g font-size="10" text-anchor="middle">
          ${[
            ["Imperative", "step-by-step (C)"],
            ["Object-Oriented", "objects (Java, C++)"],
            ["Functional", "math functions (Lisp)"],
            ["Logic", "rules & facts (Prolog)"],
          ]
            .map((d, i) => `<rect x="${12 + i * 92}" y="30" width="84" height="48" rx="6" fill="var(--primary)" opacity="0.85"/><text x="${54 + i * 92}" y="52" fill="#fff" font-weight="700">${d[0]}</text><text x="${54 + i * 92}" y="68" fill="#fff" font-size="8">${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    { kind: "h", text: "From source code to running program" },
    {
      kind: "ul",
      items: [
        "**Syntax** = grammar (the *form*); **semantics** = meaning. A program can be syntactically correct yet semantically wrong.",
        "**Binding time** — when a name gets its value/type/address fixed: at compile time (**static**, faster) or run time (**dynamic**, more flexible).",
        "Source code is turned into runnable form by a **translator** — covered in depth in Unit 8.",
      ],
    },
    {
      kind: "table",
      head: ["", "Compiler", "Interpreter"],
      rows: [
        ["Translates", "the whole program at once", "line by line as it runs"],
        ["Speed", "fast execution", "slower execution"],
        ["Errors", "reported after full scan", "stops at the first error"],
        ["Example", "C, C++", "Python, classic BASIC"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Compiler vs interpreter:** a compiler translates *ahead of time* (one fast executable); an interpreter translates *on the fly* (flexible, easier to debug, slower). Java does both — compile to bytecode, then interpret/JIT.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Classify a language by paradigm, distinguish static vs dynamic binding, and compare compiler vs interpreter. Syntax-vs-semantics and ‘which language is functional/logic’ are common one-liners.",
    },
  ],

  "elementary-data-types": [
    {
      kind: "p",
      text: "A **data type** is two things bundled together: a **set of values** and the **operations** allowed on them. `int` means ‘whole numbers + (+ − × …)’; `bool` means ‘{true, false} + (and, or, not)’. The type tells the compiler how to store and use the bits.",
    },
    {
      kind: "diagram",
      caption: "Scalar types hold one value; composite types are built from others.",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Scalar versus composite data types">
        <g font-size="10" text-anchor="middle">
          <rect x="150" y="8" width="84" height="24" rx="5" fill="var(--primary)" opacity="0.9"/><text x="192" y="24" fill="#fff" font-weight="700">Data Types</text>
          <line x1="192" y1="32" x2="96" y2="50" stroke="var(--border)"/><line x1="192" y1="32" x2="288" y2="50" stroke="var(--border)"/>
          <rect x="40" y="50" width="112" height="22" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="96" y="65" fill="var(--text)" font-weight="700">Scalar (simple)</text>
          <rect x="232" y="50" width="120" height="22" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="292" y="65" fill="var(--text)" font-weight="700">Composite</text>
          <text x="96" y="92" fill="var(--muted)" font-size="9">int · float · char</text>
          <text x="96" y="106" fill="var(--muted)" font-size="9">bool · enum · pointer</text>
          <text x="292" y="92" fill="var(--muted)" font-size="9">array · structure</text>
          <text x="292" y="106" fill="var(--muted)" font-size="9">string · record · set</text>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Scalar (primitive):** a single indivisible value — int, float, char, boolean, enumeration, pointer.",
        "**Composite:** built from other types — array (same type, indexed), structure/record (mixed types), string, set.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A type = **values + operations**. **Strong typing** forbids mixing types without conversion (safer); **static typing** fixes types at compile time, **dynamic** at run time. C is statically & fairly weakly typed; Python is dynamically & strongly typed.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Classify a type as scalar vs composite, and distinguish strong/weak and static/dynamic typing. ‘Array = homogeneous, structure = heterogeneous’ is a frequent distinction.",
    },
  ],

  "programming-c": [
    {
      kind: "p",
      text: "**C** is the classic systems language: small, fast, and close to the hardware. The thing that makes C *C* — and the thing exams love — is the **pointer**: a variable that stores a memory **address**.",
    },
    {
      kind: "diagram",
      caption: "x lives at address 200 and holds 10. Pointer p holds 200, so *p reads 10.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="C pointer concept">
        <g font-size="11">
          <rect x="40" y="40" width="90" height="34" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/>
          <text x="85" y="55" text-anchor="middle" fill="var(--text)" font-weight="700">x = 10</text>
          <text x="85" y="68" text-anchor="middle" fill="var(--muted)" font-size="9">addr 200</text>
          <rect x="250" y="40" width="94" height="34" rx="5" fill="var(--card)" stroke="var(--muted)"/>
          <text x="297" y="55" text-anchor="middle" fill="var(--text)" font-weight="700">p = 200</text>
          <text x="297" y="68" text-anchor="middle" fill="var(--muted)" font-size="9">a pointer to x</text>
          <line x1="250" y1="57" x2="132" y2="57" stroke="var(--primary)" stroke-width="2" marker-end="url(#pt)"/>
          <text x="191" y="50" text-anchor="middle" fill="var(--muted)" font-size="9">*p → 10</text>
        </g>
        <defs><marker id="pt" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--primary)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**&x** = ‘address of x’; **\\*p** = ‘the value p points to’ (dereference).",
        "**Arrays & pointers** are linked: the array name is the address of its first element, and `a[i]` ≡ `*(a + i)`.",
        "**Storage classes** set lifetime & visibility: `auto`, `static`, `register`, `extern`.",
        "**Format specifiers** in printf/scanf: `%d` int, `%f` float, `%c` char, `%s` string, `%x` hex.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Where students lose marks",
      text: "Watch **operator precedence** and **loop bounds** in tracing questions (`i++` vs `++i`, off-by-one). A wrong **format specifier** (e.g. `%d` for a float) gives garbage. Integer division truncates: `5/2 == 2`.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "**Trace a for-loop and give the output**, predict pointer/array expressions, pick the right **format specifier**, and identify a **storage class's** scope/lifetime. C output-prediction numericals are very common — read every `++`, `%`, and condition carefully.",
    },
  ],

  "oop": [
    {
      kind: "p",
      text: "**Object-Oriented Programming** organises code around **objects** — bundles of *data* (attributes) and *behaviour* (methods) — instead of loose functions. A **class** is the blueprint; an **object** is a built instance of it.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A **class** is the *cookie cutter*; **objects** are the *cookies*. One `Car` class can stamp out thousands of car objects, each with its own colour and speed.",
    },
    {
      kind: "diagram",
      caption: "The four pillars every OOP question is built on.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Four pillars of OOP">
        <g font-size="9.5" text-anchor="middle">
          ${[
            ["Encapsulation", "bundle + hide data"],
            ["Abstraction", "show only essentials"],
            ["Inheritance", "reuse from a parent"],
            ["Polymorphism", "one name, many forms"],
          ]
            .map((d, i) => `<rect x="${10 + i * 93}" y="26" width="86" height="56" rx="6" fill="var(--primary)" opacity="${0.6 + i * 0.1}"/><text x="${53 + i * 93}" y="50" fill="#fff" font-weight="700" font-size="10">${d[0]}</text><text x="${53 + i * 93}" y="66" fill="#fff" font-size="8">${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Pillar", "Plain meaning"],
      rows: [
        ["Encapsulation", "Keep data + methods together and hide internals (private fields, public methods)."],
        ["Abstraction", "Expose what an object does, hide how (interface vs implementation)."],
        ["Inheritance", "A child class reuses & extends a parent class (‘is-a’ relationship)."],
        ["Polymorphism", "The same call behaves differently per object (overloading / overriding)."],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Memorise the four pillars: **Encapsulation, Abstraction, Inheritance, Polymorphism**. Encapsulation *hides data*; abstraction *hides complexity*; inheritance *reuses*; polymorphism *adapts behaviour*.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Name the pillar shown by an example, tell class vs object apart, and match feature ↔ pillar (data hiding = encapsulation, ‘is-a’ = inheritance, overriding = polymorphism).",
    },
  ],

  "programming-cpp": [
    {
      kind: "p",
      text: "**C++** is C *plus* object orientation. On top of everything in C, it adds classes, and special member functions that run automatically — the favourites in exams are **constructors** and **destructors**.",
    },
    {
      kind: "diagram",
      caption: "A constructor runs at birth (setup); a destructor runs at death (cleanup).",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="Constructor and destructor lifecycle">
        <line x1="40" y1="50" x2="344" y2="50" stroke="var(--border)" stroke-width="2"/>
        <circle cx="70" cy="50" r="8" fill="#0a8f5b"/><text x="70" y="30" text-anchor="middle" font-size="10" fill="#0a8f5b" font-weight="700">Constructor</text>
        <text x="70" y="74" text-anchor="middle" font-size="8.5" fill="var(--muted)">object created</text>
        <rect x="120" y="44" width="150" height="12" rx="6" fill="var(--primary)" opacity="0.4"/>
        <text x="195" y="40" text-anchor="middle" font-size="9" fill="var(--muted)">object in use</text>
        <circle cx="320" cy="50" r="8" fill="#c0392b"/><text x="320" y="30" text-anchor="middle" font-size="10" fill="#c0392b" font-weight="700">Destructor</text>
        <text x="320" y="74" text-anchor="middle" font-size="8.5" fill="var(--muted)">object destroyed</text>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Constructor:** same name as the class, **no return type**, runs automatically when an object is created. Can be overloaded (default, parameterised, copy).",
        "**Destructor:** `~ClassName()`, no arguments, runs when the object goes out of scope — used to free resources.",
        "**Overloading** = same name, different parameters (compile-time polymorphism). **Virtual functions** = run-time polymorphism via overriding.",
        "**Templates** write type-independent code; **inheritance** can be single, multiple, multilevel or hierarchical.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Constructor rules:** named like the class, **no return type (not even void)**, auto-invoked, overloadable. A **copy constructor** takes a reference to the same class. The **scope-resolution operator `::`** and a few others **cannot be overloaded**.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Common traps",
      text: "Constructors have **no return value** — writing one is an error, not a constructor. **Multiple inheritance** can duplicate a grandparent's members (the *diamond problem*), fixed by **virtual** base classes. Only **virtual** functions give run-time polymorphism.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Predict **constructor/destructor call order**, identify valid constructor signatures, distinguish overloading (compile-time) vs virtual overriding (run-time), and recall which operators can't be overloaded (`::`, `.`, `?:`, `sizeof`).",
    },
  ],

  "web-programming": [
    {
      kind: "p",
      text: "The web is a giant **client–server** conversation: your **browser (client)** asks for a page, a **server** sends it back. Web programming is the set of languages that build and power that exchange.",
    },
    {
      kind: "diagram",
      caption: "Client sends a request; server responds. Some code runs on each side.",
      svg: `<svg viewBox="0 0 384 104" role="img" aria-label="Client server model">
        <g font-size="10">
          <rect x="20" y="36" width="100" height="36" rx="6" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="70" y="54" text-anchor="middle" fill="var(--text)" font-weight="700">Browser</text><text x="70" y="66" text-anchor="middle" fill="var(--muted)" font-size="8">HTML · CSS · JS</text>
          <rect x="264" y="36" width="100" height="36" rx="6" fill="var(--primary)" opacity="0.85"/><text x="314" y="54" text-anchor="middle" fill="#fff" font-weight="700">Server</text><text x="314" y="66" text-anchor="middle" fill="#fff" font-size="8">Java · PHP · servlets</text>
          <line x1="122" y1="46" x2="262" y2="46" stroke="var(--muted)" stroke-width="2" marker-end="url(#wb)"/><text x="192" y="40" text-anchor="middle" fill="var(--muted)" font-size="9">request</text>
          <line x1="262" y1="62" x2="122" y2="62" stroke="var(--primary)" stroke-width="2" marker-end="url(#wb)"/><text x="192" y="78" text-anchor="middle" fill="var(--primary)" font-size="9">response (page)</text>
        </g>
        <defs><marker id="wb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**HTML** structures content with tags; **DHTML** = HTML + CSS + JavaScript for interactivity; **CSS** styles it.",
        "**XML** *describes* data with custom tags — it carries data, it doesn't display it (unlike HTML).",
        "**Client-side** scripting (JavaScript, applets) runs in the browser; **server-side** (servlets, JSP, PHP) runs on the server.",
        "An **applet** runs on the client (in the browser); a **servlet** runs on the server.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The key contrast: **HTML displays data, XML describes data**; **client-side code runs in the browser, server-side runs on the server**. Applet = client, Servlet = server.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify HTML tags & structure, HTML vs XML (display vs describe; XML is case-sensitive & well-formed), and client-side vs server-side (applet vs servlet, JavaScript vs JSP/PHP).",
    },
  ],

  "computer-graphics": [
    {
      kind: "p",
      text: "Computer graphics turns numbers into pictures on a screen made of tiny dots called **pixels**. Two big questions: how does the **display** draw, and how do **algorithms** decide which pixels to light up for a line or circle?",
    },
    {
      kind: "table",
      head: ["", "Raster scan", "Random (vector) scan"],
      rows: [
        ["Draws", "every pixel, row by row", "only the lines of the figure"],
        ["Stores image in", "a frame buffer (pixel memory)", "a display list of commands"],
        ["Best for", "realistic, shaded images", "sharp line drawings"],
      ],
    },
    {
      kind: "diagram",
      caption: "A line on a pixel grid: the algorithm picks the nearest pixels — a tiny ‘staircase’.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Raster line staircase">
        <g>
          ${[0, 1, 2, 3, 4, 5, 6, 7]
            .map((c) => [0, 1, 2, 3].map((r) => `<rect x="${40 + c * 30}" y="${20 + r * 22}" width="30" height="22" fill="none" stroke="var(--border)"/>`).join(""))
            .join("")}
          ${[[0, 3], [1, 3], [2, 2], [3, 2], [4, 1], [5, 1], [6, 0], [7, 0]]
            .map(([c, r]) => `<rect x="${41 + c * 30}" y="${21 + r * 22}" width="28" height="20" fill="var(--primary)" opacity="0.8"/>`)
            .join("")}
          <line x1="40" y1="108" x2="280" y2="20" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="4 3"/>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Line drawing:** **DDA** uses floating-point steps (simpler, slower); **Bresenham** uses only **integer** add/subtract (faster, no rounding) — the preferred algorithm.",
        "**Circles:** the **midpoint circle** algorithm, using 8-way symmetry.",
        "**Filling:** **scan-line** polygon fill, plus **boundary-fill** and **flood-fill** (recursively fill from a seed point).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Raster = pixels in a frame buffer; vector = line commands.** For lines, **Bresenham beats DDA** because it avoids floating-point and rounding using pure integer arithmetic.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compare DDA vs Bresenham (integer vs float), raster vs random scan, and boundary-fill vs flood-fill. ‘Bresenham uses integer arithmetic’ and ‘frame buffer stores the raster image’ are common answers.",
    },
  ],

  "graphics-3d": [
    {
      kind: "p",
      text: "3-D graphics takes objects defined in three dimensions and figures out how to show them on a flat 2-D screen — through **projection**, while deciding what's hidden behind what.",
    },
    {
      kind: "diagram",
      caption: "Parallel projection keeps rays parallel; perspective converges them to the eye (objects shrink with distance).",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Parallel versus perspective projection">
        <g font-size="9.5">
          <text x="96" y="16" text-anchor="middle" font-weight="700" fill="var(--primary)">Parallel</text>
          <line x1="40" y1="34" x2="150" y2="34" stroke="var(--muted)"/><line x1="40" y1="58" x2="150" y2="58" stroke="var(--muted)"/><line x1="40" y1="82" x2="150" y2="82" stroke="var(--muted)"/>
          <line x1="150" y1="24" x2="150" y2="92" stroke="var(--primary)" stroke-width="2"/>
          <text x="288" y="16" text-anchor="middle" font-weight="700" fill="var(--primary)">Perspective</text>
          <circle cx="350" cy="58" r="4" fill="#c0392b"/><text x="350" y="100" text-anchor="middle" fill="#c0392b" font-size="8">eye</text>
          <line x1="230" y1="30" x2="350" y2="58" stroke="var(--muted)"/><line x1="230" y1="58" x2="350" y2="58" stroke="var(--muted)"/><line x1="230" y1="86" x2="350" y2="58" stroke="var(--muted)"/>
          <line x1="230" y1="24" x2="230" y2="92" stroke="var(--primary)" stroke-width="2"/>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Parallel projection** — projection lines stay parallel; keeps true dimensions (used in CAD). **Perspective** — lines converge to a viewpoint, giving a **vanishing point** and realistic foreshortening.",
        "**Curves & surfaces:** **Bezier** and **B-spline** curves are defined by control points; a Bezier curve passes through its first and last control points and stays inside their convex hull.",
        "**Hidden-surface removal:** the **Z-buffer (depth buffer)** keeps the nearest pixel; **back-face culling** drops faces pointing away.",
        "**Illumination models** (ambient, diffuse, specular) plus shading (Gouraud, Phong) make surfaces look lit.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Parallel projection preserves size; perspective adds a vanishing point and depth.** For ‘what's visible’, the **Z-buffer** compares depths pixel-by-pixel — simple and the most common hidden-surface method.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Distinguish parallel vs perspective projection (vanishing point), recall **Bezier curve** properties (endpoints, convex hull, degree = control points − 1), and name hidden-surface methods (Z-buffer, back-face culling).",
    },
  ],


  // ---------------------------------------------------------------------- DBMS
  // ===================================================================
  // UNIT 4 — DATABASE MANAGEMENT SYSTEMS (educational, beginner→advanced)
  // ===================================================================
  "db-concepts-architecture": [
    {
      kind: "p",
      text: "A **DBMS** is software that stores data in an organised way and lets many users query and update it safely. Versus loose files, it gives **controlled redundancy, consistency, security, and concurrent access**.",
    },
    {
      kind: "p",
      text: "Its big design idea is **three levels of abstraction** (the ANSI/SPARC architecture) — separating *what data means* from *how it's stored*, so one can change without breaking the other.",
    },
    {
      kind: "diagram",
      caption: "Three-schema architecture: many user views sit on one logical design, which sits on one physical store.",
      svg: `<svg viewBox="0 0 384 150" role="img" aria-label="Three-schema architecture">
        <g font-size="10" text-anchor="middle">
          ${[0, 1, 2].map((i) => `<rect x="${30 + i * 110}" y="12" width="92" height="26" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="${76 + i * 110}" y="29" fill="var(--text)">View ${i + 1}</text>`).join("")}
          <rect x="92" y="62" width="200" height="26" rx="5" fill="var(--primary)" opacity="0.9"/><text x="192" y="79" fill="#fff" font-weight="700">Conceptual (logical) schema</text>
          <rect x="92" y="112" width="200" height="26" rx="5" fill="var(--primary-l)"/><text x="192" y="129" fill="#fff" font-weight="700">Internal (physical) schema</text>
          <line x1="76" y1="38" x2="150" y2="62" stroke="var(--border)"/><line x1="186" y1="38" x2="192" y2="62" stroke="var(--border)"/><line x1="296" y1="38" x2="234" y2="62" stroke="var(--border)"/>
          <line x1="192" y1="88" x2="192" y2="112" stroke="var(--border)"/>
          <text x="330" y="56" fill="var(--muted)" font-size="8">logical independence</text>
          <text x="330" y="106" fill="var(--muted)" font-size="8">physical independence</text>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**External / View level** — what each user or application sees (custom slices).",
        "**Conceptual / Logical level** — the whole database's structure: entities, relationships, constraints.",
        "**Internal / Physical level** — how bytes, files and indexes are actually stored.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Data independence** is the payoff: **logical** independence = change the conceptual schema without touching user views (harder to achieve); **physical** independence = change storage without touching the logical schema. Also know: **degree** = number of attributes, **cardinality** = number of tuples.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match level ↔ description, define the two data independences (logical is the tougher one), and the degree-vs-cardinality one-liner. DBMS advantages over file systems also appear.",
    },
  ],

  "data-modeling": [
    {
      kind: "p",
      text: "**Data modelling** is the step of deciding *what* to store and *how things relate* — before writing a single table. It moves from a human picture to a precise design through three stages.",
    },
    {
      kind: "ol",
      items: [
        "**Conceptual** — draw an **ER diagram** of entities and relationships (people-friendly).",
        "**Logical** — convert it to the **relational model** (tables, keys, constraints).",
        "**Query** — manipulate the tables with **relational algebra/calculus** (and later SQL).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Think of the flow **ER diagram → tables (relational model) → queries**. The sub-topics below follow exactly that path: ER Diagram, Relational Model, Keys, and Codd's rules for a ‘true’ relational system.",
    },
  ],

  "er-model": [
    {
      kind: "p",
      text: "An **Entity–Relationship (ER) diagram** is a picture of the data: the **things** we store (entities), their **details** (attributes), and how they **connect** (relationships). It's the blueprint before tables exist.",
    },
    {
      kind: "diagram",
      caption: "Rectangle = entity, ellipse = attribute, diamond = relationship.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="ER diagram symbols">
        <g font-size="10" text-anchor="middle">
          <rect x="20" y="46" width="80" height="32" rx="3" fill="var(--primary)" opacity="0.85"/><text x="60" y="66" fill="#fff" font-weight="700">Student</text>
          <polygon points="192,62 226,40 260,62 226,84" fill="var(--primary-l)"/><text x="226" y="65" fill="#fff" font-size="9">enrolls</text>
          <rect x="304" y="46" width="72" height="32" rx="3" fill="var(--primary)" opacity="0.85"/><text x="340" y="66" fill="#fff" font-weight="700">Course</text>
          <line x1="100" y1="62" x2="192" y2="62" stroke="var(--muted)"/><line x1="260" y1="62" x2="304" y2="62" stroke="var(--muted)"/>
          <ellipse cx="60" cy="18" rx="34" ry="13" fill="var(--card)" stroke="var(--primary)"/><text x="60" y="22" fill="var(--text)" font-size="9">roll_no</text>
          <line x1="60" y1="31" x2="60" y2="46" stroke="var(--muted)"/>
          <text x="146" y="55" fill="var(--muted)" font-size="8">M</text><text x="282" y="55" fill="var(--muted)" font-size="8">N</text>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Cardinality** — how many entities relate: 1:1, 1:N, M:N.",
        "**Participation** — *total* (every entity must take part, double line) vs *partial*.",
        "**Weak entity** (double rectangle) — has no key of its own; identified through an owner + a partial key.",
        "**Attributes** — key (underlined), composite, multivalued (double ellipse), derived (dashed).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Converting ER → tables: an **M:N relationship always becomes its own table** (holding both keys as foreign keys); a **multivalued attribute** also becomes a separate table; a 1:N usually folds the ‘1’ side's key into the ‘N’ side.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match symbol ↔ meaning, identify weak vs strong entity and cardinality, and find the **minimum number of tables** for an ER diagram. The M:N → separate table rule is the classic trap.",
    },
  ],

  "relational-model": [
    {
      kind: "p",
      text: "The **relational model** stores data in **relations** — plain tables of **rows (tuples)** over **columns (attributes)**. Its beauty is a small algebra that combines tables to answer any query.",
    },
    {
      kind: "diagram",
      caption: "SELECT (σ) picks rows; PROJECT (π) picks columns.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Select versus project">
        <g font-size="9" font-family="monospace">
          <rect x="40" y="16" width="120" height="88" fill="none" stroke="var(--border)"/>
          ${[0, 1, 2, 3].map((r) => `<line x1="40" y1="${38 + r * 22}" x2="160" y2="${38 + r * 22}" stroke="var(--border)"/>`).join("")}
          <rect x="40" y="60" width="120" height="22" fill="var(--primary)" opacity="0.25"/>
          <text x="100" y="10" text-anchor="middle" font-family="sans-serif" fill="#c0392b" font-size="9">σ row</text>
          <rect x="240" y="16" width="120" height="88" fill="none" stroke="var(--border)"/>
          ${[0, 1, 2, 3].map((r) => `<line x1="240" y1="${38 + r * 22}" x2="360" y2="${38 + r * 22}" stroke="var(--border)"/>`).join("")}
          <rect x="280" y="16" width="40" height="88" fill="var(--primary)" opacity="0.25"/>
          <text x="300" y="10" text-anchor="middle" font-family="sans-serif" fill="#c0392b" font-size="9">π column</text>
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Operator", "Symbol", "Does"],
      rows: [
        ["Select", "σ", "keep rows that match a condition"],
        ["Project", "π", "keep chosen columns (drops duplicates)"],
        ["Union / Minus / Intersect", "∪ − ∩", "set operations (union-compatible tables)"],
        ["Cartesian product", "×", "every row of A paired with every row of B"],
        ["Join", "⋈", "combine related rows across tables"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**σ filters rows, π filters columns** — don't swap them. **Integrity rules:** *entity integrity* = a primary key can't be NULL; *referential integrity* = a foreign key must match an existing primary-key value (or be NULL). Relational **algebra is procedural**; relational **calculus is declarative**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Evaluate an algebra expression's output, σ (rows) vs π (columns), natural/theta/outer joins, and entity vs referential integrity. Remember PROJECT removes duplicate rows; SELECT does not.",
    },
  ],

  "codd-rules": [
    {
      kind: "p",
      text: "**E. F. Codd** invented the relational model and listed **12 rules** (numbered 0–12) that a system must satisfy to be called *truly relational*. You don't memorise all twelve — you grasp the spirit and a few famous ones.",
    },
    {
      kind: "ul",
      items: [
        "**Rule 0 (Foundation):** the system must manage the database entirely through its relational capabilities.",
        "**Information rule:** all data is represented in **tables (relations) only** — even metadata.",
        "**Guaranteed access:** every value is reachable by *table + primary key + column*.",
        "**Systematic NULL handling:** NULLs uniformly represent ‘missing/unknown’, independent of data type.",
        "**Physical & logical data independence:** apps survive changes to storage and (where possible) to schema.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The heart of Codd's rules: **everything is a table, reachable by key, and the database is independent of how it's physically stored.** No commercial DBMS satisfies *all* 12 perfectly.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Recall that there are **12 rules (0–12)**, that the *Information rule* says all data is in tables, and match a described rule to its name. Knowing Codd defined the relational model is itself worth a mark.",
    },
  ],

  "sql": [
    {
      kind: "p",
      text: "**SQL (Structured Query Language)** is how we actually talk to a relational database. It reads almost like English — `SELECT name FROM student WHERE marks > 60` — and splits into sub-languages by job.",
    },
    {
      kind: "table",
      head: ["Sub-language", "Commands", "Purpose"],
      rows: [
        ["DDL (Definition)", "CREATE, ALTER, DROP, TRUNCATE", "define/change structure"],
        ["DML (Manipulation)", "SELECT, INSERT, UPDATE, DELETE", "work with the data"],
        ["DCL (Control)", "GRANT, REVOKE", "permissions"],
        ["TCL (Transaction)", "COMMIT, ROLLBACK, SAVEPOINT", "make changes permanent / undo"],
      ],
    },
    {
      kind: "diagram",
      caption: "A query is logically evaluated in this order — NOT the order you write it.",
      svg: `<svg viewBox="0 0 384 86" role="img" aria-label="SQL logical query order">
        <g font-size="9.5" text-anchor="middle">
          ${["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"]
            .map((s, i) => `<rect x="${6 + i * 63}" y="30" width="56" height="26" rx="5" fill="var(--primary)" opacity="${0.5 + i * 0.08}"/><text x="${34 + i * 63}" y="47" fill="#fff" font-size="8.5">${s}</text>${i < 5 ? `<text x="${64 + i * 63}" y="47" fill="var(--muted)">›</text>` : ""}`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**WHERE** filters individual rows *before* grouping; **HAVING** filters *after* grouping (used with aggregates).",
        "**Aggregates** — COUNT, SUM, AVG, MIN, MAX — mostly **ignore NULLs**.",
        "**DELETE** removes rows (DML, can ROLLBACK); **TRUNCATE** empties a table fast (DDL); **DROP** deletes the table itself.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two ideas answer most SQL questions: the **logical order FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**, and **WHERE vs HAVING** (rows before grouping vs groups after). Also: DELETE ≠ TRUNCATE ≠ DROP.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Predict a query's result, WHERE vs HAVING, classify a command (DDL/DML/DCL/TCL), and DELETE vs TRUNCATE vs DROP. NULL handling in aggregates and the GROUP BY rule are common traps.",
    },
  ],

  "normalization-db": [
    {
      kind: "p",
      text: "This part of the syllabus bundles two big ideas that keep a database **correct under change**: **normalization** (designing tables with no redundancy) and **transaction control** (keeping data consistent when many users act at once).",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Split it mentally: **Normalization** = *good table design* (driven by functional dependencies); **Transactions & Concurrency** = *safe simultaneous access* (serializability, locking, recovery). The two sub-topics below cover each.",
    },
  ],

  "normalization": [
    {
      kind: "p",
      text: "**Normalization** restructures tables to remove **redundancy** and the update/insert/delete **anomalies** it causes. It's driven by **functional dependencies (FDs)** — ‘X → Y’ means *X determines Y* (knowing X fixes Y).",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Storing a student's department head's name in *every* enrollment row is like writing your home address on every page of a notebook — change once and you must fix it everywhere, or risk contradictions. Normalization splits data so each fact is stored **once**.",
    },
    {
      kind: "diagram",
      caption: "Each form is stricter than the one before it.",
      svg: `<svg viewBox="0 0 384 70" role="img" aria-label="Normal forms progression">
        <g font-size="11" text-anchor="middle">
          ${["1NF", "2NF", "3NF", "BCNF", "4NF", "5NF"]
            .map((f, i) => `<rect x="${10 + i * 62}" y="22" width="50" height="26" rx="5" fill="${i < 3 ? "var(--primary-l)" : "var(--primary)"}"/><text x="${35 + i * 62}" y="39" fill="#fff" font-weight="700">${f}</text>${i < 5 ? `<text x="${64 + i * 62}" y="40" fill="var(--muted)" font-size="13">›</text>` : ""}`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Form", "Requires"],
      rows: [
        ["1NF", "Atomic values only — no repeating groups or arrays in a cell."],
        ["2NF", "1NF + no partial dependency (non-key attr on PART of a composite key)."],
        ["3NF", "2NF + no transitive dependency (non-key → non-key)."],
        ["BCNF", "For every FD X → Y, X is a super key (stricter than 3NF)."],
        ["4NF", "BCNF + no non-trivial multivalued dependency."],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A **prime attribute** is part of some candidate key; 2NF/3NF talk about *non-prime* attributes. Strictness: **BCNF ⊃ 3NF ⊃ 2NF ⊃ 1NF**. 3NF is always achievable while staying *dependency-preserving and lossless*; BCNF sometimes sacrifices dependency preservation.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Given FDs, find the **highest normal form** a relation satisfies, name the violating dependency, or decompose losslessly. ‘Partial dependency → fails 2NF’, ‘transitive → fails 3NF’ is the decision tree to memorise.",
    },
  ],

  "enhanced-data-models": [
    {
      kind: "p",
      text: "Plain relational tables aren't ideal for *every* kind of data. **Enhanced data models** extend the database to handle specialised needs — time, media, logic, documents, and distribution.",
    },
    {
      kind: "table",
      head: ["Model", "Handles"],
      rows: [
        ["Temporal", "data that changes over time (valid-time, transaction-time)"],
        ["Multimedia", "images, audio, video — large binary objects"],
        ["Deductive", "facts + rules; derives new facts (Datalog, Prolog-like)"],
        ["Object / Object-Relational", "objects, inheritance, complex types inside the DB"],
        ["Distributed", "data spread across multiple sites, queried as one"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A **distributed database** stores data across sites but presents **one logical database** to users; goals are *transparency* (you don't see the split) and *reliability* (no single point of failure). **Fragmentation** (horizontal/vertical) and **replication** are the core techniques.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match model ↔ use case (temporal = time-varying, deductive = facts+rules), and recall distributed-DB transparency, fragmentation (horizontal = rows, vertical = columns) and replication trade-offs.",
    },
  ],

  "data-warehousing-mining": [
    {
      kind: "p",
      text: "Day-to-day databases (**OLTP**) are tuned for many small transactions. To *analyse* mountains of history, we build a **data warehouse** and run **OLAP**. **Data mining** then digs patterns out of that data.",
    },
    {
      kind: "table",
      head: ["", "OLTP", "OLAP"],
      rows: [
        ["Purpose", "run the business (operational)", "analyse the business (decisions)"],
        ["Operations", "many short INSERT/UPDATE", "few complex read queries"],
        ["Data", "current, detailed", "historical, summarised"],
      ],
    },
    {
      kind: "diagram",
      caption: "Star schema: one central fact table (the measures) surrounded by dimension tables (the context).",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Star schema">
        <g font-size="9" text-anchor="middle">
          <rect x="152" y="50" width="80" height="30" rx="4" fill="var(--primary)" opacity="0.9"/><text x="192" y="69" fill="#fff" font-weight="700">FACT</text>
          ${[
            [40, 14, "Time"],
            [304, 14, "Product"],
            [40, 100, "Customer"],
            [304, 100, "Store"],
          ]
            .map((d) => `<rect x="${d[0]}" y="${d[1]}" width="64" height="26" rx="4" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="${Number(d[0]) + 32}" y="${Number(d[1]) + 17}" fill="var(--text)">${d[2]}</text>`)
            .join("")}
          <line x1="104" y1="32" x2="152" y2="55" stroke="var(--border)"/><line x1="304" y1="32" x2="232" y2="55" stroke="var(--border)"/>
          <line x1="104" y1="108" x2="152" y2="75" stroke="var(--border)"/><line x1="304" y1="108" x2="232" y2="75" stroke="var(--border)"/>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "A **warehouse** is *subject-oriented, integrated, time-variant, non-volatile* (Inmon's definition).",
        "**Data mining** tasks: **classification** (predict a label), **clustering** (group similar), **association rules** (market-basket — measured by *support* & *confidence*, found by Apriori), **regression** (predict a number).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**OLTP runs the business; OLAP analyses it.** In a warehouse, the **fact table** holds numeric measures (sales, quantity) and **dimension tables** hold context (time, product, store) — the **star schema**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "OLTP vs OLAP, fact vs dimension table, the four warehouse properties, and association-rule **support/confidence**. Classification vs clustering (supervised vs unsupervised) is a frequent match.",
    },
  ],

  "big-data": [
    {
      kind: "p",
      text: "When data is too **big, fast, or varied** for one machine and ordinary databases, it's **Big Data**. The answer is to spread storage and computation across **clusters** of cheap machines.",
    },
    {
      kind: "diagram",
      caption: "Big Data is usually described by its V's.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="The V's of Big Data">
        <g font-size="10" text-anchor="middle">
          ${[
            ["Volume", "huge size"],
            ["Velocity", "high speed"],
            ["Variety", "many formats"],
            ["Veracity", "trust/quality"],
          ]
            .map((d, i) => `<circle cx="${56 + i * 92}" cy="40" r="30" fill="var(--primary)" opacity="${0.6 + i * 0.1}"/><text x="${56 + i * 92}" y="40" fill="#fff" font-weight="700" font-size="10">${d[0]}</text><text x="${56 + i * 92}" y="84" fill="var(--muted)" font-size="8.5">${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**HDFS (Hadoop Distributed File System)** stores files in blocks across many nodes; a **NameNode** tracks where everything is, **DataNodes** hold the blocks.",
        "**MapReduce** processes data in two phases: **Map** (transform each chunk in parallel) then **Reduce** (combine the results).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Remember the **V's (Volume, Velocity, Variety, Veracity)** and the **Map → Reduce** pattern (split & process in parallel, then aggregate). HDFS NameNode = the index; DataNodes = the storage.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "List the V's, describe MapReduce phases, and identify HDFS components (NameNode vs DataNode). ‘NameNode stores metadata, not data’ is a common one-liner.",
    },
  ],

  "nosql": [
    {
      kind: "p",
      text: "**NoSQL** (‘Not Only SQL’) databases drop the rigid table model to gain **massive scale and flexible schemas** — ideal for web-scale, rapidly changing data. They come in four main shapes.",
    },
    {
      kind: "table",
      head: ["Type", "Stores data as", "Example use"],
      rows: [
        ["Key-Value", "a big dictionary (key → value)", "caching, sessions (Redis)"],
        ["Document", "JSON-like documents", "content, catalogs (MongoDB)"],
        ["Column-family", "columns grouped by family", "time-series, big tables (Cassandra)"],
        ["Graph", "nodes + edges", "social networks (Neo4j)"],
      ],
    },
    {
      kind: "diagram",
      caption: "CAP theorem: in a distributed system you can guarantee at most TWO of the three.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="CAP theorem triangle">
        <polygon points="192,16 60,104 324,104" fill="var(--primary)" opacity="0.12" stroke="var(--primary)"/>
        <g font-size="11" font-weight="700">
          <text x="192" y="12" text-anchor="middle" fill="var(--text)">Consistency</text>
          <text x="48" y="116" text-anchor="middle" fill="var(--text)">Availability</text>
          <text x="336" y="116" text-anchor="middle" fill="var(--text)">Partition tol.</text>
        </g>
        <text x="192" y="74" text-anchor="middle" font-size="10" fill="var(--muted)">pick any 2</text>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "Four NoSQL families: **Key-Value, Document, Column-family, Graph.** The **CAP theorem** says a distributed store can guarantee only **two of Consistency, Availability, Partition-tolerance** — and since network partitions happen, it's really C vs A.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match NoSQL type ↔ example (MongoDB = document, Cassandra = column, Neo4j = graph, Redis = key-value), and state the **CAP theorem** (at most 2 of C/A/P). NoSQL vs RDBMS trade-offs (scale & flexibility vs strict ACID) also appear.",
    },
  ],

  "dbms-keys": [
    {
      kind: "p",
      text: "A **key** is an attribute (or group of attributes) that lets you **uniquely identify a row** in a table. Keys are how databases avoid duplicates and link tables together — and NET loves making you *count* or *classify* them.",
    },
    {
      kind: "diagram",
      caption: "Keys nest: every primary key is a candidate key, and every candidate key is a super key.",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Key hierarchy">
        <g font-size="11" text-anchor="middle">
          <rect x="40" y="14" width="304" height="102" rx="8" fill="var(--primary)" opacity="0.15"/>
          <text x="192" y="30" fill="var(--text)" font-weight="700">Super keys</text>
          <rect x="80" y="38" width="224" height="64" rx="8" fill="var(--primary)" opacity="0.25"/>
          <text x="192" y="54" fill="var(--text)" font-weight="700">Candidate keys</text>
          <rect x="128" y="62" width="128" height="34" rx="8" fill="var(--primary)" opacity="0.9"/>
          <text x="192" y="83" fill="#fff" font-weight="700">Primary key</text>
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Key", "What it is"],
      rows: [
        ["Super key", "ANY set of attributes that uniquely identifies a row (may have extras)."],
        ["Candidate key", "A **minimal** super key — remove any attribute and it stops being unique."],
        ["Primary key", "The candidate key the designer picks; can't be NULL, can't repeat."],
        ["Alternate key", "A candidate key NOT chosen as the primary key."],
        ["Foreign key", "An attribute referencing another table's primary key (the link between tables)."],
      ],
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A **super key** is *any* ID that works — your full name + address + phone definitely identifies you, but it's bulky. The **candidate key** is the *smallest* ID that still works (like your Aadhaar number). The **primary key** is the one the office officially stamps on your file.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Containment: **Primary ⊆ Candidate ⊆ Super.** To find candidate keys, compute an attribute set's **closure** under the functional dependencies: if X⁺ = all attributes and no smaller subset does, X is a candidate key. Attributes that never appear on the **right** of any FD must be in *every* candidate key.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "‘An alternate key is also called ___’ → candidate key. Given R(A,B,C,D) with FDs, **count the candidate keys** or pick which sets are super keys. Master attribute closure — it answers keys *and* normalization questions.",
    },
  ],

  "dbms-serializability": [
    {
      kind: "p",
      text: "When many **transactions** run at once, their steps interleave. A **schedule** is one such interleaving. The question is: did the interleaving keep the database **correct**? The gold standard is **serializability**.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Two people editing the same shared document at once can overwrite each other's changes. A schedule is *‘serializable’* if the messy interleaving produces the **same result as if they'd taken turns** — one fully, then the other.",
    },
    {
      kind: "p",
      text: "A schedule is **serializable** if it's *equivalent to some serial (one-after-another) order*. The practical test is **conflict serializability**.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two operations **conflict** when they are from **different transactions**, touch the **same data item**, and **at least one is a WRITE**. (Read–Read never conflicts.) Swapping non-conflicting operations doesn't change the outcome — that's what lets us test serializability.",
    },
    { kind: "h", text: "The precedence graph test" },
    {
      kind: "p",
      text: "Draw one node per transaction. Add an edge **Tᵢ → Tⱼ** whenever an operation of Tᵢ conflicts with and comes *before* one of Tⱼ. Then check for a cycle:",
    },
    {
      kind: "diagram",
      caption: "No cycle ⇒ conflict-serializable (order T1→T2→T3). A cycle ⇒ NOT serializable.",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Precedence graphs">
        <g font-size="12" fill="#fff">
          <circle cx="44" cy="65" r="16" fill="var(--primary)"/><text x="44" y="69" text-anchor="middle">T1</text>
          <circle cx="118" cy="65" r="16" fill="var(--primary)"/><text x="118" y="69" text-anchor="middle">T2</text>
          <circle cx="192" cy="65" r="16" fill="var(--primary)"/><text x="192" y="69" text-anchor="middle">T3</text>
          <line x1="60" y1="65" x2="100" y2="65" stroke="var(--muted)" stroke-width="2" marker-end="url(#pg1)"/>
          <line x1="134" y1="65" x2="174" y2="65" stroke="var(--muted)" stroke-width="2" marker-end="url(#pg1)"/>
          <text x="118" y="100" text-anchor="middle" font-size="10" fill="#0a8f5b">acyclic ✓ serializable</text>
          <circle cx="288" cy="50" r="16" fill="var(--primary-l)"/><text x="288" y="54" text-anchor="middle">T1</text>
          <circle cx="350" cy="50" r="16" fill="var(--primary-l)"/><text x="350" y="54" text-anchor="middle">T2</text>
          <line x1="304" y1="46" x2="334" y2="46" stroke="#c0392b" stroke-width="2" marker-end="url(#pg2)"/>
          <line x1="334" y1="56" x2="304" y2="56" stroke="#c0392b" stroke-width="2" marker-end="url(#pg2)"/>
          <text x="319" y="92" text-anchor="middle" font-size="10" fill="#c0392b">cycle ✗</text>
        </g>
        <defs>
          <marker id="pg1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker>
          <marker id="pg2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker>
        </defs>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Conflict serializable ⟺ precedence graph is ACYCLIC.** A topological sort of the graph then gives an equivalent serial order. **View serializability** is broader (every conflict-serializable schedule is view-serializable, not vice-versa).",
    },
    {
      kind: "p",
      text: "To *guarantee* serializable schedules at run time, DBMSs use **concurrency control** — most often **Two-Phase Locking (2PL)**: acquire all locks (growing phase), then release them (shrinking phase). **ACID** (Atomicity, Consistency, Isolation, Durability) is the overall promise; recovery restores it after crashes.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Given a schedule, **draw the precedence graph** and decide conflict serializability (look for a cycle), or give the equivalent serial order. Also: conflict vs view serializability, what a conflict is, and that **2PL guarantees conflict-serializable** schedules.",
    },
  ],

  // ===================================================================
  // UNIT 6 — SOFTWARE ENGINEERING (educational, beginner→advanced)
  // ===================================================================
  "process-models": [
    {
      kind: "p",
      text: "Building software needs a plan, not just coding. A **software process model** is a roadmap of the stages — *requirements, design, code, test, maintain* — and the order in which you tackle them. Different models suit different projects.",
    },
    {
      kind: "diagram",
      caption: "The classic Waterfall: each stage flows into the next, like steps down a cascade.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Waterfall model">
        <g font-size="9" text-anchor="middle">
          ${["Requirements", "Design", "Coding", "Testing", "Maintenance"]
            .map((s, i) => `<rect x="${10 + i * 70}" y="${14 + i * 18}" width="80" height="22" rx="4" fill="var(--primary)" opacity="${0.85 - i * 0.1}"/><text x="${50 + i * 70}" y="${29 + i * 18}" fill="#fff" font-size="8">${s}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Model", "Best when", "Key trait"],
      rows: [
        ["Waterfall", "requirements are clear & fixed", "sequential, rigid, no going back"],
        ["Prototype", "requirements are unclear", "build a sample, refine with user"],
        ["Spiral", "large, high-risk projects", "risk-driven, iterative (Boehm)"],
        ["Iterative/Incremental", "deliver in parts", "build a bit, release, repeat"],
        ["Agile (Scrum, XP)", "changing requirements", "short sprints, constant feedback"],
        ["RAD", "tight deadline, reusable parts", "very fast, component-based"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Match the model to the risk: **Waterfall** = clear & stable requirements; **Prototype** = fuzzy requirements; **Spiral** = risk-driven for big projects; **Agile** = welcomes change via short iterations. The Spiral model is **Boehm's** and is the one explicitly *risk-driven*.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Order the Waterfall phases, match model ↔ trait (Spiral = risk-driven/Boehm, RAD = fast/component-based, Agile = iterative), and sequence the **prototype** model steps. Agile values (working software, responding to change) appear too.",
    },
  ],

  "requirements": [
    {
      kind: "p",
      text: "Before designing anything, you must learn **what the software should do**. **Requirements engineering** gathers, analyses and documents these needs — getting them wrong is the costliest mistake in the whole project.",
    },
    {
      kind: "diagram",
      caption: "From vague needs to a signed-off specification (SRS).",
      svg: `<svg viewBox="0 0 384 76" role="img" aria-label="Requirements process">
        <g font-size="8.5" text-anchor="middle">
          ${["Elicitation", "Analysis", "Specification", "Validation"]
            .map((s, i) => `<rect x="${10 + i * 95}" y="28" width="84" height="26" rx="5" fill="var(--primary)" opacity="${0.5 + i * 0.12}"/><text x="${52 + i * 95}" y="44" fill="#fff" font-size="8.5">${s}</text>${i < 3 ? `<text x="${98 + i * 95}" y="44" fill="var(--muted)">›</text>` : ""}`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Type", "Describes", "Examples"],
      rows: [
        ["Functional", "WHAT the system does", "‘user can log in’, ‘generate invoice’"],
        ["Non-functional", "HOW WELL it does it (qualities)", "performance, security, usability, reliability"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Functional = features; Non-functional = qualities/constraints.** The process ends in an **SRS (Software Requirements Specification)** — the agreed contract. Good requirements are *complete, consistent, unambiguous and verifiable*.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Classify a requirement as functional vs non-functional, order the requirements process (elicit→analyse→specify→validate), and recall the SRS purpose & qualities. ‘Performance/security = non-functional’ is the common item.",
    },
  ],

  "software-design": [
    {
      kind: "p",
      text: "**Design** turns *what* (requirements) into *how* (a structure of modules). The mark of good design is captured by two words you must know cold: **cohesion** and **coupling**.",
    },
    {
      kind: "diagram",
      caption: "Aim for HIGH cohesion inside a module and LOW coupling between modules.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Cohesion and coupling">
        <g font-size="9" text-anchor="middle">
          <text x="96" y="14" font-weight="700" fill="#0a8f5b">High cohesion ✓</text>
          <rect x="50" y="24" width="92" height="66" rx="8" fill="#0a8f5b" opacity="0.12" stroke="#0a8f5b"/>
          ${[[78, 48], [114, 48], [78, 72], [114, 72]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#0a8f5b"/>`).join("")}
          <line x1="78" y1="48" x2="114" y2="72" stroke="#0a8f5b"/><line x1="114" y1="48" x2="78" y2="72" stroke="#0a8f5b"/>
          <text x="288" y="14" font-weight="700" fill="var(--primary)">Low coupling ✓</text>
          <rect x="232" y="34" width="50" height="44" rx="6" fill="var(--primary)" opacity="0.7"/>
          <rect x="312" y="34" width="50" height="44" rx="6" fill="var(--primary)" opacity="0.7"/>
          <line x1="282" y1="56" x2="312" y2="56" stroke="var(--muted)" stroke-dasharray="3 2"/>
          <text x="297" y="50" fill="var(--muted)" font-size="8">thin link</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A module is like a **well-run department**: everyone inside works toward one goal (**high cohesion**), and it depends only loosely on other departments (**low coupling**). That makes it easy to understand, test and change in isolation.",
    },
    {
      kind: "ul",
      items: [
        "**Cohesion** = how focused a single module is (best: *functional* cohesion; worst: *coincidental*).",
        "**Coupling** = how dependent modules are on each other (best: *data* coupling; worst: *content* coupling).",
        "Other principles: **abstraction, modularity, information hiding, functional independence**.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Good design = high cohesion + low coupling.** Cohesion is *within* a module (want it high); coupling is *between* modules (want it low). This single rule drives maintainable, reusable software.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "‘High cohesion, low coupling’ direction, ranking cohesion types (functional best, coincidental worst) and coupling types (data best, content worst), and design principles (information hiding, modularity).",
    },
  ],

  "software-quality": [
    {
      kind: "p",
      text: "**Software quality** is how well software meets requirements *and* user expectations — not just ‘does it run’, but is it reliable, usable, maintainable? Standard frameworks list the factors that make up quality.",
    },
    {
      kind: "table",
      head: ["Framework / term", "Means"],
      rows: [
        ["McCall's factors", "grouped as product Operation, Revision, Transition"],
        ["ISO 9126", "functionality, reliability, usability, efficiency, maintainability, portability"],
        ["Quality Assurance (QA)", "process-focused — prevent defects (do it right)"],
        ["Quality Control (QC)", "product-focused — find defects (check the result)"],
        ["Reliability", "probability of failure-free operation for a given time"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Don't confuse **QA vs QC**: **QA is preventive & process-oriented** (‘are we building it right?’), **QC is detective & product-oriented** (‘did we build it right?’ — testing/inspection). **RMMM** = Risk Mitigation, Monitoring & Management.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "QA vs QC (process vs product), McCall's three factor categories, ISO 9126 attributes, and RMMM for risk. Reliability/availability definitions also appear.",
    },
  ],

  "estimation-scheduling": [
    {
      kind: "p",
      text: "Before committing, a team must estimate **size, effort, cost and time**. Estimation models turn a measure of size into person-months of effort — and the famous one is **COCOMO**.",
    },
    {
      kind: "ul",
      items: [
        "**Size measures:** **LOC** (lines of code) and **Function Points (FP)** — FP counts features (inputs, outputs, files) and is language-independent.",
        "**COCOMO (Constructive Cost Model)** estimates effort from size: **Effort = a · (KLOC)ᵇ** person-months.",
      ],
    },
    {
      kind: "table",
      head: ["COCOMO mode", "Project type", "a, b (basic)"],
      rows: [
        ["Organic", "small team, familiar problem", "2.4, 1.05"],
        ["Semi-detached", "medium size & mixed experience", "3.0, 1.12"],
        ["Embedded", "large, tight constraints", "3.6, 1.20"],
      ],
    },
    {
      kind: "diagram",
      caption: "Effort grows faster than size (exponent b > 1) — bigger projects are disproportionately costly.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="Effort versus size curve">
        <line x1="34" y1="80" x2="360" y2="80" stroke="var(--muted)"/><line x1="34" y1="80" x2="34" y2="12" stroke="var(--muted)"/>
        <path d="M34,80 Q220,74 320,18" fill="none" stroke="var(--primary)" stroke-width="2.5"/>
        <text x="356" y="92" font-size="9" fill="var(--muted)">KLOC →</text>
        <text x="20" y="20" font-size="9" fill="var(--muted)">Effort</text>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**COCOMO modes from simplest to hardest: Organic → Semi-detached → Embedded** (a and b rise across them). **Function points** are computed before code exists and don't depend on language; **Putnam's software equation** links effort, size and time.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Plug numbers into **Effort = a(KLOC)ᵇ**, order the three COCOMO modes & their constants, and FP vs LOC (FP is language-independent). The basic COCOMO formula and modes are common.",
    },
  ],

  "software-testing": [
    {
      kind: "p",
      text: "**Testing** checks that software works and finds defects *before* users do. First, three terms that exams love to separate: an **error** (human mistake) causes a **fault/bug** (in the code), which may cause a **failure** (wrong behaviour at run time).",
    },
    {
      kind: "diagram",
      caption: "Black-box tests behaviour through inputs/outputs; white-box tests the internal code paths.",
      svg: `<svg viewBox="0 0 384 104" role="img" aria-label="Black box versus white box testing">
        <g font-size="9" text-anchor="middle">
          <text x="96" y="14" font-weight="700" fill="var(--primary)">Black-box</text>
          <rect x="56" y="36" width="80" height="40" rx="5" fill="var(--text)" opacity="0.85"/><text x="96" y="60" fill="#fff" font-size="8">? (hidden)</text>
          <line x1="20" y1="56" x2="54" y2="56" stroke="var(--muted)" marker-end="url(#tb)"/><text x="30" y="48" fill="var(--muted)" font-size="8">in</text>
          <line x1="138" y1="56" x2="172" y2="56" stroke="var(--muted)" marker-end="url(#tb)"/><text x="160" y="48" fill="var(--muted)" font-size="8">out</text>
          <text x="290" y="14" font-weight="700" fill="var(--primary)">White-box</text>
          <rect x="250" y="36" width="80" height="40" rx="5" fill="none" stroke="var(--primary)"/>
          <circle cx="268" cy="50" r="4" fill="var(--primary)"/><circle cx="290" cy="62" r="4" fill="var(--primary)"/><circle cx="312" cy="48" r="4" fill="var(--primary)"/>
          <line x1="268" y1="50" x2="290" y2="62" stroke="var(--primary)"/><line x1="290" y1="62" x2="312" y2="48" stroke="var(--primary)"/>
          <text x="290" y="92" fill="var(--muted)" font-size="8">see the code paths</text>
        </g>
        <defs><marker id="tb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "table",
      head: ["", "Black-box (functional)", "White-box (structural)"],
      rows: [
        ["Looks at", "inputs → outputs only", "the internal code & logic"],
        ["Techniques", "equivalence classes, boundary value", "basis path, cyclomatic complexity"],
        ["Tester needs", "the spec", "the source code"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Black-box = test behaviour (no code); White-box = test internal paths (need code).** Testing **levels** go Unit → Integration → System → Acceptance (Alpha = in-house, Beta = real users). **Cyclomatic complexity V(G) = E − N + 2** gives the number of independent paths (white-box).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Error vs fault vs failure, black-box vs white-box (and their techniques), the testing levels & alpha/beta, and computing **cyclomatic complexity** (E − N + 2). Boundary value analysis = black-box is a frequent match.",
    },
  ],

  "config-management": [
    {
      kind: "p",
      text: "Software changes constantly — many people, many versions. **Software Configuration Management (SCM)** controls that change so the project never descends into chaos: *what* changed, *why*, and *which version* is which.",
    },
    {
      kind: "diagram",
      caption: "Version control tracks every revision (and branches) so any state can be restored.",
      svg: `<svg viewBox="0 0 384 86" role="img" aria-label="Version control timeline">
        <line x1="30" y1="44" x2="330" y2="44" stroke="var(--primary)" stroke-width="2"/>
        ${["v1", "v2", "v3", "v4"].map((v, i) => `<circle cx="${50 + i * 90}" cy="44" r="9" fill="var(--primary)"/><text x="${50 + i * 90}" y="48" text-anchor="middle" font-size="8" fill="#fff">${v}</text>`).join("")}
        <line x1="230" y1="44" x2="300" y2="20" stroke="var(--primary-l)" stroke-width="2"/>
        <circle cx="300" cy="20" r="8" fill="var(--primary-l)"/><text x="300" y="23" text-anchor="middle" font-size="7" fill="#fff">br</text>
        <text x="330" y="20" font-size="8" fill="var(--muted)">branch</text>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Version control** tracks revisions; **change control** approves/reviews changes before they're applied.",
        "**Software reuse** — building from existing components. **Re-engineering** — improving legacy software. **Reverse engineering** — recovering design from existing code.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "SCM keeps order through **version control** (track every revision) and **change control** (a formal approve-before-apply process). **Reverse engineering** goes *code → design*; **forward/re-engineering** goes *design → improved code*.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Define SCM, version vs change control, and reverse engineering vs re-engineering (recover design vs rebuild/improve). Reuse and baselines also appear.",
    },
  ],

  // ----------------------------------------------------------- DATA STRUCTURES
  // ===================================================================
  // UNIT 7 — DATA STRUCTURES & ALGORITHMS (educational, beginner→advanced)
  // ===================================================================
  "data-structures": [
    {
      kind: "p",
      text: "A **data structure** is a way of organising data so you can use it efficiently. Choosing the right one is half of good programming — the same data, stored differently, can make an operation instant or painfully slow.",
    },
    {
      kind: "diagram",
      caption: "Two families: linear (one-after-another) and non-linear (branching/connected).",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Data structure taxonomy">
        <g font-size="9" text-anchor="middle">
          <rect x="150" y="8" width="84" height="22" rx="5" fill="var(--primary)" opacity="0.9"/><text x="192" y="23" fill="#fff" font-weight="700">Data Structures</text>
          <line x1="150" y1="30" x2="96" y2="46" stroke="var(--border)"/><line x1="234" y1="30" x2="288" y2="46" stroke="var(--border)"/>
          <rect x="40" y="46" width="112" height="20" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="96" y="60" fill="var(--text)" font-weight="700">Linear</text>
          <rect x="232" y="46" width="120" height="20" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="292" y="60" fill="var(--text)" font-weight="700">Non-linear</text>
          <text x="96" y="84" fill="var(--muted)" font-size="8.5">array · stack · queue</text>
          <text x="96" y="97" fill="var(--muted)" font-size="8.5">linked list</text>
          <text x="292" y="84" fill="var(--muted)" font-size="8.5">tree · heap · graph</text>
          <text x="292" y="97" fill="var(--muted)" font-size="8.5">hash table</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Linear** structures arrange data in a sequence (array, stack, queue, list); **non-linear** structures branch or connect (tree, heap, graph). An **Abstract Data Type (ADT)** defines *what* operations exist (e.g. a Stack's push/pop) separately from *how* they're implemented.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Classify a structure as linear vs non-linear, match ADT ↔ operations, and pick the right structure for a task. The sub-topics below drill into each one — start with linear structures.",
    },
  ],

  "linear-structures": [
    {
      kind: "p",
      text: "**Linear data structures** store elements one after another. The two you must know by their *access rule* are the **stack** (LIFO) and the **queue** (FIFO).",
    },
    {
      kind: "diagram",
      caption: "Stack: add & remove at the same end (LIFO). Queue: add at rear, remove at front (FIFO).",
      svg: `<svg viewBox="0 0 384 116" role="img" aria-label="Stack and queue">
        <g font-size="9" text-anchor="middle">
          <text x="80" y="14" font-weight="700" fill="var(--primary)">Stack (LIFO)</text>
          ${[0, 1, 2].map((i) => `<rect x="50" y="${70 - i * 20}" width="60" height="18" fill="var(--primary)" opacity="${0.6 + i * 0.12}" stroke="#fff"/>`).join("")}
          <line x1="80" y1="26" x2="80" y2="46" stroke="var(--muted)" marker-end="url(#sq)"/><text x="118" y="40" fill="var(--muted)" font-size="8">push/pop</text>
          <text x="280" y="14" font-weight="700" fill="var(--primary)">Queue (FIFO)</text>
          ${[0, 1, 2].map((i) => `<rect x="${220 + i * 42}" y="50" width="38" height="22" fill="var(--primary)" opacity="${0.6 + i * 0.12}" stroke="#fff"/>`).join("")}
          <text x="218" y="92" fill="var(--muted)" font-size="8">front (dequeue)</text>
          <text x="330" y="44" fill="var(--muted)" font-size="8">rear (enqueue)</text>
        </g>
        <defs><marker id="sq" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Structure", "Rule / access", "Notes"],
      rows: [
        ["Array", "direct index a[i] — O(1)", "fixed size; costly insert/delete in middle"],
        ["Stack", "LIFO — push/pop one end", "function calls, undo, expression eval"],
        ["Queue", "FIFO — enqueue rear, dequeue front", "scheduling, buffers (circular queue, deque)"],
        ["Linked list", "nodes linked by pointers", "easy insert/delete; no random access"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Stack = LIFO** (Last-In-First-Out, like a stack of plates); **Queue = FIFO** (First-In-First-Out, like a line). Arrays give O(1) random access but costly mid-insertion; linked lists are the opposite. A **deque** allows insert/delete at *both* ends.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Trace stack/queue operations and give the final state, convert infix→postfix (stack), and array vs linked-list trade-offs. Stack = LIFO and queue = FIFO underlie many questions (e.g. DFS uses a stack, BFS a queue).",
    },
  ],

  "btrees": [
    {
      kind: "p",
      text: "When data is too big for RAM and lives on disk, ordinary binary trees are too *tall* — each level is a slow disk read. **B-trees** are short, bushy, balanced search trees designed to **minimise disk accesses**.",
    },
    {
      kind: "diagram",
      caption: "A B-tree node holds many keys and many children — so the tree stays very shallow.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="B-tree node">
        <g font-size="10" text-anchor="middle">
          <rect x="140" y="14" width="104" height="24" rx="4" fill="var(--primary)" opacity="0.9"/>
          <line x1="174" y1="14" x2="174" y2="38" stroke="#fff"/><line x1="210" y1="14" x2="210" y2="38" stroke="#fff"/>
          <text x="157" y="31" fill="#fff">10</text><text x="192" y="31" fill="#fff">20</text><text x="227" y="31" fill="#fff">30</text>
          ${[60, 140, 244, 330].map((x) => `<line x1="${[150, 174, 210, 234][[60, 140, 244, 330].indexOf(x)]}" y1="38" x2="${x}" y2="64" stroke="var(--border)"/><rect x="${x - 30}" y="64" width="60" height="20" rx="3" fill="var(--primary-bg)" stroke="var(--primary)"/>`).join("")}
          <text x="192" y="104" fill="var(--muted)" font-size="8.5">keys kept sorted; all leaves at the same depth</text>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "A B-tree of **order m** has up to m children and m−1 keys per node; all leaves sit at the **same level** (perfectly balanced).",
        "**B+ tree:** all actual data is in the **leaves**, which are linked in a list — great for **range queries**; internal nodes hold only keys for navigation.",
        "Search, insert, delete are all **O(log n)** — but with a tiny constant (few disk reads).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**B-trees stay short and balanced to cut disk I/O** — the workhorse of database indexes and file systems. The big **B+ tree** difference: data only in linked leaves, making sequential/range scans fast.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Insert keys into a B-tree of given order (node splitting), min/max keys per node, and B-tree vs B+ tree (data in leaves, linked leaves). ‘Used for database indexing’ is a common one-liner.",
    },
  ],

  "hashing": [
    {
      kind: "p",
      text: "**Hashing** gives near-instant **O(1)** lookup by *computing* where an item lives instead of searching. A **hash function** turns a key into an array index (a bucket).",
    },
    {
      kind: "diagram",
      caption: "The hash function maps keys to buckets; two keys landing in one bucket is a collision.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Hashing">
        <g font-size="9" text-anchor="middle">
          <text x="40" y="20" fill="var(--text)">key</text>
          ${["A", "B", "C"].map((k, i) => `<rect x="20" y="${28 + i * 24}" width="40" height="18" rx="3" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="40" y="41" fill="var(--text)">${k}</text>`).join("")}
          <rect x="150" y="40" width="64" height="26" rx="5" fill="var(--primary)"/><text x="182" y="57" fill="#fff" font-size="8">h(key)%n</text>
          ${[0, 1, 2, 3].map((i) => `<rect x="300" y="${14 + i * 22}" width="64" height="20" rx="3" fill="var(--card)" stroke="var(--muted)"/><text x="284" y="${28 + i * 22}" fill="var(--muted)" font-size="8">${i}</text>`).join("")}
          ${["A", "B", "C"].map((k, i) => `<line x1="60" y1="${37 + i * 24}" x2="150" y2="53" stroke="var(--border)"/>`).join("")}
          <line x1="214" y1="53" x2="300" y2="46" stroke="var(--muted)" marker-end="url(#hs)"/>
        </g>
        <defs><marker id="hs" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Collision** = two keys hash to the same bucket (unavoidable by the pigeonhole principle).",
        "**Chaining** — each bucket holds a linked list of all keys that land there.",
        "**Open addressing** — probe for the next free slot: *linear probing*, *quadratic probing*, *double hashing*.",
        "**Load factor** α = items / buckets — higher α means more collisions and slower operations.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Hashing trades space for **O(1) average** access. The catch is **collisions**, resolved by **chaining** (lists) or **open addressing** (probing). A good hash function spreads keys evenly; performance degrades as the **load factor** rises.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Insert keys with a given hash function and resolution method (show the table), compute the load factor, and compare chaining vs open-addressing probing. Linear probing's *clustering* problem is a common point.",
    },
  ],

  "graphs-ds": [
    {
      kind: "p",
      text: "A **graph** stores *things and their connections* — G = (V, E) with **vertices** V and **edges** E. The first decision is how to **represent** it in memory, which affects every algorithm's speed.",
    },
    {
      kind: "diagram",
      caption: "Same graph, two representations: an adjacency matrix vs an adjacency list.",
      svg: `<svg viewBox="0 0 384 116" role="img" aria-label="Graph representations">
        <g font-size="9">
          <circle cx="40" cy="34" r="11" fill="var(--primary)"/><text x="40" y="38" text-anchor="middle" fill="#fff">1</text>
          <circle cx="100" cy="34" r="11" fill="var(--primary)"/><text x="100" y="38" text-anchor="middle" fill="#fff">2</text>
          <circle cx="70" cy="84" r="11" fill="var(--primary)"/><text x="70" y="88" text-anchor="middle" fill="#fff">3</text>
          <line x1="51" y1="34" x2="89" y2="34" stroke="var(--muted)"/><line x1="44" y1="44" x2="64" y2="74" stroke="var(--muted)"/>
          <text x="170" y="20" fill="var(--muted)">Matrix</text>
          <text x="170" y="40" font-family="monospace" fill="var(--text)">  1 2 3</text>
          <text x="170" y="54" font-family="monospace" fill="var(--text)">1 0 1 1</text>
          <text x="170" y="68" font-family="monospace" fill="var(--text)">2 1 0 0</text>
          <text x="170" y="82" font-family="monospace" fill="var(--text)">3 1 0 0</text>
          <text x="290" y="20" fill="var(--muted)">List</text>
          <text x="290" y="40" font-family="monospace" fill="var(--text)">1 → 2, 3</text>
          <text x="290" y="54" font-family="monospace" fill="var(--text)">2 → 1</text>
          <text x="290" y="68" font-family="monospace" fill="var(--text)">3 → 1</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Adjacency matrix** = V×V table: O(1) edge check but O(V²) space — good for *dense* graphs. **Adjacency list** = per-vertex neighbour list: O(V+E) space — good for *sparse* graphs (most real graphs). Graphs can be directed/undirected, weighted/unweighted.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Matrix vs list space/time trade-offs, build a representation from a graph, and degree/edge counting. ‘Adjacency matrix needs O(V²) space’ and ‘list suits sparse graphs’ are common answers.",
    },
  ],

  "dsa-heap": [
    {
      kind: "p",
      text: "A **heap** is a special tree that always keeps the **most important element on top** — the smallest (min-heap) or largest (max-heap). It's how you build a **priority queue**: always serve the highest-priority item next.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Think of a **hospital triage queue**: patients aren't served first-come-first-served but by *severity*. A min-heap always has the most urgent case at the root, ready to be picked instantly.",
    },
    {
      kind: "p",
      text: "A binary heap is a **complete binary tree** (filled left-to-right) obeying the **heap property**: in a **min-heap** every parent ≤ its children (root = minimum); in a **max-heap** every parent ≥ its children.",
    },
    {
      kind: "diagram",
      caption: "Min-heap: the smallest key sits at the root; each parent ≤ its children.",
      svg: `<svg viewBox="0 0 384 160" role="img" aria-label="Min heap">
        <g font-size="12" fill="#fff" font-weight="700">
          <line x1="190" y1="35" x2="110" y2="80" stroke="var(--border)"/><line x1="190" y1="35" x2="270" y2="80" stroke="var(--border)"/>
          <line x1="110" y1="95" x2="60" y2="135" stroke="var(--border)"/><line x1="110" y1="95" x2="160" y2="135" stroke="var(--border)"/>
          <line x1="270" y1="95" x2="320" y2="135" stroke="var(--border)"/>
          <circle cx="190" cy="30" r="18" fill="var(--primary)"/><text x="190" y="35" text-anchor="middle">5</text>
          <circle cx="110" cy="90" r="18" fill="var(--primary-l)"/><text x="110" y="95" text-anchor="middle">8</text>
          <circle cx="270" cy="90" r="18" fill="var(--primary-l)"/><text x="270" y="95" text-anchor="middle">12</text>
          <circle cx="60" cy="135" r="16" fill="var(--primary-l)"/><text x="60" y="140" text-anchor="middle">15</text>
          <circle cx="160" cy="135" r="16" fill="var(--primary-l)"/><text x="160" y="140" text-anchor="middle">9</text>
          <circle cx="320" cy="135" r="16" fill="var(--primary-l)"/><text x="320" y="140" text-anchor="middle">18</text>
        </g>
      </svg>`,
    },
    {
      kind: "p",
      text: "A heap is stored as a plain **array** (no pointers needed), because it's a complete tree. For a node at index *i* (0-based): **left = 2i+1, right = 2i+2, parent = ⌊(i−1)/2⌋**.",
    },
    {
      kind: "table",
      head: ["Operation", "Cost"],
      rows: [
        ["peek (min/max at root)", "O(1)"],
        ["insert / delete-root", "O(log n) — bubble up / sift down"],
        ["build-heap from an array", "O(n) — not O(n log n)"],
        ["heap sort", "O(n log n)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Min-heap root = smallest, max-heap root = largest** — and a heap is *not* fully sorted, only the root extreme is guaranteed. Remember the index formulas and that **build-heap is O(n)** while **heap sort is O(n log n)**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Insert a sequence into a min/max-heap and give the resulting **array**, check whether an array is a valid heap, apply the parent/child index formulas, and recall build-heap = O(n). Heaps power priority queues, Dijkstra and Prim.",
    },
  ],

  "dsa-avl": [
    {
      kind: "p",
      text: "A **Binary Search Tree (BST)** keeps keys ordered — *smaller left, larger right* — so search is like a guessing game that halves the options each step. But a *lopsided* BST can degrade to a slow list. An **AVL tree** fixes that by staying balanced.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Insert 10, 20, 30 in order into a plain BST and it becomes a straight line (like a linked list) — search is back to O(n). An AVL tree notices the lean and **rotates** to keep itself short, the way you'd re-centre a wobbling stack of books.",
    },
    {
      kind: "p",
      text: "An AVL tree is a BST where, for **every** node, the **balance factor** = height(left) − height(right) stays in **{−1, 0, +1}**. Keeping that invariant forces the height to O(log n), so search/insert/delete are all O(log n) worst-case.",
    },
    {
      kind: "table",
      head: ["Imbalance", "Fix"],
      rows: [
        ["LL (heavy on left-left)", "single Right rotation"],
        ["RR (heavy on right-right)", "single Left rotation"],
        ["LR (left-right)", "Left on child, then Right"],
        ["RL (right-left)", "Right on child, then Left"],
      ],
    },
    {
      kind: "diagram",
      caption: "LL case: inserting 10 makes node 30 unbalanced (BF +2); one right rotation rebalances.",
      svg: `<svg viewBox="0 0 384 150" role="img" aria-label="AVL right rotation">
        <g font-size="12" fill="#fff" font-weight="700">
          <line x1="70" y1="35" x2="45" y2="80" stroke="var(--border)"/><line x1="45" y1="95" x2="30" y2="130" stroke="var(--border)"/>
          <circle cx="70" cy="30" r="16" fill="var(--primary)"/><text x="70" y="35" text-anchor="middle">30</text>
          <circle cx="45" cy="90" r="16" fill="var(--primary-l)"/><text x="45" y="95" text-anchor="middle">20</text>
          <circle cx="30" cy="130" r="14" fill="var(--primary-l)"/><text x="30" y="135" text-anchor="middle">10</text>
          <text x="150" y="85" font-size="20" fill="var(--muted)">→</text>
          <line x1="280" y1="55" x2="250" y2="95" stroke="var(--border)"/><line x1="280" y1="55" x2="315" y2="95" stroke="var(--border)"/>
          <circle cx="280" cy="50" r="16" fill="var(--primary)"/><text x="280" y="55" text-anchor="middle">20</text>
          <circle cx="248" cy="100" r="14" fill="var(--primary-l)"/><text x="248" y="105" text-anchor="middle">10</text>
          <circle cx="316" cy="100" r="14" fill="var(--primary-l)"/><text x="316" y="105" text-anchor="middle">30</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Balance factor must be −1, 0 or +1 at every node.** Name the imbalance by the path to the inserted key (**LL, RR, LR, RL**) and apply the matching rotation. AVL height ≈ 1.44·log₂n, so all operations are O(log n).",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Minimum nodes for height h",
      text: "The sparsest AVL tree follows a Fibonacci-like rule: **N(h) = N(h−1) + N(h−2) + 1** (with N(0)=1, N(1)=2). This is *why* an AVL tree of height h still holds plenty of nodes — it can't get too tall.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Insert a key sequence and give the resulting tree / name the rotation (LL/RR/LR/RL), compute balance factors or **tree height**, and find minimum nodes for a height. Contrast with **Red-Black trees** (looser balance, fewer rotations).",
    },
  ],
  "algo-performance": [
    {
      kind: "p",
      text: "How do we say one algorithm is ‘faster’ than another, independent of the computer? We count how the work **grows with the input size n**, and describe it with **asymptotic notation** — ignoring constants and small inputs.",
    },
    {
      kind: "diagram",
      caption: "Growth rates: the gap between them explodes as n grows.",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Big-O growth curves">
        <line x1="34" y1="110" x2="366" y2="110" stroke="var(--muted)"/><line x1="34" y1="110" x2="34" y2="10" stroke="var(--muted)"/>
        <path d="M34,104 L366,100" fill="none" stroke="#0a8f5b" stroke-width="2"/><text x="370" y="100" font-size="8" fill="#0a8f5b">1, log n</text>
        <path d="M34,108 L366,40" fill="none" stroke="var(--primary)" stroke-width="2"/><text x="300" y="36" font-size="8" fill="var(--primary)">n</text>
        <path d="M34,110 Q140,90 366,14" fill="none" stroke="var(--primary-l)" stroke-width="2"/><text x="250" y="30" font-size="8" fill="var(--primary-l)">n log n</text>
        <path d="M34,110 Q90,108 150,12" fill="none" stroke="#c0392b" stroke-width="2"/><text x="150" y="24" font-size="8" fill="#c0392b">n², 2ⁿ</text>
        <text x="356" y="124" font-size="9" fill="var(--muted)">n →</text>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Notation", "Bounds", "Means"],
      rows: [
        ["Big-O — O(f)", "upper bound", "‘at most this slow’ (worst case)"],
        ["Big-Omega — Ω(f)", "lower bound", "‘at least this fast’"],
        ["Big-Theta — Θ(f)", "tight bound", "‘exactly this growth’ (O and Ω)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Order of growth (slow-growing = good): **O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)**. For **recurrences** T(n) = a·T(n/b) + f(n), the **Master theorem** compares f(n) with n^(log_b a) to read off the answer in one step.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Master theorem, quickly",
      text: "Let c = log_b a. If f(n) grows **slower** than nᶜ → T = Θ(nᶜ). If it's **equal** (Θ(nᶜ)) → T = Θ(nᶜ log n). If it grows **faster** → T = Θ(f(n)). Example: merge sort T(n)=2T(n/2)+n → c=1, f=n → **Θ(n log n)**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "**Find an algorithm's time complexity**, order growth rates, and **solve a recurrence** (Master theorem or substitution). Best/average/worst cases (e.g. quicksort O(n log n) avg, O(n²) worst) are common — these ‘time complexity’ items appear every cycle.",
    },
  ],

  "design-techniques": [
    {
      kind: "p",
      text: "Most efficient algorithms follow one of a few **design paradigms** — general strategies for breaking a problem down. Recognising the paradigm tells you how the solution works.",
    },
    {
      kind: "table",
      head: ["Technique", "Strategy", "Classic examples"],
      rows: [
        ["Divide & Conquer", "split → solve parts → combine", "merge sort, quick sort, binary search"],
        ["Dynamic Programming", "solve overlapping subproblems once, store them", "Fibonacci, LCS, knapsack, Floyd-Warshall"],
        ["Greedy", "take the best local choice each step", "Huffman, Prim, Kruskal, Dijkstra"],
        ["Backtracking", "try, and undo on dead ends", "N-Queens, maze, Sudoku"],
        ["Branch & Bound", "prune the search using bounds", "TSP, integer programming"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**DP vs Greedy vs D&C:** **D&C** splits into *independent* subproblems; **DP** reuses *overlapping* subproblems (needs *optimal substructure* + *overlapping subproblems*, solved by **memoization**/tabulation); **Greedy** never reconsiders — fast but only correct when local optima lead to a global one.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match algorithm ↔ technique (merge sort = D&C, Dijkstra/Prim/Kruskal = greedy, knapsack/LCS = DP), and the two DP requirements (optimal substructure + overlapping subproblems). Greedy-vs-DP distinctions are common.",
    },
  ],

  "lower-bound-theory": [
    {
      kind: "p",
      text: "**Lower bound theory** asks the deeper question: not *how fast is my algorithm*, but *how fast could ANY algorithm possibly be* for this problem? It sets the speed limit no one can beat.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Using a **decision (comparison) tree** — where each internal node is one comparison and each leaf an outcome — we prove that **any comparison-based sort needs Ω(n log n)** comparisons. A tree with n! leaves has height ≥ log₂(n!) = Ω(n log n).",
    },
    {
      kind: "ul",
      items: [
        "**Comparison trees** model algorithms that only *compare* elements (sorting, searching).",
        "**Lower bounds through reductions** — if problem A reduces to B, then B is at least as hard as A.",
        "Non-comparison sorts (counting, radix) beat Ω(n log n) by *not* comparing — they don't violate the bound.",
      ],
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "The Ω(n log n) lower bound for comparison sorting, the decision-tree argument (n! leaves → height log n!), and reductions. ‘Counting/radix sort can be O(n)’ because they aren't comparison-based is a favourite.",
    },
  ],

  "graph-algorithms": [
    {
      kind: "p",
      text: "**Graph algorithms** answer questions about networks: *can I reach X? what's the shortest route? the cheapest set of connections?* Two traversals — **BFS** and **DFS** — underlie almost all of them.",
    },
    {
      kind: "diagram",
      caption: "BFS explores level by level (a queue); DFS plunges deep first (a stack/recursion).",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="BFS versus DFS">
        <g font-size="9">
          <text x="96" y="14" text-anchor="middle" font-weight="700" fill="var(--primary)">BFS — by level</text>
          <circle cx="96" cy="30" r="11" fill="var(--primary)"/><text x="96" y="34" text-anchor="middle" fill="#fff">A</text>
          <circle cx="64" cy="66" r="11" fill="var(--primary)" opacity="0.8"/><text x="64" y="70" text-anchor="middle" fill="#fff">B</text>
          <circle cx="128" cy="66" r="11" fill="var(--primary)" opacity="0.8"/><text x="128" y="70" text-anchor="middle" fill="#fff">C</text>
          <circle cx="96" cy="100" r="11" fill="var(--primary)" opacity="0.6"/><text x="96" y="104" text-anchor="middle" fill="#fff">D</text>
          <line x1="88" y1="38" x2="70" y2="58" stroke="var(--muted)"/><line x1="104" y1="38" x2="122" y2="58" stroke="var(--muted)"/><line x1="70" y1="74" x2="90" y2="92" stroke="var(--muted)"/>
          <text x="180" y="56" fill="var(--muted)">order: A B C D</text>
          <text x="300" y="14" text-anchor="middle" font-weight="700" fill="var(--primary)">DFS — go deep</text>
          <text x="300" y="56" fill="var(--muted)" text-anchor="middle">order: A B D C</text>
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Problem", "Algorithm"],
      rows: [
        ["Traverse / shortest path (unweighted)", "BFS (queue)"],
        ["Traverse / cycle / topological sort", "DFS (stack/recursion)"],
        ["Shortest path (weighted, ≥0)", "Dijkstra (greedy + heap)"],
        ["Shortest path (negative edges)", "Bellman-Ford"],
        ["All-pairs shortest paths", "Floyd-Warshall (DP)"],
        ["Minimum Spanning Tree", "Prim / Kruskal (greedy)"],
        ["Maximum flow", "Ford-Fulkerson"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**BFS uses a queue** (level-order, shortest unweighted path); **DFS uses a stack/recursion** (deep first, topological sort & cycle detection). **Dijkstra** is greedy for non-negative weights; **MST** via Prim/Kruskal connects all vertices at least cost.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Give BFS/DFS visit order, match problem ↔ algorithm (Dijkstra, Bellman-Ford, Floyd-Warshall, Prim, Kruskal), and their complexities. ‘BFS = queue, DFS = stack’ and ‘Dijkstra fails on negative edges’ are common.",
    },
  ],

  "complexity-theory": [
    {
      kind: "p",
      text: "**Complexity theory** classifies problems by how hard they are to *solve* — separating those we can solve quickly from those we (probably) can't. The famous frontier is **P versus NP**.",
    },
    {
      kind: "diagram",
      caption: "P ⊆ NP; NP-complete problems are the hardest IN NP; NP-hard sits at least as hard (maybe outside NP).",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="P NP NP-complete NP-hard">
        <ellipse cx="150" cy="64" rx="120" ry="48" fill="var(--primary)" opacity="0.12" stroke="var(--primary)"/>
        <text x="150" y="28" text-anchor="middle" font-size="10" fill="var(--text)" font-weight="700">NP</text>
        <ellipse cx="110" cy="70" rx="56" ry="32" fill="var(--primary)" opacity="0.25" stroke="var(--primary)"/>
        <text x="110" y="74" text-anchor="middle" font-size="10" fill="var(--text)" font-weight="700">P</text>
        <ellipse cx="222" cy="70" rx="40" ry="30" fill="var(--primary)" opacity="0.5" stroke="var(--primary)"/>
        <text x="222" y="68" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">NP-</text>
        <text x="222" y="80" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">complete</text>
        <text x="330" y="64" text-anchor="middle" font-size="9" fill="var(--muted)">NP-hard ⊇</text>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**P** — solvable in polynomial time (‘easy’).",
        "**NP** — a proposed solution can be *verified* in polynomial time.",
        "**NP-complete** — the hardest problems in NP; every NP problem reduces to them (SAT, TSP-decision, clique).",
        "**NP-hard** — at least as hard as NP-complete, but may not even be in NP.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**P ⊆ NP.** A problem is **NP-complete** if it's in NP *and* every NP problem reduces to it; **NP-hard** drops the ‘in NP’ requirement. If *any* NP-complete problem were solved in polynomial time, then **P = NP** (the open million-dollar question).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Classify P / NP / NP-complete / NP-hard, the role of polynomial-time **reductions**, and that all NP-complete problems are NP-hard (not vice-versa). SAT was the first proven NP-complete (Cook's theorem).",
    },
  ],

  "selected-topics": [
    {
      kind: "p",
      text: "A grab-bag of specialised algorithm areas the syllabus lists — useful background, lighter on the exam.",
    },
    {
      kind: "ul",
      items: [
        "**Number-theoretic** — Euclid's GCD, modular exponentiation, primality (used in RSA cryptography).",
        "**Fast Fourier Transform (FFT)** — multiplies polynomials / large numbers in O(n log n).",
        "**String matching** — find a pattern in text: **KMP** and **Rabin-Karp** (hashing) beat the naive O(nm).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Know the headliners: **Euclid's algorithm** for GCD, **FFT = O(n log n)** multiplication, and efficient **string matching** (KMP uses a prefix table; Rabin-Karp uses rolling hashes).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Euclid's GCD steps, FFT complexity, and string-matching algorithm names/complexity. Modular arithmetic for RSA links back to discrete maths.",
    },
  ],

  "advanced-algorithms": [
    {
      kind: "p",
      text: "When exact, sequential solutions are too slow or impossible, we relax the rules — compute in **parallel**, accept a **near-optimal** answer, or use **randomness**.",
    },
    {
      kind: "table",
      head: ["Type", "Idea"],
      rows: [
        ["Parallel", "split work across processors (sort/search/merge faster)"],
        ["Approximation", "for NP-hard problems, get provably near-optimal quickly"],
        ["Randomized", "use random choices for speed/simplicity (Las Vegas / Monte Carlo)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Approximation algorithms** give a guaranteed-close answer to hard (NP-hard) problems in polynomial time. **Randomized** algorithms: *Las Vegas* is always correct but random in time (e.g. randomized quicksort); *Monte Carlo* is fast but may be wrong with small probability.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Las Vegas vs Monte Carlo (always-correct vs maybe-wrong), what an approximation ratio means, and why parallel/approximation algorithms are used (NP-hardness, speed).",
    },
  ],


  // --------------------------------------------------------------- OPER. SYS.
  // ===================================================================
  // UNIT 5 — SYSTEM SOFTWARE & OPERATING SYSTEM (educational)
  // ===================================================================
  "system-software": [
    {
      kind: "p",
      text: "**System software** is the behind-the-scenes toolset that turns your source code into a running program and manages the machine. Unlike *application* software (which does a user task), system software **serves other software**.",
    },
    {
      kind: "diagram",
      caption: "From source to running program: each tool hands off to the next.",
      svg: `<svg viewBox="0 0 384 80" role="img" aria-label="Translation pipeline">
        <g font-size="9" text-anchor="middle">
          ${["Source code", "Compiler/Assembler", "Linker", "Loader", "Running"]
            .map((s, i) => `<rect x="${6 + i * 76}" y="30" width="68" height="28" rx="5" fill="var(--primary)" opacity="${0.5 + i * 0.1}"/><text x="${40 + i * 76}" y="47" fill="#fff" font-size="8">${s}</text>${i < 4 ? `<text x="${76 + i * 76}" y="47" fill="var(--muted)">›</text>` : ""}`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Tool", "Job"],
      rows: [
        ["Compiler", "translates a whole high-level program to machine/object code"],
        ["Interpreter", "executes source line by line (no separate executable)"],
        ["Assembler", "translates assembly mnemonics to machine code"],
        ["Linker", "combines object modules + libraries into one program"],
        ["Loader", "loads the program into memory and starts it"],
        ["Macro processor", "expands macros (named code shortcuts) before compiling"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Order of the build chain: **translate (compile/assemble) → link → load → run.** Linking resolves references between modules; loading places the final image in memory and sets it running (sometimes with **relocation**).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match tool ↔ job (linker combines modules, loader places in memory), order the translation chain, and compiler vs interpreter vs assembler. Loading & relocation one-liners are common.",
    },
  ],

  "os-basics": [
    {
      kind: "p",
      text: "An **operating system (OS)** is the master program that sits between you (and your apps) and the bare hardware. It shares the CPU, memory, and devices among programs — safely and fairly — so you never have to talk to the hardware directly.",
    },
    {
      kind: "diagram",
      caption: "The OS is the middle layer: apps ask it, it controls the hardware.",
      svg: `<svg viewBox="0 0 384 104" role="img" aria-label="OS as intermediary">
        <g font-size="11" text-anchor="middle">
          <rect x="92" y="8" width="200" height="24" rx="5" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="192" y="24" fill="var(--text)">Applications / Users</text>
          <rect x="72" y="40" width="240" height="24" rx="5" fill="var(--primary)" opacity="0.9"/><text x="192" y="56" fill="#fff" font-weight="700">Operating System</text>
          <rect x="92" y="72" width="200" height="24" rx="5" fill="var(--primary-l)"/><text x="192" y="88" fill="#fff">Hardware (CPU, RAM, I/O)</text>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Services:** process & memory management, file system, I/O, security, networking.",
        "**System calls** are the *doorway* from a user program into the OS (e.g. open, read, fork) — the boundary between **user mode** and **kernel mode**.",
        "The **kernel** is the core that always runs; **system boot** loads it at power-on.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two ideas to lock in: the OS is a **resource manager** standing between apps and hardware, and a program crosses into it only through a **system call** (switching user mode → kernel mode). That mode switch is what keeps the system safe.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify OS functions, the role of system calls and the user/kernel-mode boundary, and types of OS (batch, time-sharing, real-time, distributed). ‘System call = entry to kernel’ is a frequent answer.",
    },
  ],

  "process-management": [
    {
      kind: "p",
      text: "A **process** is a program *in execution* — code plus its current activity (registers, stack, data). The OS juggles many processes at once, tracking each one's **state** as it moves through its life.",
    },
    {
      kind: "diagram",
      caption: "The process life cycle — only one process is Running per CPU at a time.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Process state diagram">
        <g font-size="10" text-anchor="middle">
          <rect x="10" y="50" width="56" height="26" rx="13" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="38" y="67" fill="var(--text)">New</text>
          <rect x="100" y="50" width="56" height="26" rx="13" fill="var(--primary)" opacity="0.85"/><text x="128" y="67" fill="#fff">Ready</text>
          <rect x="200" y="50" width="60" height="26" rx="13" fill="var(--primary)"/><text x="230" y="67" fill="#fff">Running</text>
          <rect x="300" y="50" width="74" height="26" rx="13" fill="var(--primary-l)"/><text x="337" y="67" fill="#fff">Terminated</text>
          <rect x="160" y="6" width="64" height="24" rx="12" fill="var(--card)" stroke="var(--muted)"/><text x="192" y="22" fill="var(--text)">Waiting</text>
          <line x1="66" y1="63" x2="98" y2="63" stroke="var(--muted)" marker-end="url(#ps)"/>
          <line x1="156" y1="63" x2="198" y2="63" stroke="var(--muted)" marker-end="url(#ps)"/>
          <line x1="260" y1="63" x2="298" y2="63" stroke="var(--muted)" marker-end="url(#ps)"/>
          <line x1="215" y1="50" x2="200" y2="30" stroke="var(--muted)" marker-end="url(#ps)"/>
          <line x1="180" y1="30" x2="135" y2="50" stroke="var(--muted)" marker-end="url(#ps)"/>
          <text x="175" y="44" fill="var(--muted)" font-size="7">I/O</text>
        </g>
        <defs><marker id="ps" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "Each process has a **PCB (Process Control Block)** — its ID, state, registers, memory & open files. A **context switch** saves one PCB and loads another.",
        "**IPC (inter-process communication)** lets processes cooperate via *shared memory* or *message passing*.",
        "**Synchronization** stops processes from corrupting shared data in the **critical section** — solved by **Peterson's solution**, **semaphores** (wait/signal), and mutexes.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A process moves **New → Ready → Running → (Waiting) → Terminated**. The **critical-section problem** (only one process touches shared data at a time) is the heart of synchronization — semaphores are the classic tool.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Order the process states, define PCB & context switch, and apply semaphore wait()/signal() or Peterson's solution. ‘Race condition’ and ‘critical section’ definitions are common.",
    },
  ],

  "threads": [
    {
      kind: "p",
      text: "A **thread** is a lightweight ‘mini-process’ — a single flow of execution *inside* a process. One process can run many threads that **share its memory and files** but each keep their own stack and registers.",
    },
    {
      kind: "diagram",
      caption: "Threads share the process's code & data; only the stack/registers are per-thread.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Process with multiple threads">
        <g font-size="10" text-anchor="middle">
          <rect x="40" y="14" width="304" height="84" rx="8" fill="var(--primary)" opacity="0.10" stroke="var(--primary)"/>
          <text x="192" y="30" fill="var(--muted)" font-size="9">Process — shared code, data, files</text>
          ${[0, 1, 2].map((i) => `<rect x="${70 + i * 100}" y="44" width="70" height="40" rx="5" fill="var(--primary)" opacity="0.85"/><text x="${105 + i * 100}" y="62" fill="#fff">Thread ${i + 1}</text><text x="${105 + i * 100}" y="76" fill="#fff" font-size="7">own stack</text>`).join("")}
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "Threads are **cheaper than processes**: creating/switching is fast and communication is easy (shared memory) — but a crash or unguarded shared write in one thread can hurt the others. This is **concurrency within a process**.",
    },
    {
      kind: "ul",
      items: [
        "**User-level threads** (managed by a library, fast but one blocking call blocks all) vs **kernel-level threads** (scheduled by the OS).",
        "**Multithreading models:** many-to-one, one-to-one, many-to-many map user threads to kernel threads.",
      ],
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Process vs thread (what's shared vs private — code/data shared, stack/registers private), benefits of multithreading, and user- vs kernel-level threads. ‘Threads share the same address space’ is the key line.",
    },
  ],

  "cpu-scheduling": [
    {
      kind: "p",
      text: "When several processes are **Ready**, the OS must pick who runs next. **CPU scheduling** is that decision — and it's one of the most **numerically tested** topics: you'll compute average waiting and turnaround times.",
    },
    {
      kind: "diagram",
      caption: "A Gantt chart lays processes on a timeline — the basis of every scheduling calculation.",
      svg: `<svg viewBox="0 0 384 70" role="img" aria-label="Gantt chart">
        <g font-size="10" text-anchor="middle">
          ${[
            ["P1", 0, 90],
            ["P2", 90, 60],
            ["P3", 150, 120],
            ["P4", 270, 70],
          ]
            .map((d) => `<rect x="${20 + Number(d[1])}" y="20" width="${d[2]}" height="28" fill="var(--primary)" opacity="0.85" stroke="#fff"/><text x="${20 + Number(d[1]) + Number(d[2]) / 2}" y="38" fill="#fff" font-weight="700">${d[0]}</text>`)
            .join("")}
          ${[0, 90, 150, 270, 340].map((t) => `<text x="${20 + t}" y="60" fill="var(--muted)" font-size="8">${t === 0 ? 0 : Math.round(t / 10)}</text>`).join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Algorithm", "Picks", "Note"],
      rows: [
        ["FCFS", "first to arrive", "simple; long jobs cause the convoy effect"],
        ["SJF", "shortest burst", "optimal average waiting time; can starve long jobs"],
        ["SRTF", "shortest remaining (preemptive SJF)", "lower waiting, more switches"],
        ["Priority", "highest priority", "starvation → fixed by aging"],
        ["Round Robin", "each gets a time quantum", "fair; good for time-sharing"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two formulas answer most questions: **Turnaround = Completion − Arrival**, and **Waiting = Turnaround − Burst**. Draw the Gantt chart first, then read times off it. **SJF gives the minimum average waiting time**; **Round Robin** is the fair, time-sharing choice (performance depends on the time quantum).",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Watch the details",
      text: "*Preemptive* vs *non-preemptive* changes the Gantt chart completely. For Round Robin, a **too-small quantum** wastes time on context switches; a **too-large** one degenerates into FCFS. Mind arrival times when the CPU would otherwise sit idle.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "**Compute average waiting / turnaround / response time** for FCFS, SJF, SRTF, Priority and Round Robin from a process table — almost guaranteed every cycle. Also: which algorithm starves (SJF/Priority) and which is fair (RR).",
    },
  ],

  "deadlocks": [
    {
      kind: "p",
      text: "A **deadlock** is a traffic jam of processes: each holds a resource the next one needs, so **none can ever proceed**. Understanding the four conditions that cause it is the whole topic.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Four cars reach a four-way junction at once, each blocking the one to its right. Everyone waits for everyone else — forever. Break *any one* of those conditions and traffic flows again.",
    },
    {
      kind: "diagram",
      caption: "All FOUR (Coffman) conditions must hold at once for a deadlock.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="Four deadlock conditions">
        <g font-size="9.5" text-anchor="middle">
          ${[
            ["Mutual", "exclusion"],
            ["Hold &", "wait"],
            ["No", "preemption"],
            ["Circular", "wait"],
          ]
            .map((d, i) => `<rect x="${10 + i * 93}" y="30" width="84" height="40" rx="6" fill="var(--primary)" opacity="${0.6 + i * 0.1}"/><text x="${52 + i * 93}" y="48" fill="#fff" font-weight="700">${d[0]}</text><text x="${52 + i * 93}" y="62" fill="#fff">${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Prevention** — design so one condition can never hold (e.g. request all resources at once → no hold-and-wait).",
        "**Avoidance** — grant a request only if the system stays in a **safe state**: the **Banker's algorithm**.",
        "**Detection & recovery** — let deadlocks happen, find cycles in the **resource-allocation graph**, then kill/preempt to recover.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**All four conditions (mutual exclusion, hold-and-wait, no-preemption, circular-wait) are necessary together.** A **cycle** in a single-instance resource-allocation graph means deadlock. The **Banker's algorithm** avoids deadlock by only granting requests that keep a *safe sequence* available.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Name the four conditions, detect a deadlock from a resource-allocation graph (cycle), and run the **Banker's algorithm** to find a safe sequence / decide if a request is grantable. These are classic numericals.",
    },
  ],

  "memory-management": [
    {
      kind: "p",
      text: "Many processes must share one physical RAM. **Memory management** decides who gets which bytes, and creates the illusion that each process has its own large, private memory.",
    },
    {
      kind: "diagram",
      caption: "Paging: a logical address (page #, offset) is translated via the page table to a physical frame.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="Paging address translation">
        <g font-size="9" text-anchor="middle">
          <rect x="14" y="36" width="100" height="26" rx="4" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="64" y="53" fill="var(--text)">page # | offset</text>
          <text x="64" y="30" fill="var(--muted)">logical address</text>
          <rect x="150" y="36" width="80" height="26" rx="4" fill="var(--primary)" opacity="0.85"/><text x="190" y="53" fill="#fff">page table</text>
          <rect x="270" y="36" width="100" height="26" rx="4" fill="var(--primary-l)"/><text x="320" y="53" fill="#fff">frame | offset</text>
          <text x="320" y="30" fill="var(--muted)">physical address</text>
          <line x1="114" y1="49" x2="148" y2="49" stroke="var(--muted)" marker-end="url(#mm)"/>
          <line x1="230" y1="49" x2="268" y2="49" stroke="var(--muted)" marker-end="url(#mm)"/>
        </g>
        <defs><marker id="mm" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Paging** splits memory into fixed **frames** and logical space into equal **pages** — removes external fragmentation (but causes small internal fragmentation).",
        "**Segmentation** splits by logical units (code, stack, data) of *varying* size — matches the program's view, but can fragment externally.",
        "**Virtual memory / demand paging** keeps only needed pages in RAM; a missing page triggers a **page fault** (fetch from disk).",
        "**Page replacement** chooses a victim when RAM is full: **FIFO, LRU, Optimal**.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Frames = physical memory ÷ page size.** **Optimal** replacement (evict the page used farthest in future) gives the fewest faults but is unimplementable; **LRU** approximates it. **FIFO** can suffer **Belady's anomaly** (more frames → *more* faults). Excessive paging = **thrashing**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "**Count page faults** for a reference string under FIFO/LRU/Optimal, compute number of frames and effective access time, and recall Belady's anomaly (FIFO) & thrashing. Paging vs segmentation differences are common.",
    },
  ],

  "storage-management": [
    {
      kind: "p",
      text: "Below RAM sits **secondary storage** (disks, SSDs) — large, cheap and permanent, but slow. **Storage management** is about organising it and **ordering disk requests** so the slow part hurts least.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "The two sub-topics here: **Disk Scheduling** (the order to service I/O requests, minimising head movement) and **RAID** (combining disks for speed and/or reliability). On a magnetic disk, **seek time** (moving the head) dominates — so reducing head travel is the whole game.",
    },
  ],

  "raid": [
    {
      kind: "p",
      text: "**RAID (Redundant Array of Independent Disks)** combines several disks into one logical unit to gain **speed** (striping), **reliability** (mirroring/parity), or both. Different *levels* trade these off.",
    },
    {
      kind: "diagram",
      caption: "RAID 0 stripes for speed; RAID 1 mirrors for safety; RAID 5 spreads parity.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="RAID levels">
        <g font-size="9" text-anchor="middle">
          <text x="64" y="14" font-weight="700" fill="var(--primary)">RAID 0</text>
          <rect x="34" y="22" width="26" height="60" rx="3" fill="var(--primary)" opacity="0.8"/><rect x="70" y="22" width="26" height="60" rx="3" fill="var(--primary)" opacity="0.8"/>
          <text x="47" y="46" fill="#fff">A1</text><text x="83" y="46" fill="#fff">A2</text><text x="64" y="98" fill="var(--muted)" font-size="8">stripe</text>
          <text x="192" y="14" font-weight="700" fill="var(--primary)">RAID 1</text>
          <rect x="162" y="22" width="26" height="60" rx="3" fill="var(--primary)" opacity="0.8"/><rect x="198" y="22" width="26" height="60" rx="3" fill="var(--primary)" opacity="0.8"/>
          <text x="175" y="46" fill="#fff">A1</text><text x="211" y="46" fill="#fff">A1</text><text x="192" y="98" fill="var(--muted)" font-size="8">mirror</text>
          <text x="320" y="14" font-weight="700" fill="var(--primary)">RAID 5</text>
          <rect x="278" y="22" width="24" height="60" rx="3" fill="var(--primary)" opacity="0.8"/><rect x="310" y="22" width="24" height="60" rx="3" fill="var(--primary)" opacity="0.8"/><rect x="342" y="22" width="24" height="60" rx="3" fill="var(--primary-l)"/>
          <text x="290" y="46" fill="#fff">A1</text><text x="322" y="46" fill="#fff">A2</text><text x="354" y="46" fill="#fff" font-size="8">P</text><text x="320" y="98" fill="var(--muted)" font-size="8">+ parity</text>
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Level", "Technique", "Gives"],
      rows: [
        ["RAID 0", "striping", "speed, NO redundancy"],
        ["RAID 1", "mirroring", "full redundancy (50% space)"],
        ["RAID 5", "striping + distributed parity", "speed + survives 1 disk failure"],
        ["RAID 6", "double parity", "survives 2 disk failures"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**RAID 0 = speed only** (no safety), **RAID 1 = mirror** (safety, halves usable space), **RAID 5 = striping + parity** (good balance; tolerates one failure). Parity lets a lost block be recomputed from the others.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match RAID level ↔ technique (0 stripe, 1 mirror, 5 distributed parity), how many disk failures each tolerates, and usable capacity. RAID 0 has no fault tolerance is the classic trap.",
    },
  ],

  "file-io-systems": [
    {
      kind: "p",
      text: "A **file system** organises data on disk into files and directories, and tracks where each file's blocks physically live. **File allocation** is the method it uses to place those blocks.",
    },
    {
      kind: "table",
      head: ["Allocation", "How", "Trade-off"],
      rows: [
        ["Contiguous", "blocks stored back-to-back", "fast access; external fragmentation"],
        ["Linked", "each block points to the next", "no fragmentation; slow random access"],
        ["Indexed", "an index block lists all block addresses", "fast random access; index overhead"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Contiguous = fast but fragments; Linked = flexible but only sequential; Indexed = best random access (used by Unix inodes).** Free space is tracked with a **bit vector** or free list.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match allocation method ↔ trade-off, recall directory structures and free-space management (bit vector), and Unix **inode** = indexed allocation. Sequential vs direct access support is a common compare.",
    },
  ],

  "os-security": [
    {
      kind: "p",
      text: "**Protection & security** keep programs and users from harming each other or the system. *Protection* = internal access control; *security* = defending against external threats.",
    },
    {
      kind: "ul",
      items: [
        "**CIA triad** — the goals: **Confidentiality** (no leaks), **Integrity** (no tampering), **Availability** (stays up).",
        "**Access matrix** — rows = domains/users, columns = objects, cells = allowed rights (read/write/execute).",
        "**Threats:** program (Trojan, trapdoor), system/network (worms, viruses, DoS).",
        "**Defences:** authentication (passwords, biometrics), **cryptography**, and access control.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Security aims at the **CIA triad (Confidentiality, Integrity, Availability)**. The **access matrix** is the formal model of ‘who may do what to which object’; an **ACL** stores it by column, a **capability list** by row.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Define the CIA triad, read/interpret an access matrix (ACL vs capability list), and classify threats (worm vs virus vs Trojan). Authentication factors also appear.",
    },
  ],

  "virtual-machines": [
    {
      kind: "p",
      text: "A **virtual machine (VM)** is a software ‘computer inside a computer’: a **hypervisor** fools each guest OS into thinking it owns real hardware, while several share one physical machine.",
    },
    {
      kind: "diagram",
      caption: "Type 1 hypervisor runs on bare metal; Type 2 runs on top of a host OS.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="Hypervisor types">
        <g font-size="9" text-anchor="middle">
          <text x="96" y="12" font-weight="700" fill="var(--primary)">Type 1 (bare metal)</text>
          <rect x="24" y="18" width="64" height="18" rx="3" fill="var(--primary)" opacity="0.7"/><text x="56" y="31" fill="#fff">Guest OS</text>
          <rect x="100" y="18" width="64" height="18" rx="3" fill="var(--primary)" opacity="0.7"/><text x="132" y="31" fill="#fff">Guest OS</text>
          <rect x="24" y="40" width="140" height="16" rx="3" fill="var(--primary)"/><text x="94" y="52" fill="#fff">Hypervisor</text>
          <rect x="24" y="60" width="140" height="16" rx="3" fill="var(--primary-l)"/><text x="94" y="72" fill="#fff">Hardware</text>
          <text x="290" y="12" font-weight="700" fill="var(--primary)">Type 2 (hosted)</text>
          <rect x="224" y="18" width="130" height="14" rx="3" fill="var(--primary)" opacity="0.7"/><text x="289" y="29" fill="#fff">Guest OS</text>
          <rect x="224" y="34" width="130" height="14" rx="3" fill="var(--primary)"/><text x="289" y="45" fill="#fff">Hypervisor</text>
          <rect x="224" y="50" width="130" height="14" rx="3" fill="var(--primary)" opacity="0.5"/><text x="289" y="61" fill="#fff">Host OS</text>
          <rect x="224" y="66" width="130" height="14" rx="3" fill="var(--primary-l)"/><text x="289" y="77" fill="#fff">Hardware</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Virtualization** lets one machine run many isolated OSes — the foundation of **cloud computing**. **Type 1** hypervisors (ESXi, Hyper-V) run directly on hardware (faster, for servers); **Type 2** (VirtualBox, VMware Workstation) run on a host OS (handy on a laptop).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Define virtualization & hypervisor, distinguish Type 1 (bare-metal) vs Type 2 (hosted), and link virtualization to cloud (IaaS). VM isolation benefits are common.",
    },
  ],

  "linux-os": [
    {
      kind: "p",
      text: "**Linux** is a free, open-source, Unix-like OS built around a **monolithic kernel** with loadable modules. Users interact through a **shell**; the kernel manages processes, memory, files and devices.",
    },
    {
      kind: "ul",
      items: [
        "**Everything is a file** — devices, sockets and processes appear under the file system.",
        "**Kernel modules** load/unload drivers without rebooting; processes are created with **fork()** + **exec()**.",
        "Design goals: portability, multiuser & multitasking, and a clear separation of **kernel space vs user space**.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Linux's mantra is **‘everything is a file’**, and its kernel is **monolithic but modular** (drivers load at runtime). The **shell** is the user's command interface; the **kernel** is the resource manager beneath it.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Recall Linux design principles (monolithic+modular kernel, ‘everything is a file’), fork/exec process creation, and shell vs kernel. Open-source/Unix-like heritage is a common one-liner.",
    },
  ],

  "windows-os": [
    {
      kind: "p",
      text: "**Windows** is a widely used commercial OS with a **hybrid (micro-kernel-influenced) design**, a rich GUI, and broad hardware/software support. It emphasises usability and backward compatibility.",
    },
    {
      kind: "ul",
      items: [
        "**Layered/hybrid architecture** with the **HAL (Hardware Abstraction Layer)** isolating hardware specifics.",
        "**NTFS** file system supports journaling, permissions and large volumes.",
        "Features like **Terminal Services** and **Fast User Switching** allow multiple user sessions.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Windows uses a **hybrid kernel** (not purely monolithic or micro) plus a **HAL** so the same OS runs on varied hardware. **NTFS** (journaling, ACLs) is its core file system.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Recall the hybrid design + HAL, NTFS features, and Terminal Services / Fast User Switching. Windows vs Linux (commercial vs open-source, hybrid vs monolithic) is a likely compare.",
    },
  ],

  "distributed-systems": [
    {
      kind: "p",
      text: "A **distributed system** ties many independent computers (nodes) over a network so they appear to users as **one coherent system**. It scales beyond a single machine and survives individual failures.",
    },
    {
      kind: "ul",
      items: [
        "**Network OS** — users are aware of multiple machines (remote login, file sharing). **Distributed OS** — the multiplicity is hidden (true single-system image).",
        "Goals: **transparency** (hide the distribution), **scalability**, **fault tolerance**, and resource sharing.",
        "A **distributed file system (DFS)** lets nodes access shared files as if local.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The dream is **transparency** — many machines that *look like one*. A **network OS** exposes the separate machines; a **distributed OS** hides them. Challenges: clock synchronization, partial failure, and consistency.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Network OS vs distributed OS (aware vs transparent), goals (transparency, scalability, fault tolerance), and distributed file systems. ‘Single-system image’ defines a distributed OS.",
    },
  ],

  "os-disk": [
    {
      kind: "p",
      text: "A magnetic disk's slowest action is **moving the read/write head** across tracks (**seek time**). When many I/O requests are waiting, **disk scheduling** chooses the order that moves the head the **least** — directly speeding up the whole system.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "It's a **lift (elevator)** problem: with people waiting on many floors, do you serve them in the order they pressed (FCFS), the nearest first (SSTF), or sweep smoothly up then down (SCAN)? The smart sweep wastes the least travel.",
    },
    {
      kind: "diagram",
      caption: "SSTF from head = 53 for queue {65, 40, 18, 70}: always jump to the nearest pending track.",
      svg: `<svg viewBox="0 0 384 116" role="img" aria-label="SSTF head movement">
        <line x1="20" y1="78" x2="360" y2="78" stroke="var(--border)"/>
        ${[
          ["18", 40],
          ["40", 110],
          ["53", 175],
          ["65", 250],
          ["70", 320],
        ]
          .map((d) => `<line x1="${d[1]}" y1="73" x2="${d[1]}" y2="83" stroke="var(--muted)"/><text x="${d[1]}" y="98" text-anchor="middle" font-size="10" fill="var(--muted)">${d[0]}</text>`)
          .join("")}
        <circle cx="175" cy="78" r="5" fill="var(--primary)"/><text x="175" y="62" text-anchor="middle" font-size="10" fill="var(--primary)" font-weight="700">start 53</text>
        <path d="M175,78 C200,40 235,40 250,78" fill="none" stroke="var(--primary)" stroke-width="2"/>
        <path d="M250,78 C290,46 305,46 320,78" fill="none" stroke="var(--primary)" stroke-width="2"/>
        <path d="M320,78 C230,22 130,22 110,78" fill="none" stroke="var(--primary-l)" stroke-width="2"/>
        <path d="M110,78 C90,56 60,56 40,78" fill="none" stroke="var(--primary-l)" stroke-width="2"/>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Algorithm", "Idea"],
      rows: [
        ["FCFS", "serve in arrival order — fair, but the head can swing wildly"],
        ["SSTF", "serve the nearest request next — good, but can starve far tracks"],
        ["SCAN (elevator)", "sweep one direction to the disk end, then reverse"],
        ["LOOK", "like SCAN but turn around at the last request, not the disk end"],
        ["C-SCAN / C-LOOK", "sweep one way only, then jump back — more uniform waiting"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The metric is **total head movement** (sum of |from − to| across the service order). **FCFS** is simplest, **SSTF** reduces movement but risks starvation, and **SCAN/LOOK** (elevator) give a fair, low-movement sweep. Smaller total = faster.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Read the question",
      text: "For SCAN/LOOK you must know the **direction** (toward larger or smaller tracks) — it's usually given; if not, assume movement toward larger numbers. **SCAN** goes to the physical end (track 0 or max); **LOOK** stops at the last request.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "**Compute total head movement** for FCFS / SSTF / SCAN / LOOK / C-SCAN given a request queue and starting head — a guaranteed numerical. Also identify the algorithm from a head-movement graph.",
    },
  ],

  // ------------------------------------------------------------ DISCRETE MATH
  "discrete-groups": [
    {
      kind: "p",
      text: "**Group theory** studies a *set together with one operation* (like + or ×) and asks: how well-behaved is that operation? The answer is a small ladder of names — semigroup, monoid, group, Abelian group — each adding one more rule.",
    },
    {
      kind: "p",
      text: "Start with a set G and an operation ∗. Four properties can hold, and they stack:",
    },
    {
      kind: "diagram",
      caption: "Each rung adds one axiom. Reach all four (plus commutativity) and you have an Abelian group.",
      svg: `<svg viewBox="0 0 384 168" role="img" aria-label="Algebraic structure ladder">
        <g font-size="11">
          ${[
            ["Semigroup", "Closure + Associativity"],
            ["Monoid", "+ Identity element"],
            ["Group", "+ Inverse for each element"],
            ["Abelian group", "+ Commutativity (a∗b = b∗a)"],
          ]
            .map(
              ([name, desc], i) =>
                `<rect x="${20 + i * 14}" y="${18 + i * 34}" width="${300 - i * 14}" height="28" rx="6" fill="var(--primary)" opacity="${0.25 + i * 0.18}"/>` +
                `<text x="${32 + i * 14}" y="${36 + i * 34}" fill="var(--text)" font-weight="700">${name}</text>` +
                `<text x="${330}" y="${36 + i * 34}" text-anchor="end" fill="var(--muted)" font-size="9.5">${desc}</text>`,
            )
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "ol",
      items: [
        "**Closure** — a ∗ b is always back inside G.",
        "**Associativity** — (a ∗ b) ∗ c = a ∗ (b ∗ c).",
        "**Identity** — an element e with a ∗ e = e ∗ a = a.",
        "**Inverse** — each a has an a⁻¹ with a ∗ a⁻¹ = e.",
      ],
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Think of (**ℤ, +**): adding integers stays in ℤ (closure), groups freely (associative), 0 does nothing (identity), and −a undoes a (inverse) — and order doesn't matter. So it's an **Abelian group**. But (**ℤ, ×**) has no integer inverse for 2, so it stops at **monoid**.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Memorise the ladder: **Semigroup → (add identity) Monoid → (add inverse) Group → (add commutativity) Abelian group**. Rings and fields just add a *second* operation on top of a group.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Handy facts & traps",
      text: "Identity and inverses are **unique**. The inverse of a product reverses order: **(a ∗ b)⁻¹ = b⁻¹ ∗ a⁻¹**. ‘Group’ does **not** require commutativity — only an *Abelian* group does.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Given a set + operation (often a Cayley table or modular arithmetic), decide if it's a semigroup / monoid / group / Abelian group, find the identity & an inverse, and simplify expressions using (ab)⁻¹ = b⁻¹a⁻¹.",
    },
  ],

  // ----------------------------------------------------- THEORY OF COMPUTATION
  // ===================================================================
  // UNIT 8 — THEORY OF COMPUTATION & COMPILERS (educational)
  // ===================================================================
  "toc-basics": [
    {
      kind: "p",
      text: "**Theory of Computation** asks the biggest questions in CS: *what can be computed at all, and how hard is it?* It starts with **formal languages** — precise sets of strings — and the **machines** that recognise them.",
    },
    {
      kind: "ul",
      items: [
        "**Alphabet (Σ)** — a finite set of symbols, e.g. {a, b}. **String** — a finite sequence over Σ. **Language** — a set of strings.",
        "Each language *class* has a matching machine and grammar — captured by the **Chomsky hierarchy**.",
      ],
    },
    {
      kind: "diagram",
      caption: "The Chomsky hierarchy: each class is a strict subset of the one outside it.",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Chomsky hierarchy">
        <rect x="20" y="10" width="344" height="110" rx="8" fill="var(--primary)" opacity="0.10" stroke="var(--primary)"/>
        <text x="120" y="24" font-size="9" fill="var(--text)">Type 0 · Recursively Enumerable · Turing Machine</text>
        <rect x="40" y="30" width="304" height="82" rx="8" fill="var(--primary)" opacity="0.14"/>
        <text x="130" y="44" font-size="9" fill="var(--text)">Type 1 · Context-Sensitive · LBA</text>
        <rect x="64" y="50" width="256" height="56" rx="8" fill="var(--primary)" opacity="0.22"/>
        <text x="140" y="64" font-size="9" fill="var(--text)">Type 2 · Context-Free · PDA</text>
        <rect x="92" y="70" width="200" height="30" rx="8" fill="var(--primary)" opacity="0.45"/>
        <text x="120" y="89" font-size="9" fill="#fff" font-weight="700">Type 3 · Regular · Finite Automaton</text>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "Memorise the ladder **Regular ⊂ Context-Free ⊂ Context-Sensitive ⊂ Recursively-Enumerable**, with machines **FA ⊂ PDA ⊂ LBA ⊂ TM**. As you go outward, the machine gets more memory (none → stack → bounded tape → infinite tape) and recognises more languages.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match language type ↔ grammar ↔ machine (Type 3 = regular = FA, Type 2 = CFG = PDA, Type 0 = RE = TM), and which class a given language belongs to. The hierarchy ordering is a guaranteed item.",
    },
  ],

  "regular-languages": [
    {
      kind: "p",
      text: "**Regular languages** are the simplest class — recognised by a **finite automaton** with no memory beyond its current state. They're exactly what **regular expressions** describe.",
    },
    {
      kind: "diagram",
      caption: "A DFA: start at q0, follow arrows on input; double circle = accepting state.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="DFA state diagram">
        <g font-size="11">
          <line x1="14" y1="48" x2="38" y2="48" stroke="var(--muted)" marker-end="url(#dfa)"/>
          <circle cx="60" cy="48" r="18" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="60" y="52" text-anchor="middle" fill="var(--text)">q0</text>
          <circle cx="200" cy="48" r="18" fill="var(--primary)"/><circle cx="200" cy="48" r="22" fill="none" stroke="var(--primary)"/><text x="200" y="52" text-anchor="middle" fill="#fff">q1</text>
          <path d="M78,42 Q130,18 182,42" fill="none" stroke="var(--muted)" marker-end="url(#dfa)"/><text x="130" y="22" text-anchor="middle" font-size="10" fill="var(--muted)">a</text>
          <path d="M182,56 Q130,80 78,56" fill="none" stroke="var(--muted)" marker-end="url(#dfa)"/><text x="130" y="80" text-anchor="middle" font-size="10" fill="var(--muted)">a</text>
          <path d="M44,72 Q40,90 60,90 Q80,90 76,72" fill="none" stroke="var(--muted)" marker-end="url(#dfa)"/><text x="60" y="90" text-anchor="middle" font-size="9" fill="var(--muted)">b</text>
          <text x="290" y="44" font-size="9" fill="var(--muted)">accepts strings</text>
          <text x="290" y="58" font-size="9" fill="var(--muted)">with an odd # of a's</text>
        </g>
        <defs><marker id="dfa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**DFA** — exactly one move per (state, symbol). **NFA** — may have several (or ε) moves. They're **equally powerful** (every NFA converts to a DFA).",
        "**Regular expressions** (a|b)*abb and **regular grammars** describe the same languages.",
        "**Pumping lemma** — every long enough string in a regular language can be ‘pumped’ (a middle part repeated). Used to *prove a language is NOT regular* (e.g. aⁿbⁿ).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**DFA = NFA = regular expression = regular grammar** — four views of the same class. A finite automaton has **no memory**, so it *cannot count* unboundedly: that's why **aⁿbⁿ is not regular** (proved with the pumping lemma).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Build/trace a DFA, convert NFA→DFA or regex→automaton, minimise a DFA, and use the pumping lemma to show non-regularity. ‘aⁿbⁿ is not regular’ and ‘DFA and NFA are equivalent in power’ are classics.",
    },
  ],

  "turing-machines": [
    {
      kind: "p",
      text: "A **Turing Machine (TM)** is the most powerful model — an infinite tape it can read, write, and move across. The **Church-Turing thesis** says *anything computable* can be computed by a TM. It defines the limit of computation itself.",
    },
    {
      kind: "diagram",
      caption: "A TM: a control unit (states) with a head reading/writing an infinite tape.",
      svg: `<svg viewBox="0 0 384 100" role="img" aria-label="Turing machine">
        <g font-size="11" font-family="monospace" text-anchor="middle">
          ${["a", "b", "a", "□", "□"].map((c, i) => `<rect x="${90 + i * 40}" y="50" width="40" height="30" fill="var(--card)" stroke="var(--muted)"/><text x="${110 + i * 40}" y="70" fill="var(--text)">${c}</text>`).join("")}
          <polygon points="150,44 142,32 158,32" fill="var(--primary)"/>
          <rect x="120" y="8" width="60" height="24" rx="5" fill="var(--primary)"/><text x="150" y="24" fill="#fff" font-size="9" font-family="sans-serif">control</text>
          <text x="320" y="70" font-size="9" font-family="sans-serif" fill="var(--muted)">head read/write,</text>
          <text x="320" y="84" font-size="9" font-family="sans-serif" fill="var(--muted)">move L/R</text>
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Language class", "Decided by", "Halts?"],
      rows: [
        ["Recursive (decidable)", "a TM that always halts", "always → yes/no"],
        ["Recursively Enumerable", "a TM that halts on ‘yes’", "may loop forever on ‘no’"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Recursive ⊂ Recursively Enumerable.** A **recursive (decidable)** language has a TM that *always halts* with a yes/no answer; an **RE** language's TM may run forever on non-members. Variants (multi-tape, non-deterministic) add no extra power — they're all equivalent to the basic TM.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Recursive vs recursively enumerable (always-halts vs may-loop), the Church-Turing thesis, and that TM variants are equally powerful. Build a TM for simple languages like aⁿbⁿ.",
    },
  ],

  "unsolvable-complexity": [
    {
      kind: "p",
      text: "Some problems **no algorithm can ever solve** — not because we're not clever enough, but provably. These are **undecidable** problems, and the most famous is the **Halting Problem**.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "The Halting Problem: ‘Will this program eventually stop, or loop forever?’ There's no general program that can answer this for *every* program — a self-referential contradiction (feed the checker its own opposite) proves it's impossible.",
    },
    {
      kind: "ul",
      items: [
        "**Halting problem** — undecidable: no TM decides whether an arbitrary TM halts on an input.",
        "**Post Correspondence Problem (PCP)** — another classic undecidable problem.",
        "Many questions about CFLs (e.g. ‘is a CFG ambiguous?’) are also undecidable.",
        "**Tractable vs intractable** — solvable in polynomial time (P) vs not (NP-hard and beyond).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Decidable** = some TM always halts with the answer. **Undecidable** = no such TM exists (Halting Problem, PCP). Undecidable is about *possibility*; **intractable** is about *efficiency* (possible but too slow).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify decidable vs undecidable problems (Halting Problem & PCP are undecidable), and decidable vs intractable. ‘The halting problem is undecidable’ is near-guaranteed.",
    },
  ],

  "toc-cfg": [
    {
      kind: "p",
      text: "A **Context-Free Grammar (CFG)** describes languages with *nested structure* — balanced brackets, arithmetic expressions, programming syntax — things a finite automaton can't handle because it can't count. CFGs are the backbone of every compiler's parser.",
    },
    {
      kind: "p",
      text: "A CFG is **G = (V, T, P, S)**: non-terminals V, terminals T, productions P (each `A → α`, a *single* non-terminal on the left), and start symbol S. It's recognised by a **pushdown automaton** (a finite automaton + a stack).",
    },
    {
      kind: "code",
      text: "S → a S b | ε        // generates { aⁿbⁿ | n ≥ 0 }",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A CFG is a set of ‘**substitution rules**’. Start with S and keep replacing a non-terminal by the right-hand side of one of its rules until only terminals remain — like expanding shorthand into full text. The record of expansions is a **parse tree**.",
    },
    {
      kind: "ul",
      items: [
        "**Ambiguity** — a grammar is ambiguous if some string has **two different parse trees**. (Whether a CFG is ambiguous is *undecidable* in general.)",
        "**Chomsky Normal Form (CNF):** every rule is `A → BC` or `A → a`. **Greibach Normal Form (GNF):** every rule is `A → aα` (terminal first).",
      ],
    },
    {
      kind: "h", text: "FIRST and FOLLOW — the parser's lookahead" },
    {
      kind: "p",
      text: "To build a predictive (LL(1)) parser, we precompute two sets for the grammar symbols:",
    },
    {
      kind: "table",
      head: ["Set", "Question it answers"],
      rows: [
        ["FIRST(α)", "which terminals can a string from α START with? (ε if α can vanish)"],
        ["FOLLOW(A)", "which terminals can appear immediately AFTER A? (\\$ for the start symbol)"],
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "Worked example",
      text: "For E → T E′,  E′ → + T E′ | ε,  T → id:  **FIRST(E)** = {id}, **FIRST(E′)** = {+, ε}, **FOLLOW(E)** = {\\$}, **FOLLOW(E′)** = {\\$}, **FOLLOW(T)** = {+, \\$}. (FIRST looks at what a symbol *starts* with; FOLLOW at what *comes after* it.)",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**FIRST = ‘what can it start with’; FOLLOW = ‘what can come right after’.** They build the LL(1) parsing table. Add `$` to FOLLOW(start). CFGs are strictly more powerful than regular languages (CFL ⊃ regular).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "**Compute FIRST and FOLLOW sets**, identify the language of a CFG, check membership/ambiguity, and recognise CNF/GNF. First & Follow are explicitly exam-flagged — practise them until automatic.",
    },
  ],

  "syntax-analysis": [
    {
      kind: "p",
      text: "**Syntax analysis (parsing)** is the compiler phase that checks whether a token stream follows the grammar, building a **parse tree**. There are two directions to do it: top-down and bottom-up.",
    },
    {
      kind: "diagram",
      caption: "Top-down builds the tree from the root (start symbol) down; bottom-up from the leaves (tokens) up.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="Top-down versus bottom-up parsing">
        <g font-size="9" text-anchor="middle">
          <text x="96" y="14" font-weight="700" fill="var(--primary)">Top-down (LL)</text>
          <circle cx="96" cy="30" r="7" fill="var(--primary)"/><circle cx="72" cy="60" r="7" fill="var(--primary)" opacity="0.6"/><circle cx="120" cy="60" r="7" fill="var(--primary)" opacity="0.6"/>
          <line x1="90" y1="35" x2="76" y2="54" stroke="var(--muted)"/><line x1="102" y1="35" x2="116" y2="54" stroke="var(--muted)"/>
          <line x1="96" y1="74" x2="96" y2="40" stroke="#c0392b" marker-end="url(#sa)"/>
          <text x="290" y="14" font-weight="700" fill="var(--primary)">Bottom-up (LR)</text>
          <circle cx="290" cy="30" r="7" fill="var(--primary)"/><circle cx="266" cy="60" r="7" fill="var(--primary)" opacity="0.6"/><circle cx="314" cy="60" r="7" fill="var(--primary)" opacity="0.6"/>
          <line x1="284" y1="35" x2="270" y2="54" stroke="var(--muted)"/><line x1="296" y1="35" x2="310" y2="54" stroke="var(--muted)"/>
          <line x1="290" y1="40" x2="290" y2="74" stroke="#c0392b" marker-end="url(#sa)"/>
        </g>
        <defs><marker id="sa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Parser", "Approach", "Power"],
      rows: [
        ["LL(1) / Recursive descent", "top-down, leftmost derivation", "weakest"],
        ["LR(0), SLR(1)", "bottom-up, rightmost in reverse", "stronger"],
        ["LALR(1)", "bottom-up, compact tables", "used by yacc/bison"],
        ["CLR(1) / LR(1)", "bottom-up, most powerful", "largest tables"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Top-down (LL) parses leftmost; bottom-up (LR) parses rightmost-in-reverse.** Power order: **LR(0) < SLR(1) < LALR(1) < CLR(1)**. **yacc/bison generate LALR(1)** parsers. Top-down can't handle left recursion (must remove it first).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match parser ↔ approach (LL = top-down, LR = bottom-up), the power ordering, yacc = LALR(1), and removing left recursion for LL. Shift-reduce vs reduce-reduce conflicts appear too.",
    },
  ],

  "semantic-analysis": [
    {
      kind: "p",
      text: "Syntax says a sentence is *grammatical*; **semantic analysis** checks it actually *makes sense* — type checking, scope rules, declared-before-use. It hangs **meaning** onto the parse tree using **attribute grammars**.",
    },
    {
      kind: "ul",
      items: [
        "**Synthesized attribute** — value flows **up** the tree (computed from children). S-attributed grammars use only these.",
        "**Inherited attribute** — value flows **down/sideways** (from parent or siblings). L-attributed grammars allow both, evaluated left-to-right.",
        "**Syntax-Directed Definition (SDD)** / translation attaches semantic rules to grammar productions.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Synthesized = bottom-up (from children); Inherited = top-down/sideways (from parent/siblings).** **S-attributed** ⇒ only synthesized; **L-attributed** ⇒ synthesized + restricted inherited. Type checking is the headline job of this phase.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Synthesized vs inherited attributes (direction of flow), S- vs L-attributed definitions, and evaluation order via the dependency graph. ‘Type checking happens in semantic analysis’ is a common one-liner.",
    },
  ],

  "runtime-system": [
    {
      kind: "p",
      text: "When a program runs, the compiler must arrange **memory for function calls** — local variables, parameters, and where to return. This is the job of **activation records** on the run-time stack.",
    },
    {
      kind: "diagram",
      caption: "Each function call pushes an activation record; returning pops it.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Activation record stack">
        <g font-size="9" text-anchor="middle">
          ${["main()", "f()", "g()  ← top"].map((s, i) => `<rect x="120" y="${74 - i * 26}" width="144" height="24" rx="3" fill="var(--primary)" opacity="${0.5 + i * 0.18}"/><text x="192" y="${90 - i * 26}" fill="#fff">${s}</text>`).join("")}
          <text x="300" y="40" fill="var(--muted)" font-size="8">each frame:</text>
          <text x="300" y="54" fill="var(--muted)" font-size="8">params, locals,</text>
          <text x="300" y="68" fill="var(--muted)" font-size="8">return addr</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "An **activation record (stack frame)** holds a call's parameters, local variables, return address and saved registers. Calls **push**, returns **pop** — LIFO, which is why recursion works. The **symbol table** tracks each name's type, scope and address across compilation.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Contents of an activation record, stack allocation for (recursive) calls, parameter-passing mechanisms (call by value/reference), and the role of the symbol table.",
    },
  ],

  "intermediate-code": [
    {
      kind: "p",
      text: "Between the source-language front end and the machine-specific back end, compilers generate a neutral **intermediate representation (IR)** — machine-independent, easy to optimise. The classic form is **three-address code**.",
    },
    {
      kind: "diagram",
      caption: "One source expression breaks into simple three-address instructions (≤ one operator each).",
      svg: `<svg viewBox="0 0 384 92" role="img" aria-label="Three address code">
        <g font-family="monospace" font-size="12">
          <text x="20" y="24" fill="var(--text)">a = b + c * d</text>
          <text x="20" y="30" font-size="8" font-family="sans-serif" fill="var(--muted)"> </text>
          <line x1="180" y1="20" x2="210" y2="20" stroke="var(--muted)" marker-end="url(#ic2)"/>
          <text x="230" y="20" fill="var(--primary)">t1 = c * d</text>
          <text x="230" y="44" fill="var(--primary)">t2 = b + t1</text>
          <text x="230" y="68" fill="var(--primary)">a = t2</text>
        </g>
        <defs><marker id="ic2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Three-address code** has at most one operator per instruction (`x = y op z`), using temporaries (t1, t2…). It can be stored as **quadruples** (op, arg1, arg2, result), **triples**, or **indirect triples**. An IR keeps the compiler **portable** — one front end, many back ends.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Translate an expression to three-address code, and quadruples vs triples vs indirect triples. ‘Three-address code has ≤ 1 operator per statement’ is the key fact.",
    },
  ],

  "code-optimization": [
    {
      kind: "p",
      text: "The compiler's last stages **improve** the code (faster, smaller) and then emit real machine instructions. Optimisation must never change *what the program computes* — only *how efficiently*.",
    },
    {
      kind: "diagram",
      caption: "The compiler phases, front to back.",
      svg: `<svg viewBox="0 0 384 64" role="img" aria-label="Compiler phases">
        <g font-size="7.5" text-anchor="middle">
          ${["Lexical", "Syntax", "Semantic", "Inter. code", "Optimize", "Code gen"]
            .map((s, i) => `<rect x="${6 + i * 63}" y="22" width="56" height="22" rx="4" fill="var(--primary)" opacity="${0.45 + i * 0.09}"/><text x="${34 + i * 63}" y="36" fill="#fff" font-size="7.5">${s}</text>${i < 5 ? `<text x="${64 + i * 63}" y="36" fill="var(--muted)">›</text>` : ""}`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Optimization", "Does"],
      rows: [
        ["Constant folding", "compute constant expressions at compile time (3*4 → 12)"],
        ["Common subexpression elimination", "reuse a value instead of recomputing"],
        ["Dead-code elimination", "remove code whose result is never used"],
        ["Loop optimization", "move invariant code out of loops, unrolling"],
        ["Peephole optimization", "local fixes on a small instruction window"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Optimizations are **local** (within a basic block), **global** (across a function, via data-flow analysis) or **loop** (where programs spend most time). **Peephole** optimization scans a tiny window of instructions for quick wins. None may change the program's output.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify an optimization technique from an example (constant folding, dead code, common subexpression), order the compiler phases, and local vs global vs peephole. Machine-independent vs machine-dependent optimization is a common split.",
    },
  ],


  // ------------------------------------------------------------- COMP GRAPHICS
  "gfx-2d-transform": [
    {
      kind: "p",
      text: "To animate or move a shape, graphics software changes the coordinates of its points. The three building-block **2-D transformations** are **translation** (slide), **scaling** (resize) and **rotation** (turn) — combine them and you can do anything.",
    },
    {
      kind: "diagram",
      caption: "Translate slides, scale resizes, rotate turns about the origin.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="2D transformations">
        <g fill="none" stroke-width="2">
          <text x="64" y="16" text-anchor="middle" font-size="10" fill="var(--primary)" font-weight="700">Translate</text>
          <rect x="24" y="60" width="34" height="34" stroke="var(--muted)"/>
          <rect x="64" y="40" width="34" height="34" stroke="var(--primary)"/>
          <text x="190" y="16" text-anchor="middle" font-size="10" fill="var(--primary)" font-weight="700">Scale</text>
          <rect x="158" y="58" width="26" height="26" stroke="var(--muted)"/>
          <rect x="158" y="40" width="48" height="48" stroke="var(--primary)"/>
          <text x="312" y="16" text-anchor="middle" font-size="10" fill="var(--primary)" font-weight="700">Rotate</text>
          <rect x="292" y="52" width="38" height="38" stroke="var(--muted)"/>
          <rect x="292" y="52" width="38" height="38" stroke="var(--primary)" transform="rotate(25 311 71)"/>
        </g>
      </svg>`,
    },
    {
      kind: "p",
      text: "Scaling and rotation are easy as matrix multiplication, but **translation is addition** — a different kind of operation. The clever fix is **homogeneous coordinates**: write a point as (x, y, **1**), and now *all three* transforms become a single 3×3 matrix multiply.",
    },
    {
      kind: "table",
      head: ["Transform", "Effect", "Matrix (homogeneous)"],
      rows: [
        ["Translation", "shift by (tx, ty)", "[[1,0,tx],[0,1,ty],[0,0,1]]"],
        ["Scaling", "resize by (sx, sy)", "[[sx,0,0],[0,sy,0],[0,0,1]]"],
        ["Rotation", "turn by angle θ", "[[cosθ,−sinθ,0],[sinθ,cosθ,0],[0,0,1]]"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Homogeneous coordinates (x, y, 1) exist so translation also fits matrix multiplication.** Then a chain of transforms = one product matrix — but order matters: **rotate-then-translate ≠ translate-then-rotate** (matrix multiplication isn't commutative).",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Rotating about a point (not the origin)",
      text: "To rotate/scale about an arbitrary pivot: **translate the pivot to the origin → transform → translate back**. This three-step composite is a classic exam construction.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match transform ↔ matrix, apply a transform to a given point, and order a composite-transform sequence. Remember why homogeneous coordinates are needed (to express **translation** as multiplication) and that transform order is not commutative.",
    },
  ],

  // ===================================================================
  // ===================================================================
  // UNIT 9 — DATA COMMUNICATION & COMPUTER NETWORKS (educational)
  // ===================================================================
  "data-communication": [
    {
      kind: "p",
      text: "**Data communication** is the exchange of data between two devices over a medium. For it to work well it must deliver to the right place, accurately, on time, and with little **jitter** (variation in delay).",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Think of the **postal system**: a message (data) travels over roads (the medium), in one or both directions, sometimes shared with other mail (multiplexing), routed hop by hop (switching). Networking just makes this electronic and fast.",
    },
    {
      kind: "table",
      head: ["Communication mode", "Direction"],
      rows: [
        ["Simplex", "one way only (keyboard → computer)"],
        ["Half-duplex", "both ways, one at a time (walkie-talkie)"],
        ["Full-duplex", "both ways at once (phone call)"],
      ],
    },
    {
      kind: "ul",
      items: [
        "**Signals:** *analog* = continuous; *digital* = discrete levels. **Bandwidth, throughput, latency** measure capacity and delay.",
        "**Multiplexing** shares one link: **FDM** (by frequency), **TDM** (by time slots), **WDM** (by wavelength, on fibre).",
        "**Transmission media:** twisted pair, coaxial, **optical fibre** (highest bandwidth, immune to EMI), and wireless.",
      ],
    },
    {
      kind: "diagram",
      caption: "Circuit switching reserves one path for the whole call; packet switching routes packets hop-by-hop.",
      svg: `<svg viewBox="0 0 380 120" role="img" aria-label="Circuit vs packet switching">
        <g font-size="10" fill="var(--text)">
          <text x="10" y="14" font-weight="700" fill="var(--muted)">Circuit</text>
          <circle cx="30" cy="40" r="9" fill="var(--primary)"/><circle cx="120" cy="40" r="9" fill="var(--primary-l)"/><circle cx="210" cy="40" r="9" fill="var(--primary-l)"/><circle cx="300" cy="40" r="9" fill="var(--primary)"/>
          <line x1="39" y1="40" x2="111" y2="40" stroke="var(--primary)" stroke-width="3"/><line x1="129" y1="40" x2="201" y2="40" stroke="var(--primary)" stroke-width="3"/><line x1="219" y1="40" x2="291" y2="40" stroke="var(--primary)" stroke-width="3"/>
          <text x="10" y="80" font-weight="700" fill="var(--muted)">Packet</text>
          <circle cx="30" cy="105" r="9" fill="var(--primary)"/><circle cx="120" cy="105" r="9" fill="var(--primary-l)"/><circle cx="210" cy="105" r="9" fill="var(--primary-l)"/><circle cx="300" cy="105" r="9" fill="var(--primary)"/>
          <line x1="39" y1="105" x2="111" y2="105" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 3"/><line x1="129" y1="105" x2="201" y2="105" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 3"/><line x1="219" y1="105" x2="291" y2="105" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 3"/>
          <rect x="60" y="99" width="12" height="12" rx="2" fill="var(--primary)"/><rect x="150" y="99" width="12" height="12" rx="2" fill="var(--primary)"/>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Circuit switching** dedicates a path (no per-packet overhead, but wastes idle capacity); **packet switching** sends independent packets (efficient, variable delay) as a **datagram** or along a **virtual circuit**. Useful formula: **bit rate = baud rate × log₂(levels)**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Simplex/half/full-duplex, FDM vs TDM, circuit vs packet (datagram vs virtual circuit), and bit-rate vs baud-rate. Fibre = highest bandwidth/immune to EMI is a common match.",
    },
  ],

  "computer-networks": [
    {
      kind: "p",
      text: "A **computer network** links devices so they can share data and resources. Networks differ by **topology** (how they're wired) and **scale** (how far they reach).",
    },
    {
      kind: "diagram",
      caption: "Common topologies — each trades cost against reliability.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Network topologies">
        <g font-size="9" text-anchor="middle">
          <text x="50" y="14" fill="var(--primary)" font-weight="700">Bus</text>
          <line x1="20" y1="40" x2="84" y2="40" stroke="var(--muted)" stroke-width="2"/>
          ${[28, 52, 76].map((x) => `<circle cx="${x}" cy="52" r="5" fill="var(--primary)"/><line x1="${x}" y1="40" x2="${x}" y2="47" stroke="var(--muted)"/>`).join("")}
          <text x="148" y="14" fill="var(--primary)" font-weight="700">Star</text>
          <circle cx="148" cy="46" r="6" fill="var(--primary)"/>
          ${[[118, 30], [178, 30], [118, 66], [178, 66]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="var(--primary-l)"/><line x1="148" y1="46" x2="${p[0]}" y2="${p[1]}" stroke="var(--muted)"/>`).join("")}
          <text x="250" y="14" fill="var(--primary)" font-weight="700">Ring</text>
          ${[[250, 28], [278, 50], [266, 74], [234, 74], [222, 50]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="var(--primary)"/>`).join("")}
          <polygon points="250,28 278,50 266,74 234,74 222,50" fill="none" stroke="var(--muted)"/>
          <text x="340" y="14" fill="var(--primary)" font-weight="700">Mesh</text>
          ${[[318, 30], [362, 30], [318, 70], [362, 70]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="var(--primary)"/>`).join("")}
          <line x1="318" y1="30" x2="362" y2="30" stroke="var(--muted)"/><line x1="318" y1="70" x2="362" y2="70" stroke="var(--muted)"/><line x1="318" y1="30" x2="318" y2="70" stroke="var(--muted)"/><line x1="362" y1="30" x2="362" y2="70" stroke="var(--muted)"/><line x1="318" y1="30" x2="362" y2="70" stroke="var(--muted)"/><line x1="362" y1="30" x2="318" y2="70" stroke="var(--muted)"/>
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["By scale", "Covers"],
      rows: [
        ["LAN", "a building / campus (fast, private)"],
        ["MAN", "a city"],
        ["WAN", "countries / the globe (the Internet is the biggest WAN)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Star** is today's common LAN layout (each device to a central switch — one failure is isolated); **mesh** is most reliable but costly (n(n−1)/2 links for full mesh); **bus** uses the least cable but a break kills it. Scale grows **LAN → MAN → WAN**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match topology ↔ property (mesh = most reliable, star = central switch), count mesh links n(n−1)/2, and LAN/MAN/WAN scale. ‘Internet = largest WAN’ appears too.",
    },
  ],

  "net-osi": [
    {
      kind: "p",
      text: "The **OSI model** (by ISO) is a 7-layer blueprint for how data travels from an app on one machine to an app on another. Each layer does one job and talks only to the layers directly above and below it.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Sending data is like **mailing a letter through a company's departments**: you write it (Application), it's packaged (Presentation), logged (Session), split into envelopes (Transport), addressed & routed (Network), handed van-to-van (Data Link), and physically driven (Physical). Each department only knows its own task.",
    },
    {
      kind: "diagram",
      caption: "The 7 layers (top to bottom) with the data unit (PDU) each handles.",
      svg: `<svg viewBox="0 0 380 300" role="img" aria-label="OSI seven layer stack">
        ${[
          ["7", "Application", "Data", "var(--primary)"],
          ["6", "Presentation", "Data", "var(--primary)"],
          ["5", "Session", "Data", "var(--primary)"],
          ["4", "Transport", "Segment", "var(--primary-l)"],
          ["3", "Network", "Packet", "var(--primary-l)"],
          ["2", "Data Link", "Frame", "var(--primary-l)"],
          ["1", "Physical", "Bits", "var(--primary-l)"],
        ]
          .map(
            (r, i) => `
        <g transform="translate(0 ${i * 40 + 6})">
          <rect x="34" y="0" width="250" height="34" rx="6" fill="${r[3]}" opacity="0.12" stroke="${r[3]}"/>
          <circle cx="51" cy="17" r="11" fill="${r[3]}"/>
          <text x="51" y="21" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${r[0]}</text>
          <text x="72" y="21" font-size="13" font-weight="700" fill="var(--text)">${r[1]}</text>
          <text x="368" y="21" text-anchor="end" font-size="11" fill="var(--muted)">${r[2]}</text>
        </g>`,
          )
          .join("")}
      </svg>`,
    },
    {
      kind: "table",
      head: ["Layer", "Job", "Examples"],
      rows: [
        ["Application (7)", "services to the user", "HTTP, FTP, SMTP, DNS"],
        ["Presentation (6)", "translation, encryption, compression", "SSL/TLS, JPEG"],
        ["Session (5)", "dialog control & sync", "RPC, NetBIOS"],
        ["Transport (4)", "end-to-end delivery, flow & error control", "TCP, UDP"],
        ["Network (3)", "logical addressing & routing", "IP / Router"],
        ["Data Link (2)", "framing, MAC, error control on a link", "Ethernet / Switch"],
        ["Physical (1)", "raw bits over the medium", "Hub, cables"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Mnemonic top→bottom: *All People Seem To Need Data Processing*. Lock the layer-specific jobs: **encryption = Presentation, dialog = Session, routing = Network, framing/MAC = Data Link**. The leaner **TCP/IP model** merges these into 4 layers.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Order the layers, match layer ↔ function / protocol / device / PDU, and OSI vs TCP/IP. Common: *which layer does routing?* (Network), *flow control?* (Data Link & Transport), *encryption?* (Presentation).",
    },
  ],

  "osi-tcpip-functions": [
    {
      kind: "p",
      text: "This part zooms into the **lower layers' real jobs** — the nuts and bolts that make a single link and a LAN actually work: putting bits into **frames**, catching **errors**, controlling the **flow**, and sharing the **medium** fairly.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Three sub-topics cover it: **Error Detection & Correction** (catch corrupted bits), **Flow & Error Control** (sliding window, piggybacking), and **Multiple Access** (who transmits when on a shared medium). All live mainly in the **Data Link layer**.",
    },
  ],

  "error-control": [
    {
      kind: "p",
      text: "Bits get flipped by noise during transmission. **Error detection & correction** adds **redundant bits** so the receiver can notice — and sometimes fix — the damage, without asking for a resend.",
    },
    {
      kind: "table",
      head: ["Technique", "Power"],
      rows: [
        ["Parity bit", "detects an odd number of bit errors only"],
        ["Checksum", "used by IP/TCP/UDP (one's-complement sum)"],
        ["CRC", "polynomial division; strong burst-error detection (Data Link)"],
        ["Hamming code", "detects AND corrects single-bit errors"],
      ],
    },
    {
      kind: "diagram",
      caption: "Hamming distance = number of differing bit positions (count the 1s in the XOR).",
      svg: `<svg viewBox="0 0 380 90" role="img" aria-label="Hamming distance">
        <g font-family="monospace" font-size="15" fill="var(--text)">
          <text x="40" y="30">1 0 1 0 1</text>
          <text x="40" y="55">1 1 1 1 0</text>
          <line x1="36" y1="63" x2="170" y2="63" stroke="var(--border)"/>
          <text x="40" y="82" fill="var(--primary)">0 1 0 1 1</text>
        </g>
        <text x="220" y="50" font-size="13" fill="var(--muted)">XOR → three 1s</text>
        <text x="220" y="70" font-size="13" font-weight="700" fill="var(--primary)">distance = 3</text>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "To **detect d** errors you need minimum Hamming distance **d+1**; to **correct d** errors you need **2d+1**. The number of Hamming parity bits r satisfies **2ʳ ≥ m + r + 1**. CRC = Data Link; checksum = Network/Transport.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute Hamming distance between two strings, find the number of redundant bits (2ʳ ≥ m+r+1), CRC remainder by polynomial division, and which method sits at which layer.",
    },
  ],

  "net-flow-piggyback": [
    {
      kind: "p",
      text: "**Flow control** stops a fast sender from drowning a slow receiver. The two schemes are **Stop-and-Wait** (send one, wait for the ACK) and the faster **Sliding Window** (send up to W frames before waiting).",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Stop-and-Wait is like saying one sentence then waiting for ‘got it’ before the next — safe but slow. A sliding window is like speaking several sentences while the listener nods along — far more efficient on a fast line.",
    },
    {
      kind: "ul",
      items: [
        "**Sliding window** variants: **Go-Back-N** (resend from the lost frame) and **Selective Repeat** (resend only the lost frame).",
        "**Piggybacking** — instead of a separate ACK frame, attach the acknowledgement onto an outgoing **data** frame travelling the other way.",
      ],
    },
    {
      kind: "diagram",
      caption: "Piggybacking: B's data frame also carries the ACK for A's earlier frame.",
      svg: `<svg viewBox="0 0 380 150" role="img" aria-label="Piggybacking exchange">
        <text x="40" y="20" font-size="12" font-weight="700" fill="var(--text)">A</text>
        <text x="332" y="20" font-size="12" font-weight="700" fill="var(--text)">B</text>
        <line x1="44" y1="28" x2="44" y2="140" stroke="var(--border)"/>
        <line x1="336" y1="28" x2="336" y2="140" stroke="var(--border)"/>
        <line x1="44" y1="45" x2="336" y2="70" stroke="var(--primary-l)" stroke-width="2" marker-end="url(#pb)"/>
        <text x="190" y="50" text-anchor="middle" font-size="10" fill="var(--muted)">Data 0</text>
        <line x1="336" y1="85" x2="44" y2="110" stroke="var(--primary)" stroke-width="2" marker-end="url(#pb)"/>
        <text x="190" y="92" text-anchor="middle" font-size="10" fill="var(--primary)" font-weight="700">Data 0 + ACK 1</text>
        <defs><marker id="pb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Piggybacking improves efficiency** — one frame carries both data and an acknowledgement, so no separate ACK is needed. Its only cost: if there's no reverse data, a **timer** bounds how long the ACK waits before being sent alone.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Definition of piggybacking and *why* it's efficient, Go-Back-N vs Selective Repeat, and window-size/efficiency calculations. Piggybacking is an **ACK optimisation**, not a window protocol itself.",
    },
  ],

  "mac-layer": [
    {
      kind: "p",
      text: "On a **shared** medium (one cable or radio channel), only one station can transmit at a time — or signals **collide** and garble. The **Medium Access Control (MAC)** sublayer is the set of rules for taking turns.",
    },
    {
      kind: "table",
      head: ["Protocol", "Idea / efficiency"],
      rows: [
        ["Pure ALOHA", "send anytime; max throughput ≈ 18.4%"],
        ["Slotted ALOHA", "send only at slot starts; max ≈ 36.8%"],
        ["CSMA", "listen before you talk (sense the channel)"],
        ["CSMA/CD", "sense + detect collisions while sending (wired Ethernet)"],
        ["CSMA/CA", "sense + avoid collisions (Wi-Fi, uses ACK & backoff)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**CSMA/CD is for wired** (a station can hear a collision); **CSMA/CA is for wireless** (it can't reliably detect collisions, plus the *hidden-terminal* problem, so it avoids them). Channel-partitioning methods: **FDMA/TDMA/CDMA**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match protocol ↔ efficiency (Pure 18.4%, Slotted 36.8%), CSMA/CD vs CSMA/CA (wired vs wireless), and the minimum-frame condition for CD: **frame ≥ 2 × propagation delay × bandwidth**.",
    },
  ],

  "ip-transport": [
    {
      kind: "p",
      text: "Once a single link works, the upper layers move data **across the whole Internet, end-to-end**: the **Network layer** finds a path (addressing & routing), and the **Transport layer** delivers reliably to the right program.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two sub-topics: **Network Layer** (IP addresses, subnetting, routing — host-to-host) and **Transport Layer** (TCP/UDP — process-to-process). Remember the split: **IP gets it to the right machine; TCP/UDP gets it to the right application (port).**",
    },
  ],

  "network-layer": [
    {
      kind: "p",
      text: "The **Network layer** delivers packets across many networks using **logical IP addresses** and **routing**. An IPv4 address is 32 bits, written as four dotted-decimal octets (e.g. 192.168.1.1).",
    },
    {
      kind: "table",
      head: ["Class", "Leading bits", "Default mask"],
      rows: [
        ["A", "0", "/8"],
        ["B", "10", "/16"],
        ["C", "110", "/24"],
        ["D", "1110", "multicast"],
        ["E", "1111", "reserved"],
      ],
    },
    {
      kind: "ul",
      items: [
        "**Subnetting** borrows host bits to split a network; the **mask** marks network vs host bits (CIDR like /26).",
        "**Routing:** *distance vector* (Bellman-Ford, e.g. **RIP**) vs *link state* (Dijkstra, e.g. **OSPF**).",
        "Helpers: **ARP** (IP→MAC), **DHCP** (auto IP), **ICMP** (errors/ping). **IPv6** uses 128-bit addresses.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Quick maths: a **/26** leaves 6 host bits → 2⁶ = 64 addresses, of which **62 are usable** (minus network + broadcast). Usable hosts in general = **2ⁿ − 2**. Match **RIP = distance vector, OSPF = link state**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify the address class, compute subnets/usable hosts (2ⁿ − 2) from a mask/CIDR, and routing algorithm ↔ protocol. ARP (IP→MAC) vs RARP/DHCP direction is a common trap.",
    },
  ],

  "transport-layer": [
    {
      kind: "p",
      text: "The **Transport layer** provides **process-to-process** delivery using **port numbers** (HTTP 80, DNS 53…). Its two protocols make opposite trade-offs: **TCP** (reliable) and **UDP** (fast).",
    },
    {
      kind: "table",
      head: ["Feature", "TCP", "UDP"],
      rows: [
        ["Connection", "connection-oriented", "connectionless"],
        ["Reliability", "reliable, ordered, ACKs", "best-effort, no guarantee"],
        ["Flow/congestion control", "yes", "no"],
        ["Use", "web, email, file transfer", "DNS, VoIP, streaming, DHCP"],
      ],
    },
    {
      kind: "diagram",
      caption: "TCP's three-way handshake sets up a connection before any data flows.",
      svg: `<svg viewBox="0 0 380 130" role="img" aria-label="TCP three way handshake">
        <text x="40" y="18" font-size="12" font-weight="700" fill="var(--text)">Client</text>
        <text x="312" y="18" font-size="12" font-weight="700" fill="var(--text)">Server</text>
        <line x1="50" y1="24" x2="50" y2="125" stroke="var(--border)"/>
        <line x1="330" y1="24" x2="330" y2="125" stroke="var(--border)"/>
        <line x1="50" y1="40" x2="330" y2="58" stroke="var(--primary)" stroke-width="2" marker-end="url(#th)"/>
        <text x="190" y="42" text-anchor="middle" font-size="10" fill="var(--primary)">SYN</text>
        <line x1="330" y1="72" x2="50" y2="90" stroke="var(--primary-l)" stroke-width="2" marker-end="url(#th)"/>
        <text x="190" y="74" text-anchor="middle" font-size="10" fill="var(--primary-l)">SYN + ACK</text>
        <line x1="50" y1="104" x2="330" y2="120" stroke="var(--primary)" stroke-width="2" marker-end="url(#th)"/>
        <text x="190" y="106" text-anchor="middle" font-size="10" fill="var(--primary)">ACK</text>
        <defs><marker id="th" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**TCP = reliable & ordered (3-way handshake: SYN, SYN-ACK, ACK); UDP = fast & connectionless.** TCP adds flow & congestion control (slow start, congestion avoidance). DNS runs over **UDP** — a favourite exam fact.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "TCP vs UDP comparison, the 3-way handshake, well-known ports (HTTP 80, HTTPS 443, FTP 21, DNS 53, SMTP 25), and congestion-control phases.",
    },
  ],

  "application-security": [
    {
      kind: "p",
      text: "You type **gmail.com**, hit enter, log in, and send a friend an email with your bank details inside. In the two seconds that follow, **a dozen protocols** fire — and **several attackers** would happily listen in. That single action *contains this whole topic*. We'll follow it step by step, and at each step I'll ask you to work something out **before** I explain it. Try genuinely — a wrong guess teaches more than a right reading.",
    },

    { kind: "h", text: "Part 1 · The journey of one click (the WWW)" },

    { kind: "h", text: "1 · The URL — what are you actually typing?" },
    {
      kind: "callout",
      tone: "try",
      text: "Look at  **https://mail.google.com:443/inbox?user=5** .  Before reading on, say out loud what each piece does:  `https` … `mail.google.com` … `443` … `/inbox` … `?user=5`.",
    },
    {
      kind: "table",
      head: ["Part", "Name", "Meaning"],
      rows: [
        ["https", "scheme / protocol", "how to talk (HTTP secured by TLS)"],
        ["mail.google.com", "host / domain name", "which machine to reach"],
        ["443", "port", "which program on that machine (HTTPS = 443)"],
        ["/inbox", "path", "which resource on the server"],
        ["?user=5", "query string", "extra parameters for the request"],
      ],
    },
    {
      kind: "p",
      text: "A **URL (Uniform Resource Locator)** is just an address with these labelled parts. But notice the problem hiding in it: your computer has no idea *where* `mail.google.com` physically is. It needs a number (an IP address), not a name.",
    },

    { kind: "h", text: "2 · Finding the server — DNS" },
    {
      kind: "callout",
      tone: "note",
      title: "Why this even exists",
      text: "In the early internet, every computer kept ONE shared file, `HOSTS.TXT`, listing every machine's name and address. People downloaded the updated file periodically. With a few hundred hosts that was fine — but as the network grew to thousands, a single file everyone had to copy became impossible to keep current. **DNS (1983)** replaced it with a *distributed, hierarchical* directory.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Imagine we ignored history and put **every domain name on Earth in one giant server**. Name two things that would go badly wrong. (Your answer is literally the reason DNS is built the way it is.)",
    },
    {
      kind: "p",
      text: "Your two problems were probably: it would be **overloaded** by billions of lookups, and if it **failed the whole internet would go dark** (plus it'd be slow for far-away users). So DNS spreads the work across a **tree** of servers — no single point of overload or failure.",
    },
    {
      kind: "diagram",
      caption: "DNS hierarchy: the resolver walks down root → TLD → authoritative to turn a name into an IP.",
      svg: `<svg viewBox="0 0 384 140" role="img" aria-label="DNS hierarchy and resolution">
        <g font-size="9" text-anchor="middle">
          <rect x="150" y="10" width="84" height="22" rx="4" fill="var(--primary)"/><text x="192" y="25" fill="#fff">Root ( . )</text>
          <rect x="150" y="54" width="84" height="22" rx="4" fill="var(--primary)" opacity="0.8"/><text x="192" y="69" fill="#fff">TLD ( .com )</text>
          <rect x="138" y="98" width="108" height="22" rx="4" fill="var(--primary)" opacity="0.6"/><text x="192" y="113" fill="#fff">Authoritative (google)</text>
          <line x1="192" y1="32" x2="192" y2="54" stroke="var(--muted)" marker-end="url(#dn)"/>
          <line x1="192" y1="76" x2="192" y2="98" stroke="var(--muted)" marker-end="url(#dn)"/>
          <rect x="14" y="54" width="80" height="22" rx="4" fill="var(--card)" stroke="var(--primary)"/><text x="54" y="69" fill="var(--text)">Resolver</text>
          <line x1="94" y1="60" x2="148" y2="21" stroke="var(--border)" stroke-dasharray="3 2"/>
          <line x1="94" y1="65" x2="148" y2="65" stroke="var(--border)" stroke-dasharray="3 2"/>
          <line x1="94" y1="70" x2="136" y2="106" stroke="var(--border)" stroke-dasharray="3 2"/>
          <text x="54" y="92" fill="var(--muted)" font-size="8">asks each level</text>
        </g>
        <defs><marker id="dn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Resolution** = turning a name into an IP. In **recursive** resolution your resolver does all the legwork and returns the final answer; in **iterative** each server replies ‘ask the next one down’.",
        "**Name → address** uses an **A record** (AAAA for IPv6). The reverse, **address → name**, uses a **PTR record** (reverse DNS lookup).",
        "Other records: **MX** (mail server), **CNAME** (alias), **NS** (name server).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**DNS runs on UDP port 53.** Why UDP? A lookup is one tiny question and one tiny answer — UDP skips TCP's 3-way-handshake overhead, so it's faster. (It falls back to **TCP 53** for big responses and zone transfers between servers.)",
    },

    { kind: "h", text: "3 · Sending and reading the mail" },
    {
      kind: "callout",
      tone: "try",
      text: "You read email on your **phone** in the morning and your **laptop** at night, and you want both to show the same folders and read/unread state. Which retrieval protocol must you use — **POP3** or **IMAP** — and why?",
    },
    {
      kind: "p",
      text: "**IMAP** — because it keeps mail *on the server* and syncs every device to it. POP3 *downloads and (by default) deletes* from the server, so your phone and laptop would each grab different mail and never agree. Now the three email protocols make sense by their job:",
    },
    {
      kind: "table",
      head: ["Protocol", "Job", "Port"],
      rows: [
        ["SMTP", "SEND / push mail (client→server, server→server)", "25"],
        ["POP3", "retrieve — download then delete from server", "110"],
        ["IMAP", "retrieve — keep on server, sync across devices", "143"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**SMTP = sending (push); POP3 & IMAP = receiving (pull).** POP3 downloads-and-removes (single device); IMAP keeps-and-syncs (many devices). Mnemonic: **S**MTP **S**ends.",
    },

    { kind: "h", text: "4 · Files & remote login — FTP and TELNET" },
    {
      kind: "ul",
      items: [
        "**FTP (File Transfer Protocol)** is unusual — it uses **two** connections: a **control** connection on port **21** (commands) and a separate **data** connection on port **20** (the file bytes). *Active mode*: server opens the data connection back; *passive mode*: client opens it (firewall-friendly).",
        "**TELNET** (port **23**) gives a remote command-line login — but it sends everything, including passwords, in **plaintext**. That insecurity is why **SSH** (port 22, encrypted) replaced it.",
      ],
    },

    { kind: "h", text: "Part 2 · The dangers (Network Security)" },
    {
      kind: "p",
      text: "Your email just crossed dozens of routers you don't own. Security boils down to defending against **three** distinct attacks: can someone **read** it (breaks *confidentiality*), **change** it (breaks *integrity*), or **fake** being you (breaks *authentication*)? Keep those three verbs in mind — every tool below targets one of them.",
    },

    { kind: "h", text: "5 · The attackers — malware" },
    {
      kind: "callout",
      tone: "try",
      text: "A malicious program **copies itself across the network on its own**, with no user action and without attaching to any host file. Is it a **virus** or a **worm**?",
    },
    {
      kind: "p",
      text: "A **worm** — self-propagating and standalone. A **virus** is the opposite: it must attach to a **host file** and needs a user to run it to spread. That one distinction is the most-asked malware question.",
    },
    {
      kind: "table",
      head: ["Malware", "Defining trait"],
      rows: [
        ["Virus", "attaches to a host file; spreads when the user runs it"],
        ["Worm", "standalone; self-replicates across the network automatically"],
        ["Trojan horse", "disguised as something useful; no self-replication"],
        ["Ransomware", "encrypts your files and demands payment"],
        ["Spyware", "secretly gathers information about you"],
      ],
    },

    { kind: "h", text: "6 · Keeping it secret — cryptography" },
    {
      kind: "p",
      text: "Core problem: send a secret over a wire **everyone can tap**. The first answer is **symmetric** encryption — one shared secret key both scrambles and unscrambles the message (algorithms: **DES, AES**). It's fast. But it has a fatal catch…",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Symmetric encryption needs **both** people to already share the same secret key. But if you've never met and can only talk over the open internet, **how do you exchange that key without an eavesdropper grabbing it on the way?** (This exact problem forced the invention of the next idea.)",
    },
    {
      kind: "p",
      text: "You can't — safely handing over the shared key is the **key-distribution problem**. The breakthrough is **asymmetric (public-key)** cryptography: each person has a **pair** of keys — a **public** key they publish to the world and a **private** key they never share. What one key locks, only the *other* can unlock. Now you never have to transmit a secret key at all (algorithm: **RSA**).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "I want to send **you** a private message using your key pair. Which key do I encrypt with — **yours or mine**, **public or private**?",
    },
    {
      kind: "p",
      text: "You encrypt with the **recipient's PUBLIC key** — because only the recipient's matching **private** key can decrypt it, and they never had to share that private key with anyone. (Encrypting with your *own* key would let anyone with your public key read it — useless for secrecy.)",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Symmetric** = one shared key, fast, but key-distribution problem (DES, AES). **Asymmetric** = public/private pair, solves distribution, slower (RSA). In practice we **combine** them: use asymmetric once to exchange a random *symmetric session key*, then use fast symmetric for the rest. And don't confuse **cryptography** (hides the *content* of a message) with **steganography** (hides the *very existence* of the message — e.g. inside an image's pixels).",
    },

    { kind: "h", text: "7 · Proving who sent it — digital signatures" },
    {
      kind: "p",
      text: "Encryption hides *content*, but it doesn't prove **who** sent a message or that it **wasn't altered**. For that we flip public-key crypto around into a **digital signature**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "To send a secret you used the *recipient's public* key. A digital signature is the mirror image: to **sign**, whose key do you use — and is it the **public** or **private** one?",
    },
    {
      kind: "diagram",
      caption: "The two directions — the single most-tested idea here. Encrypt with the receiver's public key; sign with the sender's private key.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Encryption versus signature key directions">
        <g font-size="9">
          <rect x="10" y="14" width="364" height="38" rx="6" fill="var(--primary-bg)" stroke="var(--primary)"/>
          <text x="20" y="30" font-weight="700" fill="var(--text)">Encrypt (secrecy)</text>
          <text x="20" y="45" fill="var(--muted)">lock with the RECEIVER's PUBLIC key → only their private key opens it</text>
          <rect x="10" y="58" width="364" height="38" rx="6" fill="#0a8f5b" opacity="0.12" stroke="#0a8f5b"/>
          <text x="20" y="74" font-weight="700" fill="var(--text)">Sign (proof of sender)</text>
          <text x="20" y="89" fill="var(--muted)">lock with the SENDER's PRIVATE key → anyone verifies with the sender's public key</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Sign with the sender's PRIVATE key; verify with the sender's PUBLIC key** — the opposite direction to encryption. A signature gives **authentication, integrity, and non-repudiation** (the sender can't deny it) — but **NOT confidentiality** by itself. In practice you sign a *hash* of the message, not the whole thing.",
    },

    { kind: "h", text: "8 · The walls — VPN & firewall" },
    {
      kind: "ul",
      items: [
        "**VPN (Virtual Private Network)** — an **encrypted tunnel** through the public internet, so a remote user appears to be safely *inside* the private network. It provides privacy over an untrusted medium.",
        "**Firewall** — filters traffic by **rules** (allow/deny). Types: **packet-filter** (checks IP/port), **stateful** (tracks connections), **application/proxy gateway** (inspects content). A firewall **filters; it does not encrypt**. An **IDS** detects intrusions but doesn't block by itself.",
      ],
    },

    { kind: "h", text: "The facts to have at your fingertips" },
    {
      kind: "table",
      head: ["Service", "Port", "Service", "Port"],
      rows: [
        ["FTP (data/control)", "20 / 21", "DNS", "53 (UDP)"],
        ["SSH", "22", "HTTP", "80"],
        ["TELNET", "23", "POP3", "110"],
        ["SMTP", "25", "IMAP", "143"],
        ["DHCP", "67 / 68", "HTTPS", "443"],
      ],
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **protocol ↔ port** match-ups (the table above); (2) **DNS** — resolution steps, record types (A vs MX vs PTR/reverse), and ‘DNS uses UDP/53’; (3) **SMTP vs POP3 vs IMAP** (send vs download-delete vs sync); (4) **virus vs worm** (host file vs self-replicating); (5) **symmetric vs asymmetric** keys; (6) the **key directions** — *encrypt = receiver's public, sign = sender's private*; (7) **steganography vs cryptography** (hide existence vs hide content); (8) a **digital signature provides authentication/integrity/non-repudiation, not confidentiality**; (9) **firewall = rule-based filtering, not encryption**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover the answers and test yourself — produce each answer out loud before you peek.**  (a) Which key signs a message?  (b) DNS uses which transport protocol and port?  (c) Self-replicating standalone malware =?  (d) Read mail on two devices in sync — POP3 or IMAP?  (e) Does a digital signature give confidentiality?  (f) Steganography hides what?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers (only after you've tried)",
      text: "(a) the **sender's private** key.  (b) **UDP, port 53**.  (c) a **worm**.  (d) **IMAP**.  (e) **No** — only authentication/integrity/non-repudiation.  (f) the **existence** of the message itself (content-hiding is cryptography).",
    },
  ],

  "mobile-technology": [
    {
      kind: "p",
      text: "**Mobile technology** keeps devices connected while they move, with no wires. It spans cellular standards, the trick of staying reachable as you roam, and networks that form on the fly.",
    },
    {
      kind: "ul",
      items: [
        "**GSM** (time/frequency division) and **CDMA** (code division) are the two classic cellular access methods.",
        "**Mobile IP** lets a device keep its address as it moves between networks (home agent / foreign agent).",
        "**Cellular topology** reuses frequencies across non-adjacent cells; **handoff** transfers a call between cells.",
        "**MANET** (Mobile Ad-hoc Network) — self-organising, infrastructure-free, dynamic topology.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**CDMA uses unique codes** (Walsh) so all users share the whole band at once; **GSM uses TDMA/FDMA** time-and-frequency slots. A **MANET** has *no fixed infrastructure or central controller* — nodes route for each other.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "GSM vs CDMA (time/freq vs code), Mobile IP roles, frequency reuse & handoff, and MANET features (self-organising, dynamic, no infrastructure). CDMA = Walsh codes is a common item.",
    },
  ],

  "cloud-iot": [
    {
      kind: "p",
      text: "**Cloud computing** rents computing over the Internet instead of owning servers; the **Internet of Things (IoT)** connects everyday physical devices to that network. Both rest on **virtualization**.",
    },
    {
      kind: "diagram",
      caption: "Cloud service models — you manage less as you move up.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Cloud service models">
        <g font-size="10" text-anchor="middle">
          ${[
            ["IaaS", "rent raw servers/storage (AWS EC2)"],
            ["PaaS", "rent a dev platform (App Engine)"],
            ["SaaS", "rent ready software (Gmail)"],
          ]
            .map((d, i) => `<rect x="${40 + i * 18}" y="${14 + i * 28}" width="${300 - i * 36}" height="24" rx="5" fill="var(--primary)" opacity="${0.5 + i * 0.18}"/><text x="192" y="${30 + i * 28}" fill="#fff" font-weight="700">${d[0]} — ${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "Remember the stack **IaaS → PaaS → SaaS** (you manage less, the provider more). **Virtualization** (many VMs on one server) makes the cloud possible; an **SLA** is the service-quality contract. IoT = networked physical ‘things’ with sensors.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match service model ↔ example (IaaS = EC2, PaaS = platform, SaaS = Gmail), public vs private cloud, the role of virtualization & SLA, and basics of IoT.",
    },
  ],

  // ===================================================================
  // UNIT 10 — ARTIFICIAL INTELLIGENCE (educational, beginner→advanced)
  // ===================================================================
  "ai-search": [
    {
      kind: "p",
      text: "Much of classic **AI is search**: the problem is a huge space of possible states, and intelligence is finding a path from the start to a goal efficiently. How you search — blindly or with a hint — defines the algorithm.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Solving a maze: you can wander every corridor (uninformed search), or glance at the exit sign and head roughly toward it (informed/heuristic search). The hint (heuristic) is what makes the search smart.",
    },
    {
      kind: "table",
      head: ["Strategy", "Type", "Complete?", "Optimal?"],
      rows: [
        ["BFS", "uninformed", "yes", "yes (uniform cost)"],
        ["DFS", "uninformed", "no", "no"],
        ["Greedy best-first", "informed (h)", "no", "no"],
        ["A*", "informed (f = g + h)", "yes", "yes (admissible h)"],
      ],
    },
    {
      kind: "p",
      text: "**A\\*** combines cost-so-far g(n) with a heuristic estimate h(n): **f(n) = g(n) + h(n)**. It's optimal when h **never overestimates** (admissible).",
    },
    {
      kind: "diagram",
      caption: "Minimax: leaf values back up — MAX picks the larger child, MIN the smaller.",
      svg: `<svg viewBox="0 0 380 150" role="img" aria-label="Minimax tree">
        <g font-size="11" fill="#fff" font-weight="700">
          <line x1="190" y1="30" x2="90" y2="80" stroke="var(--border)"/><line x1="190" y1="30" x2="290" y2="80" stroke="var(--border)"/>
          <line x1="90" y1="80" x2="50" y2="130" stroke="var(--border)"/><line x1="90" y1="80" x2="130" y2="130" stroke="var(--border)"/>
          <line x1="290" y1="80" x2="250" y2="130" stroke="var(--border)"/><line x1="290" y1="80" x2="330" y2="130" stroke="var(--border)"/>
          <rect x="178" y="18" width="24" height="24" rx="4" fill="var(--primary)"/><text x="190" y="34" text-anchor="middle">3</text>
          <text x="150" y="26" font-size="10" fill="var(--muted)">MAX</text>
          <rect x="78" y="68" width="24" height="24" rx="4" fill="var(--primary-l)"/><text x="90" y="84" text-anchor="middle">3</text>
          <rect x="278" y="68" width="24" height="24" rx="4" fill="var(--primary-l)"/><text x="290" y="84" text-anchor="middle">2</text>
          <text x="120" y="78" font-size="10" fill="var(--muted)">MIN</text>
          <circle cx="50" cy="130" r="13" fill="var(--muted)"/><text x="50" y="134" text-anchor="middle">3</text>
          <circle cx="130" cy="130" r="13" fill="var(--muted)"/><text x="130" y="134" text-anchor="middle">5</text>
          <circle cx="250" cy="130" r="13" fill="var(--muted)"/><text x="250" y="134" text-anchor="middle">2</text>
          <circle cx="330" cy="130" r="13" fill="var(--muted)"/><text x="330" y="134" text-anchor="middle">9</text>
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "**A\\* is optimal with an admissible (never-overestimating) heuristic.** For two-player games, **Minimax** assumes both play optimally, and **alpha-beta pruning** skips branches that can't change the result — best case explores O(b^(d/2)) instead of O(bᵈ), with the *same* answer.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute the minimax value of a small tree, identify nodes alpha-beta prunes, A* optimality conditions, and BFS/DFS completeness. ‘A* needs an admissible heuristic’ and ‘greedy is neither complete nor optimal’ are common.",
    },
  ],

  "knowledge-representation": [
    {
      kind: "p",
      text: "Before an AI can *reason*, it must **store knowledge** in a form it can manipulate. **Knowledge Representation (KR)** is the study of how to encode facts about the world so a machine can draw conclusions.",
    },
    {
      kind: "diagram",
      caption: "A semantic network: concepts as nodes, relationships as labelled links.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Semantic network">
        <g font-size="9" text-anchor="middle">
          <ellipse cx="80" cy="30" rx="34" ry="15" fill="var(--primary)" opacity="0.85"/><text x="80" y="34" fill="#fff">Sparrow</text>
          <ellipse cx="80" cy="85" rx="30" ry="15" fill="var(--primary)" opacity="0.7"/><text x="80" y="89" fill="#fff">Bird</text>
          <ellipse cx="250" cy="85" rx="34" ry="15" fill="var(--primary)" opacity="0.6"/><text x="250" y="89" fill="#fff">Animal</text>
          <ellipse cx="250" cy="30" rx="30" ry="15" fill="var(--card)" stroke="var(--primary)"/><text x="250" y="34" fill="var(--text)">Wings</text>
          <line x1="80" y1="45" x2="80" y2="70" stroke="var(--muted)" marker-end="url(#kr)"/><text x="98" y="60" fill="var(--muted)" font-size="8">is-a</text>
          <line x1="110" y1="80" x2="218" y2="85" stroke="var(--muted)" marker-end="url(#kr)"/><text x="165" y="76" fill="var(--muted)" font-size="8">is-a</text>
          <line x1="110" y1="28" x2="222" y2="30" stroke="var(--muted)" marker-end="url(#kr)"/><text x="165" y="22" fill="var(--muted)" font-size="8">has</text>
        </g>
        <defs><marker id="kr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Scheme", "Idea"],
      rows: [
        ["Propositional / Predicate logic", "facts + rules with ∧ ∨ ¬ → and quantifiers ∀ ∃"],
        ["Semantic networks", "graph of concepts linked by relations (is-a, has-a)"],
        ["Frames", "record-like slots & values for stereotyped objects"],
        ["Rules / Scripts", "if-then knowledge; scripts model event sequences"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Predicate (first-order) logic** adds objects, predicates and quantifiers (∀, ∃) that propositional logic lacks. **Entailment α ⊨ β** means β holds wherever α does; inference uses **Modus Ponens** and **Resolution** (on CNF clauses). Sub-topics: handling **uncertainty** and **expert systems**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Translate English ↔ predicate logic, quantifier scope (∀x∃y ≠ ∃y∀x), entailment ⊨, and match KR scheme ↔ description. FOL symbols = constants, predicates, functions, variables (not ‘domain’).",
    },
  ],

  "expert-systems": [
    {
      kind: "p",
      text: "An **expert system** mimics a human specialist in a narrow domain (e.g. MYCIN for medical diagnosis). Its big idea is **separating knowledge from reasoning** — so the knowledge can grow without rewriting the engine.",
    },
    {
      kind: "table",
      head: ["Component", "Role"],
      rows: [
        ["Knowledge base", "domain facts + IF–THEN rules"],
        ["Inference engine", "applies rules to facts to derive conclusions"],
        ["Working memory", "the current problem's facts"],
        ["Explanation facility", "justifies how/why a conclusion was reached"],
        ["User interface", "interaction with the user"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Forward chaining** is *data-driven*: start from known facts, fire rules toward goals. **Backward chaining** is *goal-driven*: start from a hypothesis and work back to supporting facts. (MYCIN used backward chaining.) The **knowledge base + inference engine** pair is the heart of every expert system.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Identify expert-system components and forward (data-driven) vs backward (goal-driven) chaining. The inference-engine + knowledge-base match-up is a frequent item.",
    },
  ],

  "reasoning-uncertainty": [
    {
      kind: "p",
      text: "The real world is uncertain — evidence is partial, rules have exceptions. AI handles this with **probability** (Bayesian reasoning) and **fuzzy logic** (degrees of truth).",
    },
    {
      kind: "formula",
      text: "Bayes:  P(H | E) = P(E | H) · P(H) / P(E)",
    },
    {
      kind: "ul",
      items: [
        "**Bayesian network** — a directed acyclic graph of variables; each node has a conditional probability table. A node is independent of its non-descendants given its parents.",
        "**Fuzzy logic** — truth values lie in [0, 1], not just {0, 1}; great for vague terms like *tall* or *warm* (see the Fuzzy Sets topic).",
        "**Certainty factors** and **Dempster–Shafer** theory are alternative uncertainty models.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Bayes' theorem updates a belief P(H) given evidence E.** Don't confuse **probability** (chance of an event) with **fuzzy membership** (degree to which something belongs). Bayesian networks compactly encode conditional independence.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Apply Bayes' theorem to a numerical, read independence from a Bayesian network, and probability vs fuzzy (degree of membership, not chance). The Bayes formula is the most common item.",
    },
  ],

  "planning": [
    {
      kind: "p",
      text: "**Planning** is working out a *sequence of actions* to get from the current state to a goal — like a robot figuring out the steps to make coffee. Each action has **preconditions** (what must be true to do it) and **effects** (what it changes).",
    },
    {
      kind: "ul",
      items: [
        "A planning problem = **initial state + goal + actions** (the **STRIPS** representation: actions with add/delete lists).",
        "**Linear planning** solves sub-goals one after another; **non-linear** interleaves them when they interact.",
        "**Goal-stack planning** uses a stack of goals; **partial-order planning** commits to ordering only when necessary (least commitment).",
        "**Hierarchical planning** refines abstract steps into detailed ones.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A plan is built from **actions defined by preconditions and effects** (STRIPS). **Partial-order planning** delays ordering decisions (least commitment) to stay flexible; goal-stack planning can suffer the **Sussman anomaly** when sub-goals conflict.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Components of a planning problem (initial, goal, actions), STRIPS preconditions/effects, linear vs non-linear and partial-order planning. ‘Domain is not part of the classic planning tuple’ has appeared.",
    },
  ],

  "ai-nlp": [
    {
      kind: "p",
      text: "**Natural Language Processing (NLP)** lets machines understand and produce human language — the technology behind translation, chatbots and voice assistants. It works through layers of analysis, each adding more meaning.",
    },
    {
      kind: "diagram",
      caption: "The phases of NLP, from raw words up to intended meaning.",
      svg: `<svg viewBox="0 0 384 92" role="img" aria-label="Phases of NLP">
        <g font-size="8" text-anchor="middle">
          ${["Lexical", "Syntactic", "Semantic", "Discourse", "Pragmatic"]
            .map((s, i) => `<rect x="${6 + i * 76}" y="${56 - i * 9}" width="68" height="22" rx="4" fill="var(--primary)" opacity="${0.5 + i * 0.1}"/><text x="${40 + i * 76}" y="${70 - i * 9}" fill="#fff" font-size="8">${s}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "ol",
      items: [
        "**Lexical / Morphological** — split text into tokens; analyse word structure.",
        "**Syntactic** — parse grammatical structure (parse tree); check word order.",
        "**Semantic** — derive the literal meaning of words and sentences.",
        "**Discourse** — meaning across sentences (resolve *it*, *they*).",
        "**Pragmatic** — intended meaning in real-world context.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Phases run **Lexical → Syntactic → Semantic → Discourse → Pragmatic** (words → grammar → meaning → context). **Parsing** lives at the syntactic level. The central difficulty throughout is **ambiguity** (lexical, syntactic, semantic).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Order the NLP phases, match phase ↔ task, and identify ambiguity types. ‘Parsing = syntactic analysis’ is a common one-liner.",
    },
  ],

  "multi-agent": [
    {
      kind: "p",
      text: "A **multi-agent system (MAS)** is several autonomous **agents** that perceive, decide and act — and cooperate or compete to solve problems too big for one. Think traffic of self-driving cars negotiating an intersection.",
    },
    {
      kind: "ul",
      items: [
        "An **agent** is more than an object: it's *autonomous*, *reactive* (responds to its environment), *proactive* (goal-directed) and *social* (communicates).",
        "Agents coordinate through **agent communication languages** and shared **ontologies** (agreed vocabularies).",
        "The **Semantic Web** adds machine-readable meaning so agents can share knowledge across the web.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Agents vs objects:** an object just exposes methods; an **agent is autonomous and goal-driven**, deciding *whether* to act. Cooperation needs a shared **ontology** so agents mean the same thing by the same term.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Agent properties (autonomous, reactive, proactive, social), agents vs objects, and the role of ontologies & the Semantic Web in agent communication.",
    },
  ],

  "fuzzy-sets": [
    {
      kind: "p",
      text: "Classical (crisp) sets say an element is **in or out** — but is a 25 °C day ‘hot’? **Fuzzy sets** allow **degrees of membership** between 0 and 1, capturing the vagueness of human concepts.",
    },
    {
      kind: "diagram",
      caption: "Crisp: a hard yes/no boundary. Fuzzy: a smooth ramp of membership from 0 to 1.",
      svg: `<svg viewBox="0 0 384 100" role="img" aria-label="Crisp versus fuzzy membership">
        <g>
          <text x="96" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="var(--primary)">Crisp</text>
          <line x1="30" y1="80" x2="160" y2="80" stroke="var(--border)"/><line x1="30" y1="80" x2="30" y2="24" stroke="var(--border)"/>
          <path d="M30,80 L92,80 L92,30 L160,30" fill="none" stroke="var(--primary)" stroke-width="2.5"/>
          <text x="288" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="var(--primary)">Fuzzy</text>
          <line x1="222" y1="80" x2="352" y2="80" stroke="var(--border)"/><line x1="222" y1="80" x2="222" y2="24" stroke="var(--border)"/>
          <path d="M222,80 L262,80 L322,30 L352,30" fill="none" stroke="var(--primary)" stroke-width="2.5"/>
          <text x="20" y="30" font-size="8" fill="var(--muted)">1</text>
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "A **membership function** μ(x) ∈ [0,1] gives each element's degree of belonging.",
        "**Fuzzification** turns crisp inputs into fuzzy values; **defuzzification** turns fuzzy results back into a crisp output (e.g. centroid method).",
        "Fuzzy **set operations**: union = max, intersection = min, complement = 1 − μ.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Fuzzy membership is a *degree* (0–1), not a probability.** Fuzzy union = **max**, intersection = **min**, complement = **1 − μ**. Fuzzy control systems (fuzzify → apply rules → defuzzify) run many appliances like washing machines and ACs.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Compute fuzzy union/intersection/complement (max/min/1−μ), fuzzification vs defuzzification, and fuzzy vs crisp vs probability. ‘Membership ≠ probability’ is a key distinction.",
    },
  ],

  "genetic-algorithms": [
    {
      kind: "p",
      text: "**Genetic Algorithms (GA)** solve optimisation problems by imitating **natural evolution**: a population of candidate solutions ‘breeds’, and the fittest survive to produce better and better answers.",
    },
    {
      kind: "diagram",
      caption: "The GA cycle: evaluate fitness, select parents, crossover, mutate — repeat.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Genetic algorithm cycle">
        <g font-size="9" text-anchor="middle">
          ${[
            ["Population", 70, 30],
            ["Selection", 250, 30],
            ["Crossover", 300, 80],
            ["Mutation", 130, 80],
          ]
            .map((d) => `<rect x="${Number(d[1]) - 44}" y="${Number(d[2]) - 13}" width="88" height="26" rx="13" fill="var(--primary)" opacity="0.85"/><text x="${d[1]}" y="${Number(d[2]) + 4}" fill="#fff">${d[0]}</text>`)
            .join("")}
          <line x1="114" y1="30" x2="204" y2="30" stroke="var(--muted)" marker-end="url(#ga)"/>
          <line x1="270" y1="43" x2="290" y2="64" stroke="var(--muted)" marker-end="url(#ga)"/>
          <line x1="256" y1="80" x2="178" y2="80" stroke="var(--muted)" marker-end="url(#ga)"/>
          <line x1="110" y1="68" x2="64" y2="44" stroke="var(--muted)" marker-end="url(#ga)"/>
        </g>
        <defs><marker id="ga" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Encoding** — represent a solution as a ‘chromosome’ (often a bit string).",
        "**Fitness function** — scores how good each solution is.",
        "**Selection** (e.g. roulette wheel) → **crossover** (combine two parents) → **mutation** (small random change) → new generation.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The GA loop is **fitness → selection → crossover → mutation**, repeated over generations. **Crossover** mixes good building blocks from parents; **mutation** adds diversity to escape local optima. GAs are search/optimisation, inspired by Darwinian evolution.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Order the GA cycle, the role of each operator (crossover = recombination, mutation = diversity), encoding and fitness functions. Selection methods like roulette-wheel appear too.",
    },
  ],

  "ann": [
    {
      kind: "p",
      text: "**Artificial Neural Networks (ANN)** are computing models loosely inspired by the brain's neurons. They *learn from data* rather than being explicitly programmed — the foundation of modern machine learning and deep learning.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "This topic builds in three steps: the **learning paradigms** (supervised / unsupervised / reinforcement), the **neuron & network** (perceptron, multilayer perceptron, backpropagation), and the **activation functions** that give networks their power. Work through the sub-topics in that order.",
    },
  ],

  "machine-learning": [
    {
      kind: "p",
      text: "**Machine Learning (ML)** lets systems improve from experience (data) instead of hand-coded rules. The first thing to know is the **three learning paradigms**, told apart by what feedback the system gets.",
    },
    {
      kind: "table",
      head: ["Paradigm", "Data", "Goal / examples"],
      rows: [
        ["Supervised", "labelled (x, y)", "predict labels — classification, regression (decision tree, SVM, ANN)"],
        ["Unsupervised", "unlabelled (x)", "find structure — clustering (k-means), PCA"],
        ["Reinforcement", "reward signal", "learn a policy by trial & error (Q-learning)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Supervised = learn from labelled examples; Unsupervised = find hidden structure; Reinforcement = learn from rewards.** Watch the **bias–variance trade-off**: *overfitting* (memorises training data, high variance) vs *underfitting* (too simple, high bias).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Classify a task as supervised/unsupervised/reinforcement, match algorithm ↔ paradigm (k-means = unsupervised, decision tree = supervised), and recognise overfitting / bias–variance.",
    },
  ],

  "ai-ann": [
    {
      kind: "p",
      text: "The basic unit of a neural network, the **perceptron**, computes a **weighted sum** of its inputs plus a bias, then passes it through an **activation function** to produce an output. Stack many of these and you get a powerful learner.",
    },
    {
      kind: "formula",
      text: "net = Σ (wᵢ · xᵢ) + b        y = f(net)",
    },
    {
      kind: "diagram",
      caption: "A single neuron: inputs × weights → summation → activation → output.",
      svg: `<svg viewBox="0 0 380 180" role="img" aria-label="Single neuron model">
        <g font-size="12" fill="var(--text)">
          <circle cx="40" cy="40" r="14" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="40" y="44" text-anchor="middle">x₁</text>
          <circle cx="40" cy="90" r="14" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="40" y="94" text-anchor="middle">x₂</text>
          <circle cx="40" cy="140" r="14" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="40" y="144" text-anchor="middle">x₃</text>
          <circle cx="210" cy="90" r="26" fill="var(--primary)" /><text x="210" y="86" text-anchor="middle" fill="#fff" font-size="13">Σ</text><text x="210" y="102" text-anchor="middle" fill="#fff" font-size="11">f</text>
          <circle cx="340" cy="90" r="15" fill="var(--primary-l)"/><text x="340" y="94" text-anchor="middle" fill="#fff">y</text>
          <line x1="54" y1="42" x2="186" y2="84" stroke="var(--muted)" marker-end="url(#nn)"/>
          <line x1="54" y1="90" x2="184" y2="90" stroke="var(--muted)" marker-end="url(#nn)"/>
          <line x1="54" y1="138" x2="186" y2="96" stroke="var(--muted)" marker-end="url(#nn)"/>
          <line x1="236" y1="90" x2="324" y2="90" stroke="var(--muted)" marker-end="url(#nn)"/>
          <text x="120" y="55" font-size="10" fill="var(--muted)">w₁</text><text x="120" y="86" font-size="10" fill="var(--muted)">w₂</text><text x="120" y="128" font-size="10" fill="var(--muted)">w₃</text>
        </g>
        <defs><marker id="nn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)"/></marker></defs>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**Feedforward** network — signals flow input → hidden → output, no loops (e.g. Multilayer Perceptron).",
        "**Recurrent** network — has feedback loops; output depends on previous states.",
        "**Backpropagation** trains the network: compute output error, propagate it backward, adjust weights by gradient descent — which needs a **differentiable** activation function.",
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "Worked numerical",
      text: "x = [1, 0, 1], w = [0.2, 0.4, −0.5], bias b = 0.1.  net = (1·0.2)+(0·0.4)+(1·−0.5)+0.1 = **−0.2**. With a step threshold at 0, output y = 0.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "**Compute net input / output of a neuron** (plug-in numericals), feedforward vs recurrent, and that backpropagation needs differentiable activations. ANN numericals are scoring — always do the arithmetic.",
    },
  ],

  "ai-activation": [
    {
      kind: "p",
      text: "An **activation function** decides a neuron's output from its net input. Its crucial job is to add **non-linearity** — without it, stacking layers would collapse into a single linear function, no matter how deep.",
    },
    {
      kind: "table",
      head: ["Function", "Formula", "Range"],
      rows: [
        ["Step / Threshold", "1 if net ≥ θ else 0", "{0, 1}"],
        ["Sigmoid", "1 / (1 + e⁻ⁿᵉᵗ)", "(0, 1)"],
        ["Tanh", "(eⁿ − e⁻ⁿ)/(eⁿ + e⁻ⁿ)", "(−1, 1)"],
        ["ReLU", "max(0, net)", "[0, ∞)"],
      ],
    },
    {
      kind: "diagram",
      caption: "Shapes: step (hard), sigmoid (smooth S), ReLU (ramp).",
      svg: `<svg viewBox="0 0 380 140" role="img" aria-label="Activation function shapes">
        <g stroke="var(--border)"><line x1="20" y1="110" x2="140" y2="110"/><line x1="80" y1="20" x2="80" y2="120"/></g>
        <path d="M20,110 L80,110 L80,40 L140,40" fill="none" stroke="var(--primary)" stroke-width="2.5"/>
        <text x="80" y="134" text-anchor="middle" font-size="10" fill="var(--muted)">Step</text>
        <g stroke="var(--border)"><line x1="150" y1="110" x2="270" y2="110"/><line x1="210" y1="20" x2="210" y2="120"/></g>
        <path d="M150,108 C190,108 200,45 210,45 C220,45 230,42 270,42" fill="none" stroke="var(--primary)" stroke-width="2.5"/>
        <text x="210" y="134" text-anchor="middle" font-size="10" fill="var(--muted)">Sigmoid</text>
        <g stroke="var(--border)"><line x1="280" y1="110" x2="375" y2="110"/><line x1="330" y1="20" x2="330" y2="120"/></g>
        <path d="M280,110 L330,110 L370,30" fill="none" stroke="var(--primary)" stroke-width="2.5"/>
        <text x="330" y="134" text-anchor="middle" font-size="10" fill="var(--muted)">ReLU</text>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Watch-outs",
      text: "Sigmoid & tanh **saturate** for large |net|, causing the *vanishing-gradient* problem in deep nets. ReLU avoids this for positive inputs but can cause *dead neurons* (stuck at 0). The **step** function is non-differentiable, so it can't be used with backpropagation.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Activation = the **non-linearity** that lets networks learn complex functions. Know each function's **range** (sigmoid (0,1), tanh (−1,1), ReLU [0,∞)) and that **sigmoid(0) = 0.5**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "How NET tests this",
      text: "Match function ↔ range/formula, evaluate sigmoid for a given net input, and the *why non-linearity* reasoning. Step is non-differentiable (no backprop) is a common point.",
    },
  ],

};
