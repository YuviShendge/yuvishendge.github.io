/* ===== data aggregated from your resume ===== */
const PROFILE = {
  name: "Yuvi Shendge",
  email: "yshendge@ufl.edu",
  resumeText: `Yuvi Shendge
yshendge@ufl.edu | US Citizen | https://yuvishendge.github.io | https://www.linkedin.com/in/yuvi-shendge

Education
University of Florida — B.S. Computer Science (Minor: Business Administration & Statistics)
Projected: May 2027
Relevant coursework: NLP, Regression Analysis, Database Design, Data Structures & Algorithms

Skills
Python, R, SQL, JavaScript, C++
Pandas, NumPy, Scikit-Learn, TensorFlow, spaCy, NLTK, Tableau
MariaDB, MongoDB, Streamlit, GitHub, WordPress, SiteImprove
Data cleaning, regression and econometric modeling, NLP pipelines, ETL

Experience
Web Developer – UF Innovation Academy (May 2025 - Present)
• Manage WordPress Multisite and analytics; build dashboards and a student-facing AI assistant prototype.

Program Coordinator – Gator AI Camp (May 2025 - Aug 2025)
• Coordinated workshops and analyzed participant feedback using R/Excel to improve curriculum.

Technical Lead – E-Commerce Capstone (Jan 2025 - Apr 2025)
• Led 4-person team; built recommendation engine, auth, and reporting pipelines.

Development Intern – Second Shot Lab (Jan 2025 - Apr 2025)
• Prototyped AI interview assistant; designed MongoDB schema and integrated APIs.

Projects
• NLP Text Classification & Parsing — models for POS, NER, sequence labeling; BERT embeddings.
• Tech News Sentiment & Tweet Generator — scraping, summarization, prompt-based tweet drafts (reduced manual posting time 50%).
• Car Price Prediction — 500k+ vehicles, regression and feature engineering (92% accuracy).
• Travel Agency DB — normalized schema, triggers, integrity checks.

Certifications
Fundamentals of Deep Learning — NVIDIA DLI (Dec 2024)
`
};

/* ===== project catalog (used by the Project grid) ===== */
const PROJECTS = [
  {id:'p1', title:"NLP Text Classification & Parsing", tags:["nlp","data"], tech:"Python, spaCy, NLTK, Transformers", blurb:"POS tagging, NER, CRFs and BERT embeddings. Achieved ~87% tagging accuracy and built a mini conversational agent prototype."},
  {id:'p2', title:"Tech News Sentiment & Tweet Generator", tags:["nlp","data","genai"], tech:"Python, NLP, web scraping", blurb:"Automated scraping + summarization pipeline that generated multi-sentiment tweet drafts. Reduced manual posting time by 50%."},
  {id:'p3', title:"Car Price Prediction Dashboard", tags:["data","web"], tech:"Python, Streamlit, Scikit-Learn", blurb:"Interactive Streamlit dashboard predicting car prices using feature engineering on 500k records."},
  {id:'p4', title:"Big & Little Matching App", tags:["web","product"], tech:"MERN Stack", blurb:"Swipe-based matching app for campus mentoring; implemented compatibility scoring using shared interests and behavior."},
  {id:'p5', title:"Travel Agency Database System", tags:["data","sql"], tech:"MariaDB, SQL", blurb:"Normalized schema, triggers, views, and integrity checks for automated reporting and fraud-prevention style checks."},
  {id:'p6', title:"Transportation Data Dashboard", tags:["data","viz"], tech:"Tableau", blurb:"Interactive Tableau maps and time-series visualizations analyzing transit KPIs and trends."}
];

/* ===== projects rendering & filtering ===== */
const grid = document.getElementById('projectsGrid');
const chips = Array.from(document.querySelectorAll('.chip'));

function renderProjects(filter = 'all') {
  grid.innerHTML = '';
  const filtered = PROJECTS.filter(p => filter === 'all' ? true : p.tags.includes(filter));
  filtered.forEach(p => {
    const el = document.createElement('div');
    el.className = 'project';
    el.tabIndex = 0;
    el.innerHTML = `<strong>${p.title}</strong>
      <div class="muted" style="margin-top:8px; font-size:13px">${p.tech}</div>
      <div style="margin-top:10px; color:var(--muted); font-size:14px">${p.blurb}</div>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    `;
    el.addEventListener('click', () => openProjectModal(p));
    grid.appendChild(el);
  });
}

renderProjects();

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderProjects(chip.dataset.filter);
  });
});

