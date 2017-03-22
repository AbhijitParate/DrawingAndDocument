/**
 * Created by abhij on 3/21/2017.
 */


$(function() {
    console.log( "ready!" );

    let visits;

    $.getJSON(
        emr.fragmentActionLink("annotation", "compareObservation", "getVisits", { patientId: patientId })
    ).success(function(data){
        console.debug(data);
        visits = data.visits;
        $("#container").append(getListContainer(visits));
    }).error(function(err){
        console.debug(err);
    });

    $("#addMore").on('click', function () {
        $("#container").append(getListContainer(visits));
    })
});

function getListContainer(visits) {
    let listContainer = $("<div />").addClass('list-container');

    let removeList = $("<div />").addClass("remove-list");
    $("<i/>")
    .css({"font-size":"xx-large", "color": "red"})
    .addClass("icon-remove")
    .click(function (){
        listContainer.remove();
    })
    .appendTo(removeList);
    removeList.appendTo(listContainer);

    let visitList = $("<div />").addClass('visit-list');
    visitList.appendTo(listContainer);
    $("<label />").attr("for", "visit-list").text("Visits").appendTo(visitList);
    let emptyVisitDiv = $("<div />").appendTo(visitList);
    let selectVisit = $("<ul />").attr('id',"visit-list-1").attr("size", "6").addClass('selection').appendTo(emptyVisitDiv);
    for (var i = 0; i < visits.length ; i++){
        let date = new Date(visits[i].startDate);
        $("<li />").attr("data-id", visits[i].id)
            .text(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" @ "+visits[i].location)
            .appendTo(selectVisit);
    }

    let encounterList = $("<div />").addClass('encounter-list');
    encounterList.appendTo(listContainer);
    $("<label />").attr("for", "encounter-list-1").text("Encounters").appendTo(encounterList);
    let emptyEncDiv = $("<div />").appendTo(encounterList);
    let selectEnc = $("<ul />").attr('id',"encounter-list-1").attr("size", "6").addClass('selection').appendTo(emptyEncDiv);


    let observationList = $("<div />").addClass('observation-list');
    observationList.appendTo(listContainer);
    $("<label />").attr("for", "observation-list-1").text("Observations").appendTo(observationList);
    let emptyObsDiv = $("<div />").appendTo(observationList);
    let selectObs = $("<ul />").attr('id',"observation-list-1").attr("size", "6").addClass('selection').appendTo(emptyObsDiv);

    let obsPreview = $("<div />").addClass("observation-preview");
    $("<h3 />").text("Preview").appendTo(obsPreview);
    obsPreview.appendTo(listContainer);

    selectVisit.selectable({
        selected: function( event, ui ) {
            "use strict";
            console.info($(ui.selected).attr('data-id'));
            let visitId = $(ui.selected).attr('data-id');
            $.getJSON(
                emr.fragmentActionLink("annotation", "compareObservation", "getEncounters", { visitId: visitId })
            ).success(function(data) {
                console.debug(data);
                let encounters = data.encounters;
                selectEnc.empty();
                for (var i = 0; i < encounters.length ; i++){
                    let date = new Date(encounters[i].date);
                    $("<li />")
                        .attr("data-id", encounters[i].id)
                        .text(encounters[i].type +"@"+date.getHours()+":"+date.getMinutes())
                        .appendTo(selectEnc);
                }
            });
        }
    });

    selectEnc.selectable({
        selected: function( event, ui ) {
            "use strict";
            console.info($(ui.selected).attr('data-id'));
            let encId = $(ui.selected).attr('data-id');
            $.getJSON(
                emr.fragmentActionLink("annotation", "compareObservation", "getObservations", { encounterId: encId })
            ).success(function(data) {
                console.debug(data);
                let observations = data.observations;
                selectObs.empty();
                for (var i = 0; i < observations.length ; i++){
                    $("<li />")
                        .attr("data-id", observations[i].uuid)
                        .attr("data-comment", observations[i].comment)
                        .text(observations[i].comment || observations[i].id)
                        .appendTo(selectObs);
                }
            });
        }
    });

    selectObs.selectable({
        selected: function( event, ui ) {
            "use strict";
            console.info($(ui.selected).attr('data-id'));
            let obsComment = $(ui.selected).attr('data-comment');
            let obsUuid = $(ui.selected).attr('data-id');
            obsPreview.empty();
            if(obsComment.includes('jpg') || obsComment.includes('svg') || obsComment.includes('png')){
                $("<img />").attr("src", "../ws/rest/v1/annotation/obs/" + obsUuid + "/" + obsComment)
                    .appendTo(obsPreview);
            } else if(obsComment.includes('webm')) {
                let video = $("<video width='500' height='400' controls autoplay />");
                $("<source />")
                    .attr("src", "../ws/rest/v1/annotation/obs/" + obsUuid + "/" + obsComment)
                    .appendTo(video);
                video.appendTo(obsPreview);
            } else if(obsComment.includes('txt')){
                $("<p />").attr("src", "../ws/rest/v1/annotation/obs/" + obsUuid + "/" + obsComment)
                    .appendTo(obsPreview);
            } else {
                $("<p />").text("Preview not available").appendTo(obsPreview);
            }
        }
    });

    return listContainer;
}