
/*
 * Created by abhijit on 12/7/16.
 */

$(document).ready(function() {
    $(document).ready(function() {
        console.log("Document ready.");
        var url = "/openmrs/ws/rest/v1/annotation/encounter/get?encounterid="+encounterId;
        $.getJSON(
            //emr.fragmentActionLink("annotation", "drawingDetails", "getEncounterDetails", { encounterId: encounterId })
            url
        ).success(function(data){
            $("#drawing").attr("src", "../ws/rest/v1/annotation/obs/" + data.drawing.uuid + "/drawing.svg");
        });
    });
} );
