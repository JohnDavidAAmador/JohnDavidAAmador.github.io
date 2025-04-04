/************************************************/
/* Portfolio Page JavaScript                     */
/************************************************/
/*
    Author: John-David A. Amador
    Date:   March 2025
*/
/************************************************/

// greeting that changes with the time of day, based on users time
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Good ";

    if (hour >= 1 && hour < 12) {
        greeting += "morning";
    } else if (hour >= 12 && hour < 17) {
        greeting += "afternoon";
    } else {
        greeting += "evening";
    }

    document.getElementById("greeting-time").textContent = greeting + " Team,";
}

updateGreeting();
setInterval(updateGreeting, 60000);

// Nav Menu Toggle
function toggleNav() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("show");
}

document.addEventListener('click', function(event) {
    const navMenu = document.getElementById("navMenu");
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    if (event.target !== hamburgerMenu && !navMenu.contains(event.target)) {
        navMenu.classList.remove("show");
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Change Hamburger Menu (green) on scroll
window.addEventListener('scroll', function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        hamburgerMenu.classList.add("sticky");
    } else {
        hamburgerMenu.classList.remove("sticky");
    }
});

// Contact Me Button in Heading
function openContactWindow() {
    document.getElementById('contactWindow').style.display = 'block';
}

function closeContactWindow() {
    document.getElementById('contactWindow').style.display = 'none';
}

// Close Menu on Outside Click
window.onclick = function(event) {
    const contactWindow = document.getElementById('contactWindow');
    if (event.target === contactWindow) {
        contactWindow.style.display = 'none';
    }
}

//close menu on menu button click
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    closeContactWindow();
})

//tooltips
const tooltipElements = document.querySelectorAll('[data-tooltip]');

tooltipElements.forEach(element => {
    let timeoutId;
    let tooltip = null; // Store the tooltip element

    element.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);

        // Create the tooltip element if it doesn't exist
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.textContent = element.getAttribute('data-tooltip');
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'transparent';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '3px';
            tooltip.style.fontSize = '0.8em';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '102';
            tooltip.style.bottom = '-30px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            element.appendChild(tooltip); // Append to the hovered element
        }

        tooltip.style.opacity = '1'; // Show tooltip

        // Set timeout to hide tooltip
        timeoutId = setTimeout(() => {
            if (tooltip) {
                tooltip.style.opacity = '0'; // Hide tooltip
            }
        }, 600);
    });

    element.addEventListener('mouseleave', function() {
        clearTimeout(timeoutId);
        if (tooltip) {
            tooltip.style.opacity = '0'; // Hide tooltip immediately
        }
    });
});

// Stats Section expand and collapse
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");

    const profileRecord = document.querySelector('.profile-record');
    const expandButton = document.querySelector('.expand-button button');
    const collapseButton = document.querySelector('.collapse-button button');

    console.log("profileRecord:", profileRecord);
    console.log("expandButton:", expandButton);
    console.log("collapseButton:", collapseButton);

    if (profileRecord && expandButton) {
        expandButton.addEventListener('click', function() {
            console.log("Expand button clicked");
            profileRecord.classList.add('expanded');
        });
    } else {
        console.log("Expand button or profileRecord not found");
    }

    if (profileRecord && collapseButton) {
        collapseButton.addEventListener('click', function() {
            console.log("Collapse button clicked");
            profileRecord.classList.remove('expanded');
        });
    } else {
        console.log("Collapse button or profileRecord not found");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.getElementById('profileImage');
    const profileImage2 = document.getElementById('profileImage2');
    let currentImageIndex = 0;
    let imageChangeInterval;

    // Change photos with fade effect
    function changeProfileImage() {
        if (currentImageIndex === 0) {
            profileImage.style.transition = 'opacity 1s ease'; // Add transition
            profileImage2.style.transition = 'opacity 1s ease'; // Add transition
            profileImage.style.opacity = 0;
            profileImage2.style.opacity = 1;
            currentImageIndex = 1;
        } else {
            profileImage.style.transition = 'opacity 1s ease'; // Add transition
            profileImage2.style.transition = 'opacity 1s ease'; // Add transition
            profileImage.style.opacity = 1;
            profileImage2.style.opacity = 0;
            currentImageIndex = 0;
        }
    }

    // Shrink photo when scrolled off screen
    function shrinkImage() {
        profileImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        profileImage2.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        profileImage.style.transform = 'scale(0.5)';
        profileImage2.style.transform = 'scale(0.5)';
    }

    // Grow photo when scrolled into view
    function growImage() {
        profileImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        profileImage2.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        profileImage.style.transform = 'scale(1)';
        profileImage2.style.transform = 'scale(1)';
    }

    // Watch for shrink/grow condition
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                growImage();
                imageChangeInterval = setInterval(changeProfileImage, 4000); // Start image switching
            } else {
                shrinkImage();
                clearInterval(imageChangeInterval); // Stop image switching
            }
        });
    }, { threshold: 0.1 });

    observer.observe(profileImage);
    imageChangeInterval = setInterval(changeProfileImage, 4000); // Start image switching initially
});
//autotyping divider
function typeWriter(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) {
                callback();
            }
        }
    }
    type();
}

function animateSection(sectionId, text, speed) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const titleFlexWrapper = section.querySelector('.title-flex-wrapper');
    if (!titleFlexWrapper) return;

    const textElement = document.createElement('span');
    textElement.classList.add('animated-title'); // Add a class for styling
    titleFlexWrapper.appendChild(textElement);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                typeWriter(textElement, text, speed, () => {
                    observer.unobserve(entry.target);
                });
            }
        });
    }, { threshold: 0.1 });

    observer.observe(section);
}

// Call the animation functions
animateSection('skills', 'Technologies I Use', 100);
animateSection('projects', 'Projects', 100);
animateSection('resume', 'Resume', 100);
animateSection('bio', 'My Bio', 100);