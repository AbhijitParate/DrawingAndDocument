/**
 * Created by abhij on 3/12/2017.
 */

$(document).ready(function($) {

    //Attach -> image
    $("#attachAudio").click(function () {
        createDialog();

    });

    function getInputTag(dialog) {
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","audio[]");
        input.attr("accept","audio/*");
        input.on("change", function (e) {
            let audio = e.target.files[0];
            console.info("Audio selected ->");
            console.info(audio);
            createUploadAudioDialog(audio);
            dialog.dialog("close");
        });
        return input;
    }

    function createDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Attach Audio");
        let inputTag = getInputTag(dialog);
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
                of: window,
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

    function createUploadAudioDialog(video) {
        // console.info("createUploadImageDialog ->");
        // console.info(image);
        let dialog = $("<div/>");
        dialog.attr("title", "Upload audio from device");
        let input = getInputTag(dialog);
        input.appendTo(dialog);

        let audioTag = $("<audio />");
        audioTag.css("width","450px");
        audioTag.css("max-height","400px");
        audioTag.attr("controls", "");
        audioTag.attr("autoplay", "");
        let previewVideo;
        let reader = new FileReader();
        reader.onload = (function (e) {
            previewVideo = e.target.result;
            audioTag.attr("src",previewVideo);
        });
        reader.readAsDataURL(video);
        audioTag.appendTo(dialog);

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
                console.info("Upload audio dialog opened");
            },
            close: function () {
                console.info("Upload audio dialog closed");
                $(this).dialog("destroy");
            },
            autoOpen: false,
            buttons: {
                // "Mic": function () {
                //     createRecordDialog();
                //     $(this).dialog("close");
                // },
                "Reselect": function () {
                    input.click();
                },
                "Attach": function () {
                    console.info("Attach file code here");
                    let attachment = new Attachment(video.name, "audio", previewVideo );
                    attachments.push(attachment);
                    $(this).dialog("destroy");
                },
                "Cancel": function () {
                    $(this).dialog("destroy");
                },
            }
        });
        dialog.dialog("open");
    }

    function createRecordDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Record audio from mic");
        let inputTag = getInputTag(dialog);
        inputTag.appendTo(dialog);
        let wrapperDiv = $("<div/>").appendTo(dialog);
        let audioTag = $("<audio/>").addClass("video-js vjs-default-skin");
        audioTag.attr("id","myAudio");
        audioTag.appendTo(wrapperDiv);
        let attachment;
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
            width: 633,
            height: 450,
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
                        attachment = new Attachment("audio_"+getTimeStamp()+".wav", "audio", e.target.result );
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
                // "Upload from system" : function() {
                //     console.info("Upload clicked");
                //     inputTag.click();
                // },
                "Retry": function () {
                    console.info("Retry clicked");
                    $(this).dialog("destroy");
                    createRecordDialog();
                },
                "Attach": function () {
                    console.info("Attach clicked");
                    saveAttachment();
                    $(this).dialog("destroy");
                },
                "Cancel": function () {
                    console.info("Camera dialog closed");
                    $(this).dialog("destroy");
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
            attachments.push(attachment);
        }

        dialog.dialog("open");
    }
    
});