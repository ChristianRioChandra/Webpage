function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

(function () {
  const loader = document.getElementById('pageLoader');
  function hideLoader() { loader.classList.add('hidden'); }
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener('load', function () { setTimeout(hideLoader, 300); });
  }
})();

document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const nav = document.querySelector('nav');

  if (menu.classList.contains('open') && !nav.contains(e.target)) {
    menu.classList.remove('open');
  }
});

const sponsorshipForm = document.getElementById('sponsorshipApplicationForm');
const formStatus = document.getElementById('formStatus');
const successModal = document.getElementById('successModal');
const modalCloseButtons = successModal
  ? successModal.querySelectorAll('[data-modal-close]')
  : [];
const modalPrimaryButton = successModal
  ? successModal.querySelector('.success-modal__button')
  : null;

function openSuccessModal() {
  if (!successModal) return;
  successModal.classList.add('is-open');
  successModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  window.setTimeout(function () {
    if (modalPrimaryButton) {
      modalPrimaryButton.focus();
    }
  }, 120);
}

function closeSuccessModal() {
  if (!successModal) return;
  successModal.classList.remove('is-open');
  successModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (successModal) {
  modalCloseButtons.forEach(function (button) {
    button.addEventListener('click', closeSuccessModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && successModal.classList.contains('is-open')) {
      closeSuccessModal();
    }
  });
}

if (sponsorshipForm && formStatus) {
  sponsorshipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.textContent = 'Thank you. Your sponsorship application was submitted successfully.';
    sponsorshipForm.reset();
    openSuccessModal();
  });
}
