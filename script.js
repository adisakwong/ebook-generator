var topicInput = document.getElementById('topicInput');
var authorInput = document.getElementById('authorInput');
var generateStructureBtn = document.getElementById('generateStructure');
var step2 = document.getElementById('step2');
var step3 = document.getElementById('step3');
var stepCover = document.getElementById('stepCover');
var stepTOC = document.getElementById('stepTOC');
var stepForeword = document.getElementById('stepForeword');
var structureList = document.getElementById('structureList');
var generateAllContentBtn = document.getElementById('generateAllContent');
var chaptersContainer = document.getElementById('chaptersContainer');
var loadingIndicator = document.getElementById('loadingIndicator');
var loadingText = document.getElementById('loadingText');
var exportBtn = document.getElementById('exportBtn');
var exportPdfBtn = document.getElementById('exportPdfBtn');
var generateCoverBtn = document.getElementById('generateCover');
var generateTOCBtn = document.getElementById('generateTOC');
var generateForewordBtn = document.getElementById('generateForeword');
var coverTitle = document.getElementById('coverTitle');
var coverAuthor = document.getElementById('coverAuthor');
var tocList = document.getElementById('tocList');
var forewordContent = document.getElementById('forewordContent');
var toggleCover = document.getElementById('toggleCover');
var toggleTOC = document.getElementById('toggleTOC');
var toggleForeword = document.getElementById('toggleForeword');
var coverContent = document.getElementById('coverContent');
var tocContent = document.getElementById('tocContent');
var forewordContentWrapper = document.getElementById('forewordContentWrapper');
var chapterCountInput = document.getElementById('chapterCountInput');

var openSettings = document.getElementById('openSettings');
var closeSettings = document.getElementById('closeSettings');
var settingsModal = document.getElementById('settingsModal');
var providerSelect = document.getElementById('providerSelect');
var groqSettings = document.getElementById('groqSettings');
var geminiSettings = document.getElementById('geminiSettings');
var groqApiKeyInput = document.getElementById('groqApiKeyInput');
var groqModelSelect = document.getElementById('groqModelSelect');
var groqCustomModelInput = document.getElementById('groqCustomModelInput');
var geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
var geminiModelSelect = document.getElementById('geminiModelSelect');
var saveSettings = document.getElementById('saveSettings');
var toggleStructure = document.getElementById('toggleStructure');
var structureContent = document.getElementById('structureContent');

var deepseekSettings = document.getElementById('deepseekSettings');
var deepseekApiKeyInput = document.getElementById('deepseekApiKeyInput');
var deepseekModelSelect = document.getElementById('deepseekModelSelect');

var localSettings = document.getElementById('localSettings');
var localBaseUrlInput = document.getElementById('localBaseUrlInput');
var localModelInput = document.getElementById('localModelInput');

var openrouterSettings = document.getElementById('openrouterSettings');
var openrouterApiKeyInput = document.getElementById('openrouterApiKeyInput');
var openrouterModelSelect = document.getElementById('openrouterModelSelect');

var currentProvider = localStorage.getItem('ai_provider') || 'groq';
var groqApiKey = localStorage.getItem('groq_api_key') || '';
var geminiApiKey = localStorage.getItem('gemini_api_key') || '';
var deepseekApiKey = localStorage.getItem('deepseek_api_key') || '';
var groqModel = localStorage.getItem('groq_model') || 'llama-3.3-70b-versatile';
var groqCustomModel = localStorage.getItem('groq_custom_model') || '';
var geminiModel = localStorage.getItem('gemini_model') || 'gemini-pro';
var deepseekModel = localStorage.getItem('deepseek_model') || 'deepseek-chat';
var localBaseUrl = localStorage.getItem('local_base_url') || 'http://localhost:11434/v1';
var localModel = localStorage.getItem('local_model') || 'llama3';
var openrouterApiKey = localStorage.getItem('openrouter_api_key') || '';
var openrouterModel = localStorage.getItem('openrouter_model') || 'google/gemini-2.0-flash-001';

var ebookData = {
    topic: '',
    author: 'อดิศักดิ์ วงศ์วิทยาพิทักษ์',
    structure: [],
    chapters: {},
    cover: '',
    toc: '',
    foreword: ''
};

providerSelect.value = currentProvider;
showProviderSettings(currentProvider);

groqApiKeyInput.value = groqApiKey;
geminiApiKeyInput.value = geminiApiKey;
deepseekApiKeyInput.value = deepseekApiKey;
groqModelSelect.value = groqModel;
geminiModelSelect.value = geminiModel;
deepseekModelSelect.value = deepseekModel;
localBaseUrlInput.value = localBaseUrl;
localModelInput.value = localModel;
openrouterApiKeyInput.value = openrouterApiKey;
openrouterModelSelect.value = openrouterModel;

