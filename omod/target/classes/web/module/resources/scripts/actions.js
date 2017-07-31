/**
 * Created by abhij on 3/7/2017.
 *
 */
// import {saveAs} from "./libs/FileSaver.min";
let fillColor;

$(document).ready(function() {

    // var FileSaver = require('file-saver');

    let DRAW_COLOR = 'BLACK';

    var PENCIL_SIZE = 10, ERASE_SIZE = 10;

    function enableSelect() {
        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.hoverCursor = 'move';
        canvas.renderAll();
        EDITOR_MODE = SELECT;
    }

    function enablePencil() {
        // console.debug(PENCIL_SIZE);
        canvas.freeDrawingBrush.width = PENCIL_SIZE;
        canvas.freeDrawingBrush.color = DRAW_COLOR;
        canvas.isDrawingMode = true;
        canvas.selection = false;
        canvas.hoverCursor = 'crosshair';
        EDITOR_MODE = DRAW;
    }

    function enableEraser() {
        console.debug(ERASE_SIZE);
        canvas.freeDrawingBrush.width = ERASE_SIZE;
        canvas.freeDrawingBrush.color = 'white';
        canvas.isDrawingMode = true;
        canvas.selection = false;
        canvas.hoverCursor = 'crosshair';
        EDITOR_MODE = ERASE;
    }

//1.Draw
    // 1.Pencil
    $("#pencil").click(function () {
        // console.log(EDITOR_MODE);
        if (EDITOR_MODE !== DRAW) {
            this.classList.add("selected");
            enablePencil();
        } else {
            this.classList.remove("selected");
            enableSelect();
        }
    });

    // 1a.Slider
    let pencil_handle = $("#pencil-handle");
    $("#pencil-size").slider({
        value: 10,
        min: 1,
        max: 99,
        step: 1,
        create: function() {
            pencil_handle.text(
                $(this).slider("value")
            );
        },
        slide: function( event, ui ) {
            pencil_handle.text( ui.value );
        },
        change: function (event, ui) {
            PENCIL_SIZE =  parseInt(ui.value, 10) || 1;
            canvas.freeDrawingBrush.width = PENCIL_SIZE;
            enablePencil();
        }
    });

    // 2.Erase
    $("#erase").click(function () {
        enableEraser();
    });

    let eraser_handle = $("#eraser-handle");
    $("#eraser-size").slider({
        value: 10,
        min: 1,
        max: 99,
        step: 1,
        create: function() {
            eraser_handle.text(
                $(this).slider("value")
            );
        },
        slide: function( event, ui ) {
            eraser_handle.text( ui.value );
        },
        change: function (event, ui) {
            ERASE_SIZE = parseInt(ui.value, 10) || 1;
            canvas.freeDrawingBrush.width = ERASE_SIZE;
            enableEraser();
        }
    });

    // 3.Shapes
    // 3a.Line
    $("#shape-line").click(function() {
        enableSelect();
        let line = new fabric.Line([100, 100, 200, 200], {
            left: 100,
            top: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: DRAW_COLOR,
            strokeWidth: 1
        });
        canvas.add(line);
        canvas.renderAll();
    });

    // 3b.Arrow
    $("#shape-arrow").click(function () {
        enableSelect();
        drawArrow(400,400,200,200);
    });

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
            fill: 'rgba(0,0,0,0)',
            stroke: DRAW_COLOR,
            opacity: 1,
            strokeWidth: 1,
            originX: 'left',
            originY: 'top',
            selectable: true
        });

        canvas.add(arrow);

        canvas.renderAll();
    }

    // 3c. Circle
    $("#shape-circle").click(function () {
        enableSelect();
        let circle=new fabric.Circle({
            left:100,
            top:100,
            radius:100,
            fill: 'rgba(0,0,0,0)',
            stroke: DRAW_COLOR,
            strokeWidth: 1
        });
        canvas.add(circle);
        canvas.renderAll();
    });
    // 3d. Rectangle
    $("#shape-rectangle").click(function () {
        enableSelect();
        let rect = new fabric.Rect({
            width: 100,
            height: 100,
            top: 100,
            left: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: DRAW_COLOR,
            strokeWidth: 1
        });
        canvas.add(rect);
        canvas.renderAll();
    });

    // 3e. Triangle
    $("#shape-triangle").click(function () {
        enableSelect();
        let tri = new fabric.Triangle({
            width: 100,
            height: 100,
            top: 100,
            left: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: DRAW_COLOR,
            strokeWidth: 1
        });
        canvas.add(tri);
        canvas.renderAll();
    });

    // 3f. Polygon
    $("#shape-polygon").click(function () {
        enableSelect();
        let pol = new fabric.Polygon([
            {x: 200, y: 0},
            {x: 250, y: 50},
            {x: 250, y: 100},
            {x: 150, y: 100},
            {x: 150, y: 50}], {
            left: 100,
            top: 100,
            angle: 0,
            fill: 'rgba(0,0,0,0)',
            stroke: DRAW_COLOR,
            strokeWidth: 1
        });
        canvas.add(pol);
        canvas.renderAll();
    });

    // 4.Delete
    $("#delete").click(function () {
        deleteObjects();
    });

    // 5.Text
    $("#text").click(function () {
        enableSelect();
        createDialogForText();
    });

    // 6.Color Picker
    $("#draw-color-picker").spectrum({
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: 'more',
        togglePaletteLessText: 'less',
        color: 'black',
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ],
        change: function (color) {
            DRAW_COLOR = color.toHexString(true);
            canvas.freeDrawingBrush.color = DRAW_COLOR;
        }
    });

    // 6.Color Picker
    $("#fill-color-picker").spectrum({
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: 'more',
        togglePaletteLessText: 'less',
        color: 'black',
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ],
        change: function (color) {
            fillColor = color.toHexString(true);
            canvas.deactivateAllWithDispatch().renderAll();
            canvas.hoverCursor = 'pointer';
            EDITOR_MODE = FILL;
        }
    });

    // 7.Select
    $("#select").click(function () {
        enableSelect();
    });

