$(document).ready(function() {

    let clickPoint;

    $(document).contextmenu({
        delegate: ".upper-canvas",
        autoFocus: true,
        preventContextMenuForPopup: true,
        preventSelect: true,
        taphold: true,
        menu: [
            {
                title: "Add image",
                cmd: "add-image"
            },
            {
                title: "Add audio clip",
                cmd: "add-audio"
            },
            {
                title: "Add video clip",
                cmd: "add-video"
            }
        ],
        // Implement the beforeOpen callback to dynamically change the entries
        beforeOpen: function (event, ui) {

            clickPoint = new fabric.Point(event.offsetX, event.offsetY);

            // Optionally return false, to prevent opening the menu now
        },
        // Handle menu selection to implement a fake-clipboard
        select: function (event, ui) {
            // var clickPoint = new fabric.Point(event.offsetX, event.offsetY);
            let input;
            let options = {top: clickPoint.y, left: clickPoint.x};
            switch (ui.cmd) {
                case "add-image":
                    console.log("add-image : " + clickPoint);
                    createImageDialog();
                    break;
                case "add-audio":
                    console.log("add-audio : " + clickPoint);
                    createAudioDialog();
                    break;
                case "add-video":
                    console.log("add-video : " + clickPoint);
                    createVideoDialog();
                    break;
            }
        },
    });

    function createImageDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Attach Image");
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","images[]");
        input.attr("accept","image/*");
        input.on("change", function (e) {
            let temp = e.target.files[0];
            let options = {top: clickPoint.y, left: clickPoint.x};
            let reader = new FileReader();
            reader.onload = (function (e) {
                let imageData = e.target.result;
                let media = new Media(imageData, options);
                canvas.add(media);
                media.on('image:loaded', canvas.renderAll.bind(canvas));
            });
            reader.readAsDataURL(temp);
            dialog.dialog("destroy");
        });
        input.appendTo(dialog);
        $("<button />").css('margin', '10px').text("Upload from device").button().on("click", function () {
            input.click();
        }).appendTo(dialog);
        $("<p />").appendTo(dialog);
        $("<button />").css('margin', '10px').text("Capture using web-cam").button().on("click", function () {
            createWebcamDialog();
            dialog.dialog("destroy");
        }).appendTo(dialog);
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "auto",
            open: function () {
                console.info("Image dialog opened");
            },
            close: function () {
                console.info("Image dialog closed");
            },
            autoOpen: false,
            buttons: {
                "Cancel": function () {
                    $(this).dialog("destroy");
                }
            }
        });

        dialog.dialog("open");
    }

    function createWebcamDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Capture image from camera");
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","images[]");
        input.attr("accept","image/*");
        input.on("change", function (e) {
            let image = e.target.files[0];
            let options = {top: clickPoint.y, left: clickPoint.x};
            let reader = new FileReader();
            reader.onload = (function (e) {
                let imageData = e.target.result;
                let media = new Media(imageData, options);
                canvas.add(media);
                media.on('image:loaded', canvas.renderAll.bind(canvas));
            });
            reader.readAsDataURL(image);
            dialog.dialog("destroy");
        });
        input.appendTo(dialog);

        let selectDiv = $("<div/>").css("height", "35px").appendTo(dialog);
        let select = $("<select/>").css("float","right").appendTo(selectDiv);
        // $("<option/>").attr("value", "1").text("320×240").appendTo(select);
        $("<option/>").attr("value", "2").text("640×480").appendTo(select);
        // $("<option/>").attr("value", "3").text("320×240").appendTo(select);
        $("<option/>").attr("value", "4").text("1280×720").appendTo(select);
        let label = $("<label/>").css("float","right");
        label.text("Image size : ");
        label.appendTo(selectDiv);
        let imageDiv = $("<div/>").appendTo(dialog);
        let video = $("<video/>").addClass("video-js vjs-default-skin");
        video.attr("id","myCamera");
        video.appendTo(imageDiv);
        let attachmentImage;
        let player;
        var attachBtn, retryBtn, uploadBtn;
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "auto",
            open: function () {
                console.info("Webcam dialog opened");
                player = videojs("myCamera", {
                    controls: true,
                    width: 640,
                    height: 480,
                    controlBar: {
                        volumeMenuButton: false,
                        fullscreenToggle: false
                    },
                    plugins: {
                        record: {
                            image: true
                        }
                    }
                });
                attachBtn = $(".ui-dialog-buttonpane button:contains('Attach')");
                retryBtn = $(".ui-dialog-buttonpane button:contains('Retry')");
                uploadBtn = $(".ui-dialog-buttonpane button:contains('Upload')");

                // error handling
                player.on('deviceError', function() {
                    console.warn('device error:', player.deviceErrorCode);
                });
                player.on('error', function(error) {
                    console.log('error:', error);
                });
                // snapshot is available
                player.on('finishRecord', function() {
                    // the blob object contains the image data that
                    // can be downloaded by the user, stored on server etc.
                    // console.log('snapshot ready: ', player.recordedData);
                    // attachBtn.text('Capture');
                    let data = player.recordedData;
                    attachmentImage = new Attachment("image_"+getTimeStamp()+".png", "image", data);
                    attachBtn.button("enable");
                    retryBtn.button("enable")
                });

                attachBtn.button("disable");
                retryBtn.button("disable");
            },
            close: function () {
                destroyCam();
            },
            autoOpen: false,
            buttons: {
                upload :{
                    text : "Upload from system",
                    click : function () {
                        console.info("Upload clicked");
                        input.click();
                        $(this).dialog("destroy");
                        destroyCam();
                    }
                },
                "Retry": function () {
                    console.info("Retry clicked");
                    $(".vjs-icon-photo-retry").click();
                    retryBtn.button("disable");
                    attachBtn.button("disable");
                },
                "Attach": function () {
                    console.info("Attach clicked");
                    saveAttachment();
                    destroyCam();
                    $(this).dialog("destroy");
                },
                "Cancel": function () {
                    console.info("Camera dialog closed");
                    destroyCam();
                    $(this).dialog("destroy");
                },
            }
        });

        function destroyCam() {
            player.recorder.reset();
            imageDiv.remove();
        }

        function saveAttachment() {
            console.info("Save attachment code here");
            let options = {top: clickPoint.y, left: clickPoint.x};
            let media = new Media(attachmentImage.data, options);
            media.on('image:loaded', canvas.renderAll.bind(canvas));
            canvas.add(media);
        }

        dialog.dialog("open");

        select.on("change", function () {
            let newVideo;
            let size = $(this).val();
            switch (size){
                case "1":
                    console.info("1");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myCamera");
                    player = videojs("myCamera", {
                        controls: true,
                        loop: false,
                        // dimensions of video.js player
                        width: 320,
                        height: 240,
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
                    break;
                case "2":
                    console.info("2");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myCamera");
                    player = videojs("myCamera", {
                        controls: true,
                        loop: false,
                        // dimensions of video.js player
                        width: 640,
                        height: 480,
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
                    break;
                case "3":
                    console.info("3");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myCamera");
                    player = videojs("myCamera", {
                        controls: true,
                        loop: false,
                        // dimensions of video.js player
                        width: 1024,
                        height: 768,
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
                    break;
                case "4":
                    console.info("4");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myCamera");
                    player = videojs("myCamera", {
                        controls: true,
                        loop: false,
                        // dimensions of video.js player
                        width: 1280,
                        height: 720,
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
                    player.reset();
                    break;
            }
            // snapshot is available
            player.on('finishRecord', function() {
                // the blob object contains the image data that
                // can be downloaded by the user, stored on server etc.
                // console.log('snapshot ready: ', player.recordedData);
                // attachBtn.text('Capture');
                let data = player.recordedData;
                attachmentImage = new Attachment("image_"+getTimeStamp()+".png", "image", data);
                attachBtn.button("enable");
                retryBtn.button("enable")
            });
            attachBtn.button("disable");
            retryBtn.button("disable");
            $(".vjs-device-button.vjs-control.vjs-icon-device-perm").click();
        });
        $(".vjs-device-button.vjs-control.vjs-icon-device-perm").click();
    }

    function createAudioDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Attach Audio");
        let inputTag = $("<input/>");
        inputTag.attr("type", "file");
        inputTag.attr("hidden","");
        inputTag.attr("name","audio[]");
        inputTag.attr("accept","audio/*");
        inputTag.on("change", function (e) {
            let audio = e.target.files[0];
            let options = {top: clickPoint.y, left: clickPoint.x};
            let reader = new FileReader();
            reader.onload = (function (e) {
                let data = e.target.result;
                let media = new Media(data, options);
                console.log("here");
                canvas.add(media);
                console.log("here");
                media.on('image:loaded', canvas.renderAll.bind(canvas));
            });
            reader.readAsDataURL(audio);
            dialog.dialog("close");
        });
        inputTag.appendTo(dialog);
        $("<button />").css('margin', '10px').text("Upload from device").button().on("click", function () {
            inputTag.click();
        }).appendTo(dialog);
        $("<p />").appendTo(dialog);
        $("<button />").css('margin', '10px').text("Record using microphone").button().on("click", function () {
            createRecordDialog();
            dialog.dialog("destroy");
        }).appendTo(dialog);
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "auto",
            open: function () {
                console.info("Audio dialog opened");
            },
            close: function () {
                console.info("Audio dialog closed");
                $(this).dialog("destroy");
            },
            autoOpen: false,
            buttons: {
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });

        dialog.dialog("open");
    }

    function createRecordDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Record audio from mic");
        let inputTag = $("<input/>");
        inputTag.attr("type", "file");
        inputTag.attr("hidden","");
        inputTag.attr("name","audio[]");
        inputTag.attr("accept","audio/*");
        inputTag.on("change", function (e) {
            let audio = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (function (e) {
                let imageData = e.target.result;
                let options = {top: clickPoint.y, left: clickPoint.x};
                let media = new Media(imageData, options);
                console.log("here");
                canvas.add(media);
                console.log("here");
                media.on('image:loaded', canvas.renderAll.bind(canvas));
            });
            reader.readAsDataURL(audio);
            dialog.dialog("close");
        });
        inputTag.appendTo(dialog);
        let wrapperDiv = $("<div/>").appendTo(dialog);
        let audioTag = $("<audio/>").addClass("video-js vjs-default-skin");
        audioTag.attr("id","myAudio");
        audioTag.appendTo(wrapperDiv);
        let attachmentAudio;
        let player;
        var attachBtn, retryBtn, uploadBtn;
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "auto",
            open: function () {
                console.info("Record audio dialog opened");
                attachBtn = $(".ui-dialog-buttonpane button:contains('Attach')");
                retryBtn = $(".ui-dialog-buttonpane button:contains('Retry')");
                uploadBtn = $(".ui-dialog-buttonpane button:contains('Upload')");

                player = videojs("myAudio", {
                    controls: true,
                    width: 600,
                    height: 300,
                    plugins: {
                        wavesurfer: {
                            src: "live",
                            waveColor: "red",
                            progressColor: "#2E732D",
                            debug: true,
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

                $("#myAudio").css("background-color", "#9FD6BA");

                // error handling
                player.on('deviceError', function() {
                    console.warn('device error:', player.deviceErrorCode);
                });
                player.on('error', function(error) {
                    console.log('error:', error);
                });
                player.on('startRecord', function() {
                    console.log('started recording!');
                });
                // snapshot is available
                player.on('finishRecord', function() {
                    // the blob object contains the image data that
                    // can be downloaded by the user, stored on server etc.
                    // console.log('snapshot ready: ', player.recordedData);
                    // attachBtn.text('Capture');
                    console.info("finished recording");
                    let data = player.recordedData;
                    let fr = new FileReader();
                    fr.onload = function(e) {
                        // console.info(e.target.result);
                        attachmentAudio = new Attachment("audio_"+getTimeStamp()+".wav", "audio", e.target.result );
                        player.recorder.destroy();
                        $("<p />").text("Recorded audio").appendTo(wrapperDiv);
                        let audioTag = $("<audio/>");
                        audioTag.attr("controls","");
                        audioTag.css({"width":"600px", "height":"50px"});
                        let source = $("<source />");
                        source.attr("src",e.target.result);
                        source.attr("type","audio/webm");
                        source.appendTo(audioTag);
                        audioTag.appendTo(wrapperDiv);
                        attachBtn.button("enable");
                        retryBtn.button("enable")
                    };     // data-URI of blob
                    fr.readAsDataURL(data);
                });

                attachBtn.button("disable");
                retryBtn.button("disable");

                // Clicking mic button programmatically creates an error

            },
            close: function () {
                destroyCam();
                $(this).dialog("destroy");
            },
            autoOpen: false,
            buttons: {
                "Upload from system" : function() {
                    console.info("Upload clicked");
                    inputTag.click();
                },
                "Retry": function () {
                    console.info("Retry clicked");
                    $(this).dialog("destroy");
                    createRecordDialog();
                },
                "Attach": function () {
                    console.info("Attach clicked");
                    saveAttachment();
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    console.info("Camera dialog closed");
                    $(this).dialog("close");
                },
            }
        });

        function destroyCam() {
            player.recorder.destroy();
            player = null;
            wrapperDiv.remove();
        }

        function saveAttachment() {
            console.info("Save attachment code here");
            let options = {top: clickPoint.y, left: clickPoint.x};
            let media = new Media(attachmentAudio.data, options);
            media.on('image:loaded', canvas.renderAll.bind(canvas));
            canvas.add(media);
        }

        dialog.dialog("open");
    }

    function createVideoDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Attach Video");
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","video[]");
        input.attr("accept","video/*");
        input.on("change", function (e) {
            let video = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (function (e) {
                let imageData = e.target.result;
                let options = {top: clickPoint.y, left: clickPoint.x};
                let media = new Media(imageData, options);
                canvas.add(media);
                media.on('image:loaded', canvas.renderAll.bind(canvas));
            });
            reader.readAsDataURL(video);
            dialog.dialog("destroy");
        });
        input.appendTo(dialog);
        $("<button />").css('margin', '10px').text("Upload from device").button().on("click", function () {
            input.click();
        }).appendTo(dialog);
        $("<p />").appendTo(dialog);
        $("<button />").css('margin', '10px').text("Capture using web-cam").button().on("click", function () {
            createCamcorderDialog();
            dialog.dialog("destroy");
        }).appendTo(dialog);
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "auto",
            open: function () {
                console.info("Video dialog opened");
            },
            close: function () {
                console.info("Video dialog closed");
            },
            autoOpen: false,
            buttons: {
                "Cancel": function () {
                    $(this).dialog("destroy");
                }
            }
        });

        dialog.dialog("open");
    }

    function createCamcorderDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Capture video from camera");
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","videos[]");
        input.attr("accept","video/*");
        input.on("change", function (e) {
            let video = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (function (e) {
                let imageData = e.target.result;
                let options = {top: clickPoint.y, left: clickPoint.x};
                let media = new Media(imageData, options);
                canvas.add(media);
                media.on('image:loaded', canvas.renderAll.bind(canvas));
            });
            reader.readAsDataURL(video);
            dialog.dialog("destroy");
        });
        input.appendTo(dialog);

        let selectDiv = $("<div/>").css("height", "35px").appendTo(dialog);
        let select = $("<select/>").css("float","right").appendTo(selectDiv);
        $("<option/>").attr("value", "1").text("320×240").appendTo(select);
        $("<option/>").attr("value", "2").attr('selected','selected').text("640×480").appendTo(select);
        // $("<option/>").attr("value", "3").text("1024×768").appendTo(select);
        $("<option/>").attr("value", "4").text("1280×720").appendTo(select);
        let label = $("<label/>").css("float","right");
        label.text("Image size : ");
        label.appendTo(selectDiv);
        let imageDiv = $("<div/>").appendTo(dialog);
        let video = $("<video/>").addClass("video-js vjs-default-skin");
        video.attr("id","myVideo");
        video.appendTo(imageDiv);
        let attachmentVideo;
        let player;
        var attachBtn, retryBtn, uploadBtn;
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "auto",
            open: function () {
                console.info("Webcam dialog opened");
                attachBtn = $(".ui-dialog-buttonpane button:contains('Attach')");
                retryBtn = $(".ui-dialog-buttonpane button:contains('Retry')");
                uploadBtn = $(".ui-dialog-buttonpane button:contains('Upload')");

                player = videojs("myVideo", {
                    // video.js options
                    controls: true,
                    loop: false,
                    width: 640,
                    height: 480,
                    plugins: {
                        // videojs-record plugin options
                        record: {
                            maxLength: 60,
                            image: false,
                            audio: false,
                            video: {
                                // video constraints: set resolution of camera
                                mandatory: {
                                    minWidth: 640,
                                    minHeight: 480,
                                },
                                debug: true
                            },
                            // dimensions of captured video frames
                            frameWidth: 640,
                            frameHeight: 480
                        }
                    }
                });

                // error handling
                player.on('deviceError', function() {
                    console.warn('device error:', player.deviceErrorCode);
                });
                player.on('error', function(error) {
                    console.log('error:', error);
                });
                // snapshot is available
                player.on('finishRecord', function() {
                    // the blob object contains the image data that
                    // can be downloaded by the user, stored on server etc.
                    // console.log('snapshot ready: ', player.recordedData);
                    // attachBtn.text('Capture');
                    console.info("finished recording");
                    let data = player.recordedData;

                    let fr = new FileReader();
                    fr.onload = function(e) {
                        attachmentVideo = new Attachment("video_"+getTimeStamp()+".webm", "video", e.target.result );
                    };     // data-URI of blob
                    fr.readAsDataURL(data);

                    attachBtn.button("enable");
                    retryBtn.button("enable")
                });

                attachBtn.button("disable");
                retryBtn.button("disable");
            },
            close: function () {
                destroyCam();
            },
            autoOpen: false,
            buttons: {
                upload :{
                    text : "Upload from system",
                    click : function () {
                        console.info("Upload clicked");
                        input.click();
                        $(this).dialog("destroy");
                        destroyCam();
                    }
                },
                "Retry": function () {
                    console.info("Retry clicked");
                    $(".vjs-icon-photo-retry").click();
                    retryBtn.button("disable");
                    attachBtn.button("disable");
                },
                "Attach": function () {
                    console.info("Attach clicked");
                    saveAttachment();
                    destroyCam();
                    $(this).dialog("destroy");
                },
                "Cancel": function () {
                    console.info("Camera dialog closed");
                    destroyCam();
                    $(this).dialog("destroy");
                },
            }
        });

        function destroyCam() {
            player.recorder.destroy();
            imageDiv.remove();
        }

        function saveAttachment() {
            console.info("Save attachment code here");
            let options = {top: clickPoint.y, left: clickPoint.x};
            let media = new Media(attachmentVideo.data, options);
            canvas.add(media);
            media.on('image:loaded', canvas.renderAll.bind(canvas));
        }

        dialog.dialog("open");

        select.on("change", function () {
            let newVideo;
            let size = $(this).val();
            switch (size){
                case "1":
                    console.info("1");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myVideo");
                    player = videojs("myVideo", {
                        controls: true,
                        loop: false,
                        width: 320,
                        height: 240,
                        plugins: {
                            // videojs-record plugin options
                            record: {
                                maxLength: 60,
                                image: false,
                                audio: false,
                                video: {
                                    // video constraints: set resolution of camera
                                    mandatory: {
                                        minWidth: 320,
                                        minHeight: 240,
                                    },
                                    debug: true
                                },
                                // dimensions of captured video frames
                                frameWidth: 320,
                                frameHeight: 240
                            }
                        }
                    });
                    break;
                case "2":
                    console.info("2");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myVideo");
                    player = videojs("myVideo", {
                        controls: true,
                        loop: false,
                        width: 640,
                        height: 480,
                        plugins: {
                            // videojs-record plugin options
                            record: {
                                maxLength: 60,
                                image: false,
                                audio: false,
                                video: {
                                    // video constraints: set resolution of camera
                                    mandatory: {
                                        minWidth: 640,
                                        minHeight: 480,
                                    },
                                    debug: true
                                },
                                // dimensions of captured video frames
                                frameWidth: 640,
                                frameHeight: 480
                            }
                        }
                    });
                    break;
                case "3":
                    console.info("3");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myVideo");
                    player = videojs("myVideo", {
                        controls: true,
                        loop: false,
                        width: 1024,
                        height: 768,
                        plugins: {
                            // videojs-record plugin options
                            record: {
                                maxLength: 60,
                                image: false,
                                audio: false,
                                video: {
                                    // video constraints: set resolution of camera
                                    mandatory: {
                                        minWidth: 1024,
                                        minHeight: 768,
                                    },
                                    debug: true
                                },
                                // dimensions of captured video frames
                                frameWidth: 1024,
                                frameHeight: 768
                            }
                        }
                    });
                    break;
                case "4":
                    console.info("4");
                    player.recorder.destroy();
                    newVideo = $("<video/>").addClass("video-js vjs-default-skin");
                    newVideo.appendTo(imageDiv);
                    newVideo.attr("id", "myVideo");
                    player = videojs("myVideo", {
                        controls: true,
                        loop: false,
                        width: 1280,
                        height: 720,
                        plugins: {
                            // videojs-record plugin options
                            record: {
                                maxLength: 60,
                                image: false,
                                audio: false,
                                video: {
                                    // video constraints: set resolution of camera
                                    mandatory: {
                                        minWidth: 1280,
                                        minHeight: 720,
                                    },
                                    debug: true
                                },
                                // dimensions of captured video frames
                                frameWidth: 1280,
                                frameHeight: 720
                            }
                        }
                    });
                    player.reset();
                    break;
            }
            // snapshot is available
            player.on('finishRecord', function() {
                // the blob object contains the image data that
                // can be downloaded by the user, stored on server etc.
                // console.log('snapshot ready: ', player.recordedData);
                // attachBtn.text('Capture');
                console.info("finished recording");
                let data = player.recordedData;

                let fr = new FileReader();
                fr.onload = function(e) {
                    attachmentVideo = new Attachment("video_"+getTimeStamp()+".webm", "video", e.target.result );
                };     // data-URI of blob
                fr.readAsDataURL(data);

                attachBtn.button("enable");
                retryBtn.button("enable")
            });
            attachBtn.button("disable");
            retryBtn.button("disable");
            $(".vjs-device-button.vjs-control.vjs-icon-device-perm").click();
        });
        $(".vjs-device-button.vjs-control.vjs-icon-device-perm").click();
    }

});

