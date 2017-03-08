/**
 * Created by abhij on 3/7/2017.
 */
// Fabric.js Canvas object
let canvas;

$(document).ready(function() {
    canvas = window._canvas = new fabric.Canvas('canvas', {
        selection: true,
        // backgroundColor: '#EAEDED',
        preserveObjectStacking: true
    });
});

const ERASE = "erase", DRAW = "draw";

// let FILL_COLOR, BACK_COLOR, STROKE_COLOR;
let DRAW_MODE = DRAW;

let UNDO_STACK = [], REDO_STACK = [], CURRENT_STATE;

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
// todo: check if more anc be added to this.. https://jsfiddle.net/d29u79vn/
function drawArrow(fromx, fromy, tox, toy) {

    var angle = Math.atan2(toy - fromy, tox - fromx);

    var headlen = 10;  // arrow head size

    // bring the line end back some to account for arrow head.
    tox = tox - (headlen) * Math.cos(angle);
    toy = toy - (headlen) * Math.sin(angle);

    // calculate the points.
    var points = [
        {
            x: fromx,  // start point
            y: fromy
        }, {
            x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
            y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
        },{
            x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
            y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
        }, {
            x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
            y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
        },{
            x: tox + (headlen) * Math.cos(angle),  // tip
            y: toy + (headlen) * Math.sin(angle)
        }, {
            x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
            y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
        }, {
            x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
            y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
        }, {
            x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
            y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
        },{
            x: fromx,
            y: fromy
        }
    ];

    var arrow = new fabric.Polyline(points, {
        fill: 'white',
        stroke: 'black',
        opacity: 1,
        strokeWidth: 2,
        originX: 'left',
        originY: 'top',
        selectable: true
    });

    canvas.add(arrow);

    canvas.renderAll();
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