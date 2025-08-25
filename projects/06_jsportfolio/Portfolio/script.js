// Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Navbar background opacity on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            const scrolled = window.scrollY;
            
            if (scrolled > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.1)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.05)';
                nav.style.backdropFilter = 'blur(10px)';
            }
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate button
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.style.transform = 'translateY(-3px)';
            
            // Simulate form submission
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'linear-gradient(45deg, var(--primary), var(--primary-dark))';
                    btn.style.transform = 'translateY(0)';
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            observer.observe(section);
        });

        // Observe skill cards and project cards
        document.querySelectorAll('.skill-card, .project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });

        // Add some interactive particles on mouse move
        document.addEventListener('mousemove', (e) => {
            const cursor = document.createElement('div');
            cursor.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, var(--primary), var(--secondary));
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: cursorFade 1s ease-out forwards;
            `;
            
            document.body.appendChild(cursor);
            
            setTimeout(() => {
                cursor.remove();
            }, 1000);
        });

        // Add cursor fade animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes cursorFade {
                0% {
                    opacity: 0.8;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);