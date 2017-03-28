
/*
 * Created by abhijit on 12/7/16.
 */

$(document).ready(function() {
    $(document).ready(function() {
        console.log("Document ready.")
        $.getJSON(
            emr.fragmentActionLink("annotation", "drawingDetails", "getEncounterDetails", { encounterId: encounterId })
        ).success(function(data){
            $("#drawing").attr("src", "../ws/rest/v1/annotation/obs/" + data.drawing.uuid + "/drawing.svg");
        });
    });
} );
