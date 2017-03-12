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

        $.getJSON(emr.fragmentActionLink("annotation", "drawingDetails", "getEncounterDetails", { encounterId: encounterId }),
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
        console.debug(drawing);
        fabric.loadSVGFromURL("../ws/rest/v1/annotation/obs/" + drawing.uuid +"/"+drawing.name, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).renderAll();
        });
    }

    function recreateAttachments(obsArray) {
        console.debug(obsArray);
        var attachmentDiv = $("<div/>");
        var list = $("<ul/>").addClass("attachments-list");

        obsArray.forEach(function (obs) {
            list.append(createListItem(obs));
        });
        attachmentDiv.append(list);
        return attachmentDiv;
    }

    function createListItem(obs) {
        var a = $("<a/>").addClass("attachments-list-item")
            .attr("href", "../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+obs.name)
            .attr("title", obs.name)
            .text(obs.name)
            .css({ display: "block" })
            .lightcase();
        return $("<li/>").append(a);
    }

    // Show list of attachments on click
    $("#status-view-attachments").click(function () {
        if(previousAttachments){
            var dom = recreateAttachments(previousAttachments);
            $("<div/>").attr("title", "Attachments").append(dom).dialog({
                closeText: "hide"
            }).dialog( "open" );
        } else {
            $("#dialog-attachment").dialog("open");
        }
    });

    // Show list of attachments on click
    $("#status-save").click(function () {
        // uploadDialog.dialog("open");
        // $("<p/>").append("Uploading");
        // $("#drawing-and-attachments").hide();
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
        formData.append("patientid", patientid);
        formData.append("visitid", visitid);
        formData.append("providerid", providerid);
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
        request.open("POST","upload.form");

        //set the request header for no caching
        request.setRequestHeader("Cache-Control","no-cache");

        //send the data
        request.send(formData);

        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
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