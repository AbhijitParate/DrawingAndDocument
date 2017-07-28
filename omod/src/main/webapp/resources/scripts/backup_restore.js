/**
 * Created by abhij on 7/25/2017.
 */
$(document).ready(function() {

    if (pageMode === "add" || pageMode === "edit") {
        $("#backup").remove();
    } else {
        $("#restore").remove();
        $("#header-backup-restore").html("Backup");
    }

    $("#backup").click(function () {
        console.log("backup");
        loadDataFromEncounter();
    });

    function loadDataFromEncounter() {
        var url = "../ws/rest/v1/docsanddrawing/encounter/get?encounterid="+encounterId;

        $.getJSON(url,
            function success(data) {
                // console.log(data);
                downloadAndZip(data);
            })
            .fail(function() {
                console.log( "error" );
                // emr.errorMessage("Failed to load Encounter!");
            })
            .always(function() {
                console.log( "complete" );
                // emr.successMessage("Encounter loaded successfully!");
            });
    }

    function downloadAndZip(data) {
        var zip = new JSZip();

        var count = 0;
        var zipFilename = patientIdentifier + "_" + getTimeStamp() + ".drw";

        var urls = [];

        urls.push("../ws/rest/v1/docsanddrawing/obs/" + data.json.uuid +"/"+data.json.name);

        // urls.push("../ws/rest/v1/docsanddrawing/obs/" + data.drawing.uuid +"/"+data.drawing.name);

        data.obs.forEach(function (o) {
            urls.push("../ws/rest/v1/docsanddrawing/obs/" + o.uuid +"/"+o.name);
        });

        urls.forEach(function(url){
            let filename = url.substring(url.lastIndexOf('/')+1);
            // loading a file and add it in a zip file
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if(err) {
                    throw err; // or handle the error
                }
                zip.file(filename, data, {binary:true});
                count++;
                if (count === urls.length) {
                    zip.generateAsync({type: "blob"})
                        .then(function (content) {
                            saveAs(content, zipFilename);
                        });
                }
            });
        });
    }

    $("#restore").click(function () {
        // console.log("restore");
        getInputTag().click();
    });

    function handleFile(file) {
        attachments = [];
        JSZip.loadAsync(file)
            .then(function(zip) {
                zip.forEach(function (relativePath, zipEntry) {
                    zipEntry
                        .async('blob')
                        .then(function (fileData) {
                            // console.log(fileData);
                            let f = new File([fileData], zipEntry.name);
                            if(f.name.endsWith(".drawing")){
                                let r = new FileReader();
                                r.onload = function(e) {
                                    let contents = e.target.result;
                                    canvas.loadFromJSON(contents,
                                        function onLoad() {
                                            canvas.renderAll();
                                        });
                                };
                                r.readAsText(f);
                            } else if (f.name.startsWith("audio")) {
                                addAttachment(f.name, "audio", f);
                            } else if (f.name.startsWith("video")) {
                                addAttachment(f.name, "video", f);
                            } else if (f.name.startsWith("image")) {
                                addAttachment(f.name, "image", f);
                            } else if (f.name.startsWith("note") || f.name.endsWith(".txt")) {
                                addAttachmentNote(f.name, "note", f);
                            } else {
                                addAttachment(f.name, "file", f);
                            }
                        })
                });
            }, function (e) {
                console.error(e);
            });
    }

    function addAttachmentNote(name, type, file) {
        let r = new FileReader();
        r.onload = function(e) {
            let contents = e.target.result;
            contents = "data:text/plain" + contents.slice(5);
            let attachment = new Attachment(name, type, contents);
            attachments.push(attachment);
            // console.log(attachment);
        };
        r.readAsDataURL(file);
    }

    function addAttachment(name, type, file) {
        let r = new FileReader();
        r.onload = function(e) {
            let contents = e.target.result;
            contents = "data:" + type+ "/" + getExtension(name) + contents.slice(5);
            let attachment = new Attachment(name, type, contents);
            attachments.push(attachment);
            // console.log(attachment);
        };
        r.readAsDataURL(file);
    }

    function getExtension(f) {
        return f.split('.').pop();
    }

    function getInputTag() {
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","notes[]");
        input.attr("accept",".drw");
        input.on("change", function (e) {
            let file = e.target.files[0];
            // console.info("Note file selected ->" + file.name);
            handleFile(file);
            $(this).attr("value", "");
        });
        return input;
    }
});