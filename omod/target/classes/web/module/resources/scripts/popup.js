
/*
 * Created by abhijit on 12/7/16.
 */

$(document).ready(function() {
    $(document).ready(function() {
        console.log("Document ready.");
        var url = "../ws/rest/v1/docsanddrawing/encounter/get?encounterid="+encounterId;
        $.getJSON(
            //emr.fragmentActionLink("docsanddrawing", "drawingDetails", "getEncounterDetails", { encounterId: encounterId })
            url
        ).success(function(data){
            $("#drawing").attr("src", "../ws/rest/v1/docsanddrawing/obs/" + data.drawing.uuid + "/drawing.svg");
        });
    });
} );
