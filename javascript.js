/* 
Original Page: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar 

*/

$( document ).ready(function() {


    
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//modal 2

// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
});





$(function(){

	// make progress bar appear smoothly on 'start'

	
	$('#start-btn').click(function(){
		$('#progressbar').addClass('appear').removeClass('disappear');
	});
	
	// make progress bar disappear smoothly on 'back' or 'calculate':
	
	$('#back-intro, .calculate-btn').click(function(){
		$('#progressbar').toggleClass('appear disappear');
	});


	// refresh page on 'start over' click: 

	/*$(".minor-cta").click(function(){
		location.reload(); 
	});*/

});








$(function(){


	// Get input values

	function getVals() {
		var postitle = $(".js-postitle").val();
		var vacdays = $(".js-vacdays").val();
		var ansal = $(".js-ansal").val();
		var multi = $(".js-multi").val();
		var fn = $(".js-fn").val();
		var ln = $(".js-ln").val();
		var em = $(".em-ln").val();
		
		var raw_values = { 	
			'postitle'	: postitle, 
			'vacdays'	: vacdays, 
			'ansal'	: ansal, 
			'multi'	: multi,
			'fn'	: fn,
			'ln'	: ln,
			'em' : em
		};

		return raw_values;
		
		
	};

	// Scrub the data

	function scrubVals(raw_values) {

		var re = /(\d+.\d{2}|\d+)/ ; // match any integers or currency (decimal) numbers
		var clean = {} ;
		
		$.each(raw_values, function(i, val) {
			
			match = val.match(re)[0]; // get only the first match (regexp returns double)
			num = parseInt(match);
			clean[i] = num;
		});

		return clean;
	};


	// Calculate ROI & budget


	function calculate(clean) {

		lt_gross_rev = clean.aov * clean.aopp * clean.arr;
		lt_profit = lt_gross_rev * (clean.gpm / 100);

		annual_lt_gross_rev = lt_gross_rev * clean.ar;
		annual_lt_profit = lt_profit * clean.ar;
		
		profit_lift = (annual_lt_profit * 0.1);
		cro_budget = (profit_lift * 0.5);

		// convert to string for display:

		profit_as_str = profit_lift.toLocaleString();
		budget_as_str = cro_budget.toLocaleString();

		// diplay in HTML: 

		$('h3.js-profit').text("$" + profit_as_str);
		$('h3.js-budget').text("$" + budget_as_str);
	};


	// Set click listener to calculate-btn:

	$(".calculate-btn").click(function(){
		var values 	= getVals();
		var clean 	= scrubVals(values);
		
		//do the math & display: 
		calculate(clean);
	});

});
});















