/* 
GTS Franchise Cost of Vacancy Calculator
Modern 2026 Design - Enhanced with smooth animations and better UX
*/

$(document).ready(function() {
    // ============================================
    // MODAL SYSTEM
    // ============================================
    
    const modals = {
        setupModal: function(btnId, modalId, closeClass) {
            const btn = document.getElementById(btnId);
            const modal = document.getElementById(modalId);
            const closeBtn = modal.querySelector(closeClass);
            
            // Open modal
            btn.onclick = (e) => {
                e.preventDefault();
                modal.classList.add('show');
            };
            
            // Close modal - button
            closeBtn.onclick = () => {
                modal.classList.remove('show');
            };
            
            // Close modal - outside click
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            };
        }
    };
    
    // Initialize modals
    modals.setupModal('myBtn', 'myModal', '.close');
    modals.setupModal('myBtn2', 'myModal2', '.close2');
    
    // ============================================
    // FORM NAVIGATION
    // ============================================
    
    let current_fs, next_fs, previous_fs;
    let animating = false;
    let currentStep = 0; // Track current step (0 = intro, 1 = step1, 2 = step2, 3 = results)
    
    $(".next").click(function(){
        if(animating) return false;
        
        animating = true;
        current_fs = $(this).closest(".intro, .form-step, .answers");
        next_fs = current_fs.next();
        
        // Update progress bar based on current step
        currentStep++;
        $("#progressbar li").removeClass("active");
        if(currentStep <= 3) {
            $("#progressbar li").eq(currentStep - 1).addClass("active");
        }
        
        // Show next with animation
        next_fs.show().addClass('show');
        
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + "%";
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide().removeClass('show');
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });
    
    $(".previous").click(function(){
        if(animating) return false;
        
        animating = true;
        current_fs = $(this).closest(".intro, .form-step, .answers");
        previous_fs = current_fs.prev();
        
        // Update progress bar
        currentStep--;
        $("#progressbar li").removeClass("active");
        if(currentStep > 0) {
            $("#progressbar li").eq(currentStep - 1).addClass("active");
        }
        
        // Show previous with animation
        previous_fs.show().addClass('show');
        
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                scale = 0.8 + (1 - now) * 0.2;
                left = ((1-now) * 50) + "%";
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide().removeClass('show');
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });
    
    // ============================================
    // PROGRESS BAR VISIBILITY
    // ============================================
    
    $('#start-btn').click(function(){
        $('.progress-section').fadeIn(400);
    });
    
    $('#back-intro, .calculate-btn').click(function(){
        if($(this).is('#back-intro')) {
            $('.progress-section').fadeOut(400);
        }
    });
    
    // ============================================
    // PREVENT DEFAULT FORM SUBMISSION
    // ============================================
    
    $(".submit").click(function(){
        return false;
    });
});

// ============================================
// FORM DATA HANDLING
// ============================================

$(function(){
    
    // Get input values
    function getVals() {
        var postitle = $(".js-postitle").val();
        var vacdays = $(".js-vacdays").val();
        var ansal = $(".js-ansal").val();
        var multi = $(".js-multi").val();
        var fn = $(".js-fn").val();
        var ln = $(".js-ln").val();
        var em = $(".js-em").val();
        
        var raw_values = {
            'postitle': postitle,
            'vacdays': vacdays,
            'ansal': ansal,
            'multi': multi,
            'fn': fn,
            'ln': ln,
            'em': em
        };
        
        return raw_values;
    }
    
    // Scrub/validate the data
    function scrubVals(raw_values) {
        var re = /(\d+.\d{2}|\d+)/;
        var clean = {};
        
        $.each(raw_values, function(i, val) {
            if(val && val.match(re)) {
                match = val.match(re)[0];
                num = parseInt(match);
                clean[i] = num;
            } else {
                clean[i] = val;
            }
        });
        
        return clean;
    }
    
    // Calculate vacancy costs
    function calculate(clean) {
        // Note: aov, aopp, arr, gpm, ar appear to be undefined/deprecated
        // This is placeholder logic - adjust based on your actual calculation
        
        // Example calculation structure:
        // You can implement your actual logic here
        
        var vacancy_cost = clean.vacdays * (clean.ansal / 365);
        var opportunity_cost = clean.ansal * clean.multi * (clean.vacdays / 365);
        var total_cost = vacancy_cost + opportunity_cost;
        
        // Display results (if needed)
        $('h3.js-profit').text("$" + total_cost.toLocaleString());
    }
    
    // Set click listener to calculate button
    $(".calculate-btn").click(function(){
        var values = getVals();
        var clean = scrubVals(values);
        
        // Do the math & display
        calculate(clean);
        
        // Smooth transition to success screen
        return false;
    });
});
