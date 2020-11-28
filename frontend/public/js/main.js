(function($) {

	'use strict';

	$(document).ready(function(){

		$('#buttonsearch').click(function(){
			$('#formsearch').slideToggle( "fast",function(){
				 $( '#content' ).toggleClass( "moremargin" );
			} );
			$('#searchbox').focus()
			$('.openclosesearch').toggle();
		});

		// OWL CAROUSEL
		var owl = $('.owl-carousel');

		owl.owlCarousel({
		    items:1,
		    autoplayTimeout: 3500,
		    autoplay: true,
		    loop:true,
		    nav:false
		});

		owl.on('changed.owl.carousel', function(event) {
		    var item = event.item.index - 2;     // Position of the current item
		    $('h2').removeClass('animated bounce');
			$('.owl-item').not('.cloned').eq(item).find('h2').addClass('animated bounce');
		});

		// PARALLAX BG
		var $el = $('.parallax-bg');

		$(window).on('scroll', function() {
			var scroll = $(document).scrollTop();
			$el.css({
				'background-position':'50% '+(-.3*scroll)+'px'
			});
		});

		// DATE PICKER
		$('[data-toggle="datepicker"]').datepicker({
			autoHide: true
		});

		// EQUAL HEIGHT
		function equalHeight(group) {
			var tallest = 0;
			group.each(function() {
				var thisHeight = $(this).height();
				if(thisHeight > tallest) {
					tallest = thisHeight;
				}
			});
			group.height(tallest);
		}
		
		equalHeight($(".equal"));

	});

	$(window).on("load", function (e) {
		// MENU ON SCROLL
		$(window).scroll(function () {
			var $this = $(this);
			if ($this.scrollTop() > 240) {
				$('body').addClass('on-scroll');
			} else if($this.scrollTop() < 240){
				$('body').removeClass('on-scroll');
			}
			delete $this.this;
		});
	});

})( jQuery );
