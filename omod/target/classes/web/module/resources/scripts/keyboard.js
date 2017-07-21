/**
 * Created by abhij on 3/7/2017.
 *
 */
$(document).ready(function() {

    // var canvasWrapper = $(".upper-canvas");
    // canvasWrapper.tabIndex = 1000;
    document.onkeydown = keyFunction;

});

function keyFunction(event) {
    //event.preventDefault();

    // console.log(event);

    let key;
    if (window.event) {
        key = window.event.keyCode;
    } else {
        key = event.keyCode;
    }

    // console.warn("keyboard keypress event :" + key );
    switch (key) {
        case 27: // Esc
            canvas.isDrawingMode = false;
            break;
        case 46: // Delete
            event.preventDefault();
            deleteObjects();
            break;
        case 8: // Backspace
            event.preventDefault();
            deleteObjects();
            break;
        // Copy (Ctrl+C)
        case 67: // Ctrl+C
            if (event.ctrlKey) {
                event.preventDefault();
                copy();
            }
            break;
        // Paste (Ctrl+V)
        case 86: // Ctrl+V
            if (event.ctrlKey) {
                event.preventDefault();
                paste();
            }
            break;
    }

    canvas.renderAll();
}