// 2.Transform
    // 1. Flip Vertical
    $("#flip-vertical").click(function () {
        if(canvas.getActiveObject().get('flipY'))
            canvas.getActiveObject().set('flipY', false);
        else
            canvas.getActiveObject().set('flipY', true);
        canvas.renderAll();
    });
    // 2. Flip Horizontal
    $("#flip-horizontal").click(function () {
        if(canvas.getActiveObject().get('flipX'))
            canvas.getActiveObject().set('flipX', false);
        else
            canvas.getActiveObject().set('flipX', true);
        canvas.renderAll();
    });
    // 3. Rotate Clockwise
    $("#rotate-clock").click(function () {
        rotateObject(90);
    });
    // 4. Rotate counter-clockwise
    $("#rotate-anti-clock").click(function () {
        rotateObject(-90);
    });
    // 5. Crop
    $("#crop").click(function () {
        // todo: Add crop feature
        // console.log(canvas.getActiveObject());
        // console.log(canvas.getActiveGroup());
        if (canvas.getActiveObject() || canvas.getActiveGroup()) {
            let objects = canvas.getObjects();
            for (let i = 0; i < objects.length; i++) {
                if (!objects[i].active) {
                    objects[i].remove();
                    i--;
                }
            }
            canvas.renderAll();
        }
    });
    // 6. Fit
    $("#fit").click(function () {
        console.info("Fit to size");
        let object  = canvas.getActiveObject();
        if( object &&  object.type === 'image') {
            object.setWidth(700);
            object.setHeight(700);
            object.scaleToWidth(700);
            object.scaleToWidth(700);
            object.setTop(50);
            object.setLeft(50);
            canvas.renderAll();
        }
    });