if (groqModel === 'custom') {
    groqCustomModelInput.style.display = 'block';
    groqCustomModelInput.value = groqCustomModel;
}

providerSelect.onchange = function() {
    currentProvider = providerSelect.value;
    showProviderSettings(currentProvider);
};

function updateStatusUI() {
    var statusText = document.getElementById('statusText');
    var providerName = currentProvider.charAt(0).toUpperCase() + currentProvider.slice(1);
    var modelName = '';
    
    if (currentProvider === 'groq') {
        modelName = groqModel === 'custom' ? groqCustomModel : groqModel;
    } else if (currentProvider === 'gemini') {
        modelName = geminiModel;
    } else if (currentProvider === 'deepseek') {
        modelName = deepseekModel;
    } else if (currentProvider === 'openrouter') {
        modelName = openrouterModel;
    } else if (currentProvider === 'local') {
        modelName = localModel;
    }
    
    statusText.textContent = providerName + ': ' + (modelName || 'Not set');
}

updateStatusUI();

function showProviderSettings(provider) {
    groqSettings.style.display = provider === 'groq' ? 'block' : 'none';
    geminiSettings.style.display = provider === 'gemini' ? 'block' : 'none';
    deepseekSettings.style.display = provider === 'deepseek' ? 'block' : 'none';
    openrouterSettings.style.display = provider === 'openrouter' ? 'block' : 'none';
    localSettings.style.display = provider === 'local' ? 'block' : 'none';
}

groqModelSelect.onchange = function() {
    groqCustomModelInput.style.display = groqModelSelect.value === 'custom' ? 'block' : 'none';
};

document.getElementById('testGeminiKey').onclick = async function() {
    var testKey = geminiApiKeyInput.value.trim();
    var resultDiv = document.getElementById('geminiTestResult');
    if (!testKey) {
        resultDiv.innerHTML = '<span style="color: #ff4d4d;">Please enter API key first</span>';
        return;
    }
    resultDiv.innerHTML = '<span style="color: #ffa500;">Testing API key...</span>';
    try {
        var listUrl = 'https://generativelanguage.googleapis.com/v1/models?key=' + testKey;
        var listResponse = await fetch(listUrl);
        if (!listResponse.ok) {
            resultDiv.innerHTML = '<span style="color: #ff4d4d;">API key is invalid</span>';
            return;
        }
        var modelsData = await listResponse.json();
        var models = (modelsData.models || []).filter(function(m) {
            return m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent');
        });
        geminiModelSelect.innerHTML = '';
        models.forEach(function(m) {
            var option = document.createElement('option');
            option.value = m.name.replace('models/', '');
            option.textContent = m.displayName || m.name;
            geminiModelSelect.appendChild(option);
        });
        resultDiv.innerHTML = '<span style="color: #4ade80;">Found ' + models.length + ' model(s)</span>';
    } catch (error) {
        resultDiv.innerHTML = '<span style="color: #ff4d4d;">Error: ' + error.message + '</span>';
    }
};

marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true
});

openSettings.onclick = function() { settingsModal.style.display = 'flex'; };
closeSettings.onclick = function() { settingsModal.style.display = 'none'; };
window.onclick = function(event) {
    if (event.target == settingsModal) settingsModal.style.display = 'none';
};

saveSettings.onclick = function() {
    currentProvider = providerSelect.value;
    localStorage.setItem('ai_provider', currentProvider);
    if (currentProvider === 'groq') {
        groqApiKey = groqApiKeyInput.value.trim();
        groqModel = groqModelSelect.value;
        groqCustomModel = groqCustomModelInput.value.trim();
        localStorage.setItem('groq_api_key', groqApiKey);
        localStorage.setItem('groq_model', groqModel);
        localStorage.setItem('groq_custom_model', groqCustomModel);
    } else if (currentProvider === 'gemini') {
        geminiApiKey = geminiApiKeyInput.value.trim();
        geminiModel = geminiModelSelect.value;
        localStorage.setItem('gemini_api_key', geminiApiKey);
        localStorage.setItem('gemini_model', geminiModel);
    } else if (currentProvider === 'deepseek') {
        deepseekApiKey = deepseekApiKeyInput.value.trim();
        deepseekModel = deepseekModelSelect.value;
        localStorage.setItem('deepseek_api_key', deepseekApiKey);
        localStorage.setItem('deepseek_model', deepseekModel);
    } else if (currentProvider === 'local') {
        localBaseUrl = localBaseUrlInput.value.trim();
        localModel = localModelInput.value.trim();
        localStorage.setItem('local_base_url', localBaseUrl);
        localStorage.setItem('local_model', localModel);
    } else if (currentProvider === 'openrouter') {
        openrouterApiKey = openrouterApiKeyInput.value.trim();
        openrouterModel = openrouterModelSelect.value;
        localStorage.setItem('openrouter_api_key', openrouterApiKey);
        localStorage.setItem('openrouter_model', openrouterModel);
    }
    settingsModal.style.display = 'none';
    updateStatusUI();
    Swal.fire({
        icon: 'success',
        title: 'Settings Saved!',
        text: 'Your API settings have been saved successfully.',
        confirmButtonColor: '#059669'
    });
};

