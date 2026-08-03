 // THEME TOGGLE : SWITCHES LIGHT/DARK MODE AND SERVES TO LOCALSTORAGE
        const toggleBtn = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        html.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
        toggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
        function updateIcon(theme) { toggleBtn.textContent = theme === 'light' ? '🌙' : '☀️'; }
        // SCROLL ANIMATION + ACTIVE NAV : USES INTERACTIONOBSERVER TO FADE IN SECTIONS
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('visible');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if(link.getAttribute('href') === `#${entry.target.id}`){
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });
        sections.forEach(section => observer.observe(section));
        // CONTACT FORM: SENDS DATA TO FORMSPREE AND SHOWS STATUS MESSAGE
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.innerText = "Sending...";
       const response = await fetch("https://formspree.io/f/mrenllpd", { 
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
        status.innerText = "Message sent successfully!";
        form.reset();
    } else {
        status.innerText = "Oops! There was a problem.";
    }
});

// Enter to go to next input 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const inputs = form.querySelectorAll("input, textarea, button");
    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function(e){
            if(
                e.key === "Enter" &&
                this.tagName !== "TEXTAREA" &&
                this.type !== "submit"
            ){
                // CHECK IF CURRENT FIELD IS VALID FIRST
                if (!this.checkValidity()) {
                    this.reportValidity(); 
                    e.preventDefault();
                    return; 
                }
                e.preventDefault();
                const next = inputs[index + 1];
                if(next){

                    next.focus();
                }
            }
        });
    });
});

// BACK TO TOP BUTTON : SHOWS BUTTON AFTER 100PX SCROLL
const topBtn = document.getElementById("topbtn");

if (topBtn) { // THIS CHECK STOPS THE CRASH
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
