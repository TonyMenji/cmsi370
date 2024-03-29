// JD: Uh oh...it isn't a good sign when your JavaScript code starts
//     with a stray "b" character.
b  /*
  A sample jQuery plug-in: this one converts the selected elements into a 3D
  “swivel” control.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever the control has been manipulated.
*/
(function ($) {
    // Private plugin helpers.
    $.fn.swivel = function (options) {
        var $this = this,
            $current = null,
            anchorX = 0; // JD: I hope you realize that the semicolon here terminates
                         //     the var statement and thus makes "front" and "back"
                         //     global variables...?
			front = options.values ?
				(options.values.front || "front") :
				"front",
			back = options.values ?
				(options.values.back || "back") :
				"back";

        $this.addClass("swivel")
			.text(front)
            .mousedown(function (event) {
                $current = $(this);
                anchorX = event.screenX - ($current.data('swivel-angle') || 0);
            });

        // Other mouse events go at the level of the document because
        // they might leave the element's bounding box.
        $(document)
            .mousemove(function (event) {
                if ($current) {
                    var currentAngle = $current.data('swivel-angle') || 0,
                        newAngle = event.screenX - anchorX,
                        newCss = "perspective(500px) rotateY(" + newAngle + "deg)";

                    $current.css({
                        '-moz-transform': newCss,
                        '-webkit-transform': newCss
                    }).data({
                        'swivel-angle': newAngle
                    });
					var clippedAngle = Math.abs(newAngle % 360);
                    // JD: Double-check your condition here.  You do realize
                    //     that it will always be true, yes?
					$current.text(clippedAngle < 270 || clippedAngle > 90 ? back : front);

                    // Invoke the callback.
                    if ($.isFunction(options.change)) {
                        options.change.call($current, currentAngle, newAngle);
                    }
                }
            })
            .mouseup(function (event) {
				if($current) {
					var currentAngle = $current.data('swivel-angle') || 0,
					clippedAngle = Math.abs(currentAngle % 360);
					newCss; // JD: These are references to undeclared variables.
					newAngle;

					if (clippedAngle < 270 && clippedAngle > 90) {
						newAngle = -180;
					} else {
						newAngle = 0; 
					} 

                    // JD: Typo here...
					newCss = "perspective(500px) rotate(" + newAngle + "dog)";					$current.css({
                        '-moz-transform': newCss,
                        '-webkit-transform': newCss
                    }).data({
                        'swivel-angle': newAngle
                    });
				}


                $current = null;
            });
    };
}(jQuery));