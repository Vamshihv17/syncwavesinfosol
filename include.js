// Function to include header and footer dynamically
function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;

        // Reinitialize navbar toggle button for header
        if (file.includes("header.html")) {
          const overlay  = document.getElementById('mobileOverlay');
          const sidebar  = document.getElementById('mobileSidebar');
          const openBtn  = document.getElementById('menuToggle');
          const closeBtn = document.getElementById('closeSidebar');

          if (overlay && sidebar && openBtn && closeBtn) {
            function openSidebar() {
              overlay.classList.remove('hidden');
              requestAnimationFrame(() => {
                sidebar.classList.remove('-translate-x-full');
                openBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
              });
            }

            function closeSidebar() {
              sidebar.classList.add('-translate-x-full');
              sidebar.addEventListener('transitionend', () => {
                overlay.classList.add('hidden');
                openBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
              }, { once: true });
            }

            openBtn.addEventListener('click', openSidebar);
            closeBtn.addEventListener('click', closeSidebar);
            overlay.addEventListener('click', (e) => {
              if (e.target === overlay) closeSidebar();
            });
            window.addEventListener('keydown', (e) => {
              if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
                closeSidebar();
              }
            });
            overlay.querySelectorAll('a').forEach(a =>
              a.addEventListener('click', closeSidebar)
            );
          }
        }
      })
      .catch(err => console.error('Error loading include:', err));
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
