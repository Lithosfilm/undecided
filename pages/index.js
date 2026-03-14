import { useState, useEffect, useRef } from "react";

// Period-accurate public domain paintings from Wikimedia Commons
const HERO_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camille_Corot_-_Souvenir_of_Mortefontaine_-_Google_Art_Project.jpg/1280px-Camille_Corot_-_Souvenir_of_Mortefontaine_-_Google_Art_Project.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Delacroix_-_Weislingen_Captured_by_G%C3%B6tz%27s_Men.jpg/1280px-Delacroix_-_Weislingen_Captured_by_G%C3%B6tz%27s_Men.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bouguereau_-_Nymphs_and_Satyr_-_1873.jpg/905px-Bouguereau_-_Nymphs_and_Satyr_-_1873.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Ingres%2C_J._A._D._-_Odalisque_with_Slave.jpg/1280px-Ingres%2C_J._A._D._-_Odalisque_with_Slave.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ilya_Efimovich_Repin_%281844-1930%29_-_Volga_Boatmen_%281870-1873%29.jpg/1280px-Ilya_Efimovich_Repin_%281844-1930%29_-_Volga_Boatmen_%281870-1873%29.jpg",
];

const BOOKS = [
  {
    id: "monte", title: "The Count of Monte Cristo", author: "Alexandre Dumas", year: 1844,
    genre: "Adventure & Revenge",
    tagline: "Betrayed. Imprisoned. Reborn.",
    description: "Edmond Dantès — sailor, lover, innocent man — is destroyed by the jealousy of three men. He will return as someone else entirely.",
    quote: "All human wisdom is contained in these two words: Wait and Hope.",
    color: "#8B1A1A",
    painting: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Delacroix_-_Weislingen_Captured_by_G%C3%B6tz%27s_Men.jpg/1280px-Delacroix_-_Weislingen_Captured_by_G%C3%B6tz%27s_Men.jpg"
  },
  {
    id: "rouge", title: "Le Rouge et le Noir", author: "Stendhal", year: 1830,
    genre: "Psychological Drama",
    tagline: "Ambition. Seduction. Ruin.",
    description: "Julien Sorel burns with the fire of Napoleon's empire — born too late, too clever, too proud for the world he inhabits.",
    quote: "He was not wicked enough for the world, nor good enough for solitude.",
    color: "#1A1A4E",
    painting: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camille_Corot_-_Souvenir_of_Mortefontaine_-_Google_Art_Project.jpg/1280px-Camille_Corot_-_Souvenir_of_Mortefontaine_-_Google_Art_Project.jpg"
  },
  {
    id: "anna", title: "Anna Karenina", author: "Leo Tolstoy", year: 1878,
    genre: "Tragedy",
    tagline: "Love was the only crime.",
    description: "She had everything society could offer. She threw it all away for one impossible feeling.",
    quote: "All the variety, all the charm, all the beauty of life is made up of light and shadow.",
    color: "#2A1A3E",
    painting: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bouguereau_-_Nymphs_and_Satyr_-_1873.jpg/905px-Bouguereau_-_Nymphs_and_Satyr_-_1873.jpg"
  },
  {
    id: "crime", title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866,
    genre: "Psychological Thriller",
    tagline: "He thought he was above it. He was wrong.",
    description: "Raskolnikov believed extraordinary men stood beyond morality. One act of violence destroyed that theory forever.",
    quote: "Pain and suffering are always inevitable for a large intelligence.",
    color: "#1A1A1A",
    painting: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ilya_Efimovich_Repin_%281844-1930%29_-_Volga_Boatmen_%281870-1873%29.jpg/1280px-Ilya_Efimovich_Repin_%281844-1930%29_-_Volga_Boatmen_%281870-1873%29.jpg"
  },
  {
    id: "miserable", title: "Les Misérables", author: "Victor Hugo", year: 1862,
    genre: "Epic Drama",
    tagline: "One man. One loaf of bread. One lifetime of consequence.",
    description: "Jean Valjean spent nineteen years in prison for stealing bread. What he became afterwards shook an empire.",
    quote: "Even the darkest night will end and the sun will rise.",
    color: "#1A2E1A",
    painting: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Ingres%2C_J._A._D._-_Odalisque_with_Slave.jpg/1280px-Ingres%2C_J._A._D._-_Odalisque_with_Slave.jpg"
  },
  {
    id: "gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925,
    genre: "American Tragedy",
    tagline: "He had everything. Except the one thing.",
    description: "Jay Gatsby reinvented himself from nothing. He threw the greatest parties. He was the loneliest man in America.",
    quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
    color: "#1A2A3E",
    painting: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
  },
];

