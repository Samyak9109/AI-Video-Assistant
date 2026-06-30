import { useState } from "react";
import { Cloud, Play, MessageSquare, FileText, Sparkles } from "lucide-react";

const initialResult = {
  title: "",
  transcript: "",
  summary: "",
  action_items: "",
  key_decisions: "",
  open_questions: "",
};

function App() {
  const [source, setSource] = useState("");
  const [language, setLanguage] = useState("english");
  const [result, setResult] = useState(initialResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setResult(initialResult);

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, language }),
      });

      if (!response.ok) {
        throw new Error("Server error while running pipeline");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="hero-card">
        <div>
          <div className="eyebrow">AI Video Assistant</div>
          <h1>Turn videos into meeting intelligence</h1>
          <p>
            Upload a video or paste a YouTube link to generate transcript,
            summary, action items, decisions and follow-up questions.
          </p>
        </div>
        <div className="hero-icon">
          <Cloud size={48} />
        </div>
      </header>

      <main>
        <section className="form-panel">
          <form onSubmit={handleSubmit}>
            <label htmlFor="source">Video URL or file path</label>
            <input
              id="source"
              type="text"
              value={source}
              placeholder="https://youtube.com/... or /path/to/video.mp4"
              onChange={(event) => setSource(event.target.value)}
            />

            <div className="row-grid">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                <option value="english">English</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={loading || !source.trim()}
            >
              {loading ? "Analyzing video..." : "Analyze video"}
            </button>
            {error && <div className="toast-error">{error}</div>}
          </form>
        </section>

        <section className="results-grid">
          <article className="result-card">
            <div className="result-header">
              <FileText size={20} />
              <h2>Summary</h2>
            </div>
            <p>
              {loading
                ? "Waiting for results..."
                : result.summary || "A concise summary will appear here."}
            </p>
          </article>

          <article className="result-card">
            <div className="result-header">
              <Sparkles size={20} />
              <h2>Title</h2>
            </div>
            <p>{result.title || "Generated title appears here."}</p>
          </article>

          <article className="result-card wide-card">
            <div className="result-header">
              <Play size={20} />
              <h2>Transcript</h2>
            </div>
            <pre>
              {result.transcript ||
                "Full transcript will be displayed here once available."}
            </pre>
          </article>

          <article className="result-card">
            <div className="result-header">
              <MessageSquare size={20} />
              <h2>Action Items</h2>
            </div>
            <p>
              {result.action_items ||
                "Action items will be extracted from the meeting content."}
            </p>
          </article>

          <article className="result-card">
            <div className="result-header">
              <MessageSquare size={20} />
              <h2>Key Decisions</h2>
            </div>
            <p>
              {result.key_decisions ||
                "Key decisions found in the meeting will appear here."}
            </p>
          </article>

          <article className="result-card">
            <div className="result-header">
              <MessageSquare size={20} />
              <h2>Open Questions</h2>
            </div>
            <p>
              {result.open_questions ||
                "Open questions identified from the transcript will appear here."}
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
