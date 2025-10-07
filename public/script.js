
// Load sample projects and render
async function loadProjects() {
  try {
    const res = await fetch('projects.json');
    const data = await res.json();
    const container = document.getElementById('projects-list');
    container.innerHTML = '';
    data.projects.forEach(p => {
      const el = document.createElement('div');
      el.className = 'project';
      el.innerHTML = `
        <img src="${p.image}" alt="${p.title}" />
        <h4>${p.title}</h4>
        <p class="muted">${p.short}</p>
        <p><a href="${p.link}" target="_blank" rel="noopener">View case study / UI designs</a></p>
      `;
      container.appendChild(el);
    });
  } catch (e) {
    console.error(e);
  }
}
loadProjects();

// Contact form handling (works with optional backend). If backend not present, it will show a message.
document.getElementById('contact-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };
  try {
    const res = await fetch(form.action, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const json = await res.json();
    document.getElementById('form-result').textContent = json.message || 'Message sent!';
    form.reset();
  } catch (err) {
    document.getElementById('form-result').textContent = 'Backend not found. To enable contact form, deploy server.js or use a form service.';
  }
});