const FALLBACK_SCENES = {
  monte: {
    header: "Part One — Marseille, France, 1815",
    title: "The Return of the Pharaon",
    opening: "He did not yet know that happiness, like light, casts a shadow.",
    narration: "The harbour of Marseille glitters in the February sun as the Pharaon cuts through the water, its sails full, its young first mate standing at the bow with the certainty of a man for whom the world has just begun. Edmond Dantès is nineteen years old. He is about to be made captain. He is about to be married. He is, in this precise moment, the happiest man in France. Three men watch him disembark. Each of them has a reason to destroy him. None of them will hesitate.",
    choicePrompt: "Edmond sees his enemies watching from the quay. What does he do?",
    choices: [
      { text: "He greets them warmly — he suspects nothing, trusts everyone, and his openness is his only flaw.", outcome: "a" },
      { text: "He notices the envy in their eyes but dismisses it — a man with his future has no time for jealousy.", outcome: "b" },
      { text: "He confronts Fernand directly — he has always been too honest for his own good.", outcome: "c" },
      { text: "He follows Dumas' original path — carrying a letter he doesn't know will condemn him.", outcome: "original", original: true }
    ]
  }
};

export default function Undecided() {
  const [page, setPage] = useState("home");
  const [featured, setFeatured] = useState(0);
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
  const typeRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setBgIdx(i => (i + 1) % HERO_IMAGES.length);
      setFeatured(i => (i + 1) % BOOKS.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  function typewrite(text) {
    setDisplayedText("");
    setShowChoices(false);
    let i = 0;
    clearInterval(typeRef.current);
    typeRef.current = setInterval(() => {
      i += 2;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(typeRef.current);
        setDisplayedText(text);
        setTimeout(() => setShowChoices(true), 600);
      }
    }, 18);
  }

  async function callClaude(prompt) {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      const text = data.content?.[0]?.text || "";
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON found");
      return JSON.parse(match[0]);
    } catch (e) {
      console.error("Claude error:", e.message);
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
    if (bodyRef.current) bodyRef.current.scrollTop = 0;

    const scene = await callClaude(`You are narrating a Hollywood-quality cinematic adaptation of "${book.title}" by ${book.author} (${book.year}). Think Pierre Niney in Monte Cristo — dramatic, visual, emotionally immediate.

Write the opening scene. Return ONLY valid JSON, absolutely no markdown or backticks:
{
  "header": "Part One — [exact setting and year]",
  "title": "[3-5 word evocative scene title]",
  "opening": "[One devastating opening line. Like a title card in a great film. Under 20 words.]",
  "narration": "[5-6 sentences of cinematic narration written as voiceover. Present tense. Vivid physical detail. Psychologically devastating. True to ${book.author}'s world. Each sentence is a cut.]",
  "choicePrompt": "[One urgent question that captures the exact dramatic fork in this moment]",
  "choices": [
    {"text": "[Specific action, 1-2 sentences, psychologically motivated]", "outcome": "a"},
    {"text": "[Contrasting action with different psychology]", "outcome": "b"},
    {"text": "[Unexpected third path]", "outcome": "c"},
    {"text": "[Exactly what ${book.author} wrote — faithful to the original novel]", "outcome": "original", "original": true}
  ]
}`);

    setLoading(false);
    if (scene) {
      setCurrentScene(scene);
      typewrite(scene.narration);
    } else {
      const fallback = FALLBACK_SCENES[book.id];
      if (fallback) {
        setCurrentScene(fallback);
        typewrite(fallback.narration);
      } else {
        setError("API connection failed. Go to Vercel → undecided-rib3 → Settings → Environment Variables and verify your ANTHROPIC_API_KEY starts with sk-ant-, then redeploy.");
      }
    }
  }

  async function makeChoice(choice) {
    const newChoices = [...choices, choice.text];
    setChoices(newChoices);
    const nextIndex = sceneIndex + 1;
    setError(null);
    setShowChoices(false);
    setCurrentScene(null);
    setDisplayedText("");

    if (nextIndex >= 4) {
      setLoading(true);
      const end = await callClaude(`Conclude this cinematic adaptation of "${selectedBook.title}" by ${selectedBook.author}.
Path taken: ${newChoices.join(" → ")}
Write the final scene — 5 sentences, like closing frames of a great film. Haunting. Specific. End on the novel's deepest truth.
Return ONLY JSON: {"endingTitle": "[3-4 word title]", "endingText": "[final narration]"}`);
      setLoading(false);
      setEnding(end || { endingTitle: "Fin", endingText: "Every path through a great novel leads somewhere true. You have walked yours." });
      return;
    }

    setSceneIndex(nextIndex);
    setLoading(true);

    const next = await callClaude(`Write scene ${nextIndex + 1} of 4 in a cinematic adaptation of "${selectedBook.title}" by ${selectedBook.author}.
Choices so far: ${newChoices.join(" → ")}
Last choice: "${choice.text}"
Show consequences. Maintain ${selectedBook.author}'s psychological depth. Present tense. Cinematic.
Return ONLY valid JSON, no markdown:
{
  "header": "[Part — setting]",
  "title": "[scene title]",
  "opening": "[devastating opening line, under 20 words]",
  "narration": "[5-6 sentences of cinematic voiceover reacting to the choice made]",
  "choicePrompt": "[urgent dramatic question]",
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
      setError("Could not generate next scene. Please try again.");
    }
  }

  const book = BOOKS[featured];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Raleway:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { background: #06050a; color: #f0ebe0; font-family: 'EB Garamond', serif; overflow-x: hidden; }

        :root {
          --gold: #c8a84b;
          --gold2: #e8c97a;
          --cream: #f0ebe0;
          --dim: #6a5e4e;
          --deep: #06050a;
          --border: rgba(200,168,75,0.15);
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--deep); }
        ::-webkit-scrollbar-thumb { background: var(--gold); }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 1.5rem 4rem;
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(180deg, rgba(6,5,10,0.95) 0%, transparent 100%);
        }
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 900;
          letter-spacing: 0.25em; color: var(--cream);
          text-transform: uppercase; cursor: pointer;
          text-decoration: none;
        }
        .logo em { color: var(--gold); font-style: normal; }
        .logo-sub {
          font-family: 'Raleway', sans-serif;
          font-size: 0.5rem; letter-spacing: 0.4em;
          text-transform: uppercase; color: var(--dim);
          margin-top: 0.2rem;
        }
        .nav-right { display: flex; gap: 2rem; align-items: center; }
        .nav-link {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(240,235,224,0.5); background: none; border: none;
          cursor: pointer; transition: color 0.2s;
        }
        .nav-link:hover { color: var(--gold); }
        .nav-cta {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          background: none; border: 1px solid var(--border);
          color: var(--gold); padding: 0.5rem 1.2rem;
          cursor: pointer; transition: all 0.2s;
        }
        .nav-cta:hover { background: var(--gold); color: var(--deep); }

        /* ── HERO ── */
        .hero {
          position: relative; height: 100vh; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 2s ease;
          filter: brightness(0.35) saturate(0.7) contrast(1.1);
        }
        .hero-bg.active { opacity: 1; }
        .hero-bg.inactive { opacity: 0; }

        /* Letterbox */
        .letterbox-t { position: absolute; top: 0; left: 0; right: 0; height: 7vh; background: #06050a; z-index: 2; }
        .letterbox-b { position: absolute; bottom: 0; left: 0; right: 0; height: 7vh; background: #06050a; z-index: 2; }

        /* Overlays */
        .hero-vignette {
          position: absolute; inset: 0; z-index: 1;
          background: radial-gradient(ellipse at 60% 50%, transparent 20%, rgba(6,5,10,0.8) 100%);
        }
        .hero-left-fade {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(90deg, rgba(6,5,10,0.95) 0%, rgba(6,5,10,0.4) 50%, transparent 100%);
        }
        .hero-bottom-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%; z-index: 1;
          background: linear-gradient(0deg, #06050a 0%, transparent 100%);
        }

        /* Grain texture */
        .grain {
          position: absolute; inset: 0; z-index: 2; opacity: 0.03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .hero-content {
          position: relative; z-index: 5;
          height: 100%; display: flex; flex-direction: column;
          justify-content: flex-end; padding: 0 4rem 10vh;
          max-width: 680px;
        }

        .hero-badge {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.5em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 1rem; opacity: 0.9;
        }
        .hero-badge::before { content: ''; width: 30px; height: 1px; background: var(--gold); opacity: 0.6; }

        .hero-tagline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-style: italic; font-weight: 400;
          color: var(--gold); opacity: 0.8;
          letter-spacing: 0.05em; margin-bottom: 1rem;
          line-height: 1.4;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 7vw, 7rem);
          font-weight: 900; line-height: 0.9;
          color: var(--cream); margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 40px rgba(0,0,0,0.6);
        }

        .hero-desc {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          line-height: 1.85; font-style: italic;
          color: rgba(240,235,224,0.55);
          max-width: 460px; margin-bottom: 2.5rem;
        }

        .hero-quote {
          font-family: 'Playfair Display', serif;
          font-size: 0.9rem; font-style: italic;
          color: rgba(200,168,75,0.6);
          border-left: 2px solid rgba(200,168,75,0.3);
          padding-left: 1rem; margin-bottom: 2.5rem;
          max-width: 380px; line-height: 1.6;
        }

        .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }

        .btn-watch {
          font-family: 'Raleway', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: var(--gold); color: #06050a;
          border: none; padding: 1rem 2.5rem;
          cursor: pointer; transition: all 0.25s;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .btn-watch:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(200,168,75,0.3); }

        .btn-browse {
          font-family: 'Raleway', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          background: rgba(240,235,224,0.06); color: rgba(240,235,224,0.7);
          border: 1px solid rgba(240,235,224,0.15);
          padding: 1rem 1.8rem; cursor: pointer; transition: all 0.2s;
        }
        .btn-browse:hover { border-color: var(--gold); color: var(--gold); background: rgba(200,168,75,0.06); }

        /* Feature info — right side */
        .hero-info {
          position: absolute; right: 4rem; bottom: 10vh; z-index: 5;
          text-align: right; max-width: 200px;
        }
        .hi-label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.5rem; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--dim); margin-bottom: 0.5rem;
        }
        .hi-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-style: italic; color: var(--cream);
          line-height: 1.2; margin-bottom: 0.3rem;
        }
        .hi-author {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.1em; color: var(--dim);
        }

        /* Dots */
        .hero-dots {
          position: absolute; left: 4rem; bottom: 4vh; z-index: 5;
          display: flex; gap: 6px; align-items: center;
        }
        .dot { width: 20px; height: 2px; background: rgba(200,168,75,0.2); transition: all 0.5s; }
        .dot.on { background: var(--gold); width: 40px; }

        /* ── MARQUEE ── */
        .marquee-wrap {
          background: var(--gold); padding: 0.7rem 0;
          overflow: hidden; position: relative; z-index: 10;
        }
        .marquee-inner {
          display: flex; gap: 3rem;
          animation: march 45s linear infinite;
          white-space: nowrap;
        }
        .marquee-inner span {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(6,5,10,0.6);
          font-weight: 600;
        }
        .marquee-inner span::before { content: '✦  '; }
        @keyframes march { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── FEATURED BOOKS ROW ── */
        .featured-row {
          background: #09080e; padding: 4rem 0; overflow: hidden;
        }
        .featured-head {
          padding: 0 4rem 2rem;
          display: flex; align-items: baseline; justify-content: space-between;
        }
        .featured-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: var(--cream);
        }
        .featured-sub {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--dim);
        }
        .books-row {
          display: flex; gap: 1px; padding: 0;
          overflow-x: auto; scrollbar-width: none;
        }
        .books-row::-webkit-scrollbar { display: none; }
        .bcard {
          flex: 0 0 220px; position: relative;
          overflow: hidden; cursor: pointer;
          aspect-ratio: 2/3; background: #0d0b14;
        }
        .bcard-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          filter: brightness(0.4) saturate(0.6);
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s;
        }
        .bcard:hover .bcard-img { transform: scale(1.1); filter: brightness(0.2) saturate(0.4); }
        .bcard-grad {
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(6,5,10,0.99) 0%, rgba(6,5,10,0.1) 60%, transparent 100%);
        }
        .bcard-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.2rem; }
        .bcard-genre {
          font-family: 'Raleway', sans-serif;
          font-size: 0.48rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 0.4rem; opacity: 0.7;
        }
        .bcard-name {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem; font-weight: 700;
          line-height: 1.2; color: var(--cream); margin-bottom: 0.2rem;
        }
        .bcard-author {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; color: var(--dim); margin-bottom: 0.8rem;
        }
        .bcard-tagline {
          font-family: 'Playfair Display', serif;
          font-size: 0.78rem; font-style: italic;
          color: rgba(240,235,224,0.4); line-height: 1.5;
          opacity: 0; transform: translateY(8px);
          transition: all 0.35s ease;
        }
        .bcard:hover .bcard-tagline { opacity: 1; transform: none; }
        .bcard-cta {
          font-family: 'Raleway', sans-serif;
          font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); opacity: 0; transform: translateY(8px);
          transition: all 0.35s ease 0.05s; margin-top: 0.5rem;
        }
        .bcard:hover .bcard-cta { opacity: 1; transform: none; }

        /* ── CINEMATIC EXPERIENCE ── */
        .exp {
          position: fixed; inset: 0; z-index: 900;
          background: #06050a;
          display: flex; flex-direction: column;
          overflow-y: auto;
        }

        /* Film header */
        .exp-film {
          position: relative; height: 42vh; min-height: 250px;
          overflow: hidden; flex-shrink: 0;
        }
        .exp-film-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          filter: brightness(0.25) saturate(0.5) contrast(1.1);
        }
        .exp-film-grain {
          position: absolute; inset: 0; opacity: 0.05; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .exp-film-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(6,5,10,0.4) 0%, #06050a 100%);
        }
        .exp-film-top { position: absolute; top: 0; left: 0; right: 0; height: 6vh; background: #06050a; }
        .exp-film-line { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0.4; }

        .exp-topbar {
          position: absolute; top: 6vh; left: 0; right: 0;
          padding: 1rem 3rem;
          display: flex; justify-content: space-between; align-items: center;
          z-index: 2;
        }
        .exp-book-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-style: italic;
          color: rgba(240,235,224,0.7);
        }
        .exp-back {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase;
          border: 1px solid rgba(240,235,224,0.15);
          color: rgba(240,235,224,0.4);
          background: rgba(6,5,10,0.5);
          padding: 0.4rem 1rem; cursor: pointer; transition: all 0.2s;
        }
        .exp-back:hover { border-color: var(--gold); color: var(--gold); }

        .exp-scene-info {
          position: absolute; bottom: 3rem; left: 3rem; z-index: 2;
        }
        .exp-scene-eye {
          font-family: 'Raleway', sans-serif;
          font-size: 0.5rem; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--gold); opacity: 0.7; margin-bottom: 0.4rem;
        }
        .exp-scene-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 900;
          color: var(--cream);
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
          line-height: 1.1;
        }

        .exp-prog {
          position: absolute; bottom: 1.2rem; left: 3rem; right: 3rem;
          display: flex; gap: 4px; align-items: center; z-index: 2;
        }
        .pbar { height: 2px; flex: 1; background: rgba(240,235,224,0.1); transition: background 0.5s; }
        .pbar.done { background: rgba(240,235,224,0.35); }
        .pbar.act { background: var(--gold); }
        .plabel {
          font-family: 'Raleway', sans-serif;
          font-size: 0.48rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(240,235,224,0.25); margin-left: 1rem;
        }

        /* Story body */
        .exp-body {
          flex: 1; padding: 3rem;
          max-width: 780px; width: 100%; margin: 0 auto;
        }

        .exp-opening {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-style: italic;
          color: var(--gold); opacity: 0.75;
          line-height: 1.6; margin-bottom: 2rem;
          padding-left: 1.2rem;
          border-left: 2px solid rgba(200,168,75,0.3);
        }

        .exp-narration {
          font-family: 'EB Garamond', serif;
          font-size: 1.2rem; line-height: 2.1;
          color: rgba(240,235,224,0.9);
          margin-bottom: 3rem; min-height: 7rem;
          letter-spacing: 0.01em;
        }

        .cursor {
          display: inline-block; width: 2px; height: 1.1em;
          background: var(--gold); margin-left: 3px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .choice-divider {
          display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.2rem;
        }
        .choice-line { flex: 1; height: 1px; background: var(--border); }
        .choice-label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--gold); white-space: nowrap;
        }

        .choices { display: flex; flex-direction: column; gap: 8px; margin-bottom: 3rem; }

        .choice-btn {
          position: relative; overflow: hidden;
          background: rgba(240,235,224,0.02);
          border: 1px solid rgba(200,168,75,0.1);
          padding: 1.1rem 1.4rem 1.1rem 2.8rem;
          font-family: 'EB Garamond', serif;
          font-size: 1.05rem; color: rgba(240,235,224,0.85);
          cursor: pointer; text-align: left; line-height: 1.7;
          transition: all 0.25s;
        }
        .choice-btn:hover {
          border-color: rgba(200,168,75,0.5);
          background: rgba(200,168,75,0.05);
          color: var(--cream);
        }
        .choice-arr {
          position: absolute; left: 1rem; top: 1.2rem;
          color: var(--gold); font-size: 0.85rem; opacity: 0.4;
          transition: opacity 0.2s, transform 0.2s;
        }
        .choice-btn:hover .choice-arr { opacity: 1; transform: translateX(3px); }
        .orig-flag {
          display: block; font-family: 'Raleway', sans-serif;
          font-size: 0.48rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); opacity: 0.5; margin-bottom: 0.3rem;
        }

        .path-tag {
          font-family: 'Raleway', sans-serif;
          font-size: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--dim); border: 1px solid var(--border);
          padding: 0.3rem 0.9rem; display: inline-block; margin-bottom: 1.8rem;
          background: rgba(200,168,75,0.03);
        }

        .loading-wrap {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 5rem 0; gap: 1.5rem;
        }
        .spinner {
          width: 44px; height: 44px;
          border: 1px solid rgba(200,168,75,0.15);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-label {
          font-family: 'Playfair Display', serif;
          font-style: italic; color: var(--dim); font-size: 1rem;
        }

        .error-wrap {
          background: rgba(160,60,60,0.07);
          border: 1px solid rgba(160,60,60,0.3);
          padding: 1.5rem 2rem; margin-bottom: 2rem;
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem; line-height: 1.8;
          color: #b07070;
        }

        .end-card {
          background: rgba(200,168,75,0.04);
          border: 1px solid var(--border); padding: 3rem;
        }
        .end-eyebrow {
          font-family: 'Raleway', sans-serif;
          font-size: 0.5rem; letter-spacing: 0.4em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1rem;
        }
        .end-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 900;
          color: var(--cream); margin-bottom: 1.2rem; line-height: 1.1;
        }
        .end-text {
          font-size: 1.1rem; line-height: 2; font-style: italic;
          color: rgba(240,235,224,0.6); margin-bottom: 2.5rem;
        }
        .end-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .end-btn {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.8rem 1.8rem; cursor: pointer; transition: all 0.2s;
        }
        .end-pri { background: var(--gold); color: var(--deep); border: none; }
        .end-pri:hover { background: var(--gold2); transform: translateY(-1px); }
        .end-sec { background: none; border: 1px solid var(--border); color: var(--dim); }
        .end-sec:hover { border-color: var(--gold); color: var(--gold); }

        /* ── FOOTER ── */
        .footer {
          background: #04030a; border-top: 1px solid var(--border);
          padding: 4rem; text-align: center;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem; font-weight: 900;
          letter-spacing: 0.3em; color: rgba(240,235,224,0.08);
          margin-bottom: 1rem;
        }
        .footer-text {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--dim); opacity: 0.4;
        }

        @media (max-width: 768px) {
          .nav { padding: 1.2rem 1.5rem; }
          .hero-content { padding: 0 1.5rem 10vh; }
          .hero-info { display: none; }
          .exp-body { padding: 1.5rem; }
          .exp-topbar { padding: 1rem 1.5rem; }
          .exp-scene-info { left: 1.5rem; }
          .exp-prog { left: 1.5rem; right: 1.5rem; }
          .featured-head { padding: 0 1.5rem 1.5rem; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div onClick={() => setPage("home")} style={{cursor:"pointer"}}>
          <div className="logo">UN<em>DECIDED</em></div>
          <div className="logo-sub">Interactive Cinematic Literature</div>
        </div>
        <div className="nav-right">
          <button className="nav-link" onClick={() => setPage("library")}>Library</button>
          <button className="nav-cta" onClick={() => openBook(BOOKS[0])}>▶ Watch Now</button>
        </div>
      </nav>

      {/* ── HOME ── */}
      {(page === "home" || page === "library") && (
        <>
          {/* HERO */}
          <div className="hero">
            {HERO_IMAGES.map((img, i) => (
              <div key={i} className={`hero-bg ${i === bgIdx ? "active" : "inactive"}`}
                style={{ backgroundImage: `url(${img})` }} />
            ))}
            <div className="letterbox-t" />
            <div className="letterbox-b" />
            <div className="hero-vignette" />
            <div className="hero-left-fade" />
            <div className="hero-bottom-fade" />
            <div className="grain" />

            <div className="hero-content">
              <div className="hero-badge">{book.genre}</div>
              <div className="hero-tagline">{book.tagline}</div>
              <h1 className="hero-title">{book.title}</h1>
              <p className="hero-desc">{book.description}</p>
              <div className="hero-quote">"{book.quote}"</div>
              <div className="hero-actions">
                <button className="btn-watch" onClick={() => openBook(book)}>
                  ▶ Watch Now
                </button>
                <button className="btn-browse" onClick={() => {
                  document.getElementById('library')?.scrollIntoView({behavior:'smooth'});
                }}>
                  All Books
                </button>
              </div>
            </div>

            <div className="hero-info">
              <div className="hi-label">Now Showing</div>
              <div className="hi-title">{book.title}</div>
              <div className="hi-author">{book.author} · {book.year}</div>
            </div>

            <div className="hero-dots">
              {BOOKS.map((_, i) => (
                <div key={i} className={`dot ${i === featured ? "on" : ""}`} />
              ))}
            </div>
          </div>

          {/* MARQUEE */}
          <div className="marquee-wrap">
            <div className="marquee-inner">
              {[...BOOKS, ...BOOKS, ...BOOKS].map((b, i) => (
                <span key={i}>{b.title}</span>
              ))}
            </div>
          </div>

          {/* BOOKS */}
          <div className="featured-row" id="library">
            <div className="featured-head">
              <div className="featured-title">The Library</div>
              <div className="featured-sub">{BOOKS.length} masterworks · choose your story</div>
            </div>
            <div className="books-row">
              {BOOKS.map(b => (
                <div key={b.id} className="bcard" onClick={() => openBook(b)}>
                  <div className="bcard-img" style={{ backgroundImage: `url(${b.painting})` }} />
                  <div className="bcard-grad" />
                  <div className="bcard-info">
                    <div className="bcard-genre">{b.genre}</div>
                    <div className="bcard-name">{b.title}</div>
                    <div className="bcard-author">{b.author} · {b.year}</div>
                    <div className="bcard-tagline">{b.tagline}</div>
                    <div className="bcard-cta">▶ Watch now</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="footer">
            <div className="footer-logo">UNDECIDED</div>
            <div className="footer-text">Interactive Cinematic Literature · undecided.com</div>
          </footer>
        </>
      )}

      {/* ── CINEMATIC EXPERIENCE ── */}
      {page === "experience" && selectedBook && (
        <div className="exp" ref={bodyRef}>
          <div className="exp-film">
            <div className="exp-film-bg" style={{ backgroundImage: `url(${selectedBook.painting})` }} />
            <div className="exp-film-grain" />
            <div className="exp-film-overlay" />
            <div className="exp-film-top" />
            <div className="exp-film-line" />

            <div className="exp-topbar">
              <div className="exp-book-name">{selectedBook.title}</div>
              <button className="exp-back" onClick={() => setPage("home")}>← Library</button>
            </div>

            {currentScene && !ending && (
              <div className="exp-scene-info">
                <div className="exp-scene-eye">{currentScene.header}</div>
                <div className="exp-scene-name">{currentScene.title}</div>
              </div>
            )}

            {!ending && (
              <div className="exp-prog">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`pbar ${i < sceneIndex ? "done" : i === sceneIndex ? "act" : ""}`} />
                ))}
                <span className="plabel">Scene {sceneIndex + 1} of 4</span>
              </div>
            )}
          </div>

          <div className="exp-body">
            {loading && (
              <div className="loading-wrap">
                <div className="spinner" />
                <div className="loading-label">
                  {ending ? "Writing your ending..." : "The story unfolds..."}
                </div>
              </div>
            )}

            {error && <div className="error-wrap">⚠ {error}</div>}

            {currentScene && !loading && !ending && (
              <>
                {choices.length > 0 && (
                  <div className="path-tag">
                    Your path: {choices[choices.length-1].substring(0,70)}...
                  </div>
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
                      <div className="choice-label">{currentScene.choicePrompt}</div>
                      <div className="choice-line" />
                    </div>
                    <div className="choices">
                      {currentScene.choices?.map((c, i) => (
                        <button key={i} className="choice-btn" onClick={() => makeChoice(c)}>
                          <span className="choice-arr">→</span>
                          {c.original && <span className="orig-flag">The original path</span>}
                          {c.text}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {ending && !loading && (
              <div className="end-card">
                <div className="end-eyebrow">Your Ending · {selectedBook.title}</div>
                <div className="end-title">{ending.endingTitle}</div>
                <div className="end-text">{ending.endingText}</div>
                <div className="end-actions">
                  <button className="end-btn end-pri" onClick={() => openBook(selectedBook)}>
                    Another Path →
                  </button>
                  <button className="end-btn end-sec" onClick={() => setPage("home")}>
                    Choose Another Book
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
