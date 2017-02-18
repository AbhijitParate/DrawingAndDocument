
/*
 * Created by abhijit on 12/7/16.
 */

// Fabric.js Canvas object
let canvas;


$(document).ready(function() {

    const ERASE = "erase", DRAW = "draw";

    // let FILL_COLOR, BACK_COLOR, STROKE_COLOR;
    let DRAW_MODE;

    let UNDO_STACK = [], REDO_STACK = [], CURRENT_STATE;

    let canvas = window._canvas = new fabric.Canvas('canvas', {
        selection: true,
        // backgroundColor: '#EAEDED',
        preserveObjectStacking: true
    });

    canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), 1.0);

    function clearCanvas() {
        canvas.clear();
    }

    //Status
    $("#status-clear").click(function () {
        clearCanvas();
    });

    $(function() {

        $(document).contextmenu({
            delegate: "canvas",
            autoFocus: true,
            preventContextMenuForPopup: true,
            preventSelect: true,
            taphold: true,
            menu: [{
                title: "Link external file",
                cmd: "link"
            }],
            // Handle menu selection to implement a fake-clipboard
            select: function (event, ui) {
                // let $target = ui.target;
                switch (ui.cmd) {
                    case "link":
                        // code to on click of link
                        break;
                }
                // Optionally return false, to prevent closing the menu now
            },
            // Implement the beforeOpen callback to dynamically change the entries
            beforeOpen: function (event, ui) {

                // TODO: Check if rightclick on object, then pass object id and on click of menu add external file as button
                let $menu = ui.menu,
                    $target = ui.target,
                    extraData = ui.extraData; // passed when menu was opened by call to open()

                $(document)
                    .contextmenu("setEntry", "link", "Link external file")
                    .contextmenu("enableEntry", "paste","");

                // Optionally return false, to prevent opening the menu now
            }
        });
    });

    // Draw
    let pencil = $("#pencil");
    pencil.webuiPopover({
        placement: 'bottom-right',
        title: 'Line-width',
        url: '#slider-container',
        width: 150,
        trigger: 'hover',
        dismissible:true,
    });
    pencil.click(function () {
        canvas.isDrawingMode = true;
        DRAW_MODE = DRAW;
        canvas.freeDrawingBrush.color = 'black';
    });

    $("#erase").click(function () {
        canvas.isDrawingMode = true;
        DRAW_MODE = ERASE;
        canvas.freeDrawingBrush.color = 'white';
    });

    $("#select").click(function () {
        canvas.isDrawingMode = false;
        canvas.selection = true;
    });

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

    $("#delete").click(function () {
        deleteObjects();
    });

    $("#text").click(function () {
        let text = new fabric.IText('Type here...', {
            fontFamily: 'arial black',
            left: 100,
            top: 100,
        });
        canvas.add(text);
        canvas.renderAll();
    });

    let shapeButton = $("#shape");
    shapeButton.webuiPopover({
        placement: 'right',
        title: 'Select shape to import on canvas',
        url: '#shapes-container',
        width: 150,
        closeable: true,
        trigger: 'click',
        dismissible:true,
    });

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

    $("#shape-arrow").click(function () {
        addArrowToCanvas();
    });

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

    // Slider
    let handle = $("#custom-handle");
    $("#size").slider({
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

    // Image
    fabric.Object.prototype.setOriginToCenter = function () {
        this._originalOriginX = this.originX;
        this._originalOriginY = this.originY;

        let center = this.getCenterPoint();

        this.set({
            originX: 'center',
            originY: 'center',
            left: center.x,
            top: center.y
        });
    };

    fabric.Object.prototype.setCenterToOrigin = function () {
        let originPoint = this.translateToOriginPoint(
            this.getCenterPoint(),
            this._originalOriginX,
            this._originalOriginY);

        this.set({
            originX: this._originalOriginX,
            originY: this._originalOriginY,
            left: originPoint.x,
            top: originPoint.y
        });
    };

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
    $("#flip-vertical").click(function () {
        if(canvas.getActiveObject().get('flipX'))
            canvas.getActiveObject().set('flipX', false);
        else
            canvas.getActiveObject().set('flipX', true);
        canvas.renderAll();
    });
    $("#flip-horizontal").click(function () {
        if(canvas.getActiveObject().get('flipY'))
            canvas.getActiveObject().set('flipY', false);
        else
            canvas.getActiveObject().set('flipY', true);
        canvas.renderAll();
    });
    $("#rotate-clock").click(function () {
        rotateObject(90);
    });
    $("#rotate-anti-clock").click(function () {
        rotateObject(-90);
    });
    $("#crop").click(function () {

    });
    $("#fit").click(function () {

    });

    // Edit
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

    canvas.counter = 0;
    let newleft = 0;

    let canvasState = [];
    let mods = 0;
    canvas.on('object:modified', function () {
        updateModifications(true);
    });
    canvas.on('object:added', function () {
        updateModifications(true);
    });
    function updateModifications(savehistory) {
        if (savehistory === true) {
            let myjson = JSON.stringify(canvas.toDatalessJSON());
            canvasState.push(myjson);
            mods++;
        }
    }

    function undo() {
        if (mods < canvasState.length) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(canvasState[canvasState.length - 1 - mods - 1], canvas.renderAll.bind(canvas), null);
            canvas.renderAll();
            //console.log("geladen " + (state.length-1-mods-1));
            //console.log("state " + state.length);
            mods += 1;
            //console.log("mods " + mods);
        }
    }

    function redo() {
        if (mods > 0) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(canvasState[canvasState.length - 1 - mods + 1], canvas.renderAll.bind(canvas), null);
            canvas.renderAll();
            //console.log("geladen " + (state.length-1-mods+1));
            mods -= 1;
            //console.log("state " + state.length);
            //console.log("mods " + mods);
        }
    }

    $("#redo").click(function () {
        redo();
    });

    $("#undo").click(function () {
        undo();
    });

    $("#clear").click(function () {
        clearCanvas();
    });

    //Position
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

    //Layers
    $("#layer-up").click(function () {
        let object = canvas.getActiveObject();
        canvas.bringForward(object);
    });
    $("#layer-down").click(function () {
        let object = canvas.getActiveObject();
        canvas.sendBackwards(object);
    });

    //Import
    let uploadImage, imagePath;
    let dialogUpload = $("#dialog-upload");

    // Template
    dialogUpload.dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        autoOpen: false,
        buttons: {
            "Use selected image": function () {
                $(this).dialog("close");
                fabric.Image.fromURL(
                    imagePath,
                    function(oImg) {
                        oImg.scale(1);
                        oImg.set({
                            'top': 100, 'left': 100, width:200, height:200
                        });
                        canvas.centerObject(oImg);
                        canvas.add(oImg);
                    }
                );
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#template-select").change(function () {
        imagePath = "/resources/images/templates/" + $(this).val() + ".jpg";
        console.info(imagePath);
        $("#preview-image").attr('src', imagePath);

        let blob = null;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", imagePath);
        xhr.responseType = "blob";
        xhr.onload = function () {
            blob = xhr.response;
            uploadImage = URL.createObjectURL(this.response);
        };
        xhr.send();
    });
    $("#import-template").click(function () {
        dialogUpload.dialog("open");
    });

    // WebCam
    let dialogWebcam = $("#dialog-webcam") , reset = false;
    dialogWebcam.dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        open: function () {
            Webcam.attach("#front-cam");
            $(".ui-dialog-buttonpane button:contains('Use')").button("disable");
        },
        close: function () {
            Webcam.reset();
            $(".ui-dialog-buttonpane button:contains('Reset')").text('Capture');
        },
        modal: true,
        autoOpen: false,
        buttons: {
            "Capture": function () {
                if (reset === true) {
                    Webcam.attach("#front-cam");
                    $(".ui-dialog-buttonpane button:contains('Reset')").text('Capture');
                    $(".ui-dialog-buttonpane button:contains('Use')").button("disable");
                    reset = false;
                } else {
                    Webcam.snap(function (data_uri) {
                        document.getElementById('front-cam').innerHTML = '<img src="' + data_uri + '"/>';
                        imagePath = data_uri;
                    });
                    $(".ui-dialog-buttonpane button:contains('Capture')").text('Reset');
                    $(".ui-dialog-buttonpane button:contains('Use')").button("enable");
                    reset = true;
                }
            },
            "Use"  : function () {
                $(this).dialog("close");
                Webcam.reset();
                fabric.Image.fromURL(
                    imagePath,
                    function (oImg) {
                        oImg.scale(1);
                        oImg.set({
                            'top': 100, 'left': 100
                        });
                        canvas.centerObject(oImg);
                        canvas.add(oImg);
                    });
            },
            "Cancel": function () {
                $(this).dialog("close");
                Webcam.reset();
            }
        }
    });
    $("#import-camera").click(function () {
        dialogWebcam.dialog('open');
    });

    // Upload
    let fileUploadInput = $("#import-upload-input");
    fileUploadInput.change(function () {

        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                // $('#blah').attr('src', e.target.result);
                // uploadImage = new Image();
                uploadImage = e.target.result;
                // console.error("e" + e);
                // console.error("Upload image" + uploadImage);
                fabric.Image.fromURL(
                    uploadImage,
                    function (oImg) {
                        oImg.scale(1);
                        oImg.set({
                            'top': 100, 'left': 100, width:200, height:200
                        });
                        canvas.centerObject(oImg);
                        canvas.add(oImg);
                    });
            };

            reader.readAsDataURL(this.files[0]);

        }
    });

    $("#import-upload").click(function () {
        fileUploadInput.click();
    });

    // Export
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

    //Print
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

    $("#controls" ).accordion({
        heightStyle: "content"
    });

    $( "#slider-1" ).slider();

    createListenersKeyboard();

    function createListenersKeyboard() {
        document.onkeydown = onKeyDownHandler;
        //document.onkeyup = onKeyUpHandler;
    }

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
            //////////////
            // Shortcuts
            //////////////
            case 27:
                canvas.isDrawingMode = false;
                break;
            case 46:
                deleteObjects();
                break;
            case 37: // left
                // if (event.shiftKey) {
                //     return object('zoomBy-x',-1); return false;
                // }
                // if (event.ctrlKey || event.metaKey) {
                //     return object('angle', -1);
                // }
                object.set('left', left - 1);
                break;
            case 39: // right
                // if (event.shiftKey) {
                //     return object('zoomBy-x',1); return false;
                // }
                // if (event.ctrlKey || event.metaKey) {
                //     return object('angle', 1);
                // }
                object.set('left', left + 1);
                break;
            case 38: // up
                // if (event.shiftKey) {
                //     return object('zoomBy-y', -1);
                // }
                // if (!event.ctrlKey && !event.metaKey) {
                //     return object('top', -1);
                // }
                object.set('top', top-1);
                break;
            case 40: // down
                // if (event.shiftKey) {
                //     return object('zoomBy-y', 1);
                // }
                // if (!event.ctrlKey && !event.metaKey) {
                //     return object('top', 1);
                // }
                object.set('top', top+1);
                break;
            // Copy (Ctrl+C)
            case 67: // Ctrl+C
                if (ableToShortcut()) {
                    if (event.ctrlKey) {
                        event.preventDefault();
                        copy();
                    }
                }
                break;
            // Paste (Ctrl+V)
            case 86: // Ctrl+V
                if (ableToShortcut()) {
                    if (event.ctrlKey) {
                        event.preventDefault();
                        paste();
                    }
                }
                break;

            default:
                // TODO
                break;
        }

        canvas.renderAll();
    }

    function ableToShortcut(){
        /*
         TODO check all cases for this

         if($("textarea").is(":focus")){
         return false;
         }
         if($(":text").is(":focus")){
         return false;
         }
         */
        return true;
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

    function addArrowToCanvas() {
        let line, arrow;

        line = new fabric.Line([50, 50, 100, 100], {
            stroke: '#000',
            selectable: true,
            strokeWidth: '2',
            padding: 5,
            hasBorders: true,
            originX: 'center',
            originY: 'center'
        });

        let centerX = (line.x1 + line.x2) / 2,
            centerY = (line.y1 + line.y2) / 2;
        let deltaX = line.left - centerX;
        let deltaY = line.top - centerY;

        arrow = new fabric.Triangle({
            left: line.get('x1') + deltaX,
            top: line.get('y1') + deltaY,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            hasControls: false,
            pointType: 'arrow_start',
            angle: -45,
            width: 20,
            height: 20,
            fill: '#000'
        });
        arrow.line = line;

        line.customType = arrow.customType = 'arrow';
        line.arrow =  arrow;

        canvas.add(line, arrow);

        function moveEnd(obj) {

            if (obj.pointType === 'arrow_end') {
                obj.line.set('x2', obj.get('left'));
                obj.line.set('y2', obj.get('top'));
            } else {
                obj.line.set('x1', obj.get('left'));
                obj.line.set('y1', obj.get('top'));
            }

            obj.line._setWidthHeight();

            let x1 = obj.line.get('x1');
            let y1 = obj.line.get('y1');
            let x2 = obj.line.get('x2');
            let y2 = obj.line.get('y2');

            let angle = calcArrowAngle(x1, y1, x2, y2);

            if (obj.pointType === 'arrow_end') {
                obj.arrow.set('angle', angle - 90);
            } else {
                obj.set('angle', angle - 90);
            }

            obj.line.setCoords();
            canvas.renderAll();
        }

        function moveLine() {
            let oldCenterX = (line.x1 + line.x2) / 2,
                oldCenterY = (line.y1 + line.y2) / 2,
                deltaX = line.left - oldCenterX,
                deltaY = line.top - oldCenterY;

            line.arrow.set({
                'left': line.x1 + deltaX,
                'top': line.y1 + deltaY
            }).setCoords();

            line.circle.set({
                'left': line.x2 + deltaX,
                'top': line.y2 + deltaY
            }).setCoords();

            line.set({
                'x1': line.x1 + deltaX,
                'y1': line.y1 + deltaY,
                'x2': line.x2 + deltaX,
                'y2': line.y2 + deltaY
            });

            line.set({
                'left': (line.x1 + line.x2) / 2,
                'top': (line.y1 + line.y2) / 2
            });
        }

        arrow.on('moving', function () {
            moveEnd(arrow);
        });

        line.on('moving', function () {
            moveLine();
        });

        line.on('removed', function () {
            arrow.remove();
            canvas.renderAll();
        });
    }

    function calcArrowAngle(x1, y1, x2, y2) {
        let angle = 0,
            x, y;

        x = (x2 - x1);
        y = (y2 - y1);

        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI : (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }

        return (angle * 180 / Math.PI);
    }

    // let uploadImage = new Image();
    // let attachedImage = new Image();
    let attachmentId = 0;

    function Attachment(name, type, data) {
        this.id = attachmentId++;
        this.name = name;
        this.type = type;
        this.data = data;
    }

// Attachments related
    let attachmentImage;
    let attachmentVideo;
    let attachmentAudio;
    let attachmentNotes;
    let attachmentFiles;
    let attachments = [];

    const body = $("body");
    body.on("click", ".icon", removeFile);
    body.on("click", ".text", previewAttachment);

    $("#capture").click(function () {
        Webcam.snap(function (data_uri) {
            document.getElementById('front-cam').innerHTML = '<img src="' + data_uri + '"/>';
            uploadImage = data_uri;
        });
    });

//Attach
    $("#attachImage").click(function () {
        // $("#attachmentInput").click();
        $("#dialog-attach-image").dialog("open");
    });

// Attachment->Video button click
    $("#attachVideo").click(function () {
        // $("#attachmentInput").click();
        $("#dialog-attach-video").dialog("open");
    });

// Attachment->Audio button click
    $("#attachAudio").click(function () {
        $("#dialog-attach-audio").dialog("open");
    });

// Attachment->Note button click
    $("#attachNote").click(function () {
        $("#dialog-attach-note").dialog("open");
    });

// Attachment->Note button click
    $("#attachFile").click(function () {
        $("#attachmentFiles").click();
    });

// Attachment Video dialog -> Upload Button
    $("#upload-video").click(function () {
        $("#attachment-preview-video").hide();
        $("#capture-video-preview").show();
        $("#uploaded-video-preview").hide();

        videoPlayer.recorder.reset();

        $("#attachmentVideo").click();
    });

// Attachment Audio dialog -> Upload Button
    $("#upload-audio").click(function () {
        $("#attachment-preview-audio").hide();
        $("#capture-audio-preview").show();
        $("#uploaded-audio-preview").hide();

        audioPlayer.recorder.reset();

        $("#attachmentAudio").click();
    });

// Attachment Image dialog -> Upload Button
    $("#upload-image").click(function () {
        $("#attachment-preview-image").hide();
        $("#capture-image-preview").show();
        $("#uploaded-image-preview").hide();

        imagePlayer.recorder.reset();
        $("#attachmentImage").click();
    });

// Attachment Image dialog -> Upload Button
    $("#upload-note").click(function () {
        $("#attachment-preview-note").hide();
        $("#note-preview").hide();
        $("#attachmentNotes").click();
        isFileNote = true;
    });

// Attachment Video dialog -> Capture Button
    $("#capture-video").click(function () {
        $("#attachment-preview-video").show();
        $("#capture-video-preview").show();
        let preview = $("#uploaded-video-preview");
        preview.hide();
        preview.get(0).pause();
    });

// Attachment Audio dialog -> Capture Button
    $("#capture-audio").click(function () {
        $("#attachment-preview-audio").show();
        $("#capture-audio-preview").show();
        let preview = $("#uploaded-audio-preview");
        preview.hide();
        preview.get(0).pause();
    });

// Attachment Image dialog -> Capture Button
    $("#capture-image").click(function () {
        $("#attachment-preview-image").show();
        $("#capture-image-preview").show();
        $("#uploaded-image-preview").hide();
    });

// Attachment Notes dialog -> New Note Button
    let isFileNote = false;
    $("#capture-note").click(function () {
        $("#attachment-preview-note").show();
        let preview =  $("#note-preview");
        preview.show();
        preview.attr("enable", "enable");
        preview.val("");
        preview.prop('readonly', false);
        let previewname = $("#note-name");
        previewname.val("");
        previewname.prop('readonly', false);
        isFileNote = false;
    });

    let videoPlayer
        = videojs("capture-video-preview", {
        controls: true,
        width: 400,
        height: 300,
        plugins: {
            record: {
                audio: true,
                video: true,
                maxLength: 10,
                debug: true
            }
        }
    });

    videoPlayer.on('startRecord', function() {
        console.log('started recording!');
    });

    videoPlayer.on('finishRecord', function() {
        // the blob object contains the image data that
        // can be downloaded by the user, stored on server etc.
        console.log(videoPlayer.recordedData);
        var fr = new FileReader();
        fr.onload = function(e) {
            // callback(e.target.result);
            attachmentVideo = new Attachment("video_"+getTimeStamp()+".webm", "video", e.target.result );
        };     // data-URI of blob
        fr.readAsDataURL(videoPlayer.recordedData)

    });

    let audioPlayer =
        videojs("capture-audio-preview",
            {
                controls: true,
                width: 400,
                height: 300,
                plugins: {
                    wavesurfer: {
                        src: "live",
                        waveColor: "black",
                        progressColor: "#2E732D",
                        cursorWidth: 1,
                        msDisplayMax: 20,
                        hideScrollbar: true
                    },
                    record: {
                        audio: true,
                        video: false,
                        maxLength: 20,
                        debug: true
                    }
                }
            });

    audioPlayer.on('startRecord', function() {
        console.log('started recording!');
    });

    audioPlayer.on('finishRecord', function() {
        // the blob object contains the image data that
        // can be downloaded by the user, stored on server etc.
        console.log('snapshot ready: ', audioPlayer.recordedData);
        var fr = new FileReader();
        fr.onload = function(e) {
            // callback(e.target.result);
            attachmentAudio = new Attachment("audio_"+getTimeStamp()+".wav", "audio", e.target.result );
        };     // data-URI of blob
        fr.readAsDataURL(audioPlayer.recordedData)
    });

    let imagePlayer =
        videojs("capture-image-preview",
            {
                controls: true,
                width: 400,
                height: 300,
                controlBar: {
                    volumeMenuButton: false,
                    fullscreenToggle: false
                },
                plugins: {
                    record: {
                        image: true,
                        debug: true
                    }
                }
            });

    imagePlayer.on('startRecord', function() {
        console.log('started recording!');
    });

    imagePlayer.on('finishRecord', function() {
        // the blob object contains the image data that
        // can be downloaded by the user, stored on server etc.
        console.log('snapshot ready: ', imagePlayer.recordedData);
        attachmentImage = new Attachment("image_"+getTimeStamp()+".png", "image", imagePlayer.recordedData );
    });

    let currentPreviewFile;

    function removeFile() {
        let file = $(this).data("file");
        console.info(file + " removed.");
        for (let i = 0; i < attachments.length; i++) {
            if (attachments[i].id === file) {
                attachments.splice(i, 1);
                break;
            }
        }
        $(this).parent().remove();

        if(currentPreviewFile == file){
            let preview = $("#attachment-preview");
            preview.empty();
            preview.append(
                '<p> Click item for preview </p>'
            );
        }

        if(attachments.length == 0){
            $("#attachment-preview").hide();
            $("#attachments-not-empty").hide();
            $("#attachments-empty").show();
        }
    }

    function previewAttachment() {
        let id = $(this).data("file");
        currentPreviewFile = id;
        console.info(id + " clicked.");

        let preview = $("#attachment-preview");

        for (let i = 0, attachment; i < attachments.length; i++) {
            attachment = attachments[i];
            if (attachment.id === id) {
                console.info(attachment.type);
                switch (attachment.type){
                    case "image":
                        console.info("Image file");
                        preview.empty();
                        preview.append(
                            '<img class="previewWindow" src='+ attachment.data +'>'
                        );
                        break;
                    case "video":
                        console.info("Video file");
                        preview.empty();
                        if(attachment.data instanceof Blob) {
                            let videoReader = new FileReader();
                            videoReader.onloadend = (function (e) {
                                preview.append(
                                    '<video class="video-js vjs-default-skin previewWindow" controls autoplay>'
                                    +   '<source src=' + e.target.result + '>'
                                    + '</video>');
                            });
                            videoReader.readAsDataURL(attachment.data);
                        } else {
                            preview.append(
                                '<video class="video-js vjs-default-skin previewWindow" controls autoplay>'
                                +   '<source src=' + attachment.data + '>'
                                + '</video>'
                            );
                        }

                        console.info("Video data-> "+attachment.data);
                        break;
                    case "audio":
                        console.info("Audio file");
                        preview.empty();
                        if(attachment.data instanceof Blob){
                            let audioReader = new FileReader();
                            audioReader.onloadend = (function (e) {
                                preview.append(
                                    '<audio class="video-js vjs-default-skin previewWindow" controls autoplay>' +
                                    '<source src='+ e.target.result +'>' +
                                    '</audio>'
                                );
                            });
                            audioReader.readAsDataURL(attachment.data);
                        } else {
                            preview.append(
                                '<audio class="video-js vjs-default-skin previewWindow" controls autoplay>' +
                                '<source src='+ attachment.data +'>' +
                                '</audio>'
                            );
                        }

                        console.info("Audio data-> "+attachment.data);
                        break;
                    case "note":
                        console.info("Text file");
                        console.info(attachment.data);
                        // let fileReader = new FileReader();
                        // fileReader.onloadend = (function (e) {
                            preview.empty();
                            preview.append(
                                '<textarea class="previewWindow" title="Preview Text" disabled>' +
                                    atob(attachment.data.replace("data:text/plain;base64,", ""))+
                                '</textarea>'
                            );
                        // });
                        // fileReader.readAsText(attachment.data);
                        break;
                    default:
                        console.info("File attachment");
                        preview.empty();
                        preview.append(
                            '<div class="previewWindow" title="Preview Text" >' +
                            '<p style="text-align: center;">' + attachment.name + '</p>' +
                            '<p style="text-align: center;">No preview available.</p>' +
                            '</div>');
                        break;

                }
            }
        }
    }

    function generateAttachmentsList() {

        console.info("Total attachments->" + attachments.length + " files");
        console.info("Attachments->" + attachments);

        if(attachments.length != 0){
            $("#attachments-empty").hide();
            $("#attachment-preview").show();
            $("#attachments-not-empty").show();

            let listContainer = $("#attachments-list");

            listContainer.empty();

            for (let i = 0; i < attachments.length; i++) {
                let a = attachments[i];

                console.info("Attachment " + a.id + "-> Name: " + a.name + " | Type: " + a.type);

                listContainer.append(
                    "<div id='attachmentBlock' style='margin:5px'>"
                    + "<svg class='icon' data-file='" + a.id + "' height='12px' width='12px'>"
                    + "<path fill='#000000' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z'></path>"
                    + "</svg>"
                    + "<a class='text' data-file='" + a.id + "'>" + a.name + "</a>"
                    + "</div>"
                );
            }
        } else {
            $("#attachment-preview").hide();
            $("#attachments-not-empty").hide();
            $("#attachments-empty").show();
        }

    }

    function addFileBlobToAttachments(name, data, type) {
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            var arrayBuffer = e.target.result;
            var fileType = image.type;
            blobUtil.arrayBufferToBlob(arrayBuffer, fileType)
                .then(function (blob) {
                    console.log('here is a blob', blob);
                    console.log('its size is', blob.size);
                    console.log('its type is', blob.type);
                    var attachment = new Attachment(name, type , blob );
                    attachments.push(attachment);
                }).catch(console.log.bind(console));
        };
        fileReader.readAsArrayBuffer(data);
    }

    $("#attachmentImage").on("change", function (e) {

        let image = e.target.files[0];
        console.info("Image selected ->" + image.name);

        let reader = new FileReader();
        reader.onload = (function (e) {
            let previewImage = e.target.result;
            $("#attachment-preview-image").show();
            $("#capture-image-preview").hide();
            let preview = $("#uploaded-image-preview");
            preview.show();
            preview.attr('src', previewImage);

            attachmentImage = new Attachment(image.name, "image", previewImage );
        });
        reader.readAsDataURL(image);

        $("#attachment-preview-image").show();

    });

    $("#attachmentVideo").on("change", function (e) {

        let video = e.target.files[0];
        console.info("Video selected ->" + video.name);

        let reader = new FileReader();

        reader.onload = (function (e) {
            let previewVideo = e.target.result;
            $("#attachment-preview-video").show();
            $("#capture-video-preview").hide();
            let preview = $("#uploaded-video-preview");
            preview.show();
            preview.attr('src', previewVideo);
            preview.get(0).play();

            attachmentVideo = new Attachment(video.name, "video", previewVideo );

            console.info("Video attachment created->");
            console.info(attachmentVideo);
        });
        reader.readAsDataURL(video);
    });

    $("#attachmentAudio").on("change", function (e) {

        let audio = e.target.files[0];
        console.info("Audio selected ->" + audio.name);

        let reader = new FileReader();

        reader.onload = (function (e) {
            let previewAudio = e.target.result;
            $("#attachment-preview-audio").show();
            $("#capture-audio-preview").hide();
            let preview = $("#uploaded-audio-preview");
            preview.show();
            preview.attr('src', previewAudio);
            preview.get(0).play();

            attachmentAudio = new Attachment(audio.name, "audio", previewAudio );
        });
        reader.readAsDataURL(audio);
    });

    $("#attachmentNotes").on("change", function (e) {

        let note = e.target.files[0];
        console.info("Note selected ->" + note.name);

        let reader = new FileReader();

        reader.onload = (function (note) {
            let previewNote = note.target.result;
            $("#attachment-preview-note").show();
            let preview = $("#note-preview");

            preview.show();
            preview.val(previewNote);
            preview.prop('readonly', true);
        });
        reader.readAsText(note);
        let previewname = $("#note-name");
        previewname.val(note.name);
        previewname.prop('readonly', true);

        let reader2 = new FileReader();

        reader2.onload = (function (e) {
            attachmentNotes = new Attachment(note.name, "note", e.target.result );
        });
        reader2.readAsDataURL(note);
    });

    $("#attachmentFiles").on("change", function (e) {

        let file = e.target.files[0];
        console.info("File selected ->" + file.name);

        let reader = new FileReader();

        reader.onload = (function (e) {
            let previewFile = e.target.result;
            let attachmentNewFile = new Attachment(file.name, "file", previewFile );
            attachments.push(attachmentNewFile);
        });
        reader.readAsDataURL(file);
    });

