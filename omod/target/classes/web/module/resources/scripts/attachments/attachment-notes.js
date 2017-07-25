/**
 * Created by abhij on 3/12/2017.
 */

$(document).ready(function($) {

    //Attach -> image
    $("#attachNote").click(function () {
        // $("#attachmentInput").click();
        createDialog();
    });

    function createUploadNoteDialog(noteFile) {
        // // console.info("createUploadImageDialog ->");
        // // console.info(image);
        let dialog = $("<div/>");
        dialog.attr("title", "Upload notes from system");
        let input = getInputTag(dialog);
        input.appendTo(dialog);

        let wrapperDiv = $("<div />");

        let noteLabel = $("<label />");
        noteLabel.text("Name:");
        noteLabel.css({"margin":"5px"});
        noteLabel.appendTo(wrapperDiv);

        let noteInput = $("<input />");
        noteInput.attr("type", "text");
        noteInput.prop("readonly", true);
        noteInput.appendTo(noteLabel);

        let noteTextArea = $("<textarea />");
        noteTextArea.css({"height":"400", "width":"500", "float":"left","margin-top": "10px"});
        noteTextArea.attr("title","Preview Text");
        noteTextArea.appendTo(wrapperDiv);
        noteTextArea.prop("readonly", true);

        let fileContent;
        let reader = new FileReader();
        reader.onload = (function (e) {
            fileContent = e.target.result;
            noteTextArea.val(fileContent);
        });
        reader.readAsText(noteFile);
        noteInput.val(noteFile.name);

        wrapperDiv.appendTo(dialog);

        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: "#canvasWrapper",
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "550",
            open: function () {
                // console.info("Upload audio dialog opened");
            },
            close: function () {
                // console.info("Upload audio dialog closed");
                $(this).dialog("destroy");
            },
            autoOpen: false,
            buttons: {
                // "New note": function () {
                //     createNewNoteDialog();
                //     $(this).dialog("close");
                // },
                "Reselect": function () {
                    input.click();
                },
                "Attach": function () {
                    // console.info("Attach file code here");
                    let reader = new FileReader();
                    reader.onload = (function (e) {
                        let attachment = new Attachment(noteFile.name, "note", e.target.result );
                        attachments.push(attachment);
                    });
                    reader.readAsDataURL(noteFile);
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $(this).dialog("close");
                },
            }
        });
        dialog.dialog("open");
    }

    function createNewNoteDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Upload notes from device");
        let inputTag = getInputTag(dialog);
        inputTag.appendTo(dialog);

        let wrapperDiv = $("<div />").css({
            margin:'5px',
        });

        let noteLabel = $("<label />");
        noteLabel.text("Name:");
        noteLabel.css({"margin":"5px"});
        noteLabel.appendTo(wrapperDiv);

        let noteInput = $("<input />");
        noteInput.attr("type", "text");
        noteInput.appendTo(noteLabel);

        let noteTextArea = $("<textarea />");
        noteTextArea.css({"height":"400", "width":"500", "float":"left","margin-top": "10px"});
        noteTextArea.attr("title","Preview Text");
        noteTextArea.appendTo(wrapperDiv);

        var attachBtn, clearBtn, uploadBtn;

        let validate = function () {
            if(noteInput.val() !== "" && noteTextArea.val() !== ""){
                attachBtn.button("enable");
                clearBtn.button("enable");
            } else {
                attachBtn.button("disable");
                clearBtn.button("disable");
            }
        };

        noteInput.on("input", validate);
        noteTextArea.on("change keyup paste", validate);
        let attachment;

        wrapperDiv.appendTo(dialog);

        dialog.dialog({
            modal:true,
            resizable: true,
            position: {
                of: window,
                at: "center center",
                my: "center center"
            },
            height: "auto",
            width: "550",
            open: function () {
                // console.info("Record audio dialog opened");
                attachBtn = $(".ui-dialog-buttonpane button:contains('Attach')");
                clearBtn = $(".ui-dialog-buttonpane button:contains('Clear')");
                uploadBtn = $(".ui-dialog-buttonpane button:contains('Upload')");

                attachBtn.button("disable");
                clearBtn.button("disable");

            },
            close: function () {
                $(this).dialog("destroy");
            },
            autoOpen: false,
            buttons: {
                // "Upload from system" : function() {
                //     // console.info("Upload clicked");
                //     inputTag.click();
                // },
                "Clear": function () {
                    // console.info("Retry clicked");
                    $(this).dialog("destroy");
                    createNewNoteDialog();
                },
                "Attach": function () {
                    // console.info("Attach clicked");
                    saveAttachment();
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $(this).dialog("close");
                },
            }
        });

        function saveAttachment() {
            // console.info("Save attachment code here");
            let noteName = noteInput.val();
            let textToWrite = noteTextArea.val();
            let newAttachmentNotes = new Attachment(noteName + ".txt", "note", btoa(textToWrite));
            attachments.push(newAttachmentNotes);
            // console.info( "Attaching -> " + newAttachmentNotes);
        }

        dialog.dialog("open");
    }

    function createDialog() {
        let dialog = $("<div/>");
        dialog.attr("title", "Attach Notes");
        let inputTag = getInputTag(dialog);
        inputTag.appendTo(dialog);
        $("<button />").css('margin', '10px').text("Upload from device").button().on("click", function () {
            inputTag.click();
        }).appendTo(dialog);
        $("<p />").appendTo(dialog);
        $("<button />").css('margin', '10px').text("Create new note").button().on("click", function () {
            createNewNoteDialog();
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
                // console.info("Notes dialog opened");
            },
            close: function () {
                // console.info("Notes dialog closed");
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

    function getInputTag(dialog) {
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","notes[]");
        input.attr("accept","text/*");
        input.on("change", function (e) {
            let file = e.target.files[0];
            // console.info("Note file selected ->" + file.name);
            createUploadNoteDialog(file);
            dialog.dialog("close");
        });
        return input;
    }

});