toggleStructure.onclick = function() {
    var isCollapsed = structureContent.style.display === 'none';
    structureContent.style.display = isCollapsed ? 'flex' : 'none';
    toggleStructure.classList.toggle('collapsed', !isCollapsed);
};

toggleCover.onclick = function() {
    var isCollapsed = coverContent.style.display === 'none';
    coverContent.style.display = isCollapsed ? 'flex' : 'none';
    toggleCover.classList.toggle('collapsed', !isCollapsed);
};

toggleTOC.onclick = function() {
    var isCollapsed = tocContent.style.display === 'none';
    tocContent.style.display = isCollapsed ? 'flex' : 'none';
    toggleTOC.classList.toggle('collapsed', !isCollapsed);
};

toggleForeword.onclick = function() {
    var isCollapsed = forewordContentWrapper.style.display === 'none';
    forewordContentWrapper.style.display = isCollapsed ? 'flex' : 'none';
    toggleForeword.classList.toggle('collapsed', !isCollapsed);
};

authorInput.oninput = function() {
    ebookData.author = authorInput.value.trim() || 'Anonymous';
    coverAuthor.textContent = ebookData.author;
};

generateCoverBtn.onclick = async function() {
    if (!ebookData.topic) {
        Swal.fire({
            icon: 'warning',
            title: 'Topic Missing',
            text: 'Please define ebook topic first',
            confirmButtonColor: '#059669'
        });
        return;
    }
    var apiKey = '';
    if (currentProvider === 'groq') apiKey = groqApiKey;
    else if (currentProvider === 'gemini') apiKey = geminiApiKey;
    else if (currentProvider === 'deepseek') apiKey = deepseekApiKey;
    else if (currentProvider === 'openrouter') apiKey = openrouterApiKey;
    else if (currentProvider === 'local') apiKey = 'local'; // No key needed for local usually

    if (!apiKey) { 
        Swal.fire({
            icon: 'info',
            title: 'API Key Required',
            text: 'Please enter your API key in the settings.',
            confirmButtonColor: '#059669'
        }).then(() => {
            settingsModal.style.display = 'flex';
        });
        return; 
    }
    loadingIndicator.classList.add('active');
    loadingText.textContent = 'AI is generating cover page...';
    generateCoverBtn.disabled = true;
    try {
        var prompt = 'Create a compelling cover page description for an ebook titled "' + ebookData.topic + '" by ' + ebookData.author + '.\nWrite a brief, engaging subtitle or tagline (1-2 sentences) that captures the essence of the book.\nReturn only the subtitle/tagline, no other text.';
        var subtitle = await callAI(prompt);
        ebookData.cover = subtitle;
        coverTitle.textContent = ebookData.topic;
        coverAuthor.textContent = ebookData.author;
        Swal.fire({
            icon: 'success',
            title: 'Cover Page Updated!',
            text: 'Your cover page has been generated successfully.',
            confirmButtonColor: '#059669'
        });
    } catch (error) {
        handleAIError(error, 'cover');
    } finally {
        loadingIndicator.classList.remove('active');
        generateCoverBtn.disabled = false;
    }
};

generateTOCBtn.onclick = async function() {
    if (ebookData.structure.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Structure Missing',
            text: 'Please generate ebook structure first',
            confirmButtonColor: '#059669'
        });
        return;
    }

    var apiKey = '';
    if (currentProvider === 'groq') apiKey = groqApiKey;
    else if (currentProvider === 'gemini') apiKey = geminiApiKey;
    else if (currentProvider === 'deepseek') apiKey = deepseekApiKey;
    else if (currentProvider === 'openrouter') apiKey = openrouterApiKey;
    else if (currentProvider === 'local') apiKey = 'local';

    if (!apiKey) { 
        Swal.fire({
            icon: 'info',
            title: 'API Key Required',
            text: 'Please enter your API key in the settings.',
            confirmButtonColor: '#059669'
        }).then(() => {
            settingsModal.style.display = 'flex';
        });
        return; 
    }
    loadingIndicator.classList.add('active');
    loadingText.textContent = 'Generating table of contents...';
    generateTOCBtn.disabled = true;
    try {
        var chapters = ebookData.structure.map(function(ch, i) { return { number: i + 1, title: ch.title }; });
        var prompt = 'Create a detailed Table of Contents for an ebook titled "' + ebookData.topic + '".\nChapters: ' + JSON.stringify(chapters) + '\nFor each chapter, create 2-4 subsection titles that would logically appear in that chapter.\nReturn the result as a JSON array with objects containing "chapter", "title", and "subsections" (array of subsection titles).\nOnly return the JSON, no other text.';
        var tocData = await callAI(prompt);
        var parsed = parseAIJSON(tocData);
        ebookData.toc = parsed;
        renderTOC(parsed);
        Swal.fire({
            icon: 'success',
            title: 'Table of Contents Generated!',
            text: 'Your TOC has been generated successfully.',
            confirmButtonColor: '#059669'
        });
    } catch (error) {
        handleAIError(error, 'TOC');
    } finally {
        loadingIndicator.classList.remove('active');
        generateTOCBtn.disabled = false;
    }
};

