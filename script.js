document.addEventListener('DOMContentLoaded', function() {
  /* === Animação de recorte no carregamento da página === */
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 100); // Atraso de 100ms entre cada card
  });

  /* === Efeitos de hover e interações nos cards === */
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });

    card.addEventListener('click', function() {
      // Animação de clique
      this.style.transform = 'translateY(-2px) scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      }, 80);
    });
  });

  window.addEventListener("load", () => {
    /* === Animação inicial dos cards (efeito collage) === */
    gsap.from(".card", {
      duration: 1,
      opacity: 0,
      scale: 0.8,
      y: () => gsap.utils.random(-80, 80),
      x: () => gsap.utils.random(-80, 80),
      rotation: () => gsap.utils.random(-8, 8),
      ease: "back.out(1.7)",
      stagger: {
        amount: 1.2,
        from: "random"
      }
    });

    /* === Animação inicial dos elementos decorativos === */
    gsap.from(".floating-element, .bottom-right-element", {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      rotation: () => gsap.utils.random(-15, 15),
      ease: "elastic.out(1, 0.5)",
      delay: 1.5
    });

    /* === Rotação contínua no dog-icon === */
    gsap.to(".dog-icon img", {
      rotation: 70,
      duration: 10,
      repeat: -1,
      yoyo: true
    });

    /* === Rotação contínua no star-burst-icon === */
    gsap.to(".sparkle-icon-container img", {
      rotation: 360,
      duration: 6,
      repeat: -1,
      ease: "linear"
    });

    /* === Rotação sutil no circular badge === */
    const circularBadge = document.querySelector('.circular-badge');
    if (circularBadge) {
      let rotation = 0;
      setInterval(() => {
        rotation += 0.2;
        circularBadge.style.transform = `rotate(${Math.sin(rotation) * 5}deg)`;
      }, 100);
    }

    

    /* === Efeito de brilho em ícones com sparkle === */
    const icons = document.querySelectorAll('.sparkle-icon svg, .star-burst-icon svg');
    icons.forEach(icon => {
      setInterval(() => {
        icon.style.transform = 'scale(1.1)';
        setTimeout(() => {
          icon.style.transform = 'scale(1)';
        }, 200);
      }, 3000 + Math.random() * 2000);
    });
  });
});