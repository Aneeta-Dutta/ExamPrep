// The official UGC NET Paper 2 — Subject 87 (Computer Science & Applications)
// syllabus, transcribed from the UGC NET Bureau syllabus document and encoded as
// a navigable tree of 10 units → topics → sub-topics. Unit and topic headings
// match the official document; sub-topics are grouped under the relevant heading.
//
// Topic ids that match a key in `CONTENT` (./content) render authored study
// notes; the rest are valid syllabus nodes whose notes are still being written.

import type { Unit } from "./types";
import { CONTENT } from "./content";

export const SUBJECT = {
  code: "87",
  name: "Computer Science and Applications",
  paper: "Paper 2",
};

export const SYLLABUS: Unit[] = [
  {
    id: "discrete-structures-optimization",
    number: 1,
    title: "Discrete Structures and Optimization",
    summary: "Logic, sets & relations, counting, group theory, graphs, Boolean algebra and optimization.",
    topics: [
      {
        id: "math-logic",
        title: "Mathematical Logic",
        summary: "Propositional & predicate logic, equivalences, normal forms, quantifiers, rules of inference.",
        children: [
          { id: "prop-logic", title: "Propositional Logic", summary: "Propositions, connectives, truth tables, implication, tautologies." },
          { id: "logical-equivalences", title: "Propositional Equivalences", summary: "Laws of logic, equivalence proofs, De Morgan's laws." },
          { id: "normal-forms", title: "Normal Forms", summary: "CNF, DNF, PCNF/PDNF and minterms/maxterms." },
          { id: "predicates-quantifiers", title: "Predicates and Quantifiers", summary: "Predicates, universal ∀ and existential ∃ quantifiers." },
          { id: "nested-quantifiers", title: "Nested Quantifiers", summary: "Order of quantifiers, negating quantified statements." },
          { id: "rules-inference", title: "Rules of Inference", summary: "Modus ponens/tollens, validity, building arguments & proofs." },
        ],
      },
      { id: "sets-relations", title: "Sets and Relations", summary: "Set operations, properties of relations, equivalence relations, partial ordering." },
      { id: "counting-probability", title: "Counting, Induction & Discrete Probability", summary: "Counting, pigeonhole, permutations & combinations, inclusion–exclusion, induction, probability, Bayes' theorem." },
      { id: "discrete-groups", title: "Group Theory", summary: "Groups, subgroups, semigroups, isomorphism/homomorphism, rings, integral domains, fields." },
      { id: "graph-theory", title: "Graph Theory", summary: "Paths & circuits, Euler/Hamilton, planarity, colouring, bipartite, trees, spanning trees & cut-sets." },
      { id: "boolean-algebra", title: "Boolean Algebra", summary: "Boolean functions, representation and simplification." },
      { id: "optimization", title: "Optimization", summary: "LPP, simplex & dual simplex, integer programming, transportation/assignment, PERT-CPM." },
    ],
  },
  {
    id: "computer-system-architecture",
    number: 2,
    title: "Computer System Architecture",
    summary: "Digital logic, data representation, CPU organization, pipelining, I/O, memory hierarchy and multiprocessors.",
    topics: [
      { id: "digital-logic-circuits", title: "Digital Logic Circuits and Components", summary: "Logic gates, Boolean algebra, combinational & sequential circuits, flip-flops, decoders, multiplexers, registers, counters." },
      { id: "data-representation", title: "Data Representation", summary: "Number systems, complements, fixed/floating point, error-detection codes, computer arithmetic algorithms." },
      { id: "register-transfer", title: "Register Transfer and Microoperations", summary: "RTL, bus & memory transfers, arithmetic/logic/shift microoperations." },
      { id: "basic-computer-org", title: "Basic Computer Organization and Design", summary: "Instruction codes, registers, timing & control, instruction cycle, interrupts." },
      { id: "programming-basic-computer", title: "Programming the Basic Computer", summary: "Machine & assembly language, assembler, program loops, subroutines, I/O programming." },
      { id: "microprogrammed-control", title: "Microprogrammed Control", summary: "Control memory, address sequencing, design of control unit." },
      { id: "cpu", title: "Central Processing Unit", summary: "Register organization, stack organization, instruction formats, addressing modes, RISC vs CISC." },
      { id: "pipeline-vector", title: "Pipeline and Vector Processing", summary: "Parallel processing, arithmetic & instruction pipelines, vector & array processors." },
      { id: "io-organization", title: "Input-Output Organization", summary: "I/O interface, asynchronous transfer, modes of transfer, priority interrupt, DMA." },
      { id: "memory-hierarchy", title: "Memory Hierarchy", summary: "Main, auxiliary, associative, cache and virtual memory; memory-management hardware." },
      { id: "multiprocessors", title: "Multiprocessors", summary: "Interconnection structures, arbitration, cache coherence, multicore processors." },
    ],
  },
  {
    id: "programming-graphics",
    number: 3,
    title: "Programming Languages and Computer Graphics",
    summary: "Language design, C & C++/OOP, web programming, and 2D/3D computer graphics.",
    topics: [
      { id: "language-design", title: "Language Design and Translation Issues", summary: "Paradigms & models, binding times, syntax, stages in translation, formal transition models." },
      { id: "elementary-data-types", title: "Elementary Data Types", summary: "Properties of types & objects; scalar and composite data types." },
      { id: "programming-c", title: "Programming in C", summary: "Tokens, data types, control, arrays, structures, pointers, functions, file handling, preprocessors." },
      { id: "oop", title: "Object Oriented Programming", summary: "Class, object, instantiation, inheritance, encapsulation, abstract class, polymorphism." },
      { id: "programming-cpp", title: "Programming in C++", summary: "Functions, virtual functions, constructors & destructors, overloading, inheritance, templates, streams & files." },
      { id: "web-programming", title: "Web Programming", summary: "HTML, DHTML, XML, scripting, Java, servlets, applets." },
      { id: "computer-graphics", title: "Computer Graphics", summary: "Display devices, raster/random scan, line/circle/ellipse algorithms, polygon fill." },
      { id: "gfx-2d-transform", title: "2-D Geometrical Transforms and Viewing", summary: "Translation, scaling, rotation, reflection, shear; homogeneous coordinates; viewing pipeline & clipping." },
      { id: "graphics-3d", title: "3-D Object Representation, Transformations and Viewing", summary: "Polygon & quadric surfaces, Bezier & B-spline, illumination, projection & clipping." },
    ],
  },
  {
    id: "dbms",
    number: 4,
    title: "Database Management Systems",
    summary: "Data models, SQL, normalization & transactions, enhanced data models, warehousing/mining, Big Data and NoSQL.",
    topics: [
      { id: "db-concepts-architecture", title: "Database System Concepts and Architecture", summary: "Data models, schemas & instances, three-schema architecture, data independence, client/server." },
      {
        id: "data-modeling",
        title: "Data Modeling",
        summary: "ER diagram, relational model, algebra & calculus, Codd's rules.",
        children: [
          { id: "er-model", title: "Entity-Relationship Diagram", summary: "Entities, attributes, relationships, cardinality, weak entities." },
          { id: "relational-model", title: "Relational Model & Algebra/Calculus", summary: "Constraints, relational algebra, tuple & domain calculus." },
          { id: "dbms-keys", title: "Keys", summary: "Super, candidate, primary, alternate, foreign & composite keys." },
          { id: "codd-rules", title: "Codd's Rules" },
        ],
      },
      { id: "sql", title: "SQL", summary: "DDL/DML, constraints, queries, views, stored procedures, triggers, SQL injection." },
      {
        id: "normalization-db",
        title: "Normalization for Relational Databases",
        summary: "Functional dependencies, normalization, transaction processing, concurrency control, recovery, security.",
        children: [
          { id: "normalization", title: "Functional Dependencies & Normalization", summary: "FDs and 1NF–5NF, BCNF." },
          { id: "dbms-serializability", title: "Transactions, Concurrency & Serializability", summary: "Schedules, conflict/view serializability, precedence graph, locking, recovery." },
        ],
      },
      { id: "enhanced-data-models", title: "Enhanced Data Models", summary: "Temporal, multimedia, deductive, XML, mobile, GIS, distributed databases." },
      { id: "data-warehousing-mining", title: "Data Warehousing and Data Mining", summary: "OLAP vs OLTP, concept hierarchy, association rules, classification, clustering, SVM, KNN, HMM." },
      { id: "big-data", title: "Big Data Systems", summary: "Big Data characteristics & architecture, MapReduce, Hadoop, HDFS." },
      { id: "nosql", title: "NOSQL", summary: "NoSQL products, querying & managing, indexing & ordering, NoSQL in cloud." },
    ],
  },
  {
    id: "system-software-os",
    number: 5,
    title: "System Software and Operating System",
    summary: "System software plus operating-system process, memory, storage, file, security and distributed concepts.",
    topics: [
      { id: "system-software", title: "System Software", summary: "Machine/assembly/high-level languages, compilers & interpreters, loading/linking/relocation, macros, debuggers." },
      { id: "os-basics", title: "Basics of Operating Systems", summary: "OS structure, operations & services, system calls, design & implementation, system boot." },
      { id: "process-management", title: "Process Management", summary: "Scheduling & operations, IPC, synchronization, critical section, Peterson's solution, semaphores." },
      { id: "threads", title: "Threads", summary: "Multicore programming, multithreading models, thread libraries, threading issues." },
      { id: "cpu-scheduling", title: "CPU Scheduling", summary: "Scheduling criteria & algorithms, thread/multiprocessor/real-time scheduling." },
      { id: "deadlocks", title: "Deadlocks", summary: "Characterization, prevention, avoidance (Banker's), detection & recovery." },
      { id: "memory-management", title: "Memory Management", summary: "Contiguous allocation, paging, segmentation, demand paging, page replacement, thrashing." },
      {
        id: "storage-management",
        title: "Storage Management",
        summary: "Mass-storage & disk structure, scheduling, RAID.",
        children: [
          { id: "os-disk", title: "Disk Scheduling", summary: "FCFS, SSTF, SCAN, LOOK, C-SCAN, C-LOOK." },
          { id: "raid", title: "RAID Structure", summary: "RAID levels 0–6, mirroring, parity." },
        ],
      },
      { id: "file-io-systems", title: "File and Input/Output Systems", summary: "Access methods, directory & disk structure, allocation, free-space management, I/O subsystem." },
      { id: "os-security", title: "Security", summary: "Protection, access matrix, program/system/network threats, cryptography, authentication." },
      { id: "virtual-machines", title: "Virtual Machines", summary: "Types of VMs, virtualization." },
      { id: "linux-os", title: "Linux Operating Systems", summary: "Design principles, kernel modules, scheduling, memory, file systems, IPC." },
      { id: "windows-os", title: "Windows Operating Systems", summary: "Design principles, components, file system, networking." },
      { id: "distributed-systems", title: "Distributed Systems", summary: "Network-based OS, communication structure & protocols, distributed file systems." },
    ],
  },
  {
    id: "software-engineering",
    number: 6,
    title: "Software Engineering",
    summary: "Process models, requirements, design, quality, estimation, testing and configuration management.",
    topics: [
      { id: "process-models", title: "Software Process Models", summary: "Generic process model, prescriptive models, agile (XP, Scrum, FDD, Crystal), web engineering." },
      { id: "requirements", title: "Software Requirements", summary: "Functional & non-functional, use cases, analysis & modelling, SRS document." },
      { id: "software-design", title: "Software Design", summary: "Abstraction, modularity, information hiding, cohesion & coupling, OO/data/architectural/UI design." },
      { id: "software-quality", title: "Software Quality", summary: "McCall & ISO 9126 factors, QA/QC, risk (RMMM), software reliability." },
      { id: "estimation-scheduling", title: "Estimation and Scheduling of Software Projects", summary: "LOC & FP sizing, COCOMO, scheduling & staffing, time-line charts." },
      { id: "software-testing", title: "Software Testing", summary: "V&V; error/fault/bug/failure; unit/integration; black/white-box; basis path; alpha/beta; regression." },
      { id: "config-management", title: "Software Configuration Management", summary: "Change & version control, reuse, re-engineering, reverse engineering." },
    ],
  },
  {
    id: "data-structures-algorithms",
    number: 7,
    title: "Data Structures and Algorithms",
    summary: "Data structures, complexity & recurrences, design techniques, graph algorithms and complexity theory.",
    topics: [
      {
        id: "data-structures",
        title: "Data Structures",
        summary: "Arrays, stacks, queues, linked lists, trees (BST, AVL, B/B+/B*), graphs, hashing, sorting & searching.",
        children: [
          { id: "linear-structures", title: "Arrays, Stacks, Queues & Linked Lists", summary: "Sparse matrix, priority queues, list operations." },
          { id: "dsa-avl", title: "Binary Search & AVL Trees", summary: "Balance factor, rotations, height bound." },
          { id: "dsa-heap", title: "Heaps & Priority Queues", summary: "Min/max heap, array mapping, heap operations & heap sort." },
          { id: "btrees", title: "B / B+ / B* Trees", summary: "Multiway balanced search trees for disk-based storage." },
          { id: "hashing", title: "Hashing", summary: "Hash functions and collision resolution." },
          { id: "graphs-ds", title: "Graphs", summary: "Representations and graph data structures for sets." },
        ],
      },
      { id: "algo-performance", title: "Performance Analysis & Recurrences", summary: "Time & space complexity, asymptotic notation, recurrence relations." },
      { id: "design-techniques", title: "Design Techniques", summary: "Divide & conquer, dynamic programming, greedy, backtracking, branch & bound." },
      { id: "lower-bound-theory", title: "Lower Bound Theory", summary: "Comparison trees, lower bounds through reductions." },
      { id: "graph-algorithms", title: "Graph Algorithms", summary: "BFS, DFS, shortest paths, maximum flow, minimum spanning trees." },
      { id: "complexity-theory", title: "Complexity Theory", summary: "P and NP classes, NP-completeness and reducibility." },
      { id: "selected-topics", title: "Selected Topics", summary: "Number-theoretic algorithms, polynomial arithmetic, FFT, string matching." },
      { id: "advanced-algorithms", title: "Advanced Algorithms", summary: "Parallel, approximation and randomized algorithms." },
    ],
  },
  {
    id: "toc-compilers",
    number: 8,
    title: "Theory of Computation and Compilers",
    summary: "Automata & formal languages, Turing machines & undecidability, and the phases of a compiler.",
    topics: [
      { id: "toc-basics", title: "Theory of Computation", summary: "Formal language, non-computational problems, diagonal argument, Russell's paradox." },
      { id: "regular-languages", title: "Regular Language Models", summary: "DFA, NDFA, equivalence, regular grammars & expressions, pumping lemma, lexical analysis." },
      { id: "toc-cfg", title: "Context Free Language", summary: "PDA/NPDA, CFG, CNF & GNF, ambiguity, parse trees, FIRST & FOLLOW, properties of CFLs." },
      { id: "turing-machines", title: "Turing Machines (TM)", summary: "Standard & universal TM, Church-Turing thesis, RE & recursive languages, Chomsky hierarchy." },
      { id: "unsolvable-complexity", title: "Unsolvable Problems and Computational Complexity", summary: "Halting problem, PCP, tractable vs intractable problems." },
      { id: "syntax-analysis", title: "Syntax Analysis", summary: "Precedence & associativity, top-down & predictive (LL(1)), bottom-up (LR, LALR(1)) parsing." },
      { id: "semantic-analysis", title: "Semantic Analysis", summary: "Attribute grammars, SDD, S- & L-attributed definitions, dependency graph, type checking." },
      { id: "runtime-system", title: "Run Time System", summary: "Storage organization, activation tree & record, parameter passing, symbol table." },
      { id: "intermediate-code", title: "Intermediate Code Generation", summary: "Intermediate representations, translation of declarations, assignments, control flow." },
      { id: "code-optimization", title: "Code Generation and Code Optimization", summary: "Control/data-flow analysis, local/global/loop/peep-hole optimization, instruction scheduling." },
    ],
  },
  {
    id: "networks",
    number: 9,
    title: "Data Communication and Computer Networks",
    summary: "Transmission, network models & layers, IP/transport protocols, WWW, security, mobile and cloud/IoT.",
    topics: [
      { id: "data-communication", title: "Data Communication", summary: "Modes, analog/digital signals, bandwidth/throughput/latency, modulation, multiplexing, media, error handling." },
      { id: "computer-networks", title: "Computer Networks", summary: "Topologies, LAN, MAN, WAN, wireless networks, Internet." },
      { id: "net-osi", title: "Network Models (OSI & TCP/IP)", summary: "Layered architecture, OSI reference model & protocols, TCP/IP suite, addressing, switching." },
      {
        id: "osi-tcpip-functions",
        title: "Functions of OSI and TCP/IP Layers",
        summary: "Framing, error & flow control, multiple access, network devices, backbone, VLANs.",
        children: [
          { id: "error-control", title: "Error Detection & Correction", summary: "Parity, checksum, CRC, Hamming code." },
          { id: "net-flow-piggyback", title: "Flow & Error Control (Sliding Window, Piggybacking)", summary: "Stop-and-wait, sliding window, HDLC, piggybacking." },
          { id: "mac-layer", title: "Multiple Access", summary: "CSMA/CD, CSMA/CA, reservation, polling, token passing, FDMA/TDMA/CDMA." },
        ],
      },
      {
        id: "ip-transport",
        title: "IP Addressing & Transport Protocols",
        summary: "IPv4/IPv6, classful & classless addressing, ARP, routing, TCP/UDP/SCTP.",
        children: [
          { id: "network-layer", title: "IPv4/IPv6 Addressing & Routing", summary: "Address space, classful/classless, fragmentation, ARP, routing algorithms." },
          { id: "transport-layer", title: "TCP, UDP & SCTP", summary: "Flow, error & congestion control in TCP/SCTP." },
        ],
      },
      { id: "application-security", title: "WWW & Network Security", summary: "URL, DNS, email (SMTP/POP/IMAP), FTP/TELNET; malwares, cryptography, digital signature, VPN, firewalls." },
      { id: "mobile-technology", title: "Mobile Technology", summary: "GSM & CDMA, mobile computing, Mobile IP, satellites, MANETs, wireless LANs, GPRS & SMS." },
      { id: "cloud-iot", title: "Cloud Computing and IoT", summary: "SaaS/PaaS/IaaS, public/private cloud, virtualization, cloud storage, SLA, basics of IoT." },
    ],
  },
  {
    id: "artificial-intelligence",
    number: 10,
    title: "Artificial Intelligence (AI)",
    summary: "Search & game playing, knowledge representation, planning, NLP, fuzzy sets, genetic algorithms and neural networks.",
    topics: [
      { id: "ai-search", title: "Approaches to AI", summary: "Turing test & rational agents, state-space, heuristic search, game playing, min-max, alpha-beta cutoff." },
      {
        id: "knowledge-representation",
        title: "Knowledge Representation",
        summary: "Logic, semantic networks, frames, rules, scripts, conceptual dependency, ontologies, expert systems, uncertainty.",
        children: [
          { id: "expert-systems", title: "Expert Systems", summary: "Components, forward & backward chaining." },
          { id: "reasoning-uncertainty", title: "Handling Uncertainty", summary: "Bayesian reasoning and (intro to) fuzzy methods." },
        ],
      },
      { id: "planning", title: "Planning", summary: "Components of a planning system, linear & non-linear planning, goal-stack, STRIPS, partial-order planning." },
      { id: "ai-nlp", title: "Natural Language Processing", summary: "Grammar & language, parsing techniques, semantic analysis & pragmatics." },
      { id: "multi-agent", title: "Multi Agent Systems", summary: "Agents & objects, multiagent structure, semantic web, agent communication & ontologies." },
      { id: "fuzzy-sets", title: "Fuzzy Sets", summary: "Membership functions, fuzzification/defuzzification, fuzzy relations, rules & inference, fuzzy control." },
      { id: "genetic-algorithms", title: "Genetic Algorithms (GA)", summary: "Encoding, genetic operators, fitness functions, GA cycle, problem solving." },
      {
        id: "ann",
        title: "Artificial Neural Networks (ANN)",
        summary: "Supervised/unsupervised/reinforcement learning, perceptron, MLP, SOM, Hopfield network.",
        children: [
          { id: "machine-learning", title: "Supervised, Unsupervised & Reinforcement Learning", summary: "Learning paradigms, bias–variance, overfitting." },
          { id: "ai-ann", title: "Single & Multilayer Perceptron", summary: "Neuron model, feedforward, backpropagation." },
          { id: "ai-activation", title: "Activation Functions", summary: "Step, sigmoid, tanh, ReLU and non-linearity." },
        ],
      },
    ],
  },
];

