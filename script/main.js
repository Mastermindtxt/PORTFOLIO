// ===== TECH STACK DATA =====
const techStack = [
  {
    name: "HTML5",
    icon: "fab fa-html5 icon",
    color: "#E34F26",
    category: "frontend",
  },
  {
    name: "CSS3",
    icon: "fab fa-css3-alt icon",
    color: "#1572B6",
    category: "frontend",
  },
  {
    name: "JavaScript",
    icon: "fab fa-js icon",
    color: "#F7DF1E",
    category: "frontend",
  },
  {
    name: "Node.js",
    icon: "fab fa-node-js icon",
    color: "#339933",
    category: "backend",
  },
  {
    name: "Python",
    icon: "fab fa-python icon",
    color: "#3776AB",
    category: "backend",
  },
  {
    name: "Express",
    icon: "fas fa-server icon",
    color: "#000000",
    category: "backend",
  },
  {
    name: "Git",
    icon: "fab fa-git-alt icon",
    color: "#F05032",
    category: "tools",
  },
  {
    name: "GitHub",
    icon: "fab fa-github icon",
    color: "#181717",
    category: "tools",
  },
  {
    name: "Figma",
    icon: "fab fa-figma icon",
    color: "#F24E1E",
    category: "tools",
  },
  {
    name: "VS Code",
    icon: "fas fa-code icon",
    color: "#007ACC",
    category: "tools",
  },
];

// ===== DOM ELEMENTS =====
const body = document.body;
const typewriterText = document.getElementById("typewriterText");
const techWheel = document.getElementById("techWheel");
const sideMenu = document.getElementById("sideMenu");
const sideMenuToggle = document.getElementById("sideMenuToggle");
const closeSideMenu = document.getElementById("closeSideMenu");
const preferencesPanel = document.getElementById("preferencesPanel");
const settingsToggle = document.getElementById("settingsToggle");
const closePreferences = document.getElementById("closePreferences");
const overlay = document.getElementById("overlay");
const themeToggle = document.getElementById("themeToggle");
const themeOptions = document.querySelectorAll(".theme-option");
const fontSizeSlider = document.getElementById("fontSizeSlider");
const fontSizeValue = document.getElementById("fontSizeValue");
const reduceMotion = document.getElementById("reduceMotion");
const pauseAnimations = document.getElementById("pauseAnimations");
const resetPreferencesBtn = document.getElementById("resetPreferences");
const navLinks = document.querySelectorAll(".nav-link");
const categoryButtons = document.querySelectorAll(".tech-category-btn");
const contactForm = document.getElementById("contactForm");
const portfolioItems = document.querySelectorAll("#portfolio .glass");





// ===== TYPEWRITER EFFECT =====
const texts = [
  "Creating Digital Experiences",
  "Building Modern Web Apps",
  "Designing User Interfaces",
  "Developing Scalable Solutions",
  "Crafting Beautiful Code",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTypingPaused = false;

function typeWriter() {
  if (isTypingPaused) return;

  const currentText = texts[textIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typewriterText.textContent = currentText.substring(0, charIndex);
  typewriterText.style.borderRight = isDeleting
    ? "none"
    : "0.15em solid var(--accent)";

  if (!isDeleting && charIndex === currentText.length) {
    isTypingPaused = true;
    setTimeout(() => {
      isTypingPaused = false;
      isDeleting = true;
      setTimeout(typeWriter, 500);
    }, 3000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeWriter, 500);
  } else {
    const speed = isDeleting ? 100 : 150;
    setTimeout(typeWriter, speed);
  }
}






// ===== TECH WHEEL CREATION =====

function createTechWheel(techs) {
  techWheel.innerHTML = "";
  const radius = 150;
  const totalItems = techs.length;

  techs.forEach((tech, index) => {
    const angle = (index / totalItems) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const orb = document.createElement("div");
    orb.className = "tech-orb orbrotate";
    orb.style.border = "2px solid red"
    orb.style.left = `calc(50% + ${x}px)`;
    orb.style.top = `calc(50% + ${y}px)`;
    orb.style.transform = `translate(-50%, -50%)`;
    orb.style.background = `linear-gradient(45deg, ${tech.color}, rgba(255,255,255,0.1))`;
    orb.innerHTML = `
                    <i class="${tech.icon}"></i>
                    <div class="tech-tooltip">${tech.name}</div>
                `;

    orb.addEventListener("click", () => {
      alert(`Selected: ${tech.name}\nCategory: ${tech.category}`);
    });

    techWheel.appendChild(orb);
  });
}








// ===== FILTER TECH BY CATEGORY =====
function filterTechByCategory(category) {
  const filteredTechs =
    category === "all"
      ? techStack
      : techStack.filter((tech) => tech.category === category);

  createTechWheel(filteredTechs);

  // Update active category button
  categoryButtons.forEach((btn) => {
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}








// ===== SIDE MENU FUNCTIONALITY =====
sideMenuToggle.addEventListener("click", () => {
  sideMenu.classList.add("active");
  overlay.classList.add("active");
});

closeSideMenu.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});








// ===== SETTINGS TOGGLE (IN SIDE MENU) =====
settingsToggle.addEventListener("click", () => {
  preferencesPanel.classList.add("active");
  overlay.classList.add("active");
});

closePreferences.addEventListener("click", () => {
  preferencesPanel.classList.remove("active");
  overlay.classList.remove("active");
});






// ===== OVERLAY FUNCTIONALITY =====
overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  preferencesPanel.classList.remove("active");
  overlay.classList.remove("active");
});





