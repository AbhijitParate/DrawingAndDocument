
/*
 * Created by abhijit on 12/7/16.
 */

$(document).ready(function() {

    canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), 1.0);

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

    // Edit
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

    // let uploadImage = new Image();
    // let attachedImage = new Image();


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
} );
