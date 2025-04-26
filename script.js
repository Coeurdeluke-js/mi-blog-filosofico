  // Variables para modales
  const modals = {
    intro: document.getElementById("intro-modal"),
    filosofia: document.getElementById("filosofia-modal"),
    sociedad: document.getElementById("sociedad-modal"),
    psicologia: document.getElementById("psicologia-modal")
  };
  
  const buttons = {
    intro: document.getElementById("intro-btn"),
    filosofia: document.getElementById("filosofia-btn"),
    sociedad: document.getElementById("sociedad-btn"),
    psicologia: document.getElementById("psicologia-btn")
  };
  
  const closes = document.querySelectorAll(".close");
  
  // Función para abrir modal
  function openModal(modalId) {
    modals[modalId].style.display = "block";
    setTimeout(() => {
      modals[modalId].classList.add("show");
    }, 10);
    document.body.style.overflow = "hidden"; // Previene scroll
  }
  
  // Función para cerrar modal
  function closeModal(modalId) {
    modals[modalId].classList.remove("show");
    setTimeout(() => {
      modals[modalId].style.display = "none";
      document.body.style.overflow = "auto"; // Restaura scroll
    }, 300);
  }
  
  // Event listeners para botones
  buttons.intro.addEventListener("click", () => openModal("intro"));
  buttons.filosofia.addEventListener("click", () => openModal("filosofia"));
  buttons.sociedad.addEventListener("click", () => openModal("sociedad"));
  buttons.psicologia.addEventListener("click", () => openModal("psicologia"));
  
  // Event listeners para cerrar modales
  closes.forEach(close => {
    close.addEventListener("click", function() {
      const modalId = this.closest(".modal").id.split("-")[0];
      closeModal(modalId);
    });
  });
  
  // Cerrar modal si se hace clic fuera del contenido
  window.addEventListener("click", function(event) {
    for (const modalId in modals) {
      if (event.target === modals[modalId]) {
        closeModal(modalId);
      }
    }
  });
  
  // Animación de elementos al hacer scroll
  document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll(".section-card, .section-title, #introduccion > div, #sociedad > div, #conclusion > div");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  });
  
  // Smooth scroll para navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Ajuste para la navbar
        behavior: 'smooth'
      });
    });
  });
  
  // Efecto hover para cards
  const cards = document.querySelectorAll('.section-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
  });
  
  // Efecto de resaltado para enlaces de navegación
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('text-[#FFD700]');
      } else {
        document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('text-[#FFD700]');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);
  
  // Efecto de parallax para la sección hero
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    if (hero) {
      hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
  });
  
  // Preloader (simulado)
  window.addEventListener('load', function() {
    setTimeout(() => {
      document.body.classList.add('loaded');
      // Animación inicial para el hero
      const heroContent = document.querySelector('.hero > div:last-child');
      if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }
    }, 300);
  });