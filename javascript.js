/* 
GTS Franchise Cost of Vacancy Calculator
Professional Design with Full Responsive Support
*/

$(document).ready(function() {
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    $('#menuToggle').click(function() {
        $('#navMenu').toggleClass('active');
    });

    // Close menu when link clicked
    $('#navMenu a').click(function() {
        $('#navMenu').removeClass('active');
    });

    // ============================================
    // FORM NAVIGATION
    // ============================================
    let currentStep = 0;
    let isAnimating = false;

    // Show first step when CTA button clicked
    $('#ctaButton, .intro .next').click(function(e) {
        e.preventDefault();
        goToStep(1);
    });

    $('.next').click(function(e) {
        e.preventDefault();
        if (currentStep < 3) {
            goToStep(currentStep + 1);
        }
    });

    $('.previous').click(function(e) {
        e.preventDefault();
        if (currentStep > 0) {
            goToStep(currentStep - 1);
        }
    });

    function goToStep(step) {
        if (isAnimating) return;
        isAnimating = true;

        const steps = $('.form-content');
        const currentContent = steps.eq(currentStep);
        const nextContent = steps.eq(step);

        // Fade out current, fade in next
        currentContent.fadeOut(300, function() {
            nextContent.fadeIn(300);
            isAnimating = false;
        });

        // Update progress bar
        updateProgressBar(step);
        currentStep = step;

        // Scroll to form
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $('#calculator').offset().top - 100
            }, 500);
        }, 300);
    }

    function updateProgressBar(step) {
        $('#progressbar li').removeClass('active');
        
        // Map form steps: 0=intro(hidden), 1=step1, 2=step2, 3=results
        // Progress bar only shows steps 1-3
        if (step > 0 && step <= 3) {
            $('#progressbar li').eq(step - 1).addClass('active');
            const width = (step * 33.33) + '%';
            $('.progress-fill').css('width', width);
        }
    }

    // ============================================
    // FORM SUBMISSION
    // ============================================
    $('.calculate-btn').click(function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            alert('Please fill in all required fields');
            return;
        }

        // Calculate results
        calculateResults();
        
        // Go to results
        goToStep(3);
    });

    function validateForm() {
        const postitle = $('.js-postitle').val().trim();
        const vacdays = $('.js-vacdays').val().trim();
        const ansal = $('.js-ansal').val().trim();
        const multi = $('.js-multi').val().trim();
        const fn = $('.js-fn').val().trim();
        const ln = $('.js-ln').val().trim();
        const em = $('.js-em').val().trim();

        return postitle && vacdays && ansal && multi && fn && ln && em;
    }

    function calculateResults() {
        const vacdays = parseInt($('.js-vacdays').val());
        const ansal = parseInt($('.js-ansal').val());
        const multi = parseFloat($('.js-multi').val());

        // Simple calculation: (daily salary * days unfilled) + (annual salary * multiplier * days %)
        const dailySalary = ansal / 365;
        const directCost = dailySalary * vacdays;
        const opportunityCost = (ansal * multi) * (vacdays / 365);
        const totalCost = directCost + opportunityCost;

        // Format currency
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });

        $('.result-value').text(formatter.format(totalCost));
    }

    // ============================================
    // INFO MODALS
    // ============================================
    $('#infoBtn1').click(function(e) {
        e.preventDefault();
        $('#infoModal1').addClass('show');
    });

    $('#infoBtn2').click(function(e) {
        e.preventDefault();
        $('#infoModal2').addClass('show');
    });

    $('.modal-close').click(function() {
        $(this).closest('.modal').removeClass('show');
    });

    $('.modal').click(function(e) {
        if ($(e.target).hasClass('modal')) {
            $(this).removeClass('show');
        }
    });

    // Close modal with Escape key
    $(document).keydown(function(e) {
        if (e.key === 'Escape') {
            $('.modal').removeClass('show');
        }
    });
});
