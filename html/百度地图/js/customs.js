// JavaScript Document

(function ($) {
$(document).ready(function() {
    $('.has-submenu').click(function(){    
       //$(this).parent().find('.submenu').slideToggle(350); 
       $(this).parent().find('.submenu').toggleClass('show-submenu'); 
       $(this).find('.fa-plus').toggleClass('active-plus');
       return false;
    });
    
	/*/////////*/
	/*Pie Chart*/
	/*/////////*/
	
	var pieData = [
		{	value: 50,	color: "#e74c3c", highlight: "#c0392b", label: "Red"			},
		{	value: 10,	color: "#2ecc71", highlight: "#27ae60",	label: "Green"			},
		{	value: 20,	color: "#f1c40f", highlight: "#f39c12",	label: "Yellow"			},
		{	value: 20,	color: "#2c3e50", highlight: "#34495e",	label: "Dark Blue"		}
	];

	var barChartData = {
		labels : ["One","Two","Three","Four","Five"],
		datasets : [
			{
				fillColor : "rgba(0,0,0,0.1)",
				strokeColor : "rgba(0,0,0,0.2)",
				highlightFill: "rgba(0,0,0,0.25)",
				highlightStroke: "rgba(0,0,0,0.25)",
				data : [20,10,40,30,10]
			}
		]

	}

	/* window.onload = function(){
		var pie_chart_1 = document.getElementById("generate-pie-chart").getContext("2d");
		window.pie_chart_1 = new Chart(pie_chart_1).Pie(pieData);
    
		var bar_chart_1 = document.getElementById("generate-bar-chart").getContext("2d");
		window.pie_chart_1 = new Chart(bar_chart_1).Bar(barChartData);
		
	}; */
                
    //Share Bottom Socials

    $('.show-share-bottom').click(function(){
       $('.share-bottom').toggleClass('active-share-bottom'); 
        return false;
    });    
    
    $('.close-share-bottom, .open-menu, .open-more').click(function(){
       $('.share-bottom').removeClass('active-share-bottom'); 
        return false;
    });

	window.addEventListener('load', function() {
		FastClick.attach(document.body);
	}, false);	
	
    //Countdown timer

	var endDate = "June 7, 2015 15:03:25";
	
	$('.countdown').countdown({
	  date: endDate,
	  render: function(data) {
		$(this.el).html(
		"<div class='countdown-box box-years'><div class='countdown-years'>" + this.leadingZeros(data.years, 2) + 
		"</div><span>years</span></div><div class='countdown-box box-days'><div class='countdown-days'>" + this.leadingZeros(data.days, 2) + 
		"</div><span>days</span></div><div class='countdown-box box-hours'><div class='countdown-hours'>" + this.leadingZeros(data.hours, 2) + 
		"</div><span>hours</span></div><div class='countdown-box box-minutes'><div class='countdown-minutes'>" + this.leadingZeros(data.min, 2) + 
		"</div><span>min</span></div><div class='countdown-box box-seconds'><div class='countdown-seconds'>" + this.leadingZeros(data.sec, 2) + 
		"</div><span>sec</span></div>");
	  }
	});
	
	
	//Animate.css scroll to begin animation //	
	
	var wow = new WOW(
	  {
		boxClass:     'animate',      // animated element css class (default is wow)
		animateClass: 'animated',     // animation css class (default is animated)
		offset:       0,              // distance to the element when triggering the animation (default is 0)
		mobile:       true,           // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();
		
	//Go up
	
	$('.footer-up').click(function() {
		$('body, html').animate({
			scrollTop:0
		}, 800, 'easeInOutQuad');
		return false;
	});
	
	//Portfolio//
	
	$('.adaptive-one-activate').click(function() {
		$('.portfolio-adaptive').removeClass('adaptive-three');
		$('.portfolio-adaptive').removeClass('adaptive-two');
		$('.portfolio-adaptive').addClass('adaptive-one');
		$(this).addClass('active-adaptive-style');
		$('.adaptive-two-activate, .adaptive-three-activate').removeClass('active-adaptive-style');
		return false;
	});
	
	$('.adaptive-two-activate').click(function() {
		$('.portfolio-adaptive').removeClass('adaptive-three');
		$('.portfolio-adaptive').addClass('adaptive-two');
		$('.portfolio-adaptive').removeClass('adaptive-one');	
		$(this).addClass('active-adaptive-style');	
		$('.adaptive-three-activate, .adaptive-one-activate').removeClass('active-adaptive-style');
		return false;
	});
	
	$('.adaptive-three-activate').click(function() {
		$('.portfolio-adaptive').addClass('adaptive-three');
		$('.portfolio-adaptive').removeClass('adaptive-two');
		$('.portfolio-adaptive').removeClass('adaptive-one');
		$(this).addClass('active-adaptive-style');	
		$('.adaptive-two-activate, .adaptive-one-activate').removeClass('active-adaptive-style');
		return false;
	});
	
	
	//Close Sharebox//
	
	$('.open-sharebox').click(function() {
		$('.sharebox-wrapper').fadeIn(200);
	});
	
	$('.close-sharebox').click(function() {
		$('.sharebox-wrapper').fadeOut(200);
	});
	
	$('.open-loginbox').click(function() {
		$('.loginbox-wrapper').fadeIn(200);
	});
	
	$('.close-loginbox').click(function() {
		$('.loginbox-wrapper').fadeOut(200);
	});
			

		
	/////////////////////////////////////////////////////////////////////////////////////////////
	//Detect user agent for known mobile devices and show hide elements for each specific element
	/////////////////////////////////////////////////////////////////////////////////////////////
	
	var isiPhone = 		navigator.userAgent.toLowerCase().indexOf("iphone");
	var isiPad = 		navigator.userAgent.toLowerCase().indexOf("ipad");
	var isiPod = 		navigator.userAgent.toLowerCase().indexOf("ipod");
	var isiAndroid = 	navigator.userAgent.toLowerCase().indexOf("android");
	
	if(isiPhone > -1) 	 {		 $('.ipod-detected').hide();		 $('.ipad-detected').hide();		 $('.iphone-detected').show();		 $('.android-detected').hide();	 }
	if(isiPad > -1)	 {		 	 $('.ipod-detected').hide();		 $('.ipad-detected').show();		 $('.iphone-detected').hide();		 $('.android-detected').hide();	 }
	if(isiPod > -1)	 {		 	 $('.ipod-detected').show();		 $('.ipad-detected').hide();		 $('.iphone-detected').hide();		 $('.android-detected').hide();	 }   
	if(isiAndroid > -1) {		 $('.ipod-detected').hide();		 $('.ipad-detected').hide();		 $('.iphone-detected').hide();		 $('.android-detected').show();	 }  

	
	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")
				
	var owlStaffControls = $(".staff-slider");
	owlStaffControls.owlCarousel({
		//Basic Stuff
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [980,3],
		itemsTablet: [768,2],
		itemsTabletSmall: [480,1],
		itemsMobile : [370,1],
		singleItem : false,
		itemsScaleUp : false,
		slideSpeed : 250,
		paginationSpeed : 250,
		rewindSpeed : 250,
		pagination:false,
		autoPlay : false,
		autoHeight: false,
	});
	
	$(".next-staff").click(function(){
	  owlStaffControls.trigger('owl.next');
	  return false;
	});
	$(".prev-staff").click(function(){
	  owlStaffControls.trigger('owl.prev');
	  return false;
	});
	
	var owlQuoteSlider = $(".quote-slider");
	owlQuoteSlider.owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [980,1],
		itemsTablet: [768,1],
		itemsTabletSmall: [480,1],
		itemsMobile : [370,1],
		singleItem : false,
		itemsScaleUp : false,
		slideSpeed : 800,
		paginationSpeed : 300,
		rewindSpeed : 250,
		pagination:false,
		autoPlay : true,
	});
	
	$(".next-quote").click(function() {
	  owlQuoteSlider.trigger('owl.next');
	  return false;
	});
	$(".prev-quote").click(function() {
	  owlQuoteSlider.trigger('owl.prev');
	  return false;
	});
	
	/////////////////
	//Image Gallery//
	/////////////////
	$(".swipebox").swipebox({
		useCSS : true, // false will force the use of jQuery for animations
		hideBarsDelay : 3000 // 0 to always show caption and action bar
	});
	
	$(".wide-gallery-item").swipebox({
		useCSS : true, // false will force the use of jQuery for animations
		hideBarsDelay : 3000 // 0 to always show caption and action bar
	});
	
	var time = 7; // time in seconds
	
	var $progressBar,
		$bar, 
		$elem, 
		isPause, 
		tick,
		percentTime;
	  
	
	//Init the carousel
	$(".homepage-slider").owlCarousel({
		slideSpeed : 200,
		paginationSpeed : 200,
		singleItem : true,
		pagination:true,
		afterInit : progressBar,
		afterMove : moved,
		navigation:false,
		paginationNumbers:false,
		responsive:true,
		autoPlay:true,
		items:1,
		startDragging : pauseOnDragging
	});
	$(".homepage-slider1").owlCarousel({
		slideSpeed : 200,
		paginationSpeed : 200,
		singleItem : true,
		pagination:true,
		afterInit : progressBar,
		afterMove : moved,
		navigation:false,
		paginationNumbers:false,
		responsive:true,
		autoPlay:false,
		items:1,
		startDragging : pauseOnDragging
	});
	//Init progressBar where elem is $("#owl-demo")
	function progressBar(elem){
		$elem = elem;
		//build progress bar elements
		buildProgressBar();
		//start counting
		start();
	}
	
	//create div#progressBar and div#bar then prepend to $("#owl-demo")
	function buildProgressBar(){
		$progressBar = $("<div>",{
			id:"progressBar"
		});
		$bar = $("<div>",{
			id:"bar"
		});
		$progressBar.append($bar).prependTo($elem);
	}
	
	function start() {
		//reset timer
		percentTime = 0;
		isPause = false;
		//run interval every 0.01 second
		tick = setInterval(interval, 10);
	};
	
	function interval() {
		if(isPause === false){
			percentTime += 1 / time;
			$bar.css({
			   width: percentTime+"%"
			 });
			//if percentTime is equal or greater than 100
			if(percentTime >= 100){
			  //slide to next item 
			  //$elem.trigger('owl.next')
			}
		}
	}
	
	//pause while dragging 
	function pauseOnDragging(){
		isPause = true;
	}
	
	//moved callback
	function moved(){
		//clear interval
		clearTimeout(tick);
		//start again
		start();
	}
	
	
	// Custom Navigation Events
	$(".next-home").click(function() {
		$(".homepage-slider").trigger('owl.next');
		return false;
	});
	$(".prev-home").click(function() {
		$(".homepage-slider").trigger('owl.prev');
		return false;
	});	
	
	
    var screen_width = 0;
    var screen_height = 0;
    function resize_coverpage(){
        screen_width = $(window).width();
        screen_height = $(window).height();

         $('.coverpage-image').css({
            height: screen_height -60,
            width: screen_width
        });  
    };
    resize_coverpage();
    $(window).resize(resize_coverpage);
    
	$(".coverpage-slider").owlCarousel({
		slideSpeed : 500,
		paginationSpeed : 500,
		singleItem : true,
		pagination:true,
		afterInit : progressBar,
		afterMove : moved,
		startDragging : pauseOnDragging
	});
    

	$.scrollIt();
    
   //Fullscreen Slider Variables
    var screen_width = 0;
    var screen_height = 0;
    function resize_slider(){
        screen_width = $(window).width();
        screen_height = $(window).height();

         $('.slider-image').css({
            height: screen_height-110,
            width: screen_width
        });  
    };
    resize_slider();
    $(window).resize(resize_slider);
 
	$(".full-slider").owlCarousel({
		slideSpeed : 500,
		paginationSpeed : 500,
		singleItem : true,
		pagination:false,
		afterInit : progressBar,
		afterMove : moved,
		startDragging : pauseOnDragging
	});
    
    
});

}(jQuery));