function renderTOC(tocData) {
    tocList.innerHTML = '';
    tocData.forEach(function(item) {
        var div = document.createElement('div');
        div.className = 'toc-item';
        var subsectionsHtml = '';
        if (item.subsections) {
            subsectionsHtml = item.subsections.map(function(sub) { return '<div style="font-size: 12px; color: #6b7280; margin-top: 4px;">└ ' + sub + '</div>'; }).join('');
        }
        div.innerHTML = '<div class="toc-number">' + item.chapter + '</div><div class="toc-title"><strong>' + item.title + '</strong>' + subsectionsHtml + '</div>';
        tocList.appendChild(div);
    });
}

generateForewordBtn.onclick = async function() {
    if (!ebookData.topic || ebookData.structure.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Information Missing',
            text: 'Please define topic and generate structure first',
            confirmButtonColor: '#059669'
        });
        return;
    }
    var apiKey = '';
    if (currentProvider === 'groq') apiKey = groqApiKey;
    else if (currentProvider === 'gemini') apiKey = geminiApiKey;
    else if (currentProvider === 'deepseek') apiKey = deepseekApiKey;
    else if (currentProvider === 'openrouter') apiKey = openrouterApiKey;
    else if (currentProvider === 'local') apiKey = 'local';

    if (!apiKey) { 
        Swal.fire({
            icon: 'info',
            title: 'API Key Required',
            text: 'Please enter your API key in the settings.',
            confirmButtonColor: '#059669'
        }).then(() => {
            settingsModal.style.display = 'flex';
        });
        return; 
    }
    loadingIndicator.classList.add('active');
    loadingText.textContent = 'AI กำลังเขียนคำนำ...';
    generateForewordBtn.disabled = true;
    try {
        var chaptersList = ebookData.structure.map(function(ch, i) { return (i + 1) + '. ' + ch.title + ': ' + (ch.description || ''); }).join('\n');
        var prompt = 'Write a comprehensive foreword in Thai language (ภาษาไทย) for an ebook titled "' + ebookData.topic + '" by ' + ebookData.author + '.\nThe ebook has the following chapters:\n' + chaptersList + '\n\nThe foreword should:\n- Introduce the ebook\'s purpose and scope in Thai\n- Explain what readers will learn in Thai\n- Highlight the key benefits of reading this ebook in Thai\n- Be written in a welcoming, professional tone (สุภาพและเป็นทางการ)\n- Be 300-500 words\n- Use markdown formatting with a title "คำนำ"';
        var content = await callAI(prompt);
        ebookData.foreword = content;
        forewordContent.innerHTML = marked.parse(content);
        Swal.fire({
            icon: 'success',
            title: 'สร้างคำนำสำเร็จ!',
            text: 'คำนำของคุณถูกสร้างเรียบร้อยแล้ว',
            confirmButtonColor: '#059669'
        });
    } catch (error) {
        handleAIError(error, 'foreword');
    } finally {
        loadingIndicator.classList.remove('active');
        generateForewordBtn.disabled = false;
    }
};

