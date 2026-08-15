/* Language toggle.
   Every translatable node carries data-en / data-zh.
   The choice is stored so it survives navigating between pages. */

(function () {
  var KEY = 'lang';
  var btn = document.getElementById('langBtn');

  function apply(lang) {
    var zh = lang === 'zh';
    document.documentElement.lang = zh ? 'zh-Hant' : 'en';
    if (btn) {
      btn.textContent = zh ? 'EN' : '中文';
      btn.setAttribute('aria-label', zh ? 'Switch to English' : '切換為中文');
    }
    document.querySelectorAll('[data-en]').forEach(function (el) {
      el.innerHTML = zh ? el.dataset.zh : el.dataset.en;
    });
  }

  var saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  apply(saved);

  if (btn) {
    btn.addEventListener('click', function () {
      var next = document.documentElement.lang === 'en' ? 'zh' : 'en';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }
})();
