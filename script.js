let current = 0;

function openQuiz() {
    document.querySelector(".quiz-section").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeQuiz() {
    document.querySelector(".quiz-section").style.display = "none";
    document.body.style.overflow = "auto";
}

function nextStep() {
    const steps = document.querySelectorAll(".step");
    const progress = document.querySelector(".progress");

    steps[current].classList.remove("active");
    current++;

    if (current < steps.length) {
        steps[current].classList.add("active");

        if (progress) {
            progress.style.width = (current / (steps.length - 1)) * 100 + "%";
        }
    }
}

function selectAnswer(field, value) {
    const input = document.getElementById(field);

    if (input) {
        input.value = value;
    }

    nextStep();
}

function toggleMenu() {
    document.querySelector(".menu-btn").classList.toggle("active");
    document.querySelector(".overlay-menu").classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");

    if (startBtn) {
        startBtn.addEventListener("click", openQuiz);
    }

    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const data = new FormData(form);

            fetch(form.action, {
                method: "POST",
                body: data,
                headers: {
                    "Accept": "application/json"
                }
            }).then(() => {
                document.querySelector(".quiz-container").style.display = "none";
                document.querySelector(".thank-you").style.display = "block";
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll(".fade-up, .card").forEach(el => {
        observer.observe(el);
    });
});

let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".image-slider .slide");

    if (!slides.length) return;

    if (index >= slides.length) {
        slideIndex = 0;
    }

    if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
    slide.style.opacity = "0";
    slide.classList.remove("active");
});

    slides[slideIndex].classList.add("active");

    slides[slideIndex].style.opacity = "1";
}

function changeSlide(direction) {
    slideIndex += direction;
    showSlide(slideIndex);
}


const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const formError = document.getElementById("form-error");

if (contactForm && formSuccess && formError) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        formError.hidden = true;

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Lähetetään...";
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Lähetys epäonnistui");
            }

            contactForm.hidden = true;
            formSuccess.hidden = false;
            formSuccess.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        } catch (error) {
            formError.hidden = false;

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Lähetä viesti";
            }
        }
    });
}
