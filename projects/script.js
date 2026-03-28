document.addEventListener("DOMContentLoaded", () => {

  /* ================= MENU + OVERLAY ================= */
  const menu = document.getElementById("menu");
  const navbar = document.querySelector(".navbar");
  const overlay = document.getElementById("nav-overlay");

  function closeMenu() {
    menu.classList.remove("fa-times");
    navbar.classList.remove("nav-toggle");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  menu.addEventListener("click", () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("nav-toggle");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  overlay.addEventListener("click", closeMenu);

  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });


  /* ================= SCROLL HANDLER ================= */
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);

  function handleScroll() {
    closeMenu();

    const scrollTopBtn = document.querySelector("#scroll-top");

    if (window.scrollY > 60) {
      scrollTopBtn?.classList.add("active");
    } else {
      scrollTopBtn?.classList.remove("active");
    }

    // Scroll Spy
    document.querySelectorAll("section").forEach(section => {
      const height = section.offsetHeight;
      const offset = section.offsetTop - 200;
      const top = window.scrollY;
      const id = section.getAttribute("id");

      if (top > offset && top < offset + height) {
        document.querySelectorAll(".navbar a")
          .forEach(link => link.classList.remove("active"));

        document.querySelector(`.navbar a[href="#${id}"]`)
          ?.classList.add("active");
      }
    });
  }


  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const headerHeight = document.querySelector("header").offsetHeight;
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: "smooth"
        });
      }
    });
  });


  /* ================= TYPED JS ================= */
  new Typed(".typing-text", {
    strings: [
      "Data Engineer",
      "Snowflake Developer",
      "Azure Data Engineer",
      "ETL Pipeline Builder",
      "Data Warehousing",
      "SQL Developer"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
  });


  /* ================= FETCH DATA ================= */
  async function fetchData(type = "skills") {
    const path = type === "skills"
      ? "skills.json"
      : "./projects/projects.json";

    const response = await fetch(path);
    return await response.json();
  }


  /* ================= SHOW SKILLS ================= */
  function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");

    const skillHTML = skills.map(skill => `
      <div class="bar">
        <div class="info">
          <img src="${skill.icon}" alt="skill" />
          <span>${skill.name}</span>
        </div>
      </div>
    `).join("");

    skillsContainer.innerHTML = skillHTML;
  }


  /* ================= SHOW PROJECTS ================= */
function showProjects(projects) {
  const projectsContainer = document.querySelector("#work .box-container");

  const projectHTML = projects
    .slice(0, 5)
    .filter(project => !project.category?.includes("android"))
    .map((project, index) => {

      const title = project.title || "Project";
      const highlights = project.highlights?.slice(0, 2) || [];
      const tech = project.tech || [];

      return `
        <div class="box tilt"
             data-category="${project.category?.join(" ") || 'all'}">

          <img src="./assets/images/projects/${project.image}.png" alt="${title}" />

          <div class="content">

            <h3>${title}</h3>

            <ul class="highlights">
              ${highlights.map(h => `<li>✔ ${h}</li>`).join("")}
            </ul>

            <div class="tech">
              ${tech.map(t => `<span>${t}</span>`).join("")}
            </div>

            <!-- 🔥 BUTTON -->
            <button class="view-btn" data-index="${index}">
              View Details →
            </button>

          </div>
        </div>
      `;
    })
    .join("");

  projectsContainer.innerHTML = projectHTML;

  // ✅ FIX: inside function (projects available)
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = btn.getAttribute("data-index");
      openProjectModal(projects[index]);
    });
  });

  initTilt();
  revealProjects();
}