// ---- Lookup & navigation helpers ----------------------------------------

export function getUnit(unitId: string): Unit | undefined {
  return SYLLABUS.find((u) => u.id === unitId);
}

export type ResolveResult = {
  unit: Unit;
  // Chain of topics from the unit down to the resolved node (last = current).
  trail: { id: string; title: string; summary?: string; children?: unknown[] }[];
};

// Resolve a URL path [unitId, topicId, subTopicId, ...] into the unit + the
// chain of topics it points at. Returns null if any segment is invalid.
export function resolvePath(path: string[]): ResolveResult | null {
  if (path.length === 0) return null;
  const unit = getUnit(path[0]);
  if (!unit) return null;

  let level = unit.topics;
  const trail: ResolveResult["trail"] = [];
  for (const seg of path.slice(1)) {
    const node = level.find((t) => t.id === seg);
    if (!node) return null;
    trail.push(node);
    level = node.children ?? [];
  }
  return { unit, trail };
}

export function hasContent(id: string): boolean {
  return id in CONTENT;
}

export function getContent(id: string) {
  return CONTENT[id];
}

// Counts for the landing page.
function countTopics(unit: Unit): number {
  let n = 0;
  for (const t of unit.topics) {
    n += 1 + (t.children?.length ?? 0);
  }
  return n;
}

export const studyCounts = {
  units: SYLLABUS.length,
  topics: SYLLABUS.reduce((n, u) => n + countTopics(u), 0),
  withNotes: Object.keys(CONTENT).length,
};
