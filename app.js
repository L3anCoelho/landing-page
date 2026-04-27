// ============================================================
// MENU MOBILE
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

}

// ============================================================
// DIMINUIR VELOCIDADE DOS VÍDEOS
// ============================================================
document.querySelectorAll("video").forEach(video => {
  video.playbackRate = 0.6;
});

// ============================================================
// CAROUSELS DE SERVIÇOS
// ============================================================
// ============================================================
// CAROUSELS DE SERVIÇOS
// ============================================================
document.querySelectorAll('.carousel').forEach(carousel => {

  const track   = carousel.querySelector('.carousel-track');
  const dotsNav = carousel.querySelector('.carousel-dots');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');

  if (!track || !dotsNav || !nextBtn || !prevBtn) return;

  const slides = Array.from(track.querySelectorAll('img, video'));
  if (slides.length === 0) return;

  // Verifica se este carousel contém vídeos
  const hasVideos = slides.some(s => s.tagName === 'VIDEO');

  let index    = 0;
  let autoPlay = null;

  // Criar dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsNav.appendChild(dot);
  });

  const dots = dotsNav.querySelectorAll('.carousel-dot');

  const goTo = (i) => {
    // Pausa todos os vídeos antes de trocar o slide
    slides.forEach(s => {
      if (s.tagName === 'VIDEO') {
        s.pause();
        s.currentTime = 0;
      }
    });

    index = (i + slides.length) % slides.length;

    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    const currentSlide = slides[index];

    if (currentSlide.tagName === 'VIDEO') {
      // Pequeno timeout garante que o browser processe o reflow antes do play
      setTimeout(() => {
        currentSlide.play().catch(() => {});
      }, 50);
    }
  };

  // ============================================================
  // AVANÇO AUTOMÁTICO PARA IMAGENS (não interfere em carousels de vídeo)
  // ============================================================
  const startAuto = () => {
    if (hasVideos) return; // vídeos controlam o avanço pelo evento "ended"
    stopAuto();
    autoPlay = setInterval(() => goTo(index + 1), 6000);
  };

  const stopAuto = () => {
    if (autoPlay) {
      clearInterval(autoPlay);
      autoPlay = null;
    }
  };

  // ============================================================
  // VÍDEOS PASSAM AUTOMATICAMENTE QUANDO TERMINAM
  // ============================================================
  slides.forEach((slide, i) => {
    if (slide.tagName === 'VIDEO') {
      slide.addEventListener('ended', () => {
        goTo(i + 1); // avança para o próximo (loop automático no goTo)
      });
    }
  });

  // Botões manuais
  nextBtn.addEventListener('click', () => goTo(index + 1));
  prevBtn.addEventListener('click', () => goTo(index - 1));

  // Pause no hover apenas para carousels de imagem
  if (!hasVideos) {
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave',  startAuto);
  }

  // Swipe mobile
  let startX = 0;
  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff >  50) goTo(index + 1);
    if (diff < -50) goTo(index - 1);
  }, { passive: true });

  // ← CORREÇÃO PRINCIPAL: inicializa o carousel e dispara o play do primeiro slide
  goTo(0);
  startAuto();

});

  // ============================================================
  // AVANÇO AUTOMÁTICO PARA IMAGENS
  // ============================================================
  const startAuto = () => {

    stopAuto();

    autoPlay = setInterval(() => {

      const currentSlide = slides[index];

      if (currentSlide.tagName !== "VIDEO") {
        goTo(index + 1);
      }

    }, 6000);

  };

  const stopAuto = () => {
    if (autoPlay) {
      clearInterval(autoPlay);
      autoPlay = null;
    }
  };

  // ============================================================
  // VÍDEOS PASSAM AUTOMATICAMENTE QUANDO TERMINAM
  // ============================================================
  slides.forEach((slide, i) => {

    if (slide.tagName === "VIDEO") {

      slide.addEventListener("ended", () => {
        goTo(i + 1);
      });

    }

  });

  // Botões
  nextBtn.addEventListener('click', () => goTo(index + 1));
  prevBtn.addEventListener('click', () => goTo(index - 1));

  // Pause no hover
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Swipe mobile
  let startX = 0;

  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', e => {

    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50)  goTo(index + 1);
    if (diff < -50) goTo(index - 1);

  }, { passive: true });

  startAuto();



// ============================================================
// CAROUSEL DE WORKS
// ============================================================
const worksCarousel = document.querySelector('.works-carousel');

if (worksCarousel) {

  const worksTrack  = worksCarousel.querySelector('.works-track');
  const worksSlides = worksCarousel.querySelectorAll('.work-slide');
  const nextWork    = worksCarousel.querySelector('.works-btn.next');
  const prevWork    = worksCarousel.querySelector('.works-btn.prev');

  if (worksTrack && worksSlides.length > 0) {

    let workIndex = 0;
    let worksAuto = null;

    const goToWork = (i) => {

      workIndex = (i + worksSlides.length) % worksSlides.length;

      worksTrack.style.transform = `translateX(-${workIndex * 100}%)`;

    };

    const startWorksAuto = () => {

      stopWorksAuto();

      worksAuto = setInterval(() => {
        goToWork(workIndex + 1);
      }, 6000);

    };

    const stopWorksAuto = () => {

      if (worksAuto) {
        clearInterval(worksAuto);
        worksAuto = null;
      }

    };

    if (nextWork) nextWork.addEventListener('click', () => goToWork(workIndex + 1));
    if (prevWork) prevWork.addEventListener('click', () => goToWork(workIndex - 1));

    worksCarousel.addEventListener('mouseenter', stopWorksAuto);
    worksCarousel.addEventListener('mouseleave', startWorksAuto);

    // Swipe mobile
    let startX = 0;

    worksCarousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    worksCarousel.addEventListener('touchend', e => {

      const diff = startX - e.changedTouches[0].clientX;

      if (diff > 50)  goToWork(workIndex + 1);
      if (diff < -50) goToWork(workIndex - 1);

    }, { passive: true });

    startWorksAuto();

  }

}