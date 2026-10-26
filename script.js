// Menu Mobile Hamburguer Interativo
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu de cortina ao clicar em qualquer item
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
// Realce da seção visível na navbar, sem alterar a posição do scroll.
document.addEventListener('DOMContentLoaded', () => {
  const links = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const current = visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0].target.id;
      links.forEach(link => {
        if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '-15% 0px -55% 0px', threshold: [0, .1, .4, .8]});
    sections.forEach(section => activeObserver.observe(section));
  }
  // Animações progressivas e discretas, apenas quando permitidas.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const elements = document.querySelectorAll('.vertical-card, .showcase-card, .mentoria-box, .contact-card');
    elements.forEach(element => element.classList.add('reveal'));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, {threshold: .08, rootMargin: '0px 0px 60px 0px'});
    elements.forEach(element => revealObserver.observe(element));
    document.documentElement.classList.add('reveal-ready');
  }
  const copy = document.querySelector('.copy-email');
  if (copy) copy.addEventListener('click', async () => {
    const feedback = document.getElementById('copy-feedback');
    try {
      await navigator.clipboard.writeText(copy.dataset.email);
      copy.textContent = 'E-mail copiado!';
      if (feedback) feedback.textContent = 'Endereço de e-mail copiado.';
      window.setTimeout(() => { copy.textContent = 'Copiar endereço de e-mail'; }, 2200);
    } catch {
      if (feedback) feedback.textContent = 'Não foi possível copiar automaticamente. Use o botão Enviar e-mail.';
      copy.textContent = copy.dataset.email;
    }
  });
});
//