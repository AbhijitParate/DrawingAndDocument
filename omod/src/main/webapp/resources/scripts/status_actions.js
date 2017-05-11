/**
 * Created by abhij on 3/7/2017.
 *
 */

$(document).ready(function () {

    console.info(pageMode);

    var progressLabel, progressBar;

    if(pageMode == "view"){
        $("#status-save").hide();
        loadDataFromEncounter();
    } else if (pageMode == "edit"){
        loadDataFromEncounter();
    }

    var previousAttachments;

    function loadDataFromEncounter() {
        console.debug("EcnounterId : " + encounterId);

        // var url = emr.fragmentActionLink("annotation", "drawingDetails", "getEncounterDetails", { encounterId: encounterId });
        var url = "/openmrs/ws/rest/v1/annotation/encounter/get?encounterid="+encounterId;

        console.debug(url);

        $.getJSON(url,
            function success(data) {
                recreateCanvas(data.drawing);
                if(data.obs.length > 0) {
                    previousAttachments = data.obs;
                }
            })
            .fail(function() {
                console.log( "error" );
                emr.errorMessage("Failed to load Encounter!");
            })
            .always(function() {
                console.log( "complete" );
                emr.successMessage("Encounter loaded successfully!");
            });
    }

    function recreateCanvas(drawing) {

        let div = $("<div />");
        $("<img src='./../ms/uiframework/resource/annotation/images/loading.gif' width='100' height='100' />").appendTo(div);
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

        console.debug(drawing);
        fabric.loadSVGFromURL("../ws/rest/v1/annotation/obs/" + drawing.uuid +"/"+drawing.name,
            function(objects, options) {
                console.log(objects);
                let mediaobjs = [];
                for(let i = 0; i < objects.length; i++) {
                    let obj = objects[i];
                    // for our implementation
                    let data = obj.get('preserveAspectRatio');
                    if (data && data.substring(0,4) === "data") {
                        let newObj = new Media(data,{
                            top: obj.transformMatrix[5],
                            left: obj.transformMatrix[4],
                        });
                        mediaobjs.push(newObj);
                        canvas.add(newObj);
                        newObj.on('image:loaded', function () {
                            canvas.renderAll.bind(canvas);
                            canvas.moveTo(newObj, 999);
                        });
                    }
                    // todo: recreate image is buggy, size of image is inconsistent
                    else if (obj.type === "image") {
                        console.log("Image ->");
                        console.log(obj);
                        console.log("<- Image");
                        obj.setTop((canvas.height / 2) + obj.top);
                        obj.setLeft((canvas.width / 2) + obj.left);
                        obj.setTransformMatrix(null);
                        canvas.add(obj);
                    }
                    // todo: recreate text from svg
                    else if (obj.type === "text") {
                        console.log("Text ->");
                        console.log(obj);
                        console.log("<- Text");
                        let text = new fabric.Text(obj.text, {
                            top: obj.transformMatrix[5],
                            left: obj.transformMatrix[4],
                        });
                        canvas.add(text);
                    }
                    else {
                        canvas.add(obj);
                    }
                }

                canvas.renderAll();
                div.dialog('destroy');

            });
    }

    function recreateAttachments(obsArray) {
        console.debug(obsArray);
        // var attachmentDiv = $("<div/>").css('width','100%');;
        var list = $("<ul/>").css('width','100%');

        obsArray.forEach(function (obs) {
            list.append(createListItem(obs));
        });
        // attachmentDiv.append(list);
        return list;
    }

    function createListItem(obs) {
        let listItem = $("<li/>").addClass('attachment-list-item');
        let div = $("<div />").appendTo(listItem);
        let span = $("<span />");

        let icon = $("<i/>");
        icon.addClass("icon-remove");
        icon.attr("data-file", obs.uuid);
        icon.click(function (){
            // todo: remove previous attachment
            // removeAttachment(attachment.id);
            listItem.remove();
        });
        icon.appendTo(span);

        span.appendTo(div);

        let a_view = $("<a/>")
            .attr("href", "../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+obs.name)
            .attr("data-id", obs.uuid)
            .attr("title", obs.name)
            .text(obs.name)
            .lightcase();
        a_view.appendTo(div);
        return listItem;
    }

    // Show list of attachments on click
    $("#status-view-attachments").click(function () {
            createAttachmentDialog();
    });

    function removeAttachment(id) {
        for (let i = 0; i < attachments.length; i++) {
            if (attachments[i].id === id) {
                attachments.splice(i, 1);
                break;
            }
        }
        console.info("file removed");
    }

    function createLocalAttachmentItem(attachment) {
        let listItem = $("<li/>").addClass('attachment-list-item');
        let div = $("<div />").appendTo(listItem);
        let span = $("<span />");

        let icon = $("<i/>");
        icon.addClass("icon-remove");
        icon.attr("data-file", attachment.id);
        icon.click(function (){
            removeAttachment(attachment.id);
            listItem.remove();
        });
        icon.appendTo(span);

        span.appendTo(div);

        let a_view = $("<a/>")
            .attr("href","#")
            .attr("data-id", attachment.id)
            .attr("title", attachment.name)
            .text(attachment.name);
        a_view.click(function () {
            console.info("Attachment ID: " + $(this).attr("data-id"));
            $("#attachmentPreview").empty();
            $("#attachmentPreview").append(getPreviewAttachment($(this).attr("data-id")));
            if(!expanded) expand();
        });
        a_view.appendTo(div);
        return listItem;
    }

    // For reference
    function getPreviewAttachment(id) {

        console.info(id + " clicked.");

        for (let i = 0; i < attachments.length; i++) {
            let attachment = attachments[i];
            console.info("before if " + attachment.id);
            console.info(attachment.id === id);
            if (""+attachment.id === id+"") {
                console.info(attachment.type);
                switch (attachment.type) {
                    case "image":
                        console.info("Image file");
                        return $('<img class="previewWindow" src=' + attachment.data + '>');
                    case "video":
                        console.info("Video file");
                        if (attachment.data instanceof Blob) {
                            let videoReader = new FileReader();
                            videoReader.onloadend = (function (e) {
                                let video = $('<video class="video-js vjs-default-skin previewWindow" controls autoplay>');
                                $('<source src=' + e.target.result + '>').appendTo(video);
                                return video;
                            });
                            videoReader.readAsDataURL(attachment.data);
                        } else {
                            let video = $('<video class="video-js vjs-default-skin previewWindow" controls autoplay>');
                            $('<source src=' + attachment.data + '>').appendTo(video);
                            return video;
                        }

                        console.info("Video data-> " + attachment.data);
                        break;
                    case "audio":
                        console.info("Audio file");
                        if (attachment.data instanceof Blob) {
                            let audioReader = new FileReader();
                            audioReader.onloadend = (function (e) {
                                let audio = $('<audio class="video-js vjs-default-skin previewWindow" controls autoplay>');
                                $('<source src=' + e.target.result + '>').appendTo(audio);
                                return audio;
                            });
                            audioReader.readAsDataURL(attachment.data);
                        } else {
                            let audio = $('<audio class="video-js vjs-default-skin previewWindow" controls autoplay>');
                            $('<source src=' + attachment.data + '>').appendTo(audio);
                            return audio;
                        }

                        console.info("Audio data-> " + attachment.data);
                        break;
                    case "note":
                        console.info("Text file");
                        return $('<textarea class="previewWindow" title="Preview Text" disabled>')
                        .text(atob(attachment.data.replace("data:text/plain;base64,", "")));
                    default:
                        console.info("File attachment");
                        return $('<img class="previewWindow" width="550" height="500" '
                            + 'src="./../ms/uiframework/resource/annotation/images/no-preview.jpg" />');
                }
            }
        }
    }

    function recreateLocalAttachments() {
        var list = $("<ul/>")
            .css({
            });

        attachments.forEach(function (attachment) {
            list.append(createLocalAttachmentItem(attachment));
        });
        return list;
    }

    let expanded = false;

    function expand() {
        let uiDialog = $('.ui-dialog');
        uiDialog.animate({width: '950px'});
        $("#expandButton").empty().append($("<i class='icon-chevron-left'/>"));
        $("#attachmentPreview").css('display','block');
        expanded = true;
    }

    function collapse() {
        let uiDialog = $('.ui-dialog');
        uiDialog.animate({width: '500px'});
        $("#expandButton").empty().append($("<i class='icon-chevron-right'/>"));
        $("#attachmentPreview").css('display','none');
        expanded = false;
    }

    function createAttachmentDialog() {
        let dialog = $("<div/>");
        let previewDiv;
        $("<button id='expandButton' />").append($("<i class='icon-chevron-right'/>"))
        .click(function () {
            if (expanded) {
                collapse();
            } else {
                expand();
            }
        })
        .appendTo(dialog);

        let attachmentDiv = $("<div />").attr("id","attachmentDiv")
            .appendTo(dialog);

        if(attachments != null && attachments.length > 0){
            $("<h4 />").text("New attachments").appendTo(attachmentDiv);
            let localAttachDiv = recreateLocalAttachments();
            localAttachDiv.appendTo(attachmentDiv);
        }

        if(previousAttachments){
            $("<h4 />").text("Previous attachments").appendTo(attachmentDiv);
            let prevAttachDiv = recreateAttachments(previousAttachments);
            prevAttachDiv.appendTo(attachmentDiv);
        }

        previewDiv = $("<div />").attr("id","attachmentPreview")
            .appendTo(dialog);
        $("<img src='./../ms/uiframework/resource/annotation/images/no-preview.jpg' " +
            "width='550' height='500' />").appendTo(previewDiv);

        dialog.attr("title", "Attachments");
        dialog.dialog({
            width: 500,
            height: 700,
            modal:true,
            resizable: true,
            position: {
                // of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            open: function () {
                console.info("Attachments dialog opened");
                if(expanded) expand();
            },
            close: function () {
                console.info("Attachments dialog closed");
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

    // Show list of attachments on clicks
    $("#status-save").click(function () {
        $(this).prop('disabled', true);
        $("#status-cancel").prop('disabled', true);
        $("#status-view-attachments").prop('disabled', true);
        $("#main-container").hide();
        progressLabel = $("<p/>");
        progressBar = $("<div/>").progressbar({
            max: attachments.length,
            value: false,
            change: function() {
                progressLabel.text( "Saving : " + progressBar.progressbar( "value" ) + "%" );
            },
            complete: function() {
                progressLabel.text( "Complete!" );
            }
        });
        $("#progress-container").append(progressLabel).append(progressBar).show();
        saveData();
    });

    $("#status-cancel").click(function () {
        window.location.href = returnlink;
        return false;
    });

    var formData = new FormData();

    function saveData() {
        prepareForm();
        saveSVG(formData);
        saveAttachments(formData);
        savePreviousObs();
        uploadData();
    }

    function prepareForm() {
        formData.append("patientid", patientId);
        formData.append("visitid", visitId);
        formData.append("providerid", providerId);
    }

    function saveSVG() {
        formData.append("files[]", btoa(canvas.toSVG()));
        formData.append("filenames[]", Math.floor(Date.now()) + ".svg" );
    }

    function saveAttachments() {
        for (let i = 0; i < attachments.length; i++) {
            var attachedFile = attachments[i];
            formData.append("files[]", attachedFile.data);
            formData.append("filenames[]", attachedFile.name);
            progressBar.progressbar( "value", i);
        }
    }

    function savePreviousObs() {
        if(previousAttachments) {
            for (let i = 0; i < previousAttachments.length; i++) {
                var obs = previousAttachments[i];
                formData.append("obs[]", obs.uuid);
            }
        }
    }

    function uploadData() {
        //new ajax request
        let request = new XMLHttpRequest();

        //event listener progress
        request.upload.addEventListener('progress',function(event){
            if(event.lengthComputable){
                //get our percentage
                var percent = (Math.round(event.loaded / event.total) * 100);
                console.error( " progress: " + percent + " %");
                // progressBar.progressbar( "value", percent);
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
        request.open("POST","../ws/rest/v1/annotation/upload");

        //set the request header for no caching
        request.setRequestHeader("Cache-Control","no-cache");

        //send the data
        request.send(formData);

        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // progressBar.hide();
                console.info( "success: Upload succeeded");
                console.info( "success: Upload response : " + request.responseText);
                if(request.responseText.includes("success")) {
                    progressLabel.text("Encounter saved successfully!");
                    window.location.href = returnlink;
                    emr.successMessage("Encounter saved successfully!");
                } else {
                    progressLabel.text("Failed to save Encounter!");
                    emr.errorMessage("Failed to save Encounter!");
                }
            }
        };
    }
});