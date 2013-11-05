// Big things have small beginnings...

// JD: No Ajax code seen.
$(function () {

    $("#confirm-delete-button").click(function () {
        console.log("Delete confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');
    });

});

// JD: No need for different $(function () { }) blocks here; these can all
//     go under the same one.
$(function () {

    $("#confirm-create-button").click(function () {
        console.log("Create confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#createModal').modal('hide');
    });

});

// JD: Although you did hook up all of the modal buttons, it is the same
//     hookup all around.  It would have been good to see some variety
//     in what these modals did upon confirmation (e.g., delete confirmation
//     could have actually deleted the selected character---you can still
//     do that in a mockup).
$(function () {

    $("#confirm-random-button").click(function () {
        console.log("Randomize confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#randomModal').modal('hide');
    });

});

$(function () {

    $("#confirm-edit-button").click(function () {
        console.log("Edit confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#editModal').modal('hide');
    });

});

$(function () {

    $("#confirm-item-button").click(function () {
        console.log("Spawn confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#itemModal').modal('hide');
    });

});

$(function () {

    $("#confirm-editcharacter-button").click(function () {
        console.log("Edit confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#editcharacterModal').modal('hide');
    });

});