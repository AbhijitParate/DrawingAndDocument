/**
 * Created by abhij on 3/7/2017.
 */
// Attachments related
let attachmentImage;
let attachmentVideo;
let attachmentAudio;
let attachmentNotes;
let attachmentFiles;
let attachments = [];

$(document).ready(function() {
    let attachmentId = 0;

    function Attachment(name, type, data) {
        this.id = attachmentId++;
        this.name = name;
        this.type = type;
        this.data = data;
    }

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
            + (currentDate.getMonth()+1) + "-"
            + currentDate.getFullYear() + "_"
            + currentDate.getHours() + "_"
            + currentDate.getMinutes() + "_"
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
});