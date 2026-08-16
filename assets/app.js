/* Language switcher: English / 中文 / 日本語.
   Every translatable node carries data-en, data-zh and data-ja.
   The choice is stored so it survives navigating between pages. */

(function () {
  var KEY = 'lang';
  var TAG = { en: 'en', zh: 'zh-Hant', ja: 'ja' };
  var buttons = document.querySelectorAll('.lang button[data-lang]');
  var nodes = document.querySelectorAll('[data-en]');

  function apply(lang) {
    if (!TAG[lang]) lang = 'en';
    document.documentElement.lang = TAG[lang];

    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    nodes.forEach(function (el) {
      var text = el.dataset[lang];
      if (text != null) el.innerHTML = text;
    });
  }

  var saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  apply(saved);

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var lang = b.dataset.lang;
      apply(lang);
      try { localStorage.setItem(KEY, lang); } catch (e) {}
    });
  });
})();
