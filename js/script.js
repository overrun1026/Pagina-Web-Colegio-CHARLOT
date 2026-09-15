
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

    if (header) {

        if (scrollPosition > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    /* Back to top */

    if (backToTop) {

        if (scrollPosition > 600) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

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

    if (!headerButton) {
        return;
    }

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
   WEB3FORMS
--------------------------------------------------------- */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener("submit", async event => {

        /* Evitar la recarga de la página */

        event.preventDefault();


        /* Botón de envío */

        const submitButton =
            contactForm.querySelector(".form-submit");


        /* Desactivar botón mientras se envía */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.style.opacity = "0.7";
            submitButton.style.cursor = "not-allowed";

        }


        try {

            /* Obtener todos los datos del formulario */

            const formData = new FormData(contactForm);


            /* Enviar información a Web3Forms */

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );


            const result = await response.json();


            /* -------------------------------------------------
               ENVÍO EXITOSO
            ------------------------------------------------- */

            if (result.success) {

                /* Limpiar todos los campos */

                contactForm.reset();


                /* Mostrar mensaje */

                if (formMessage) {

                    formMessage.textContent =
                        "Gracias. Tu solicitud ha sido enviada correctamente.";

                    formMessage.style.display = "block";
                    formMessage.style.background = "#edf9f2";
                    formMessage.style.color = "#31835a";

                }


            } else {

                /* -------------------------------------------------
                   ERROR DE WEB3FORMS
                ------------------------------------------------- */

                if (formMessage) {

                    formMessage.textContent =
                        "No fue posible enviar la solicitud. Inténtalo nuevamente.";

                    formMessage.style.display = "block";
                    formMessage.style.background = "#fff0f0";
                    formMessage.style.color = "#c74c4c";

                }

            }


        } catch (error) {

            /* -------------------------------------------------
               ERROR DE CONEXIÓN
            ------------------------------------------------- */

            console.error(
                "Error al enviar el formulario:",
                error
            );


            if (formMessage) {

                formMessage.textContent =
                    "Ocurrió un error al enviar la solicitud. Verifica tu conexión e inténtalo nuevamente.";

                formMessage.style.display = "block";
                formMessage.style.background = "#fff0f0";
                formMessage.style.color = "#c74c4c";

            }

        } finally {

            /* Reactivar botón */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.style.opacity = "";
                submitButton.style.cursor = "";

            }


            /* Ocultar mensaje después de 5 segundos */

            if (formMessage) {

                setTimeout(() => {

                    formMessage.style.display = "none";

                }, 5000);

            }

        }

    });

}


/* ---------------------------------------------------------
   CERRAR MENÚ SI CAMBIA EL TAMAÑO
--------------------------------------------------------- */

window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

        if (nav) {

            nav.classList.remove("open");

        }

        if (menuToggle) {

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

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

