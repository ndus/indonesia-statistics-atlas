// Routes hash paths, updates navigation and titles, and signals screenshot readiness.
import { routes, renderMissing } from './views.js';
const app = document.getElementById('app');
function render() {
  window.__shotReady = false;
  const path = location.hash.slice(1) || '/';
  const page = Object.hasOwn(routes, path) ? routes[path] : null;
  document.title = `${page?.title || 'Page not found'} | Indonesia in Numbers`;
  app.innerHTML = page ? page.render() : renderMissing();
  page?.mount(app);
  document.querySelectorAll('nav a').forEach(link => {
    const active = link.getAttribute('href') === `#${path}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}
window.addEventListener('hashchange', () => {
  // The skip link is a native in-page destination rather than an atlas route.
  if (location.hash === '#app') { app.focus({preventScroll:true}); return; }
  render();
});
render();
