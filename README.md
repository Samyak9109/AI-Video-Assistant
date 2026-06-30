# AI Video Assistant

A lightweight AI-powered video meeting assistant that extracts transcript, summary, action items, decisions, open questions, and supports RAG-based follow-up inquiry.

## What it does

- Processes a YouTube video URL or a local video/audio file path
- Transcribes the content using the project transcription pipeline
- Generates a meeting title, summary, action items, decisions, and questions
- Builds a RAG chain over the transcript for follow-up Q&A

## Repository structure

- `main.py` — CLI entry point for running the full processing pipeline
- `core/`
  - `extractor.py` — extract action items, decisions, questions
  - `rag_engine.py` — build/load RAG chain and answer follow-up questions
  - `summatizer.py` — summarize transcript and generate titles
  - `transcriber.py` — transcribe audio/video content
  - `vector_store.py` — vector store creation and retrieval utilities
- `utils/`
  - `audio_processor.py` — audio chunk creation and preprocessing
- `frontend/` — React + Vite frontend scaffold for a simple browser UI

## Getting started

### Backend

1. Create and activate a Python environment.
2. Install dependencies:

```bash
python3 -m pip install -r requirements.txt
```

3. Add environment variables as needed in a `.env` file, for example:

```env
MISTRAL_API_KEY=your_mistral_api_key
```

4. Run the CLI pipeline:

```bash
python main.py
```

### Frontend

The `frontend/` directory contains a minimal React + Vite app.

1. Change into the frontend folder:

```bash
cd frontend
```

2. Install npm dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The Vite app is configured to proxy `/api` requests to `http://localhost:8000`.

> Note: The current backend does not yet expose a web API endpoint at `/api/run`. You'll need to add a small web server layer if you want the frontend to communicate with the Python pipeline directly.

## Notes

- This project is built around local AI / RAG processing and is intended as a prototype for meeting video summarization.
- The frontend is intentionally simple and designed as a clean scaffold for integration with the Python backend.

## Future improvements

- Add a FastAPI or Flask backend endpoint for `/api/run`
- Add file upload support in the frontend
- Add authentication and session management
- Improve error handling and progress reporting
