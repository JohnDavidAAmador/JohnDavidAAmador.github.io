/************************************************/
/* Portfolio Page JavaScript                         */
/************************************************/
/*
    Author: John-David A. Amador
    Date:    March 2025
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

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Section with ID '${sectionId}' not found.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const profileRecord = document.querySelector('.profile-record');
    const expandButton = document.querySelector('.expand-button button');
    const collapseButton = document.querySelector('.collapse-button button');
    const introTechOverlay = document.querySelector('.overlay-window.intro-tech');
    const fingerprintOverlay = document.querySelector('.overlay-window.fingerprint-overlay');
    const retinaOverlay = document.querySelector('.overlay-window.retina-overlay');
    const stats2Overlay = document.querySelector('.overlay-window.stats2-overlay');
    const stats3Overlay = document.querySelector('.overlay-window.stats3-overlay');
    const allOverlays = [introTechOverlay, fingerprintOverlay, retinaOverlay, stats2Overlay, stats3Overlay];
    const profileImage = document.getElementById('profileImage');
    const profileImage2 = document.getElementById('profileImage2');
    let currentImageIndex = 0;
    let imageChangeInterval;
    const technologiesSection = document.getElementById('technologies-i-use');
    const backgroundBlock = technologiesSection.querySelector('.background-block');
    const slideInWindow = technologiesSection ? technologiesSection.querySelector('.technologies-slide-in-window') : null; // First declaration
    const categoryLinks = technologiesSection.querySelectorAll('.technology-categories a');
    const detailsPopup = document.getElementById('technologyDetailsPopup');
    const detailsPopupTitle = document.getElementById('details-popup-title');
    const iconsContainer = document.getElementById('technology-icons-container');

    console.log("DOM Content Loaded - Animation Test");
    console.log("profileRecord:", profileRecord);
    console.log("expandButton:", expandButton);
    console.log("collapseButton:", collapseButton);
    console.log("overlayWindow:", introTechOverlay);
    console.log("fingerprintOverlay:", fingerprintOverlay);
    console.log("retinaOverlay:", retinaOverlay);
    console.log("stats2Overlay:", stats2Overlay);
    console.log("stats3Overlay:", stats3Overlay);

    if (profileRecord && expandButton && collapseButton && introTechOverlay && fingerprintOverlay && retinaOverlay && stats2Overlay && stats3Overlay) {
        // Initially hide the overlays by default in CSS

        expandButton.addEventListener('click', function() {
            console.log("Expand button clicked - Animation Test");
            profileRecord.classList.add('expanded');
            expandButton.style.display = 'none';
            collapseButton.style.display = 'block';

            allOverlays.forEach(overlay => {
                if (overlay) {
                    // Reset transform to the initial 'off-screen' position
                    if (overlay.classList.contains('intro-tech')) {
                        overlay.style.transform = 'translateX(200px)'; // Or your initial right position
                    } else if (overlay.classList.contains('fingerprint-overlay') || overlay.classList.contains('retina-overlay')) {
                        overlay.style.transform = 'translateX(-200%)'; // Or your initial left position
                    } else if (overlay.classList.contains('stats2-overlay')) {
                        overlay.style.transform = 'translateX(200%)'; // Or your initial right position
                    } else if (overlay.classList.contains('stats3-overlay')) {
                        overlay.style.transform = 'translateY(200%)'; // Or your initial bottom position
                    }
                    // Force a reflow
                    overlay.offsetHeight;
                    // Now, set the transform to the 'on-screen' position to trigger the CSS transition
                    overlay.style.transform = 'translateX(0)';
                    overlay.style.opacity = '1'; // Ensure opacity is set for visibility
                    overlay.classList.add('show');
                }
            });
        });

        collapseButton.addEventListener('click', function() {
            console.log("Collapse button clicked - Animation Test");
            profileRecord.classList.remove('expanded');
            expandButton.style.display = 'block';
            collapseButton.style.display = 'none';

            allOverlays.forEach(overlay => {
                if (overlay) {
                    // Disable transitions for instant reset
                    overlay.style.transition = 'none';

                    // Force a reflow
                    overlay.offsetHeight;

                    // Reset transform based on the overlay's origin
                    if (overlay.classList.contains('intro-tech')) {
                        overlay.style.transform = 'translateX(200px)'; // Or your initial right position
                    } else if (overlay.classList.contains('fingerprint-overlay') || overlay.classList.contains('retina-overlay')) {
                        overlay.style.transform = 'translateX(-200%)'; // Or your initial left position
                    } else if (overlay.classList.contains('stats2-overlay')) {
                        overlay.style.transform = 'translateX(200px)'; // Or your initial right position
                    } else if (overlay.classList.contains('stats3-overlay')) {
                        overlay.style.transform = 'translateY(200%)'; // Or your initial bottom position
                    }

                    overlay.style.opacity = '0';
                    overlay.classList.remove('show');

                    // Re-enable transitions (important for the next expand)
                    requestAnimationFrame(() => {
                        overlay.style.transition = '';
                    });
                }
            });
        });
    } else {
        console.log("Key elements for profile animation not found.");
    }

    //profile photo changes
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
    const observer_profile = new IntersectionObserver((entries) => {
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

    observer_profile.observe(profileImage);
    imageChangeInterval = setInterval(changeProfileImage, 4000); // Start image switching initially

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

        const observer_title = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    typeWriter(textElement, text, speed, () => {
                        observer_title.unobserve(entry.target);
                    });
                }
            });
        }, { threshold: 0.1 });

        observer_title.observe(section);
    }
    // Call the animation functions
    /*animateSection('technologies-i-use', 'Technologies I Use', 100);
    animateSection('projects', 'Projects', 100);
    animateSection('resume', 'Resume', 100);
    animateSection('bio', 'My Bio', 100);*/


    const backgroundImage = technologiesSection ? technologiesSection.querySelector('.background-image') : null;
    const divider = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .divider') : null;
    const animatedTitleSpan = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .animated-title') : null;
    const titleBackground = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .title-background') : null; // Get the backing element
    const slideInDelay = 1000; // Delay for window slide-in after background
    const textStartDelay = 700; // Delay for text animation after window lands (adjust as needed)
    const typewriterSpeed = 125; // Speed of the typewriter animation
    const sectionTitleText = 'Technologies I Use';
    const frontendButton = document.querySelector('.technology-categories a[data-category="frontend"]');
    const frontendDetailsPopup = document.getElementById('frontendDetailsPopup');
    const frontendPopupTitle = frontendDetailsPopup ? frontendDetailsPopup.querySelector('h3') : null;
    const frontendIconsContainer = frontendDetailsPopup ? frontendDetailsPopup.querySelector('.technology-icons-container') : null;
    const backendButton = document.querySelector('.technology-categories a[data-category="backend"]');
    const backendDetailsPopup = document.getElementById('backendDetailsPopup');

    // Frontend Popup Functionality
    if (frontendButton && frontendDetailsPopup) {
        frontendButton.addEventListener('click', function(event) {
            event.preventDefault();
            frontendDetailsPopup.classList.add('open'); // Just open the popup
        });

        // Function to close the frontend popup
        window.closeFrontendDetailsPopup = function() {
            frontendDetailsPopup.classList.remove('open');

        
        };
        
    } else {
        console.error("One or more elements for the Frontend popup were not found.");
        console.log("frontendButton:", frontendButton);
        console.log("frontendDetailsPopup:", frontendDetailsPopup);
        console.log("frontendPopupTitle:", frontendPopupTitle);
        console.log("frontendIconsContainer:", frontendIconsContainer);
    }
    function handleOutsideClick(event) {
        if (frontendDetailsPopup.classList.contains('open') && !frontendDetailsPopup.contains(event.target) && event.target !== frontendButton) {
            closeFrontendDetailsPopup();
            document.removeEventListener('click', handleOutsideClick); // Remove the listener when closed
        }
    }

    if (frontendButton && frontendDetailsPopup) {
        frontendButton.addEventListener('click', function(event) {
            event.preventDefault();
            frontendDetailsPopup.classList.add('open'); // Open the frontend popup
            document.addEventListener('click', handleOutsideClick); // Add listener when opened
        });

        window.closeFrontendDetailsPopup = function() {
            frontendDetailsPopup.classList.remove('open');
            document.removeEventListener('click', handleOutsideClick); // Remove listener when closed via button
        };
    } else {
        console.error("Frontend button or popup element not found.");
    }

    // Backend Popup Functionality
    function handleOutsideClickBackend(event) {
        if (backendDetailsPopup.classList.contains('open') && !backendDetailsPopup.contains(event.target) && event.target !== backendButton) {
            closeBackendDetailsPopup();
            document.removeEventListener('click', handleOutsideClickBackend);
        }
    }

    if (backendButton && backendDetailsPopup) {
        backendButton.addEventListener('click', function(event) {
            event.preventDefault();
            backendDetailsPopup.classList.add('open');
            document.addEventListener('click', handleOutsideClickBackend);
        });

        window.closeBackendDetailsPopup = function() {
            backendDetailsPopup.classList.remove('open');
            document.removeEventListener('click', handleOutsideClickBackend);
        };
    } else {
        console.error("Backend button or popup element not found.");
    }


    function resetAnimatedText() {
        if (animatedTitleSpan) {
            animatedTitleSpan.textContent = ''; // Clear the text
        }
    }

    function startTextAnimation() {
        if (animatedTitleSpan) {
            typeWriter(animatedTitleSpan, sectionTitleText, typewriterSpeed);
        }
    }

    const sectionObserver_bg_slide = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is in view
                if (backgroundImage) {
                    backgroundImage.classList.add('visible'); // Trigger background image animation
                }
                if (slideInWindow) {
                    setTimeout(() => {
                        slideInWindow.classList.add('visible'); // Trigger slide-in animation after delay
                        // Start text animation after the window has (mostly) landed
                        setTimeout(startTextAnimation, textStartDelay);
                    }, slideInDelay);
                }
                if (divider) {
                    setTimeout(() => {
                        divider.classList.add('slide-in'); // Slide in the divider with the window
                    }, slideInDelay);
                }
                if (titleBackground) {
                    setTimeout(() => {
                        titleBackground.classList.add('slide-in'); // Slide in the title background with the window
                    }, slideInDelay);
                }
                // Optionally, you might want to reset the text when it comes into view again
                resetAnimatedText();
                setTimeout(slideInDelay + textStartDelay + 100); // Restart after slide-in
            } else {
                // Section is out of view
                if (backgroundImage) {
                    backgroundImage.classList.remove('visible'); // Reset background image
                }
                if (slideInWindow) {
                    slideInWindow.classList.remove('visible'); // Reset slide-in position and opacity
                }
                if (divider) {
                    divider.classList.remove('slide-in'); // Reset divider position
                }
                if (titleBackground) {
                    titleBackground.classList.remove('slide-in'); // Reset title background position
                }
                // resetAnimatedText(); // Already reset when coming into view
            }
        });
    }, { threshold: 0.2 });

    if (technologiesSection) {
        sectionObserver_bg_slide.observe(technologiesSection);
    }

    // (Keep your existing typeWriter function here)
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
}); 