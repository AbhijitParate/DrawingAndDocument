/**
 * Created by abhijit on 3/7/2017.
 *
 */
// Fabric.js Canvas object
let canvas;

const ERASE = "erase", DRAW = "draw", FILL = 'fill', SELECT = 'select';

let EDITOR_MODE;

let CANVAS_CURRENT;
let UNDO_STACK = [];
let REDO_STACK = [];

// Used in object:added and object:modified to control undo and redo stack update
let updateFlag = true;

$(document).ready(function() {

    canvas = window._canvas = new fabric.Canvas('canvas', {
        selection: true,
        preserveObjectStacking: true
    });

    fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: "grey",
        cornerSize: 12,
        padding: 2
    });

    let selectState = new SelectState(false, null);

    function SelectState(isSelected, object) {
        this.isFirstClick = isSelected;
        this.object = object;
    }

    canvas.on("object:added", function (e) {
        if(updateFlag) {
            var object = e.target;
            // console.log('object:added');
            updateStack();
        }
    });

    canvas.on("object:removed", function (e) {
        if(updateFlag) {
            var object = e.target;
            // console.log('object:removed');
            updateStack();
        }
    });

    canvas.on("object:modified", function (event) {
        // console.log('object:modified');
        var object = event.target;
        if(updateFlag) {
            updateStack();
        }
    });

    canvas.on("object:selected", function (event) {
        // console.log('object:selected');
        var object = event.target;
        // console.info(object.type);
        // if( EDITOR_MODE === FILL
        //     && (object.type === "rect"
        //         || object.type === "circle"
        //         || object.type === "triangle"
        //         || object.type === "polygon")) {
        //     object.set("fill" , fillColor);
        //     updateStack();
        // }
    });

    canvas.on("mouse:up", function (event) {
        // // console.log('3 event:mouse:up - X: ' + event.e.offsetX + ' Y: ' + event.e.offsetY);
            if(selectState.isFirstClick === true){
                if(canvas.getActiveObject())
                    if(selectState.object && selectState.object.tag && selectState.object.tag === "media" && isEventWithinObject(event.e, selectState.object)) {
                        // console.log('object:double-clicked');
                        selectState.object.show();
                        selectState.isFirstClick = false;
                    } else if (selectState.object && selectState.object.type === "text" && isEventWithinObject(event.e, selectState.object)){
                        // console.info("Text double clicked.");
                        createDialogForText(selectState.object);
                    }
            } else {
                selectState = new SelectState(true, canvas.getActiveObject());
                setTimeout(function(){
                    selectState.isFirstClick = false;
                }, 500);
            }
    });

    var timeout;

    function ping() {
        // console.log("pinging....");
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            // console.log("PING");
            $.ajax({
                url : '../ws/rest/v1/docsanddrawing/ping',
                type : "GET",
                dataType:"json",
                success : function(data) {
                    // console.log(data.result);
                },
                error : function(request, error) {
                    // console.log("Request: "+JSON.stringify(request));
                }
            });
        }, 10 * 1000);
    }

    canvas.on("mouse:down", function (event) {
        // console.log('2 object:mouse:down - X: ' + event.e.offsetX + ' Y: ' + event.e.offsetY);
        ping();
    });

    function isEventWithinObject(touchEvent, object) {
        // console.log("Touch X:" + touchEvent.offsetX + " Y:" + touchEvent.offsetY );
        return touchEvent.offsetX >= object.aCoords.tl.x && touchEvent.offsetX <= object.aCoords.br.x
            && touchEvent.offsetY >= object.aCoords.tl.y && touchEvent.offsetY <= object.aCoords.br.y;
    }

    CANVAS_CURRENT = JSON.stringify(canvas);

});

function createDialogForText(object) {
    // console.info(object);
    let dialog = $("<div/>");
    dialog.attr("title", "Annotation");

    let wrapperDiv = $("<div />").css({
        margin:'5px',
    });

    let noteTextArea = $("<textarea />");
    noteTextArea.css({"height":"200", "width":"400", "float":"left","margin-top": "10px"});
    noteTextArea.attr("title","Annotation");
    noteTextArea.appendTo(wrapperDiv);

    object?noteTextArea.val(object.text):false;

    var attachBtn, clearBtn, uploadBtn;

    let validate = function () {
        if(noteTextArea.val() !== ""){
            attachBtn.button("enable");
            clearBtn.button("enable");
        } else {
            attachBtn.button("disable");
            clearBtn.button("disable");
        }
    };

    noteTextArea.on("change keyup paste", validate);

    wrapperDiv.appendTo(dialog);

    dialog.dialog({
        modal:true,
        resizable: true,
        position: {
            of: window,
            at: "center center",
            my: "center center"
        },
        height: "auto",
        width: "460",
        open: function () {
            document.onkeydown = null;
            attachBtn = $(".ui-dialog-buttonpane button:contains('Add')");
            clearBtn = $(".ui-dialog-buttonpane button:contains('Clear')");
            uploadBtn = $(".ui-dialog-buttonpane button:contains('Upload')");
            !object ? attachBtn.button("disable") : false;
            !object ? clearBtn.button("disable") : false;
        },
        close: function () {
            $(this).dialog("destroy");
            document.onkeydown = keyFunction;
        },
        autoOpen: false,
        buttons: {
            "Clear": function () {
                // console.info("Retry clicked");
                noteTextArea.val("");
                attachBtn.button("disable");
                clearBtn.button("disable");
            },
            "Add": function () {
                // console.info("Attach clicked");
                // console.info(noteTextArea.val().replace(/\n/g," "));
                canvas.remove(object);
                let text = new fabric.Text(noteTextArea.val(), {
                    fontFamily: "sans-serif",
                    textAlign: "left",
                    left: object?object.left:100,
                    top: object?object.top:100,
                    fill: "black",
                    charSpacing : 0
                });
                canvas.add(text);
                canvas.renderAll();
                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            },
        }
    });
    dialog.dialog("open");
}

