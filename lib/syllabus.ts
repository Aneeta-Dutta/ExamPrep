// Subject-wise syllabus / exam-analysis for UGC NET Paper 2 — Subject 087,
// Computer Science & Applications. Each group bundles related subjects with the
// specific topics that have appeared in recent papers, so candidates can see
// what to prioritise at a glance.

export type SyllabusSubject = {
  subject: string;
  // Short note on weightage / how the subject tends to be tested.
  note?: string;
  topics: string[];
};

export type SyllabusGroup = {
  title: string;
  subjects: SyllabusSubject[];
};

export const PAPER2_SYLLABUS: SyllabusGroup[] = [
  {
    title: "Computer Networks",
    subjects: [
      {
        subject: "Computer Networks",
        note: "One of the most important sections — multiple questions, especially from the OSI Model.",
        topics: [
          "OSI Model — chronology / layer ordering",
          "OSI Model — match-the-column",
          "OSI Model — conceptual questions",
          "Piggybacking",
        ],
      },
    ],
  },
  {
    title: "Artificial Intelligence",
    subjects: [
      {
        subject: "Artificial Intelligence",
        note: "Relatively easy and scoring this session.",
        topics: [
          "Artificial Neural Networks (ANN)",
          "Activation Function — numericals",
          "Supervised Learning",
          "Natural Language Processing (NLP)",
        ],
      },
    ],
  },
  {
    title: "Software Engineering & DBMS",
    subjects: [
      {
        subject: "Software Engineering",
        topics: ["Model-based questions", "Terminology-based questions"],
      },
      {
        subject: "DBMS",
        topics: [
          "Candidate Key",
          "Serializability",
          "Deadlock",
          "Precedence Graph",
          "Match-the-following",
        ],
      },
    ],
  },
  {
    title: "TOC, Data Structures & Algorithms",
    subjects: [
      {
        subject: "Theory of Computation",
        note: "Some students found these slightly tricky.",
        topics: ["Context Free Grammar (CFG)", "First and Follow"],
      },
      {
        subject: "Data Structures & Algorithms",
        topics: [
          "Min Heap",
          "BST and AVL Tree",
          "Tree Height",
          "Time Complexity",
        ],
      },
    ],
  },
  {
    title: "Discrete Mathematics & Operating Systems",
    subjects: [
      {
        subject: "Discrete Mathematics",
        topics: ["Tautology", "Quantifiers", "Relations", "Abelian Group"],
      },
      {
        subject: "Operating Systems",
        topics: ["Disk Scheduling (FCFS, SSTF, LOOK)", "Deadlock"],
      },
    ],
  },
  {
    title: "Programming & Computer Graphics",
    subjects: [
      {
        subject: "Programming",
        topics: [
          "C for-loop numericals",
          "C++ Constructors",
          "Format Specifiers",
        ],
      },
      {
        subject: "Computer Graphics",
        topics: ["Rotation", "Translation", "Scaling", "Match-the-column"],
      },
    ],
  },
];