function openProjectModal(project) {

  const modal = document.getElementById("projectModal");

  const architecture = project.architecture?.flow?.join(" → ");
  const tech = project.tech || [];
  const highlights = project.highlights || [];

  modal.innerHTML = `
    <div class="modal-content">

      <!-- 🔥 STICKY HEADER -->
      <div class="modal-header">
        <h2>${project.title}</h2>
        <span class="close-btn">&times;</span>
      </div>

      <div class="modal-body">

        <div class="modal-grid">

          <!-- ================= LEFT ================= -->
          <div class="modal-left">

            <p class="modal-desc">${project.desc}</p>

            ${highlights.length ? `
              <h4>✨ Highlights</h4>
              <ul>
                ${highlights.map(h => `<li>✔ ${h}</li>`).join("")}
              </ul>
            ` : ""}

            ${project.features ? `
              <h4>🚀 Features</h4>
              <ul>
                ${project.features.map(f => `<li>${f}</li>`).join("")}
              </ul>
            ` : ""}

          </div>

          <!-- ================= RIGHT ================= -->
          <div class="modal-right">

            ${project.impact ? `
              <h4>📊 Impact</h4>
              <p>
                ${project.impact.scale || ""} |
                ${project.impact.accuracy || ""} |
                ${project.impact.volume || ""}
              </p>
            ` : ""}

            ${tech.length ? `
              <h4>🛠 Tech Stack</h4>
              <div class="tech">
                ${tech.map(t => `<span>${t}</span>`).join("")}
              </div>
            ` : ""}

            ${architecture ? `
              <h4>⚙️ Architecture</h4>
              <p>${architecture}</p>
            ` : ""}

            ${project.challenges ? `
              <h4>⚠️ Challenges</h4>
              <ul>
                ${project.challenges.map(c => `<li>${c}</li>`).join("")}
              </ul>
            ` : ""}

            ${project.solutions ? `
              <h4>✅ Solutions</h4>
              <ul>
                ${project.solutions.map(s => `<li>${s}</li>`).join("")}
              </ul>
            ` : ""}

          </div>

        </div>

      </div>
    </div>
  `;

  modal.classList.add("active");

  // ✅ close button
  modal.querySelector(".close-btn").onclick = () => {
    modal.classList.remove("active");
  };

  // ✅ click outside
  modal.onclick = (e) => {
    if (e.target.id === "projectModal") {
      modal.classList.remove("active");
    }
  };
}
  /* ================= PROJECT FILTER ================= */

function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".project-filter button");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      const projectBoxes = document.querySelectorAll(".work .box");

      projectBoxes.forEach(box => {
        const categories = box.getAttribute("data-category").split(" ");

        if (filter === "all" || categories.includes(filter)) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      });

    });
  });
}


/* ================= INIT PROJECTS ================= */

fetchData()
  .then(showSkills)
  .catch(err => console.error("Skills load error:", err));

fetchData("projects")
  .then(data => {
    showProjects(data);
    initProjectFilter();
  })
  .catch(err => console.error("Projects load error:", err));



  /* ================= TILT ================= */
  function initTilt() {
    const tiltElements = document.querySelectorAll(".tilt");

    if (tiltElements.length) {
      VanillaTilt.init(tiltElements, { max: 15 });
    }
  }


  /* ================= SCROLL REVEAL ================= */
  function revealProjects() {
    const sr = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(".work .box", { interval: 200 });
  }

});


/* ================= THEME TOGGLE ================= */
const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    toggleBtn.classList.toggle("fa-sun");
    toggleBtn.classList.toggle("fa-moon");

    initParticles();
  });
}


/* ================= LOAD SAVED THEME ================= */
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn?.classList.add("fa-sun");
    toggleBtn?.classList.remove("fa-moon");
  }
});


/* ================= TAB VISIBILITY ================= */
document.addEventListener("visibilitychange", () => {
  const favicon = document.getElementById("favicon");

  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Akhilesh Prajapati";
    favicon && (favicon.href = "assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    favicon && (favicon.href = "assets/images/favhand.png");
  }
});


/* ================= PROFILE IMAGE EFFECT ================= */
const profileImg = document.querySelector(".home .image img");

profileImg?.addEventListener("click", () => {
  profileImg.classList.toggle("active-glow");
});








/* =========================================================
   SMOOTH MAGNETIC BUTTON (NO JITTER 🔥)
   ========================================================= */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const strength = 1.25;   // magnetic strength
  const ease = 1.12;       // smoothness (lower = smoother)

  function animate() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    btn.style.transform = `
      translate(${currentX}px, ${currentY}px)
      scale(1.05)
    `;

    requestAnimationFrame(animate);
  }

  animate();

  btn.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 768) return;

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    /* 🎯 SPOTLIGHT */
    btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
    btn.style.setProperty("--y", `${e.clientY - rect.top}px`);

    targetX = x * strength;
    targetY = y * strength;
  });

  btn.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  /* ================= RIPPLE ================= */
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });

});



window.addEventListener("scroll", () => {
  document.querySelector("header")
    .classList.toggle("scrolled", window.scrollY > 50);
});