// 3. Position
    $("#pos-top-left").click(function () {
        let activeObject = canvas.getActiveObject();

        let objH, objW;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((canvas.height/4) - objH);
            activeObject.setLeft((canvas.width/4) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

    $("#pos-top").click(function () {
        let activeObject = canvas.getActiveObject();
        let objW, objH;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((canvas.height/4) - objH);
            activeObject.setLeft((canvas.width/2) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

    $("#pos-top-right").click(function () {
        let activeObject = canvas.getActiveObject();

        let objW, objH;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((canvas.height/4) - objH);
            activeObject.setLeft((3*canvas.width/4) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

    $("#pos-left").click(function () {
        let activeObject = canvas.getActiveObject();

        let objH, objW;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((canvas.height/2) - objH);
            activeObject.setLeft((canvas.width/4) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

    $("#pos-center").click(function () {
        let activeObject = canvas.getActiveObject();

        if(activeObject){
            activeObject.center();
            activeObject.setCoords();
        }

        canvas.renderAll();
    });

    $("#pos-right").click(function () {
        let activeObject = canvas.getActiveObject();

        let objH, objW;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((canvas.height/2) - objH);
            activeObject.setLeft((3*canvas.width/4) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

    $("#pos-bottom-left").click(function () {
        let activeObject = canvas.getActiveObject();

        let objH, objW;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((3*canvas.height/4) - objH);
            activeObject.setLeft((canvas.width/4) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

    $("#pos-bottom").click(function () {
        let activeObject = canvas.getActiveObject();
        let objW, objH;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((3*canvas.height/4) - objH);
            activeObject.setLeft((canvas.width/2) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

    $("#pos-bottom-right").click(function () {
        let activeObject = canvas.getActiveObject();

        let objW, objH;
        objW = activeObject.getWidth() / 2;
        objH = activeObject.getHeight() / 2;

        if(activeObject){
            activeObject.setTop((3*canvas.height/4) - objH);
            activeObject.setLeft((3*canvas.width/4) - objW);
            activeObject.setCoords();
            canvas.renderAll();
        }
    });

// 4. Layers
    $("#layer-up").click(function () {
        let object = canvas.getActiveObject();
        canvas.bringForward(object);
    });
    $("#layer-down").click(function () {
        let object = canvas.getActiveObject();
        canvas.sendBackwards(object);
    });

// 5.Edit
    $("#redo").click(function () {
        redo();
    });

    $("#undo").click(function () {
        undo();
    });

    $("#clear").click(function () {
        clearCanvas();
        attachments = [];
        previousAttachments = [];
    });

    $("#hide").click(function () {
        $("#canvasWrapper").toggle("display");
    });

//Zoom
    $("#zoom-in").click(function () {
        if(canvas.getZoom() < 2.0) {
            canvas.setZoom(canvas.getZoom() + 0.1);
        }
    });
    $("#zoom-out").click(function () {
        if(canvas.getZoom() > 1.0) {
            canvas.setZoom(canvas.getZoom() - 0.1);
        }
    });
    $("#zoom-reset").click(function () {
        canvas.setZoom(1.0);
    });

// Panning
    let panX = 0, panY = 0;
    $("#pan-left").click(function () {
        let units = 10 ;
        let delta = new fabric.Point(-units,0);
        canvas.relativePan(delta);
        panX += units;
    });
    $("#pan-up").click(function () {
        let units = 10 ;
        let delta = new fabric.Point(0,-units);
        canvas.relativePan(delta);
        panY += units;
    });
    $("#pan-center").click(function () {
        let delta = new fabric.Point(panX, panY);
        canvas.relativePan(delta);
        panX=0; panY=0;
    });
    $("#pan-right").click(function () {
        let units = 10 ;
        let delta = new fabric.Point(units,0);
        canvas.relativePan(delta);
        panX -= units;
    });
    $("#pan-down").click(function () {
        let units = 10 ;
        let delta = new fabric.Point(0,units);
        canvas.relativePan(delta);
        panY -= units;
    });

//8.Print
    $("#print").click(function () {
        let dataUrl = canvas.toDataURL({
            format: 'png',
            quality: 0.8,
            multiplier: 1
        });
        let windowContent = "<!DOCTYPE html>";
        windowContent += "<html>";
        windowContent += "<head><title>Print canvas</title></head>";
        windowContent += "<body>";
        windowContent += "<img src='" + dataUrl + "' width='800' height='800' />";
        windowContent += "</body>";
        windowContent += "</html>";

        let printWin = window.open();
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
        printWin.focus();
        printWin.onload = function(){
            printWin.print();
        };
        // printWin.close();
    });

//9.Export
    $("#save-pdf").click(function () {
        let image = canvas.toDataURL({
            format: 'png',
            quality: 0.8,
            multiplier: 0.5
        });
        //noinspection JSUnresolvedFunction
        let pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        pdf.addImage(image, 'PNG', 25, 25);

        pdf.save(getTimeStamp() + ".pdf");
    });

    $("#save-jpg").click(function () {
        canvas.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas));
        let image = canvas.toDataURL({format: 'jpeg'});
        canvas.setBackgroundColor('rgba(0, 0, 0, 0)', canvas.renderAll.bind(canvas));
        let imageBlob = dataURItoBlob(image);
        // console.info(imageBlob);
        saveAs(imageBlob, getTimeStamp() + ".jpg", "image/jpeg");
    });

    $("#save-png").click(function () {
        let image = canvas.toDataURL({
            format: 'png',
            quality: 0.8,
            multiplier: 1
        });

        let imageBlob = dataURItoBlob(image);
        // console.info(imageBlob);

        saveAs(imageBlob, getTimeStamp() + ".png", "image/png");
    });

    $("#save-json").click(function () {
        let json = JSON.stringify(canvas);
        let jsonBlob = new Blob([json], {type: 'text/json'});
        saveAs(jsonBlob, getTimeStamp() + ".json", "text/json");
    });

    $("#save-svg").click(function () {
        let svg = canvas.toSVG({
            viewBox: {
                x: 0,
                y: 0,
                width: 800,
                height: 800
            }
        });
        let svgBlob = new Blob([svg], {type: 'image/svg+xml'});
        saveAs(svgBlob, getTimeStamp() + ".svg", "image/svg+xml");
    });

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }
});