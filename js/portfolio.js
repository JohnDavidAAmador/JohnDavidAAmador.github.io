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

        isSnapping = true;
        console.log("NavMenu Triggered, isSnapping set to True.")
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        setTimeout(() => {
            isSnapping = false;
            console.log("NavMenu Triggered Complete, isSnapping set to False.");
        }, 2000); // Changed to 700ms for consistency with other smooth scrolls
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
        isSnapping = true;
        console.log("NavMenu Scroll-to Ttiggered, isSnapping set to True.")
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            isSnapping = false;
            console.log("NavMenu Scroll-to Triggered Complete, isSnapping set to False.");
        }, 2000); // Changed to 700ms for consistency with other smooth scrolls
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
    

    console.log("DOM Content Loaded - Animations and Portfolio Functionalities are Ready");
    //console.log("profileRecord:", profileRecord);
    //console.log("expandButton:", expandButton);
    //console.log("collapseButton:", collapseButton);
    //console.log("overlayWindow:", introTechOverlay);
    //console.log("fingerprintOverlay:", fingerprintOverlay);
    //console.log("retinaOverlay:", retinaOverlay);
    //console.log("stats2Overlay:", stats2Overlay);
    //console.log("stats3Overlay:", stats3Overlay);


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

    // Contents Expand Trigger

    const portfolioContentsSection = document.getElementById('portfolio-contents');
    const contentsExpandTrigger = document.querySelector('#contentsExpandTrigger'); // ADD THE #


    if (!portfolioContentsSection) {
        console.error("Error: #portfolio-contents element not found!");
    } else {
        //console.log("#portfolio-contents element found:", portfolioContentsSection);
    }

    if (!contentsExpandTrigger) {
        console.error("Error: #contentsExpandTrigger element not found!");
    } else {
        //console.log("#contentsExpandTrigger element found:", contentsExpandTrigger);
    }

    let initialLoad = true; // Flag to handle the initial state

    if (portfolioContentsSection && contentsExpandTrigger && profileRecord) {
        const contentsExpandObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !profileRecord.classList.contains('expanded') && !initialLoad) {
                    //console.log("Contents expand trigger is in view, profile-record is not expanded, and it's not the initial load. Attempting scroll and expand.");
                    isSnapping = true;
                    //console.log("Contents Expand Triggered, isSnapping set to True")
                    portfolioContentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // *** After scrolling, *then* expand the profileRecord ***
                    setTimeout(() => { // Add a small delay after the scroll
                        //console.log("Contents expand trigger is in view. Attempting expand.");
                        //console.log("Expand on scroll trigger - Animation executing");
                        profileRecord.classList.add('expanded');
                        profileRecord.classList.remove('collapsed'); // Ensure 'collapsed' is removed

                        // Handle the overlays (keep this logic here if it's what you want)
                        const allOverlays = [
                            document.querySelector('.overlay-window.intro-tech'),
                            document.querySelector('.overlay-window.fingerprint-overlay'),
                            document.querySelector('.overlay-window.retina-overlay'),
                            document.querySelector('.overlay-window.stats2-overlay'),
                            document.querySelector('.overlay-window.stats3-overlay')
                        ];

                        allOverlays.forEach(overlay => {
                            if (overlay) {
                                // Reset and then set transform for animation
                                if (overlay.classList.contains('intro-tech')) {
                                    overlay.style.transform = 'translateX(200px)';
                                } else if (overlay.classList.contains('fingerprint-overlay') || overlay.classList.contains('retina-overlay')) {
                                    overlay.style.transform = 'translateX(-200%)';
                                } else if (overlay.classList.contains('stats2-overlay')) {
                                    overlay.style.transform = 'translateX(200%)';
                                } else if (overlay.classList.contains('stats3-overlay')) {
                                    overlay.style.transform = 'translateY(200%)';
                                }
                                overlay.offsetHeight; // Force reflow
                                overlay.style.transform = 'translateX(0)';
                                overlay.style.opacity = '1';
                                overlay.classList.add('show');
                            }
                            
                            //unobserve contents-expand
                            contentsExpandObserver.unobserve(contentsExpandTrigger);
                            //console.log("Contents Expand Observer: Stopped observing (contents profile expanded).");

                            //start contents-intro observer
                            contentsIntroScrollObserver.observe(contentsIntroScrollTrigger);
                            //console.log(`Scroll Observer for '${contentsIntroScrollTrigger.id}' : Started observing.`);
                        });
                         
                    }, 500); // Adjust delay as needed
                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Contents Expand Triggered complete, isSnapping set to False.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                } else if (entry.isIntersecting && profileRecord.classList.contains('expanded')) {
                    //console.log("Contents expand trigger is in view, and profile-record is expanded. Not attempting scroll.");
                } else if (entry.isIntersecting && initialLoad) {
                    //console.log("Contents expand trigger is in view on initial load. Not scrolling (yet).");
                }
            });
            // After any intersection, set initialLoad to false
            if (initialLoad) {
                initialLoad = false;
                //console.log("Initial load completed. Subsequent intersections will be considered for scrolling.");
            }
        }, {
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.8 // Adjust as needed
        });

        // Start observing the trigger
        contentsExpandObserver.observe(contentsExpandTrigger);
        //console.log("Observing contentsExpandTrigger.");

    } else {
        //console.log("One or more required elements for the contentsExpandObserver were not found.");
        if (!profileRecord) {
            //console.error("Error: .profile-record element not found!");
        }
    }

    // Contents Intro Trigger

    //const portfolioContentsSection = document.getElementById('portfolio-contents'); / already previously declared above
    //console.log("Contents/ Intro Smooth Scroll Trigger, portfolio-contents address found", portfolioContentsSection);
    const introSection = document.getElementById('intro'); // Make sure introSection is declared
    //console.log("Contents/ Intro Smooth Scroll Trigger, introSection address found", introSection);
    const contentsIntroScrollTrigger = document.getElementById('contentsIntroScrollTrigger'); // Select by ID
    //console.log("Contents/ Intro Smooth Scroll Trigger, contentsIntroScrollTrigger found", contentsIntroScrollTrigger);

    let contentsIntroScrollObserver; // Changed 'const observer' to 'let contentsIntroSnapObserver'
    //console.log("let contentsIntroScrollObserver;");

    if (portfolioContentsSection && introSection && contentsIntroScrollTrigger) {
        //console.log("Contents/ Intro Smooth Scroll Trigger, portfolioContentsSection && introSection && contentsIntroScrollTrigger found");
        contentsIntroScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                // --- CRITICAL CHANGE 1: Add the 'expanded' check ---
                if (profileRecord.classList.contains('expanded') && entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Contents/ Intro Smooth Scroll Trigger, isSnapping set to true. Because trigger intersecting and contents are expanded.");

                    introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Scrolling to intro:", introSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Contents/ Intro Smooth Scroll Trigger, isSnapping set to false. because scroll is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });

    } else {
        console.error("Could not find the contents section, intro section, or the contentsIntroScrollTrigger.");
    }

    //Intro Contents Trigger

    //const portfolioContentsSection = document.getElementById('portfolio-contents'); / already previously declared above
    //console.log("introContents Smooth Scroll Trigger, portfolio-contents address found", portfolioContentsSection);
    const introContentsScrollTrigger = document.getElementById('introContentsScrollTrigger'); // Select by ID
    //console.log("introContents Smooth Scroll Trigger, introContentsScrollTrigger found", introContentsScrollTrigger);

    let introContentsScrollObserver; // Changed 'const observer' to 'let contentsIntroSnapObserver'
    //console.log("let introContentsScrollObserver;");

    if (portfolioContentsSection && introContentsScrollTrigger) {
        //console.log("introContents: portfolioContentsSection && introContentsScrollTrigger found");
        introContentsScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                // --- CRITICAL CHANGE 1: Add the 'expanded' check ---
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("introContents Smooth Scroll Trigger, isSnapping set to true.");

                    portfolioContentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Scrolling to intro:", portfolioContentsSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("introContents Smooth Scroll Trigger, isSnapping set to false.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        introContentsScrollObserver.observe(introContentsScrollTrigger);
        //console.log("Observing introContentsScrollTrigger.");

    } else {
        console.error("Could not find the portfolioContentsSection or the introContentsScrollTrigger.");
    }

    //Intro Technologies Trigger

    const technologiesIUseSection = document.getElementById('technologies-i-use');
    //console.log("intro/ Technologies I Use: , technologies-i-use address found", technologiesIUseSection);
    const introTechnologiesIUseScrollTrigger = document.getElementById('introTechnologiesIUseScrollTrigger');
    //console.log("intro/ Technologies I Use: , introTechnologiesIUseScrollTrigger found", introTechnologiesIUseScrollTrigger);

   
    let introTechnologiesIUseScrollObserver; // Changed 'const observer' to 'let contentsIntroSnapObserver'
    //console.log("let introContentsScrollObserver;");

    if (technologiesIUseSection && introTechnologiesIUseScrollTrigger) {
        //console.log("intro/ Technologies I Use: technologiesIUseSection && introTechnologiesIUseScrollTrigger found");
        introTechnologiesIUseScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("intro/ Technologies I Use Smooth Scroll Trigger, isSnapping set to true.");

                    technologiesIUseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                   //console.log("intro/ Technologies I Use: Scrolling to Technologies I Use:", technologiesIUseSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("intro/ Technologies I Use Smooth Scroll Trigger, isSnapping set to false.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        introTechnologiesIUseScrollObserver.observe(introTechnologiesIUseScrollTrigger);
        //console.log("Observing introTechnologiesIUseScrollTrigger.");

    } else {
        console.error("Could not find the technologiesIUseSection or the introTechnologiesIUseScrollTrigger.");
    }

    //Technologies/ Intro Scroll Trigger

    //console.log ("Technologies/ Intro Scroll Trigger: intro section found", introSection)
    const technologiesIUseIntroScrollTrigger = document.getElementById('technologiesIUseIntroScrollTrigger');
    //console.log ("Technologies/ Intro Scroll Trigger: technologiesIUseIntroScrollTrigger found", technologiesIUseIntroScrollTrigger)
    
    let technologiesIUseIntroScrollObserver; 

    if (introSection && technologiesIUseIntroScrollTrigger) {
        //console.log("Technologies/ Intro Scroll Trigger: introSection && technologiesIUseIntroScrollTrigger found");
        technologiesIUseIntroScrollObserver = new IntersectionObserver((entries) => { 
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Technologies/Intro Smooth Scroll Trigger, isSnapping set to true. because trigger is intersecting and snapping was false");

                    introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Technologies/ Intro Scroll Trigger: Scrolling to intro:", introSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Technologies/Intro Smooth Scroll Trigger, isSnapping set to false. because scroll has been completed");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        technologiesIUseIntroScrollObserver.observe(technologiesIUseIntroScrollTrigger);
        //console.log("Observing technologiesIUseIntroScrollTrigger.");

    } else {
        console.error("Technologies/Intro Smooth Scroll Trigger, ERROR: Could not find the introSection or the technologiesIUseIntroScrollTrigger.");
    }

    //Technologies/ Projects Scroll Trigger
    const projectsSection = document.getElementById('projects'); 
    //console.log("Technologies/ Projects Smooth Scroll Trigger, projects address found", projectsSection);
    const technologiesIUseProjectsScrollTrigger = document.getElementById('technologiesIUseProjectsScrollTrigger'); 
    //console.log("Technologies/ Projects Smooth Scroll Trigger, technoligiesIUseProjectsScrollTrigger found", technologiesIUseProjectsScrollTrigger);
    

    let technologiesIUseProjectsScrollObserver;

    if (projectsSection && technologiesIUseProjectsScrollTrigger) {
        //console.log("Technologies/ Projects Smooth Scroll Trigger: projectsSection && technologiesIUseProjectsScrollTrigger found");
        technologiesIUseProjectsScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Technologies/ Projects Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Technologies/ Projects Smooth Scroll Trigger: Scrolling to Projects Section", projectsSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Technologies/ Projects Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        technologiesIUseProjectsScrollObserver.observe(technologiesIUseProjectsScrollTrigger);
        //console.log("Observing technologiesIUseProjectsScrollTrigger.");

    } else {
        console.error("Technologies/ Projects Smooth Scroll Trigger: ERROR Could not find the projectsSection or the technologiesIUseProjectsScrollTrigger.");
    }

    // Projects/ Technologies Scroll Trigger
    
    //console.log("Projects/ Technologies Smooth Scroll Trigger, technologiesIUseSection address found", technologiesIUseSection);
    const projectsTechnologiesIUseIntroScrollTrigger = document.getElementById('projectsTechnologiesIUseIntroScrollTrigger'); 
    //console.log("Projects/ Technologies Smooth Scroll Trigger, projectsTechnologiesIUseIntroScrollTrigge found", projectsTechnologiesIUseIntroScrollTrigger);
    

    let projectsTechnologiesIUseIntroScrollObserver;

    if (technologiesIUseSection && projectsTechnologiesIUseIntroScrollTrigger) {
        //console.log("Projects/ Technologies Smooth Scroll Trigger: technologiesIUseSection && projectsTechnologiesIUseIntroScrollTrigger found");
        projectsTechnologiesIUseIntroScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Projects/ Technologies Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    technologiesIUseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Projects/ Technologies Smooth Scroll Trigger: Scrolling to technologiesIUseSection", technologiesIUseSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Projects/ Technologies Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        projectsTechnologiesIUseIntroScrollObserver.observe(projectsTechnologiesIUseIntroScrollTrigger);
        //console.log("Observing projectsTechnologiesIUseIntroScrollTrigger.");

    } else {
        console.error("Projects/ Technologies Smooth Scroll Trigger: ERROR Could not find the technologiesIUseSection or the projectsTechnologiesIUseIntroScrollTrigger.");
    }

    // Projects/ Resume Scroll Trigger

    const resumeSection = document.getElementById('resume'); 
    //console.log("Projects/ Resume Smooth Scroll Trigger, resumeSection address found", resumeSection);
    const projectsResumeScrollTrigger = document.getElementById('projectsResumeScrollTrigger'); 
    //console.log("Projects/ Resume Smooth Scroll Trigger, projectsResumeScrollTrigger found", projectsResumeScrollTrigger);
    

    let projectsResumeScrollObserver;

    if (resumeSection && projectsResumeScrollTrigger) {
        //console.log("Projects/ Resume Smooth Scroll Trigger: projectsSection && projectsResumeScrollTrigger found");
        projectsResumeScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Projects/ Resume Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    resumeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Projects/ Resume Smooth Scroll Trigger: Scrolling to resumeSection", resumeSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Projects/ Resume Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        projectsResumeScrollObserver.observe(projectsResumeScrollTrigger);
        //console.log("Observing projectsResumeScrollTrigger.");

    } else {
        console.error("Projects/ Resume Smooth Scroll Trigger: ERROR Could not find the resumeSection or the projectsResumeScrollTrigger.");
    }

    // Resume/ Projects Scroll Trigger
    
   
    //console.log("Resume/ Projects Smooth Scroll Trigger, resumeSection address found", projectsSection);
    const resumeProjectsScrollTrigger = document.getElementById('resumeProjectsScrollTrigger'); 
    //console.log("Resume/ Projects Smooth Scroll Trigger, resumeProjectsScrollTrigger found", resumeProjectsScrollTrigger);
    

    let resumeProjectsScrollObserver;

    if (projectsSection && resumeProjectsScrollTrigger) {
        //console.log("Resume/ Projects Smooth Scroll Trigger: projectsSection && resumeProjectsScrollTrigger found");
        resumeProjectsScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Resume/ Projects Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Resume/ Projects Smooth Scroll Trigger: Scrolling to projectsSection", projectsSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Resume/ Projects Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        resumeProjectsScrollObserver.observe(resumeProjectsScrollTrigger);
        //console.log("Observing resumeProjectsScrollTrigger.");

    } else {
        //console.error("Resume/ Projects Smooth Scroll Trigger: ERROR Could not find the projectsSection or the resumeProjectsScrollTrigger.");
    }

    // Resume/ Education Scroll Trigger
    const educationSection = document.getElementById('education'); 
    //console.log("Resume/ Education Smooth Scroll Trigger, educationSection address found", educationSection);
    const resumeEducationScrollTrigger = document.getElementById('resumeEducationScrollTrigger'); 
    //console.log("Resume/ Education Smooth Scroll Trigger, resumeEducationScrollTrigger found", resumeEducationScrollTrigger);
    

    let resumeEducationScrollObserver;

    if (educationSection && resumeEducationScrollTrigger) {
        //console.log("Resume/ Education Smooth Scroll Trigger: educationSection && resumeEducationScrollTrigger found");
        resumeEducationScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Resume/ Education Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    educationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Resume/ Education Smooth Scroll Trigger: Scrolling to educationSection", educationSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Resume/ Education Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        resumeEducationScrollObserver.observe(resumeEducationScrollTrigger);
        //console.log("Observing resumeEducationScrollTrigger.");

    } else {
        console.error("Resume/ Education Smooth Scroll Trigger: ERROR Could not find the educationSection or the resumeEducationScrollTrigger.");
    }

    // Education/ Resume Scroll Trigger
    
    //const resumeSection = document.getElementById('resume');//declared above earlier in script
    //console.log("Education/ Resume Smooth Scroll Trigger, resumeSection address found", resumeSection);
    const educationResumeScrollTrigger = document.getElementById('educationResumeScrollTrigger'); 
    //console.log("Education/ Resume Smooth Scroll Trigger, educationResumeScrollTrigger found", educationResumeScrollTrigger);
    

    let educationResumeScrollObserver;

    if (resumeSection && resumeProjectsScrollTrigger) {
        //console.log("Education/ Resume Smooth Scroll Trigger: resumeSection && educationResumeScrollTrigger found");
        educationResumeScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Education/ Resume Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    resumeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Education/ Resume Smooth Scroll Trigger: Scrolling to resumeSection", resumeSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Education/ Resume Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        educationResumeScrollObserver.observe(educationResumeScrollTrigger);
        //console.log("Observing resumeProjectsScrollTrigger.");

    } else {
        console.error("Education/ Resume Smooth Scroll Trigger: ERROR Could not find the resumeSection or the educationResumeScrollTrigger.");
    }

    // Education/ About Me Scroll Trigger
    
    const aboutMeSectionSection = document.getElementById('about-me');//declared above earlier in script
    //console.log("Education/ About Me Smooth Scroll Trigger, aboutMeSectionSection address found", aboutMeSectionSection);
    const educationAboutMeScrollTrigger = document.getElementById('educationAboutMeScrollTrigger'); 
    //console.log("Education/ About Me Smooth Scroll Trigger, educationAboutMeScrollTrigger found", educationAboutMeScrollTrigger);
    

    let educationAboutMeScrollObserver;

    if (aboutMeSectionSection && educationAboutMeScrollTrigger) {
        //console.log("Education/ About Me Smooth Scroll Trigger: aboutMeSectionSection && educationAboutMeScrollTrigger found");
        educationAboutMeScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    //console.log("Education/ About Me Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    aboutMeSectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    //console.log("Education/ About Me Smooth Scroll Trigger: Scrolling to aboutMeSectionSection", aboutMeSectionSection);

                    setTimeout(() => {
                        isSnapping = false;
                        //console.log("Education/ About Me Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        educationAboutMeScrollObserver.observe(educationAboutMeScrollTrigger);
        //console.log("Observing resumeProjectsScrollTrigger.");

    } else {
        console.error("Education/ About Me Smooth Scroll Trigger: ERROR Could not find the aboutMeSectionSection or the educationAboutMeScrollTrigger.");
    }

    // About Me/ Education Scroll Trigger
    
    //const educationSection = document.getElementById('education');//declared above earlier in script
    console.log("About Me/ Education Scroll Trigger, educationSection address found", educationSection);
    const aboutMeEducationScrollTrigger = document.getElementById('aboutMeEducationScrollTrigger'); 
    console.log("About Me/ Education Smooth Scroll Trigger, aboutMeEducationScrollTrigger found", aboutMeEducationScrollTrigger);
    

    let aboutMeEducationScrollObserver;

    if (educationSection && aboutMeEducationScrollTrigger) {
        console.log("About Me/ Education Me Smooth Scroll Trigger: educationSection && educationAboutMeScrollTrigger found");
        aboutMeEducationScrollObserver = new IntersectionObserver((entries) => { // Use the global variable
            entries.forEach(entry => {
                if (entry.isIntersecting && isSnapping==false) {
                    isSnapping = true;
                    console.log("About Me/ Education Smooth Scroll Trigger: isSnapping set to true. because trigger is intersecting and isSnapping is set to false");

                    educationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log("About Me/ Education Smooth Scroll Trigger: Scrolling to educationSection", educationSection);

                    setTimeout(() => {
                        isSnapping = false;
                        console.log("About Me/ Education Smooth Scroll Trigger: isSnapping set to false. because scrolling is complete.");
                    }, 700); // Changed to 700ms for consistency with other smooth scrolls
                }
            });
        }, {
            threshold: 0.1 // Changed to 0.1 for consistency with other triggers
        });
        // Start observing the trigger
        aboutMeEducationScrollObserver.observe(aboutMeEducationScrollTrigger);
        console.log("Observing aboutMeEducationScrollTrigger.");

    } else {
        console.error("About Me/ Education Smooth Scroll Trigger: ERROR Could not find the educationSection or the aboutMeEducationScrollTrigger.");
    }

    //typewriter
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

    
    /**********************************
        Technologies I Use Section
    **********************************/
    
    const technologiesSection = document.getElementById('technologies-i-use');
    
    // Section Header Variables
    const techDivider = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .divider') : null;
    const techTitleBackground = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .title-background') : null; // Get the backing element
    
    

    //technology animated autotype section title
    // Auto Type Animation Variable
    const techAnimatedTitleSpan = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .animated-title') : null;
    const textStartDelay = 700; // Delay for text animation after window lands (adjust as needed)
    const typewriterSpeed = 125; // Speed of the typewriter animation
    const techSectionTitleText = 'Technologies I Use';

    function resetTechAnimatedText() {
        if (techAnimatedTitleSpan) {
            techAnimatedTitleSpan.textContent = ''; // Clear the text
        }
    }

    function startTechTextAnimation() {
        if (techAnimatedTitleSpan) {
            techTypeWriter(techAnimatedTitleSpan, techSectionTitleText, typewriterSpeed);
        }
    }

    // Make technology section's background visible
    // Background and Window Slide-In Variables
    //const techBackgroundBlock = technologiesSection.querySelector('.background-block');
    const techSlideInWindow = technologiesSection ? technologiesSection.querySelector('.technologies-slide-in-window') : null; 
    //const techCategoryLinks = technologiesSection.querySelectorAll('.technology-categories a');
    const slideInDelay = 1000; // Delay for window slide-in after background
    const techBackgroundImage = technologiesSection ? technologiesSection.querySelector('.background-image') : null;
 
    const technologiesSectionObserver_bg_slide = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is in view
                if (techBackgroundImage) {
                    techBackgroundImage.classList.add('visible'); // Trigger background image animation
                }
                if (techSlideInWindow) {
                    setTimeout(() => {
                        techSlideInWindow.classList.add('visible'); // Trigger slide-in animation after delay
                        // Start text animation after the window has (mostly) landed
                        setTimeout(startTechTextAnimation, textStartDelay);
                    }, slideInDelay);
                }
                if (techDivider) {
                    setTimeout(() => {
                        techDivider.classList.add('slide-in'); // Slide in the divider with the window
                    }, slideInDelay);
                }
                if (techTitleBackground) {
                    setTimeout(() => {
                        techTitleBackground.classList.add('slide-in'); // Slide in the title background with the window
                    }, slideInDelay);
                }
                // Optionally, you might want to reset the text when it comes into view again
                resetTechAnimatedText();
                setTimeout(slideInDelay + textStartDelay + 100); // Restart after slide-in
            } else {
                // Section is out of view
                if (techBackgroundImage) {
                    techBackgroundImage.classList.remove('visible'); // Reset background image
                }
                if (techSlideInWindow) {
                    techSlideInWindow.classList.remove('visible'); // Reset slide-in position and opacity
                }
                if (techDivider) {
                    techDivider.classList.remove('slide-in'); // Reset divider position
                }
                if (techTitleBackground) {
                    techTitleBackground.classList.remove('slide-in'); // Reset title background position
                }
                // resetAnimatedText(); // Already reset when coming into view
            }
        });
    }, { threshold: 0.2 });

    if (technologiesSection) {
        technologiesSectionObserver_bg_slide.observe(technologiesSection);
    }

    // (Keep your technolgies typeWriter function here)
    function techTypeWriter(element, text, speed, callback) {
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
    /* Technology Popups */
    // Popup Windows and Icons
    //const detailsPopup = document.getElementById('technologyDetailsPopup');
    //const techDetailsPopupTitle = document.getElementById('details-popup-title');
    //const techIconsContainer = document.getElementById('technology-icons-container');

    const frontendButton = document.querySelector('.technology-categories a[data-category="frontend"]');
    const frontendDetailsPopup = document.getElementById('frontendDetailsPopup');
    const frontendPopupTitle = frontendDetailsPopup ? frontendDetailsPopup.querySelector('h3') : null;
    const frontendIconsContainer = frontendDetailsPopup ? frontendDetailsPopup.querySelector('.technology-icons-container') : null;
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
    const backendButton = document.querySelector('.technology-categories a[data-category="backend"]');
    const backendDetailsPopup = document.getElementById('backendDetailsPopup');

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

    // Database Popup
    const databaseButton = document.querySelector('.technology-categories a[data-category="database"]');
    const databaseDetailsPopup = document.getElementById('databaseDetailsPopup');

    function handleOutsideClickDatabase(event) {
        if (databaseDetailsPopup.classList.contains('open') && !databaseDetailsPopup.contains(event.target) && event.target !== databaseButton) {
            closeDatabaseDetailsPopup();
            document.removeEventListener('click', handleOutsideClickDatabase);
        }
    }

    if (databaseButton && databaseDetailsPopup) {
        databaseButton.addEventListener('click', function(event) {
            event.preventDefault();
            databaseDetailsPopup.classList.add('open');
            document.addEventListener('click', handleOutsideClickDatabase);
        });

        window.closeDatabaseDetailsPopup = function() {
            databaseDetailsPopup.classList.remove('open');
            document.removeEventListener('click', handleOutsideClickDatabase);
        };
    } else {
        console.error("Database button or popup element not found.");
    }

    // Source/Version Control Popup
    const sourceControlButton = document.querySelector('.technology-categories a[data-category="source-control"]');
    const sourceControlDetailsPopup = document.getElementById('sourceControlDetailsPopup');

    function handleOutsideClickSourceControl(event) {
        if (sourceControlDetailsPopup.classList.contains('open') && !sourceControlDetailsPopup.contains(event.target) && event.target !== sourceControlButton) {
            closeSourceControlDetailsPopup();
            document.removeEventListener('click', handleOutsideClickSourceControl);
        }
    }

    if (sourceControlButton && sourceControlDetailsPopup) {
        sourceControlButton.addEventListener('click', function(event) {
            event.preventDefault();
            sourceControlDetailsPopup.classList.add('open');
            document.addEventListener('click', handleOutsideClickSourceControl);
        });

        window.closeSourceControlDetailsPopup = function() {
            sourceControlDetailsPopup.classList.remove('open');
            document.removeEventListener('click', handleOutsideClickSourceControl);
        };
    } else {
        console.error("Source/Version Control button or popup element not found.");
    }

    // Application Development Popup
    const applicationDevelopmentButton = document.querySelector('.technology-categories a[data-category="application-development"]');
    const applicationDevelopmentDetailsPopup = document.getElementById('applicationDevelopmentDetailsPopup');

    function handleOutsideClickApplicationDevelopment(event) {
        if (applicationDevelopmentDetailsPopup.classList.contains('open') && !applicationDevelopmentDetailsPopup.contains(event.target) && event.target !== applicationDevelopmentButton) {
            closeApplicationDevelopmentDetailsPopup();
            document.removeEventListener('click', handleOutsideClickApplicationDevelopment);
        }
    }

    if (applicationDevelopmentButton && applicationDevelopmentDetailsPopup) {
        applicationDevelopmentButton.addEventListener('click', function(event) {
            event.preventDefault();
            applicationDevelopmentDetailsPopup.classList.add('open');
            document.addEventListener('click', handleOutsideClickApplicationDevelopment);
        });

        window.closeApplicationDevelopmentDetailsPopup = function() {
            applicationDevelopmentDetailsPopup.classList.remove('open');
            document.removeEventListener('click', handleOutsideClickApplicationDevelopment);
        };
    } else {
        console.error("Application Development button or popup element not found.");
    }

    // Cloud Popup
    const cloudButton = document.querySelector('.technology-categories a[data-category="cloud"]');
    const cloudDetailsPopup = document.getElementById('cloudDetailsPopup');

    function handleOutsideClickCloud(event) {
        if (cloudDetailsPopup.classList.contains('open') && !cloudDetailsPopup.contains(event.target) && event.target !== cloudButton) {
            closeCloudDetailsPopup();
            document.removeEventListener('click', handleOutsideClickCloud);
        }
    }

    if (cloudButton && cloudDetailsPopup) {
        cloudButton.addEventListener('click', function(event) {
            event.preventDefault();
            cloudDetailsPopup.classList.add('open');
            document.addEventListener('click', handleOutsideClickCloud);
        });

        window.closeCloudDetailsPopup = function() {
            cloudDetailsPopup.classList.remove('open');
            document.removeEventListener('click', handleOutsideClickCloud);
        };
    } else {
        console.error("Cloud button or popup element not found.");
    }

    /*********************
     Projects section
    *********************/
    // Projects section elements
    //const projectsSection = document.getElementById('projects'); //declared earlier in script
    // Section Header Variables
    const projectsDivider = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .divider') : null;
    const projectsTitleBackground = technologiesSection ? technologiesSection.querySelector('.title-flex-wrapper .title-background') : null; // Get the backing element

    // project cards and popups
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    const projectDetailPopups = document.querySelectorAll('.project-details-popup');
    const projectsTitleSpan = projectsSection ? projectsSection.querySelector('.title-flex-wrapper .animated-title') : null;
    const projectsTitleText = 'My Projects';

    //Projects Animated Autotype Section Title
    // Auto Type Animation Variable
    const projectsAnimatedTitleSpan = projectsSection ? projectsSection.querySelector('.title-flex-wrapper .animated-title') : null;
    const projectSectionTitleText = 'Projects';

    function resetProjectsAnimatedText() {
        if (projectsAnimatedTitleSpan) {
            projectsAnimatedTitleSpan.textContent = ''; // Clear the text
        }
    }

    function startProjectsTextAnimation() {
        if (projectsAnimatedTitleSpan) {
            projectsTypeWriter(projectsAnimatedTitleSpan, projectSectionTitleText, typewriterSpeed);
        }
    }

    // (Keep your project section typeWriter function here)
    function projectsTypeWriter(element, text, speed, callback) {
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
    // Make technology section's background visible
    // Background and Window Slide-In Variables
    const projectsSlideInWindow = projectsSection ? projectsSection.querySelector('.projects-slide-in-window') : null;
    //const slideInDelay = 1000; // Delay for window slide-in after background // declared in the first section the same across all sections
    const projectsBackgroundImage = projectsSection ? projectsSection.querySelector('.background-image') : null;

    // Intersection Observer for Projects section slide-in and title animation
    const projectsSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (projectsBackgroundImage) {
                    projectsBackgroundImage.classList.add('visible'); // Trigger background image animation
                }
                if (projectsSlideInWindow) {
                    setTimeout(() => {
                    projectsSlideInWindow.classList.add('visible');
                    // Trigger text animation
                    setTimeout(startProjectsTextAnimation, textStartDelay);
                    }, slideInDelay);
                }
                if (projectsDivider) {
                    setTimeout(() => {
                        projectsDivider.classList.add('slide-in'); // Slide in the divider with the window
                    }, slideInDelay);
                }
                if (projectsTitleBackground) {
                    setTimeout(() => {
                        projectsTitleBackground.classList.add('slide-in'); // Slide in the title background with the window
                    }, slideInDelay);
                }
                // Optionally, you might want to reset the text when it comes into view again
                resetProjectsAnimatedText();
                setTimeout(slideInDelay + textStartDelay + 100); // Restart after slide-in
            } else {
                // Section is out of view
                if (projectsBackgroundImage) {
                    projectsBackgroundImage.classList.remove('visible'); // Reset background image
                }
                if (projectsSlideInWindow) {
                    projectsSlideInWindow.classList.remove('visible'); // Reset slide-in position and opacity
                }
                if (projectsDivider) {
                    projectsDivider.classList.remove('slide-in'); // Reset divider position
                }
                if (projectsTitleBackground) {
                    projectsTitleBackground.classList.remove('slide-in'); // Reset title background position
                }
                // resetAnimatedText(); // Already reset when coming into view
            }
        });
    }, { threshold: 0.2 });
    // Dot Slider
    const projectsGrid = projectsSection ? projectsSection.querySelector('.projects-grid') : null;
    const sliderIndicator = projectsSection ? projectsSection.querySelector('.slider-indicator') : null;
    

    if (projectsGrid && sliderIndicator && projectCards.length > 0) {
        const numCards = projectCards.length;

        function createDots() {
            sliderIndicator.innerHTML = ''; // Clear existing dots
            for (let i = 0; i < numCards; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    projectsGrid.scrollTo({
                        left: projectsGrid.offsetWidth * i,
                        behavior: 'smooth'
                    });
                });
                sliderIndicator.appendChild(dot);
            }
            updateActiveDot();
        }

        function updateActiveDot() {
            const scrollPosition = projectsGrid.scrollLeft;
            const cardWidth = projectsGrid.offsetWidth;
            const activeIndex = Math.round(scrollPosition / cardWidth);

            const dots = sliderIndicator.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === activeIndex) {
                    dot.classList.add('active');
                }
            });
        }

        projectsGrid.addEventListener('scroll', updateActiveDot);

        // Re-initialize dots if the number of cards might change dynamically
        createDots();
    }
    // Projects popups
    if (projectsSection) {
        projectsSectionObserver.observe(projectsSection);
    }

    let currentlyOpenPopup = null;

    function openProjectDetails(projectId) {
        const popup = document.getElementById(projectId + 'Details');
        if (popup) {
            popup.classList.add('open');
            document.addEventListener('click', handleOutsideClickProjectDetails);
            currentlyOpenPopup = popup;
        }
    }

    function closeProjectDetails(projectId) {
        const popup = document.getElementById(projectId + 'Details');
        if (popup) {
            popup.classList.remove('open');
            document.removeEventListener('click', handleOutsideClickProjectDetails);
            currentlyOpenPopup = null;
        }
    }

    function handleOutsideClickProjectDetails(event) {
        if (currentlyOpenPopup && !currentlyOpenPopup.contains(event.target) && !event.target.classList.contains('project-card')) {
            const openPopupId = currentlyOpenPopup.id.replace('Details', '');
            closeProjectDetails(openPopupId);
        }
    }

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            openProjectDetails(projectId);
        });
    });

    projectDetailPopups.forEach(popup => {
        popup.classList.remove('open'); // Ensure they are hidden initially
    });

    window.closeProjectDetails = closeProjectDetails; // Make it global for HTML onclick

    // Resume Section Variables
    //const resumeSection = document.getElementById('resume'); // declared above earlier in script
    // Resume Header Variablres
    const resumeDivider = resumeSection ? resumeSection.querySelector('.title-flex-wrapper .divider') : null;
    const resumeTitleBackground = resumeSection ? resumeSection.querySelector('.title-flex-wrapper .title-background') : null; // Get the backing element
    
    //Resume Animated Autotype Section Title
    // Auto Type Animation Variables
    const resumeAnimatedTitleSpan = resumeSection ? resumeSection.querySelector('.title-flex-wrapper .animated-title') : null;
    const resumeSectionTitleText = 'Resume';

    function resetResumeAnimatedText() {
        if (resumeAnimatedTitleSpan) {
            resumeAnimatedTitleSpan.textContent = ''; // Clear the text
        }
    }

    function startResumeTextAnimation() {
        if (resumeAnimatedTitleSpan) {
            resumeTypeWriter(resumeAnimatedTitleSpan, resumeSectionTitleText, typewriterSpeed);
        }
    }

    // (Keep your project section typeWriter function here)
    function resumeTypeWriter(element, text, speed, callback) {
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
    // Make Resume section's background visible
    // Background and Window Slide-In Variables
    const resumeSlideInWindow = resumeSection ? resumeSection.querySelector('.resume-slide-in-window') : null;
    //const slideInDelay = 1000; // Delay for window slide-in after background // declared in the first section the same across all sections
    const resumeBackgroundImage = resumeSection ? resumeSection.querySelector('.background-image') : null;

    // Intersection Observer for Projects section slide-in and title animation
    const resumeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (resumeBackgroundImage) {
                    resumeBackgroundImage.classList.add('visible'); // Trigger background image animation
                }
                if (resumeSlideInWindow) {
                    setTimeout(() => {
                        resumeSlideInWindow.classList.add('visible');
                    // Trigger text animation
                    setTimeout(startResumeTextAnimation, textStartDelay);
                    }, slideInDelay);
                }
                if (resumeDivider) {
                    setTimeout(() => {
                        resumeDivider.classList.add('visible'); // Slide in the divider with the window
                    }, slideInDelay);
                }
                if (resumeTitleBackground) {
                    setTimeout(() => {
                        resumeTitleBackground.classList.add('visible'); // Slide in the title background with the window
                    }, slideInDelay);
                }
                // Optionally, you might want to reset the text when it comes into view again
                resetResumeAnimatedText();
                setTimeout(slideInDelay + textStartDelay + 100); // Restart after slide-in
            } else {
                // Section is out of view
                if (resumeBackgroundImage) {
                    resumeBackgroundImage.classList.remove('visible'); // Reset background image
                }
                if (resumeSlideInWindow) {
                    resumeSlideInWindow.classList.remove('visible'); // Reset slide-in position and opacity
                }
                if (resumeDivider) {
                    resumeDivider.classList.remove('visible'); // Reset divider position
                }
                if (resumeTitleBackground) {
                    resumeTitleBackground.classList.remove('visible'); // Reset title background position
                }
                // resetAnimatedText(); // Already reset when coming into view
            }
        });
    }, { threshold: 0.2 });

    if (resumeSection) {
        resumeSectionObserver.observe(resumeSection);
    }

    // Resume Actions - Download
    const downloadResumeButton = document.getElementById('download-resume');
    if (downloadResumeButton) {
        downloadResumeButton.addEventListener('click', function() {
            const pdfUrl = 'path/to/your/resume.pdf'; // Ensure this is the correct path
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'Your_Resume.pdf'; // Set the desired download filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Resume Actions - Print
    const printResumeButton = document.getElementById('print-resume');
    if (printResumeButton) {
        printResumeButton.addEventListener('click', function() {
            const iframe = document.getElementById('resume-pdf-viewer');
            if (iframe) {
                iframe.contentWindow.print();
            } else {
                alert('Resume viewer not loaded yet.');
            }
        });
    }

    /*********************
     Education Section
    *********************/
    // Education section elements
    //const educationSection = document.getElementById('education'); // declared above earlier in the script.
    // Section Header Variables
    const educationDivider = educationSection ? educationSection.querySelector('.title-flex-wrapper .divider') : null;
    const educationTitleBackground = educationSection ? educationSection.querySelector('.title-flex-wrapper .title-background') : null; // Get the backing element
    
    //Education Animated Autotype Section Title
    // Auto Type Animation Variable
    const educationAnimatedTitleSpan = educationSection ? educationSection.querySelector('.title-flex-wrapper .animated-title') : null;
    const educationSectionTitleText = 'Education';

    function resetEducationAnimatedText() {
        if (educationAnimatedTitleSpan) {
            educationAnimatedTitleSpan.textContent = ''; // Clear the text
        }
    }

    function startEducationTextAnimation() {
        if (educationAnimatedTitleSpan) {
            educationTypeWriter(educationAnimatedTitleSpan, educationSectionTitleText, typewriterSpeed);
        }
    }

    // education typewriter
    function educationTypeWriter(element, text, speed, callback) {
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
    // Make Education section's background visible
    // Background and Window Slide-In Variables
    const educationSlideInWindow = educationSection ? educationSection.querySelector('.education-slide-in-window') : null;
    //const slideInDelay = 1000; // Delay for window slide-in after background // declared in the first section the same across all sections
    const educationBackgroundImage = educationSection ? educationSection.querySelector('.background-image') : null;

    // Intersection Observer for Education section slide-in and title animation
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (educationBackgroundImage) {
                    educationBackgroundImage.classList.add('visible');
                }
                if (educationSlideInWindow) {
                    setTimeout(() => {
                    educationSlideInWindow.classList.add('visible');
                    // Trigger text animation
                    setTimeout(startEducationTextAnimation, textStartDelay);
                    }, slideInDelay);
                }
                if (educationDivider) {
                    setTimeout(() => {
                        educationDivider.classList.add('slide-in'); // Slide in the divider with the window
                    }, slideInDelay);
                }
                if (educationTitleBackground) {
                    setTimeout(() => {
                        educationTitleBackground.classList.add('slide-in'); // Slide in the title background with the window
                    }, slideInDelay);
                }
                // Optionally, you might want to reset the text when it comes into view again
                resetEducationAnimatedText();
                setTimeout(slideInDelay + textStartDelay + 100); // Restart after slide-in
            } else {
                if (educationBackgroundImage) {
                    educationBackgroundImage.classList.remove('visible');
                }
                if (educationSlideInWindow) {
                    educationSlideInWindow.classList.remove('visible');
                }
                if (educationDivider) {
                    educationDivider.classList.remove('slide-in'); // Reset divider position
                }
                if (educationTitleBackground) {
                    educationTitleBackground.classList.remove('slide-in'); // Reset title background position
                }
                resetEducationAnimatedText(); // Already reset when coming into view
            }
        });
    }, { threshold: 0.2 });
    if (educationSection) {
        educationObserver.observe(educationSection);
    }

    // Dot Slider
    const educationGrid = educationSection ? educationSection.querySelector('.education-grid') : null;
    const educationSliderIndicator = educationSection ? educationSection.querySelector('.slider-indicator') : null;
    const educationCards = document.querySelectorAll('.education-grid .education-card');

    if (educationGrid && educationSliderIndicator && educationCards.length > 0) 
        {
        const numEducationCards = educationCards.length;

        function createDots() 
        {
            educationSliderIndicator.innerHTML = ''; // Clear existing dots
            for (let i = 0; i < numEducationCards; i++) 
            {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    educationGrid.scrollTo({
                        left: educationGrid.offsetWidth * i,
                        behavior: 'smooth'
                    });
                });
                educationSliderIndicator.appendChild(dot);
            }
            updateActiveDot();
        }

        function updateActiveDot() {
            const scrollPosition = educationGrid.scrollLeft;
            const cardWidth = educationGrid.offsetWidth;
            const activeIndex = Math.round(scrollPosition / cardWidth);

            const dots = educationSliderIndicator.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === activeIndex) {
                    dot.classList.add('active');
                }
            });
        }

        educationGrid.addEventListener('scroll', updateActiveDot);

        // Re-initialize dots if the number of cards might change dynamically
        createDots();
    }

    /*********************
     About Me Section
    *********************/
   // About Me section elements
   const aboutMeSection = document.getElementById('about-me');
   // Section Header Variables
   const aboutMeDivider = aboutMeSection ? aboutMeSection.querySelector('.title-flex-wrapper .divider') : null;
   const aboutMeTitleBackground = aboutMeSection ? aboutMeSection.querySelector('.title-flex-wrapper .title-background') : null; // Get the backing element
   
   //About Me Animated Autotype Section Title
   // Auto Type Animation Variable
   const aboutMeAnimatedTitleSpan = aboutMeSection ? aboutMeSection.querySelector('.title-flex-wrapper .animated-title') : null;
   const aboutMeSectionTitleText = 'About Me';

   function resetAboutMeAnimatedText() {
       if (aboutMeAnimatedTitleSpan) {
        aboutMeAnimatedTitleSpan.textContent = ''; // Clear the text
       }
   }

   function startAboutMeTextAnimation() {
       if (aboutMeAnimatedTitleSpan) {
        aboutMeTypeWriter(aboutMeAnimatedTitleSpan, aboutMeSectionTitleText, typewriterSpeed);
       }
   }

   // About Me typewriter
   function aboutMeTypeWriter(element, text, speed, callback) {
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
   // Make Education section's background visible
   // Background and Window Slide-In Variables
   const aboutMeSlideInWindow = aboutMeSection ? aboutMeSection.querySelector('.about-me-slide-in-window') : null;
   //const slideInDelay = 1000; // Delay for window slide-in after background // declared in the first section the same across all sections
   const aboutMeBackgroundImage = aboutMeSection ? aboutMeSection.querySelector('.background-image') : null;

   // Intersection Observer for Education section slide-in and title animation
   const aboutMeObserver = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               if (aboutMeBackgroundImage) {
                aboutMeBackgroundImage.classList.add('visible');
               }
               if (aboutMeSlideInWindow) {
                   setTimeout(() => {
                        aboutMeSlideInWindow.classList.add('visible');
                   // Trigger text animation
                   setTimeout(startAboutMeTextAnimation, textStartDelay);
                   }, slideInDelay);
               }
               if (aboutMeDivider) {
                   setTimeout(() => {
                        aboutMeDivider.classList.add('slide-in'); // Slide in the divider with the window
                   }, slideInDelay);
               }
               if (aboutMeTitleBackground) {
                   setTimeout(() => {
                        aboutMeTitleBackground.classList.add('slide-in'); // Slide in the title background with the window
                   }, slideInDelay);
               }
               // Optionally, you might want to reset the text when it comes into view again
               resetAboutMeAnimatedText();
               setTimeout(slideInDelay + textStartDelay + 100); // Restart after slide-in
           } else {
               if (aboutMeBackgroundImage) {
                    aboutMeBackgroundImage.classList.remove('visible');
               }
               if (aboutMeSlideInWindow) {
                    aboutMeSlideInWindow.classList.remove('visible');
               }
               if (aboutMeDivider) {
                    aboutMeDivider.classList.remove('slide-in'); // Reset divider position
               }
               if (aboutMeTitleBackground) {
                    aboutMeTitleBackground.classList.remove('slide-in'); // Reset title background position
               }
               resetAboutMeAnimatedText(); // Already reset when coming into view
           }
       });
   }, { threshold: 0.2 });
   if (aboutMeSection) {
        aboutMeObserver.observe(aboutMeSection);
   }
    // Toggle Functionality for About Me Section
    const toggleHeadings = document.querySelectorAll('.toggle-heading');

    // Get the border color of the slide-in window
    const windowBorderColor = aboutMeSlideInWindow ? getComputedStyle(aboutMeSlideInWindow).borderColor : null;

    toggleHeadings.forEach(heading => {
        const content = heading.nextElementSibling;

        // Apply the window border color to the toggle content
        if (content && content.classList.contains('toggle-content') && windowBorderColor) {
            content.style.borderColor = windowBorderColor;
        }

        heading.addEventListener('click', function() {
            if (content && content.classList.contains('toggle-content')) {
                content.classList.toggle('open');
                heading.classList.toggle('open'); // Toggles the 'open' class on the heading for chevron rotation
            }
        });
    });
}); 