const countrySelect = document.getElementById("country-filter");
const brandCards = Array.from(document.querySelectorAll(".brand-card"));
const brandSections = Array.from(document.querySelectorAll(".brand-section"));
const alphaLinks = Array.from(document.querySelectorAll(".alpha-nav a"));

const getCountries = (card) =>
    (card.dataset.country || "")
        .split(",")
        .map((country) => country.trim())
        .filter(Boolean);

const populateCountries = () => {
    const countryCounts = new Map();

    brandCards.forEach((card) => {
        getCountries(card).forEach((country) => {
            countryCounts.set(country, (countryCounts.get(country) || 0) + 1);
        });
    });

    Array.from(countryCounts.keys())
        .sort()
        .forEach((country) => {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = `${country} (${countryCounts.get(country)})`;
            countrySelect.appendChild(option);
        });
};

const updateAlphaNav = () => {
    alphaLinks.forEach((link) => {
        const targetId = link.getAttribute("href").replace("#", "");
        const section = document.getElementById(targetId);

        if (!section) {
            link.style.display = "none";
            return;
        }

        const visibleCards = Array.from(section.querySelectorAll(".brand-card")).some(
            (card) => card.style.display !== "none"
        );

        const isVisibleSection = section.style.display !== "none" && visibleCards;
        link.style.display = isVisibleSection ? "" : "none";
    });
};

const applyFilter = () => {
    const selected = countrySelect.value;

    brandCards.forEach((card) => {
        const matches = selected === "all" || getCountries(card).includes(selected);
        card.style.display = matches ? "" : "none";
    });

    brandSections.forEach((section) => {
        const visible = Array.from(section.querySelectorAll(".brand-card")).some(
            (card) => card.style.display !== "none"
        );
        section.style.display = visible ? "" : "none";
    });

    updateAlphaNav();
};

populateCountries();
applyFilter();
countrySelect.addEventListener("change", applyFilter);
