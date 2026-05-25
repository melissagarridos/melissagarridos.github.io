const toggleBtn = document.getElementById("lang-toggle");

        let currentLang = "en";

        toggleBtn.addEventListener("click", () => {

            currentLang = currentLang === "en" ? "es" : "en";

            document.querySelectorAll("[data-en]").forEach((element) => {
                element.innerHTML = element.dataset[currentLang];
            });

            toggleBtn.textContent = currentLang === "en"
                ? "ES"
                : "EN";
        });

        // Category filter
        const tabs = document.querySelectorAll('.cat-tab');
        const cards = document.querySelectorAll('.mini-card');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.dataset.filter;
                cards.forEach(card => {
                    card.style.display =
                        filter === 'all' || card.dataset.category === filter
                            ? 'flex' : 'none';
                });
            });
        });


// Contact Form

const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz-LG_7gtFc_Lunz6OhHVeKddhG1nbX93opE8HXO9PBo__7tTfZN35fKYC3L_y8yTucxA/exec";

if (form) {
    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };

        try {

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            successMsg.classList.add("visible");

            form.reset();

        } catch (error) {

            console.error(error);

            alert("Error sending message.");

        }

    });
}