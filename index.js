// ── SPA Hash Router ───────────────────────────────────────
const VIEWS = ['home', 'about', 'projects', 'contact'];

const META = {
  home:     {
    title: 'Melissa Garrido — Software Developer & Data Analytics Engineer',
    desc:  'Software Developer and Business Intelligence Engineer with 3+ years of experience in Python, SQL, Power BI, and web development. Open to remote opportunities.',
  },
  about:    {
    title: 'About — Melissa Garrido | Software Developer & BI Engineer',
    desc:  'Learn about Melissa Garrido\'s background in software development, data analytics, automation, and business intelligence.',
  },
  projects: {
    title: 'Projects — Melissa Garrido | Python, Power BI, Web Development',
    desc:  'Portfolio projects spanning Python automation, Power BI dashboards, data analytics, and full-stack web development.',
  },
  contact:  {
    title: 'Contact — Melissa Garrido | Software Developer',
    desc:  'Get in touch with Melissa Garrido for job opportunities, collaborations, or project inquiries.',
  },
};

function navigate(hash) {
  const raw    = hash.replace('#', '').trim();
  const target = VIEWS.includes(raw) ? raw : 'home';

  VIEWS.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (!el) return;

    if (v === target) {
      el.classList.add('active', 'entering');
      // Remove entering after longest animation finishes (~700ms)
      clearTimeout(el._enterTimer);
      el._enterTimer = setTimeout(() => el.classList.remove('entering'), 700);
    } else {
      el.classList.remove('active', 'entering');
      clearTimeout(el._enterTimer);
    }
  });

  document.querySelectorAll('.headerbtn, .sidebar-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === target);
  });

  const m = META[target];
  if (m) {
    document.title = m.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', m.desc);
  }

  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => navigate(location.hash));
document.addEventListener('DOMContentLoaded', () => navigate(location.hash));


// ── Dark Mode ─────────────────────────────────────────────
const DARK_KEY = 'theme';
const moonIcon = '<i class="fa-solid fa-moon"></i>';
const sunIcon  = '<i class="fa-solid fa-sun"></i>';

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  localStorage.setItem(DARK_KEY, dark ? 'dark' : 'light');

  const icon = dark ? sunIcon : moonIcon;
  ['theme-toggle', 'sidebar-theme'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.innerHTML = icon;
  });
}

const savedTheme = localStorage.getItem(DARK_KEY);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});
document.getElementById('sidebar-theme')?.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});


// ── Mobile Sidebar ─────────────────────────────────────────
const hamburger      = document.getElementById('hamburger');
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarClose   = document.getElementById('sidebar-close');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openSidebar);
sidebarClose?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', closeSidebar);
});


// ── Language Toggle ────────────────────────────────────────
const toggleBtn = document.getElementById('lang-toggle');
let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerHTML = el.dataset[lang];
  });
  const label = lang === 'en' ? 'ES' : 'EN';
  ['lang-toggle', 'sidebar-lang'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = label;
  });
}

toggleBtn.addEventListener('click', () => applyLang(currentLang === 'en' ? 'es' : 'en'));
document.getElementById('sidebar-lang')?.addEventListener('click', () => applyLang(currentLang === 'en' ? 'es' : 'en'));


// ── Category Filter (Projects) ─────────────────────────────
document.addEventListener('click', e => {
  const tab = e.target.closest('.cat-tab');
  if (!tab) return;

  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  const filter = tab.dataset.filter;
  document.querySelectorAll('.mini-card').forEach(card => {
    card.style.display =
      filter === 'all' || card.dataset.category === filter ? 'flex' : 'none';
  });
});


// ── Contact Form ───────────────────────────────────────────
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz-LG_7gtFc_Lunz6OhHVeKddhG1nbX93opE8HXO9PBo__7tTfZN35fKYC3L_y8yTucxA/exec';

document.addEventListener('submit', async e => {
  if (e.target.id !== 'contactForm') return;
  e.preventDefault();

  const form       = e.target;
  const successMsg = document.getElementById('successMsg');

  const formData = {
    name:    document.getElementById('name').value,
    email:   document.getElementById('email').value,
    phone:   document.getElementById('phone').value,
    message: document.getElementById('message').value,
  };

  try {
    await fetch(SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(formData),
    });

    successMsg.classList.add('visible');
    form.reset();

  } catch (err) {
    console.error(err);
    alert('Error sending message.');
  }
});
