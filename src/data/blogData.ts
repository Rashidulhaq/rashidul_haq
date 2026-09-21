export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  keyTakeaways?: string[];
  quote?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: "AI & Machine Learning" | "Software Testing & QA" | "Web Development & PWA" | "Competitive Programming";
  description: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  tags: string[];
  featured?: boolean;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "emotion-based-music-recommendation",
    title: "A Deep Learning Approach to Emotion-Based Music Recommendations",
    category: "AI & Machine Learning",
    description: "How we leveraged convolutional neural networks, audio spectrograms, and valence-arousal mapping to curate music matching real-time emotional states.",
    readTime: "6 min read",
    date: "Aug 15, 2024",
    author: "Md. Rashidul Haq",
    authorRole: "B.Sc in CSE, Software Engineer",
    authorImage: "/images/pic1.jpg",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Deep Learning", "Python", "Audio Spectrograms", "CNN", "TensorFlow"],
    featured: true,
    sections: [
      {
        heading: "1. The Motivation: Moving Beyond Static Playlists",
        paragraphs: [
          "Traditional music streaming platforms suggest tracks primarily based on past listening history and collaborative filtering. While effective, they frequently fail when a user wants music to reflect or deliberately shift their immediate emotional condition.",
          "During my undergraduate engineering thesis at BUBT, our team explored how neural networks could map facial micro-expressions and acoustic frequency features into psychological emotion quadrants."
        ],
        quote: "Music is the universal language of human emotion. Translating biometric signals into musical harmony was our core technical objective."
      },
      {
        heading: "2. The Technical Pipeline & Feature Extraction",
        paragraphs: [
          "We processed audio waveforms by converting raw amplitude signals into Mel-frequency spectrograms (log-scaled frequency representations). This allowed standard 2D Convolutional Neural Networks (CNNs) to treat audio patterns like visual image textures.",
          "For emotion classification, we utilized Russell's Circumplex Model, which maps feelings onto a 2D space defined by Valence (how positive/negative) and Arousal (energy level)."
        ],
        codeSnippet: {
          language: "python",
          code: `# Mel-Spectrogram Extraction with Librosa
import librosa
import numpy as np

def extract_audio_spectrogram(audio_path, sr=22050, n_mels=128):
    y, sr = librosa.load(audio_path, sr=sr, duration=30.0)
    mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=n_mels, fmax=8000)
    log_mel_spec = librosa.power_to_db(mel_spec, ref=np.max)
    return log_mel_spec`
        },
        keyTakeaways: [
          "Spectrograms transform 1D acoustic temporal data into rich 2D time-frequency images.",
          "Valence-Arousal mapping avoids discrete emotion silos (e.g. happy/sad) by capturing subtle mood transitions.",
          "Lightweight CNN architectures allow near real-time recommendation inference on edge devices."
        ]
      },
      {
        heading: "3. Results & Real-World Impact",
        paragraphs: [
          "The model achieved over 88.4% classification accuracy across four primary mood clusters: Energetic, Calming, Reflective, and Melancholic. In testing, users reported a 40% higher satisfaction rating when recommendations actively synchronized with their current physiological state."
        ]
      }
    ]
  },
  {
    id: "sdlc-vs-stlc-qa-mindset",
    title: "SDLC vs STLC: Why a QA Mindset Makes You a 10x Better Developer",
    category: "Software Testing & QA",
    description: "Exploring test case design, black-box validation, and boundary value analysis to eliminate critical regressions before code ever touches production.",
    readTime: "5 min read",
    date: "Oct 10, 2024",
    author: "Md. Rashidul Haq",
    authorRole: "Software Engineer & QA Specialist",
    authorImage: "/images/pic1.jpg",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Manual Testing", "STLC", "SDLC", "Agile", "Bug Life Cycle"],
    featured: false,
    sections: [
      {
        heading: "1. The Paradigm Shift: Quality as an Engineering Culture",
        paragraphs: [
          "Many developers view testing as a final phase before deployment—a roadblock thrown in by QA engineers. In reality, understanding the Software Testing Life Cycle (STLC) shifts your mindset from simply 'writing code that works' to 'architecting systems resilient against failure.'",
          "When you understand how test cases are structured (Pre-conditions, Input Data, Expected vs. Actual, and Post-conditions), you naturally write defensive code that accounts for edge cases."
        ]
      },
      {
        heading: "2. Boundary Value Analysis (BVA) in Practice",
        paragraphs: [
          "Most software bugs occur at input boundaries rather than in the center of acceptable ranges. Boundary Value Analysis teaches developers to test exactly at the min, min+1, nominal, max-1, and max thresholds."
        ],
        codeSnippet: {
          language: "javascript",
          code: `// Practical Boundary Value Verification in Form Input
function validateUserAge(age) {
  // Boundary constraints: min 18, max 65
  const MIN_AGE = 18;
  const MAX_AGE = 65;

  if (typeof age !== 'number' || isNaN(age)) {
    return { valid: false, error: 'Age must be a numeric value' };
  }
  if (age < MIN_AGE || age > MAX_AGE) {
    return { valid: false, error: \`Age must be between \${MIN_AGE} and \${MAX_AGE}\` };
  }
  return { valid: true };
}`
        },
        keyTakeaways: [
          "STLC operates concurrently with SDLC, beginning right from requirement analysis.",
          "Equivalence Partitioning and Boundary Value Analysis drastically reduce redundant test cases.",
          "A developer who tests their own code through a QA lens produces 70% fewer production regressions."
        ]
      }
    ]
  },
  {
    id: "offline-first-pwa-architecture",
    title: "Building Offline-First Web Apps with IndexedDB & Service Workers",
    category: "Web Development & PWA",
    description: "Architectural insights from 'My Note': achieving zero-latency local persistence, service worker caching strategies, and background cloud synchronization.",
    readTime: "4 min read",
    date: "Nov 04, 2024",
    author: "Md. Rashidul Haq",
    authorRole: "Software Engineer",
    authorImage: "/images/pic1.jpg",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
    tags: ["PWA", "IndexedDB", "Service Workers", "Offline First", "JavaScript"],
    featured: false,
    sections: [
      {
        heading: "1. Why 'Offline-First' Matters More Than Ever",
        paragraphs: [
          "Users shouldn't be greeted with a blank screen or a broken dinosaur whenever they lose mobile connectivity on the train or in rural areas. An offline-first web application treats connectivity as an enhancement rather than a prerequisite.",
          "When developing 'My Note', the design goal was immediate interaction: reading and editing notes must happen at 0ms latency directly in IndexedDB."
        ]
      },
      {
        heading: "2. The Service Worker Caching Strategy",
        paragraphs: [
          "We adopted a Stale-While-Revalidate caching pattern for application shell assets, paired with a Cache-First approach for immutable font glyphs and icons."
        ],
        codeSnippet: {
          language: "javascript",
          code: `// Service Worker: Stale-While-Revalidate Pattern
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('dynamic-cache-v1').then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});`
        },
        keyTakeaways: [
          "IndexedDB provides non-blocking, multi-megabyte structured storage for complex offline data.",
          "The Service Worker acts as a client-side proxy between the browser and network.",
          "Always display clear UI connection badges so users know when data is pending cloud sync."
        ]
      }
    ]
  },
  {
    id: "qr-ticket-verification-ai-summit",
    title: "Demystifying Real-Time Ticket Verification with Signed QR Codes",
    category: "AI & Machine Learning",
    description: "Designing the AI Summit Rajbari ticketing system: concurrency handling, cryptographically secure QR payloads, and high-speed venue check-ins.",
    readTime: "4 min read",
    date: "Dec 18, 2024",
    author: "Md. Rashidul Haq",
    authorRole: "Software Engineer",
    authorImage: "/images/pic1.jpg",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    tags: ["Event Tech", "Security", "QR Code", "Firebase", "Webhooks"],
    featured: false,
    sections: [
      {
        heading: "1. The High-Traffic Event Registration Challenge",
        paragraphs: [
          "During the AI Summit Rajbari, thousands of attendees registered and needed instant entry validation at the gate without server latency or risk of duplicate ticket sharing.",
          "To solve this, each ticket generated a unique cryptographic hash payload encoded into a 2D QR matrix that validated in under 300 milliseconds on handheld mobile scanners."
        ]
      },
      {
        heading: "2. Atomic Check-In Transactions",
        paragraphs: [
          "To prevent double-entry (e.g. two gates scanning screenshots of the same ticket simultaneously), we utilized atomic database transactions. Once scanned, the ticket status changes from 'ISSUED' to 'CHECKED_IN' with an immutable timestamp."
        ],
        codeSnippet: {
          language: "javascript",
          code: `// Atomic Gate Verification Transaction
async function verifyAndCheckInTicket(ticketId, gateOfficerId) {
  return await db.runTransaction(async (transaction) => {
    const ticketRef = db.collection('tickets').doc(ticketId);
    const doc = await transaction.get(ticketRef);
    
    if (!doc.exists) throw new Error('Ticket not found in registry');
    if (doc.data().status === 'CHECKED_IN') {
      throw new Error(\`Already scanned at \${doc.data().scannedAt}\`);
    }

    transaction.update(ticketRef, {
      status: 'CHECKED_IN',
      scannedAt: new Date().toISOString(),
      officer: gateOfficerId
    });
    return { success: true, attendee: doc.data().name };
  });
}`
        }
      }
    ]
  },
  {
    id: "icpc-problem-solving-lessons",
    title: "Algorithmic Thinking: Key Lessons from the BUBT ICPC Contest",
    category: "Competitive Programming",
    description: "Dynamic programming state reduction, time complexity budgeting, and effective team coordination under extreme competitive pressure.",
    readTime: "5 min read",
    date: "Sep 28, 2023",
    author: "Md. Rashidul Haq",
    authorRole: "ICPC Challenger & Problem Solver",
    authorImage: "/images/pic1.jpg",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    tags: ["ICPC", "Algorithms", "C++", "Dynamic Programming", "Data Structures"],
    featured: false,
    sections: [
      {
        heading: "1. The 5-Hour Pressure Cooker: Beyond Writing Syntax",
        paragraphs: [
          "Competing in the BUBT ICPC National Contest was one of the most defining experiences of my undergraduate journey. When you are given 10-12 challenging algorithmic problems and a single computer shared among three teammates, software engineering becomes an exercise in strict discipline.",
          "You quickly learn that 80% of problem-solving happens with pencil and paper before a single line of C++ code is entered."
        ],
        quote: "Premature coding is the root of all TLE (Time Limit Exceeded) verdicts. Solve the math first."
      },
      {
        heading: "2. The Golden Rules of Competitive Coding in Real Software",
        paragraphs: [
          "The skills learned in competitive programming directly impact day-to-day software development: understanding O(N log N) vs O(N²) thresholds, minimizing heap allocations in tight loops, and breaking complex problem statements into deterministic sub-problems."
        ],
        keyTakeaways: [
          "Always calculate the theoretical operation count before choosing an algorithm (10^8 operations ≈ 1 second).",
          "Dynamic programming is simply recursion plus memoization—cache expensive state recalculations.",
          "Clear variable naming under pressure prevents trivial off-by-one errors."
        ]
      }
    ]
  }
];
