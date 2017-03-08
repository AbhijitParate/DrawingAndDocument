/**
 * Created by abhij on 3/7/2017.
 */
$(document).ready(function() {

    // Template
    let uploadImage, imagePath;
    let dialogTemplate = $("#dialog-upload");
    dialogTemplate.dialog({
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
    //http://localhost:8080/openmrs/ms/uiframework/resource/annotation/images/no-preview.jpg
    $("#template-select").change(function () {
        imagePath = "./../ms/uiframework/resource/annotation/images/templates/" + $(this).val() + ".jpg";
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
        dialogTemplate.dialog("open");
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

});