let defaultIcon = "data:image/png;base64,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";
let imageIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAN7AAADewF05e9fAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAmRQTFRF////clrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSclrSPrnjQLrhQLrjQbnfQrnfQ7njQ7rdRITFRYTFRYXFRbniRbrjRrjiRrniR7rYSLnjSMTpSbrWSrrVS7jhTInITrvQT8ztULzOUMvtUcvsVLzJVMfpVMfqWsLmW73AXr6+X5XNYMLlYZrPYb66YpnPYprPY5vQY5zQZJzRZL62ZZzRZp7RZ5/RarPcarTdar+va7Hca7Lca7LdbLDbbLLbbbDbbbDcbbHbbcCrcKPTccCnclrSc1vSc1zSdF3Tdl/Td8GfeMGfeWLUe7nefGbVfcKZfmjWgWzWgWzXgcKUhnPYjcSFk8V+mcZ3nIzgnsZypJfhpMdrpZbippjhqJvirchgsqflt8pTu8pPvMpNwMtIwstGxr/rx8DryMLr0crv0c010s40087u1NDv2M4s2dTx2tfw284o3M4o3Nfz3dvx3e72393y3+714N/y4O714tAh5uX05uz059Eb6Of16O706dAY6+v17NEV7Ov27dET7ev47+748fP38vT48/L58/X59NML9PP59PT69PX49Pb49dIK9fb59tIJ9vf69vj69/b79/f7+Pj8+dIF+fn8+fr8+9MD+/v8+/v9/Pz9Lj358AAAADd0Uk5TAAEDBAYLDA4VHB4fNDg8PUJDR0pbc3yCg4SGiImVlqWnq661uLq/wsPFy9DT2d7m6+zt8/n6/uYUS2MAAAVRSURBVHjazdv3e9NGGAdwZZAQcIhjPJrEwcQOHjiOM+UOelmM0j1o00UHnXT37d57Qgfdg046aEt3Cm3TPagh/1TlLdsn3Z2k19L7K8+j74dY48Z7kmSk2l3eQCgSTw6PTEyMDCfjkVDA62qXGlLLPMFoGqiVjgY9y1DDW909iUnQrcnEMe5WpPjO/jHgqrH+TuvTV/pTIFAp/0pL411hGQRLDrssi+8aBEM12GVJfHcMDFes23R8xwCYqoEOU/EtvnEwWeO+FuP5q4bAghpaZTC+uVcGS0rubTb068fBsoobuBNWj4KFNbpaML6pTwZLS+5rEvrqrAXLa63AN6ptHSDUujbe/OXrAaXWL+fLX5ECpEqt4Pr/K/kPvf/T0SVL6+jBvfcpAo6/QZvy93/m8BJC/f2E8isw74NW5f574J+lw38sHrK0Fv/8b+mve5Q7kfEsNOWev71HFhcQ6rcjr+WeRv33QV/uXjl4aAGlfvkud/U+3fdv/v338wJSfZ9/J+q8lTsK7/9FLMA3he+C5pepufj9+wEL8EXx26j1de4tvi+w8hf2FwN6NcY/cqMAMnWM1FIef6EDYIg2TvQBBfDJh6brIwoAfJQnYJwGOPM003UGDTBe/ySoxv8qwNlbTNc5NAAM1M1/gArYljFd26gAqJ0zxRoNiNXMP6HRAKieuQ42HjBYNf+HxgNAvX4QtgMQVq2/yEYAW88yB5Arqzh+EAactPvTbPbrl84zAQB/GZASBtz8eTZfvz9mApAqr7+BKOD0b7Oluts4AEqref3CgD3l/OyXW40D1hRH4mOigE3/VgDZ+40DxgpjdDeIAq5W5WefNg4Adx7QIwx4WA14wQSgJw9ICAMuVAMeNwFI5NffJ4UBx/+qAtxqAjCZW933gDAg82Ql//Vja/5t8yw/ADwKIGgAcMLbpfwfz63Nv+DyWX5AUAFEDQAyp75YyH/3srp8QqoFuoCoAkgbAWQyd+1+473nHz2Rkl8j0AWkJakdjAGoVcgn5NJZTgC014xFzAFK+VUCfYBL8loHqOQrghk+gFcKWAZQ5xNyyQwXICCFrAJU51cE+oCQFLEIsPkiQqgCfUBEiosAjtPM31iXXxLoA+JSUgBwwxUbBPKLAn1AUhrmB1xHyI4NAvmEbJ9hAYalEW7ATblLUgVa+YpgjgEYkSZ4ATcWLkkRbLyYEG2BPmCCG3BN6ZJ1Ar18RXA+A8D5E1w/RTQE+vmE3ML4CfhuwmunVJesErDyyTzjJuR6DKvyqwTMfAYgyfUiqslXCeaY+QxAnOdVvHOq7qpFAUc+AxDh+BjtnKZcNi/gyWcAQuzP8ZXT1OsqgrntxDQgwByQXDWtceEdJ3PlMwBe1pBMM5+QU4gFABdjUHrvNDFb84xBqf6wfJ7gAtKsiQk2IMqammEDgqzJKTbAw5qeIwPy03PdBQpkQIK5RIMM6GEuUiED3MxlOlxAcZlOb6ESF7CGvVSLC+hkL1ajAlIcy/WoAD/HhgUmQLVhob1lgwkI82xaHfjMdB3g2bTS3LZD2j2v27bT3LhEBHRxbd3iAWJ8m9d4gG6+7Xs0wABnAwMWgNLAQG/hwAL4nNjEYnsbj/2NTOVWLmyAZitXqZkNGTDawWrn+woLsI/VzldsaHwTC/Ays6Gx0NL5HBbgKXZLZ76p9c4PcPLfuo3d1Fpo633kHZT8B3naeguNzXfsevXj/ZbWvleevZ2vsdn+1m77m9vtb++3/4CD/Uc87D/k4oBjPvYfdLL/qJcDDrvZf9zPAQceHXDk0wGHXh1w7NcBB5+dcPTbAYffMY7//w+oKDwa16W7IgAAAABJRU5ErkJggg==";
let videoIcon = "data:image/png;base64,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";
let audioIcon = "data:image/png;base64,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";

