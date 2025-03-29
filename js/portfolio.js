    // portfolio.js

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

    //nav menu toggle
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

    // change hamburger menu to green on scroll
    window.addEventListener('scroll', function() {
        const hamburgerMenu = document.querySelector(".hamburger-menu");
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            hamburgerMenu.classList.add("sticky");
        } else {
            hamburgerMenu.classList.remove("sticky");
        }
    });

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

    //photo switch and glow
    const profileImage = document.getElementById('profileImage');
    const profileImage2 = document.getElementById('profileImage2');
    let currentImageIndex = 0;
    let imageChangeInterval; // Store the interval ID
    //change photos
    function changeProfileImage() {
        if (currentImageIndex === 0) {
            profileImage.style.opacity = 0;
            profileImage2.style.opacity = 1;
            currentImageIndex = 1;
        } else {
            profileImage.style.opacity = 1;
            profileImage2.style.opacity = 0;
            currentImageIndex = 0;
        }
    }
    //make photo border glow
    function triggerImageGlow() {
        profileImage.classList.add('glowing');
        profileImage2.classList.add('glowing');
    
        // Clear any existing interval
        clearInterval(imageChangeInterval);
    
        // Apply width transition for grow
        profileImage.style.transition = 'width 1s ease';
        profileImage2.style.transition = 'width 1s ease';
    
        // Reset size to original (grow)
        profileImage.style.width = '100px';
        profileImage2.style.width = '100px';
    
        // Remove width transition after grow animation
        setTimeout(() => {
            profileImage.style.transition = '';
            profileImage2.style.transition = '';
        }, 1000);
    
        // Set new interval
        imageChangeInterval = setInterval(changeProfileImage, 4000);
    }
    //shrink photo when scrolled off screen
    function shrinkImage() {
        // Clear any existing interval
        clearInterval(imageChangeInterval);
    
        // Remove any existing width transition
        profileImage.style.transition = '';
        profileImage2.style.transition = '';
    
        // Shrink by 50px
        profileImage.style.width = '50px';
        profileImage2.style.width = '50px';
    }
    //watch for shrink condition
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Image is in view (grow)
                triggerImageGlow();
            } else {
                // Image is out of view (shrink)
                shrinkImage();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(profileImage);
    
    // Initialize the interval when the page loads
    imageChangeInterval = setInterval(changeProfileImage, 4000);

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
    