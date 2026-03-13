import { useState } from "react";

const BOOKS = [
  { id: "rouge", title: "Le Rouge et le Noir", author: "Stendhal", year: 1830, genre: "Psychological Drama", description: "A young man of humble birth navigates ambition, love and hypocrisy in post-Napoleonic France.", color: "#8B0000" },
  { id: "crime", title: "Crime and Punishment", author: "Dostoevsky", year: 1866, genre: "Psychological Thriller", description: "A student commits murder to test a theory of moral superiority — and is destroyed by his own conscience.", color: "#1a1a2e" },
  { id: "anna", title: "Anna Karenina", author: "Tolstoy", year: 1878, genre: "Tragedy", description: "A passionate affair tears apart the life of a Russian aristocrat trapped between love and society.", color: "#2d4a22" },
  { id: "miserable", title: "Les Misérables", author: "Victor Hugo", year: 1862, genre: "Epic Drama", description: "An ex-convict's pursuit of redemption against the backdrop of revolutionary Paris.", color: "#1a3a4a" },
  { id: "bovary", title: "Madame Bovary", author: "Flaubert", year: 1857, genre: "Realist Drama", description: "A doctor's wife seeks escape from provincial boredom through romantic fantasy and ruin.", color: "#3d2b1f" },
  { id: "monte", title: "The Count of Monte Cristo", author: "Alexandre Dumas", year: 1844, genre: "Adventure", description: "A wrongly imprisoned sailor returns as a wealthy count to exact elaborate revenge on his enemies.", color: "#1a1a3e" },
  { id: "pride", title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance", description: "Five sisters navigate marriage, money and misunderstanding in Regency England.", color: "#2a3d2a" },
  { id: "brothers", title: "The Brothers Karamazov", author: "Dostoevsky", year: 1880, genre: "Philosophical Drama", description: "Three brothers, a murdered father, and the darkest questions about God, free will and suffering.", color: "#2a1a1a" },
  { id: "gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "American Tragedy", description: "A mysterious millionaire's obsessive pursuit of a lost love in the glittering 1920s.", color: "#1a2a3a" },
  { id: "war", title: "War and Peace", author: "Tolstoy", year: 1869, genre: "Epic", description: "Five aristocratic families live through Napoleon's invasion of Russia.", color: "#2a2a1a" },
  { id: "raskolnikov", title: "The Idiot", author: "Dostoevsky", year: 1869, genre: "Tragedy", description: "A pure-hearted prince is destroyed by the corrupt society he tries to redeem.", color: "#1f1f2e" },
  { id: "germinal", title: "Germinal", author: "Émile Zola", year: 1885, genre: "Social Drama", description: "A young miner leads a desperate strike in the coal fields of northern France.", color: "#1a1a1a" },
  { id: "chartreuse", title: "The Charterhouse of Parma", author: "Stendhal", year: 1839, genre: "Political Drama", description: "A young Italian nobleman chases glory, love and intrigue across Napoleonic Europe.", color: "#2a1a3a" },
  { id: "dombey", title: "Great Expectations", author: "Charles Dickens", year: 1861, genre: "Coming of Age", description: "An orphan boy's mysterious fortune transforms him — and tests who he truly is.", color: "#2a1f1a" },
  { id: "jane", title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, genre: "Gothic Romance", description: "A governess falls for her brooding employer — and uncovers the secret locked in his house.", color: "#1f2a2a" },
  { id: "wuthering", title: "Wuthering Heights", author: "Emily Brontë", year: 1847, genre: "Gothic Drama", description: "A destructive passion between a foundling and a girl of the moors spans two generations.", color: "#1a1f2a" },
  { id: "pere", title: "Père Goriot", author: "Honoré de Balzac", year: 1835, genre: "Social Drama", description: "A naive student discovers the brutal machinery of Parisian society through a devoted, ruined father.", color: "#2a1a1f" },
  { id: "possessed", title: "Demons", author: "Dostoevsky", year: 1872, genre: "Political Thriller", description: "A provincial town is infiltrated by revolutionary nihilists with terrifying consequences.", color: "#1a1a1a" },
  { id: "oblomov", title: "Oblomov", author: "Ivan Goncharov", year: 1859, genre: "Psychological Comedy", description: "A Russian nobleman's magnificent, catastrophic inability to get out of bed.", color: "#2a2a1a" },
  { id: "lys", title: "Le Lys dans la Vallée", author: "Honoré de Balzac", year: 1836, genre: "Romantic Drama", description: "A young man's impossible love for a virtuous married woman destroys them both.", color: "#1f2a1f" }
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Inter:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #080808; color: #e8e0d0; font-family: 'Cormorant Garamond', serif; min-height: 100vh; }
  :root {
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --cream: #e8e0d0;
    --dim: #8a8070;
    --dark: #0f0e0c;
    --card: #111009;
    --border: rgba(201,168,76,0.2);
  }
  .header { padding: 1.5rem 3rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: rgba(8,8,8,0.97); backdrop-filter: blur(20px); z-index: 100; }
  .logo { font-family: 'Cinzel', serif; font-size: 1.4rem; letter-spacing: 0.2em; color: var(--cream); }
  .logo span { color: var(--gold); }
  .tagline { font-family: 'Inter', sans-serif; font-size: 0.65rem; letter-spacing: 0.25em; color: var(--dim); text-transform: uppercase; }
  .hero { padding: 7rem 3rem 5rem; max-width: 800px; margin: 0 auto; text-align: center; }
  .hero-label { font-family: 'Inter', sans-serif; font-size: 0.65rem; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 2rem; }
  .hero-title { font-family: 'Cinzel', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 400; line-height: 1.1; color: var(--cream); margin-bottom: 1.5rem; }
  .hero-title em { font-style: italic; font-family: 'Cormorant Garamond', serif; color: var(--gold-light); }
  .hero-sub { font-size: 1.2rem; color: var(--dim); line-height: 1.8; font-style: italic; max-width: 520px; margin: 0 auto 3rem; }
  .scroll-hint { font-family: 'Inter', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: var(--dim); text-transform: uppercase; }
  .library { max-width: 1200px; margin: 0 auto; padding: 3rem; }
  .library-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 2.5rem; }
  .library-title { font-family: 'Cinzel', serif; font-size: 1.1rem; letter-spacing: 0.2em; color: var(--cream); text-transform: uppercase; }
  .library-count { font-family: 'Inter', sans-serif; font-size: 0.7rem; color: var(--dim); letter-spacing: 0.1em; }
  .books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5px; background: var(--border); border: 1px solid var(--border); }
  .book-card { background: var(--card); padding: 2rem; cursor: pointer; transition: background 0.2s; position: relative; overflow: hidden; }
  .book-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform 0.3s; transform-origin: left; }
  .book-card:hover { background: #161410; }
  .book-card:hover::before { transform: scaleX(1); }
  .book-genre { font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); opacity: 0.7; margin-bottom: 0.8rem; }
  .book-title { font-family: 'Cinzel', serif; font-size: 1rem; line-height: 1.3; color: var(--cream); margin-bottom: 0.4rem; }
  .book-author { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; font-style: italic; color: var(--dim); margin-bottom: 1rem; }
  .book-desc { font-size: 0.9rem; line-height: 1.6; color: var(--dim); margin-bottom: 1.2rem; }
  .book-year { font-family: 'Inter', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; color: var(--dim); opacity: 0.5; }
  .begin-btn { display: inline-block; margin-top: 1rem; font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); border: 1px solid rgba(201,168,76,0.3); padding: 0.4rem 1rem; transition: all 0.2s; }
  .book-card:hover .begin-btn { background: var(--gold); color: #080808; border-color: var(--gold); }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .experience { max-width: 680px; width: 100%; }
  .exp-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
  .exp-book { font-family: 'Cinzel', serif; font-size: 0.8rem; letter-spacing: 0.15em; color: var(--gold); text-transform: uppercase; }
  .close-btn { background: none; border: 1px solid var(--border); color: var(--dim); padding: 0.4rem 0.8rem; font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.15em; cursor: pointer; text-transform: uppercase; transition: all 0.2s; }
  .close-btn:hover { border-color: var(--gold); color: var(--gold); }
  .progress { display: flex; gap: 4px; margin-bottom: 2rem; align-items: center; }
  .prog-dot { width: 24px; height: 2px; background: var(--border); transition: background 0.3s; }
  .prog-dot.done { background: var(--dim); }
  .prog-dot.current { background: var(--gold); }
  .scene-eyebrow { font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--dim); margin-bottom: 0.75rem; }
  .scene-title { font-family: 'Cinzel', serif; font-size: 1.6rem; color: var(--cream); margin-bottom: 1.5rem; line-height: 1.2; }
  .narration { font-size: 1.1rem; line-height: 1.9; color: var(--cream); margin-bottom: 2rem; font-style: italic; padding-left: 1.2rem; border-left: 2px solid rgba(201,168,76,0.3); }
  .choice-label { font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
  .choices { display: flex; flex-direction: column; gap: 8px; }
  .choice { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1rem 1.2rem; font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--cream); cursor: pointer; text-align: left; line-height: 1.6; transition: all 0.2s; }
  .choice:hover { border-color: var(--gold); background: rgba(201,168,76,0.05); }
  .choice.stendhal { border-color: rgba(201,168,76,0.1); }
  .choice.stendhal::before { content: 'Original path'; display: block; font-family: 'Inter', sans-serif; font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); opacity: 0.5; margin-bottom: 0.4rem; }
  .loading-text { font-style: italic; color: var(--dim); font-size: 1rem; padding: 2rem 0; }
  .ending { padding: 1.5rem; border: 1px solid var(--border); background: rgba(201,168,76,0.03); }
  .ending-label { font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
  .ending-title { font-family: 'Cinzel', serif; font-size: 1.4rem; color: var(--cream); margin-bottom: 1rem; }
  .ending-text { font-size: 1.05rem; line-height: 1.85; font-style: italic; color: var(--dim); }
  .ending-actions { display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }
  .action-btn { font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.6rem 1.4rem; cursor: pointer; transition: all 0.2s; border: 1px solid var(--gold); color: var(--gold); background: none; }
  .action-btn:hover { background: var(--gold); color: #080808; }
  .action-btn.primary { background: var(--gold); color: #080808; }
  .action-btn.primary:hover { background: var(--gold-light); }
  .path-tag { display: inline-block; font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.25rem 0.7rem; border: 1px solid var(--border); color: var(--dim); margin-bottom: 1.2rem; border-radius: 2px; }
  .film-strip { height: 20px; background: repeating-linear-gradient(90deg, #141210 0px, #141210 14px, #080808 14px, #080808 18px); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); opacity: 0.3; margin: 3rem 0; }
  @media (max-width: 640px) {
    .header { padding: 1.2rem 1.5rem; }
    .hero { padding: 4rem 1.5rem 3rem; }
    .library { padding: 2rem 1.5rem; }
    .books-grid { grid-template-columns: 1fr; }
    .overlay { padding: 1rem; align-items: flex-start; overflow-y: auto; }
  }
`;

async function callClaude(prompt) {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || '{}';
  const match = text.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : text);
}

export default function Undecided() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [phase, setPhase] = useState('library');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(null);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(null);

  const openBook = async (book) => {
    setSelectedBook(book);
    setPhase('loading');
    setChoices([]);
    setSceneIndex(0);
    setEnding(null);
    try {
      const scene = await callClaude(`You are creating the opening scene of an interactive cinematic adaptation of "${book.title}" by ${book.author} (${book.year}).

Write the first scene that immediately establishes the world, the protagonist, and the central dramatic tension. It should feel like the opening minutes of a great literary film — psychologically rich, visually specific, never dumbed down.

Return ONLY valid JSON:
{
  "header": "Part One — [setting, year]",
  "title": "[scene title, 3-5 words]",
  "narration": "[4-5 sentences of cinematic literary narration. Dense, psychological, specific to this author's world. Never generic.]",
  "choicePrompt": "[A tense question that captures the exact dramatic fork in this moment]",
  "choices": [
    {"text": "[Specific choice, 1-2 sentences, psychologically motivated]", "outcome": "a"},
    {"text": "[Contrasting choice]", "outcome": "b"},
    {"text": "[Unexpected choice]", "outcome": "c"},
    {"text": "[The path ${book.author} actually wrote — faithful to the original]", "outcome": "stendhal", "stendhal": true}
  ]
}`);
      setCurrentScene(scene);
      setPhase('scene');
    } catch (e) {
      setPhase('library');
    }
  };

  const makeChoice = async (choice) => {
    const newChoices = [...choices, choice.text];
    setChoices(newChoices);
    const nextIndex = sceneIndex + 1;

    if (nextIndex >= 4) {
      setLoading(true);
      try {
        const end = await callClaude(`You are concluding an interactive cinematic adaptation of "${selectedBook.title}" by ${selectedBook.author}.

The reader's choices: ${newChoices.join(' → ')}

Write a final scene ending — 4 sentences, haunting and specific. It must feel like the last frame of a great literary film. Reference the specific path this reader took. End with a single sentence that resonates with the novel's deepest theme.

Return ONLY JSON: {"endingTitle": "[3-4 word poetic title]", "endingText": "[the ending]"}`);
        setEnding(end);
        setPhase('ending');
      } catch (e) { }
      setLoading(false);
      return;
    }

    setLoading(true);
    setSceneIndex(nextIndex);
    try {
      const next = await callClaude(`You are writing scene ${nextIndex + 1} of 4 in an interactive adaptation of "${selectedBook.title}" by ${selectedBook.author}.

The reader's choices so far: ${newChoices.join(' → ')}
Most recent choice: "${choice.text}"

Write the next scene that flows naturally from these choices. Maintain the psychological depth and literary quality of ${selectedBook.author}. Show consequences. Deepen the central tension.

Return ONLY valid JSON:
{
  "header": "[Part — setting]",
  "title": "[scene title]",
  "narration": "[4-5 sentences. Psychologically dense. React to the choices made so far. Show their consequences.]",
  "choicePrompt": "[The dramatic question of this moment]",
  "choices": [
    {"text": "[Choice A]", "outcome": "a"},
    {"text": "[Choice B]", "outcome": "b"},
    {"text": "[Choice C]", "outcome": "c"},
    {"text": "[What ${selectedBook.author} actually wrote]", "outcome": "stendhal", "stendhal": true}
  ]
}`);
      setCurrentScene(next);
    } catch (e) { }
    setLoading(false);
  };

  return (
    <>
      <style>{STYLES}</style>
      <header className="header">
        <div>
          <div className="logo">UN<span>DECIDED</span></div>
          <div className="tagline">Choose your story</div>
        </div>
      </header>

      {phase === 'library' && (
        <>
          <div className="hero">
            <div className="hero-label">Interactive Cinematic Adaptations</div>
            <h1 className="hero-title">The classics,<br /><em>reimagined.</em></h1>
            <p className="hero-sub">Pick a novel. Shape the story. Discover what happens when you decide.</p>
            <div className="scroll-hint">↓ Choose your book</div>
          </div>
          <div className="library">
            <div className="library-header">
              <div className="library-title">The Library</div>
              <div className="library-count">{BOOKS.length} masterworks</div>
            </div>
            <div className="books-grid">
              {BOOKS.map(book => (
                <div key={book.id} className="book-card" onClick={() => openBook(book)}>
                  <div className="book-genre">{book.genre}</div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}, {book.year}</div>
                  <div className="book-desc">{book.description}</div>
                  <div className="begin-btn">Begin →</div>
                </div>
              ))}
            </div>
            <div className="film-strip" />
          </div>
        </>
      )}

      {(phase === 'scene' || phase === 'loading' || phase === 'ending') && selectedBook && (
        <div className="overlay">
          <div className="experience">
            <div className="exp-header">
              <div className="exp-book">{selectedBook.title}</div>
              <button className="close-btn" onClick={() => setPhase('library')}>← Library</button>
            </div>

            {phase !== 'ending' && (
              <div className="progress">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`prog-dot ${i < sceneIndex ? 'done' : i === sceneIndex ? 'current' : ''}`} />
                ))}
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'0.6rem',color:'var(--dim)',marginLeft:'8px',letterSpacing:'0.1em'}}>
                  Scene {sceneIndex + 1} of 4
                </span>
              </div>
            )}

            {phase === 'loading' && !currentScene && (
              <div className="loading-text">Opening the story...</div>
            )}

            {phase === 'scene' && currentScene && !loading && (
              <>
                {choices.length > 0 && (
                  <div className="path-tag">Your path: {choices[choices.length-1].substring(0,55)}...</div>
                )}
                <div className="scene-eyebrow">{currentScene.header}</div>
                <div className="scene-title">{currentScene.title}</div>
                <div className="narration">{currentScene.narration}</div>
                <div className="choice-label">What happens next?</div>
                <div className="choices">
                  {currentScene.choices?.map((c, i) => (
                    <button key={i} className={`choice ${c.stendhal ? 'stendhal' : ''}`} onClick={() => makeChoice(c)}>
                      {c.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {loading && (
              <div className="loading-text">The story continues...</div>
            )}

            {phase === 'ending' && ending && (
              <div className="ending">
                <div className="ending-label">Your ending</div>
                <div className="ending-title">{ending.endingTitle}</div>
                <div className="ending-text">{ending.endingText}</div>
                <div className="ending-actions">
                  <button className="action-btn primary" onClick={() => openBook(selectedBook)}>Another path →</button>
                  <button className="action-btn" onClick={() => setPhase('library')}>Choose another book</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
