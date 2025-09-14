// Main JavaScript functionality using jQuery
$(document).ready(function() {
    
    // Loading Screen Animation - jQuery Function 1
    function initLoadingScreen() {
        let progress = 0;
        const progressBar = $('#loadingProgress');
        const progressPercent = $('#progressPercent');
        
        const loadingInterval = setInterval(function() {
            progress += Math.random() * 3 + 1;
            if (progress > 100) progress = 100;
            
            progressBar.css('width', progress + '%');
            progressPercent.text(Math.floor(progress));
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(function() {
                    $('#loadingScreen').fadeOut(1000, function() {
                        $('#mainContent').fadeIn(500);
                        // Initialize scroll animations after loading
                        initScrollAnimations();
                    });
                }, 500);
            }
        }, 80);
    }
    
    // Smooth Scroll Navigation - jQuery Function 2
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'swing');
            }
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const animateElements = $('.glass-card, .service-card, .stat-item');
        
        function checkScroll() {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            animateElements.each(function() {
                const elementTop = $(this).offset().top;
                
                if (scrollTop + windowHeight > elementTop + 100) {
                    $(this).addClass('animate-fade-in');
                }
            });
        }
        
        $(window).on('scroll', checkScroll);
        checkScroll(); // Check on load
    }
    
    // Navbar Scroll Effect
    function initNavbarScroll() {
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop > 50) {
                $('.glass-nav').addClass('scrolled');
            } else {
                $('.glass-nav').removeClass('scrolled');
            }
        });
    }
    
    // Initialize all functions
    initLoadingScreen();
    initSmoothScroll();
    initNavbarScroll();
    
    // Add CSS for fade-in animation
    $('<style>').prop('type', 'text/css').html(`
        .animate-fade-in {
            animation: fadeInUp 0.8s ease-out both;
        }
        
        .glass-nav.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 8px 32px rgba(248, 180, 209, 0.3);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `).appendTo('head');
    
});
