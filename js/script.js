// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Main initialization function
function initializeApp() {
  initializeNavigation();
  initializeTechnologyTabs(); // Всегда инициализируем табы технологий

  // Проверяем, не мобильное ли это устройство
  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    // Запускаем анимации только на десктопе
    initializeScrollEffects();
    initializeAnimations();
    initializeServiceCards();
    initializeHexagons();
    initializePremiumEffects();
    initializeParticleSystem();
    initializeEasterEgg();
    initializeScrollToTop();
  }

  // Инициализируем стрелки перехода между секциями на всех устройствах
  initializeSectionArrows();
}

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Update active navigation based on scroll position
  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const body = document.body;

  // Отладочная информация
  console.log("Mobile menu elements found:", {
    mobileMenuToggle: !!mobileMenuToggle,
    mobileMenu: !!mobileMenu,
  });

  // Функция для закрытия меню
  function closeMobileMenu() {
    console.log("Closing mobile menu...");
    if (mobileMenu) {
      mobileMenu.classList.remove("active");
      console.log("Menu class removed");
    }
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.remove("active");
      // Убеждаемся, что бургер-меню остается видимым
      mobileMenuToggle.style.display = "flex";
      console.log("Toggle class removed, display set to flex");
    }
    body.style.overflow = "";
    console.log("Mobile menu closed successfully");
  }

  // Функция для открытия меню
  function openMobileMenu() {
    console.log("Opening mobile menu...");
    if (mobileMenu) {
      mobileMenu.classList.add("active");
    }
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.add("active");
      // Убеждаемся, что бургер-меню остается видимым
      mobileMenuToggle.style.display = "flex";
    }
    body.style.overflow = "hidden";
  }

  // Открытие меню по клику на бургер
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Burger menu clicked");
      openMobileMenu();
    });
  }

  // Закрытие мобильного меню при клике на ссылку
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  // Закрытие мобильного меню при клике вне его
  document.addEventListener("click", function (e) {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      console.log("Clicking outside menu, closing...");
      closeMobileMenu();
    }
  });

  // Дополнительный обработчик для клика на фон меню
  if (mobileMenu) {
    mobileMenu.addEventListener("click", function (e) {
      if (e.target === mobileMenu) {
        console.log("Clicking on menu background, closing...");
        closeMobileMenu();
      }
    });
  }

  // Закрытие меню по клавише Escape
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      mobileMenu &&
      mobileMenu.classList.contains("active")
    ) {
      console.log("Escape key pressed, closing menu...");
      closeMobileMenu();
    }
  });

  // Обработчик изменения размера окна
  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Отключаем все анимации при переходе на мобильный
      document.body.style.setProperty("--disable-animations", "true");
    } else {
      // Включаем анимации при переходе на десктоп
      document.body.style.setProperty("--disable-animations", "false");
    }
  });
}

// Technology tabs functionality
function initializeTechnologyTabs() {
  const techTabs = document.querySelectorAll(".tech-tab");
  const hexagonGrids = document.querySelectorAll(".hexagon-grid");

  console.log("Initializing technology tabs:", {
    tabs: techTabs.length,
    grids: hexagonGrids.length,
  });

  techTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      console.log("Tab clicked:", category);

      // Update active tab
      techTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding technology grid
      hexagonGrids.forEach((grid) => {
        grid.classList.remove("active");
        if (grid.id === `${category}-tech`) {
          grid.classList.add("active");
          console.log("Activated grid:", grid.id);
        }
      });

      // Add animation to the new grid
      const activeGrid = document.querySelector(`#${category}-tech`);
      if (activeGrid) {
        activeGrid.style.transition = "all 0.3s ease";
        activeGrid.style.opacity = "0";
        activeGrid.style.transform = "translateY(10px)";

        requestAnimationFrame(() => {
          activeGrid.style.opacity = "1";
          activeGrid.style.transform = "translateY(0)";
        });
      }
    });
  });

  // Убедимся, что первая вкладка активна по умолчанию
  const firstTab = document.querySelector(".tech-tab.active");
  if (firstTab) {
    const category = firstTab.getAttribute("data-category");
    const defaultGrid = document.querySelector(`#${category}-tech`);
    if (defaultGrid) {
      defaultGrid.classList.add("active");
      console.log("Default grid activated:", defaultGrid.id);
    }
  }
}

// Scroll effects
function initializeScrollEffects() {
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;

    // Header background opacity with premium colors
    header.style.background =
      scrollTop > 100 ? "rgba(10, 10, 10, 0.98)" : "rgba(10, 10, 10, 0.95)";
  });
}

