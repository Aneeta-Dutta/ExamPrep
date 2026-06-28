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
      text: "A messy logical expression and a clean one can say *exactly the same thing*. Recognising when two formulas are secretly identical lets you **simplify** — and simplification is half of digital-circuit design and query optimisation. We'll discover the rules, not just list them.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Are **p → q** and **¬p ∨ q** the same statement? Don't trust your gut — there's only one way to be *sure*. What is it? (Then actually do it in your head for the row p = T, q = F.)",
    },
    {
      kind: "p",
      text: "The only certain test is a **truth table** — compute both for *every* row and check they always match. For p = T, q = F: p → q = **F**, and ¬p ∨ q = F ∨ F = **F**. Check the other three rows and they match too. So **p → q ≡ ¬p ∨ q** — they're one statement in two outfits. The symbol **≡** means ‘logically equivalent’.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Like **½ = 0.5 = 2/4** — three faces of one number. p → q and ¬p ∨ q are two faces of one statement. Equivalence is *equality for logic*.",
    },
    {
      kind: "diagram",
      caption: "Both right-hand columns are identical in every row ⇒ p → q ≡ ¬p ∨ q.",
      svg: `<svg viewBox="0 0 380 180" role="img" aria-label="Truth table p to q equals not p or q">
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

    { kind: "h", text: "The laws — algebra you already know, on true/false" },
    {
      kind: "p",
      text: "Drawing a table every time is slow. Instead we reuse a toolkit of proven equivalences — the *same* identity, commutative, distributive laws you know from numbers, now on T/F.",
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
      title: "Two rewrites that unlock everything",
      text: "**p → q ≡ ¬p ∨ q** kills the arrow so the laws apply. **p ↔ q ≡ (p → q) ∧ (q → p)** breaks a biconditional into two conditionals. Memorise these two and almost any expression becomes simplifiable.",
    },

    { kind: "h", text: "The workhorse — De Morgan's laws" },
    {
      kind: "callout",
      tone: "try",
      text: "‘It is **not** the case that (it's raining **and** cold).’ Rewrite that *without* the outer ‘not’ — push the negation inside. What happens to the **‘and’**?",
    },
    {
      kind: "p",
      text: "It becomes ‘it's **not** raining **or** **not** cold’ — the **and flipped to or**, and each part got negated. That's **De Morgan's law**: ¬(p ∧ q) ≡ ¬p ∨ ¬q, and likewise ¬(p ∨ q) ≡ ¬p ∧ ¬q.",
    },
    {
      kind: "diagram",
      caption: "Push the ¬ inside; the connective flips (∧ ↔ ∨) and each part is negated.",
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
      text: "**De Morgan's is the most reused idea in the whole syllabus.** The identical flip shows up in **sets** (complement: (A∩B)′ = A′∪B′), **digital circuits** (NAND/NOR), and code (`NOT (a AND b)` = `(NOT a) OR (NOT b)`). Learn it once, here.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Worked simplification (watch the reasoning)",
      text: "Simplify **¬(¬p ∧ q)**. Step 1 — De Morgan opens the bracket and flips ∧→∨: ¬(¬p) ∨ ¬q. Step 2 — double negation turns ¬(¬p) into p: **p ∨ ¬q**. Three messy symbols become two clean ones, every step justified by a named law.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The mistake examiners bait",
      text: "With De Morgan's you MUST flip the connective. ¬(p ∧ q) is ¬p **∨** ¬q — **not** ¬p ∧ ¬q. Also keep **≡ vs ↔** straight: ↔ is a *connective inside* a formula; **≡** is a *statement that two formulas are equal* (p ≡ q means p ↔ q is a tautology).",
    },

    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **simplify** a compound proposition to its simplest form; (2) name the **law** that justifies a given step; (3) **apply De Morgan's** to a negated expression; (4) **rewrite p → q as ¬p ∨ q** (and biconditional as two conditionals); (5) prove or disprove an equivalence (matching truth-table columns). Knowing the arrow-rewrite and De Morgan's *cold* answers the large majority.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover the answers, produce each first.**  (a) ¬(p ∨ q) ≡ ?  (b) Rewrite p → q without an arrow.  (c) What does ‘equivalent’ mean in terms of truth tables?  (d) Simplify p ∨ (p ∧ q).  (e) Is ¬(¬p) the same as p?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers (after you've tried)",
      text: "(a) **¬p ∧ ¬q** (flip the connective).  (b) **¬p ∨ q.**  (c) the two formulas have **identical final columns** in every row.  (d) **p** (absorption law).  (e) **Yes** (double negation).",
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
      text: "You reason with logic all day — *‘if it rains, I'll carry an umbrella.’* But everyday reasoning is sloppy: two people argue for hours about what ‘follows’ from what. **Propositional logic** is reasoning with the sloppiness removed — the exact same rules a CPU uses to decide. We'll build it from nothing, and at each step I'll ask you to figure things out *before* I explain. A wrong guess teaches more than a smooth read.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Why this even exists",
      text: "Ordinary language is dangerously ambiguous. A single ‘or’ in a contract, or a fuzzy ‘if’ in a program, can cost millions or crash a plane. In the 1800s **George Boole** turned logic into algebra so that reasoning could be *calculated*, not argued. That algebra is what runs inside every digital circuit (Unit 2) and every `if` statement you'll ever write.",
    },

    { kind: "h", text: "1 · The atom — a proposition" },
    {
      kind: "callout",
      tone: "try",
      text: "Which of these can you stamp clearly **True** or **False**?  (a) ‘Delhi is the capital of India.’  (b) ‘Close the door.’  (c) ‘2 + 2 = 5.’  (d) ‘x + 1 = 3.’  Decide each before reading on.",
    },
    {
      kind: "p",
      text: "Only **(a)** and **(c)** qualify — (a) is True, (c) is False (*being false doesn't disqualify it!*). (b) is a command — neither true nor false. (d) is an *open sentence* — its truth depends on x, so it's not a proposition until x is fixed. So: a **proposition is a declarative sentence that is exactly one of True or False — never both, never neither.**",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Picture each proposition as a **light switch**: ON (true, 1) or OFF (false, 0). There's no ‘half-on’. Everything ahead is just **wiring switches together**.",
    },

    { kind: "h", text: "2 · Wiring them together — connectives" },
    {
      kind: "p",
      text: "We label simple propositions p, q, r… and combine them with five **connectives**. Four are intuitive; one will trip you up (we'll corner it in section 4).",
    },
    {
      kind: "table",
      head: ["In words", "Symbol", "Output is TRUE when…"],
      rows: [
        ["not p", "¬p", "p is false (it flips the value)"],
        ["p and q", "p ∧ q", "BOTH are true"],
        ["p or q", "p ∨ q", "AT LEAST one is true (inclusive)"],
        ["if p then q", "p → q", "everything EXCEPT: p true and q false"],
        ["p if and only if q", "p ↔ q", "p and q have the SAME value"],
      ],
    },

    { kind: "h", text: "3 · The calculator — truth tables" },
    {
      kind: "callout",
      tone: "try",
      text: "You have **3** propositions p, q, r. How many rows will their truth table need? (Each can be T or F — count the combinations.)",
    },
    {
      kind: "p",
      text: "**8 = 2³.** Each proposition doubles the rows, so **n propositions → 2ⁿ rows**. A truth table simply lists every combination and the resulting output — the one tool that settles *any* question in this topic.",
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

    { kind: "h", text: "4 · The one that trips everyone — implication" },
    {
      kind: "callout",
      tone: "try",
      text: "I promise: *‘**If** you score 90%, **then** I'll buy you a phone.’* In which of these did I **break** my promise?  (1) You scored 90%, got the phone.  (2) You scored 90%, no phone.  (3) You scored 60%, got a phone anyway.  (4) You scored 60%, no phone.",
    },
    {
      kind: "p",
      text: "Only case **(2)** breaks the promise — you kept your side (p true) and I didn't keep mine (q false). In cases (3) and (4) the trigger never happened, so I broke nothing — the promise still holds. That's the whole rule: **p → q is FALSE only when p is true and q is false (T → F).** Every other row, including when p is false, is true.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Burn this in: **implication fails only on T → F.** A false premise can never make a true implication false — *‘a promise with no trigger is never broken.’* If you remember one thing from this page, this is it.",
    },

    { kind: "h", text: "5 · Three relatives of a conditional" },
    {
      kind: "callout",
      tone: "try",
      text: "Take *‘If it rains, the ground is wet’* (p → q). Form the **converse** (swap), the **inverse** (negate both), and the **contrapositive** (swap + negate). Which one is **guaranteed** to mean the same as the original?",
    },
    {
      kind: "table",
      head: ["Name", "Form", "Same as original?"],
      rows: [
        ["Original", "p → q", "—"],
        ["Converse", "q → p", "No"],
        ["Inverse", "¬p → ¬q", "No"],
        ["Contrapositive", "¬q → ¬p", "YES ✓"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The **contrapositive (¬q → ¬p) always equals the original** — *‘if the ground isn't wet, it didn't rain’* is just a restatement. This is why **proof by contrapositive** works. The **converse** and **inverse** are NOT equivalent to the original (but they equal *each other*).",
    },

    { kind: "h", text: "6 · Always-true, always-false" },
    {
      kind: "p",
      text: "Read the **last column** of a formula's truth table and name it: all **T** = **tautology** (always true, e.g. p ∨ ¬p); all **F** = **contradiction** (always false, e.g. p ∧ ¬p); a **mix** = **contingency** (most formulas).",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The traps NET loves",
      text: "(1) Logic's **OR is inclusive** — p ∨ q is true even when *both* are true. (2) **p → q ≠ q → p.** (3) **‘p only if q’ = p → q**, but **‘p if q’ = q → p** — opposite directions! (4) **‘unless’ = ‘if not’**: *‘A unless B’ = ¬B → A.* (5) Precedence, tightest→loosest: **¬ , ∧ , ∨ , → , ↔.**",
    },

    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **evaluate** a compound formula's truth value for given p, q, r; (2) **count truth-table rows** (2ⁿ); (3) decide **tautology / contradiction / contingency** from the final column; (4) pick the **contrapositive** of a statement (and know it's the equivalent one); (5) **translate English ↔ symbols**, especially ‘only if’ (→), ‘if’ (←), ‘unless’ (¬B→A), and ‘necessary/sufficient’ (sufficient = the antecedent, necessary = the consequent). The wording traps in the box above are where most marks are lost.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover the answers and say each aloud first.**  (a) For how many rows of 4 variables is the table built?  (b) Is p → q false when p is false?  (c) Which relative of p→q is logically equivalent to it?  (d) Translate ‘You pass only if you study’.  (e) Is p ∨ ¬p a tautology or contradiction?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers (after you've tried)",
      text: "(a) **16 = 2⁴**.  (b) **No** — it's true (vacuously); false only for T→F.  (c) the **contrapositive** ¬q → ¬p.  (d) pass → study (‘only if’ points to the consequent).  (e) a **tautology** (always true).",
    },
  ],
  // ---- Unit 1 · Mathematical Logic (remaining subtopics) ----
  "normal-forms": [
    {
      kind: "p",
      text: "Any whole number breaks into a unique product of primes. Logical formulas have **standard shapes** too — and forcing a formula into one makes it easy to compare, simplify, or hand to a computer. We'll figure out *why* there are exactly two such shapes.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "First, a **literal** is a variable or its negation (p or ¬p). Now: how many ways can you glue literals together with ANDs and ORs at two levels? Picture ‘ORs of ANDs’ vs ‘ANDs of ORs’ — those are the two shapes. Which connective sits on the *outside* names each one.",
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
      text: "**D**NF has **D**isjunction (OR) on the outside. **C**NF has **C**onjunction (AND) on the outside. The first letter is the outer glue.",
    },
    { kind: "h", text: "Principal forms — read straight off the truth table" },
    {
      kind: "p",
      text: "A **principal (canonical)** form is the unique version where *every* term mentions *every* variable. The beautiful part: you read it directly from the truth table.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "A formula has **3** True rows and **5** False rows in its 8-row table. How many **minterms** in its principal DNF, and how many **maxterms** in its principal CNF?",
    },
    {
      kind: "p",
      text: "**3 minterms** (one per True row) and **5 maxterms** (one per False row) — together 8 = 2ⁿ. A **minterm** is an AND-term true for exactly one row; **PDNF** = OR of the minterms of all **True** rows. A **maxterm** is an OR-clause false for exactly one row; **PCNF** = AND of the maxterms of all **False** rows.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**DNF/PDNF is Sum-Of-Products (SOP); CNF/PCNF is Product-Of-Sums (POS)** — the very same forms you'll minimise with K-maps in Boolean Algebra & digital circuits. #minterms = #1s, #maxterms = #0s.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) identify whether a formula is **CNF or DNF** (look at the outer connective); (2) **convert** a formula to a normal form (tip: rewrite p→q as ¬p∨q first, then distribute); (3) **count minterms/maxterms** = count of True/False rows; (4) SOP↔DNF and POS↔CNF naming.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) (a∨b)∧(c∨d) is CNF or DNF?  (b) Minterms come from True or False rows?  (c) DNF is SOP or POS?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **CNF** (AND outside).  (b) **True** rows.  (c) **SOP** (sum of products).",
    },
  ],

  "predicates-quantifiers": [
    {
      kind: "p",
      text: "Propositional logic hits a wall fast. It can say ‘Socrates is mortal’, but it **cannot** say ‘*every* human is mortal’ — it has no notion of ‘every’ or ‘some’, and no way to talk about objects in general. **Predicate logic** adds exactly that power.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Take the sentence ‘x is even’. Is it true or false? Until you do **two** things to it, it isn't a proposition at all. What are those two things?",
    },
    {
      kind: "p",
      text: "Either **fix x** (‘4 is even’ — now true) or **quantify x** (‘*every* number is even’ — now false). The open sentence ‘x is even’ is a **predicate** P(x): a statement with a blank that only gets a truth value once the blank is handled. The two ways to quantify:",
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
      text: "**∀ is a giant AND** (P(a) ∧ P(b) ∧ …) — one failure breaks it. **∃ is a giant OR** (P(a) ∨ P(b) ∨ …) — one success makes it. Every rule about quantifiers falls out of that.",
    },
    { kind: "h", text: "Negation — the exam favourite" },
    {
      kind: "callout",
      tone: "try",
      text: "‘All students passed’ is false. What exactly must be true for it to be false — that NO student passed, or that AT LEAST ONE student didn't? Say the negation precisely.",
    },
    {
      kind: "p",
      text: "It's false when **at least one** student didn't pass — *not* when none passed. So **¬(∀x P(x)) ≡ ∃x ¬P(x)**: to negate, **flip the quantifier and push ¬ inside** (it's De Morgan's law, scaled up). Likewise ¬(∃x P(x)) ≡ ∀x ¬P(x).",
    },
    {
      kind: "formula",
      text: "¬∀x P(x) ≡ ∃x ¬P(x)        ¬∃x P(x) ≡ ∀x ¬P(x)",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The translation trap",
      text: "**‘All P are Q’ = ∀x (P(x) → Q(x))** — uses an **arrow**. **‘Some P are Q’ = ∃x (P(x) ∧ Q(x))** — uses **AND**. Using ∧ with ∀, or → with ∃, is the single most common mistake. (∀ pairs with →, ∃ pairs with ∧.)",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **translate** English ↔ quantified logic (watch ∀→ and ∃∧); (2) **negate** a quantified statement (flip ∀↔∃, negate inside); (3) judge **truth over a small domain**; (4) the equivalence ¬∀ = ∃¬. Bound vs free variables may also appear.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Negate ∀x P(x).  (b) ‘Some birds fly’ — uses → or ∧?  (c) ∃ behaves like which connective?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **∃x ¬P(x)**.  (b) **∧**:  ∃x (Bird(x) ∧ Fly(x)).  (c) a big **OR**.",
    },
  ],

  "nested-quantifiers": [
    {
      kind: "p",
      text: "Once you have ∀ and ∃, you can stack them — and that's where meaning gets subtle. ‘Everyone has a mother’ and ‘there's one mother of everyone’ use the same words; one is true, one is absurd. **Order is meaning.**",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Let L(x, y) = ‘x loves y’. Read these two aloud and decide if they mean the same:  **∀x ∃y L(x, y)**  vs  **∃y ∀x L(x, y)**.  (Hint: think about whether the ‘y’ is allowed to be different for each x.)",
    },
    {
      kind: "p",
      text: "They're very different. **∀x ∃y L(x,y)** = ‘everyone loves *someone*’ — each person may love a different y. **∃y ∀x L(x,y)** = ‘there's *one* person everyone loves’ — a single y fixed for all. The second is far stronger.",
    },
    {
      kind: "diagram",
      caption: "Swapping ∀ and ∃ changes everything; same-type quantifiers can swap freely.",
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
      text: "**∃y∀x ⇒ ∀x∃y** (the stronger implies the weaker), but **NOT** the reverse. Same-type quantifiers commute freely: ∀x∀y ≡ ∀y∀x and ∃x∃y ≡ ∃y∃x. Only **mixed** ∀/∃ order matters.",
    },
    {
      kind: "p",
      text: "**Negating** a nested statement is mechanical: sweep the ¬ left-to-right, flipping each quantifier, and negate the predicate at the end. E.g. ¬∀x∃y P(x,y) ≡ ∃x∀y ¬P(x,y).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **state the meaning** of a nested statement in English; (2) decide if two orderings are **equivalent** (mixed ∀/∃ usually aren't); (3) **negate** a nested statement by flipping every quantifier. The ∀∃ vs ∃∀ distinction is the classic trap.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Does ∀x∃y ⇒ ∃y∀x?  (b) Negate ∃x∀y P(x,y).  (c) Is ∀x∀y ≡ ∀y∀x?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **No** (only the reverse holds).  (b) **∀x∃y ¬P(x,y)**.  (c) **Yes** — same-type quantifiers commute.",
    },
  ],

  "rules-inference": [
    {
      kind: "p",
      text: "A **proof** is a chain where every link is *guaranteed* by the ones before it. **Rules of inference** are the legal moves — and just as important, some natural-looking moves are **illegal** (fallacies). Telling them apart is the whole skill.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Given ‘If it rains, the match is cancelled’ and ‘It rained’ — what follows? Now the dangerous twin: given the same rule and ‘The match was cancelled’ — can you conclude ‘it rained’?",
    },
    {
      kind: "p",
      text: "From rain + ‘it rained’ you **may** conclude ‘cancelled’ — that's **Modus Ponens**, valid. But from ‘cancelled’ you may **NOT** conclude ‘it rained’ (it could be cancelled for many reasons) — that's the fallacy of **affirming the consequent**. Valid reasoning affirms the *antecedent*, not the consequent.",
    },
    {
      kind: "diagram",
      caption: "Modus Ponens — the engine of forward reasoning.",
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
      head: ["Rule", "From… infer"],
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
      title: "Valid moves vs their fallacy twins",
      text: "VALID: **affirm p** (Modus Ponens) or **deny q** (Modus Tollens). INVALID look-alikes: **affirming the consequent** (p→q, q ⊢ p) ✗ and **denying the antecedent** (p→q, ¬p ⊢ ¬q) ✗. Notice **Modus Tollens is the contrapositive in action** — that's why it's valid.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "An argument is **valid** when the conclusion is true in every row where *all* premises are true — equivalently, (premises → conclusion) is a **tautology**. Validity is about **form**, not whether the statements are actually true in the world.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **name the rule** used in a step (Modus Ponens/Tollens, the syllogisms, resolution); (2) decide if an argument is **valid**; (3) spot the **two fallacies**. The Modus Ponens/Tollens vs their invalid twins is the most common item; resolution underlies automated theorem proving (links to Unit 10 AI).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) p→q and ¬q give you?  (b) Is ‘p→q, q, ∴ p’ valid?  (c) p→q and q→r give you?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **¬p** (Modus Tollens).  (b) **No** — affirming the consequent (fallacy).  (c) **p→r** (Hypothetical Syllogism).",
    },
  ],

  // ---- Unit 1 · remaining topics ----
  "sets-relations": [
    {
      kind: "p",
      text: "A **set** is just a collection of distinct things — the vocabulary the rest of mathematics is written in. A **relation** is the next idea: a precise way to say *which* elements are linked to which. We'll build both, and you'll classify relations yourself before I name the rules.",
    },
    { kind: "h", text: "1 · Set operations" },
    {
      kind: "callout",
      tone: "try",
      text: "A = {1,2,3}, B = {3,4}. Before reading on, write down A ∪ B, A ∩ B, and A − B. Then: how many subsets does a 3-element set have?",
    },
    {
      kind: "p",
      text: "A ∪ B = {1,2,3,4} (everything), A ∩ B = {3} (in both), A − B = {1,2} (in A not B). And a set with n elements has **2ⁿ subsets** (its *power set*) — each element is independently in or out, so 2³ = 8 here.",
    },
    {
      kind: "diagram",
      caption: "Union = either, Intersection = both, Difference = in A not B.",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Set operations Venn diagrams">
        <defs><clipPath id="sr2-i"><circle cx="180" cy="60" r="22"/></clipPath></defs>
        <text x="56" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)">A ∪ B</text>
        <circle cx="44" cy="60" r="22" fill="var(--primary)" opacity="0.5" stroke="var(--muted)"/>
        <circle cx="72" cy="60" r="22" fill="var(--primary)" opacity="0.5" stroke="var(--muted)"/>
        <text x="192" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)">A ∩ B</text>
        <circle cx="180" cy="60" r="22" fill="none" stroke="var(--muted)"/>
        <circle cx="208" cy="60" r="22" fill="none" stroke="var(--muted)"/>
        <g clip-path="url(#sr2-i)"><circle cx="208" cy="60" r="22" fill="var(--primary)" opacity="0.6"/></g>
        <text x="330" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)">A − B</text>
        <path d="M316,38 a22,22 0 1,0 0,44 a22,22 0 0,0 0,-44" fill="var(--primary)" opacity="0.5"/>
        <circle cx="344" cy="60" r="22" fill="var(--card)" stroke="var(--muted)"/>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "note",
      title: "An old friend returns",
      text: "**De Morgan's laws** (from logic) apply to sets too: (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′. And **inclusion–exclusion**: |A ∪ B| = |A| + |B| − |A ∩ B| (you subtract the overlap you counted twice).",
    },
    { kind: "h", text: "2 · Relations and their four properties" },
    {
      kind: "p",
      text: "A **relation R on a set A** is any set of ordered pairs from A — e.g. ‘≤’ on numbers, or ‘is a sibling of’ on people. We classify every relation by four yes/no properties.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Take ‘**is a sibling of**’ on people. Is it **reflexive** (are you your own sibling?), **symmetric** (if A is B's sibling, is B A's?), **transitive** (sibling of a sibling)? Decide each before the table.",
    },
    {
      kind: "table",
      head: ["Property", "Means"],
      rows: [
        ["Reflexive", "(a, a) ∈ R for every a — everything relates to itself"],
        ["Symmetric", "a R b ⇒ b R a"],
        ["Antisymmetric", "a R b and b R a ⇒ a = b"],
        ["Transitive", "a R b and b R c ⇒ a R c"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two star combinations: **Equivalence relation = Reflexive + Symmetric + Transitive** — it carves the set into disjoint **equivalence classes** (like ‘same remainder mod 5’). **Partial order (POSET) = Reflexive + Antisymmetric + Transitive** — like ‘≤’ or ‘divides’, drawn as a **Hasse diagram**.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The classic trap",
      text: "**Antisymmetric is NOT ‘not symmetric’.** A relation can be *both* symmetric and antisymmetric (e.g. equality ‘=’). And ‘≤’ is antisymmetric & a partial order, but ‘<’ is **not** reflexive, so not a partial order.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) check which **properties** a given relation has; (2) decide if it's an **equivalence relation** or **partial order**, and **count equivalence classes**; (3) build/read a **Hasse diagram**; (4) **2ⁿ subsets** and **inclusion–exclusion** counts; (5) number of relations on a set = 2^(n²).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Equivalence relation = which 3 properties?  (b) Subsets of a 4-element set?  (c) Can a relation be both symmetric and antisymmetric?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Reflexive, Symmetric, Transitive.**  (b) **2⁴ = 16.**  (c) **Yes** — e.g. equality.",
    },
  ],

  "counting-probability": [
    {
      kind: "p",
      text: "‘In how many ways?’ — without listing them all. That's **counting**, and one decision drives almost every problem: **does order matter?** Get that right and the formulas pick themselves.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Start with two tiny rules",
      text: "**Sum rule:** if you can do A *or* B (mutually exclusive), choices add. **Product rule:** if you do A *then* B, choices multiply. A meal with 3 starters and 4 mains has 3 × 4 = 12 combinations (product), not 7.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "From {A, B, C}, pick 2. First **list** the ordered pairs (AB, BA, …) — how many? Then list the *unordered* selections (AB and BA count once) — how many now?",
    },
    {
      kind: "p",
      text: "Ordered: **6** (AB, BA, AC, CA, BC, CB) — a **permutation**. Unordered: **3** (AB, AC, BC) — a **combination**. The combination is exactly the permutation count divided by the orderings (6 ÷ 2! = 3).",
    },
    {
      kind: "diagram",
      caption: "Order matters → permutation; order ignored → combination.",
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
        "**Pigeonhole principle:** put n items in m boxes; if n > m, some box holds ≥ 2. In general some box holds ≥ ⌈n/m⌉. (13 people → two share a birth month.)",
        "**Inclusion–Exclusion:** |A ∪ B| = |A| + |B| − |A ∩ B|.",
        "**Probability** P(E) = favourable/total; **Bayes:** P(H | E) = P(E | H)·P(H) / P(E) — updates a belief after seeing evidence.",
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Decide in one question",
      text: "Ask: *‘would swapping two chosen items give a different outcome?’* **Yes → permutation** (passwords, rankings). **No → combination** (committees, handshakes).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) compute **ⁿPᵣ / ⁿCᵣ** (decide order first); (2) **pigeonhole** minimum (⌈n/m⌉); (3) **inclusion–exclusion** counts; (4) plug into **Bayes' theorem**; (5) basic probability of an event. Mixing up P and C, and forgetting the −|A∩B|, are the usual losses.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) A 4-digit PIN — permutation or combination?  (b) ⁵C₂ = ?  (c) 5 letters into 4 boxes — at least one box has how many?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Permutation** (order matters).  (b) **10**.  (c) at least **⌈5/4⌉ = 2** (pigeonhole).",
    },
  ],

  // ---- Unit 1 · Graph Theory, Boolean Algebra, Optimization ----
  "graph-theory": [
    {
      kind: "p",
      text: "A **graph** models *things and the links between them* — cities and roads, people and friendships, web pages and hyperlinks. Formally G = (V, E): **vertices** V joined by **edges** E. A handful of ideas unlock the whole topic; we'll discover the most useful one first.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Draw any graph and add up the **degree** (number of edges) of every vertex. Compare that total to the number of edges. Try a couple of graphs — what's the relationship?",
    },
    {
      kind: "p",
      text: "The degree-sum is always **exactly twice** the number of edges — because each edge has two ends, contributing 1 to two vertices. That's the **Handshake Lemma: Σ deg = 2·|E|.** A neat corollary falls out: the number of **odd-degree vertices is always even**.",
    },
    { kind: "h", text: "Two journeys students mix up" },
    {
      kind: "callout",
      tone: "try",
      text: "‘Trace a route using every **edge** exactly once’ vs ‘visit every **vertex** exactly once’. These are two famous, *different* problems. Which is named after Euler, and which after Hamilton?",
    },
    {
      kind: "diagram",
      caption: "Eulerian = every EDGE once; Hamiltonian = every VERTEX once.",
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
        "**Eulerian** (every edge) has a clean test: an Euler **circuit** exists ⇔ the graph is connected and **every vertex has even degree**; an Euler **path** allows exactly **2** odd-degree vertices.",
        "**Hamiltonian** (every vertex) has **no easy test** — it's an NP-hard-style problem (this is the trap: people expect a degree rule, but there isn't one).",
        "**Tree:** connected with **no cycles**; n vertices ⇒ exactly **n − 1 edges**. Spanning tree reaches all vertices; **MST** = cheapest one (Prim/Kruskal).",
        "**Planar** (drawable without crossings): **Euler's formula V − E + F = 2**. K₅ and K₃,₃ are the smallest non-planar graphs. **Bipartite** = 2-colourable = **no odd cycle**.",
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Engrave the difference",
      text: "**Eul**er → **E**dges (just check degree parity). **Ham**ilton → vertices (hard, no shortcut). A tree always has **n − 1** edges.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) apply the **Handshake Lemma** (degree-sum = 2E, count edges); (2) test for an **Euler path/circuit** by counting odd-degree vertices; (3) **V − E + F = 2** for planar/faces; (4) a tree's **edge count (n−1)**; (5) **chromatic number** / bipartite check. Euler-vs-Hamilton confusion is the single biggest mark-loser.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Sum of degrees = ? in terms of edges.  (b) Euler circuit needs every vertex to have what degree?  (c) A tree with 10 vertices has how many edges?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **2 × |E|.**  (b) **even** degree (and connected).  (c) **9** (n − 1).",
    },
  ],

  "boolean-algebra": [
    {
      kind: "p",
      text: "Remember Boole turning logic into algebra? **Boolean algebra** is that algebra used to *design and simplify circuits*. Values are 0 and 1; operations are **· (AND), + (OR), ¬ (NOT)** — the very same logic from the start of this unit, now building hardware.",
    },
    {
      kind: "p",
      text: "A function is usually written as **Sum of Products (SOP)** — an OR of AND-terms (the DNF you already met). The goal is **minimisation**: a smaller expression = a cheaper, faster circuit. The fastest hand tool is the **Karnaugh map (K-map)**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Below, the value B is 1 in all four cells where B appears, regardless of A or C. If a variable doesn't affect the output across a group of 1s, should it appear in the simplified term? Look at the circled group and guess the one-letter answer.",
    },
    {
      kind: "diagram",
      caption: "K-map: circle the largest groups of adjacent 1s (sizes 1,2,4,8…). One group = one simplified term.",
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
          <text x="182" y="134" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#c0392b">this group of four 1s simplifies to just  B</text>
        </g>
      </svg>`,
    },
    {
      kind: "p",
      text: "The answer is **B** — A and C change across the group while the output stays 1, so they drop out. Bigger groups eliminate more variables, giving simpler terms.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Boolean algebra **mirrors propositional logic exactly**: AND↔∧, OR↔∨, NOT↔¬, and the same laws (De Morgan, distributive, **duality**). **NAND and NOR are universal** — any circuit can be built from one of them alone. Master this and you've mastered the digital-logic part of Unit 2 too.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "K-map rules",
      text: "Group only **1s**, in rectangles of size **2ᵏ** (1, 2, 4, 8…), as **large** as possible, wrapping around edges. Bigger group = fewer variables in the term. Every 1 must be covered at least once. *Don't-care* (×) cells may be used to enlarge a group.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **minimise** a function with a K-map; (2) convert SOP↔POS and minterm/maxterm lists (Σm / ΠM); (3) apply **Boolean laws** (especially De Morgan & absorption); (4) **duality**; (5) recall **NAND/NOR are universal**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) SOP means OR-of-? .  (b) A K-map group of 4 (in a 3-variable map) leaves how many variables in the term?  (c) Which gates are universal?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) OR of **AND-terms** (products).  (b) **1** variable (group of 4 removes 2 of 3).  (c) **NAND and NOR.**",
    },
  ],

  "optimization": [
    {
      kind: "p",
      text: "**Optimization** finds the *best* outcome — most profit, least cost — under limits. The core case is **Linear Programming (LP)**: a linear goal to maximise/minimise, subject to linear **constraints**. There's a beautiful shortcut to where the answer lives.",
    },
    {
      kind: "p",
      text: "With two variables you can **graph** it: the constraints carve out a **feasible region** (a convex polygon of all allowed points). Now the key question:",
    },
    {
      kind: "callout",
      tone: "try",
      text: "The objective (e.g. profit = 3x + 2y) keeps rising as you push in one direction across the feasible polygon. Where in that region will the maximum be — somewhere in the middle, on an edge, or at a **corner**? Reason it out before reading.",
    },
    {
      kind: "p",
      text: "It's always at a **corner (vertex)**. A linear objective increases steadily in one direction, so it gets pushed until it can't move further — which is a corner of the polygon. That single fact *is* the graphical method.",
    },
    {
      kind: "diagram",
      caption: "Shade the feasible region; the optimum sits on a CORNER, never strictly inside.",
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
      text: "**The optimum of an LP always lies at a vertex of the feasible region.** So evaluate the objective at every corner and pick the best — that's the whole graphical method, and exactly what the **Simplex** method automates (walking corner-to-corner) when there are too many variables to draw.",
    },
    {
      kind: "ul",
      items: [
        "**Duality** pairs every LP with a related one whose optimum value matches.",
        "**Transportation & assignment** are special LPs solved by table methods (e.g. the Hungarian method for assignment).",
        "**PERT/CPM:** the **critical path** is the longest chain of dependent tasks — it sets the minimum project duration; tasks on it have **zero slack**.",
      ],
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **evaluate corners** of a feasible region to find the optimum; (2) identify feasible/infeasible points or write an LP in standard form; (3) **PERT critical path** & project duration; (4) duality/transportation basics. ‘Optimum at a vertex’ answers most graphical questions.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) An LP optimum is found where in the feasible region?  (b) What does the Simplex method walk between?  (c) The critical path is the longest or shortest task chain?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) at a **corner (vertex)**.  (b) **corner points** of the feasible region.  (c) the **longest** chain (it fixes the minimum duration).",
    },
  ],

  // ===================================================================
  // UNIT 2 — COMPUTER SYSTEM ARCHITECTURE (educational, beginner→advanced)
  // ===================================================================
  "digital-logic-circuits": [
    {
      kind: "p",
      text: "Every photo, song, and program inside a computer is ultimately **two voltages** — call them 0 and 1. **Logic gates** are the tiny circuits that take 0/1 inputs and produce a 0/1 output. Wire enough together and you get adders, memory, and an entire CPU. We'll build the intuition, and you'll predict outputs before I give them.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Why binary, and not decimal?",
      text: "A wire is **reliable at telling two states apart** (low vs high voltage) but unreliable at ten. Two states means rare errors and cheap, fast switches (transistors). So computers count in base-2 — and logic gates are how they *compute* with it.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Predict the output of each: **AND**(1, 0) = ?  **OR**(1, 0) = ?  **NOT**(0) = ?  **XOR**(1, 1) = ?",
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
      kind: "p",
      text: "Answers: AND(1,0) = **0** (needs all 1s), OR(1,0) = **1** (any 1), NOT(0) = **1** (flip), XOR(1,1) = **0** (same inputs → 0).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "A factory can cheaply mass-produce only **one** type of gate. Could you still build *any* circuit — an adder, a memory cell — from copies of just that one gate? Which gate would make that possible?",
    },
    {
      kind: "p",
      text: "Yes — if that gate is **NAND** (or **NOR**). They're **universal**: NOT, AND, OR can all be made from NAND alone, so any circuit can. That's exactly why chips are built from oceans of identical NAND gates. (NAND = AND-then-NOT; NOR = OR-then-NOT.)",
    },
    { kind: "h", text: "Two families of circuits" },
    {
      kind: "table",
      head: ["Type", "Output depends on", "Examples"],
      rows: [
        ["Combinational", "ONLY the current inputs", "Adder, Decoder, Multiplexer, Encoder"],
        ["Sequential", "current inputs + stored state (memory)", "Flip-flops, Registers, Counters"],
      ],
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A **multiplexer** is a railway switch: many incoming tracks, but the *select* lever decides which single train passes. n select lines choose among **2ⁿ** inputs. A **decoder** is the reverse — an n-bit code lights exactly one of 2ⁿ output lines.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Combinational = no memory (output from inputs alone); Sequential = has memory (flip-flops).** A **flip-flop stores 1 bit** — types **SR, D, JK, T**: JK fixes SR's invalid state, T (toggle) flips each clock. **NAND & NOR are universal gates.**",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **compute** a gate/circuit output (or fill a truth table); (2) recall **NAND/NOR are universal**; (3) **MUX select lines** (2ⁿ inputs need n select lines) and decoder/encoder sizing; (4) match **flip-flop** type ↔ behaviour (JK no invalid state, T toggles); (5) combinational vs sequential classification.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which gates are universal?  (b) How many select lines for an 8-to-1 MUX?  (c) Is a counter combinational or sequential?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **NAND and NOR.**  (b) **3** (2³ = 8).  (c) **Sequential** (it stores a count).",
    },
  ],

  "data-representation": [
    {
      kind: "p",
      text: "Inside the machine, *everything* — numbers, letters, colours — is a pattern of bits. **Data representation** is the agreed set of rules for encoding values and doing arithmetic on them. The trickiest part, and the most-tested, is how to store **negative** numbers.",
    },
    {
      kind: "p",
      text: "First, the same value wears different clothes in **binary (2), octal (8), decimal (10), hexadecimal (16)**. Group binary digits in **3s** to read octal, in **4s** to read hex.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "There's no minus-sign wire inside a CPU — only 0s and 1s. So how would you store **−5** in 8 bits? (Hint: find a rule that makes 5 + (−5) come out 0 using the same adder.) Take a guess at the trick before reading.",
    },
    {
      kind: "p",
      text: "The standard answer is **2's complement: invert every bit of +5, then add 1.** Why it's brilliant: with this scheme, ordinary binary addition of 5 and (−5) naturally rolls over to 0, so **one adder handles both addition and subtraction**.",
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
      text: "An **n-bit 2's-complement** register holds **−2ⁿ⁻¹ to +2ⁿ⁻¹−1** (8 bits → −128…+127). The leftmost bit is the **sign** (1 = negative), and there is only **one** zero — its big advantage over 1's complement (which has +0 and −0).",
    },
    {
      kind: "p",
      text: "Fractions use **floating point (IEEE 754)**: a number is **sign · mantissa · 2^exponent**. Single precision = 32 bits (1 sign + 8 exponent + 23 mantissa); double = 64 bits.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **convert** between bases (binary↔octal↔hex via 3-/4-bit groups); (2) take a **2's complement** and do signed add/subtract; (3) state the **range** of an n-bit register (−2ⁿ⁻¹ … 2ⁿ⁻¹−1); (4) break down the **IEEE-754** sign/exponent/mantissa fields; (5) error-detection codes (parity).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Range of a signed 8-bit number?  (b) 2's complement of 0000 0001?  (c) How many bits in single-precision float?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **−128 to +127.**  (b) invert → 1111 1110, +1 → **1111 1111** (= −1).  (c) **32 bits** (1 + 8 + 23).",
    },
  ],

  "register-transfer": [
    {
      kind: "p",
      text: "Zoom inside the CPU and ‘running a program’ becomes something concrete: **moving and transforming the contents of registers**, one clock tick at a time. We describe this precisely with **Register Transfer Language (RTL)**.",
    },
    {
      kind: "formula",
      text: "R2 ← R1        (copy the contents of R1 into R2)",
    },
    {
      kind: "callout",
      tone: "try",
      text: "You have 8 registers that all need to send data to each other. Wiring every register directly to every other takes a tangle of connections. What single shared resource could they take turns using instead — and how many select lines would choosing among 8 need?",
    },
    {
      kind: "p",
      text: "A **common bus** — one shared set of wires. A control signal picks which register *drives* the bus and which *reads* it; selecting 1 of 8 sources needs **3** select lines (2³ = 8). Far less wiring than point-to-point.",
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
    {
      kind: "ul",
      items: [
        "**Arithmetic** micro-ops: add, subtract, increment, decrement (R3 ← R1 + R2).",
        "**Logic** micro-ops: AND, OR, XOR, complement — applied bit-by-bit.",
        "**Shift** micro-ops: *logical* (fill 0), *arithmetic* (preserve the sign bit), *circular/rotate* (wrap bits around).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A **micro-operation** is one elementary action on register data during a single clock pulse. A whole instruction is just a *sequence* of micro-operations — the bridge to the control unit. Mind the **shift types**: arithmetic shift keeps the sign; logical fills with 0.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) read/predict an **RTL** statement's effect; (2) compute the result of a **shift** (logical vs arithmetic vs circular); (3) **bus/select-line** counts (2ⁿ sources → n lines). Distinguishing the three shift types is the common trap.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) R2 ← R1 does what?  (b) Which shift preserves the sign bit?  (c) Select lines for a 16-register bus?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) copies R1's contents **into R2**.  (b) **arithmetic** shift.  (c) **4** (2⁴ = 16).",
    },
  ],
  "basic-computer-org": [
    {
      kind: "p",
      text: "What makes a computer *general-purpose* rather than a fixed gadget? The **stored-program** idea: instructions live in memory right beside the data, and the CPU just repeats one loop forever — **fetch, decode, execute**. Master that loop and the rest of architecture clicks into place.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "The CPU is about to run an instruction. What three things must happen, in order, to (1) get the instruction, (2) understand it, and (3) carry it out? Name them before the diagram.",
    },
    {
      kind: "diagram",
      caption: "The instruction cycle repeats forever (checking for interrupts each round).",
      svg: `<svg viewBox="0 0 384 130" role="img" aria-label="Instruction cycle">
        <g font-size="11">
          ${([["Fetch", 70], ["Decode", 175], ["Execute", 285]] as [string, number][])
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
        ["PC — Program Counter", "address of the NEXT instruction"],
        ["AR — Address Register", "address currently sent to memory"],
        ["IR — Instruction Register", "holds the instruction being executed"],
        ["AC — Accumulator", "main register for results"],
        ["DR — Data Register", "data read from / written to memory"],
      ],
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Direct** addressing: the instruction holds the operand's address. **Indirect**: it holds the address *of* the address. Which one needs an **extra memory access** to reach the data — and why might you still want it?",
    },
    {
      kind: "p",
      text: "**Indirect** needs the extra access (one lookup to get the real address, another to get the data) — but it enables **pointers** (the address can change at run time). That trade-off — flexibility for an extra memory reference — is a classic exam point.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Loop = **Fetch → Decode → Execute**, repeated, with an **interrupt** checked at the end of each cycle (current state saved, device serviced, then resumed). **PC = next instruction's address.** Indirect addressing = one extra memory reference vs direct.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **match register ↔ function** (PC = next address is the favourite); (2) **order the instruction-cycle** phases; (3) **count memory accesses** for direct vs indirect; (4) when **interrupts** are serviced (after the current instruction).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which register holds the next instruction's address?  (b) Direct or indirect needs more memory accesses?  (c) Order the cycle phases.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **PC** (Program Counter).  (b) **Indirect.**  (c) **Fetch → Decode → Execute.**",
    },
  ],

  "programming-basic-computer": [
    {
      kind: "p",
      text: "The CPU only truly understands **machine language** — raw binary like `0001 0000 0110`. Writing that by hand is misery, so we write **assembly** (`LDA X`, `ADD Y`) and let an **assembler** translate it. This topic is about those layers of translation.",
    },
    {
      kind: "table",
      head: ["Level", "Looks like", "Run by"],
      rows: [
        ["Machine language", "0001 0000 0110…", "the CPU directly"],
        ["Assembly language", "LDA X · ADD Y · STA Z", "assembler → machine code"],
        ["High-level language", "z = x + y", "compiler/interpreter → lower levels"],
      ],
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Assembly is a **human-readable nickname** for machine code — `ADD` instead of `0001…`. The **assembler** is the translator that swaps nicknames back into the exact binary the CPU expects. It's nearly **1-to-1**; a high-level statement is **1-to-many** machine instructions.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "An assembly program says `JMP LOOP`, but `LOOP` is a label defined *later* in the file. On its first read, the assembler hasn't seen LOOP's address yet. How could a **two-pass** assembler solve this?",
    },
    {
      kind: "p",
      text: "**Pass 1** scans the whole program and builds a **symbol table** (every label → its address). **Pass 2** then generates machine code, now that every label's address is known. (This is why it's ‘two-pass’.)",
    },
    {
      kind: "ul",
      items: [
        "**Program loops** repeat code using a counter and a conditional branch.",
        "A **subroutine** (function) is called and **returns** to where it left off — the **return address** is saved (often on a stack).",
        "**I/O programming** transfers data to/from devices via instructions.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Each layer **translates down** to the one below. The **assembler** + its **symbol table** convert symbolic assembly to machine code in two passes. A **subroutine** works by saving the **return address** so control can come back.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) role of the **assembler** & **symbol table**; (2) distinguish machine vs assembly vs high-level (1-to-1 vs 1-to-many); (3) why **two passes** are needed (forward references); (4) subroutine = save return address; trace a small assembly loop.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) What does pass 1 of an assembler build?  (b) Assembly→machine is roughly 1-to-? .  (c) What does a subroutine save to return?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) the **symbol table** (labels → addresses).  (b) **1-to-1.**  (c) the **return address.**",
    },
  ],

  "microprogrammed-control": [
    {
      kind: "p",
      text: "Something has to generate the precise control signals that drive every micro-operation — open this gate, latch that register, now. That something is the **control unit**, and there are two ways to build it, with a sharp trade-off you'll be asked to weigh.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Option A: build the control logic out of **fixed gates** wired for speed. Option B: store the control signals as **words in a small memory** you can rewrite. Before reading: which is **faster**, and which is **easier to modify** for a new instruction set?",
    },
    {
      kind: "p",
      text: "**Hardwired (A) is faster** (it's just gates) but **rigid** — changing it means redesigning circuits. **Microprogrammed (B) is flexible** (rewrite the control memory) but **slower** (each step is a memory lookup). That's the whole trade-off.",
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
      text: "One line: **hardwired = fast but inflexible; microprogrammed = flexible but slower.** The **control memory** holds control words; **address sequencing** (via the CAR) decides which runs next. RISC→hardwired, CISC→microprogrammed.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **compare hardwired vs microprogrammed** (speed/flexibility); (2) define **control memory / control word**; (3) the **CAR & address sequencing** role; (4) link **RISC→hardwired, CISC→microprogrammed.**",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which control unit is faster?  (b) Which is easier to modify?  (c) CISC tends to use which?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Hardwired.**  (b) **Microprogrammed.**  (c) **Microprogrammed** control.",
    },
  ],

  "cpu": [
    {
      kind: "p",
      text: "The **CPU** is the brain that executes instructions. Three design choices shape its speed and personality: how **instructions are formatted**, how it **finds operands** (addressing modes), and the big philosophy split — **RISC vs CISC**.",
    },
    { kind: "h", text: "Instruction formats" },
    {
      kind: "callout",
      tone: "try",
      text: "‘Add R2 and R3, put the result in R1’. Write it as a 3-address instruction. Now imagine a CPU that only has *one* special register (the accumulator) — how few addresses could an ADD instruction need?",
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
        "**Direct** — address field *is* the operand's address. **Indirect** — it points to the address (extra memory reference).",
        "**Indexed / Base / Relative** — effective address = a register + an offset (perfect for arrays & loops).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**RISC vs CISC:** RISC = few, simple, fixed-length instructions, many registers, mostly **hardwired**, ~one instruction per cycle, easy to **pipeline**. CISC = many complex variable-length instructions, **microprogrammed**. RISC trades instruction richness for **speed**. A **stack machine = 0-address**; **indirect = extra memory reference.**",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) compute the **effective address** for a given mode; (2) identify a **0/1/2/3-address** format; (3) **RISC vs CISC** contrasts. ‘Stack → 0-address’ and ‘indirect needs an extra memory access’ are staples.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) A stack machine uses how many addresses per instruction?  (b) RISC usually uses hardwired or microprogrammed control?  (c) Which mode has the operand inside the instruction itself?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **0-address.**  (b) **Hardwired.**  (c) **Immediate.**",
    },
  ],

  "pipeline-vector": [
    {
      kind: "p",
      text: "How do you make a CPU faster *without* a faster clock? **Pipelining** — run instructions like a factory assembly line, so several are in progress at once, each in a different stage.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "An instruction passes through 4 stages: Fetch, Decode, Execute, Write. In a pipeline, do you wait for instruction 1 to fully finish before starting instruction 2's Fetch — or can stage 1 start on instruction 2 while instruction 1 moves to stage 2? Picture the timeline.",
    },
    {
      kind: "diagram",
      caption: "4 instructions through a 4-stage pipeline: the stages overlap across clock cycles.",
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
      kind: "p",
      text: "They **overlap** — that's the whole point. No single instruction finishes sooner, but **more finish per second**.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "For a **k-stage** pipeline running **n** instructions: total = **(k + n − 1)** cycles instead of n·k. Ideal **speedup → k** for large n. The catch is **hazards**: *structural* (resource clash), *data* (need a result not ready — fixed by forwarding/stalls), *control* (a branch — fixed by branch prediction).",
    },
    {
      kind: "p",
      text: "**Vector / array processors** push it further (SIMD): one instruction operates on a whole **array** at once — ideal for graphics & scientific computing.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **compute pipeline cycles (k + n − 1)**, speedup and efficiency; (2) identify the **hazard type**; (3) vector/SIMD basics. Numerical pipeline questions appear almost every cycle — drill the formula.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Cycles for a 5-stage pipeline running 10 instructions?  (b) A branch causes which hazard?  (c) Ideal speedup of a k-stage pipeline?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **k + n − 1 = 5 + 10 − 1 = 14.**  (b) **Control** hazard.  (c) **k.**",
    },
  ],

  "io-organization": [
    {
      kind: "p",
      text: "The CPU is blisteringly fast; keyboards, disks and printers are glacially slow. **I/O organization** is about coordinating that transfer **without wasting the CPU's time** waiting.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Three ways to move data from a slow device: (A) the CPU keeps **asking** ‘ready yet? ready yet?’; (B) the device **taps the CPU on the shoulder** when ready; (C) a dedicated controller moves a whole block **directly to memory**, telling the CPU only when done. Rank A, B, C from **most** CPU time wasted to **least**.",
    },
    {
      kind: "table",
      head: ["Mode", "How it works", "CPU involvement"],
      rows: [
        ["Programmed I/O", "CPU keeps polling the device's status", "Highest — busy-waits"],
        ["Interrupt-driven", "device interrupts the CPU when ready", "Medium — CPU works meanwhile"],
        ["DMA", "a controller moves data directly to/from memory", "Lowest — told only when done"],
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
      text: "Order (most→least CPU time): **Programmed > Interrupt > DMA.** **DMA** is the choice for **bulk transfers** (disk ↔ memory) — the CPU is interrupted only once at the end; the controller briefly ‘steals’ bus cycles (**cycle stealing**). Multiple simultaneous interrupts are ordered by **priority** (e.g. a **daisy chain** — nearest device wins).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **rank the three transfer modes** by CPU involvement; (2) explain **DMA & cycle stealing**; (3) resolve **interrupt priority** (daisy chain = nearest highest). ‘DMA for bulk transfer’ is the classic answer.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which mode wastes the most CPU time?  (b) Best mode for a large disk→memory transfer?  (c) Daisy chain gives highest priority to the device that is…?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Programmed I/O** (polling).  (b) **DMA.**  (c) **closest to the CPU.**",
    },
  ],

  "memory-hierarchy": [
    {
      kind: "p",
      text: "Fast memory is tiny and expensive; cheap memory is huge and slow. You can't have one memory that's all three (fast, big, cheap) — so computers fake it with a **hierarchy**, and it works because of one deep fact about how programs behave.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Keeping a small amount of *recently-used* data in a tiny, fast memory (cache) speeds programs up enormously. **Why does that even help?** What pattern in how programs access memory makes a small cache so effective?",
    },
    {
      kind: "p",
      text: "**Locality of reference** — programs reuse the *same* data and *nearby* data over and over (loops, arrays). So a small cache holding the recent/nearby data catches the vast majority of accesses. That single property is why the whole hierarchy works.",
    },
    {
      kind: "diagram",
      caption: "Top = fastest & smallest (most expensive per bit); bottom = slowest & largest.",
      svg: `<svg viewBox="0 0 384 150" role="img" aria-label="Memory hierarchy pyramid">
        <g font-size="10" text-anchor="middle">
          ${([
            ["Registers", 70, "#fff"],
            ["Cache (SRAM)", 130, "#fff"],
            ["Main memory (DRAM)", 200, "#fff"],
            ["SSD / Disk", 280, "var(--text)"],
            ["Tape / Cloud", 360, "var(--text)"],
          ] as [string, number, string][])
            .map(([label, w, col], i) => `<rect x="${192 - w / 2}" y="${10 + i * 26}" width="${w}" height="22" rx="3" fill="var(--primary)" opacity="${0.85 - i * 0.15}"/><text x="192" y="${25 + i * 26}" fill="${col}">${label}</text>`)
            .join("")}
          <text x="20" y="22" fill="var(--muted)" font-size="9" text-anchor="start">fast</text>
          <text x="20" y="140" fill="var(--muted)" font-size="9" text-anchor="start">slow</text>
        </g>
      </svg>`,
    },
    {
      kind: "formula",
      text: "Effective access time = (Hit ratio × cache time) + (Miss ratio × memory time)",
    },
    {
      kind: "ul",
      items: [
        "**Cache mapping:** *Direct* (each block → one fixed line), *Associative* (any line), *Set-associative* (any line within a set).",
        "**Virtual memory** uses disk to pretend RAM is bigger; the **page table** maps virtual → physical pages, and a missing page is a **page fault**.",
        "**Frames = physical memory ÷ page size.**",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Two ideas run the topic: **locality** (recent/nearby reuse) makes caching work, and **effective access time** quantifies the payoff. A **hit** is found in cache; a **miss** goes to main memory. A high **hit ratio** is everything.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **compute effective access time** & hit ratio; (2) **cache mapping** — which line/set a block maps to; (3) **page faults** & virtual→physical translation; (4) **frames = memory ÷ page size**. These numericals recur every cycle.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) What property makes caching effective?  (b) Cache time 10 ns, memory 100 ns, hit ratio 0.9 → effective access time?  (c) Frames if RAM = 4 MB, page = 2 KB?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **locality of reference.**  (b) 0.9×10 + 0.1×100 = **19 ns.**  (c) 4 MB / 2 KB = **2048.**",
    },
  ],

  "multiprocessors": [
    {
      kind: "p",
      text: "One CPU can only go so fast. A **multiprocessor** puts several CPUs to work together. The exam centres on three things: how we **classify** such machines, how they **connect**, and how they stay **consistent**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Two knobs describe any parallel machine: how many **instruction streams** run at once (one or many), and how many **data streams** they act on (one or many). That makes a 2×2 grid of four classes. Can you name the everyday PC's class, and the GPU/vector class?",
    },
    {
      kind: "diagram",
      caption: "Flynn's taxonomy — classify by Instruction streams × Data streams.",
      svg: `<svg viewBox="0 0 384 134" role="img" aria-label="Flynn's taxonomy">
        <g font-size="11" text-anchor="middle">
          <text x="120" y="16" fill="var(--muted)" font-size="9">single data</text>
          <text x="280" y="16" fill="var(--muted)" font-size="9">multiple data</text>
          <text x="22" y="48" fill="var(--muted)" font-size="9" transform="rotate(-90 22 48)">1 instr</text>
          <text x="22" y="104" fill="var(--muted)" font-size="9" transform="rotate(-90 22 104)">N instr</text>
          ${([
            ["SISD", "ordinary PC", 0, 0],
            ["SIMD", "vector / GPU", 1, 0],
            ["MISD", "rare", 0, 1],
            ["MIMD", "multicore", 1, 1],
          ] as [string, string, number, number][])
            .map(([t, d, c, r]) => `<rect x="${44 + c * 162}" y="${24 + r * 56}" width="150" height="48" rx="6" fill="var(--primary)" opacity="${t === "MISD" ? 0.3 : 0.85}"/><text x="${119 + c * 162}" y="${46 + r * 56}" fill="#fff" font-weight="700">${t}</text><text x="${119 + c * 162}" y="${62 + r * 56}" fill="#fff" font-size="9">${d}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "p",
      text: "The everyday PC is **SISD**; a GPU/vector processor is **SIMD** (one instruction on many data); independent cores are **MIMD**; **MISD** is rare.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Flynn's taxonomy** is the must-know: **SISD** (normal PC), **SIMD** (one instruction, many data — GPU/vector), **MISD** (rare), **MIMD** (independent cores — multicore). When several CPUs cache the same data, a write by one must not leave others stale — that's **cache coherence** (e.g. MESI snooping).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **classify** a machine by Flynn's taxonomy (SIMD = vector/GPU, MIMD = multicore); (2) explain **cache coherence** and why it's needed; (3) **interconnection** structures (bus, crossbar, multistage).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) A GPU doing one op on a big array is which Flynn class?  (b) Multicore CPUs are which class?  (c) What problem arises when two cores cache the same variable?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **SIMD.**  (b) **MIMD.**  (c) **cache coherence** (stale copies).",
    },
  ],

  // ===================================================================
  // UNIT 3 — PROGRAMMING LANGUAGES & COMPUTER GRAPHICS (educational)
  // ===================================================================
  "language-design": [
    {
      kind: "p",
      text: "Why are there hundreds of programming languages instead of one? Because different problems suit different *ways of thinking*. A **programming paradigm** is exactly that — a mental model for telling a computer what to do. Knowing the four families lets you place any language instantly.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Sort these by their core style: **C** (do this, then this), **Java** (objects sending messages), **Lisp** (everything is a function), **Prolog** (state facts & rules, let it deduce). Four different paradigms — can you name them?",
    },
    {
      kind: "diagram",
      caption: "The four paradigms — how each tells the computer what to do.",
      svg: `<svg viewBox="0 0 384 116" role="img" aria-label="Programming paradigms">
        <g font-size="10" text-anchor="middle">
          ${([
            ["Imperative", "step-by-step (C)"],
            ["Object-Oriented", "objects (Java, C++)"],
            ["Functional", "math functions (Lisp)"],
            ["Logic", "rules & facts (Prolog)"],
          ] as [string, string][])
            .map((d, i) => `<rect x="${12 + i * 92}" y="30" width="84" height="48" rx="6" fill="var(--primary)" opacity="0.85"/><text x="${54 + i * 92}" y="52" fill="#fff" font-weight="700">${d[0]}</text><text x="${54 + i * 92}" y="68" fill="#fff" font-size="8">${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    { kind: "h", text: "From source code to running program" },
    {
      kind: "ul",
      items: [
        "**Syntax** = grammar (the *form*); **semantics** = meaning. A program can be perfectly grammatical yet meaningless — like ‘colourless green ideas sleep furiously’.",
        "**Binding time** — when a name's value/type/address is fixed: at **compile time (static**, faster) or **run time (dynamic**, more flexible).",
        "Source code is turned into runnable form by a **translator** (compiler/interpreter — detailed in Unit 8).",
      ],
    },
    {
      kind: "table",
      head: ["", "Compiler", "Interpreter"],
      rows: [
        ["Translates", "the whole program at once", "line by line as it runs"],
        ["Speed", "fast execution", "slower execution"],
        ["Errors", "reported after a full scan", "stops at the first error"],
        ["Example", "C, C++", "Python, classic BASIC"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Compiler = translate ahead of time (one fast executable); Interpreter = translate on the fly (flexible, easier to debug, slower).** Java does **both** — compile to bytecode, then interpret/JIT. Static binding is fixed at compile time; dynamic at run time.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **classify a language by paradigm** (Lisp = functional, Prolog = logic, C = imperative); (2) **static vs dynamic binding**; (3) **compiler vs interpreter** (speed, error reporting, examples); (4) syntax vs semantics.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Prolog belongs to which paradigm?  (b) Which translator stops at the first error?  (c) Java compiles to what intermediate form?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Logic.**  (b) **Interpreter.**  (c) **Bytecode.**",
    },
  ],

  "elementary-data-types": [
    {
      kind: "p",
      text: "When you declare `int x`, you're telling the compiler two things at once. Spotting what a **data type** really bundles is the key to this short but exam-friendly topic.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "`int` allows the values …−2, −1, 0, 1, 2… AND the operations + − × ÷. `bool` allows {true, false} AND and/or/not. So a data type is a bundle of **two** things — what are they?",
    },
    {
      kind: "p",
      text: "A **type = a set of values + the operations allowed on them.** That's why the compiler knows how to store the bits and what you may do with them.",
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
      kind: "callout",
      tone: "key",
      text: "**Scalar (primitive)** = one indivisible value (int, float, char, bool, enum, pointer). **Composite** = built from others (array = same type indexed; structure/record = mixed types; string; set). **Strong typing** forbids mixing types without conversion; **static** fixes types at compile time, **dynamic** at run time.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **classify** a type as scalar vs composite; (2) **strong/weak** and **static/dynamic** typing. ‘Array = homogeneous, structure = heterogeneous’ is the classic distinction.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) A type bundles which two things?  (b) Array vs structure — which holds mixed types?  (c) Is a pointer scalar or composite?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **values + operations.**  (b) **Structure** (heterogeneous).  (c) **Scalar.**",
    },
  ],

  "programming-c": [
    {
      kind: "p",
      text: "**C** is the classic systems language — small, fast, close to the hardware. Exams hammer two things: **pointers**, and **tracing the output** of tricky loops & `printf`s. We'll nail both, and you'll trace before I reveal.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "`int x = 10;` lives at memory address 200. If `p = &x`, what value does **p** hold? And what does **\\*p** give you?",
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
      kind: "p",
      text: "**p = 200** (the *address of* x), and **\\*p = 10** (*dereference* — the value p points to). Two operators to keep straight: **&** = ‘address of’, **\\*** = ‘value at’.",
    },
    {
      kind: "ul",
      items: [
        "**Arrays & pointers** are linked: the array name is the address of its first element, and `a[i]` ≡ `*(a + i)`.",
        "**Storage classes** set lifetime & visibility: `auto`, `static`, `register`, `extern`.",
        "**Format specifiers** in printf/scanf: `%d` int, `%f` float, `%c` char, `%s` string, `%x` hex, `%u` unsigned.",
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "Trace it like the examiner will",
      text: "`for (i = 0; i < 5; i++) sum += i;` — walk it: i = 0,1,2,3,4 (stops when i = 5), so sum = 0+1+2+3+4 = **10**. Read **every** part: the start, the `<` vs `<=` bound, and `i++` vs `++i`. One off-by-one flips the answer.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Where marks vanish",
      text: "**Integer division truncates:** `5/2 == 2`. A **wrong format specifier** (`%d` for a float) prints garbage. Watch **loop bounds** (`<` vs `<=`) and **precedence** in expressions. `++i` vs `i++` differs when the value is *used* in the same statement.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**&x = address of x; \\*p = value p points to.** `a[i]` is just `*(a+i)`. Integer division throws away the remainder. Match the **format specifier** to the type, exactly.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **trace a for-loop and give the output** (the most common C item); (2) predict **pointer/array** expressions; (3) pick the right **format specifier**; (4) **storage class** scope/lifetime; (5) `++i` vs `i++`. Read the code character by character — these are pure attention tests.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) What does `&x` give?  (b) `7/2` in C equals?  (c) Format specifier for a float?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) the **address** of x.  (b) **3** (integer division).  (c) **%f.**",
    },
  ],

  "oop": [
    {
      kind: "p",
      text: "**Object-Oriented Programming** organises code around **objects** — bundles of *data* (attributes) and *behaviour* (methods) — instead of loose functions. A **class** is the blueprint; an **object** is a built instance.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A **class** is the *cookie cutter*; **objects** are the *cookies*. One `Car` class stamps out thousands of car objects, each with its own colour and speed.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "OOP rests on **four pillars**. One *hides data* behind a clean interface; one *hides complexity*; one lets a class *reuse* a parent; one lets *one method name behave differently* per object. Name all four.",
    },
    {
      kind: "diagram",
      caption: "The four pillars every OOP question is built on.",
      svg: `<svg viewBox="0 0 384 110" role="img" aria-label="Four pillars of OOP">
        <g font-size="9.5" text-anchor="middle">
          ${([
            ["Encapsulation", "bundle + hide data"],
            ["Abstraction", "show only essentials"],
            ["Inheritance", "reuse from a parent"],
            ["Polymorphism", "one name, many forms"],
          ] as [string, string][])
            .map((d, i) => `<rect x="${10 + i * 93}" y="26" width="86" height="56" rx="6" fill="var(--primary)" opacity="${0.6 + i * 0.1}"/><text x="${53 + i * 93}" y="50" fill="#fff" font-weight="700" font-size="10">${d[0]}</text><text x="${53 + i * 93}" y="66" fill="#fff" font-size="8">${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "table",
      head: ["Pillar", "Plain meaning"],
      rows: [
        ["Encapsulation", "keep data + methods together and hide internals (private fields, public methods)"],
        ["Abstraction", "expose what an object does, hide how (interface vs implementation)"],
        ["Inheritance", "a child class reuses & extends a parent (an ‘is-a’ relationship)"],
        ["Polymorphism", "the same call behaves differently per object (overloading / overriding)"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Memorise: **Encapsulation, Abstraction, Inheritance, Polymorphism.** Encapsulation *hides data*; abstraction *hides complexity*; inheritance *reuses* (‘is-a’); polymorphism *adapts behaviour* (overloading = compile-time, overriding = run-time).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **name the pillar** shown by an example; (2) class vs object; (3) match feature ↔ pillar (data hiding = encapsulation, ‘is-a’ = inheritance, overriding = polymorphism).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which pillar = data hiding?  (b) ‘A Dog is-a Animal’ uses which pillar?  (c) Class vs object — which is the blueprint?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Encapsulation.**  (b) **Inheritance.**  (c) the **class.**",
    },
  ],
  "programming-cpp": [
    {
      kind: "p",
      text: "**C++** is C *plus* object orientation. On top of everything in C, it adds classes and special member functions that run **automatically** — and the exam favourites are **constructors** and **destructors**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "There's a special member function that has the **same name as the class**, takes **no return type** (not even void), and runs **the instant an object is created** — to set it up. What is it called, and what's its cleanup counterpart that runs when the object dies?",
    },
    {
      kind: "p",
      text: "The **constructor** (born → set up) and the **destructor** (`~ClassName()`, dies → clean up). They run automatically — you never call them by hand.",
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
        "**Constructor:** class's name, **no return type**, auto-runs on creation. Can be **overloaded** (default, parameterised, **copy** — takes a reference to the same class).",
        "**Overloading** = same name, different parameters (**compile-time** polymorphism). **Virtual functions** = **run-time** polymorphism via overriding.",
        "**Templates** write type-independent code; **inheritance** can be single, multiple, multilevel or hierarchical.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "The traps examiners bait",
      text: "A constructor has **NO return type** — writing one makes it an ordinary function, not a constructor. **Multiple inheritance** can duplicate a grandparent's members (the **diamond problem**), fixed with **virtual base classes**. Only **virtual** functions give run-time polymorphism. The **scope-resolution operator `::`** (and `.`, `?:`, `sizeof`) **cannot be overloaded**.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Constructor: class name, no return type, auto-invoked, overloadable.** Objects are constructed in declaration order and **destroyed in reverse** order. Overloading = compile-time; virtual overriding = run-time polymorphism.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) predict **constructor/destructor call order** (reverse for destructors); (2) identify a **valid constructor** signature; (3) **overloading (compile-time) vs virtual overriding (run-time)**; (4) which operators **can't** be overloaded (`::`, `.`, `?:`, `sizeof`); (5) the diamond problem & virtual base classes.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Return type of a constructor?  (b) Run-time polymorphism needs which keyword?  (c) Can `::` be overloaded?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **none** (not even void).  (b) **virtual.**  (c) **No.**",
    },
  ],

  "web-programming": [
    {
      kind: "p",
      text: "The web is a giant **client–server conversation**: your **browser (client)** asks for a page, a **server** sends it back. Web programming is the set of languages that build and power that exchange.",
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
      kind: "callout",
      tone: "try",
      text: "**HTML** and **XML** both use angle-bracket tags. But one is for *showing* a page and the other for *carrying* data with custom tags. Which does which — and does an **applet** run on the client or the server?",
    },
    {
      kind: "ul",
      items: [
        "**HTML** structures content for **display**; **DHTML** = HTML + CSS + JavaScript for interactivity; **CSS** styles it.",
        "**XML** *describes/carries* data with custom tags — it doesn't display anything (and it's case-sensitive & must be well-formed).",
        "**Client-side** scripting (JavaScript, applets) runs in the **browser**; **server-side** (servlets, JSP, PHP) runs on the **server**.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**HTML displays data; XML describes data.** **Applet = client-side (in the browser); Servlet = server-side.** JavaScript runs client-side; JSP/PHP run server-side.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **HTML tags & structure**; (2) **HTML vs XML** (display vs describe; XML well-formed/case-sensitive); (3) **client-side vs server-side** (applet vs servlet, JavaScript vs JSP/PHP).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which carries data with custom tags — HTML or XML?  (b) A servlet runs where?  (c) Is JavaScript client- or server-side?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **XML.**  (b) on the **server.**  (c) **client-side.**",
    },
  ],

  "computer-graphics": [
    {
      kind: "p",
      text: "Computer graphics turns numbers into pictures on a screen made of tiny dots — **pixels**. Two questions drive the topic: how the **display** draws, and how **algorithms** decide which pixels to light for a line or circle.",
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
      kind: "callout",
      tone: "try",
      text: "You want to draw a slanted straight line on a grid of square pixels. Since you can only light whole pixels, what will a diagonal line actually look like up close — and what's that effect called?",
    },
    {
      kind: "diagram",
      caption: "A line on a pixel grid: the algorithm picks the nearest pixels — a tiny ‘staircase’ (aliasing).",
      svg: `<svg viewBox="0 0 384 120" role="img" aria-label="Raster line staircase">
        <g>
          ${[0, 1, 2, 3, 4, 5, 6, 7]
            .map((c) => [0, 1, 2, 3].map((r) => `<rect x="${40 + c * 30}" y="${20 + r * 22}" width="30" height="22" fill="none" stroke="var(--border)"/>`).join(""))
            .join("")}
          ${([[0, 3], [1, 3], [2, 2], [3, 2], [4, 1], [5, 1], [6, 0], [7, 0]] as [number, number][])
            .map(([c, r]) => `<rect x="${41 + c * 30}" y="${21 + r * 22}" width="28" height="20" fill="var(--primary)" opacity="0.8"/>`)
            .join("")}
          <line x1="40" y1="108" x2="280" y2="20" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="4 3"/>
        </g>
      </svg>`,
    },
    {
      kind: "p",
      text: "A **staircase** (aliasing). The line-drawing algorithm picks the nearest pixel for each step; smoothing it out is *anti-aliasing*.",
    },
    {
      kind: "ul",
      items: [
        "**Line drawing:** **DDA** uses floating-point steps (simpler, slower); **Bresenham** uses only **integer** add/subtract (faster, no rounding) — the preferred algorithm.",
        "**Circles:** the **midpoint circle** algorithm (8-way symmetry).",
        "**Filling:** **scan-line** polygon fill, plus **boundary-fill** and **flood-fill** (fill outward from a seed point).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Raster = pixels in a frame buffer; vector = line commands.** For lines, **Bresenham beats DDA** by using pure integer arithmetic (no floats, no rounding).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **DDA vs Bresenham** (integer vs float); (2) **raster vs random** scan (frame buffer vs display list); (3) **boundary-fill vs flood-fill**. ‘Bresenham uses integer arithmetic’ recurs.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which line algorithm avoids floating point?  (b) Raster image is stored in the…?  (c) The staircase effect is called?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Bresenham.**  (b) **frame buffer.**  (c) **aliasing.**",
    },
  ],


  "graphics-3d": [
    {
      kind: "p",
      text: "3-D graphics takes objects defined in three dimensions and works out how to show them on a flat 2-D screen — through **projection** — while deciding what's hidden behind what.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Two ways to flatten a 3-D scene onto a screen: one keeps far objects the **same size** as near ones (good for engineering drawings); the other makes far objects **shrink** toward a point (like a photo, like railway tracks meeting at the horizon). Which is which — and which has a *vanishing point*?",
    },
    {
      kind: "diagram",
      caption: "Parallel projection keeps rays parallel; perspective converges them to the eye (far objects shrink).",
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
      kind: "p",
      text: "**Parallel** keeps sizes true (engineering/CAD). **Perspective** converges to a viewpoint, giving a **vanishing point** and realistic foreshortening (photos, games).",
    },
    {
      kind: "ul",
      items: [
        "**Curves & surfaces:** **Bezier** and **B-spline** curves are shaped by control points; a Bezier curve passes through its **first and last** control points, stays inside their **convex hull**, and has degree = (control points − 1).",
        "**Hidden-surface removal:** the **Z-buffer (depth buffer)** keeps the nearest pixel; **back-face culling** drops faces pointing away.",
        "**Illumination** (ambient, diffuse, specular) + shading (Gouraud, Phong) make surfaces look lit.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Parallel preserves size; perspective adds a vanishing point & depth.** For ‘what's visible’, the **Z-buffer** compares depths pixel-by-pixel — the simplest and most common hidden-surface method.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **parallel vs perspective** (vanishing point, foreshortening); (2) **Bezier curve** properties (endpoints, convex hull, degree = control points − 1); (3) hidden-surface methods (**Z-buffer**, back-face culling).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which projection has a vanishing point?  (b) A Bezier curve passes through which control points?  (c) Simplest hidden-surface method?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Perspective.**  (b) the **first and last.**  (c) **Z-buffer.**",
    },
  ],


  // ---------------------------------------------------------------------- DBMS
  // ===================================================================
  // UNIT 4 — DATABASE MANAGEMENT SYSTEMS (educational, beginner→advanced)
  // ===================================================================
  "db-concepts-architecture": [
    {
      kind: "p",
      text: "A **DBMS** is software that stores data in an organised way and lets many users query and update it **safely and at once**. Versus loose files, it gives controlled redundancy, consistency, security and concurrency. Its big design idea is splitting the database into **three levels**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "A company changes how its data is physically stored on disk (new indexes, new file layout) for speed. Should every application that uses the database have to be **rewritten** because of this? What architectural idea would let storage change *without* breaking the apps above it?",
    },
    {
      kind: "p",
      text: "No — that's the whole point of **data independence**, delivered by the **three-schema (ANSI/SPARC) architecture**: separating *what data means* from *how it's stored* so each can change without disturbing the other.",
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
        "**External / View level** — what each user or app sees (custom slices).",
        "**Conceptual / Logical level** — the whole DB's structure: entities, relationships, constraints.",
        "**Internal / Physical level** — how bytes, files and indexes are actually stored.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**Physical** data independence = change storage without touching the logical schema (easy). **Logical** data independence = change the conceptual schema without touching views (harder). Also lock in: **degree = number of attributes (columns), cardinality = number of tuples (rows).**",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **match level ↔ description**; (2) define the **two data independences** (logical is the tougher one); (3) **degree vs cardinality**; (4) DBMS advantages over file systems.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which independence is harder to achieve?  (b) Degree of a relation = ?  (c) Which level does a single user's customised view live at?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Logical** data independence.  (b) the **number of attributes**.  (c) the **external / view** level.",
    },
  ],

  "data-modeling": [
    {
      kind: "p",
      text: "Before building a single table, you decide *what* to store and *how things relate*. **Data modelling** is that planning step — and it flows through three stages, each refining the last.",
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
      text: "The flow is **ER diagram → tables (relational model) → queries**. The sub-topics below follow exactly that path — **ER Diagram → Relational Model → Keys → Codd's rules** for a ‘truly relational’ system. Start with the ER diagram.",
    },
  ],

  "er-model": [
    {
      kind: "p",
      text: "An **Entity–Relationship (ER) diagram** is a *picture* of the data — the **things** you store, their **details**, and how they **connect** — drawn before any table exists. It's the architect's blueprint.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "ER diagrams use three core shapes: one for a **thing** (Student), one for a **detail** (roll_no), one for a **link** (enrolls). Guess which shape is which: rectangle, ellipse, diamond?",
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
        "**Weak entity** (double rectangle) — no key of its own; identified via an owner + a partial key.",
        "**Attributes** — key (underlined), composite, multivalued (double ellipse), derived (dashed).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Converting ER → tables: an **M:N relationship ALWAYS becomes its own table** (holding both keys as foreign keys); a **multivalued attribute** also becomes a separate table; a 1:N usually folds the ‘1’ side's key into the ‘N’ side. The M:N → separate table rule is the classic trap.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **match symbol ↔ meaning**; (2) **weak vs strong** entity, cardinality, participation; (3) the **minimum number of tables** for an ER diagram (count M:N relationships & multivalued attributes).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which symbol is a relationship?  (b) An M:N relationship needs how many tables of its own?  (c) A weak entity is drawn how?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) the **diamond**.  (b) **one** (its own table with both foreign keys).  (c) a **double rectangle**.",
    },
  ],

  "relational-model": [
    {
      kind: "p",
      text: "The **relational model** stores data in **relations** — plain tables of **rows (tuples)** over **columns (attributes)**. Its power is a tiny algebra that combines tables to answer any query.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Two fundamental operations: one keeps certain **rows** (e.g. ‘students with marks > 60’), the other keeps certain **columns** (e.g. ‘just the name and roll_no’). One is **σ (select)**, the other **π (project)** — which is which?",
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
        ["Select", "σ", "keep ROWS that match a condition"],
        ["Project", "π", "keep chosen COLUMNS (drops duplicates)"],
        ["Union / Minus / Intersect", "∪ − ∩", "set operations (union-compatible tables)"],
        ["Cartesian product", "×", "every row of A paired with every row of B"],
        ["Join", "⋈", "combine related rows across tables"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**σ filters rows, π filters columns** — never swap them, and **π removes duplicate rows** (σ doesn't). **Integrity:** *entity integrity* = a primary key can't be NULL; *referential integrity* = a foreign key must match an existing primary-key value (or be NULL). Relational **algebra is procedural**; **calculus is declarative**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **evaluate** an algebra expression's output; (2) **σ (rows) vs π (columns)**; (3) join types (natural/theta/outer); (4) **entity vs referential** integrity. ‘Project removes duplicates’ is a favourite.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which operator picks columns?  (b) Which one removes duplicates?  (c) A primary key can't be what (entity integrity)?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **π (project)**.  (b) **π (project)**.  (c) **NULL**.",
    },
  ],
  "dbms-keys": [
    {
      kind: "p",
      text: "A **key** is an attribute (or set of attributes) that **uniquely identifies a row** — how a database avoids duplicates and links tables. NET loves making you *count* candidate keys or classify a given attribute set, so we'll build the idea precisely.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "{roll_no} identifies a student uniquely. So does {roll_no, name} and {roll_no, name, city}. All three are ‘super keys’. But only one of them is **minimal** — you can't drop any attribute and still be unique. Which one, and what do we call that minimal version?",
    },
    {
      kind: "p",
      text: "{roll_no} alone — a **candidate key** (a *minimal* super key). The bulkier ones are still **super keys**, just not minimal. The designer then picks one candidate key as the **primary key**.",
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
        ["Super key", "ANY set that uniquely identifies a row (may have extras)"],
        ["Candidate key", "a MINIMAL super key — drop any attribute and it stops being unique"],
        ["Primary key", "the candidate key the designer picks; can't be NULL or repeat"],
        ["Alternate key", "a candidate key NOT chosen as the primary key"],
        ["Foreign key", "an attribute referencing another table's primary key (the link)"],
      ],
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "A **super key** is *any* ID that works — your full name + address + phone definitely identifies you, but it's bulky. The **candidate key** is the *smallest* ID that still works (your Aadhaar number). The **primary key** is the one the office officially stamps on your file.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "Containment: **Primary ⊆ Candidate ⊆ Super.** To find candidate keys, compute an attribute set's **closure** under the FDs: if X⁺ = all attributes and no smaller subset does, X is a candidate key. **Attributes that never appear on the RIGHT of any FD must be in every candidate key.**",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) ‘an **alternate key** is also called ___’ → candidate key; (2) given R(A,B,C,D) + FDs, **count the candidate keys** or pick which sets are super keys; (3) super vs candidate vs primary. Master **attribute closure** — it answers keys *and* normalization.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) A minimal super key is called?  (b) Can a primary key be NULL?  (c) An attribute never on the right side of any FD must be in every…?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) a **candidate key**.  (b) **No**.  (c) **candidate key**.",
    },
  ],

  "codd-rules": [
    {
      kind: "p",
      text: "**E. F. Codd** invented the relational model and listed **12 rules** (numbered 0–12) a system must meet to be called *truly relational*. You don't memorise all twelve — you grasp the spirit and a few famous ones.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "If a system claims to be ‘relational’, what's the most basic thing ALL of its data — even the metadata describing the tables — should be stored as? (Codd's most fundamental rule.)",
    },
    {
      kind: "p",
      text: "**Everything as tables (relations)** — that's the **Information rule**, the heart of it. Even the catalog/metadata is itself in tables.",
    },
    {
      kind: "ul",
      items: [
        "**Rule 0 (Foundation):** manage the database entirely through relational capabilities.",
        "**Information rule:** all data — including metadata — is represented as **tables** only.",
        "**Guaranteed access:** every value is reachable by *table + primary key + column*.",
        "**Systematic NULL handling:** NULLs uniformly mean ‘missing/unknown’, independent of type.",
        "**Physical & logical data independence:** apps survive storage (and, where possible, schema) changes.",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "The essence: **everything is a table, reachable by key, and the database is independent of how it's physically stored.** No commercial DBMS satisfies *all* 12 perfectly.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) there are **12 rules (0–12)**; (2) the **Information rule** = all data in tables; (3) match a described rule to its name; (4) Codd defined the relational model.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) How many Codd rules?  (b) The Information rule says data is stored as?  (c) Who proposed the relational model?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **12** (rules 0–12).  (b) **tables (relations)**.  (c) **E. F. Codd**.",
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
        ["TCL (Transaction)", "COMMIT, ROLLBACK, SAVEPOINT", "make permanent / undo"],
      ],
    },
    {
      kind: "callout",
      tone: "try",
      text: "You write `SELECT` first, but the database can't pick columns before it knows which **table** and which **rows**. So which clause does it logically evaluate **first** — SELECT, FROM, or WHERE? Order the six: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY.",
    },
    {
      kind: "diagram",
      caption: "A query is logically evaluated in THIS order — not the order you write it.",
      svg: `<svg viewBox="0 0 384 86" role="img" aria-label="SQL logical query order">
        <g font-size="9.5" text-anchor="middle">
          ${["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"]
            .map((s, i) => `<rect x="${6 + i * 63}" y="30" width="56" height="26" rx="5" fill="var(--primary)" opacity="${0.5 + i * 0.08}"/><text x="${34 + i * 63}" y="47" fill="#fff" font-size="8.5">${s}</text>${i < 5 ? `<text x="${64 + i * 63}" y="47" fill="var(--muted)">›</text>` : ""}`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "callout",
      tone: "key",
      text: "Logical order: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.** **WHERE** filters rows *before* grouping; **HAVING** filters groups *after* (used with aggregates). Aggregates (COUNT/SUM/AVG…) mostly **ignore NULLs**. **DELETE** (DML, rollback-able) ≠ **TRUNCATE** (DDL, fast empty) ≠ **DROP** (removes the table).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **predict a query's result**; (2) **WHERE vs HAVING** (rows before grouping vs groups after); (3) **classify a command** (DDL/DML/DCL/TCL); (4) **DELETE vs TRUNCATE vs DROP**. NULL handling in aggregates is a trap.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) WHERE or HAVING filters groups after aggregation?  (b) Is TRUNCATE DDL or DML?  (c) Which clause is evaluated first?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **HAVING**.  (b) **DDL**.  (c) **FROM**.",
    },
  ],

  "normalization-db": [
    {
      kind: "p",
      text: "This part of the syllabus bundles two big ideas that keep a database **correct under change**: **normalization** (table design with no redundancy) and **transaction control** (consistency when many users act at once).",
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
      text: "Storing a student's department-head name in *every* enrollment row is like writing your home address on every page of a notebook — change it once and you must fix it everywhere, or risk contradictions. Normalization splits data so each fact is stored **once**.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "A table's key is {student, course}, but the attribute ‘student_name’ depends on **student alone** — only *part* of the key. Which normal-form rule does that violate? (Hint: it's about *partial* dependency.)",
    },
    {
      kind: "p",
      text: "It violates **2NF** (no non-key attribute may depend on *part* of a composite key). Climbing the ladder removes one more kind of bad dependency at each step:",
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
        ["1NF", "atomic values only — no repeating groups/arrays in a cell"],
        ["2NF", "1NF + no partial dependency (non-key attr on PART of a key)"],
        ["3NF", "2NF + no transitive dependency (non-key → non-key)"],
        ["BCNF", "for every FD X → Y, X is a super key (stricter than 3NF)"],
        ["4NF", "BCNF + no non-trivial multivalued dependency"],
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "A **prime attribute** is part of some candidate key; 2NF/3NF talk about *non-prime* attributes. Strictness: **BCNF ⊃ 3NF ⊃ 2NF ⊃ 1NF.** 3NF is always achievable while staying *dependency-preserving & lossless*; BCNF sometimes sacrifices dependency preservation.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) given FDs, find the **highest normal form** a relation satisfies; (2) name the **violating dependency**; (3) **decompose** losslessly. Decision tree: *partial dependency → fails 2NF; transitive → fails 3NF; non-super-key determinant → fails BCNF.*",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Partial dependency violates which NF?  (b) Transitive dependency violates which?  (c) Which is stricter, 3NF or BCNF?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **2NF**.  (b) **3NF**.  (c) **BCNF**.",
    },
  ],
  "dbms-serializability": [
    {
      kind: "p",
      text: "When many **transactions** run at once, their steps interleave. A **schedule** is one such interleaving. The question that defines this topic: did the interleaving keep the database **correct**? The gold standard is **serializability**.",
    },
    {
      kind: "callout",
      tone: "analogy",
      text: "Two people editing the same shared document at once can overwrite each other's changes. A schedule is *serializable* if the messy interleaving produces the **same result as if they'd taken turns** — one fully, then the other.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Two operations from different transactions touch data. When do they actually **conflict** (so their order matters)? Does Read–Read conflict? Read–Write? Write–Write? Work out the rule before reading.",
    },
    {
      kind: "p",
      text: "Two operations **conflict** when they're from **different transactions**, touch the **same data item**, and **at least one is a WRITE**. So Read–Read never conflicts; the other two do. Swapping *non-conflicting* operations changes nothing — which is exactly what lets us test serializability.",
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
      text: "**Conflict serializable ⟺ the precedence graph is ACYCLIC.** A topological sort then gives an equivalent serial order. **View serializability** is broader (every conflict-serializable schedule is view-serializable, not vice-versa).",
    },
    {
      kind: "p",
      text: "To *guarantee* serializable schedules at run time, DBMSs use **concurrency control** — most often **Two-Phase Locking (2PL)**: a growing phase (acquire locks) then a shrinking phase (release). **ACID** (Atomicity, Consistency, Isolation, Durability) is the overall promise; recovery restores it after crashes.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **draw the precedence graph** and decide conflict serializability (look for a cycle); (2) give the **equivalent serial order**; (3) **conflict vs view** serializability; (4) what a **conflict** is; (5) that **2PL guarantees conflict-serializable** schedules. Plus the ACID expansion.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) A schedule is conflict-serializable iff its precedence graph is…?  (b) Does Read–Read conflict?  (c) What does 2PL guarantee?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **acyclic**.  (b) **No**.  (c) **conflict-serializable** schedules.",
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
        ["Deductive", "facts + rules; derives new facts (Datalog)"],
        ["Object / Object-Relational", "objects, inheritance, complex types in the DB"],
        ["Distributed", "data spread across sites, queried as one"],
      ],
    },
    {
      kind: "callout",
      tone: "try",
      text: "A **distributed database** splits data across many sites but should *look like one database* to the user. To improve speed/reliability, would you rather (a) split a table by rows across sites, (b) split it by columns, or (c) keep copies of it on several sites — and what are these techniques called?",
    },
    {
      kind: "callout",
      tone: "key",
      text: "All three are used: **horizontal fragmentation** (split by rows), **vertical fragmentation** (split by columns), and **replication** (keep copies). A distributed DB aims for **transparency** (you don't see the split) and **reliability** (no single point of failure).",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **match model ↔ use case** (temporal = time-varying, deductive = facts+rules); (2) distributed-DB **transparency**; (3) **fragmentation** (horizontal = rows, vertical = columns) & replication trade-offs.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Splitting a table by rows across sites is called?  (b) Which model handles facts + rules?  (c) Distributed DB should look like how many databases to the user?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **horizontal fragmentation**.  (b) **deductive**.  (c) **one**.",
    },
  ],

  "data-warehousing-mining": [
    {
      kind: "p",
      text: "Day-to-day databases (**OLTP**) are tuned for many small transactions. To *analyse* mountains of history, we build a **data warehouse** and run **OLAP**. **Data mining** then digs patterns out of that data.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "An ATM withdrawal vs a year-end ‘which products sell best in winter across all stores?’ report. One is many tiny read/write transactions, the other is a few huge analytical reads. Which is **OLTP** and which is **OLAP**?",
    },
    {
      kind: "table",
      head: ["", "OLTP", "OLAP"],
      rows: [
        ["Purpose", "run the business (operational)", "analyse it (decisions)"],
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
          ${([
            [40, 14, "Time"],
            [304, 14, "Product"],
            [40, 100, "Customer"],
            [304, 100, "Store"],
          ] as [number, number, string][])
            .map((d) => `<rect x="${d[0]}" y="${d[1]}" width="64" height="26" rx="4" fill="var(--primary-bg)" stroke="var(--primary)"/><text x="${d[0] + 32}" y="${d[1] + 17}" fill="var(--text)">${d[2]}</text>`)
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
        "**Data mining** tasks: **classification** (predict a label), **clustering** (group similar), **association rules** (market-basket — *support* & *confidence*, via Apriori), **regression** (predict a number).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "**OLTP runs the business; OLAP analyses it.** In a warehouse, the **fact table** holds numeric measures (sales, quantity) and **dimension tables** hold context (time, product, store) — the **star schema**. Classification = supervised; clustering = unsupervised.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **OLTP vs OLAP**; (2) **fact vs dimension** table; (3) the four **warehouse properties**; (4) association-rule **support/confidence**; (5) classification vs clustering (supervised vs unsupervised).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) A year-end sales report is OLTP or OLAP?  (b) Numeric measures sit in which table?  (c) Clustering is supervised or unsupervised?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **OLAP**.  (b) the **fact** table.  (c) **unsupervised**.",
    },
  ],

  "big-data": [
    {
      kind: "p",
      text: "When data is too **big, fast, or varied** for one machine and ordinary databases, it's **Big Data**. The answer is to spread storage and computation across **clusters** of cheap machines.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Big Data is famously described by a set of words starting with **V**. Three are about scale, speed and format of the data; a fourth is about whether you can *trust* it. Can you name the four V's?",
    },
    {
      kind: "diagram",
      caption: "Big Data is usually described by its V's.",
      svg: `<svg viewBox="0 0 384 96" role="img" aria-label="The V's of Big Data">
        <g font-size="10" text-anchor="middle">
          ${([
            ["Volume", "huge size"],
            ["Velocity", "high speed"],
            ["Variety", "many formats"],
            ["Veracity", "trust/quality"],
          ] as [string, string][])
            .map((d, i) => `<circle cx="${56 + i * 92}" cy="40" r="30" fill="var(--primary)" opacity="${0.6 + i * 0.1}"/><text x="${56 + i * 92}" y="40" fill="#fff" font-weight="700" font-size="10">${d[0]}</text><text x="${56 + i * 92}" y="84" fill="var(--muted)" font-size="8.5">${d[1]}</text>`)
            .join("")}
        </g>
      </svg>`,
    },
    {
      kind: "ul",
      items: [
        "**HDFS (Hadoop Distributed File System)** stores files in blocks across many nodes; a **NameNode** tracks where everything is (metadata), **DataNodes** hold the blocks.",
        "**MapReduce** processes data in two phases: **Map** (transform each chunk in parallel) then **Reduce** (combine the results).",
      ],
    },
    {
      kind: "callout",
      tone: "key",
      text: "Remember the **V's (Volume, Velocity, Variety, Veracity)** and the **Map → Reduce** pattern (split & process in parallel, then aggregate). **HDFS NameNode = the index (metadata); DataNodes = the storage.**",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) list the **V's**; (2) **MapReduce** phases; (3) HDFS components (NameNode vs DataNode). ‘NameNode stores metadata, not data’ is a common one-liner.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Which V is about trust?  (b) Which HDFS node stores the actual data blocks?  (c) Which MapReduce phase aggregates results?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Veracity**.  (b) **DataNode**.  (c) **Reduce**.",
    },
  ],

  "nosql": [
    {
      kind: "p",
      text: "**NoSQL** (‘Not Only SQL’) databases drop the rigid table model to gain **massive scale and flexible schemas** — ideal for web-scale, rapidly changing data. They come in four main shapes.",
    },
    {
      kind: "table",
      head: ["Type", "Stores data as", "Example"],
      rows: [
        ["Key-Value", "a big dictionary (key → value)", "Redis"],
        ["Document", "JSON-like documents", "MongoDB"],
        ["Column-family", "columns grouped by family", "Cassandra"],
        ["Graph", "nodes + edges", "Neo4j"],
      ],
    },
    {
      kind: "callout",
      tone: "try",
      text: "A distributed store wants three things: every read sees the latest write (**Consistency**), it always responds (**Availability**), and it keeps working when the network splits (**Partition-tolerance**). The CAP theorem says you can fully guarantee at most **how many** of these three at once?",
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
      text: "Four NoSQL families: **Key-Value, Document, Column-family, Graph.** The **CAP theorem** says a distributed store guarantees only **two of Consistency, Availability, Partition-tolerance** — and since network partitions *do* happen, it's really **C vs A**.",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **match NoSQL type ↔ example** (MongoDB = document, Cassandra = column, Neo4j = graph, Redis = key-value); (2) **CAP theorem** (at most 2 of C/A/P); (3) NoSQL vs RDBMS (scale & flexibility vs strict ACID).",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) CAP lets you guarantee at most how many properties?  (b) MongoDB is which NoSQL type?  (c) Neo4j is which type?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **two**.  (b) **document**.  (c) **graph**.",
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
      text: "Take a set and **one** operation (like + or ×). How well-behaved is it? Group theory answers that with a short **ladder** of names — each rung adds one rule. Climb it and you understand the whole topic.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "Check the integers under addition, (ℤ, +). Is the sum of two integers always an integer? Is there a ‘do-nothing’ element? Does every integer have something that cancels it back to that element? Hold your answers.",
    },
    {
      kind: "p",
      text: "Yes to all: addition stays in ℤ (**closure**), 0 changes nothing (**identity**), and −a cancels a (**inverse**) — plus it's associative and order-free. Those properties, stacked, define the ladder:",
    },
    {
      kind: "diagram",
      caption: "Each rung adds one axiom; reach all four plus commutativity and you have an Abelian group.",
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
        "**Closure** — a ∗ b is always back inside the set.",
        "**Associativity** — (a ∗ b) ∗ c = a ∗ (b ∗ c).",
        "**Identity** — an e with a ∗ e = e ∗ a = a.",
        "**Inverse** — each a has an a⁻¹ with a ∗ a⁻¹ = e.",
      ],
    },
    {
      kind: "callout",
      tone: "try",
      text: "Now (ℤ, ×) — integers under multiplication. Identity is 1. But does **2** have an inverse *inside the integers* (an integer you multiply by 2 to get 1)? What rung does this stop at?",
    },
    {
      kind: "p",
      text: "No — 2's inverse would be ½, not an integer. So (ℤ, ×) has closure, associativity and identity but **no inverses** — it stops at **monoid**. (ℤ, +) had inverses *and* commutativity, so it's an **Abelian group**.",
    },
    {
      kind: "callout",
      tone: "key",
      text: "The ladder: **Semigroup → (add identity) Monoid → (add inverse) Group → (add commutativity) Abelian group.** Handy facts: identity & inverses are **unique**, and **(a ∗ b)⁻¹ = b⁻¹ ∗ a⁻¹** (reverse the order). **Rings/fields** just add a *second* operation on top of a group.",
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Don't over-assume",
      text: "A **group does NOT require commutativity** — only an *Abelian* group does. (Matrix multiplication forms groups that aren't Abelian.)",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: given a set + operation (often a **Cayley table** or **modular arithmetic** like (ℤₙ, +)), decide if it's a **semigroup / monoid / group / Abelian group**, find the **identity** and an **inverse**, and simplify with **(ab)⁻¹ = b⁻¹a⁻¹**. ‘Is this structure a group?’ checking the four axioms is the staple.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Semigroup + identity = ?  (b) Is (ℤ, ×) a group?  (c) (ab)⁻¹ = ?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) **Monoid.**  (b) **No** — no inverses (it's a monoid).  (c) **b⁻¹a⁻¹.**",
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
      text: "To move or animate a shape, graphics software changes the coordinates of its points. The three building blocks are **translation** (slide), **scaling** (resize) and **rotation** (turn). One clever trick unifies all three.",
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
      kind: "callout",
      tone: "try",
      text: "Scaling and rotation are done by **multiplying** a point by a matrix. But translation is **adding** (x+tx, y+ty) — a different kind of operation. That's annoying: you can't combine an add and a multiply into one matrix. How could you make translation *also* look like a matrix multiply?",
    },
    {
      kind: "p",
      text: "Use **homogeneous coordinates** — write a 2-D point as **(x, y, 1)** with an extra ‘1’. Now translation becomes a 3×3 matrix multiply too, so *all three* transforms are multiplications and can be **combined into one matrix**.",
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
      text: "**Homogeneous coordinates (x, y, 1) exist so translation also fits matrix multiplication.** A chain of transforms = one product matrix — but order matters: **rotate-then-translate ≠ translate-then-rotate** (matrix multiplication isn't commutative). To rotate about a pivot: **translate pivot to origin → transform → translate back.**",
    },
    {
      kind: "callout",
      tone: "exam",
      title: "Exactly how NET asks this",
      text: "Expect: (1) **match transform ↔ matrix**; (2) **apply** a transform to a given point; (3) **order** a composite-transform sequence; (4) *why* homogeneous coordinates are needed (to express **translation** as a multiply). Transform order is not commutative — a frequent trap.",
    },
    {
      kind: "callout",
      tone: "try",
      text: "**Cover & answer.**  (a) Why add a ‘1’ to make (x, y, 1)?  (b) Is rotate-then-translate the same as translate-then-rotate?  (c) Which transform is naturally addition, not multiplication?",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Answers",
      text: "(a) so **translation** becomes a matrix multiply (homogeneous coords).  (b) **No** (not commutative).  (c) **Translation.**",
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
