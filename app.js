const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 7);

    const demo = document.getElementById("demo");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = countDownDate.getTime() - now;

      if (distance <= 0) {
        demo.textContent = "EXPIRED";
        demo.className = "badge text-bg-secondary ms-2";
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      demo.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    // Modal Form Validation + Success message (front-end only)
    const joinForm = document.getElementById("joinForm");
    const formAlert = document.getElementById("formAlert");
    const joinModalEl = document.getElementById("joinModal");
    const joinModal = new bootstrap.Modal(joinModalEl);

    joinForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // basic validation
      const fullName = document.getElementById("fullName");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const plan = document.getElementById("plan");

      let isValid = true;

      // helper
      function setValidity(el, condition) {
        if (!condition) {
          el.classList.add("is-invalid");
          el.classList.remove("is-valid");
          isValid = false;
        } else {
          el.classList.remove("is-invalid");
          el.classList.add("is-valid");
        }
      }

      setValidity(fullName, fullName.value.trim().length >= 2);
      setValidity(email, email.checkValidity());
      setValidity(phone, phone.value.trim().length >= 7);
      setValidity(plan, plan.value.trim() !== "");

      if (!isValid) return;

      // Show success message (demo)
      formAlert.classList.remove("d-none");

      // OPTIONAL: close modal after 1.2s and reset
      setTimeout(() => {
        joinModal.hide();
      }, 1200);
    });

    // Reset form when modal closes
    joinModalEl.addEventListener("hidden.bs.modal", () => {
      joinForm.reset();
      formAlert.classList.add("d-none");
      ["fullName", "email", "phone", "plan"].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove("is-valid", "is-invalid");
      });
    });