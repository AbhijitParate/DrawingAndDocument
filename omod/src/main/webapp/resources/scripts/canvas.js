/**
 * Created by abhij on 3/7/2017.
 *
 */
// Fabric.js Canvas object
let canvas;

const ERASE = "erase", DRAW = "draw", FILL = 'fill', SELECT = 'select';

let EDITOR_MODE = DRAW;

let CANVAS_CURRENT;
let UNDO_STACK = [];
let REDO_STACK = [];

// Used in object:added and object:modified to control undo and redo stack update
let updateFlag = true;

$(document).ready(function() {
    canvas = window._canvas = new fabric.Canvas('canvas', {
        selection: true,
        // backgroundColor: '#EAEDED',
        preserveObjectStacking: true
    });

    canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), 1.0);

    canvas.freeDrawingBrush.color = 'black';

    let selectState = new SelectState(false, null);

    function SelectState(isSelected, object) {
        this.isFirstClick = isSelected;
        this.object = object;
    }

    canvas.on("object:added", function (e) {
        if(updateFlag) {
            var object = e.target;
            console.log('object:added');
            updateStack();
        }
    });

    canvas.on("object:removed", function (e) {
        if(updateFlag) {
            var object = e.target;
            console.log('object:removed');
            updateStack();
        }
    });

    canvas.on("object:modified", function (event) {
        console.log('object:modified');
        var object = event.target;
        if(updateFlag) {
            updateStack();
        }
    });

    canvas.on("object:selected", function (event) {
        console.log('object:selected');
        var object = event.target;
        console.info(object.type);
        if( EDITOR_MODE === FILL && (object.type === 'rect' || object.type === 'circle' || object.type === 'triangle' || object.type === 'polygon')) {
            object.set('fill' , fillColor);
            updateStack();
        }
    });

    canvas.on("mouse:up", function (event) {
        // console.log('3 event:mouse:up - X: ' + event.e.offsetX + ' Y: ' + event.e.offsetY);
            if(selectState.isFirstClick === true){
                if(canvas.getActiveObject())
                    if(selectState.object.tag === "media" && isEventWithinObject(event.e, selectState.object)) {
                        console.log('object:double-clicked');
                        selectState.object.show();
                        selectState.isFirstClick = false;
                    }
            } else {
                selectState = new SelectState(true, canvas.getActiveObject());
                setTimeout(function(){
                    selectState.isFirstClick = false;
                }, 500);
            }
    });

    canvas.on("mouse:down", function (event) {
        console.log('2 object:mouse:down - X: ' + event.e.offsetX + ' Y: ' + event.e.offsetY);
    });

    function isEventWithinObject(touchEvent, object) {
        console.log("Touch X:" + touchEvent.offsetX + " Y:" + touchEvent.offsetY );
        return touchEvent.offsetX >= object.aCoords.tl.x && touchEvent.offsetX <= object.aCoords.br.x
            && touchEvent.offsetY >= object.aCoords.tl.y && touchEvent.offsetY <= object.aCoords.br.y;
    }

    CANVAS_CURRENT = JSON.stringify(canvas);

});

function State(data) {
    this.data = data;
}

function updateStack() {
    console.log('stack updated');
    UNDO_STACK.push(new State(CANVAS_CURRENT));
    CANVAS_CURRENT = JSON.stringify(canvas);
}

function undo() {
    if(UNDO_STACK.length > 0) {
        console.log("undo");
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
        console.log("not undone");
    }
}

function disableUndoRedo() {
    $("#undo").attr("disabled", true);
    $("#redo").attr("disabled", true);
}

function enableUndoRedo() {
    $("#undo").attr("disabled", false);
    $("#redo").attr("disabled", false);
}

function redo() {
    if(REDO_STACK.length > 0) {
        console.log("redo");
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
        console.log("not redone");
    }
}

function clearCanvas() {
    canvas.clear();
}

// Copy Paste
let copiedObject;
let copiedObjects = [];
function copy(){
    let object;

    if(canvas.getActiveGroup()){
        for(let i = 0; i < canvas.getActiveGroup().objects.length; i++){
            object = canvas.getActiveGroup().objects[i];
            copiedObjects[i] = object;
        }
    } else if(canvas.getActiveObject()){
        object = canvas.getActiveObject();
        copiedObject = object;
    }
}

function paste(){
    let object;
    if(copiedObjects.length > 0){
        for(let i in copiedObjects){
            object = copiedObjects[i];
            object.set("top", object.top+10);
            object.set("left", object.left+10);
            canvas.add(copiedObjects[i]);
        }
    } else if(copiedObject){
        let object = copiedObject;
        object.set("top", object.top+10);
        object.set("left", object.left+10);
        canvas.add(object);
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