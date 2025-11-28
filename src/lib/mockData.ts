import { BookOpen, Calculator, Microscope, Globe, Languages, Palette, History, Briefcase, Music, Computer } from "lucide-react";

export interface Paper {
  id: string;
  year: number;
  term?: string; // e.g., "1st Term", "2nd Term", "Final"
  medium: "Sinhala" | "English" | "Tamil";
  type: "Marking Scheme" | "Question Paper" | "Model Paper";
  downloadUrl: string;
  linkType: "internal" | "external"; // New field to distinguish real links
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: any;
  papers: Paper[];
}

// Helper to generate generic older papers for a subject
const generateOlderPapers = (subjectId: string): Paper[] => {
  const papers: Paper[] = [];
  const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015];
  
  years.forEach(year => {
    papers.push({
      id: `${subjectId}-${year}-eng-qp`,
      year,
      medium: "English",
      type: "Question Paper",
      downloadUrl: "#",
      linkType: "internal"
    });
    papers.push({
      id: `${subjectId}-${year}-sin-qp`,
      year,
      medium: "Sinhala",
      type: "Question Paper",
      downloadUrl: "#",
      linkType: "internal"
    });
  });
  
  return papers;
};

// Real Data Injection
const realMathsPapers: Paper[] = [
  {
    id: "maths-2023-eng-qp",
    year: 2023,
    medium: "English",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20232024-o-l-mathematics-past-paper-in-english-medium/",
    linkType: "external"
  },
  {
    id: "maths-2023-eng-ms",
    year: 2023,
    medium: "English",
    type: "Marking Scheme",
    downloadUrl: "https://pastpapers.wiki/20232024-o-l-maths-marking-scheme-english-medium/",
    linkType: "external"
  },
  {
    id: "maths-2023-sin-qp",
    year: 2023,
    medium: "Sinhala",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20232024-o-l-mathematics-past-paper-in-sinhala-medium/",
    linkType: "external"
  },
  {
    id: "maths-2022-eng-qp",
    year: 2022,
    medium: "English",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-mathematics-past-paper-and-answers-english-medium/",
    linkType: "external"
  },
  {
    id: "maths-2022-sin-qp",
    year: 2022,
    medium: "Sinhala",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-mathematics-past-paper-and-answers-sinhala-medium/",
    linkType: "external"
  },
  {
    id: "maths-2022-sin-ms",
    year: 2022,
    medium: "Sinhala",
    type: "Marking Scheme",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-maths-marking-scheme-sinhala-medium/",
    linkType: "external"
  }
];

const realSciencePapers: Paper[] = [
  {
    id: "sci-2023-eng-qp",
    year: 2023,
    medium: "English",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20232024-o-l-science-past-paper-and-answers-english-medium/",
    linkType: "external"
  },
  {
    id: "sci-2023-eng-ms",
    year: 2023,
    medium: "English",
    type: "Marking Scheme",
    downloadUrl: "https://pastpapers.wiki/20232024-o-l-science-marking-scheme-english-medium/",
    linkType: "external"
  },
  {
    id: "sci-2022-eng-qp",
    year: 2022,
    medium: "English",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-science-past-paper-and-answers-english-medium/",
    linkType: "external"
  },
  {
    id: "sci-2022-sin-ms",
    year: 2022,
    medium: "Sinhala",
    type: "Marking Scheme",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-science-marking-scheme-sinhala-medium/",
    linkType: "external"
  },
  {
    id: "sci-2022-tam-ms",
    year: 2022,
    medium: "Tamil",
    type: "Marking Scheme",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-science-marking-scheme-tamil-medium/",
    linkType: "external"
  }
];

const realEnglishPapers: Paper[] = [
  {
    id: "eng-2022-qp",
    year: 2022,
    medium: "English",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-english-past-paper-and-answers/",
    linkType: "external"
  },
  {
    id: "eng-2022-ms",
    year: 2022,
    medium: "English",
    type: "Marking Scheme",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-english-marking-scheme/",
    linkType: "external"
  }
];

const realSinhalaPapers: Paper[] = [
  {
    id: "sin-2022-qp",
    year: 2022,
    medium: "Sinhala",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-sinhala-past-paper-and-answers/amp/",
    linkType: "external"
  },
  {
    id: "sin-2022-ms",
    year: 2022,
    medium: "Sinhala",
    type: "Marking Scheme",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-sinhala-marking-scheme/",
    linkType: "external"
  }
];

const realHistoryPapers: Paper[] = [
  {
    id: "hist-2022-eng-qp",
    year: 2022,
    medium: "English",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-history-past-paper-and-answers-english-medium/",
    linkType: "external"
  },
  {
    id: "hist-2022-sin-qp",
    year: 2022,
    medium: "Sinhala",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-history-past-paper-and-answers/",
    linkType: "external"
  },
  {
    id: "hist-2022-tam-qp",
    year: 2022,
    medium: "Tamil",
    type: "Question Paper",
    downloadUrl: "https://pastpapers.wiki/20222023-o-l-history-past-paper-and-answers-tamil-medium/",
    linkType: "external"
  }
];

export const SUBJECTS: Subject[] = [
  {
    id: "maths",
    name: "Mathematics",
    color: "bg-blue-500",
    icon: Calculator,
    papers: [...realMathsPapers, ...generateOlderPapers("maths")]
  },
  {
    id: "science",
    name: "Science",
    color: "bg-emerald-500",
    icon: Microscope,
    papers: [...realSciencePapers, ...generateOlderPapers("science")]
  },
  {
    id: "english",
    name: "English",
    color: "bg-orange-500",
    icon: Languages,
    papers: [...realEnglishPapers, ...generateOlderPapers("english")]
  },
  {
    id: "sinhala",
    name: "Sinhala",
    color: "bg-amber-600",
    icon: BookOpen,
    papers: [...realSinhalaPapers, ...generateOlderPapers("sinhala")]
  },
  {
    id: "history",
    name: "History",
    color: "bg-yellow-600",
    icon: History,
    papers: [...realHistoryPapers, ...generateOlderPapers("history")]
  },
  {
    id: "commerce",
    name: "Commerce",
    color: "bg-cyan-600",
    icon: Briefcase,
    papers: generateOlderPapers("commerce")
  },
  {
    id: "ict",
    name: "ICT",
    color: "bg-indigo-500",
    icon: Computer,
    papers: generateOlderPapers("ict")
  },
  {
    id: "art",
    name: "Art",
    color: "bg-pink-500",
    icon: Palette,
    papers: generateOlderPapers("art")
  },
  {
    id: "geography",
    name: "Geography",
    color: "bg-green-600",
    icon: Globe,
    papers: generateOlderPapers("geography")
  },
  {
    id: "music",
    name: "Music",
    color: "bg-purple-500",
    icon: Music,
    papers: generateOlderPapers("music")
  }
];
