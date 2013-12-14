$(function () {
    $(".swivel-this.character").swivel({
		values: {
			front: "character",
			back: "character description"
		},

        change: function (oldAngle, newAngle) {
            console.log("Swiveled from " + oldAngle + " to " + newAngle);
        }
    });
		
});