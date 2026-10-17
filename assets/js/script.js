(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Ano atualizado automaticamente no rodapé.
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Animações discretas ao entrar na área visível; respeita preferência de movimento reduzido.
  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Destaca o item de navegação correspondente à seção atual.
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Envio do formulário
 /* const form = document.getElementById("contact-form-js");
  const status = document.getElementById("form-status");
  const btn = document.getElementById("form-submit-btn");

  if (form && status && btn) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      btn.disabled = true;
      btn.setAttribute("aria-disabled", "true");
      btn.innerHTML = "Enviando...";
      status.textContent = "Enviando sua mensagem...";
      status.style.color = "#d1d5db";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            accept: "application/json"
          }
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          const message = data.errors ? data.errors.join(", ") : "Não foi possível enviar sua mensagem.";
          throw new Error(message);
        }

        status.style.color = "#4CAF50";
        status.textContent = "Mensagem enviada com sucesso! Obrigado(a) pelo contato.";
        form.reset();
      } catch (error) {
        status.style.color = "#ff5252";
        status.textContent = error.message || "Ocorreu um erro ao enviar a mensagem. Tente novamente.";
      } finally {
        btn.disabled = false;
        btn.setAttribute("aria-disabled", "false");
        btn.innerHTML = "Enviar mensagem <span aria-hidden=\"true\">↗</span>";
      }
    });
  }*/

})();