generateStructureBtn.onclick = async function() {
    var topic = topicInput.value.trim();
    if (!topic) {
        Swal.fire({
            icon: 'warning',
            title: 'Topic Required',
            text: 'Please enter a topic',
            confirmButtonColor: '#059669'
        });
        return;
    }
    var apiKey = '';
    if (currentProvider === 'groq') apiKey = groqApiKey;
    else if (currentProvider === 'gemini') apiKey = geminiApiKey;
    else if (currentProvider === 'deepseek') apiKey = deepseekApiKey;
    else if (currentProvider === 'openrouter') apiKey = openrouterApiKey;
    else if (currentProvider === 'local') apiKey = 'local';

    if (!apiKey) { 
        Swal.fire({
            icon: 'info',
            title: 'API Key Required',
            text: 'Please enter your API key in the settings.',
            confirmButtonColor: '#059669'
        }).then(() => {
            settingsModal.style.display = 'flex';
        });
        return; 
    }
    ebookData.topic = topic;
    ebookData.author = authorInput.value.trim() || 'Anonymous';
    coverTitle.textContent = topic;
    coverAuthor.textContent = ebookData.author;
    loadingIndicator.classList.add('active');
    loadingText.textContent = 'AI is generating ebook structure...';
    generateStructureBtn.disabled = true;
    try {
        var chapterCount = chapterCountInput.value || 5;
        var prompt = 'Create a detailed ebook structure for the topic: "' + topic + '".\nReturn a JSON array of chapter objects with "title" and "description" fields.\nThe ebook should have exactly ' + chapterCount + ' chapters. Only return the JSON array, no other text.';
        var structure = await callAI(prompt);
        var parsed = parseAIJSON(structure);
        ebookData.structure = parsed;
        renderStructure(parsed);
        stepCover.style.display = 'block';
        stepTOC.style.display = 'block';
        stepForeword.style.display = 'block';
        step2.style.display = 'block';
        step3.style.display = 'none';
    } catch (error) {
        handleAIError(error, 'structure');
    } finally {
        loadingIndicator.classList.remove('active');
        generateStructureBtn.disabled = false;
    }
};

function renderStructure(chapters) {
    structureList.innerHTML = '';
    chapters.forEach(function(chapter, index) {
        var item = document.createElement('div');
        item.className = 'chapter-item';
        item.innerHTML = '<div class="chapter-number">' + (index + 1) + '</div><div class="chapter-title"><strong>' + chapter.title + '</strong><div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">' + (chapter.description || '') + '</div></div><button class="chapter-generate-btn" data-index="' + index + '"><i class="fas fa-bolt"></i> Generate</button>';
        structureList.appendChild(item);
    });
    structureList.querySelectorAll('.chapter-generate-btn').forEach(function(btn) {
        btn.onclick = function() { generateChapterContent(parseInt(btn.dataset.index)); };
    });
}

generateAllContentBtn.onclick = async function() {
    step3.style.display = 'block';
    chaptersContainer.innerHTML = '';
    for (var i = 0; i < ebookData.structure.length; i++) {
        await generateChapterContent(i);
    }
};

async function generateChapterContent(index) {
    var chapter = ebookData.structure[index];
    var apiKey = '';
    if (currentProvider === 'groq') apiKey = groqApiKey;
    else if (currentProvider === 'gemini') apiKey = geminiApiKey;
    else if (currentProvider === 'deepseek') apiKey = deepseekApiKey;
    else if (currentProvider === 'openrouter') apiKey = openrouterApiKey;
    else if (currentProvider === 'local') apiKey = 'local';

    if (!apiKey) { 
        Swal.fire({
            icon: 'info',
            title: 'API Key Required',
            text: 'Please enter your API key in the settings.',
            confirmButtonColor: '#059669'
        }).then(() => {
            settingsModal.style.display = 'flex';
        });
        return; 
    }
    loadingIndicator.classList.add('active');
    loadingText.textContent = 'Generating content for: ' + chapter.title;
    var btn = structureList.querySelector('[data-index="' + index + '"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating';
    }
    try {
        var prompt = 'Write a comprehensive chapter for an ebook about "' + ebookData.topic + '".\nChapter Title: ' + chapter.title + '\nChapter Description: ' + (chapter.description || 'N/A') + '\n\nWrite detailed content with proper headings (use markdown h2, h3), paragraphs, and examples where appropriate.\nThe content should be 800-1500 words. Use markdown formatting.';
        var content = await callAI(prompt);
        ebookData.chapters[index] = content;
        renderChapterContent(index, chapter.title, content);
        step3.style.display = 'block';
    } catch (error) {
        handleAIError(error, 'chapter content');
    } finally {
        loadingIndicator.classList.remove('active');
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check"></i> Done'; }
    }
}

