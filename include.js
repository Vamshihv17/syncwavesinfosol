// Function to include header and footer dynamically
function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;

        // Reinitialize navbar toggle button
        if (file.includes("header.html")) {
          const toggle = document.getElementById('menu-toggle');
          const menu = document.getElementById('menu');
          toggle.addEventListener('click', () => {
            menu.classList.toggle('hidden');
          });
        }
      })
      .catch(err => console.error('Error loading include:', err));
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
