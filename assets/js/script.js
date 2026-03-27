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
      .filter(project => project.category !== "android")
      .map(project => `
        <div class="box tilt" data-category="${project.category || 'all'}">

          <img src="./assets/images/projects/${project.image}.png" alt="project" />

          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>

            <div class="desc">
              <p>${project.desc}</p>

              ${project.impact ? `<p class="impact">📊 ${project.impact}</p>` : ""}

              <div class="tech">
                ${project.tech ? project.tech.map(t => `<span>${t}</span>`).join("") : ""}
              </div>

              ${project.architecture ? `
                <p class="architecture">⚙️ ${project.architecture}</p>
              ` : ""}
            </div>
          </div>
        </div>
      `)
      .join("");

    projectsContainer.innerHTML = projectHTML;

    initTilt();
    revealProjects();
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
          const category = box.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            box.style.display = "block";
          } else {
            box.style.display = "none";
          }
        });

      });
    });
  }


  /* ================= INIT PROJECTS ================= */
  fetchData().then(showSkills);

  fetchData("projects").then(data => {
    showProjects(data);
    initProjectFilter();
  });


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
