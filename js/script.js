
/* =========================================================
   COLEGIO CHARLOT
   MAIN JAVASCRIPT
========================================================= */


/* ---------------------------------------------------------
   ELEMENTOS
--------------------------------------------------------- */

const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");


/* ---------------------------------------------------------
   AÑO ACTUAL
--------------------------------------------------------- */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   MENÚ MÓVIL
--------------------------------------------------------- */

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (nav.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Cerrar menú al seleccionar una opción */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* ---------------------------------------------------------
   HEADER AL HACER SCROLL
--------------------------------------------------------- */

function handleScroll() {

    const scrollPosition = window.scrollY;

    if (scrollPosition > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    /* Back to top */

    if (scrollPosition > 600) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

}

window.addEventListener("scroll", handleScroll);

handleScroll();


/* ---------------------------------------------------------
   BACK TO TOP
--------------------------------------------------------- */

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ---------------------------------------------------------
   NAVEGACIÓN ACTIVA
--------------------------------------------------------- */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navigationLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${sectionId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* ---------------------------------------------------------
   SCROLL REVEAL
--------------------------------------------------------- */

const revealElements = document.querySelectorAll(
    ".feature-card, .value-card, .schedule-card, " +
    ".festival-card, .admission-step, .document-item, " +
    ".gallery-item, .mv-card"
);


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


/* Stagger effect */

revealElements.forEach((element, index) => {

    const delay = (index % 5) * 70;

    element.style.transitionDelay = `${delay}ms`;

    revealObserver.observe(element);

});


/* ---------------------------------------------------------
   ACCORDION
--------------------------------------------------------- */

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {

    const headerButton = item.querySelector(".accordion-header");

    headerButton.addEventListener("click", () => {

        const isActive = item.classList.contains("active");


        /* Cerrar todos */

        accordionItems.forEach(otherItem => {

            otherItem.classList.remove("active");

        });


        /* Abrir seleccionado */

        if (!isActive) {
            item.classList.add("active");
        }

    });

});


/* ---------------------------------------------------------
   FORMULARIO
--------------------------------------------------------- */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();


        /* Validación básica */

        if (
            !name ||
            !phone ||
            !email ||
            !subject ||
            !message
        ) {

            showFormMessage(
                "Por favor completa todos los campos.",
                false
            );

            return;

        }


        /* Validación de email */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            showFormMessage(
                "Ingresa un correo electrónico válido.",
                false
            );

            return;

        }


        /*
         * Como la página es estática,
         * actualmente no existe un backend.
         *
         * Aquí posteriormente se puede conectar:
         *
         * - Formspree
         * - EmailJS
         * - Web3Forms
         * - API propia
         * - WhatsApp
         */

        showFormMessage(
            `Gracias, ${name}. Tu solicitud ha sido registrada en este formulario de demostración.`,
            true
        );


        contactForm.reset();

    });

}


/* ---------------------------------------------------------
   MENSAJE DEL FORMULARIO
--------------------------------------------------------- */

function showFormMessage(message, success = true) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;

    formMessage.style.display = "block";

    if (success) {

        formMessage.style.background = "#edf9f2";
        formMessage.style.color = "#31835a";

    } else {

        formMessage.style.background = "#fff0f0";
        formMessage.style.color = "#c74c4c";

    }


    setTimeout(() => {

        formMessage.style.display = "none";

    }, 5000);

}


/* ---------------------------------------------------------
   CERRAR MENÚ SI CAMBIA EL TAMAÑO
--------------------------------------------------------- */

window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

        nav.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }

});


/* ---------------------------------------------------------
   PROTECCIÓN DE IMÁGENES
   Evita arrastrar imágenes accidentalmente.
--------------------------------------------------------- */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("dragstart", event => {

        event.preventDefault();

    });

});


/* ---------------------------------------------------------
   LOG DE DESARROLLO
--------------------------------------------------------- */

console.log(
    "%cColegio Charlot",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "Página institucional cargada correctamente."
);

