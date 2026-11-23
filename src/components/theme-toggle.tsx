import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const modes = [
  { mode: "system", icon: faCircleHalfStroke },
  { mode: "light", icon: faSun },
  { mode: "dark", icon: faMoon },
] as const;

/**
 * The three-way theme button: system → light → dark → system. It's server-rendered
 * with no onClick; the click handler comes from <ThemeScript>. All three modes are
 * rendered and CSS in global.css shows the current one. The visible mode's span gives
 * the tooltip and its hidden text the button's accessible name (the other modes are
 * display: none, so screen readers skip them too). FontAwesome 7 no longer renders `title`.
 */
export function ThemeToggle() {
  return (
    <button type="button" className="theme-toggle">
      {modes.map(({ mode, icon }) => (
        <span key={mode} className={`theme-mode theme-mode-${mode}`} title={`Theme: ${mode}`}>
          <FontAwesomeIcon icon={icon} />
          <span className="visually-hidden">Theme: {mode}</span>
        </span>
      ))}
    </button>
  );
}

// Runs inline before the page paints, so a saved choice doesn't flash the other scheme.
// No data-theme (and nothing saved) means "system": follow prefers-color-scheme.
const themeScript = `(function () {
  var KEY = "theme";
  var MODES = ["system", "light", "dark"];
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch (e) {}
  document.addEventListener("click", function (event) {
    if (!(event.target instanceof Element) || !event.target.closest(".theme-toggle")) return;
    var current = root.dataset.theme || "system";
    var next = MODES[(MODES.indexOf(current) + 1) % MODES.length];
    if (next === "system") delete root.dataset.theme;
    else root.dataset.theme = next;
    try {
      if (next === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch (e) {}
  });
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