// ===== THEME TOGGLE =====
themeToggle.addEventListener("click", () => {
  const currentTheme = body.classList.contains("dark-theme")
    ? "dark"
    : body.classList.contains("high-contrast-theme")
    ? "high-contrast"
    : "light";

  let nextTheme;
  if (currentTheme === "light") nextTheme = "dark";
  else if (currentTheme === "dark") nextTheme = "high-contrast";
  else nextTheme = "light";

  body.classList.remove("light-theme", "dark-theme", "high-contrast-theme");
  body.classList.add(`${nextTheme}-theme`);
  themeToggle.classList.toggle("active", nextTheme !== "light");

  // Update theme options visual state
  themeOptions.forEach((opt) => {
    const optTheme = opt.getAttribute("data-theme");
    opt.style.borderColor =
      optTheme === nextTheme ? "var(--primary)" : "transparent";
  });

  localStorage.setItem("portfolio-theme", nextTheme);
});







// ===== THEME OPTIONS =====
themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const theme = option.getAttribute("data-theme");

    body.classList.remove("light-theme", "dark-theme", "high-contrast-theme");
    body.classList.add(`${theme}-theme`);
    themeToggle.classList.toggle("active", theme !== "light");

    themeOptions.forEach((opt) => {
      opt.style.borderColor = opt === option ? "var(--primary)" : "transparent";
    });

    localStorage.setItem("portfolio-theme", theme);
  });
});









// ===== FONT SIZE CONTROL =====
fontSizeSlider.addEventListener("input", () => {
  const fontSize = fontSizeSlider.value;
  fontSizeValue.textContent = `${fontSize}px`;
  document.documentElement.style.fontSize = `${fontSize}px`;
  localStorage.setItem("portfolio-font-size", fontSize);
});








// ===== ANIMATION CONTROLS =====
reduceMotion.addEventListener("change", () => {
  if (reduceMotion.checked) {
    document.documentElement.style.setProperty("--transition-speed", "0.1s");
    body.classList.add("reduce-motion");
  } else {
    document.documentElement.style.setProperty("--transition-speed", "0.4s");
    body.classList.remove("reduce-motion");
  }
  localStorage.setItem("portfolio-reduce-motion", reduceMotion.checked);
});

pauseAnimations.addEventListener("change", () => {
  const allAnimations = document.querySelectorAll("*");
  allAnimations.forEach((el) => {
    if (pauseAnimations.checked) {
      el.style.animationPlayState = "paused";
      el.style.transition = "none";
    } else {
      el.style.animationPlayState = "running";
      el.style.transition = "";
    }
  });
  localStorage.setItem("portfolio-pause-animations", pauseAnimations.checked);
});










// ===== RESET PREFERENCES =====
resetPreferencesBtn.addEventListener("click", () => {
  // Reset theme
  body.classList.remove("dark-theme", "high-contrast-theme");
  body.classList.add("light-theme");
  themeToggle.classList.remove("active");

  // Reset font size
  fontSizeSlider.value = 16;
  fontSizeValue.textContent = "16px";
  document.documentElement.style.fontSize = "16px";

  // Reset animation controls
  reduceMotion.checked = false;
  pauseAnimations.checked = false;
  document.documentElement.style.setProperty("--transition-speed", "0.4s");
  body.classList.remove("reduce-motion");

  // Reset theme options visual
  themeOptions.forEach((opt) => {
    const optTheme = opt.getAttribute("data-theme");
    opt.style.borderColor =
      optTheme === "light" ? "var(--primary)" : "transparent";
  });

  // Clear localStorage
  localStorage.clear();

  alert("Preferences have been reset to default settings.");
});