function renderChapterContent(index, title, content) {
    var existing = chaptersContainer.querySelector('[data-chapter="' + index + '"]');
    if (!existing) {
        existing = document.createElement('div');
        existing.className = 'chapter-content';
        existing.dataset.chapter = index;
        chaptersContainer.appendChild(existing);
    }
    existing.innerHTML = '<div class="chapter-content-header"><div class="chapter-number">' + (index + 1) + '</div><h3>' + title + '</h3><button class="copy-btn" data-index="' + index + '" title="Copy content"><i class="fas fa-copy"></i></button></div><div class="chapter-content-body">' + marked.parse(content) + '</div>';
    existing.querySelector('.copy-btn').onclick = function() {
        var chapterContent = ebookData.chapters[index];
        navigator.clipboard.writeText(chapterContent).then(function() {
            var btn = existing.querySelector('.copy-btn');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(function() { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
        });
    };
}

function handleAIError(error, context) {
    var msg = error.message;
    var lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes('insufficient balance') || lowerMsg.includes('insufficient_balance')) {
        msg = "ยอดเงินคงเหลือไม่เพียงพอ (Insufficient Balance): กรุณาเติมเงินในบัญชี DeepSeek ของคุณ หรือเปลี่ยนไปใช้ Provider อื่น (Groq/Gemini) ในหน้า Settings";
    } else if (lowerMsg.includes('high demand') || lowerMsg.includes('rate limit') || lowerMsg.includes('429')) {
        msg = "ระบบหนาแน่น (Provider Busy): " + msg + "\n\nคำแนะนำ: ลองเปลี่ยน Model หรือ Provider อื่นในหน้า Settings";
    } else if (lowerMsg.includes('api key') || lowerMsg.includes('unauthorized')) {
        msg = "API Key ไม่ถูกต้อง: กรุณาตรวจสอบความถูกต้องของ Key ในหน้า Settings";
    } else if (lowerMsg.includes('failed to fetch') || lowerMsg.includes('networkerror')) {
        if (currentProvider === 'local') {
            msg = "ไม่สามารถเชื่อมต่อกับ Local AI ได้ (Failed to fetch):\n1. ตรวจสอบว่าเปิดโปรแกรม (Ollama/LM Studio) และ Start Server หรือยัง\n2. ตรวจสอบ URL และ Port ใน Settings ให้ถูกต้อง\n3. (สำคัญ) ตรวจสอบการตั้งค่า CORS ในโปรแกรม AI ของคุณให้ยินยอมการเชื่อมต่อจาก Browser";
        } else {
            msg = "ปัญหาการเชื่อมต่อเครือข่าย: กรุณาตรวจสอบอินเทอร์เน็ตของคุณ หรืออาจเกิดจากปัญหา CORS";
        }
    }
    
    Swal.fire({
        icon: 'error',
        title: 'AI Generation Error',
        text: `Error generating ${context}: ${msg}`,
        confirmButtonColor: '#059669'
    });
}

function parseAIJSON(text) {
    try {
        // Remove markdown code blocks if present
        var cleaned = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, '$1').trim();
        return JSON.parse(cleaned);
    } catch (e) {
        // If it still fails, try to find the first [ or { and the last ] or }
        var startIdx = text.indexOf('[');
        var startIdxObj = text.indexOf('{');
        var start = (startIdx !== -1 && (startIdxObj === -1 || startIdx < startIdxObj)) ? startIdx : startIdxObj;
        
        var endIdx = text.lastIndexOf(']');
        var endIdxObj = text.lastIndexOf('}');
        var end = (endIdx !== -1 && (endIdxObj === -1 || endIdx > endIdxObj)) ? endIdx : endIdxObj;
        
        if (start !== -1 && end !== -1 && end > start) {
            try {
                var extracted = text.substring(start, end + 1);
                return JSON.parse(extracted);
            } catch (e2) {
                throw new Error("Failed to parse AI JSON: " + text.substring(0, 100) + "...");
            }
        }
        throw new Error("Invalid JSON format from AI: " + text.substring(0, 100) + "...");
    }
}

async function callAI(prompt, retryCount = 0) {
    try {
        if (currentProvider === 'groq') {
            return await callGroq(prompt);
        } else if (currentProvider === 'deepseek') {
            return await callDeepSeek(prompt);
        } else if (currentProvider === 'openrouter') {
            return await callOpenRouter(prompt);
        } else if (currentProvider === 'local') {
            return await callLocalAI(prompt);
        } else {
            return await callGemini(prompt);
        }
    } catch (error) {
        var errorMsg = error.message.toLowerCase();
        var isRetryable = errorMsg.includes('high demand') || 
                         errorMsg.includes('rate limit') || 
                         errorMsg.includes('429') ||
                         errorMsg.includes('overloaded');
        
        if (isRetryable && retryCount < 2) {
            var waitSec = Math.pow(2, retryCount + 1);
            loadingText.textContent = `High demand. Retrying in ${waitSec}s... (Attempt ${retryCount + 1}/2)`;
            await new Promise(resolve => setTimeout(resolve, waitSec * 1000));
            return await callAI(prompt, retryCount + 1);
        }
        throw error;
    }
}

async function callGroq(prompt) {
    var model = groqModel === 'custom' ? groqCustomModel : groqModel;
    var response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + groqApiKey
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        })
    });
    if (!response.ok) {
        var errorData = await response.json();
        throw new Error(errorData.error && errorData.error.message ? errorData.error.message : 'HTTP Error ' + response.status);
    }
    var data = await response.json();
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
    }
    throw new Error('Unexpected response format: ' + JSON.stringify(data));
}

