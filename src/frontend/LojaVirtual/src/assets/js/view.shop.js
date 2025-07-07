/*
Name: 			View - Shop
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.2
*/

(function($) {

	'use strict';

	/*
	* Quantity
	*/
    $( document ).on('click', '.quantity .plus',function(){
        var $qty=$(this).parents('.quantity').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });

    $( document ).on('click', '.quantity .minus',function(){
        var $qty=$(this).parents('.quantity').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });

    /*
    * Image Gallery Zoom
    */
    if($.fn.elevateZoom) {
        if( $('[data-zoom-image]').get(0) ) {
            $('[data-zoom-image]').each(function(){
                var $this = $(this);

                $this.elevateZoom({
                    responsive: true,
                    zoomWindowFadeIn: 350,
                    zoomWindowFadeOut: 200,
                    borderSize: 0,
                    zoomContainer: $this.parent(),
                    zoomType: 'inner',
                    cursor: 'grab'
                });
            });
        }
    }

    /*
    * Quick View Lightbox/Popup With Ajax
    */
 
}).apply(this, [jQuery]);