var Media = fabric.util.createClass(
    fabric.Object,
    {
        type: 'image',
        tag: 'media',
        H_PADDING: 1,
        V_PADDING: 1,
        originX: 'center',
        originY: 'center',
        /**
         *
         * @param data
         * @param mimeType
         * @param options
         */
        initialize: function (data, options) {
            this.callSuper('initialize', options);
            this.set("data",data);
            let mimeType = data.substring(data.indexOf(':')+1, data.indexOf(';'));
            this.set("mime",mimeType);
            this.image = new Image();
            switch(mimeType.substring(0,5)){
                case "image":
                    this.image.src = imageIcon;
                    break;
                case "video":
                    this.image.src = videoIcon;
                    break;
                case "audio":
                    this.image.src = audioIcon;
                    break;
                default:
                    this.image.src = defaultIcon;
                    break;
            }
            this.image.onload = (function() {
                // this.image.scaleToWidth(48);
                // this.image.scaleToHeight(48);
                this.width = 50 + this.H_PADDING * 2;
                this.height = 50 + this.V_PADDING * 2;
                this.loaded = true;
                this.setCoords();
                this.fire('image:loaded');
            }).bind(this);
        },

        _render: function (ctx) {
            if (this.loaded) {
                ctx.fillStyle = '#fff';
                ctx.fillRect(
                    -(this.width / 2) - this.H_PADDING,
                    -(this.height / 2) - this.H_PADDING,
                    this.width + this.H_PADDING * 2,
                    this.height + this.V_PADDING * 2);
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, 50, 50);
            }
        },

        show: function () {
            getPreviewDialog(this.data, this.mime)
        },

        toObject: function(propertiesToInclude) {

            return fabric.util.object.extend(
                this.callSuper(
                    'toObject',
                    ['crossOrigin', 'alignX', 'alignY', 'meetOrSlice'].concat(propertiesToInclude)
                ), {
                    src: this.image.src,
                    data: this.data
                });
        },

        toSVG: function(reviver) {
            let markup = this._createBaseSVGMarkup();
            let preserveAspectRatio = 'none';
            // let x = left, y = top;

            markup.push(
                '<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n',
                '<image ', this.getSvgId(), 'xlink:href="', this.image.src,
                '" x="', this.x, '" y="', this.y,
                // '" meetOrSlice="', "media",
                // '" style="', this.getSvgStyles(),
                // we're essentially moving origin of transformation from top/left corner to the center of the shape
                // by wrapping it in container <g> element with actual transformation, then offsetting object to the top/left
                // so that object's center aligns with container's left/top
                '" width="', this.width,
                '" toBeParsed="', true,
                '" height="', this.height,
                '" preserveAspectRatio="', this.data,
                // '" data="', this.data ,
                '" ></image>\n'
            );

            markup.push('</g>\n');

            return reviver ? reviver(markup.join('')) : markup.join('');
        },

        toString: function() {
            return '#<fabric.Image: { src: "' + this.image.src + '", data:"' + this.data +'"}>';
        },
    }
);