// Advanced Animation System with Performance Optimizations
function initializeAnimations() {
  // Check if user prefers reduced motion or is on mobile
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isMobile = window.innerWidth <= 768;

  if (prefersReducedMotion || isMobile) {
    // Skip animations for users who prefer reduced motion or on mobile
    document
      .querySelectorAll(
        ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in"
      )
      .forEach((el) => {
        el.classList.add("visible");
      });
    return;
  }

  // Intersection Observer for scroll animations with performance optimizations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
          entry.target.classList.add("visible");

          // Add special effects for specific elements
          if (entry.target.classList.contains("service-card")) {
            entry.target.style.boxShadow =
              "0 20px 40px rgba(99, 102, 241, 0.2)";
          }

          if (entry.target.classList.contains("stat-card")) {
            entry.target.style.boxShadow =
              "0 10px 30px rgba(99, 102, 241, 0.15)";
          }

          if (entry.target.classList.contains("hexagon")) {
            entry.target.style.filter =
              "drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))";
          }
        });

        // Unobserve element after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Hero section special animations
  initializeHeroAnimations();

  // Technology tabs animations
  initializeTechAnimations();
}

// Hero section animations with typewriter effect
function initializeHeroAnimations() {
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");

  if (heroTitle && heroSubtitle) {
    // Animate hero title with typewriter effect
    setTimeout(() => {
      heroTitle.classList.add("visible");

      // Add typewriter effect to highlight text
      const highlight = heroTitle.querySelector(".highlight");
      if (highlight) {
        const text = highlight.textContent;
        highlight.textContent = "";
        highlight.classList.add("typewriter");

        let i = 0;
        const typeWriter = setInterval(() => {
          if (i < text.length) {
            highlight.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(typeWriter);
            highlight.classList.remove("typewriter");
          }
        }, 65); // Ускорил печатание с 100ms до 50ms
      }
    }, 300); // Ускорил начало анимации с 500ms до 300ms

    // Animate subtitle
    setTimeout(() => {
      heroSubtitle.classList.add("visible");
    }, 1000);
  }
}

// Technology section animations
function initializeTechAnimations() {
  const techTabs = document.querySelectorAll(".tech-tab");
  const hexagonGrids = document.querySelectorAll(".hexagon-grid");

  // Animate tabs on load
  techTabs.forEach((tab, index) => {
    setTimeout(() => {
      tab.classList.add("visible");
    }, 200 + index * 100);
  });

  // Animate hexagons when grid becomes active
  hexagonGrids.forEach((grid) => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          if (grid.classList.contains("active")) {
            const hexagons = grid.querySelectorAll(".hexagon");
            hexagons.forEach((hex, index) => {
              setTimeout(() => {
                hex.classList.add("visible");
              }, index * 100);
            });
          }
        }
      });
    });

    observer.observe(grid, { attributes: true });
  });
}

// Scroll to top functionality
function initializeScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", function () {
    scrollTopBtn.style.display = window.pageYOffset > 300 ? "flex" : "none";
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Service cards functionality with premium effects
function initializeServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.2s ease";
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(99, 102, 241, 0.2)";
      this.style.borderColor = "rgba(99, 102, 241, 0.4)";

      // Add orange glow to icon
      const icon = this.querySelector(".icon-bg");
      if (icon) {
        icon.style.opacity = "0.3";
        icon.style.transform = "scale(1.1)";
        icon.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.5)";
      }
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 10px 30px rgba(99, 102, 241, 0.1)";
      this.style.borderColor = "rgba(99, 102, 241, 0.1)";

      // Remove orange glow from icon
      const icon = this.querySelector(".icon-bg");
      if (icon) {
        icon.style.opacity = "0.15";
        icon.style.transform = "scale(1)";
        icon.style.boxShadow = "none";
      }
    });

    card.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    });
  });
}

// Hexagons functionality with premium effects
function initializeHexagons() {
  const hexagons = document.querySelectorAll(".hexagon:not(.category-header)");

  hexagons.forEach((hexagon) => {
    hexagon.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.2s ease";
      this.style.transform = "scale(1.08) rotate(3deg)";
      this.style.boxShadow = "0 15px 35px rgba(99, 102, 241, 0.3)";
      this.style.borderColor = "rgba(99, 102, 241, 0.5)";

      // Add orange glow
      this.style.filter = "drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))";
    });

    hexagon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
      this.style.boxShadow = "0 10px 30px rgba(99, 102, 241, 0.2)";
      this.style.borderColor = "rgba(99, 102, 241, 0.1)";
      this.style.filter = "none";
    });

    hexagon.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    });
  });
}

