import { useState, useEffect, useRef } from "react";

const BOOKS = [
  { id: "rouge", title: "Le Rouge et le Noir", author: "Stendhal", year: 1830, genre: "Psychological Drama", description: "A young man of humble birth navigates ambition, love and hypocrisy in post-Napoleonic France.", quote: "He was not wicked enough for the world, nor good enough for solitude.", bg: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=1200&q=80" },
  { id: "crime", title: "Crime and Punishment", author: "Dostoevsky", year: 1866, genre: "Psychological Thriller", description: "A student commits murder to test a theory of moral superiority — and is destroyed by his own conscience.", quote: "Pain and suffering are always inevitable for a large intelligence.", bg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80" },
  { id: "anna", title: "Anna Karenina", author: "Tolstoy", year: 1878, genre: "Tragedy", description: "A passionate affair tears apart the life of a Russian aristocrat trapped between love and society.", quote: "All happy families are alike; each unhappy family is unhappy in its own way.", bg: "https://images.unsplash.com/photo-1551292831-023188e78222?w=1200&q=80" },
  { id: "miserable", title: "Les Misérables", author: "Victor Hugo", year: 1862, genre: "Epic Drama", description: "An ex-convict's pursuit of redemption against the backdrop of revolutionary Paris.", quote: "Even the darkest night will end and the sun will rise.", bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80" },
  { id: "bovary", title: "Madame Bovary", author: "Flaubert", year: 1857, genre: "Realist Drama", description: "A doctor's wife seeks escape from provincial boredom through romantic fantasy and ruin.", quote: "She wanted to die, but she also wanted to live in Paris.", bg: "https://images.unsplash.com/photo-1490750967868-88df5691cc8e?w=1200&q=80" },
  { id: "monte", title: "The Count of Monte Cristo", author: "Alexandre Dumas", year: 1844, genre: "Adventure", description: "A wrongly imprisoned sailor returns as a wealthy count to exact elaborate revenge.", quote: "All human wisdom is contained in these two words: Wait and Hope.", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80" },
  { id: "pride", title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance", description: "Five sisters navigate marriage, money and misunderstanding in Regency England.", quote: "It is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife.", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80" },
  { id: "brothers", title: "The Brothers Karamazov", author: "Dostoevsky", year: 1880, genre: "Philosophical Drama", description: "Three brothers, a murdered father, and the darkest questions about God, free will and suffering.", quote: "The mystery of human existence lies not in just staying alive, but in finding something to live for.", bg: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80" },
  { id: "gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "American Tragedy", description: "A mysterious millionaire's obsessive pursuit of a lost love in the glittering 1920s.", quote: "So we beat on, boats against the current, borne back ceaselessly into the past.", bg: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1200&q=80" },
  { id: "war", title: "War and Peace", author: "Tolstoy", year: 1869, genre: "Epic", description: "Five aristocratic families live through Napoleon's invasion of Russia.", quote: "We can know only that we know nothing. And that is the highest degree of human wisdom.", bg: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&q=80" },
  { id: "jane", title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, genre: "Gothic Romance", description: "A governess falls for her brooding employer — and uncovers the secret locked in his house.", quote: "I am no bird; and no net ensnares me.", bg: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&q=80" },
  { id: "wuthering", title: "Wuthering Heights", author: "Emily Brontë", year: 1847, genre: "Gothic Drama", description: "A destructive passion between a foundling and a girl of the moors spans two generations.", quote: "Whatever our souls are made of, his and mine are the same.", bg: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1200&q=80" },
  { id: "pere", title: "Père Goriot", author: "Honoré de Balzac", year: 1835, genre: "Social Drama", description: "A naive student discovers the brutal machinery of Parisian society through a devoted, ruined father.", quote: "The secret of great fortunes without apparent cause is a crime forgotten.", bg: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=1200&q=80" },
  { id: "germinal", title: "Germinal", author: "Émile Zola", year: 1885, genre: "Social Drama", description: "A young miner leads a desperate strike in the coal fields of northern France.", quote: "Men might die, but the idea would live on.", bg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80" },
  { id: "great", title: "Great Expectations", author: "Charles Dickens", year: 1861, genre: "Coming of Age", description: "An orphan boy's mysterious fortune transforms him — and tests who he truly is.", quote: "I loved her against reason, against promise, against peace, against hope.", bg: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=80" },
  { id: "idiot", title: "The Idiot", author: "Dostoevsky", year: 1869, genre: "Tragedy", description: "A pure-hearted prince is destroyed by the corrupt society he tries to redeem.", quote: "Beauty will save the world.", bg: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80" },
  { id: "chartreuse", title: "The Charterhouse of Parma", author: "Stendhal", year: 1839, genre: "Political Drama", description: "A young Italian nobleman chases glory, love and intrigue across Napoleonic Europe.", quote: "One can acquire everything in solitude except character.", bg: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80" },
  { id: "oblomov", title: "Oblomov", author: "Ivan Goncharov", year: 1859, genre: "Psychological Comedy", description: "A Russian nobleman's magnificent, catastrophic inability to get out of bed.", quote: "His whole existence was made up of a morning that had not yet turned into a day.", bg: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80" },
  { id: "demons", title: "Demons", author: "Dostoevsky", year: 1872, genre: "Political Thriller", description: "A provincial town is infiltrated by revolutionary nihilists with terrifying consequences.", quote: "If God does not exist, everything is permitted.", bg: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&q=80" },
  { id: "lys", title: "Le Lys dans la Vallée", author: "Honoré de Balzac", year: 1836, genre: "Romantic Drama", description: "A young man's impossible love for a virtuous married woman destroys them both.", quote: "Love is the poetry of the senses.", bg: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1200&q=80" }
];

const FALLBACK_SCENE = {
  header: "Part One — Verrières, France, 1827",
  title: "The Sawmill Son",
  extract: "A fine dark eye, full of fire, and a forehead of polished marble — this was Julien Sorel.",
  narration: "Julien Sorel stands in his father's sawmill, nineteen years old and already burning with quiet fury at the world that has placed him here. His hands are calloused from timber he despises, but his mind runs ceaselessly on Napoleon, on glory, on escape. The Mayor of Verrières has sent word: his children need a tutor. Julien understands immediately what this means — not education, but entry. A door, at last, into the world above.",
  choicePrompt: "How does Julien approach this rare opportunity?",
  choices: [
    { text: "He negotiates boldly — arriving at the Rênal house with carefully rehearsed confidence, demanding to be treated as a professional, not a servant.", outcome: "a" },
    { text: "He accepts with feigned humility, concealing every ambition behind a mask of provincial gratitude while his eyes study everything.", outcome: "b" },
    { text: "He hesitates for three days, torn between pride and necessity, before his father's contempt finally pushes him through the gates.", outcome: "c" },
    { text: "He follows Stendhal's original path — calculating every word and gesture to appear humble while already plotting his ascent.", outcome: "original", original: true }
  ]
};

export default function Undecided() {
  const [page, setPage] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(null);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(null);
  const [error, setError] = useState(null);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(h => (h + 1) % BOOKS.length), 5000);
    return () => clearInterval(t);
  }, []);

  async function callClaude(prompt) {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error("API error:", res.status, txt);
        return null;
      }
      const data = await res.json();
      if (data.error) { console.error("Claude error:", data.error); return null; }
      const text = data.content?.[0]?.text || "";
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) { console.error("No JSON found in:", text); return null; }
      return JSON.parse(match[0]);
    } catch (e) {
      console.error("Fetch error:", e);
      return null;
    }
  }

  async function openBook(book) {
    setSelectedBook(book);
    setPage("experience");
    setChoices([]);
    setSceneIndex(0);
    setEnding(null);
    setError(null);
    setCurrentScene(null);
    setLoading(true);

    const scene = await callClaude(`You are creating the opening scene of a cinematic adaptation of "${book.title}" by ${book.author} (${book.year}). Literary quality, never dumbed down.

Return ONLY valid JSON (no markdown, no backticks):
{
  "header": "Part One — [setting, year]",
  "title": "[evocative 3-5 word scene title]",
  "extract": "[one powerful sentence from or inspired by the book that sets the mood]",
  "narration": "[4 sentences of rich cinematic narration, psychologically dense, true to the author's style]",
  "choicePrompt": "[one urgent dramatic question]",
  "choices": [
    {"text": "[Choice A — specific, psychologically motivated, 1-2 sentences]", "outcome": "a"},
    {"text": "[Choice B — contrasting psychology]", "outcome": "b"},
    {"text": "[Choice C — unexpected path]", "outcome": "c"},
    {"text": "[What ${book.author} actually wrote — faithful to the original]", "outcome": "original", "original": true}
  ]
}`);

    setLoading(false);
    if (scene) {
      setCurrentScene(scene);
    } else {
      if (book.id === "rouge") {
        setCurrentScene(FALLBACK_SCENE);
      } else {
        setError("Could not connect to the story engine. Please check your API key in Vercel settings.");
      }
    }
  }

  async function makeChoice(choice) {
    const newChoices = [...choices, choice.text];
    setChoices(newChoices);
    const nextIndex = sceneIndex + 1;
    setError(null);

    if (nextIndex >= 4) {
      setLoading(true);
      setCurrentScene(null);
      const end = await callClaude(`Conclude this interactive adaptation of "${selectedBook.title}" by ${selectedBook.author}.
Reader's path: ${newChoices.join(" → ")}
Write a haunting 4-sentence ending like the last frame of a great literary film. Reference the specific path taken.
Return ONLY JSON: {"endingTitle": "[3-4 word poetic title]", "endingText": "[ending paragraph]"}`);
      setLoading(false);
      setEnding(end || { endingTitle: "The Story Ends", endingText: "Every path through a great novel leads somewhere true. Yours has been walked — and the book remains, waiting to be opened again." });
      return;
    }

    setSceneIndex(nextIndex);
    setCurrentScene(null);
    setLoading(true);

    const next = await callClaude(`Write scene ${nextIndex + 1} of 4 in an interactive adaptation of "${selectedBook.title}" by ${selectedBook.author}.
Reader's choices: ${newChoices.join(" → ")}
Last choice: "${choice.text}"
Continue naturally. Show consequences. Maintain literary depth.
Return ONLY valid JSON (no markdown):
{
  "header": "[Part — setting]",
  "title": "[scene title]",
  "extract": "[powerful sentence from or inspired by the book]",
  "narration": "[4 sentences reacting to the choices made, psychologically rich]",
  "choicePrompt": "[urgent dramatic question]",
  "choices": [
    {"text": "[Choice A]", "outcome": "a"},
    {"text": "[Choice B]", "outcome": "b"},
    {"text": "[Choice C]", "outcome": "c"},
    {"text": "[What ${selectedBook.author} actually wrote]", "outcome": "original", "original": true}
  ]
}`);

    setLoading(false);
    if (next) setCurrentScene(next);
    else setError("Could not generate next scene. Please try again.");
  }

  const hero = BOOKS[heroIdx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #f5f0e8; color: #2a1f14; font-family: 'EB Garamond', serif; min-height: 100vh; overflow-x: hidden; }
        :root {
          --ink: #2a1f14;
          --sepia: #8b6b45;
          --gold: #b8860b;
          --cream: #f5f0e8;
          --parchment: #ede5d0;
          --light: #faf7f2;
          --border: rgba(139,107,69,0.2);
          --shadow: rgba(42,31,20,0.08);
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--parchment); }
        ::-webkit-scrollbar-thumb { background: var(--sepia); border-radius: 2px; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          background: rgba(245,240,232,0.96); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 1rem 3rem; display: flex; align-items: center; justify-content: space-between;
        }
        .logo { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 900; letter-spacing: 0.15em; color: var(--ink); text-transform: uppercase; }
        .logo em { color: var(--gold); font-style: normal; }
        .nav-tag { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--sepia); }
        .nav-right { display: flex; gap: 1rem; align-items: center; }
        .nav-link { font-family: 'Raleway', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--sepia); background: none; border: none; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: var(--ink); }
        .nav-btn { font-family: 'Raleway', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; background: var(--ink); color: var(--cream); border: none; padding: 0.5rem 1.2rem; cursor: pointer; transition: all 0.2s; }
        .nav-btn:hover { background: var(--sepia); }

        /* HERO */
        .hero { padding-top: 4rem; position: relative; min-height: 100vh; display: flex; overflow: hidden; }
        .hero-left { flex: 1; padding: 5rem 3rem 4rem; display: flex; flex-direction: column; justify-content: center; max-width: 600px; position: relative; z-index: 2; }
        .hero-right { flex: 1; position: relative; overflow: hidden; }
        .hero-img { position: absolute; inset: 0; background-size: cover; background-position: center; transition: opacity 1.5s ease; filter: sepia(0.3) brightness(0.9); }
        .hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to right, var(--cream) 0%, transparent 60%); }
        .hero-eyebrow { font-family: 'Raleway', sans-serif; font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
        .hero-eyebrow::before { content: ''; width: 40px; height: 1px; background: var(--gold); }
        .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 900; line-height: 0.95; color: var(--ink); margin-bottom: 1.5rem; }
        .hero-h1 em { font-style: italic; color: var(--gold); }
        .hero-sub { font-size: 1.1rem; line-height: 1.85; color: var(--sepia); max-width: 420px; margin-bottom: 2.5rem; font-style: italic; }
        .hero-cta { display: inline-flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary { font-family: 'Raleway', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; background: var(--ink); color: var(--cream); border: none; padding: 1rem 2.2rem; cursor: pointer; transition: all 0.2s; font-weight: 600; }
        .btn-primary:hover { background: var(--sepia); transform: translateY(-1px); }
        .btn-ghost { font-family: 'Raleway', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; background: none; color: var(--sepia); border: 1px solid var(--border); padding: 1rem 1.5rem; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { border-color: var(--sepia); color: var(--ink); }
        .hero-caption { position: absolute; bottom: 2rem; right: 3rem; z-index: 2; text-align: right; }
        .hero-cap-label { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--sepia); opacity: 0.7; margin-bottom: 0.3rem; }
        .hero-cap-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-style: italic; color: var(--ink); }
        .hero-cap-author { font-family: 'Raleway', sans-serif; font-size: 0.6rem; color: var(--sepia); margin-top: 0.2rem; }
        .hero-dots { position: absolute; bottom: 2rem; left: 3rem; display: flex; gap: 6px; z-index: 2; }
        .hdot { width: 20px; height: 2px; background: var(--border); transition: all 0.4s; }
        .hdot.act { background: var(--gold); width: 36px; }

        /* STRIP */
        .strip { background: var(--ink); padding: 0.7rem 0; overflow: hidden; }
        .strip-inner { display: flex; gap: 3rem; animation: slide 35s linear infinite; white-space: nowrap; }
        .strip-inner span { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(245,240,232,0.5); }
        .strip-inner span::before { content: '✦  '; color: var(--gold); }
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* QUOTE */
        .quote-band { background: var(--parchment); padding: 5rem 3rem; text-align: center; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .qmark { font-family: 'Playfair Display', serif; font-size: 5rem; line-height: 0.4; color: var(--gold); opacity: 0.4; }
        .qtext { font-family: 'Playfair Display', serif; font-size: clamp(1.3rem, 2.5vw, 1.9rem); font-style: italic; line-height: 1.6; color: var(--ink); max-width: 800px; margin: 1.5rem auto; }
        .qauthor { font-family: 'Raleway', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }

        /* LIBRARY */
        .lib { background: var(--light); }
        .lib-head { padding: 4rem 3rem 2rem; display: flex; align-items: baseline; justify-content: space-between; border-bottom: 1px solid var(--border); }
        .lib-title { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 700; }
        .lib-count { font-family: 'Raleway', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sepia); }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .bcard { position: relative; overflow: hidden; cursor: pointer; border: 0.5px solid var(--border); aspect-ratio: 2/3; background: var(--parchment); }
        .bimg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: sepia(0.25) brightness(0.85); transition: transform 0.7s ease, filter 0.5s ease; }
        .bcard:hover .bimg { transform: scale(1.06); filter: sepia(0.4) brightness(0.6); }
        .bgrad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(42,31,20,0.96) 0%, rgba(42,31,20,0.3) 55%, transparent 100%); transition: opacity 0.4s; }
        .bcard:hover .bgrad { opacity: 1; }
        .binfo { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.3rem; }
        .bgenre { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; color: #d4a843; margin-bottom: 0.4rem; }
        .btitle { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 700; line-height: 1.2; color: #f5f0e8; margin-bottom: 0.2rem; }
        .bauthor { font-family: 'Raleway', sans-serif; font-size: 0.6rem; color: rgba(245,240,232,0.5); margin-bottom: 0.8rem; }
        .bquote { font-family: 'EB Garamond', serif; font-size: 0.8rem; font-style: italic; color: rgba(245,240,232,0.55); line-height: 1.5; margin-bottom: 0.8rem; opacity: 0; transform: translateY(6px); transition: all 0.3s ease; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bcard:hover .bquote { opacity: 1; transform: translateY(0); }
        .bbegin { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase; color: #d4a843; opacity: 0; transform: translateY(6px); transition: all 0.3s ease 0.05s; }
        .bcard:hover .bbegin { opacity: 1; transform: translateY(0); }

        /* FOOTER */
        .footer { background: var(--ink); color: rgba(245,240,232,0.4); padding: 3rem; text-align: center; }
        .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 900; letter-spacing: 0.2em; color: rgba(245,240,232,0.3); margin-bottom: 0.8rem; }
        .footer-text { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.25em; text-transform: uppercase; }

        /* EXPERIENCE */
        .exp { position: fixed; inset: 0; z-index: 300; background: var(--light); display: flex; flex-direction: column; overflow-y: auto; }
        .exp-visual { position: relative; height: 40vh; min-height: 240px; overflow: hidden; flex-shrink: 0; }
        .exp-visual-img { position: absolute; inset: 0; background-size: cover; background-position: center; filter: sepia(0.3) brightness(0.7); }
        .exp-visual-grad { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(245,240,232,0.1) 0%, var(--light) 100%); }
        .exp-topbar { position: absolute; top: 0; left: 0; right: 0; padding: 1.5rem 2.5rem; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(to bottom, rgba(42,31,20,0.5) 0%, transparent 100%); }
        .exp-booktitle { font-family: 'Playfair Display', serif; font-size: 1rem; font-style: italic; color: #f5f0e8; }
        .back-btn { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase; border: 1px solid rgba(245,240,232,0.3); color: rgba(245,240,232,0.7); background: rgba(42,31,20,0.4); padding: 0.4rem 1rem; cursor: pointer; transition: all 0.2s; }
        .back-btn:hover { background: rgba(42,31,20,0.7); color: #f5f0e8; }
        .exp-prog { position: absolute; bottom: 1.5rem; left: 2.5rem; right: 2.5rem; display: flex; gap: 4px; align-items: center; }
        .pbar { height: 2px; flex: 1; background: rgba(245,240,232,0.2); transition: background 0.4s; }
        .pbar.done { background: rgba(245,240,232,0.6); }
        .pbar.act { background: #f5f0e8; }
        .plabel { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(245,240,232,0.5); margin-left: 0.8rem; }
        .exp-body { flex: 1; padding: 2.5rem; max-width: 700px; width: 100%; margin: 0 auto; }
        .scene-extract { font-family: 'Playfair Display', serif; font-size: 1rem; font-style: italic; color: var(--gold); border-left: 2px solid rgba(184,134,11,0.3); padding-left: 1rem; margin-bottom: 1.5rem; line-height: 1.7; }
        .scene-eye { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--sepia); margin-bottom: 0.5rem; }
        .scene-ttl { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 700; line-height: 1.1; color: var(--ink); margin-bottom: 1.3rem; }
        .scene-narr { font-size: 1.05rem; line-height: 1.95; color: var(--ink); opacity: 0.85; margin-bottom: 2rem; }
        .choice-q { font-family: 'Raleway', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
        .choices { display: flex; flex-direction: column; gap: 8px; margin-bottom: 2rem; }
        .choice-btn { background: var(--parchment); border: 1px solid var(--border); padding: 1rem 1.2rem; font-family: 'EB Garamond', serif; font-size: 1rem; color: var(--ink); cursor: pointer; text-align: left; line-height: 1.65; transition: all 0.2s; position: relative; }
        .choice-btn:hover { border-color: var(--sepia); background: #e8e0cc; padding-left: 1.7rem; }
        .choice-btn::before { content: '→'; position: absolute; left: 0.7rem; top: 50%; transform: translateY(-50%); color: var(--gold); opacity: 0; transition: opacity 0.2s; font-size: 0.9rem; }
        .choice-btn:hover::before { opacity: 1; }
        .choice-btn.orig { border-color: rgba(139,107,69,0.1); }
        .orig-label { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); opacity: 0.6; display: block; margin-bottom: 0.3rem; }
        .loading-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 0; gap: 1.2rem; }
        .spinner { width: 36px; height: 36px; border: 1px solid var(--border); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-msg { font-family: 'Playfair Display', serif; font-style: italic; color: var(--sepia); font-size: 1rem; }
        .path-tag { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sepia); border: 1px solid var(--border); padding: 0.25rem 0.8rem; display: inline-block; margin-bottom: 1.2rem; background: var(--parchment); }
        .error-box { background: #fdf0f0; border: 1px solid rgba(180,80,80,0.3); padding: 1.5rem; color: #8b3333; font-family: 'Raleway', sans-serif; font-size: 0.8rem; line-height: 1.6; margin-bottom: 1rem; }
        .end-card { background: var(--parchment); border: 1px solid var(--border); padding: 2.5rem; }
        .end-label { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
        .end-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: var(--ink); margin-bottom: 1rem; }
        .end-text { font-size: 1.05rem; line-height: 1.9; font-style: italic; color: var(--sepia); margin-bottom: 2rem; }
        .end-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
        .end-btn { font-family: 'Raleway', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.7rem 1.5rem; cursor: pointer; transition: all 0.2s; background: none; border: 1px solid var(--sepia); color: var(--sepia); }
        .end-btn:hover { background: var(--sepia); color: var(--cream); }
        .end-btn.pri { background: var(--ink); color: var(--cream); border-color: var(--ink); }
        .end-btn.pri:hover { background: var(--sepia); border-color: var(--sepia); }

        @media (max-width: 900px) {
          .hero { flex-direction: column; }
          .hero-right { height: 40vh; }
          .hero-img-overlay { background: linear-gradient(to bottom, transparent 0%, var(--cream) 100%); }
          .grid { grid-template-columns: repeat(2, 1fr); }
          .nav { padding: 1rem 1.5rem; }
          .hero-left { padding: 5rem 1.5rem 3rem; }
          .exp-body { padding: 1.5rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div>
          <div className="logo">UN<em>DECIDED</em></div>
          <div className="nav-tag">Choose your story</div>
        </div>
        <div className="nav-right">
          <button className="nav-link" onClick={() => setPage("library")}>Library</button>
          <button className="nav-btn" onClick={() => setPage("library")}>Begin Reading →</button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-left">
              <div className="hero-eyebrow">Interactive Cinematic Adaptations</div>
              <h1 className="hero-h1">The classics,<br /><em>reimagined.</em></h1>
              <p className="hero-sub">Pick a novel. Shape the story. Discover what happens when you decide.</p>
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => setPage("library")}>Enter the Library</button>
                <button className="btn-ghost" onClick={() => openBook(BOOKS[0])}>▶ Try Le Rouge et le Noir</button>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-img" style={{ backgroundImage: `url(${hero.bg})` }} />
              <div className="hero-img-overlay" />
            </div>
            <div className="hero-caption">
              <div className="hero-cap-label">Now Showing</div>
              <div className="hero-cap-title">{hero.title}</div>
              <div className="hero-cap-author">{hero.author}, {hero.year}</div>
            </div>
            <div className="hero-dots">
              {[0,1,2,3,4,5,6,7].map(i => <div key={i} className={`hdot ${i === heroIdx % 8 ? "act" : ""}`} />)}
            </div>
          </section>

          <div className="strip">
            <div className="strip-inner">
              {[...BOOKS, ...BOOKS].map((b, i) => <span key={i}>{b.title}</span>)}
            </div>
          </div>

          <div className="quote-band">
            <div className="qmark">"</div>
            <div className="qtext">{hero.quote}</div>
            <div className="qauthor">— {hero.author}, {hero.title}</div>
          </div>

          <div className="lib">
            <div className="lib-head">
              <div className="lib-title">The Library</div>
              <div className="lib-count">{BOOKS.length} masterworks</div>
            </div>
            <div className="grid">
              {BOOKS.map(b => (
                <div key={b.id} className="bcard" onClick={() => openBook(b)}>
                  <div className="bimg" style={{ backgroundImage: `url(${b.bg})` }} />
                  <div className="bgrad" />
                  <div className="binfo">
                    <div className="bgenre">{b.genre}</div>
                    <div className="btitle">{b.title}</div>
                    <div className="bauthor">{b.author} · {b.year}</div>
                    <div className="bquote">"{b.quote}"</div>
                    <div className="bbegin">Begin your story →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="footer">
            <div className="footer-logo">UNDECIDED</div>
            <div className="footer-text">Interactive cinematic adaptations of classic literature</div>
          </footer>
        </>
      )}

      {/* LIBRARY PAGE */}
      {page === "library" && (
        <div style={{ paddingTop: "4rem" }}>
          <div className="lib">
            <div className="lib-head">
              <div className="lib-title">The Library</div>
              <div className="lib-count">{BOOKS.length} masterworks · choose your story</div>
            </div>
            <div className="grid">
              {BOOKS.map(b => (
                <div key={b.id} className="bcard" onClick={() => openBook(b)}>
                  <div className="bimg" style={{ backgroundImage: `url(${b.bg})` }} />
                  <div className="bgrad" />
                  <div className="binfo">
                    <div className="bgenre">{b.genre}</div>
                    <div className="btitle">{b.title}</div>
                    <div className="bauthor">{b.author} · {b.year}</div>
                    <div className="bquote">"{b.quote}"</div>
                    <div className="bbegin">Begin your story →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {page === "experience" && selectedBook && (
        <div className="exp">
          <div className="exp-visual">
            <div className="exp-visual-img" style={{ backgroundImage: `url(${selectedBook.bg})` }} />
            <div className="exp-visual-grad" />
            <div className="exp-topbar">
              <div className="exp-booktitle">{selectedBook.title}</div>
              <button className="back-btn" onClick={() => setPage("library")}>← Library</button>
            </div>
            {!ending && (
              <div className="exp-prog">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`pbar ${i < sceneIndex ? "done" : i === sceneIndex ? "act" : ""}`} />
                ))}
                <span className="plabel">Scene {sceneIndex + 1} / 4</span>
              </div>
            )}
          </div>

          <div className="exp-body">
            {loading && !currentScene && !ending && (
              <div className="loading-wrap">
                <div className="spinner" />
                <div className="loading-msg">
                  {ending ? "Writing your ending..." : "The story unfolds..."}
                </div>
              </div>
            )}

            {error && (
              <div className="error-box">
                ⚠ {error}
                <br /><br />
                <button className="btn-ghost" style={{fontSize:'0.65rem'}} onClick={() => openBook(selectedBook)}>Try again</button>
              </div>
            )}

            {currentScene && !loading && !ending && (
              <>
                {choices.length > 0 && (
                  <div className="path-tag">Your path: {choices[choices.length-1].substring(0,60)}...</div>
                )}
                {currentScene.extract && (
                  <div className="scene-extract">"{currentScene.extract}"</div>
                )}
                <div className="scene-eye">{currentScene.header}</div>
                <div className="scene-ttl">{currentScene.title}</div>
                <div className="scene-narr">{currentScene.narration}</div>
                <div className="choice-q">{currentScene.choicePrompt}</div>
                <div className="choices">
                  {currentScene.choices?.map((c, i) => (
                    <button key={i} className={`choice-btn ${c.original ? "orig" : ""}`} onClick={() => makeChoice(c)}>
                      {c.original && <span className="orig-label">Stendhal's original path</span>}
                      {c.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {ending && (
              <div className="end-card">
                <div className="end-label">Your ending · {selectedBook.title}</div>
                <div className="end-title">{ending.endingTitle}</div>
                <div className="end-text">{ending.endingText}</div>
                <div className="end-actions">
                  <button className="end-btn pri" onClick={() => openBook(selectedBook)}>Another path →</button>
                  <button className="end-btn" onClick={() => setPage("library")}>Choose another book</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