function getPreviewDialog(data, mimeType) {
    let type = mimeType.substring(0, mimeType.indexOf('/'));

    let div = $("<div />");

    switch (type){
        case "image":
            div.attr("title", "Image").appendTo(div);
            let source = $("<img width='500' height='450' />");
            source.attr("src", data).css({width: "100%", height: "100%" }).appendTo(div);
            div.dialog({
                width: 500,
                height: 520,
                close : function () {
                    $(this).dialog('destroy');
                }
            });
            break;

        case "audio":
            div.attr("title", "Audio clip").appendTo(div);
            let audio = $("<audio />").attr("autoplay", true).attr("controls", true).css({width: "100%", height: "50px" }).appendTo(div);
            $("<source />").attr("src", data).appendTo(audio);
            div.dialog({
                width: 500,
                height: 120,
                close : function () {
                    $(this).dialog('destroy');
                }
            });
            break;

        case "video":
            div.attr("title", "Video clip").appendTo(div);
            let video = $("<video />").attr("autoplay", true).attr("controls", true).css({width: "100%", height: "90%" }).appendTo(div);
            $("<source />").attr("src", data).attr("type", mimeType).appendTo(video);
            div.dialog({
                width: 500,
                height: 500,
                close : function () {
                    $(this).dialog('destroy');
                }
            });
            break;
    }
}