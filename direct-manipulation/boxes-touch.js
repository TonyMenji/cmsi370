var BoxesTouch = {
    
	
	
	/**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
				element.addEventListener("touchstart", BoxesTouch.startCreate, false);
                element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                element.addEventListener("touchend", BoxesTouch.endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", BoxesTouch.startMove, false);
                element.addEventListener("touchend", BoxesTouch.unhighlight, false);
            });
			
    },
	
	/**
	* Starts box creation
	*/
	
	startCreate: function (event) {
		$.each(event.changedTouches, function (index, touch) {
			touch.target.initialX = touch.pageX;
			touch.target.initialY = touch.pageY;
			
			//Create new box
            // JD: Alternatively, you can define this "template" as a standalone
            //     string at the top, then set its attributes via jQuery, e.g.:
            //
            //     ...
            //     TEMP_BOX_TEMPLATE: '<div class="box"></div>';
            //
            //     ...
            //
            //     var tempBox = $(BoxesTouch.TEMP_BOX_TEMPLATE).css({
            //         width: "0px",
            //         height: "0px",
            //         left: touch.pageX + "px",
            //         top: touch.pageY + "px"
            //     });
            //
            //     ...
            //
            //     You may find this approach to be a little more readable and
            //     less error-prone.
            //
			var newtemp = '<div class="box" style="width: 0px; height: 0px; left:' + touch.pageX + 'px; top: ' + touch.pageY + 'px">' +
				'</div>';
			var newbox = newtemp;
			$("#drawing-area").append(newbox);
			$("#drawing-area").addClass("just-started");
			(touch.target.creatingbox) = $("div div:last-child");
			(touch.target.creatingbox).addClass("create-highlight");
			$("#drawing-area").find("div.box").each(function (index, element) {
				element.addEventListener("touchstart", BoxesTouch.startMove, false);
				element.addEventListener("touchend", BoxesTouch.unhighlight, false);
			});
			
		});
		//Eat up the event so that the drawing area does not
		//deal with it.
		event.stopPropagation();
	},
	
				
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    trackDrag: function (event) {
		$("drawing-area").removeClass("just-started");
        $.each(event.changedTouches, function (index, touch) {
			event.preventDefault();
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                // Reposition the object.
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });
				
				
			//Delete Box
            // JD: Functional, but with some drawing area hardcoding.
            //     And you should add a space between your "if" token and
            //     the parenthesized condition.
			if(!((touch.target.movingBox).hasClass("delete-box")) &&
				(touch.pageX - touch.target.deltaX > 512 ||
				 touch.pageY - touch.target.deltaY > 512 ||
				 touch.pageX - touch.target.deltaX < 0 ||
				 touch.pageY - touch.target.deltaY < 0))
				 { // JD: Even with a multiline if condition I would stick the
                   //     opening { on the prior line.  This lets your preserve
                   //     the single-level indenting.
					(touch.target.movingBox).addClass("delete-box delete-highlight");
				}	
			if(((touch.target.movingBox).hasClass("delete-box")) &&
				(touch.pageX - touch.target.deltaX < 512 &&
				 touch.pageY - touch.target.deltaY < 512 &&
				 touch.pageX - touch.target.deltaX > 0 &&
				 touch.pageY - touch.target.deltaY > 0))
				 {
					(touch.target.movingBox).removeClass("delete-box delete-highlight");
				}
			}
			
			//Create Box
            // JD: Watch your naming!!!  Look REALLY CAREFULLY at the line below,
            //     and compare it to the rest of the code that refers to the box
            //     being created.
			if (touch.target.creationbox) {
                // JD: Next, recall that the touch target here is the *drawing area*, not
                //     the individual boxes.  Thus, you need a different scheme for tracking
                //     the box that is being created because there can be more than one
                //     such box.  Hint: All touch objects have a guaranteed-unique and
                //     stable identifier.
                //
                //     Also, same formatting comment here about a space between "if"
                //     and its condition.
				if(touch.pageX < touch.target.initialX) {
					touch.target.creatingbox.offset({
						left: touch.pageX,
					});
					touch.target.creatingbox.width(touch.target.initialX - touch.pageX);
				} else {
					touch.target.creatingbox.offset ({
						left: touch.target.initialX,
					});
					touch.target.creatingbox.width(touch.pageX - touch.target.initialX);
				}
				
				if(touch.pageY < touch.target.initialY) {
					touch.target.creatingbox.offset({
						top: touch.pageY,
					});
					touch.target.creatingbox.height(touch.target.initialY - touch.pageY);
				} else {
					touch.target.creatingbox.offset ({
						top: touch.target.initialY,
					});
					touch.target.creatingbox.height(touch.pageY - touch.target.initialY);
				
				}
            
			}
        });
        
        event.preventDefault();
    },

    /**
     * Concludes a drawing or moving sequence.
     */
    endDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
			
			
			
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }
			if(touch.target.creatingbox) {
				touch.target.creatingbox.removeClass("create-highlight");
				
				touch.target.creatingbox = null;
			}
			
        });
		
    },

    /**
     * Indicates that an element is unhighlighted.
     */
    unhighlight: function () {
        $(this).removeClass("box-highlight");

		if ($(this).hasClass("delete-box")) {
			$(this).remove();
		}
        // JD: Why is this here?  Copy-paste artifact...?
		$(this).removeClass("box-highlight");
    },

    /**
     * Begins a box move sequence.
     */
    startMove: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });
        event.stopPropagation();
    }

	
};