// Runs before first paint to avoid a theme flash. Kept external so the CSP can stay strict.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch {
    /* storage unavailable: fall back to the system preference */
  }
})();
