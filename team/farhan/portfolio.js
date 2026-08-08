document.addEventListener('DOMContentLoaded', () => {
  // Re-trigger the CSS meter-fill animation only once the skills section
  // actually scrolls into view, instead of firing immediately on page load
  // (which most visitors would miss on a page this tall).
  const skillsSection = document.getElementById('section-skills');
  const meterFills = document.querySelectorAll('.meter-fill');

  if (!skillsSection || meterFills.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        meterFills.forEach(fill => {
          // removing and re-adding the animation restarts it
          fill.style.animation = 'none';
          // reading offsetHeight forces the browser to apply the "none"
          // before we set the animation again, otherwise the restart is skipped
          void fill.offsetHeight;
          fill.style.animation = '';
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(skillsSection);
});