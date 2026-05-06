# 📚 Ebook Generator (Premium Edition)

A high-performance, web-based application that leverages state-of-the-art AI to generate complete ebooks—from structure and cover pages to full chapters and formatting—in minutes.

![Ebook Generator](ai_abstract_background.png)

## ✨ Key Features

### 1. 🏗️ Intelligent Structure Generation
- Generate a logical, custom number of chapters (1-20) based on any topic.
- Each chapter includes a title and a detailed description to guide content generation.

### 2. 🎨 Professional Cover & Foreword
- **Cover Page:** AI-generated taglines and subtitles that capture your book's essence.
- **Foreword:** Comprehensive 300-500 word introductions that set the stage for your readers.

### 3. 📝 Detailed Table of Contents
- Automatically generates a hierarchical TOC with 2-4 subsections per chapter for better readability.

### 4. ⚡ Massive Content Generation
- Generate individual chapters or use the **"Generate All"** feature to write the entire book in one go.
- Chapters typically range from 800-1500 words with rich Markdown formatting.

### 5. 📥 Multi-Format Export
- **PDF Export:** Professional A4 PDF layout with page breaks and styling (powered by `html2pdf.js`).
- **HTML Export:** Clean, responsive HTML file with embedded styles for web viewing.

### 6. 🤖 Multi-Model AI Support
- **Groq Cloud:** Ultra-fast generation using Llama 3.3, 3.1, Mixtral, etc.
- **Google Gemini:** High-quality output with Gemini 1.5 Pro/Flash.
- **DeepSeek:** Cost-effective and smart models (V3 & R1).
- **OpenRouter:** Unified API to access Claude 3.5, GPT-4o, Llama 3.1 405B, and more.
- **Local AI:** Support for **Ollama** and **LM Studio** for privacy-focused or offline generation.

## 🚀 Getting Started

### Prerequisites
- A modern web browser.
- An API Key from your preferred provider:
  - [Groq Cloud](https://console.groq.com/)
  - [Google AI Studio](https://aistudio.google.com/apikey)
  - [DeepSeek Platform](https://platform.deepseek.com/)
  - [Ollama](https://ollama.com/) (For local models)

### Installation
1. Clone or download this repository.
2. Open `index.html` directly in your browser.
   - *Note: For Local AI (Ollama), you may need to run via a local server (e.g., Live Server) due to CORS policies.*

---

## 📖 User Guide

### Step 1: Configuration
Before generating, click the **Settings (Key icon)** in the header:
1. **Choose Provider:** Select your preferred AI engine.
2. **Enter API Key:** Paste your key securely (saved locally in your browser).
3. **Select Model:** Choose between speed (8B models) or intelligence (70B+ models).
4. **Local AI:** If using Ollama, ensure your server is running and the Base URL is set (usually `http://localhost:11434/v1`).

### Step 2: Define Your Topic
- Enter a clear, descriptive topic in the Step 1 textarea.
- **Select Number of Chapters:** Specify how many chapters you want (e.g., 5, 10, or 12).
- Click **"Generate Structure"**. AI will propose a table of contents.

### Step 3: Refine Components
- **Cover Page:** Click generate to get a professional tagline. Update your name in the header first!
- **TOC:** Generate detailed subsections to give your book depth.
- **Foreword:** Let the AI introduce your book's vision.

### Step 4: Write the Book
- You can generate chapters one by one to review them, or click **"Generate All Content"** to let the AI work through the entire list.
- Use the **Copy icon** on any chapter to quickly grab the Markdown text.

### Step 5: Export & Publish
- Choose **Export to HTML** for a web-ready version.
- Choose **Export to PDF** for a professional document ready for distribution.

---

## 🛠️ Troubleshooting

- **CORS Errors:** If using Local AI (Ollama) and getting "Failed to fetch", ensure you have set the environment variable:
  `OLLAMA_ORIGINS="*" ollama serve`
- **Rate Limits:** If the AI is busy, the app will automatically retry up to 2 times with exponential backoff.
- **Empty PDF:** Ensure you have generated at least one chapter before exporting to PDF.

## 📁 Project Structure
```text
ebook-generator/
├── index.html          # Main application interface
├── style.css           # Premium Emerald theme & Glassmorphism
├── script.js           # Core logic & AI Integrations
├── ai_abstract_background.png  # UI Asset
└── README.md          # User documentation
```

## 🤝 Support & License
Created by **Tech for Ummah**. 
This project is open-source and free to use.

*Powered by AI - Shaping the future of digital publishing.*