function State(data) {
    this.data = data;
}

function updateStack() {
    // console.log('stack updated');
    UNDO_STACK.push(new State(CANVAS_CURRENT));
    CANVAS_CURRENT = JSON.stringify(canvas);
}

function disableUndoRedo() {
    $("#undo").attr("disabled", true);
    $("#redo").attr("disabled", true);
}

function enableUndoRedo() {
    $("#undo").attr("disabled", false);
    $("#redo").attr("disabled", false);
}

function undo() {
    if(UNDO_STACK.length > 0) {
        // console.log("undo");
        updateFlag = false;
        disableUndoRedo();
        canvas.clear().renderAll();
        REDO_STACK.push(new State(CANVAS_CURRENT));
        let state = UNDO_STACK.pop();
        CANVAS_CURRENT = state.data;
        canvas.loadFromJSON(CANVAS_CURRENT, function onLoad() {
            canvas.renderAll();
            updateFlag = true;
            enableUndoRedo();
        });

    } else {
        // console.log("not undone");
    }
}

function redo() {
    if(REDO_STACK.length > 0) {
        // console.log("redo");
        updateFlag = false;
        disableUndoRedo();
        canvas.clear().renderAll();
        UNDO_STACK.push(new State(CANVAS_CURRENT));
        let state = REDO_STACK.pop();
        CANVAS_CURRENT = state.data;
        canvas.loadFromJSON(CANVAS_CURRENT, function onLoad() {
            canvas.renderAll();
            updateFlag = true;
            enableUndoRedo();
        });
    } else {
        // console.log("not redone");
    }
}

function clearCanvas() {
    canvas.clear();
}

// Copy Paste
var copiedObjects = [];
function copy(){
    // if(canvas.getActiveGroup()){
    //     console.log(canvas.getActiveGroup());
    //     for(let i = 0; i < canvas.getActiveGroup()._objects.length; i++){
    //         copiedObjects[i] = fabric.util.object.clone(canvas.getActiveGroup()._objects[i]);
    //     }
    // } else
    if(canvas.getActiveObject()){
        copiedObjects = [];
        copiedObjects[0] = fabric.util.object.clone(canvas.getActiveObject());
    }
}

function paste(){
    if(copiedObjects.length > 0){
        canvas.discardActiveObject();
        for(let i = 0; i < copiedObjects.length; i++){
            let object = copiedObjects[i];
            object.set("top", object.top+10);
            object.set("left", object.left+10);
            canvas.add(fabric.util.object.clone(copiedObjects[i]));
        }
    }
    canvas.renderAll();
}

function deleteObjects() {
    let activeGroup = canvas.getActiveGroup();
    let activeObject = canvas.getActiveObject();

    if(activeObject){
        activeObject.remove();
    } else if(activeGroup) {
        let objectsInGroup = activeGroup.getObjects();
        canvas.discardActiveGroup();
        objectsInGroup.forEach(function(object) {
            canvas.remove(object);
        });
    }
}

function rotateObject(angleOffset) {
    let obj = canvas.getActiveObject(),
        resetOrigin = false;

    if (!obj) return;

    let angle = obj.getAngle() + angleOffset;

    if ((obj.originX !== 'center' || obj.originY !== 'center') && obj.centeredRotation) {
        obj.setOriginToCenter && obj.setOriginToCenter();
        resetOrigin = true;
    }

    angle = angle > 360 ? 90 : angle < 0 ? 270 : angle;

    obj.setAngle(angle).setCoords();

    if (resetOrigin) {
        obj.setCenterToOrigin && obj.setCenterToOrigin();
    }

    canvas.renderAll();
}

function getTimeStamp() {
    let currentDate = new Date();
    return currentDate.getDate() + "-"
        + (currentDate.getMonth()+1) + "-"
        + currentDate.getFullYear() + "_"
        + currentDate.getHours() + "_"
        + currentDate.getMinutes() + "_"
        + currentDate.getSeconds();
}