async function callGemini(prompt) {
    var apiVersion = 'v1';
    if (geminiModel.startsWith('gemini-1.5') || geminiModel.includes('flash')) {
        apiVersion = 'v1beta';
    }
    var url = 'https://generativelanguage.googleapis.com/' + apiVersion + '/models/' + geminiModel + ':generateContent?key=' + geminiApiKey;
    var response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });
    if (!response.ok) {
        var errorData = await response.json();
        throw new Error(errorData.error && errorData.error.message ? errorData.error.message : 'HTTP Error ' + response.status);
    }
    var data = await response.json();
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text;
    }
    return '';
}

async function callDeepSeek(prompt) {
    var response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + deepseekApiKey
        },
        body: JSON.stringify({
            model: deepseekModel,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        })
    });
    if (!response.ok) {
        var errorData = await response.json();
        throw new Error(errorData.error && errorData.error.message ? errorData.error.message : 'HTTP Error ' + response.status);
    }
    var data = await response.json();
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
    }
    throw new Error('Unexpected response format: ' + JSON.stringify(data));
}

async function callOpenRouter(prompt) {
    var response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + openrouterApiKey,
            'HTTP-Referer': window.location.href,
            'X-Title': 'AI Ebook Generator'
        },
        body: JSON.stringify({
            model: openrouterModel,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        })
    });
    if (!response.ok) {
        var errorData = await response.json();
        throw new Error(errorData.error && errorData.error.message ? errorData.error.message : 'HTTP Error ' + response.status);
    }
    var data = await response.json();
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
    }
    throw new Error('Unexpected response format: ' + JSON.stringify(data));
}

async function callLocalAI(prompt) {
    var baseUrl = localBaseUrl.trim();
    var url = baseUrl;
    
    // Normalize URL: Remove trailing slash for consistent logic
    if (url.endsWith('/')) url = url.slice(0, -1);

    // If the user didn't include the specific endpoint, add it
    if (!url.toLowerCase().endsWith('/chat/completions')) {
        // Special case: if using Ollama default port but missing /v1
        if (url.includes('11434') && !url.toLowerCase().endsWith('/v1')) {
            url += '/v1';
        }
        url += '/chat/completions';
    }

    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: localModel,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        var errorText = await response.text();
        // If 404, it might be the wrong URL
        if (response.status === 404) {
            throw new Error(`Endpoint not found (404). Please check if your Base URL includes '/v1' (e.g., http://localhost:11434/v1). Current URL: ${url}`);
        }
        throw new Error('Local AI Error: ' + errorText || 'HTTP ' + response.status);
    }
    var data = await response.json();
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
    }
    throw new Error('Unexpected response format: ' + JSON.stringify(data));
}

exportBtn.onclick = function() {
    if (!ebookData.topic || Object.keys(ebookData.chapters).length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Content Missing',
            text: 'Please generate ebook content first',
            confirmButtonColor: '#059669'
        });
        return;
    }
    var now = new Date();
    var dateStr = now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') + '_' +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');
    var html = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>${ebookData.topic}</title>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600&display=swap" rel="stylesheet">
