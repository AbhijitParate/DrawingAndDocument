/**
 * Created by abhij on 3/7/2017.
 */
$(document).ready(function() {

//1.Draw
    // 1.Pencil
    $("#pencil").click(function () {
        canvas.isDrawingMode = true;
        DRAW_MODE = DRAW;
        canvas.freeDrawingBrush.color = 'black';
    });
    // 1a.Slider
    let handle = $("#custom-handle");
    $("#size").slider({
        value: 10,
        min: 1,
        max: 99,
        step: 1,
        create: function() {
            handle.text(
                $(this).slider("value")
            );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
        },
        change: function (event, ui) {
            canvas.freeDrawingBrush.width = parseInt(ui.value, 10) || 1;
        }
    });
    // 2.Erase
    $("#erase").click(function () {
        canvas.isDrawingMode = true;
        DRAW_MODE = ERASE;
        canvas.freeDrawingBrush.color = 'white';
    });

    // 3.Shapes
    // 3a.Line
    $("#shape-line").click(function() {
        let line = new fabric.Line([100, 100, 200, 200], {
            left: 100,
            top: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1
        });
        canvas.add(line);
        canvas.renderAll();
    });

    // 3b.Arrow
    $("#shape-arrow").click(function () {
        drawArrow(400,400,200,200);
    });

    // 3c. Circle
    $("#shape-circle").click(function () {
        let circle=new fabric.Circle({
            left:100,
            top:100,
            radius:100,
            fill: 'rgba(0,0,0,0)',
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1
        });
        canvas.add(circle);
        canvas.renderAll();
    });
    // 3d. Rectangle
    $("#shape-rectangle").click(function () {
        let rect = new fabric.Rect({
            width: 100,
            height: 100,
            top: 100,
            left: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1
        });
        canvas.add(rect);
        canvas.renderAll();
    });

    // 3e. Triangle
    $("#shape-triangle").click(function () {
        let tri = new fabric.Triangle({
            width: 100,
            height: 100,
            top: 100,
            left: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1
        });
        canvas.add(tri);
        canvas.renderAll();
    });

    // 3f. Polygon
    $("#shape-polygon").click(function () {
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
            stroke: 'rgba(0,0,0,1)',
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
        let text = new fabric.IText('Double click to type here...', {
            fontFamily: 'arial black',
            left: 100,
            top: 100,
        });
        canvas.add(text);
        canvas.renderAll();
    });

    // 6.Color Picker
    $("#color-picker").spectrum({
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
            canvas.freeDrawingBrush.color = color;
        }
    });

    // 7.Select
    $("#select").click(function () {
        canvas.isDrawingMode = false;
        canvas.selection = true;
    });

// 2.Transform
    // 1. Flip Vertical
    $("#flip-vertical").click(function () {
        if(canvas.getActiveObject().get('flipX'))
            canvas.getActiveObject().set('flipX', false);
        else
            canvas.getActiveObject().set('flipX', true);
        canvas.renderAll();
    });
    // 2. Flip Horizontal
    $("#flip-horizontal").click(function () {
        if(canvas.getActiveObject().get('flipY'))
            canvas.getActiveObject().set('flipY', false);
        else
            canvas.getActiveObject().set('flipY', true);
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

    });
    // 6. Fit
    $("#fit").click(function () {

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
    });
    let canvasHiddenFlag = false;
    $("#hide").click(function () {

        if(canvasHiddenFlag === true){
            canvas.interactive = true;
            // canvas.getObjects().forEach(function(o) {
            //     o.selectable = true;
            // });
            // $("#canvas").show();
            canvasHiddenFlag = false;
        } else {
            canvas.interactive = false;
            // canvas.getObjects().forEach(function(o) {
            //     o.selectable = false;
            // });
            // $("#canvas").hide();
            canvasHiddenFlag = true;
        }
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
            format: 'jpeg',
            quality: 0.8,
            multiplier: 0.4
        });
        let windowContent = '<!DOCTYPE html>';
        windowContent += '<html>';
        windowContent += '<head><title>Print canvas</title></head>';
        windowContent += '<body>';
        windowContent += '<img src="' + dataUrl + '">';
        windowContent += '</body>';
        windowContent += '</html>';
        let printWin = window.open('','','width=1024,height=720');
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        printWin.close();
    });

//9.Export
    $("#save-pdf").click(function () {
        let imgData = canvas.toDataURL({
            format: 'jpeg',
            quality: 0.8,
            multiplier: 1
        });
        //noinspection JSUnresolvedFunction
        let pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        let date = new Date();
        let timeStamp = date.toDateString();
        // pdf.autoPrint();
        pdf.save(timeStamp + ".pdf");
    });

    $("#save-jpg").click(function () {
        let image = canvas.toDataURL({
            format: 'jpeg',
            quality: 0.8,
            multiplier: 1
        });
        let link = document.createElement("a");
        let date = new Date();
        let timeStamp = date.toDateString();
        link.download = timeStamp + ".jpg";
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    $("#save-png").click(function () {
        let image = canvas.toDataURL({
            format: 'png',
            quality: 0.8,
            multiplier: 1
        });
        let link = document.createElement("a");
        let date = new Date();
        let timeStamp = date.toDateString();
        link.download = timeStamp + ".png";
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});