// Premium effects initialization
function initializePremiumEffects() {
  // Add orange cursor trail effect
  let mouseX = 0,
    mouseY = 0;
  let trail = [];
  const maxTrailLength = 10;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Add trail point
    trail.push({ x: mouseX, y: mouseY });
    if (trail.length > maxTrailLength) {
      trail.shift();
    }

    // Create orange trail effect
    if (trail.length > 3) {
      createTrailEffect(trail);
    }
  });

  // Add premium loading animation with logo
  const loader = document.createElement("div");
  loader.className = "premium-loader";
  loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <div class="loader-logo-icon">
                    <div class="loader-logo-inner"></div>
                </div>
                <div class="loader-logo-text">Аспирити</div>
            </div>
            <div class="loader-ring"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
  document.body.appendChild(loader);

  // Remove loader after page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.remove();
      }, 200);
    }, 200);
  });

  // Add orange scroll indicator
  createScrollIndicator();
}

// Create orange trail effect
function createTrailEffect(trail) {
  trail.forEach((point, index) => {
    const opacity = (index / trail.length) * 0.3;
    const size = (index / trail.length) * 4;

    const dot = document.createElement("div");
    dot.style.cssText = `
            position: fixed;
            left: ${point.x}px;
            top: ${point.y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(139, 92, 246, ${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;

    document.body.appendChild(dot);

    setTimeout(() => {
      dot.remove();
    }, 100);
  });
}

// Create scroll indicator
function createScrollIndicator() {
  const indicator = document.createElement("div");
  indicator.className = "scroll-indicator";
  indicator.innerHTML = `
        <div class="indicator-bar">
            <div class="indicator-progress"></div>
        </div>
    `;
  document.body.appendChild(indicator);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const progress = indicator.querySelector(".indicator-progress");
    progress.style.width = scrollPercent + "%";
  });
}

// Particle system for premium background
function initializeParticleSystem() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "particle-container";
  document.body.appendChild(particleContainer);

  // Create orange particles
  for (let i = 0; i < 50; i++) {
    createParticle(particleContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 3 + 1;
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;

  particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: float ${duration}s ${delay}s infinite ease-in-out;
    `;

  container.appendChild(particle);
}

// Performance optimizations
function initializePerformanceOptimizations() {
  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
      // Scroll-based logic here
    }, 16);
  });
}

// Easter egg - Konami code with premium effects
function initializeEasterEgg() {
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      // Premium orange rain effect
      createOrangeRain();

      // Add orange glow to body
      document.body.style.animation = "orangeGlow 2s infinite";
      setTimeout(() => {
        document.body.style.animation = "";
      }, 2000);
    }
  });
}

// Create orange rain effect
function createOrangeRain() {
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const drop = document.createElement("div");
      drop.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                width: 2px;
                height: 20px;
                background: linear-gradient(to bottom, #8B5CF6, #4F46E5);
                pointer-events: none;
                z-index: 10000;
                animation: orangeRain 1s linear forwards;
            `;

      document.body.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, 1000);
    }, i * 20);
  }
}

// Initialize section arrows functionality
function initializeSectionArrows() {
  const arrows = document.querySelectorAll(".section-arrow");

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Smooth scroll to target section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Add click animation
        this.style.transform = "translateX(-50%) scale(0.95)";
        setTimeout(() => {
          this.style.transform = "translateX(-50%) scale(1)";
        }, 200);
      }
    });

    // Add hover effects
    arrow.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(-50%) translateY(5px)";
    });

    arrow.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(-50%) translateY(0)";
    });
  });
}

// Initialize scroll to top arrow functionality
function initializeScrollToTopArrow() {
  const scrollToTopArrow = document.getElementById("scrollToTopArrow");

  // Show/hide arrow based on scroll position
  function toggleScrollToTopArrow() {
    if (window.scrollY > 300) {
      scrollToTopArrow.classList.add("visible");
    } else {
      scrollToTopArrow.classList.remove("visible");
    }
  }

  // Scroll to top functionality
  scrollToTopArrow.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Add click animation
    this.style.transform = "translateY(-5px) scale(0.95)";
    setTimeout(() => {
      this.style.transform = "translateY(-5px) scale(1)";
    }, 200);
  });

  // Add hover effects
  scrollToTopArrow.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
  });

  scrollToTopArrow.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });

  // Listen for scroll events
  window.addEventListener("scroll", toggleScrollToTopArrow);

  // Initial check
  toggleScrollToTopArrow();
}
