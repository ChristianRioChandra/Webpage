function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const trigger = document.querySelector(".hamburger");
  if (!menu) return;

  const isOpen = menu.classList.toggle("open");
  if (trigger) {
    trigger.setAttribute("aria-expanded", String(isOpen));
  }
}

const form = document.getElementById("inquire-form");
const responseMessage = document.getElementById("form-response");
const successModal = document.getElementById("successModal");
const modalCloseButtons = successModal
  ? successModal.querySelectorAll("[data-modal-close]")
  : [];
const modalPrimaryButton = successModal
  ? successModal.querySelector(".success-modal__button")
  : null;

(function () {
  const loader = document.getElementById("pageLoader");
  function hideLoader() {
    loader.classList.add("hidden");
  }
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener("load", function () {
      setTimeout(hideLoader, 300);
    });
  }
})();

document.addEventListener("click", function (event) {
  const menu = document.getElementById("mobileMenu");
  const nav = document.querySelector("nav");

  if (menu && nav && menu.classList.contains("open") && !nav.contains(event.target)) {
    menu.classList.remove("open");
    const trigger = document.querySelector(".hamburger");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  }
});

function openSuccessModal() {
  if (!successModal) return;
  successModal.classList.add("is-open");
  successModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.setTimeout(function () {
    if (modalPrimaryButton) {
      modalPrimaryButton.focus();
    }
  }, 120);
}

function closeSuccessModal() {
  if (!successModal) return;
  successModal.classList.remove("is-open");
  successModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

if (successModal) {
  modalCloseButtons.forEach(function (button) {
    button.addEventListener("click", closeSuccessModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && successModal.classList.contains("is-open")) {
      closeSuccessModal();
    }
  });
}

if (form && responseMessage) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const subject = formData.get("subject")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !subject || !message) {
      showResponse("Please complete every field before sending.", "error");
      return;
    }

    const submitButton = form.querySelector("button");
    if (submitButton) {
      submitButton.disabled = true;
    }

    showResponse("Sending your inquiry...", "success");

    window.setTimeout(function () {
      form.reset();
      showResponse("Thanks! Your inquiry has been submitted successfully.", "success");
      if (submitButton) {
        submitButton.disabled = false;
      }
      openSuccessModal();
    }, 700);
  });
}

function showResponse(text, type) {
  responseMessage.textContent = text;
  responseMessage.className = `form-response ${type}`;
}