<style>
body { font-family: 'Sarabun', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.8; color: #333; }
h1 { color: #059669; line-height: 1.2; }
h2 { color: #047857; margin-top: 40px; border-bottom: 2px solid #ecfdf5; padding-bottom: 10px; }
h3 { color: #065f46; margin-top: 25px; }
p { margin-bottom: 1.5em; text-align: justify; }
pre { background: #f5f5f5; padding: 15px; border-radius: 8px; overflow-x: auto; border: 1px solid #ddd; }
code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
.cover { text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #065f46 0%, #047857 100%); color: white; border-radius: 12px; margin-bottom: 40px; }
.cover h1 { color: white; font-size: 38px; margin-bottom: 20px; }
.cover p { font-size: 18px; margin-top: 10px; opacity: 0.9; text-align: center; }
.toc { background: #ecfdf5; padding: 30px; border-radius: 12px; margin: 30px 0; border: 1px solid #a7f3d0; }
.toc h2 { border-bottom: 2px solid #059669; color: #059669; margin-top: 0; }
.toc-item { padding: 12px 0; border-bottom: 1px solid #a7f3d0; }
.toc-item:last-child { border-bottom: none; }
.foreword { background: #fffbeb; padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 6px solid #f59e0b; }
@media print {
    body { width: 100%; margin: 0; padding: 0; }
    .cover { border-radius: 0; }
}
</style>
</head>
<body>
<div class="cover">
<h1>${ebookData.topic}</h1>
<p>ผู้เขียน: ${ebookData.author}</p>`;
    if (ebookData.cover) {
        html += '<p style="font-size: 16px; margin-top: 10px; opacity: 0.9;">' + ebookData.cover + '</p>';
    }
    html += '</div>\n';
    if (ebookData.foreword) {
        html += '<div class="foreword">' + marked.parse(ebookData.foreword) + '</div>\n';
    }
    if (ebookData.toc) {
        html += '<div class="toc"><h2>Table of Contents</h2>';
        ebookData.toc.forEach(function(item) {
            html += '<div class="toc-item"><strong>Chapter ' + item.chapter + ': ' + item.title + '</strong>';
            if (item.subsections) {
                html += '<br>' + item.subsections.map(function(sub) { return '└ ' + sub; }).join('<br>');
            }
            html += '</div>';
        });
        html += '</div>\n';
    }
    ebookData.structure.forEach(function(chapter, index) {
        if (ebookData.chapters[index]) {
            html += '<h2>Chapter ' + (index + 1) + ': ' + chapter.title + '</h2>\n' + marked.parse(ebookData.chapters[index]) + '\n';
        }
    });
    html += '</body>\n</html>';
    var blob = new Blob([html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'ebook_gen_' + dateStr + '.html';
    a.click();
    URL.revokeObjectURL(url);
    Swal.fire({
        icon: 'success',
        title: 'Export Complete!',
        text: 'Your ebook has been exported successfully.',
        confirmButtonColor: '#059669'
    });
};

exportPdfBtn.onclick = async function() {
    if (!ebookData.topic || Object.keys(ebookData.chapters).length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Content Missing',
            text: 'Please generate ebook content first',
            confirmButtonColor: '#059669'
        });
        return;
    }

    Swal.fire({
        title: 'Generating PDF...',
        text: 'Please wait while we prepare your ebook.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Prepare the full HTML content as a string (similar to HTML export but formatted for PDF)
    var pdfHtml = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Sarabun', sans-serif; padding: 20px; color: #333; line-height: 1.6; }
            .cover { text-align: center; padding: 100px 20px; background-color: #065f46; color: white; border-radius: 15px; margin-bottom: 50px; }
            .cover h1 { font-size: 38pt; margin-bottom: 20px; }
            .cover p { font-size: 18pt; opacity: 0.9; }
            .section { page-break-before: always; padding: 20px 0; }
            .toc { background-color: #f0fdf4; padding: 30px; border-radius: 10px; border: 1px solid #dcfce7; }
            .toc h2 { color: #065f46; border-bottom: 2px solid #065f46; padding-bottom: 10px; }
            .toc-item { padding: 10px 0; border-bottom: 1px solid #dcfce7; }
            .foreword { background-color: #fffbeb; padding: 30px; border-radius: 10px; border-left: 6px solid #f59e0b; }
            h2 { color: #047857; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px; }
            p { margin-bottom: 1.2em; text-align: justify; }
            pre { background: #f4f4f4; padding: 15px; border-radius: 8px; font-size: 10pt; }
        </style>
    </head>
    <body>
        <div class="cover">
            <h1>${ebookData.topic}</h1>
            <p>ผู้เขียน: ${ebookData.author}</p>
            ${ebookData.cover ? `<p style="font-size: 14pt; margin-top: 20px;">${ebookData.cover}</p>` : ''}
        </div>
    `;

    if (ebookData.foreword) {
        pdfHtml += `<div class="section"><div class="foreword">${marked.parse(ebookData.foreword)}</div></div>`;
    }

    if (ebookData.toc) {
        pdfHtml += `
            <div class="section toc">
                <h2>สารบัญ (Table of Contents)</h2>
                <div style="margin-top: 20px;">
        `;
        ebookData.toc.forEach(function(item) {
            pdfHtml += `
                <div class="toc-item">
                    <strong>Chapter ${item.chapter}: ${item.title}</strong>
                    ${item.subsections ? `<div style="font-size: 12pt; color: #666; margin-top: 5px;">${item.subsections.map(sub => '└ ' + sub).join('<br>')}</div>` : ''}
                </div>
            `;
        });
        pdfHtml += `</div></div>`;
    }

    ebookData.structure.forEach(function(chapter, index) {
        if (ebookData.chapters[index]) {
            pdfHtml += `
                <div class="section">
                    <h2>บทที่ ${index + 1}: ${chapter.title}</h2>
                    <div style="margin-top: 20px;">
                        ${marked.parse(ebookData.chapters[index])}
                    </div>
                </div>
            `;
        }
    });

    pdfHtml += `</body></html>`;

    var opt = {
        margin: 15,
        filename: `ebook_${ebookData.topic.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        // Pass the HTML string directly to html2pdf
        await html2pdf().from(pdfHtml).set(opt).save();
        
        Swal.close();
        Swal.fire({
            icon: 'success',
            title: 'PDF Exported!',
            text: 'Your PDF ebook has been downloaded.',
            confirmButtonColor: '#059669'
        });
    } catch (error) {
        console.error('PDF Export Error:', error);
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Export Failed',
            text: 'An error occurred while generating the PDF: ' + error.message,
            confirmButtonColor: '#059669'
        });
    }
};
