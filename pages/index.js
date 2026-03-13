import { useState, useEffect, useRef } from "react";

const BOOKS = [
  { id: "rouge", title: "Le Rouge et le Noir", author: "Stendhal", year: 1830, genre: "Psychological Drama", description: "A young man of humble birth navigates ambition, love and hypocrisy in post-Napoleonic France.", quote: "He was not wicked enough for the world, nor good enough for solitude.", bg: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&q=80" },
  { id: "crime", title: "Crime and Punishment", author: "Dostoevsky", year: 1866, genre: "Psychological Thriller", description: "A student commits murder to test a theory of moral superiority — and is destroyed by his own conscience.", quote: "Pain and suffering are always inevitable for a large intelligence.", bg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" },
  { id: "anna", title: "Anna Karenina", author: "Tolstoy", year: 1878, genre: "Tragedy", description: "A passionate affair tears apart the life of a Russian aristocrat trapped between love and society.", quote: "All happy families are alike; each unhappy family is unhappy in its own way.", bg: "https://images.unsplash.com/photo-1551292831-023188e78222?w=800&q=80" },
  { id: "miserable", title: "Les Misérables", author: "Victor Hugo", year: 1862, genre: "Epic Drama", description: "An ex-convict's pursuit of redemption against the backdrop of revolutionary Paris.", quote: "Even the darkest night will end and the sun will rise.", bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { id: "bovary", title: "Madame Bovary", author: "Flaubert", year: 1857, genre: "Realist Drama", description: "A doctor's wife seeks escape from provincial boredom through romantic fantasy and ruin.", quote: "She wanted to die, but she also wanted to live in Paris.", bg: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=800&q=80" },
  { id: "monte", title: "The Count of Monte Cristo", author: "Alexandre Dumas", year: 1844, genre: "Adventure", description: "A wrongly imprisoned sailor returns as a wealthy count to exact elaborate revenge on his enemies.", quote: "All human wisdom is contained in these two words: Wait and Hope.", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
  { id: "pride", title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance", description: "Five sisters navigate marriage, money and misunderstanding in Regency England.", quote: "It is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife.", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
  { id: "brothers", title: "The Brothers Karamazov", author: "Dostoevsky", year: 1880, genre: "Philosophical Drama", description: "Three brothers, a murdered father, and the darkest questions about God, free will and suffering.", quote: "The mystery of human existence lies not in just staying alive, but in finding something to live for.", bg: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80" },
  { id: "gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "American Tragedy", description: "A mysterious millionaire's obsessive pursuit of a lost love in the glittering 1920s.", quote: "So we beat on, boats against the current, borne back ceaselessly into the past.", bg: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80" },
  { id: "war", title: "War and Peace", author: "Tolstoy", year: 1869, genre: "Epic", description: "Five aristocratic families live through Napoleon's invasion of Russia.", quote: "We can know only that we know nothing. And that is the highest degree of human wisdom.", bg: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80" },
  { id: "jane", title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, genre: "Gothic Romance", description: "A governess falls for her brooding employer — and uncovers the secret locked in his house.", quote: "I am no bird; and no net ensnares me.", bg: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&q=80" },
  { id: "wuthering", title: "Wuthering Heights", author: "Emily Brontë", year: 1847, genre: "Gothic Drama", description: "A destructive passion between a foundling and a girl of the moors spans two generations.", quote: "He's more myself than I am. Whatever our souls are made of, his and mine are the same.", bg: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80" },
  { id: "pere", title: "Père Goriot", author: "Honoré de Balzac", year: 1835, genre: "Social Drama", description: "A naive student discovers the brutal machinery of Parisian society through a devoted, ruined father.", quote: "The secret of great fortunes without apparent cause is a crime forgotten, because properly done.", bg: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=800&q=80" },
  { id: "germinal", title: "Germinal", author: "Émile Zola", year: 1885, genre: "Social Drama", description: "A young miner leads a desperate strike in the coal fields of northern France.", quote: "Men might die, but the idea would live on.", bg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" },
  { id: "great", title: "Great Expectations", author: "Charles Dickens", year: 1861, genre: "Coming of Age", description: "An orphan boy's mysterious fortune transforms him — and tests who he truly is.", quote: "I loved her against reason, against promise, against peace, against hope.", bg: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80" },
  { id: "idiot", title: "The Idiot", author: "Dostoevsky", year: 1869, genre: "Tragedy", description: "A pure-hearted prince is destroyed by the corrupt society he tries to redeem.", quote: "Beauty will save the world.", bg: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80" },
  { id: "chartreuse", title: "The Charterhouse of Parma", author: "Stendhal", year: 1839, genre: "Political Drama", description: "A young Italian nobleman chases glory, love and intrigue across Napoleonic Europe.", quote: "One can acquire everything in solitude except character.", bg: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80" },
  { id: "oblomov", title: "Oblomov", author: "Ivan Goncharov", year: 1859, genre: "Psychological Comedy", description: "A Russian nobleman's magnificent, catastrophic inability to get out of bed.", quote: "His whole existence was made up of a morning that had not yet turned into a day.", bg: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80" },
  { id: "demons", title: "Demons", author: "Dostoevsky", year: 1872, genre: "Political Thriller", description: "A provincial town is infiltrated by revolutionary nihilists with terrifying consequences.", quote: "If God does not exist, everything is permitted.", bg: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80" },
  { id: "lys", title: "Le Lys dans la Vallée", author: "Honoré de Balzac", year: 1836, genre: "Romantic Drama", description: "A young man's impossible love for a virtuous married woman destroys them both.", quote: "Love is the poetry of the senses.", bg: "https://images.unsplash.com/photo-1490750967868-88df5691cc8e?w=800&q=80" }
];

export default function Undecided() {
  const [phase, setPhase] = useState("hero");
  const [selectedBook, setSelectedBook] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(null);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(null);
  const [heroBook, setHeroBook] = useState(0);
  const heroTimer = useRef(null);

  useEffect(() => {
    heroTimer.current = setInterval(() => {
      setHeroBook(h => (h + 1) % BOOKS.length);
    }, 4000);
    return () => clearInterval(heroTimer.current);
  }, []);

  async function callClaude(prompt) {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const text = data.content?.[0]?.text || "{}";
      const match = text.match(/\{[\s\S]*\}/);
      return JSON.parse(match ? match[0] : "{}");
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async function openBook(book) {
    setSelectedBook(book);
    setPhase("loading");
    setChoices([]);
    setSceneIndex(0);
    setEnding(null);
    setCurrentScene(null);

    const scene = await callClaude(`You are creating the opening scene of an interactive cinematic adaptation of "${book.title}" by ${book.author} (${book.year}).

Write the first scene establishing the world, protagonist, and central dramatic tension. Psychologically rich, visually specific, never dumbed down. Written like the opening of a great literary film.

Return ONLY valid JSON, no markdown:
{
  "header": "Part One — [setting, year]",
  "title": "[evocative scene title, 3-5 words]",
  "extract": "[a single powerful sentence from or inspired by the book, in italics style, that sets the mood]",
  "narration": "[4-5 sentences of cinematic literary narration. Dense, psychological, specific to this author's world and style.]",
  "choicePrompt": "[A single urgent question that captures the dramatic fork in this moment]",
  "choices": [
    {"text": "[Specific choice, 1-2 sentences, psychologically motivated]", "outcome": "a"},
    {"text": "[Contrasting choice with different psychology]", "outcome": "b"},
    {"text": "[Unexpected third path]", "outcome": "c"},
    {"text": "[The path ${book.author} actually wrote — faithful to the original novel]", "outcome": "original", "original": true}
  ]
}`);

    if (scene) {
      setCurrentScene(scene);
      setPhase("scene");
    } else {
      setPhase("library");
    }
  }

  async function makeChoice(choice) {
    const newChoices = [...choices, choice.text];
    setChoices(newChoices);
    const nextIndex = sceneIndex + 1;

    if (nextIndex >= 4) {
      setLoading(true);
      setPhase("ending_loading");
      const end = await callClaude(`Conclude this interactive cinematic adaptation of "${selectedBook.title}" by ${selectedBook.author}.

Reader's choices: ${newChoices.join(" → ")}

Write a haunting final scene — 4 sentences, like the last frame of a great literary film. Reference the specific path taken. End with one resonant line embodying the novel's deepest theme.

Return ONLY JSON: {"endingTitle": "[3-4 word poetic title]", "endingText": "[the ending paragraph]"}`);
      setEnding(end);
      setLoading(false);
      setPhase("ending");
      return;
    }

    setLoading(true);
    setPhase("loading");
    setSceneIndex(nextIndex);

    const next = await callClaude(`Write scene ${nextIndex + 1} of 4 in an interactive adaptation of "${selectedBook.title}" by ${selectedBook.author}.

Reader's choices so far: ${newChoices.join(" → ")}
Last choice: "${choice.text}"

Continue the story naturally from these choices. Show consequences. Deepen the tension. Maintain ${selectedBook.author}'s psychological depth.

Return ONLY valid JSON, no markdown:
{
  "header": "[Part — setting]",
  "title": "[scene title]",
  "extract": "[a powerful sentence from or inspired by the book]",
  "narration": "[4-5 sentences. React to choices made. Show their consequences. Psychologically dense.]",
  "choicePrompt": "[The urgent dramatic question of this moment]",
  "choices": [
    {"text": "[Choice A]", "outcome": "a"},
    {"text": "[Choice B]", "outcome": "b"},
    {"text": "[Choice C]", "outcome": "c"},
    {"text": "[What ${selectedBook.author} actually wrote]", "outcome": "original", "original": true}
  ]
}`);

    if (next) setCurrentScene(next);
    setLoading(false);
    setPhase("scene");
  }

  const featured = BOOKS[heroBook];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: #06050a;
          color: #f0e8d8;
          font-family: 'Libre Baskerville', serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        :root {
          --gold: #d4a843;
          --gold2: #f0c96a;
          --cream: #f0e8d8;
          --dim: #7a6e60;
          --deep: #06050a;
          --surface: #0d0b14;
          --border: rgba(212,168,67,0.18);
        }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--deep); }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 1.2rem 3rem;
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(to bottom, rgba(6,5,10,0.95) 0%, transparent 100%);
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 900;
          letter-spacing: 0.15em;
          color: var(--cream);
          text-transform: uppercase;
        }
        .nav-logo em { color: var(--gold); font-style: normal; }
        .nav-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.35em;
          text-transform: uppercase; color: var(--dim);
        }
        .nav-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          border: 1px solid var(--border); color: var(--gold);
          background: none; padding: 0.5rem 1.2rem; cursor: pointer;
          transition: all 0.2s;
        }
        .nav-btn:hover { background: var(--gold); color: var(--deep); }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 1.5s ease;
          filter: brightness(0.25) saturate(0.6);
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #06050a 0%, transparent 50%, rgba(6,5,10,0.4) 100%);
        }
        .hero-content {
          position: relative; z-index: 2;
          padding: 0 3rem 5rem;
          max-width: 900px;
        }
        .hero-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.5em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 1rem;
        }
        .hero-eyebrow::after { content: ''; flex: 0 0 60px; height: 1px; background: var(--gold); opacity: 0.4; }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 900; line-height: 0.95;
          color: var(--cream); margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }
        .hero-title em { font-style: italic; color: var(--gold2); }
        .hero-sub {
          font-size: 1.05rem; line-height: 1.8;
          color: rgba(240,232,216,0.6);
          max-width: 500px; margin-bottom: 2.5rem;
          font-style: italic;
        }
        .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .hero-cta {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
          background: var(--gold); color: var(--deep);
          border: none; padding: 1rem 2.5rem; cursor: pointer;
          transition: all 0.2s; font-weight: 600;
        }
        .hero-cta:hover { background: var(--gold2); transform: translateY(-2px); }
        .hero-secondary {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--dim); background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .hero-book-tag {
          position: absolute; bottom: 5rem; right: 3rem; z-index: 2;
          text-align: right;
          font-family: 'Montserrat', sans-serif;
        }
        .hero-book-now {
          font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--dim); margin-bottom: 0.3rem;
        }
        .hero-book-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-style: italic; color: var(--gold);
        }
        .hero-book-author { font-size: 0.65rem; letter-spacing: 0.1em; color: var(--dim); margin-top: 0.2rem; }
        .hero-dots {
          position: absolute; bottom: 2rem; left: 3rem; z-index: 2;
          display: flex; gap: 6px;
        }
        .hdot { width: 20px; height: 2px; background: rgba(212,168,67,0.3); transition: all 0.4s; }
        .hdot.active { background: var(--gold); width: 40px; }

        /* MARQUEE */
        .marquee-wrap {
          background: var(--gold); padding: 0.6rem 0; overflow: hidden;
          position: relative; z-index: 10;
        }
        .marquee-inner {
          display: flex; gap: 3rem;
          animation: marquee 30s linear infinite;
          white-space: nowrap;
        }
        .marquee-inner span {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--deep); font-weight: 600;
        }
        .marquee-inner span::before { content: '✦ '; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* FEATURED QUOTE */
        .quote-section {
          padding: 6rem 3rem;
          max-width: 900px; margin: 0 auto; text-align: center;
        }
        .quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 6rem; line-height: 0.5; color: var(--gold); opacity: 0.3;
        }
        .quote-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 3vw, 2rem);
          font-style: italic; line-height: 1.6;
          color: var(--cream); margin: 1.5rem 0;
        }
        .quote-author {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--gold);
        }

        /* LIBRARY */
        .library-section { padding: 0 0 6rem; }
        .library-header {
          padding: 0 3rem 3rem;
          display: flex; align-items: baseline; justify-content: space-between;
          border-bottom: 1px solid var(--border); margin-bottom: 0;
        }
        .library-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem; font-weight: 700;
        }
        .library-count {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--dim);
        }
        .books-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .book-card {
          position: relative; cursor: pointer;
          overflow: hidden; aspect-ratio: 3/4;
          border: 0.5px solid rgba(212,168,67,0.08);
        }
        .book-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: transform 0.6s ease, filter 0.4s ease;
          filter: brightness(0.35) saturate(0.5);
        }
        .book-card:hover .book-img { transform: scale(1.08); filter: brightness(0.25) saturate(0.4); }
        .book-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(6,5,10,0.98) 0%, rgba(6,5,10,0.4) 60%, transparent 100%);
        }
        .book-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1.5rem;
          transform: translateY(0); transition: transform 0.3s ease;
        }
        .book-genre-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 0.5rem; opacity: 0.8;
        }
        .book-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; line-height: 1.2;
          color: var(--cream); margin-bottom: 0.3rem;
        }
        .book-by {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem; color: var(--dim); margin-bottom: 0.8rem;
        }
        .book-quote-preview {
          font-size: 0.8rem; font-style: italic; color: rgba(240,232,216,0.5);
          line-height: 1.5; margin-bottom: 1rem;
          opacity: 0; transform: translateY(8px);
          transition: all 0.3s ease 0.05s;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .book-card:hover .book-quote-preview { opacity: 1; transform: translateY(0); }
        .book-begin {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); display: flex; align-items: center; gap: 0.5rem;
          opacity: 0; transform: translateY(8px);
          transition: all 0.3s ease 0.1s;
        }
        .book-begin::after { content: '→'; }
        .book-card:hover .book-begin { opacity: 1; transform: translateY(0); }

        /* EXPERIENCE OVERLAY */
        .overlay {
          position: fixed; inset: 0; z-index: 300;
          background: var(--deep);
          display: flex; flex-direction: column;
          overflow-y: auto;
        }
        .exp-hero {
          position: relative; height: 35vh; min-height: 220px;
          overflow: hidden; flex-shrink: 0;
        }
        .exp-hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          filter: brightness(0.2) saturate(0.5);
        }
        .exp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(6,5,10,0.3) 0%, var(--deep) 100%);
        }
        .exp-nav {
          position: absolute; top: 0; left: 0; right: 0;
          padding: 1.5rem 2.5rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .exp-book-label {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-style: italic; color: var(--gold);
        }
        .back-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          border: 1px solid var(--border); color: var(--dim);
          background: rgba(6,5,10,0.6); padding: 0.4rem 1rem; cursor: pointer;
          transition: all 0.2s;
        }
        .back-btn:hover { border-color: var(--gold); color: var(--gold); }
        .exp-progress {
          position: absolute; bottom: 1.5rem; left: 2.5rem; right: 2.5rem;
          display: flex; gap: 4px; align-items: center;
        }
        .prog-bar { height: 2px; flex: 1; background: rgba(212,168,67,0.2); transition: background 0.4s; }
        .prog-bar.done { background: var(--dim); }
        .prog-bar.active { background: var(--gold); }
        .prog-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--dim); margin-left: 0.8rem;
        }
        .exp-body {
          flex: 1; padding: 2.5rem;
          max-width: 720px; width: 100%; margin: 0 auto;
        }
        .scene-extract {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-style: italic;
          color: var(--gold); opacity: 0.7;
          border-left: 2px solid rgba(212,168,67,0.3);
          padding-left: 1rem; margin-bottom: 1.5rem;
          line-height: 1.7;
        }
        .scene-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--dim); margin-bottom: 0.6rem;
        }
        .scene-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; line-height: 1.1;
          color: var(--cream); margin-bottom: 1.5rem;
        }
        .scene-narration {
          font-size: 1rem; line-height: 1.95;
          color: rgba(240,232,216,0.85);
          margin-bottom: 2.5rem;
        }
        .choice-prompt {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1rem;
        }
        .choices { display: flex; flex-direction: column; gap: 8px; margin-bottom: 2rem; }
        .choice-btn {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(212,168,67,0.12);
          padding: 1rem 1.2rem;
          font-family: 'Libre Baskerville', serif;
          font-size: 0.95rem; color: var(--cream);
          cursor: pointer; text-align: left; line-height: 1.65;
          transition: all 0.2s; position: relative;
        }
        .choice-btn:hover {
          border-color: var(--gold);
          background: rgba(212,168,67,0.06);
          padding-left: 1.8rem;
        }
        .choice-btn::before {
          content: '→';
          position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%);
          color: var(--gold); opacity: 0; font-size: 0.8rem;
          transition: opacity 0.2s;
        }
        .choice-btn:hover::before { opacity: 1; }
        .choice-btn.original { border-color: rgba(212,168,67,0.06); }
        .choice-btn.original::after {
          content: 'Original path';
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); opacity: 0.4; margin-bottom: 0.3rem;
        }
        .choice-btn.original { display: flex; flex-direction: column; }
        .choice-btn.original::after { order: -1; }
        .loading-scene {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 4rem 0; gap: 1.5rem;
        }
        .loading-spinner {
          width: 40px; height: 40px;
          border: 1px solid rgba(212,168,67,0.2);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-text {
          font-family: 'Playfair Display', serif;
          font-style: italic; color: var(--dim); font-size: 1rem;
        }
        .path-crumb {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.1em;
          color: var(--dim); margin-bottom: 1.2rem;
          padding: 0.3rem 0.8rem; border: 1px solid var(--border);
          display: inline-block;
        }
        .ending-card {
          border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(212,168,67,0.04) 0%, transparent 100%);
          padding: 2rem;
        }
        .ending-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1rem;
        }
        .ending-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 700;
          color: var(--cream); margin-bottom: 1.2rem;
        }
        .ending-text {
          font-size: 1rem; line-height: 1.9;
          font-style: italic; color: rgba(240,232,216,0.7);
          margin-bottom: 2rem;
        }
        .ending-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
        .end-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.7rem 1.5rem; cursor: pointer; transition: all 0.2s;
          border: 1px solid var(--gold); color: var(--gold); background: none;
        }
        .end-btn:hover { background: var(--gold); color: var(--deep); }
        .end-btn.primary { background: var(--gold); color: var(--deep); }
        .end-btn.primary:hover { background: var(--gold2); }

        /* FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          padding: 3rem; text-align: center;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900;
          letter-spacing: 0.2em; color: var(--dim);
          margin-bottom: 1rem;
        }
        .footer-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--dim); opacity: 0.5;
        }

        @media (max-width: 900px) {
          .books-grid { grid-template-columns: repeat(2, 1fr); }
          .nav { padding: 1rem 1.5rem; }
          .hero-content { padding: 0 1.5rem 4rem; }
          .hero-book-tag { display: none; }
          .exp-body { padding: 1.5rem; }
        }
        @media (max-width: 480px) {
          .books-grid { grid-template-columns: 1fr 1fr; }
          .book-card { aspect-ratio: 2/3; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div>
          <div className="nav-logo">UN<em>DECIDED</em></div>
          <div className="nav-tag">Choose your story</div>
        </div>
        {phase === "hero" && (
          <button className="nav-btn" onClick={() => setPhase("library")}>The Library →</button>
        )}
        {phase === "library" && (
          <button className="nav-btn" onClick={() => setPhase("hero")}>← Home</button>
        )}
      </nav>

      {/* HERO */}
      {phase === "hero" && (
        <>
          <section className="hero">
            <div className="hero-bg" style={{ backgroundImage: `url(${featured.bg})` }} />
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="hero-eyebrow">Interactive Cinematic Adaptations</div>
              <h1 className="hero-title">
                The classics,<br /><em>reimagined.</em>
              </h1>
              <p className="hero-sub">
                Pick a novel. Shape the story. Discover what happens when you decide.
              </p>
              <div className="hero-actions">
                <button className="hero-cta" onClick={() => setPhase("library")}>Enter the Library</button>
                <button className="hero-secondary" onClick={() => openBook(BOOKS[0])}>▶ Try Le Rouge et le Noir</button>
              </div>
            </div>
            <div className="hero-book-tag">
              <div className="hero-book-now">Now Showing</div>
              <div className="hero-book-title">{featured.title}</div>
              <div className="hero-book-author">{featured.author}, {featured.year}</div>
            </div>
            <div className="hero-dots">
              {BOOKS.slice(0, 8).map((_, i) => (
                <div key={i} className={`hdot ${i === heroBook % 8 ? "active" : ""}`} />
              ))}
            </div>
          </section>

          <div className="marquee-wrap">
            <div className="marquee-inner">
              {[...BOOKS, ...BOOKS].map((b, i) => <span key={i}>{b.title}</span>)}
            </div>
          </div>

          <div className="quote-section">
            <div className="quote-mark">"</div>
            <div className="quote-text">{featured.quote}</div>
            <div className="quote-author">— {featured.author}</div>
          </div>

          <div className="library-section">
            <div className="library-header">
              <div className="library-title">The Library</div>
              <div className="library-count">{BOOKS.length} masterworks</div>
            </div>
            <div className="books-grid">
              {BOOKS.map(book => (
                <div key={book.id} className="book-card" onClick={() => openBook(book)}>
                  <div className="book-img" style={{ backgroundImage: `url(${book.bg})` }} />
                  <div className="book-gradient" />
                  <div className="book-info">
                    <div className="book-genre-tag">{book.genre}</div>
                    <div className="book-name">{book.title}</div>
                    <div className="book-by">{book.author} · {book.year}</div>
                    <div className="book-quote-preview">"{book.quote}"</div>
                    <div className="book-begin">Begin your story</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="footer">
            <div className="footer-logo">UNDECIDED</div>
            <div className="footer-text">Interactive cinematic adaptations of classic literature · undecided.com</div>
          </footer>
        </>
      )}

      {/* LIBRARY PAGE */}
      {phase === "library" && (
        <div style={{ paddingTop: "5rem" }}>
          <div className="library-section">
            <div className="library-header">
              <div className="library-title">The Library</div>
              <div className="library-count">{BOOKS.length} masterworks</div>
            </div>
            <div className="books-grid">
              {BOOKS.map(book => (
                <div key={book.id} className="book-card" onClick={() => openBook(book)}>
                  <div className="book-img" style={{ backgroundImage: `url(${book.bg})` }} />
                  <div className="book-gradient" />
                  <div className="book-info">
                    <div className="book-genre-tag">{book.genre}</div>
                    <div className="book-name">{book.title}</div>
                    <div className="book-by">{book.author} · {book.year}</div>
                    <div className="book-quote-preview">"{book.quote}"</div>
                    <div className="book-begin">Begin your story</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {(phase === "loading" || phase === "scene" || phase === "ending" || phase === "ending_loading") && selectedBook && (
        <div className="overlay">
          <div className="exp-hero">
            <div className="exp-hero-bg" style={{ backgroundImage: `url(${selectedBook.bg})` }} />
            <div className="exp-hero-overlay" />
            <div className="exp-nav">
              <div className="exp-book-label">{selectedBook.title}</div>
              <button className="back-btn" onClick={() => setPhase("library")}>← Library</button>
            </div>
            {phase !== "ending" && (
              <div className="exp-progress">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`prog-bar ${i < sceneIndex ? "done" : i === sceneIndex ? "active" : ""}`} />
                ))}
                <span className="prog-label">Scene {sceneIndex + 1} / 4</span>
              </div>
            )}
          </div>

          <div className="exp-body">
            {(phase === "loading" || phase === "ending_loading") && (
              <div className="loading-scene">
                <div className="loading-spinner" />
                <div className="loading-text">
                  {phase === "ending_loading" ? "Writing your ending..." : "The story unfolds..."}
                </div>
              </div>
            )}

            {phase === "scene" && currentScene && (
              <>
                {choices.length > 0 && (
                  <div className="path-crumb">Your path: {choices[choices.length - 1].substring(0, 60)}...</div>
                )}
                {currentScene.extract && (
                  <div className="scene-extract">"{currentScene.extract}"</div>
                )}
                <div className="scene-eyebrow">{currentScene.header}</div>
                <div className="scene-title">{currentScene.title}</div>
                <div className="scene-narration">{currentScene.narration}</div>
                <div className="choice-prompt">{currentScene.choicePrompt}</div>
                <div className="choices">
                  {currentScene.choices?.map((c, i) => (
                    <button
                      key={i}
                      className={`choice-btn ${c.original ? "original" : ""}`}
                      onClick={() => makeChoice(c)}
                    >
                      {c.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {phase === "ending" && ending && (
              <div className="ending-card">
                <div className="ending-label">Your ending · {selectedBook.title}</div>
                <div className="ending-title">{ending.endingTitle}</div>
                <div className="ending-text">{ending.endingText}</div>
                <div className="ending-actions">
                  <button className="end-btn primary" onClick={() => openBook(selectedBook)}>Another path →</button>
                  <button className="end-btn" onClick={() => setPhase("library")}>Choose another book</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
