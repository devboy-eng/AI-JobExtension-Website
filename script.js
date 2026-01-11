// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed navbar
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Pricing button handlers
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const plan = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            alert(`Selected: ${plan} for ${price}\n\nRedirecting to payment gateway...`);
            
            // In a real implementation, this would redirect to Razorpay or payment gateway
            // window.location.href = '/payment?plan=' + encodeURIComponent(plan);
        });
    });

    // Demo video placeholder interaction
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            alert('Demo video coming soon! \n\nFor now, follow the step-by-step guide above to get started with KUPOSU AI.');
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .audience-card, .step');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Add loading state for buttons
    function addLoadingState(button, originalText, loadingText) {
        button.textContent = loadingText;
        button.disabled = true;
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        }, 2000);
    }

    // Chrome Extension download simulation
    const extensionLinks = document.querySelectorAll('a[href*="chrome"]');
    extensionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('KUPOSU AI Chrome Extension\n\nComing soon to Chrome Web Store!\n\nFor early access, please contact our support team.');
        });
    });

    // Mobile menu toggle (for future mobile implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Auto-scroll testimonials or features (if implemented)
    function autoScrollFeatures() {
        const featuresContainer = document.querySelector('.features-grid');
        if (featuresContainer) {
            // Add auto-scroll functionality for features if needed
        }
    }

    // Initialize tooltips for feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add tooltip or hover effect
            this.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Copy contact information functionality
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            if (text.includes('+91') || text.includes('@')) {
                navigator.clipboard.writeText(text).then(() => {
                    // Show temporary feedback
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.color = '#10b981';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.color = '';
                    }, 2000);
                });
            }
        });
    });

    // Floating action button for quick access
    function createFloatingButton() {
        const floatingBtn = document.createElement('div');
        floatingBtn.innerHTML = `
            <div style="position: fixed; bottom: 30px; right: 30px; z-index: 1000; background: #2563eb; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3); transition: all 0.3s ease;" id="floatingActionBtn">
                <i class="fas fa-download" style="font-size: 1.2rem;"></i>
            </div>
        `;
        
        document.body.appendChild(floatingBtn);
        
        document.getElementById('floatingActionBtn').addEventListener('click', function() {
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Hide/show floating button based on scroll position
        window.addEventListener('scroll', function() {
            const btn = document.getElementById('floatingActionBtn');
            if (window.scrollY > 500) {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
            } else {
                btn.style.opacity = '0';
                btn.style.transform = 'scale(0.8)';
            }
        });
    }

    // Initialize floating button
    createFloatingButton();

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect on hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 1000);
    }

    console.log('🤖 KUPOSU AI Website loaded successfully!');
    console.log('📧 Contact: hello@kuposu.co');
    console.log('📱 Phone: +91 8866666476');
});