// Dialog
// Creates dialog to show attachments
    $("#dialog-attachment").dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        open: function () {
            console.info("Notes dialog opened");
            $("#attachment-preview").hide();
            generateAttachmentsList();
        },
        close: function () {
        },
        modal: true,
        autoOpen: false,
        buttons: {
            // "Add more attachments": function() {
            //     $("#attachmentInput").click();
            // },
            "OK": function () {
                $(this).dialog("close");
            }
        }
    });

    function getTimeStamp() {
        let currentDate = new Date();
        return currentDate.getDate() + "-"
            + (currentDate.getMonth()+1)  + "-"
            + currentDate.getFullYear() + "."
            + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":"
            + currentDate.getSeconds();
    }

// Dialog
// Creates dialog to attach video
    $("#dialog-attach-video").dialog({
        resizable: true,
        position: {my: 'top', at: 'top+200'},
        open: function () {
            console.info("Video dialog opened");
            $("#attachment-preview-video").hide();
            attachmentVideo = null;
        },
        close: function () {
            console.info("Video dialog closed");
            $("#uploaded-video-preview").get(0).pause();
            videoPlayer.recorder.reset();
            attachmentVideo = null;
        },
        modal: true,
        autoOpen: false,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                videoPlayer.recorder.reset();
                attachmentVideo = null;
            },
            "Attach": function () {
                console.info( "Attaching -> " );
                console.info( attachmentVideo );
                attachments.push(attachmentVideo);
                $(this).dialog("close");
            }
        },
        height: "auto",
        width: "auto"
    });

