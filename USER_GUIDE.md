# 📖 Ebook Generator - User Guide

Welcome to the **Ebook Generator**. This guide will help you navigate the features and get the most out of your AI authoring experience.

---

## 🏗️ Workflow Overview

1.  **Configure API Settings** (One-time setup)
2.  **Define Topic** & Generate Structure
3.  **Generate Metadata** (Cover, TOC, Foreword)
4.  **Generate Content** (Individual or Bulk)
5.  **Export** (PDF or HTML)

---

## ⚙️ 1. Configuring Your AI Provider

Click the **Settings (Key icon)** in the top right corner.

### Groq Cloud (Recommended for Speed)
*   **Best for:** Rapid prototyping and fast content generation.
*   **Setup:** Get a key from [console.groq.com](https://console.groq.com/).
*   **Recommended Model:** `llama-3.3-70b-versatile` for high-quality logic.

### Google Gemini (Best for Creative Writing)
*   **Best for:** Deep creative insights and long-form consistency.
*   **Setup:** Get a key from [aistudio.google.com](https://aistudio.google.com/apikey).
*   **Pro Tip:** Use the "Test API Key" button to ensure your model is active.

### DeepSeek
*   **Best for:** Smart reasoning and cost efficiency.
*   **Model V3:** Great for general chapters.
*   **Model R1:** Best for complex, technical, or research-heavy topics.

### OpenRouter (The Unified Choice)
*   **Best for:** Accessing premium models like Claude 3.5 Sonnet, GPT-4o, or Llama 405B.
*   **Setup:** Get a key from [openrouter.ai](https://openrouter.ai/keys).
*   **Benefit:** One API key for almost every major AI model.

### Local AI (Ollama / LM Studio)
*   **Best for:** Privacy and free generation (no tokens needed).
*   **Base URL:** `http://localhost:11434/v1` (Ollama) or `http://localhost:1234/v1` (LM Studio).
*   **Note:** You must have the software running on your machine.

---

## 🖋️ 2. Starting Your Book

### Step 1: Set Your Identity
In the header, update the **Author Name**. This will be used in the Cover Page and the final export.

### Step 2: Define the Vision
Enter your topic in the main input. 
*   **Bad Topic:** "Python"
*   **Good Topic:** "Python for Financial Analysts: A Practical Guide to Automation and Data Analysis"
The more specific you are, the better the structure will be.

---

## 📚 3. Generating Components

### The Cover Page
Click **"Generate Cover Page"** to get a catchy subtitle. This adds a layer of professionalism to your PDF export.

### The Detailed TOC
Generating the structure only gives you chapter titles. Click **"Generate Table of Contents"** to let the AI plan the *sub-sections* inside those chapters. This creates a much more "real book" feel.

---

## 🚀 4. Writing the Content

You have two choices for writing chapters:

1.  **Selective Generation:** Click the **"Generate"** button on a specific chapter in the structure list. This is best if you want to review and edit as you go.
2.  **Bulk Generation:** Click **"Generate All Content"**. The AI will work through every chapter sequentially. This is the fastest way to get a complete draft.

---

## 📥 5. Exporting Your Masterpiece

### Export to HTML
Creates a single file that can be opened in any web browser. It's lightweight and maintains the emerald green theme.

### Export to PDF
Generates a professional A4 document. 
*   **Features:** Automatic page breaks, styled cover, and a clickable (visual) Table of Contents.
*   **Best for:** Self-publishing, sharing on Kindle, or printing.

---

## 💡 Expert Tips

*   **Edit Before Export:** If you want to change something, you can copy the chapter content, edit it in a markdown editor, and re-import or just keep the draft.
*   **Switching Models:** Use a "Small" model (like Llama 8B) for the structure, and a "Large" model (like Gemini Pro or Llama 70B) for the actual chapter writing to get better depth.
*   **Internet Stability:** AI generation for a whole book can take 2-5 minutes. Ensure your computer doesn't go to sleep during bulk generation.

---

**Happy Writing!**
*Created by Tech for Ummah*
