const form = document.querySelector("#contact-form");
const contactEmail = document.querySelector("#contact-email");
const feedback = document.querySelector("#feedback");
const textFields = form.querySelectorAll("input[required], textarea[required]");

form.addEventListener("input", (event) => {
  event.target.setCustomValidity("");
  feedback.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  for (const field of textFields) {
    field.setCustomValidity(field.value.trim() ? "" : "Renseignez ce champ.");
  }
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const body = [
    ["Nom", data.get("name").trim()],
    ["Adresse e-mail", data.get("email").trim()],
    ["Entreprise", data.get("company").trim()],
    ["Domaine", data.get("topic")],
    ["Besoin", data.get("need").trim()],
    ["Date de démarrage", data.get("timing")],
  ].filter(([, value]) => value)
    .map(([label, value]) => label + " : " + value)
    .join("\r\n\r\n");

  feedback.textContent = "Envoyez le brouillon depuis votre messagerie. Si elle ne s’ouvre pas, utilisez l’adresse affichée pour écrire directement.";
  window.location.href = contactEmail.href + "?subject=" +
    encodeURIComponent("Demande de contact · Sawda Consulting") +
    "&body=" + encodeURIComponent(body);
});

form.hidden = false;

const topicField = form.querySelector("#topic");
document.querySelectorAll("a[data-topic]").forEach((link) => {
  link.addEventListener("click", () => {
    topicField.value = link.dataset.topic;
    feedback.textContent = "";
  });
});

document.querySelectorAll(".workflow-demo").forEach((demo) => {
  const controls = demo.querySelector(".demo-controls");
  const steps = Array.from(demo.querySelectorAll(".demo-step"));
  const buttons = steps.map((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = step.dataset.label;
    button.addEventListener("click", () => showStep(index));
    controls.append(button);
    return button;
  });

  function showStep(activeIndex) {
    steps.forEach((step, index) => {
      const active = index === activeIndex;
      step.hidden = !active;
      buttons[index].setAttribute("aria-pressed", String(active));
    });
  }

  showStep(0);
  controls.hidden = false;
});
