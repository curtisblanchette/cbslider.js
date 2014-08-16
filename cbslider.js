(function($){
	$.fn.cbslider = function(options) {

		//establish our default settings
		var settings = $.extend({
			speed		: 0.5, //
			bgcolor     : '',
			animation   : 'slide' ,
			easing 		: '' 	
		}, options);

		var $slideWrapper = $('#slideWrapper'),
			$slideshow 	  = $('#slideshow'),
			$slideol 	  = $('#slideshow ol'),
			$slideli 	  = $('#slideshow ol li'),
			slidelength   = $slideshow.find('ol > li').length;
		
		
		//init Hammer
		$('#slideshow').hammer({threshold:100}).bind("swipeleft", animateNext);
		$('#slideshow').hammer({threshold:100}).bind("swiperight", animatePrev);


		// Store the slide elememts

		var $article = $('#slideshow ol li article'),
			$feature = $('#slideshow ol li feature');

			$slideWrapper.css({background: settings.bgcolor});

		    // Determines how many slides are in the set and adjusts li widths accordingly
			// set the container width to be the # of slides * 100
			$slideol.css('width', slidelength * 100 + '%'); 
			// set the slide width to be a division of 100 percent
			$slideli.css('width', (100 / slidelength) + '%');

			// set slide position to slide 2 (default position)
			$slideol.css('left', -$slideli.width());

			// Fix the Resize Slideshow Issue
			///////////////////////////////////////
			var newW = $slideWrapper.width();

			$(window).on('resize', function(e){
				//store the new window size, and 
				newW = $slideWrapper.width();
				$slideol.css({'left': -newW });
			});

			function animateNext() {
				var tl = new TimelineMax();
					tl.to($slideol, options.speed, {left: -newW*2, ease:options.easing, onComplete:cloneFirst})
			}
			function cloneFirst() {
				$slideol.find('li:first').clone().appendTo($slideol);
				$slideol.find('li:first').remove();
				$slideol.css('left', -newW);
			}

			function cloneLast() {
				$slideol.find('li:last').clone().prependTo($slideol);
				$slideol.find('li:last').remove();
				$slideol.css('left', -newW);
			}

			function animatePrev() {

				var tl = new TimelineMax();
					tl.to($slideol, options.speed, {left: 0, ease:options.easing, onComplete:cloneLast })

			}
			

		$slideWrapper.on('click', 'a', function(e){
			var $this  = e.target;

			  if ($slideol.is(':animated'))
			  {
			      return false;
			  } else {

				switch ($this.id) {
					case 'prevSlide':
						animatePrev();
					break;

					case 'nextSlide':
						animateNext();
					break;
				}
			}
		});


	}//end plugin fn
}(jQuery));