/**
 * Created by abhij on 3/12/2017.
 *
 */

$(document).ready(function($) {

    //Attach -> image
    $("#attachVideo").click(function () {
        // $("#attachmentInput").click();
        createDialog();
    });

    function getInputTag(dialog) {
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","video[]");
        input.attr("accept","video/*");
        input.on("change", function (e) {
            let video = e.target.files[0];
            console.info("Video selected ->");
            console.info(video);
            createUploadVideoDialog(video);
            dialog.dialog("destroy");
        });
        return input;
    }

    function createDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Attach Video");
        let input = getInputTag(dialog);
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
                of: window,
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

    function createUploadVideoDialog(video) {
        // console.info("createUploadImageDialog ->");
        // console.info(image);
        let dialog = $("<div/>");
        dialog.attr("title", "Upload video from system");
        let input = getInputTag(dialog);
        input.appendTo(dialog);
        let videoTag = $("<video />");
        videoTag.css("max-width","600px");
        videoTag.css("max-height","600px");
        videoTag.attr("controls", "");
        videoTag.attr("autoplay", "");
        let previewVideo;
        let reader = new FileReader();
        reader.onload = (function (e) {
            previewVideo = e.target.result;
            videoTag.attr("src",previewVideo);
        });
        reader.readAsDataURL(video);

        videoTag.appendTo(dialog);
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: window,
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "auto",
            open: function () {
                console.info("Upload video dialog opened");
            },
            close: function () {
                console.info("Upload video dialog closed");
                $(this).dialog("destroy");
            },
            autoOpen: false,
            buttons: {
                "Web-cam": function () {
                    createWebcamDialog();
                    $(this).dialog("destroy");
                },
                "Reselect": function () {
                    input.click();
                },
                "Attach": function () {
                    console.info("Attach file code here");
                    let attachmentVideo = new Attachment(video.name, "video", previewVideo );
                    attachments.push(attachmentVideo);
                    $(this).dialog("destroy");
                },
                "Cancel": function () {
                    $(this).dialog("destroy");
                },
            }
        });
        dialog.dialog("open");
    }

    function createWebcamDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Capture video from camera");
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","videos[]");
        input.attr("accept","video/*");
        input.on("change", function (e) {
            let image = e.target.files[0];
            console.info("Image selected ->");
            console.info(image);
            createUploadVideoDialog(image);
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
        let imageDiv = $("<div/>").css('text-align', '-webkit-center').appendTo(dialog);
        let video = $("<video/>").addClass("video-js vjs-default-skin");
        video.attr("id","myVideo");
        video.appendTo(imageDiv);
        let attachmentImage;
        let player;
        var attachBtn, retryBtn, uploadBtn;
        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: window,
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
                            audio: true,
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
                    console.info("finished recording");
                    let data = player.recordedData;

                    let fr = new FileReader();
                    fr.onload = function(e) {
                        attachmentImage = new Attachment("video_"+getTimeStamp()+".webm", "video", e.target.result );
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
            attachments.push(attachmentImage);
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
                                audio: true,
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
                    player.reset();
                    dialog.dialog({
                        width: 477,
                        height: 240 + 180,
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
                                audio: true,
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
                    player.reset();
                    dialog.dialog({
                        width: 640+33,
                        height: 480 + 180,
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
                                audio: true,
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
                    player.reset();
                    dialog.dialog({
                        width: 1024+33,
                        height: 768 + 180,
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
                                audio: true,
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
                    dialog.dialog({
                        width: 1280+33,
                        height: 720 + 180,
                    });
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
                    attachmentImage = new Attachment("video_"+getTimeStamp()+".webm", "video", e.target.result );
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