function openProjectModal(p) {
  // small in-page modal clone (keep it lightweight)
  const dialog = document.createElement('div');
  dialog.style.position = 'fixed';
  dialog.style.inset = '0';
  dialog.style.zIndex = 9999;
  dialog.style.display = 'grid';
  dialog.style.placeItems = 'center';
  dialog.style.background = 'rgba(0, 0, 0, 0.8)';
  dialog.innerHTML = `
    <div style="width:90%;max-width:720px;background:${getComputedStyle(document.documentElement).getPropertyValue('--panel')};border:1px solid rgba(255,255,255,0.04);padding:18px;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <h3 style="margin:0;color:#eaf8ff">${p.title}</h3>
          <div style="color:var(--muted);margin-top:6px">${p.tech}</div>
        </div>
        <button id="closeModal" style="background:transparent;border:1px solid rgba(255,255,255,0.03);padding:8px;border-radius:8px;color:var(--muted);cursor:pointer">Close</button>
      </div>
      <p style="color:var(--muted);margin-top:12px">${p.blurb}</p>
      <div style="display:flex;gap:10px;margin-top:10px">
        <a href="#" id="repoLink" style="text-decoration:none"><button class="btn">View repo</button></a>
        <button id="demoBtn" class="btn ghost">Run quick demo</button>
      </div>
    </div>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector('#closeModal').addEventListener('click', () => dialog.remove());
  dialog.querySelector('#demoBtn').addEventListener('click', () => {
    alert('Demo placeholder — add links to Streamlit or live demos in your repo for full effect.');
  });
}

/* ===== animate skill bars on load ===== */
window.addEventListener('load', () => {
  document.querySelectorAll('.bar > i').forEach((el, i) => {
    setTimeout(() => el.style.width = el.dataset.width || el.getAttribute('data-width') || '80%', 200 + i * 80);
  });
});

/* ===== resume download (raw text) ===== */
const resumeBtn = document.getElementById('downloadResume');
const resumeDL = document.getElementById('resumeDownloadLink');
const downloadBtn = document.getElementById('downloadBtn');

function downloadResume() {
  const blob = new Blob([PROFILE.resumeText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Yuvi_Shendge_Resume.txt';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 600);
}

resumeBtn.addEventListener('click', downloadResume);
resumeDL.addEventListener('click', downloadResume);
downloadBtn.addEventListener('click', () => {
  // for a quick PDF-friendly version we generate a simple printable page
  const w = window.open('', '_blank');
  w.document.write(`<pre style="font-family:monospace;">${PROFILE.resumeText}</pre>`);
  w.document.close();
});

/* ===== contact CTA ===== */
document.getElementById('contactMe').addEventListener('click', () => location.href = 'mailto:' + PROFILE.email + '?subject=Hi%20Yuvi!%20Inquiry');

/* ===== NLP demo ===== */
const posWords = ["good", "great", "happy", "love", "positive", "improve", "excited", "success", "effective", "helpful", "benefit"];
const negWords = ["bad", "fail", "worse", "angry", "disappointed", "problem", "error", "issue", "loss", "negative", "concern", "fraud"];

function simpleAnalyze(text) {
  const t = text.toLowerCase();
  const tokens = t.match(/[a-z0-9']+/g) || [];
  let score = 0;
  const highlights = [];
  tokens.forEach(tok => {
    if (posWords.includes(tok)) {
      score += 1;
      highlights.push({ tok, kind: 'pos' });
    }
    if (negWords.includes(tok)) {
      score -= 1;
      highlights.push({ tok, kind: 'neg' });
    }
  });
  // length normalization
  const norm = tokens.length ? (score / Math.sqrt(tokens.length)) : 0;
  let label = 'Neutral';
  if (norm > 0.25) label = 'Positive';
  if (norm < -0.25) label = 'Negative';
  return { tokens, score: norm.toFixed(3), label, highlights };
}

document.getElementById('nlpRun').addEventListener('click', () => {
  const txt = document.getElementById('nlpInput').value.trim();
  if (!txt) {
    alert('Paste some text to analyze');
    return;
  }
  const res = simpleAnalyze(txt);
  document.getElementById('nlpResult').textContent = `Sentiment: ${res.label} (score ${res.score})`;
  const H = document.getElementById('highlights');
  H.innerHTML = '';
  res.highlights.forEach(h => {
    const span = document.createElement('span');
    span.textContent = h.tok;
    span.style.padding = '6px 8px';
    span.style.marginRight = '8px';
    span.style.borderRadius = '8px';
    span.style.display = 'inline-block';
    span.style.fontFamily = 'var(--mono)';
    span.style.color = h.kind === 'pos' ? '#052d2f' : '#3d002b';
    span.style.background = h.kind === 'pos' ? 'linear-gradient(90deg,#8be9fd,#a6fff8)' : 'linear-gradient(90deg,#ff79c6,#ffb3d9)';
    H.appendChild(span);
  });
});

document.getElementById('nlpClear').addEventListener('click', () => {
  document.getElementById('nlpInput').value = '';
  document.getElementById('nlpResult').textContent = 'No analysis yet';
  document.getElementById('highlights').innerHTML = '';
});

/* keyboard nav for projects */
document.addEventListener('keydown', (e) => {
  if (e.key === 'p') {
    document.querySelector('.chip[data-filter="nlp"]').click();
    window.scrollTo({ top: document.getElementById('projects').offsetTop - 60, behavior: 'smooth' });
  }
});

/* view projects scroll */
document.getElementById('viewProjects').addEventListener('click', () => {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* accessible focus on clickable project nodes */
document.addEventListener('click', e => {
  if (e.target.closest('.project')) e.target.closest('.project').focus();
});

/* small console hint for recruiters */
console.log("Hello! If you're a recruiter: press 'p' to view NLP projects. Resume download available on the page.");
