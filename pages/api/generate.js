import { useState, useEffect, useRef } from "react";

const BOOKS = [
  { id: "monte", title: "The Count of Monte Cristo", author: "Alexandre Dumas", year: 1844, genre: "Adventure", quote: "All human wisdom is contained in these two words: Wait and Hope.", description: "A wrongly imprisoned sailor returns as a wealthy count to exact elaborate revenge on his enemies.", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=90" },
  { id: "rouge", title: "Le Rouge et le Noir", author: "Stendhal", year: 1830, genre: "Psychological Drama", quote: "He was not wicked enough for the world, nor good enough for solitude.", description: "A young man of humble birth navigates ambition, love and hypocrisy in post-Napoleonic France.", img: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=1400&q=90" },
  { id: "anna", title: "Anna Karenina", author: "Tolstoy", year: 1878, genre: "Tragedy", quote: "All happy families are alike; each unhappy family is unhappy in its own way.", description: "A passionate affair tears apart the life of a Russian aristocrat trapped between love and society.", img: "https://images.unsplash.com/photo-1551292831-023188e78222?w=1400&q=90" },
  { id: "crime", title: "Crime and Punishment", author: "Dostoevsky", year: 1866, genre: "Psychological Thriller", quote: "Pain and suffering are always inevitable for a large intelligence.", description: "A student commits murder to test a theory of moral superiority — and is destroyed by his own conscience.", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=90" },
  { id: "miserable", title: "Les Misérables", author: "Victor Hugo", year: 1862, genre: "Epic Drama", quote: "Even the darkest night will end and the sun will rise.", description: "An ex-convict's pursuit of redemption against the backdrop of revolutionary Paris.", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=90" },
  { id: "gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "American Tragedy", quote: "So we beat on, boats against the current, borne back ceaselessly into the past.", description: "A mysterious millionaire's obsessive pursuit of a lost love in the glittering 1920s.", img: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1400&q=90" },
  { id: "pride", title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance", quote: "It is a truth universally acknowledged...", description: "Five sisters navigate marriage, money and misunderstanding in Regency England.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=90" },
  { id: "bovary", title: "Madame Bovary", author: "Flaubert", year: 1857, genre: "Realist Drama", quote: "She wanted to die, but she also wanted to live in Paris.", description: "A doctor's wife seeks escape from provincial boredom through romantic fantasy and ruin.", img: "https://images.unsplash.com/photo-1490750967868-88df5691cc8e?w=1400&q=90" },
  { id: "brothers", title: "The Brothers Karamazov", author: "Dostoevsky", year: 1880, genre: "Philosophical Drama", quote: "Beauty will save the world.", description: "Three brothers, a murdered father, and the darkest questions about God, free will and suffering.", img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1400&q=90" },
  { id: "war", title: "War and Peace", author: "Tolstoy", year: 1869, genre: "Epic", quote: "We can know only that we know nothing.", description: "Five aristocratic families live through Napoleon's invasion of Russia.", img: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1400&q=90" },
  { id: "jane", title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, genre: "Gothic Romance", quote: "I am no bird; and no net ensnares me.", description: "A governess falls for her brooding employer — and uncovers the secret locked in his house.", img: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1400&q=90" },
  { id: "wuthering", title: "Wuthering Heights", author: "Emily Brontë", year: 1847, genre: "Gothic Drama", quote: "Whatever our souls are made of, his and mine are the same.", description: "A destructive passion between a foundling and a girl of the moors spans two generations.", img: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1400&q=90" },
  { id: "pere", title: "Père Goriot", author: "Honoré de Balzac", year: 1835, genre: "Social Drama", quote: "The secret of great fortunes without apparent cause is a crime forgotten.", description: "A naive student discovers the brutal machinery of Parisian society through a devoted, ruined father.", img: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1400&q=90" },
  { id: "great", title: "Great Expectations", author: "Charles Dickens", year: 1861, genre: "Coming of Age", quote: "I loved her against reason, against promise, against hope.", description: "An orphan boy's mysterious fortune transforms him — and tests who he truly is.", img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1400&q=90" },
  { id: "idiot", title: "The Idiot", author: "Dostoevsky", year: 1869, genre: "Tragedy", quote: "Beauty will save the world.", description: "A pure-hearted prince is destroyed by the corrupt society he tries to redeem.", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=90" },
  { id: "germinal", title: "Germinal", author: "Émile Zola", year: 1885, genre: "Social Drama", quote: "Men might die, but the idea would live on.", description: "A young miner leads a desperate strike in the coal fields of northern France.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=90" },
  { id: "chartreuse", title: "The Charterhouse of Parma", author: "Stendhal", year: 1839, genre: "Political Drama", quote: "One can acquire everything in solitude except character.", description: "A young Italian nobleman chases glory, love and intrigue across Napoleonic Europe.", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1400&q=90" },
  { id: "oblomov", title: "Oblomov", author: "Ivan Goncharov", year: 1859, genre: "Psychological Comedy", quote: "His whole existence was made up of a morning that had not yet turned into a day.", description: "A Russian nobleman's magnificent, catastrophic inability to get out of bed.", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1400&q=90" },
  { id: "demons", title: "Demons", author: "Dostoevsky", year: 1872, genre: "Political Thriller", quote: "If God does not exist, everything is permitted.", description: "A provincial town is infiltrated by revolutionary nihilists with terrifying consequences.", img: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1400&q=90" },
  { id: "lys", title: "Le Lys dans la Vallée", author: "Honoré de Balzac", year: 1836, genre: "Romantic Drama", quote: "Love is the poetry of the senses.", description: "A young man's impossible love for a virtuous married woman destroys them both.", img: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=1400&q=90" }
];

const CINEMATIC_IMAGES = [
  "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1800&q=95",
  "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=1800&q=95",
  "https://images.unsplash.com/photo-1551292831-023188e78222?w=1800&q=95",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&q=95",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1800&q=95",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=95",
];

export default function Undecided() {
  const [page, setPage] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showChoices, setShowChoices] = useState(false);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(null);
  const [error, setError] = useState(null);
  const [bgIdx, setBgIdx] = useState(0);
  const [prevBgIdx, setPrevBgIdx] = useState(null);
  const [fading, setFading] = useState(false);
  const typeRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPrevBgIdx(bgIdx);
        setBgIdx(i => (i + 1) % CINEMATIC_IMAGES.length);
        setFading(false);
      }, 1000);
    }, 6000);
    return () => clearInterval(t);
  }, [bgIdx]);

  function typewrite(text, onDone) {
    setDisplayedText("");
    setShowChoices(false);
    let i = 0;
    clearInterval(typeRef.current);
    typeRef.current = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(typeRef.current);
        setTimeout(() => setShowChoices(true), 800);
        if (onDone) onDone();
      }
    }, 22);
  }

  async function callClaude(prompt) {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      const text = data.content?.[0]?.text || "";
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON in response");
      return JSON.parse(match[0]);
    } catch (e) {
      console.error(e);
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
    setDisplayedText("");
    setShowChoices(false);
    setLoading(true);

    const scene = await callClaude(`You are the narrator of a Hollywood-quality cinematic adaptation of "${book.title}" by ${book.author} (${book.year}).

Write the opening of this film — the first scene that would appear on screen. Cinematic, vivid, psychologically rich. Think Pierre Niney in The Count of Monte Cristo — dramatic, visual, emotionally immediate. Never dumbed down.

Return ONLY valid JSON with no markdown backticks:
{
  "header": "Part One — [setting, year]",
  "title": "[evocative scene title, 3-5 words]",
  "opening": "[A single powerful line that appears on screen first, like a film title card]",
  "narration": "[The cinematic narration — 5-6 sentences. Written to be READ ON SCREEN like a voiceover. Vivid. Dramatic. Each sentence lands like a cut in a film. Present tense. Psychologically intense. True to ${book.author}'s world.]",
  "choicePrompt": "[The dramatic question this moment raises for the audience]",
  "choices": [
    {"text": "[Choice A — specific action, 1-2 sentences]", "outcome": "a"},
    {"text": "[Choice B — contrasting action]", "outcome": "b"},
    {"text": "[Choice C — unexpected path]", "outcome": "c"},
    {"text": "[${book.author}'s original path — what actually happens in the novel]", "outcome": "original", "original": true}
  ]
}`);

    setLoading(false);
    if (scene) {
      setCurrentScene(scene);
      typewrite(scene.narration);
    } else {
      setError("Could not connect. Please check that your Anthropic API key is correctly set in Vercel → Settings → Environment Variables, then redeploy.");
    }
  }

  async function makeChoice(choice) {
    const newChoices = [...choices, choice.text];
    setChoices(newChoices);
    const nextIndex = sceneIndex + 1;
    setError(null);
    setShowChoices(false);
    setDisplayedText("");
    setCurrentScene(null);

    if (nextIndex >= 4) {
      setLoading(true);
      const end = await callClaude(`You are concluding a cinematic adaptation of "${selectedBook.title}" by ${selectedBook.author}.
Reader's path: ${newChoices.join(" → ")}
Write a final scene — 5 sentences, like the closing frames of a great film. Haunting. Specific to this path. End with one line that captures the novel's deepest truth.
Return ONLY JSON: {"endingTitle": "[3-4 word poetic title]", "endingText": "[the final scene narration]"}`);
      setLoading(false);
      setEnding(end || { endingTitle: "The Story Ends", endingText: "Every great novel contains multitudes. You have walked one path through it. The others wait." });
      return;
    }

    setSceneIndex(nextIndex);
    setLoading(true);

    const next = await callClaude(`You are narrating scene ${nextIndex + 1} of 4 in a cinematic adaptation of "${selectedBook.title}" by ${selectedBook.author}.
Reader's choices so far: ${newChoices.join(" → ")}
Last choice: "${choice.text}"

Continue the story cinematically. Show the immediate consequences of the choice. Maintain dramatic momentum. Stay true to ${selectedBook.author}'s psychological depth.

Return ONLY valid JSON with no markdown:
{
  "header": "[Part — setting]",
  "title": "[scene title]",
  "opening": "[a powerful single line that opens this scene]",
  "narration": "[5-6 sentences of cinematic voiceover narration. Present tense. Vivid. Dramatically immediate. React to the choice made.]",
  "choicePrompt": "[The dramatic question this moment raises]",
  "choices": [
    {"text": "[Choice A]", "outcome": "a"},
    {"text": "[Choice B]", "outcome": "b"},
    {"text": "[Choice C]", "outcome": "c"},
    {"text": "[${selectedBook.author}'s original path]", "outcome": "original", "original": true}
  ]
}`);

    setLoading(false);
    if (next) {
      setCurrentScene(next);
      typewrite(next.narration);
    } else {
      setError("Could not generate next scene. Try again.");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Raleway:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080608; color: #f0ebe0; font-family: 'EB Garamond', serif; min-height: 100vh; overflow-x: hidden; }
        :root {
          --gold: #c8a84b;
          --gold2: #e8c97a;
          --cream: #f0ebe0;
          --dim: #7a6e5e;
          --deep: #080608;
          --border: rgba(200,168,75,0.2);
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080608; }
        ::-webkit-scrollbar-thumb { background: var(--gold); }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 500;
          padding: 1.2rem 3rem;
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(to bottom, rgba(8,6,8,0.9) 0%, transparent 100%);
        }
        .logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 900; letter-spacing: 0.2em; color: var(--cream); text-transform: uppercase; cursor: pointer; }
        .logo em { color: var(--gold); font-style: normal; }
        .nav-tag { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--dim); }
        .nav-btn { font-family: 'Raleway', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; background: none; border: 1px solid var(--border); color: var(--gold); padding: 0.5rem 1.2rem; cursor: pointer; transition: all 0.2s; }
        .nav-btn:hover { background: var(--gold); color: var(--deep); }

        /* HOME — CINEMATIC HERO */
        .home { position: relative; min-height: 100vh; overflow: hidden; }

        /* BACKGROUND LAYERS — cinematic crossfade */
        .bg-layer {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 1.2s ease;
        }
        .bg-layer.visible { opacity: 1; }
        .bg-layer.hidden { opacity: 0; }

        /* CINEMATIC OVERLAYS */
        .vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 30%, rgba(8,6,8,0.85) 100%);
          z-index: 1;
        }
        .bottom-grad {
          position: absolute; bottom: 0; left: 0; right: 0; height: 70%;
          background: linear-gradient(to top, #080608 0%, transparent 100%);
          z-index: 2;
        }
        .top-grad {
          position: absolute; top: 0; left: 0; right: 0; height: 30%;
          background: linear-gradient(to bottom, rgba(8,6,8,0.6) 0%, transparent 100%);
          z-index: 2;
        }

        /* FILM GRAIN */
        .grain {
          position: absolute; inset: 0; z-index: 3; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* LETTERBOX BARS */
        .letterbox-top { position: absolute; top: 0; left: 0; right: 0; height: 6vh; background: #080608; z-index: 10; }
        .letterbox-bot { position: absolute; bottom: 0; left: 0; right: 0; height: 6vh; background: #080608; z-index: 10; }

        /* HERO CONTENT */
        .hero-content {
          position: relative; z-index: 5;
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 6vh 3rem 14vh;
        }
        .hero-eyebrow {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.5em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1.5rem; opacity: 0.8;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 900; line-height: 0.88;
          color: var(--cream); margin-bottom: 1.5rem;
          text-shadow: 0 4px 60px rgba(0,0,0,0.8);
          letter-spacing: -0.01em;
        }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-sub {
          font-size: 1.1rem; line-height: 1.8; font-style: italic;
          color: rgba(240,235,224,0.55); max-width: 480px; margin-bottom: 3rem;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .btn-gold {
          font-family: 'Raleway', sans-serif; font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
          background: var(--gold); color: #080608; border: none; padding: 1rem 2.5rem; cursor: pointer;
          transition: all 0.2s; font-weight: 600;
        }
        .btn-gold:hover { background: var(--gold2); transform: translateY(-2px); }
        .btn-outline {
          font-family: 'Raleway', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          background: none; color: rgba(240,235,224,0.6); border: 1px solid rgba(240,235,224,0.2);
          padding: 1rem 1.8rem; cursor: pointer; transition: all 0.2s;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

        /* BOOK TICKER — current feature */
        .feature-tag {
          position: absolute; bottom: 10vh; right: 3rem; z-index: 5;
          text-align: right;
        }
        .ft-label { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--dim); margin-bottom: 0.4rem; }
        .ft-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-style: italic; color: var(--cream); }
        .ft-author { font-family: 'Raleway', sans-serif; font-size: 0.6rem; color: var(--dim); margin-top: 0.2rem; }

        /* PROGRESS DOTS */
        .hero-dots { position: absolute; bottom: 10vh; left: 3rem; z-index: 5; display: flex; gap: 8px; align-items: center; }
        .hdot { width: 24px; height: 2px; background: rgba(200,168,75,0.25); transition: all 0.5s; }
        .hdot.on { background: var(--gold); width: 40px; }

        /* MARQUEE */
        .marquee { background: var(--gold); padding: 0.65rem 0; overflow: hidden; position: relative; z-index: 20; }
        .marquee-track { display: flex; gap: 2.5rem; animation: march 40s linear infinite; white-space: nowrap; }
        .marquee-track span { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(8,6,8,0.7); font-weight: 600; }
        .marquee-track span::before { content: '✦  '; }
        @keyframes march { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ABOUT STRIP */
        .about { display: flex; min-height: 50vh; }
        .about-text { flex: 1; padding: 5rem 3rem; display: flex; flex-direction: column; justify-content: center; background: #0d0b0f; }
        .about-eyebrow { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
        .about-eyebrow::before { content: ''; width: 30px; height: 1px; background: var(--gold); }
        .about-h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; line-height: 1.2; color: var(--cream); margin-bottom: 1.2rem; }
        .about-p { font-size: 1.05rem; line-height: 1.9; color: var(--dim); font-style: italic; max-width: 480px; }
        .about-visual { flex: 1; position: relative; overflow: hidden; min-height: 300px; }
        .about-imgs { position: absolute; inset: 0; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px; }
        .about-img { background-size: cover; background-position: center; filter: sepia(0.3) brightness(0.7); }

        /* BOOKS GRID */
        .books-section { background: var(--deep); }
        .books-head { padding: 4rem 3rem 2rem; display: flex; align-items: baseline; justify-content: space-between; }
        .books-h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; color: var(--cream); }
        .books-count { font-family: 'Raleway', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--dim); }
        .books-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: rgba(200,168,75,0.08); }
        .bcard { position: relative; overflow: hidden; cursor: pointer; aspect-ratio: 2/3; }
        .bcard-img { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.45) saturate(0.6); transition: transform 0.7s ease, filter 0.5s; }
        .bcard:hover .bcard-img { transform: scale(1.08); filter: brightness(0.25) saturate(0.4); }
        .bcard-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,6,8,0.98) 0%, rgba(8,6,8,0.2) 60%, transparent 100%); }
        .bcard-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.2rem; }
        .bcard-genre { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.4rem; opacity: 0.7; }
        .bcard-title { font-family: 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; line-height: 1.2; color: var(--cream); margin-bottom: 0.2rem; }
        .bcard-author { font-family: 'Raleway', sans-serif; font-size: 0.55rem; color: var(--dim); margin-bottom: 0.6rem; }
        .bcard-quote { font-size: 0.78rem; font-style: italic; color: rgba(240,235,224,0.4); line-height: 1.5; opacity: 0; transform: translateY(6px); transition: all 0.3s; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bcard:hover .bcard-quote { opacity: 1; transform: none; }
        .bcard-cta { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); opacity: 0; transform: translateY(6px); transition: all 0.3s 0.05s; margin-top: 0.6rem; }
        .bcard:hover .bcard-cta { opacity: 1; transform: none; }

        /* FOOTER */
        .footer { background: #04030a; border-top: 1px solid var(--border); padding: 3rem; text-align: center; }
        .footer-logo { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; letter-spacing: 0.25em; color: rgba(240,235,224,0.15); margin-bottom: 0.8rem; }
        .footer-text { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--dim); opacity: 0.5; }

        /* EXPERIENCE — CINEMATIC */
        .exp { position: fixed; inset: 0; z-index: 400; background: #080608; display: flex; flex-direction: column; overflow-y: auto; }
        .exp-cinematic { position: relative; height: 45vh; min-height: 260px; overflow: hidden; flex-shrink: 0; }
        .exp-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.3) saturate(0.5); }
        .exp-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 20%, rgba(8,6,8,0.7) 100%); }
        .exp-grad { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(8,6,8,0.3) 0%, #080608 100%); }
        .exp-bars-t { position: absolute; top: 0; left: 0; right: 0; height: 5vh; background: #080608; }
        .exp-bars-b { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); opacity: 0.3; }
        .exp-topnav { position: absolute; top: 5vh; left: 0; right: 0; padding: 1rem 2.5rem; display: flex; justify-content: space-between; align-items: center; z-index: 2; }
        .exp-title-label { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: rgba(240,235,224,0.8); }
        .exp-back { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase; border: 1px solid rgba(240,235,224,0.2); color: rgba(240,235,224,0.5); background: rgba(8,6,8,0.5); padding: 0.4rem 1rem; cursor: pointer; transition: all 0.2s; }
        .exp-back:hover { border-color: var(--gold); color: var(--gold); }
        .exp-prog-wrap { position: absolute; bottom: 1.5rem; left: 2.5rem; right: 2.5rem; display: flex; gap: 4px; align-items: center; z-index: 2; }
        .exp-prog-bar { height: 2px; flex: 1; background: rgba(240,235,224,0.15); transition: background 0.4s; }
        .exp-prog-bar.done { background: rgba(240,235,224,0.4); }
        .exp-prog-bar.act { background: var(--gold); }
        .exp-prog-label { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(240,235,224,0.3); margin-left: 0.8rem; }
        .exp-scene-header {
          position: absolute; bottom: 4rem; left: 2.5rem; z-index: 2;
        }
        .exp-scene-eye { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); opacity: 0.7; margin-bottom: 0.3rem; }
        .exp-scene-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--cream); text-shadow: 0 2px 20px rgba(0,0,0,0.8); }

        /* CINEMATIC TEXT AREA */
        .exp-body { flex: 1; padding: 2.5rem; max-width: 760px; width: 100%; margin: 0 auto; }
        .exp-opening {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-style: italic;
          color: var(--gold); opacity: 0.7;
          border-left: 2px solid rgba(200,168,75,0.3);
          padding-left: 1rem; margin-bottom: 1.8rem; line-height: 1.7;
        }
        .exp-narration {
          font-family: 'EB Garamond', serif;
          font-size: 1.15rem; line-height: 2; color: var(--cream);
          opacity: 0.9; margin-bottom: 2rem;
          min-height: 8rem;
        }
        .cursor { display: inline-block; width: 2px; height: 1.1em; background: var(--gold); margin-left: 2px; animation: blink 1s step-end infinite; vertical-align: text-bottom; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .choice-divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .choice-line { flex: 1; height: 1px; background: var(--border); }
        .choice-q { font-family: 'Raleway', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }
        .choices { display: flex; flex-direction: column; gap: 8px; margin-bottom: 2rem; }
        .choice-btn {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(200,168,75,0.12);
          padding: 1rem 1.3rem; font-family: 'EB Garamond', serif; font-size: 1rem;
          color: var(--cream); cursor: pointer; text-align: left; line-height: 1.7;
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .choice-btn::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: rgba(200,168,75,0.08); transition: width 0.3s; }
        .choice-btn:hover::before { width: 100%; }
        .choice-btn:hover { border-color: var(--gold); padding-left: 2rem; }
        .choice-arrow { position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); color: var(--gold); opacity: 0; transition: opacity 0.2s; font-size: 0.8rem; }
        .choice-btn:hover .choice-arrow { opacity: 1; }
        .orig-tag { display: block; font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); opacity: 0.5; margin-bottom: 0.3rem; }
        .loading-cine { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 0; gap: 1.5rem; }
        .cine-spinner { width: 40px; height: 40px; border: 1px solid rgba(200,168,75,0.2); border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cine-loading-text { font-family: 'Playfair Display', serif; font-style: italic; color: var(--dim); font-size: 1rem; }
        .path-crumb { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dim); border: 1px solid var(--border); padding: 0.25rem 0.8rem; display: inline-block; margin-bottom: 1.5rem; }
        .error-msg { background: rgba(180,60,60,0.08); border: 1px solid rgba(180,60,60,0.3); padding: 1.5rem; color: #c07070; font-family: 'Raleway', sans-serif; font-size: 0.8rem; line-height: 1.7; margin-bottom: 1rem; }
        .end-card { background: rgba(200,168,75,0.04); border: 1px solid var(--border); padding: 2.5rem; }
        .end-label { font-family: 'Raleway', sans-serif; font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
        .end-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: var(--cream); margin-bottom: 1.2rem; }
        .end-text { font-size: 1.1rem; line-height: 1.95; font-style: italic; color: var(--dim); margin-bottom: 2rem; }
        .end-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
        .end-btn { font-family: 'Raleway', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.7rem 1.5rem; cursor: pointer; transition: all 0.2s; }
        .end-btn.pri { background: var(--gold); color: var(--deep); border: none; }
        .end-btn.pri:hover { background: var(--gold2); }
        .end-btn.sec { background: none; border: 1px solid var(--border); color: var(--dim); }
        .end-btn.sec:hover { border-color: var(--gold); color: var(--gold); }

        @media (max-width: 1000px) { .books-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 700px) {
          .books-grid { grid-template-columns: repeat(2, 1fr); }
          .about { flex-direction: column; }
          .nav { padding: 1rem 1.5rem; }
          .hero-content { padding: 6vh 1.5rem 14vh; }
          .exp-body { padding: 1.5rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div onClick={() => setPage("home")} style={{cursor:"pointer"}}>
          <div className="logo">UN<em>DECIDED</em></div>
          <div className="nav-tag">Interactive Cinematic Literature</div>
        </div>
        <button className="nav-btn" onClick={() => setPage("library")}>The Library →</button>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <>
          <div className="home">
            {/* Cinematic background crossfade */}
            {CINEMATIC_IMAGES.map((img, i) => (
              <div key={i} className={`bg-layer ${i === bgIdx ? "visible" : "hidden"}`}
                style={{ backgroundImage: `url(${img})`, filter: "brightness(0.45) saturate(0.6) contrast(1.1)" }} />
            ))}
            <div className="vignette" />
            <div className="bottom-grad" />
            <div className="top-grad" />
            <div className="grain" />
            <div className="letterbox-top" />
            <div className="letterbox-bot" />

            <div className="hero-content">
              <div className="hero-eyebrow">Interactive Cinematic Adaptations</div>
              <h1 className="hero-title">
                The classics,<br /><em>reborn.</em>
              </h1>
              <p className="hero-sub">
                Pick a novel. Watch it come alive. Shape what happens next.
              </p>
              <div className="hero-actions">
                <button className="btn-gold" onClick={() => openBook(BOOKS[0])}>▶ Watch Monte Cristo</button>
                <button className="btn-outline" onClick={() => setPage("library")}>Browse the Library</button>
              </div>
            </div>

            <div className="feature-tag">
              <div className="ft-label">Now Showing</div>
              <div className="ft-title">{BOOKS[bgIdx % BOOKS.length].title}</div>
              <div className="ft-author">{BOOKS[bgIdx % BOOKS.length].author}</div>
            </div>

            <div className="hero-dots">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className={`hdot ${i === bgIdx % 6 ? "on" : ""}`} />
              ))}
            </div>
          </div>

          {/* MARQUEE */}
          <div className="marquee">
            <div className="marquee-track">
              {[...BOOKS, ...BOOKS].map((b, i) => <span key={i}>{b.title}</span>)}
            </div>
          </div>

          {/* ABOUT */}
          <div className="about">
            <div className="about-text">
              <div className="about-eyebrow">The Experience</div>
              <h2 className="about-h2">Not a summary.<br />A film you control.</h2>
              <p className="about-p">Every scene unfolds before you like a Hollywood adaptation — vivid, cinematic, psychologically true. At key moments, you decide what happens. Follow the original author's path, or write your own.</p>
            </div>
            <div className="about-visual">
              <div className="about-imgs">
                {CINEMATIC_IMAGES.slice(0,4).map((img, i) => (
                  <div key={i} className="about-img" style={{ backgroundImage: `url(${img})` }} />
                ))}
              </div>
            </div>
          </div>

          {/* BOOKS */}
          <div className="books-section">
            <div className="books-head">
              <div className="books-h2">The Library</div>
              <div className="books-count">{BOOKS.length} masterworks</div>
            </div>
            <div className="books-grid">
              {BOOKS.map(b => (
                <div key={b.id} className="bcard" onClick={() => openBook(b)}>
                  <div className="bcard-img" style={{ backgroundImage: `url(${b.img})` }} />
                  <div className="bcard-grad" />
                  <div className="bcard-info">
                    <div className="bcard-genre">{b.genre}</div>
                    <div className="bcard-title">{b.title}</div>
                    <div className="bcard-author">{b.author} · {b.year}</div>
                    <div className="bcard-quote">"{b.quote}"</div>
                    <div className="bcard-cta">Watch now →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="footer">
            <div className="footer-logo">UNDECIDED</div>
            <div className="footer-text">Interactive cinematic adaptations · undecided.com</div>
          </footer>
        </>
      )}

      {/* LIBRARY PAGE */}
      {page === "library" && (
        <div style={{ paddingTop: "4rem", background: "var(--deep)", minHeight: "100vh" }}>
          <div className="books-section">
            <div className="books-head">
              <div className="books-h2">The Library</div>
              <div className="books-count">{BOOKS.length} masterworks · choose your story</div>
            </div>
            <div className="books-grid">
              {BOOKS.map(b => (
                <div key={b.id} className="bcard" onClick={() => openBook(b)}>
                  <div className="bcard-img" style={{ backgroundImage: `url(${b.img})` }} />
                  <div className="bcard-grad" />
                  <div className="bcard-info">
                    <div className="bcard-genre">{b.genre}</div>
                    <div className="bcard-title">{b.title}</div>
                    <div className="bcard-author">{b.author} · {b.year}</div>
                    <div className="bcard-quote">"{b.quote}"</div>
                    <div className="bcard-cta">Watch now →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CINEMATIC EXPERIENCE */}
      {page === "experience" && selectedBook && (
        <div className="exp">
          <div className="exp-cinematic">
            <div className="exp-bg" style={{ backgroundImage: `url(${selectedBook.img})` }} />
            <div className="exp-vignette" />
            <div className="exp-grad" />
            <div className="exp-bars-t" />
            <div className="exp-bars-b" />
            <div className="exp-topnav">
              <div className="exp-title-label">{selectedBook.title}</div>
              <button className="exp-back" onClick={() => setPage("library")}>← Library</button>
            </div>
            {!ending && currentScene && (
              <div className="exp-scene-header">
                <div className="exp-scene-eye">{currentScene.header}</div>
                <div className="exp-scene-title">{currentScene.title}</div>
              </div>
            )}
            {!ending && (
              <div className="exp-prog-wrap">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`exp-prog-bar ${i < sceneIndex ? "done" : i === sceneIndex ? "act" : ""}`} />
                ))}
                <span className="exp-prog-label">Scene {sceneIndex + 1} / 4</span>
              </div>
            )}
          </div>

          <div className="exp-body">
            {loading && !currentScene && !ending && (
              <div className="loading-cine">
                <div className="cine-spinner" />
                <div className="cine-loading-text">The story unfolds...</div>
              </div>
            )}

            {error && (
              <div className="error-msg">⚠ {error}</div>
            )}

            {currentScene && !ending && (
              <>
                {choices.length > 0 && (
                  <div className="path-crumb">Your path: {choices[choices.length-1].substring(0,65)}...</div>
                )}
                {currentScene.opening && (
                  <div className="exp-opening">"{currentScene.opening}"</div>
                )}
                <div className="exp-narration">
                  {displayedText}
                  {!showChoices && <span className="cursor" />}
                </div>

                {showChoices && (
                  <>
                    <div className="choice-divider">
                      <div className="choice-line" />
                      <div className="choice-q">{currentScene.choicePrompt}</div>
                      <div className="choice-line" />
                    </div>
                    <div className="choices">
                      {currentScene.choices?.map((c, i) => (
                        <button key={i} className="choice-btn" onClick={() => makeChoice(c)}>
                          <span className="choice-arrow">→</span>
                          {c.original && <span className="orig-tag">The original path</span>}
                          {c.text}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {ending && (
              <div className="end-card">
                <div className="end-label">Your ending · {selectedBook.title}</div>
                <div className="end-title">{ending.endingTitle}</div>
                <div className="end-text">{ending.endingText}</div>
                <div className="end-actions">
                  <button className="end-btn pri" onClick={() => openBook(selectedBook)}>Another path →</button>
                  <button className="end-btn sec" onClick={() => setPage("library")}>Choose another book</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