// Dialog
// Creates dialog to attach audio
    $("#dialog-attach-audio").dialog({
        resizable: false,
        position: {my: 'top', at: 'top+200'},
        open: function () {
            console.info("Audio dialog opened");
            $("#attachment-preview-audio").hide();
            audioPlayer.recorder.reset();
            attachmentAudio = null;
        },
        close: function () {
            console.info("Audio dialog closed");
            $("#uploaded-audio-preview").get(0).pause();
            audioPlayer.recorder.reset();
            attachmentAudio = null;
        },
        modal: true,
        autoOpen: false,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
            },
            "Attach": function () {
                console.info( "Attaching -> " + attachmentAudio);
                attachments.push(attachmentAudio);
                $(this).dialog("close");
            }
        },
        height: "auto",
        width: "auto"
    });

// Dialog
// Creates dialog to attach image
    $("#dialog-attach-image").dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        position: {my: 'top', at: 'top+200'},
        open: function () {
            console.info("Image dialog opened");
            $("#attachment-preview-image").hide();
            imagePlayer.recorder.reset();
            attachmentImage = null;
        },
        close: function () {
            console.info("Image dialog closed");
            imagePlayer.recorder.reset();
            attachmentImage = null;
        },
        modal: true,
        autoOpen: false,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                imagePlayer.recorder.reset();
                attachmentImage = null;
            },
            "Attach": function () {
                console.info( "Attaching -> ");
                console.info(attachmentImage);
                imagePlayer.recorder.reset();
                attachments.push(attachmentImage);
                $(this).dialog("close");
            }
        }
    });

    // Dialog
    // Creates dialog to attach notes
    $("#dialog-attach-note").dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        position: {my: 'top', at: 'top+200'},
        open: function () {
            console.info("Notes dialog opened");
            $("#attachment-preview-note").hide();
            $("#note-preview").val("");
            attachmentNotes = null;
        },
        close: function () {
            console.info("Notes dialog closed");
            attachmentNotes = null;
        },
        modal: true,
        autoOpen: false,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
            },
            "Attach": function () {
                let notePreview = $("#note-preview");
                let noteName = $("#note-name");
                if(isFileNote == false) {
                    let textToWrite = notePreview.val();
                    let name = noteName.val();
                    if(name == "") name = getTimeStamp()+".txt";
                    let newAttachmentNotes = new Attachment(name + ".txt", "note", btoa(textToWrite));
                    console.info( "Attaching -> " + newAttachmentNotes);
                    attachments.push(newAttachmentNotes);
                } else {
                console.info( "Attaching -> " + attachmentNotes);
                attachments.push(attachmentNotes);
                }

                $(this).dialog("close");
            }
        }
    });

    // Show list of attachments on click
    $("#status-view-attachments").click(function () {
        $("#dialog-attachment").dialog("open");
    });

    var progressbar = $( "#progressbar" );
    var progressLabel = $( ".progress-label" );

    var uploadDialog =  $( "#dialog-upload-progress" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        autoOpen: false,
        open: function() {
            saveAttchments();
            saveSVG();
        }
    });

    progressbar.progressbar({
        value: 0,
        change: function() {
            progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
        },
        complete: function () {
            setTimeout(function (e) {
                progressLabel.text("Upload complete.");
                uploadDialog.dialog( "option", "buttons", [{
                    text: "Close",
                    click: function () {
                        // window.location.reload();
                        window.location.href = returnlink;
                        return false;
                    }
                }]);
                $(".ui-dialog button").last().trigger( "focus" );
            }, 2000);
        }
    });

    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        autoOpen: false,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            "Save": function () {
                $(this).dialog("close");
                uploadDialog.dialog("open");
            }
        }
    });

    // Show list of attachments on click
    $("#status-save").click(function () {
        uploadDialog.dialog("open");
        // $( "#dialog-confirm" ).dialog("open");
    });

    $("#status-cancel").click(function () {
        window.location.href = returnlink;
        return false;
    });

    function saveSVG() {
        var formData = new FormData();
        formData.append("file", btoa(canvas.toSVG()));
        formData.append("filename", Math.floor(Date.now()) + ".svg" );
        formData.append("filetype", "svg" );
        // formData.append("filetype", attachedFile.type);
        formData.append("patientid", patientid);
        formData.append("visitid", visitid);
        formData.append("providerid", providerid);

        //new ajax request
        let request = new XMLHttpRequest();

        //event listener progress
        request.upload.addEventListener('progress',function(event){
            if(event.lengthComputable){
                //get our percentage
                var percent = (Math.round(event.loaded / event.total) * 100);
                console.error( " progress: " + percent + " %");
                progressbar.progressbar( "value", percent);
            }
        });

        //add event for when the progress is done
        request.upload.addEventListener('load',function(data){

        });

        //for errors we'll use the info element but for now console log it
        request.upload.addEventListener('error',function(event){
            progressLabel.text("Error occurred!");
            console.log("error: " + event);
        });

        //open the request
        request.open("POST","../../annotation/upload.form");

        //set the request header for no caching
        request.setRequestHeader("Cache-Control","no-cache");

        //send the data
        request.send(formData);

        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.error( "success: Upload succeeded");
                console.error( "success: Upload response : " + request.responseText);
            }
        };
    }

    function saveAttchments() {
        for (let i = 0; i < attachments.length; i++) {

            progressbar.progressbar( "value", i * 100 / attachments.length);

            var attachedFile = attachments[i];
            var formData = new FormData();
            formData.append("file", attachedFile.data);
            formData.append("filename", attachedFile.name);
            formData.append("filetype", "attachment" );
            // formData.append("filetype", attachedFile.type);
            formData.append("fileid", attachedFile.id);
            formData.append("patientid", patientid);
            formData.append("visitid", visitid);
            formData.append("providerid", providerid);

            //new ajax request
            let request = new XMLHttpRequest();

            //event listener progress
            request.upload.addEventListener('progress',function(event){
                if(event.lengthComputable){
                    //get our percentage
                    var percent = (Math.round(event.loaded / event.total) * 100);
                    console.error( " progress: " + percent + " %");
                    progressbar.progressbar( "value", percent);
                }
            });

            //add event for when the progress is done
            request.upload.addEventListener('load',function(data){

            });

            //for errors we'll use the info element but for now console log it
            request.upload.addEventListener('error',function(event){
                progressLabel.text("Error occurred!");
                console.log("error: " + event);
            });

            //open the request
            request.open("POST","../../annotation/upload.form");

            //set the request header for no caching
            request.setRequestHeader("Cache-Control","no-cache");

            //send the data
            request.send(formData);

            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.error( "success: Upload succeeded");
                    console.error( "success: Upload response : " + request.responseText);
                }
            };

            // $.ajax({
            //     url: "upload.form",
            //     type: 'POST',
            //     data: formData,
            //     cache: false,
            //     contentType: false,
            //     processData: false,
            //     beforeSend: function () {
            //         console.error(" beforeSend: Upload started");
            //     },
            //     uploadProgress: function (event, position, total, percentComplete) {
            //         console.error(" progress: " + percentComplete);
            //     },
            //     error: function () {
            //         console.error(" error: Error occurred");
            //     },
            //     success: function (data) {
            //         console.error(" success: Upload succeeded");
            //         console.error(" success: Upload response : " + data);
            //     },
            //     complete: function () {
            //         console.error(" complete: Upload completed");
            //         // window.location.reload();
            //     }
            // });
        }
    }

    beforeSubmit.push(function() {
        $("#status-save").click();
        setTimeout(function (e) {
            return true;
        }, 3000);
    });

} );
