/**
 * Created by abhij on 3/7/2017.
 *
 */
$(document).ready(function() {

    // document.onkeydown = onKeyDownHandler;

    /**
     * Handles various key press invents on canvas
     * includes Esc, Delete, Backspace, Arrow keys and Ctrl + C and Ctrl + v
     * @param event key press event
     */
    function onKeyDownHandler(event) {
        //event.preventDefault();

        let key;
        if (window.event) {
            key = window.event.keyCode;
        } else {
            key = event.keyCode;
        }

        let object = canvas.getActiveObject();
        if(object) {
            let left = object.getLeft();
            let top = object.getTop();
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
            // case 8: // Backspace
            //     deleteObjects();
            //     break;
            case 37: // left
                object.set('left', left - 1);
                break;
            case 39: // right
                object.set('left', left + 1);
                break;
            case 38: // up
                object.set('top', top-1);
                break;
            case 40: // down
                object.set('top', top+1);
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
            default:
                // TODO
                break;
        }

        canvas.renderAll();
    }

});