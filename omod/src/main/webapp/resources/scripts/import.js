/**
 * Created by abhij on 3/7/2017.
 *
 */
$(document).ready(function() {

    // Template
    let uploadImage, imagePath;
    let dialogTemplate = $("#dialog-upload");
    let reset = false;

    dialogTemplate.dialog({
        resizable: false,
        position: {
            of: window,
            at: "center center",
            my: "center center"
        },
        height: "auto",
        width: "auto",
        modal: true,
        autoOpen: false,
        buttons: {
            "Use selected image": function () {
                $(this).dialog("close");
                blobUtil.imgSrcToDataURL(imagePath, 'image/jpeg').then(function (dataUrl) {
                    // success
                    fabric.Image.fromURL(
                        dataUrl,
                        function(oImg) {
                            if(oImg.width > 600){
                                oImg.setWidth(600);
                            }
                            if(oImg.height > 600){
                                oImg.setHeight(600);
                            }
                            oImg.set({'top': 100, 'left': 100});
                            canvas.centerObject(oImg);
                            canvas.add(oImg);
                        }
                    );
                });
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        },
        open : function () {

            $.ajax({
                type: "GET",
                url: "../ws/rest/v1/docsanddrawing/template/all",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    $("#template-select").empty();
                    $.each(data, function (i) {
                        console.log(data[i]);
                        var option = $("<option />").attr('value',data[i]).text(data[i]).appendTo("#template-select");
                    });
                }
            });

            $(".ui-dialog-buttonpane button:contains('Use selected')")
                .button("disable");
        }
    });

    $("#webcam-size").change(function () {
        console.info($(this).val());
        let size = $(this).val();
        switch (size){
            case "1":
                console.info("1");
                Webcam.reset();
                Webcam.set({
                    width: 320,
                    height: 240,
                    dest_width: 320,
                    dest_height: 240,
                });
                dialogWebcam.dialog({
                    width: 320 + 33,
                    height: 240 + 180,
                });
                break;
            case "2":
                console.info("2");
                Webcam.reset();
                Webcam.set({
                    width: 640,
                    height: 480,
                    dest_width: 640,
                    dest_height: 480,
                });
                dialogWebcam.dialog({
                    width: 640 + 33,
                    height: 480 + 180,
                });
                break;
            case "3":
                console.info("3");
                Webcam.reset();
                Webcam.set({
                    width: 1280,
                    height: 720,
                    dest_width: 1280,
                    dest_height: 720,
                });
                dialogWebcam.dialog({
                    width: 1280 + 33,
                    height: 720 + 180,
                });
                break;
        }
        Webcam.attach("#front-cam");
    });

    $("#template-select").on("change" ,function () {
        imagePath = "../ws/rest/v1/docsanddrawing/template/get/" + $(this).val();
        console.info(imagePath);
        $("#preview-image").attr('src', imagePath);

        let blob = null;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", imagePath);
        xhr.responseType = "blob";
        xhr.onload = function () {
            blob = xhr.response;
            uploadImage = URL.createObjectURL(this.response);
            $(".ui-dialog-buttonpane button:contains('Use selected')")
                .button("enable");
        };
        xhr.send();
    });
    $("#import-template").click(function () {
        dialogTemplate.dialog("open");
    });

        let dialogWebcam = $("#dialog-webcam")
        // WebCam
        dialogWebcam.dialog({
            resizable: true,
            position: {
                of: window,
                at: "center center",
                my: "center center"
            },
            width: 640 + 33,
            height: 480 + 180,
            open: function () {
                Webcam.set({
                    width: 640,
                    height: 480,
                    dest_width: 640,
                    dest_height: 480,
                });
                Webcam.attach("#front-cam");
                $(".ui-dialog-buttonpane button:contains('Use')").button("disable");
            },
            close: function () {
                Webcam.reset();
                $(".ui-dialog-buttonpane button:contains('Reset')").text('Capture');
                $(this).dialog("close");
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
                    blobUtil.imgSrcToDataURL(imagePath, 'image/jpeg').then(function (dataUrl) {
                        // success
                        fabric.Image.fromURL(
                            dataUrl,
                            function(oImg) {
                                if(oImg.width > 600){
                                    oImg.setWidth(600);
                                }
                                if(oImg.height > 600){
                                    oImg.setHeight(600);
                                }
                                // oImg.scale(1);
                                oImg.set({'top': 100, 'left': 100});
                                canvas.centerObject(oImg);
                                canvas.add(oImg);
                            }
                        );
                    });
                },
                "Cancel": function () {
                    $(this).dialog("close");
                    Webcam.reset();
                }
            }
        });

    function showWebcamDialog() {
        reset = false;
        dialogWebcam.dialog('open');
    }

    $("#import-camera").click(function () {
        showWebcamDialog();
    });

    function getInputTag() {
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","notes[]");
        input.attr("accept","image/*");
        return input;
    }

    // Upload
    let fileUploadInput = getInputTag();
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
                        if(oImg.width > 600){
                            oImg.setWidth(600);
                        }
                        if(oImg.height > 600){
                            oImg.setHeight(600);
                        }
                        oImg.set({'top': 100, 'left': 100});
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

    // $("#import-svg").on('click', function () {
    //     let input = $("<input />").attr("type", "file").attr("accept","image/svg+xml");
    //     input.change(function (e) {
    //         let div = $("<div />");
    //         $("<img src='./../ms/uiframework/resource/docsanddrawing/images/loading.gif' width='100' height='100' />").appendTo(div);
    //         div.dialog({
    //             title: 'Loading...',
    //             resizable: false,
    //             position: {
    //                 of: window,
    //                 at: "center center",
    //                 my: "center center"
    //             },
    //             height: "180",
    //             width: "100",
    //             icon: hide
    //         });
    //         let image = e.target.files[0];
    //         let reader = new FileReader();
    //         reader.onload = (function (e) {
    //             let img = e.target.result;
    //             fabric.loadSVGFromURL(img,
    //                 function(objects, options) {
    //                     console.log(objects);
    //                     var loadedObjects = new fabric.Group(group);
    //                     loadedObjects.set({
    //                         left: 0,
    //                         top: 0,
    //                         width:800,
    //                         height:800
    //                     });
    //                     canvas.add(loadedObjects);
    //                     canvas.renderAll();
    //                     div.dialog('destroy');
    //                 });
    //         });
    //         reader.readAsDataURL(image);
    //
    //     });
    //     input.click();
    // });

    $("#import-json").on('click', function () {
        let input = $("<input />").attr("type", "file").attr("accept", ".json");
        input.change(function (e) {
            let div = $("<div />");
            $("<img src='./../ms/uiframework/resource/docsanddrawing/images/loading.gif' width='100' height='100' />").appendTo(div);
            div.dialog({
                title: 'Loading...',
                resizable: false,
                position: {
                    of: window,
                    at: "center center",
                    my: "center center"
                },
                height: "180",
                width: "100",
                icon: hide
            });
            console.log("File selected...");
            let image = e.target.files[0];

            let reader = new FileReader();
            reader.onload = (function (e) {
                console.log("Loading complete...");
                let img = e.target.result;
                canvas.loadFromJSON(img, function onLoad() {
                    canvas.renderAll();
                    div.dialog('destroy');
                });
            });
            reader.readAsText(image);
        });
        input.click();
    });

});