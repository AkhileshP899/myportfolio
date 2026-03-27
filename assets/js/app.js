/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */


function loadParticles(color) {

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: { enable: true, value_area: 900 }
      },

      color: { value: color },

      shape: { type: "circle" },

      opacity: {
        value: 14.6,
        random: true
      },

      size: {
        value: 6,
        random: true
      },

      line_linked: {
        enable: true,
        distance: 140,
        color: Array.isArray(color) ? "#999999" : color,
        opacity: 1.25,
        width: 1
      },

      move: {
        enable: true,
        speed: 2.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },

    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" }
      },

      modes: {
        grab: {
          distance: 180,
          line_linked: { opacity: 0.8 }
        },
        push: { particles_nb: 3 }
      }
    },

    retina_detect: true
  });

}

function initParticles() {
  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    // 🌙 DARK MODE → ONLY WHITE
    loadParticles("#ffffff");
  } else {
    // ☀️ LIGHT MODE → MULTI COLOR
    loadParticles([
      "#ff7b00",  // orange
      "#00d9ff",  // cyan
      "#6c63ff"   // purple
    ]);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initParticles();
});