// ===== SCROLL NAVIGATION =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}









// ===== PORTFOLIO HOVER EFFECTS =====
portfolioItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const overlay = item.querySelector("div");
    const image = item.querySelector("img");
    image.style.opacity = "50%";
    overlay.style.transform = "translateY(0)";
    overlay.style.opacity = "30";
    item.style.transform = "translateY(-10px)";
  });

  item.addEventListener("mouseleave", () => {
    const overlay = item.querySelector("div");
    const image = item.querySelector("img");
    image.style.opacity = "100%";
    overlay.style.transform = "translateY(20px)";
    overlay.style.opacity = "0";
    item.style.transform = "translateY(0)";
    item.style.opacity = "100%";
  });
});











// ===== FORM SUBMISSION =====
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value;

  const successMsg = document.createElement("div");
  successMsg.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--card-bg);
                    padding: 40px;
                    border-radius: var(--border-radius);
                    box-shadow: 0 20px 60px var(--shadow-color);
                    text-align: center;
                    z-index: 3000;
                    max-width: 400px;
                    width: 90%;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(45deg, var(--primary), var(--accent));
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 20px;
                        color: white;
                        font-size: 1.5rem;
                    ">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3 style="margin-bottom: 10px;">Message Sent!</h3>
                    <p style="color: var(--gray); margin-bottom: 30px;">
                        Thank you ${name}, I'll get back to you soon.
                    </p>
                    <button onclick="this.parentElement.remove()" class="btn btn-primary">
                        Close
                    </button>
                </div>
            `;

  document.body.appendChild(successMsg);
  this.reset();
});










// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  
  console.log("loaded");
  
  // Start typewriter effect
  setTimeout(typeWriter, 1000);

  
  
  
  
  // Initialize tech wheel
  createTechWheel(techStack);
  const techOrb = techWheel.querySelectorAll(".tech-orb");
  const i = techWheel.querySelectorAll(".icon");
  techOrb.forEach((orbs) => {
    orbs.addEventListener("mouseenter", () => {
      techWheel.style.animationPlayState = "paused";
      i.forEach((png) => {
        png.style.animationPlayState = "paused";
      });
      
    });
    orbs.addEventListener("mouseleave", () => {
      techWheel.style.animationPlayState = "running";
      i.forEach((png) => {
        png.style.animationPlayState = "running";
      });
    });
  });

  
  
  
  
  
  
  // Set up category filter
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      filterTechByCategory(category);
    });
  });

  
  
  
  
  
  
  // Load saved theme
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  body.classList.remove("light-theme", "dark-theme", "high-contrast-theme");
  body.classList.add(`${savedTheme}-theme`);
  themeToggle.classList.toggle("active", savedTheme !== "light");

  
  
  
  
  
  // Load font size
  const savedFontSize = localStorage.getItem("portfolio-font-size") || "16";
  fontSizeSlider.value = savedFontSize;
  fontSizeValue.textContent = `${savedFontSize}px`;
  document.documentElement.style.fontSize = `${savedFontSize}px`;

  
  
  
  
  
  // Load animation preferences
  const savedReduceMotion =
    localStorage.getItem("portfolio-reduce-motion") === "true";
  const savedPauseAnimations =
    localStorage.getItem("portfolio-pause-animations") === "true";

  reduceMotion.checked = savedReduceMotion;
  pauseAnimations.checked = savedPauseAnimations;

  if (savedReduceMotion) {
    document.documentElement.style.setProperty("--transition-speed", "0.1s");
    body.classList.add("reduce-motion");
  }

  if (savedPauseAnimations) {
    const allAnimations = document.querySelectorAll("*");
    allAnimations.forEach((el) => {
      el.style.animationPlayState = "paused";
      el.style.transition = "none";
    });
  }

  
  
  
  
  
  // Initialize theme options visual state
  themeOptions.forEach((opt) => {
    const optTheme = opt.getAttribute("data-theme");
    opt.style.borderColor =
      optTheme === savedTheme ? "var(--primary)" : "transparent";
  });

  
  
  
  
  // Set up scroll listener
  window.addEventListener("scroll", () => {
    updateActiveNavLink();

    // Update nav scroll effect
    const navContainer = document.querySelector(".nav-container");
    const scrollProgress = document.getElementById("scrollProgress");

    if (window.scrollY > 100) {
      navContainer.classList.add("scrolled");
    } else {
      navContainer.classList.remove("scrolled");
    }

    // Update scroll progress
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
  });

  
  
  
  
  
  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Close side menu if open
      sideMenu.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
});
