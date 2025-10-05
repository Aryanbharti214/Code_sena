document.addEventListener('DOMContentLoaded', () => {

    // --- Section 2: BSS/OSS Tab Functionality ---
    const tabs = document.querySelectorAll('.nav-tab');
    const contentPanels = document.querySelectorAll('.content-panel');
    if (tabs.length > 0 && contentPanels.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                contentPanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                tab.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // --- Section 1 & 2: Clickable UI Elements ---
    // Main "Start 14-day free trial" button
    const trialButton = document.querySelector('#home main button');
    if (trialButton) {
        trialButton.addEventListener('click', () => {
            alert('Navigating to the free trial sign-up page!');
            // Real implementation: window.location.href = '/signup';
        });
    }

    // Header review links
    const reviewLinks = document.querySelectorAll('#home header .flex-wrap > div');
    reviewLinks.forEach(review => {
        review.style.cursor = 'pointer'; // Make it look clickable
        review.addEventListener('click', () => {
            const platform = review.querySelector('strong').textContent;
            alert(`Showing reviews for ${platform}...`);
            // Real implementation: window.open('https://www.example.com/' + platform, '_blank');
        });
    });

    // Footer buttons in the features section
    const footerButtons = document.querySelectorAll('#features footer button');
    footerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            if (buttonText === 'BOOK A MEETING') {
                alert('Opening the meeting scheduling calendar!');
                // Real implementation: window.location.href = '/contact-sales';
            } else {
                alert(`Navigating to the '${buttonText}' page.`);
                // Real implementation: window.location.href = '/' + buttonText.toLowerCase();
            }
        });
    });


    // --- Section 3: Showcase Slider Functionality ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');
    const wipe = document.querySelector('.transition-wipe');

    if (slides.length > 0 && nextBtn && prevBtn && wipe) {
        let currentSlide = 0;
        let isAnimating = false;

        function goToSlide(slideIndex) {
            if (isAnimating) return;
            isAnimating = true;

            const outgoingSlide = slides[currentSlide];
            currentSlide = (slideIndex + slides.length) % slides.length;
            const incomingSlide = slides[currentSlide];

            wipe.classList.add('wipe-active');

            setTimeout(() => {
                incomingSlide.classList.add('active');
                outgoingSlide.classList.add('exit-to-left');
                incomingSlide.classList.add('enter-from-right');
            }, 400);

            wipe.addEventListener('animationend', () => {
                outgoingSlide.classList.remove('active', 'exit-to-left');
                incomingSlide.classList.remove('enter-from-right');
                wipe.classList.remove('wipe-active');
                isAnimating = false;
            }, { once: true });
        }

        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }


    // --- Section 4: Carbon Emissions Dashboard Chart ---
    const chartCanvas = document.getElementById('emissionsChart');
    if (chartCanvas) {
        const rawData = [
            { project: 'A', value: 549, type: 'New build', status: 'Complete' },
            { project: 'B', value: 278, type: 'Refurbishment', status: 'Complete' },
            { project: 'C', value: 975, type: 'New build', status: 'Complete' },
            { project: 'D', value: 697, type: 'New build', status: 'Estimate' },
            { project: 'E', value: 506, type: 'New build', status: 'Complete' },
            { project: 'F', value: 36, type: 'Refurbishment', status: 'Complete' },
            { project: 'G', value: 185, type: 'Refurbishment', status: 'Complete' },
            { project: 'H', value: 191, type: 'Refurbishment', status: 'Estimate' },
            { project: 'I', value: 122, type: 'Refurbishment', status: 'Complete' },
            { project: 'J', value: 550, type: 'New build', status: 'Complete' },
            { project: 'K', value: 881, type: 'New build', status: 'Estimate' },
            { project: 'L', value: 539, type: 'New build', status: 'Complete' },
            { project: 'M', value: 289, type: 'Refurbishment', status: 'Estimate' },
            { project: 'N', value: 29, type: 'Refurbishment', status: 'Complete' },
            { project: 'O', value: 82, type: 'Refurbishment', status: 'Complete' },
            { project: 'P', value: 44, type: 'Refurbishment', status: 'Estimate' },
            { project: 'Q', value: 109, type: 'Refurbishment', status: 'Complete' },
            { project: 'R', value: 106, type: 'Refurbishment', status: 'Estimate' },
            { project: 'S', value: 607, type: 'New build', status: 'Complete' },
            { project: 'T', value: 528, type: 'New build', status: 'Estimate' },
        ];
        const colors = {
            refurbishment: 'rgba(200, 163, 174, 1)',
            newBuild: 'rgba(125, 79, 90, 1)',
            primaryText: '#5C3D46'
        };
        const ctx = chartCanvas.getContext('2d');
        const emissionsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderWidth: 1,
                    maxBarThickness: 30,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.dataset.label || ''}: ${Math.round(context.parsed.y)} kgCO₂e/m²`;
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            target2030: { type: 'line', yMin: 500, yMax: 500, borderColor: colors.primaryText, borderWidth: 2, borderDash: [6, 6] },
                            target2025: { type: 'line', yMin: 600, yMax: 600, borderColor: colors.primaryText, borderWidth: 2, borderDash: [2, 2] }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1200,
                        grid: { color: '#EAE3DD' },
                        ticks: { color: colors.primaryText, font: { family: 'Montserrat' } },
                        title: { display: true, text: 'Embodied carbon intensity (kgCO₂e/m²)', color: colors.primaryText, font: { family: 'Montserrat', size: 12 } }
                    },
                    x: { grid: { display: false }, ticks: { display: false } }
                }
            }
        });

        let currentType = 'All';
        let currentStatus = 'Complete';

        function updateChart() {
            const filteredData = rawData.filter(item => (currentType === 'All' || item.type === currentType) && item.status === currentStatus);
            emissionsChart.data.labels = filteredData.map(item => item.project);
            emissionsChart.data.datasets[0].data = filteredData.map(item => item.value);
            emissionsChart.data.datasets[0].backgroundColor = filteredData.map(item => item.type === 'Refurbishment' ? colors.refurbishment : colors.newBuild);
            emissionsChart.update();
        }

        document.getElementById('type-filter').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                currentType = e.target.dataset.value;
                document.querySelectorAll('#type-filter button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                updateChart();
            }
        });

        document.getElementById('status-filter').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                currentStatus = e.target.dataset.value;
                document.querySelectorAll('#status-filter button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                updateChart();
            }
        });

        updateChart(); // Initial chart render
    }
});
/* ===================== JS: TESTIMONIALS ===================== */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".testimonials-container",
            pin: true,
            scrub: 1, // Smoothly scrubs the animation on scroll
            start: "top top",
            end: "+=3000", // Animation duration in pixels
        }
    });

    // Animate headings splitting apart
    tl.to(".heading-happy", { xPercent: -150, opacity: 0 }, 0);
    tl.to(".heading-sellers", { xPercent: 150, opacity: 0 }, 0);

    // Animate cards and images flying in from different directions
    // The "<" position parameter makes them start at the same time
    tl.from(".testimonial-1", { yPercent: 100, opacity: 0 }, "<");
    tl.from(".person-1", { xPercent: 100, opacity: 0 }, "<");
    tl.from(".testimonial-2", { yPercent: -100, opacity: 0 }, "<");
    tl.from(".person-2", { xPercent: -100, opacity: 0 }, "<");
    tl.from(".company-logo", { scale: 0.5, opacity: 0 }, "<");
});