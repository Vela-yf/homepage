(function () {
  var root = document.documentElement;

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
    var title = document.querySelector('title');
    if (title && title.dataset[lang]) document.title = title.dataset[lang];
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'zh' ? 'EN' : '中文';
      btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    });
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('.lang-toggle')) {
      var nextLang = root.dataset.lang === 'zh' ? 'en' : 'zh';
      store('lang', nextLang);
      setLang(nextLang);
    }
    if (event.target.closest('.theme-toggle')) {
      var nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      store('theme', nextTheme);
      setTheme(nextTheme);
    }
  });

  setLang(root.dataset.lang === 'zh' ? 'zh' : 'en');
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
})();
