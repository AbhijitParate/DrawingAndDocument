/**
 * Created by abhij on 3/7/2017.
 */
$(document).ready(function() {
    var progressbar = $( "#progressbar" );
    var progressLabel = $( ".progress-label" );

    var uploadDialog =  $( "#dialog-upload-progress" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        autoOpen: false,
        open: function() {
            saveData()
        }
    });

    progressbar.progressbar({
        value: 0,
        change: function() {
            progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
        },
        complete: function () {

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

    var formData = new FormData();

    function saveData() {
        prepareForm();
        saveSVG(formData);
        saveAttachments(formData);
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
        request.open("POST","upload.form");

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
});