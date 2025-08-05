// MBA Marketplace - Enhanced JavaScript
(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeAnimations();
        initializeSearchEnhancements();
        initializeProductCards();
        initializeFormEnhancements();
        initializeScrollEffects();
    });

    // Animation system
    function initializeAnimations() {
        // Intersection Observer for fade-in animations
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
        document.querySelectorAll('.box-produto, .login-card, .product-details').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Search form enhancements
    function initializeSearchEnhancements() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.input-categorias');
        const categorySelect = document.querySelector('.select-categorias');

        if (searchForm) {
            // Add loading state to search button
            const searchButton = searchForm.querySelector('.btn-buscar-produtos');
            if (searchButton) {
                searchButton.addEventListener('click', function(e) {
                    if (!searchInput.value.trim() && categorySelect.value === '') {
                        e.preventDefault();
                        showNotification('Por favor, preencha pelo menos um campo de busca', 'warning');
                        return;
                    }

                    // Add loading animation
                    this.classList.add('loading');
                    this.innerHTML = '<i class="bi bi-hourglass-split"></i>';
                    
                    // Remove loading after a delay (simulate search)
                    setTimeout(() => {
                        this.classList.remove('loading');
                        this.innerHTML = '<i class="bi bi-search"></i>';
                    }, 2000);
                });
            }

            // Real-time search suggestions (placeholder)
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    // Add subtle animation to input
                    this.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            }
        }
    }

    // Product card interactions
    function initializeProductCards() {
        document.querySelectorAll('.box-produto').forEach(card => {
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });

            // Add click ripple effect
            card.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        });
    }

    // Form enhancements
    function initializeFormEnhancements() {
        // Enhanced form validation feedback
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('is-valid');
                    this.classList.remove('is-invalid');
                } else if (this.hasAttribute('required')) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                }
            });
        });

        // Password strength indicator
        const passwordInput = document.querySelector('input[type="password"]');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const strength = calculatePasswordStrength(this.value);
                updatePasswordStrengthIndicator(this, strength);
            });
        }
    }

    // Scroll effects
    function initializeScrollEffects() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Navbar background opacity on scroll
            if (navbar) {
                if (scrollTop > 50) {
                    navbar.style.background = 'rgba(118, 75, 162, 0.95)';
                    navbar.style.backdropFilter = 'blur(15px)';
                } else {
                    navbar.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                    navbar.style.backdropFilter = 'blur(10px)';
                }
            }

            // Parallax effect for page headers
            const pageHeader = document.querySelector('.page-header');
            if (pageHeader) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                pageHeader.style.transform = `translateY(${rate}px)`;
            }

            lastScrollTop = scrollTop;
        });
    }

    // Utility functions
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification`;
        notification.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            ${message}
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    }

    function updatePasswordStrengthIndicator(input, strength) {
        // Remove existing indicators
        const existingIndicator = input.parentNode.querySelector('.password-strength');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        const indicator = document.createElement('div');
        indicator.className = 'password-strength';
        
        const strengthText = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
        const strengthColors = ['#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997'];
        
        indicator.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background-color: ${strengthColors[strength - 1] || '#6c757d'};"></div>
            </div>
            <small class="strength-text" style="color: ${strengthColors[strength - 1] || '#6c757d'};">${strengthText[strength - 1] || 'Muito fraca'}</small>
        `;

        indicator.style.cssText = `
            margin-top: 0.5rem;
            font-size: 0.875rem;
        `;

        input.parentNode.appendChild(indicator);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .strength-bar {
            width: 100%;
            height: 4px;
            background-color: #e9ecef;
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 0.25rem;
        }

        .strength-fill {
            height: 100%;
            transition: width 0.3s ease, background-color 0.3s ease;
        }

        .form-control.is-valid {
            border-color: #28a745;
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }

        .form-control.is-invalid {
            border-color: #dc3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }

        .loading {
            position: relative;
            color: transparent !important;
        }

        .loading::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 50%;
            margin-left: -8px;
            margin-top: -8px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Global utility functions
    window.MBAMarketplace = {
        showNotification,
        createRippleEffect
    };

})();
