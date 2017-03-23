$(function() {
    $(document).on('click','.drawing-details.collapsed', function(event){
        var jqTarget = $(event.currentTarget);
        var encounterId = jqTarget.data("encounter-id");
        var displayWithHtmlForm = jqTarget.data("encounter-form") && jqTarget.data("display-with-html-form");
        var dataTarget = jqTarget.data("target");
        var templateId = jqTarget.data("template");
        getEncounterDetails(encounterId, dataTarget, templateId);
    });

    $(document).on('click', '.deleteEncounterId', function(event) {
        var encounterId = $(event.target).attr("data-encounter-id");
        createDeleteEncounterDialog(encounterId, $(this));
        showDeleteEncounterDialog();
    });

    $(document).on('click', '#drawing-view-encounter', function(event) {
        console.debug("View encounter");
        var encounterId = $(event.target).attr("data-encounter-id");
        var patientId = $(event.target).attr("data-patient-id");
        var viewUrl = $(event.target).attr("data-view-url");
        viewUrl = viewUrl.replace("{{patientId}}", patientId).replace("{{patient.uuid}}", patientId)
                .replace("{{encounterId}}", encounterId).replace("{{encounter.id}}", encounterId);
        console.debug(viewUrl);
        emr.navigateTo({ applicationUrl: viewUrl });
    });

    $(document).on('click', '#drawing-edit-encounter', function(event) {
        console.debug("Edit encounter");

        var encounterId = $(event.target).attr("data-encounter-id");
        var patientId = $(event.target).attr("data-patient-id");
        var visitId = $(event.target).attr("data-visit-id");
        var editUrl = $(event.target).attr("data-edit-url");
        editUrl = editUrl.replace("{{patientId}}", patientId).replace("{{patient.uuid}}", patientId)
            .replace("{{encounterId}}", encounterId).replace("{{encounter.id}}", encounterId);
        editUrl += "&visitId=" + visitId;
        console.debug(editUrl);
        emr.navigateTo({ applicationUrl: editUrl });
    });

    $(document).on('click', '#drawing-popup-encounter', function(event) {
        console.debug("Edit encounter");

        var encounterId = $(event.target).attr("data-encounter-id");
        var patientId = $(event.target).attr("data-patient-id");
        var visitId = $(event.target).attr("data-visit-id");
        var popupUrl = $(event.target).attr("data-popup-url");
        popupUrl = popupUrl.replace("{{patientId}}", patientId).replace("{{patient.uuid}}", patientId)
            .replace("{{encounterId}}", encounterId).replace("{{encounter.id}}", encounterId);
        popupUrl += "&visitId=" + visitId;
        console.debug(popupUrl + " clicked");
        // emr.navigateTo({ applicationUrl: popupUrl });
        window.open("../../"+popupUrl, 'Drawing popup', 'window settings');
    });

    // //We cannot assign it here due to Jasmine failure:
    // //net.sourceforge.htmlunit.corejs.javascript.EcmaError: TypeError: Cannot call method "replace" of undefined
    var detailsTemplates = {};

    function getEncounterDetails(encounterId, dataTarget, templateId) {

    // console.debug("encounterId ->" + encounterId);
    // console.debug("dataTarget -> " + dataTarget);
    // console.debug("displayTemplateId ->" + templateId);

    var encounterDetailsSection = $(" .encounter-details-" + encounterId);

        if(encounterDetailsSection.html() == "") {
            encounterDetailsSection.html("<i class=\"icon-spinner icon-spin icon-2x pull-left\"></i>");
        }
        $.getJSON(
            //emr.fragmentActionLink("[module name]", "[lower(c)ontroller name]FragmentController", "[function name]", { [parameter name]: [parameter value] })
            emr.fragmentActionLink("annotation", "drawingDetails", "getEncounterDetails", { encounterId: encounterId })
        ).success(function(data){
            // this is where data is received from DrawingDetailsFragmentController#getEncounterDetails as json

            var html = generateHtml(data);
            encounterDetailsSection.html(html);
            $('.obs-preview').lightcase({
                shrinkFactor:0.5,
                maxWidth : 800,
                maxHeight : 800,
                forceWidth:true,
                forceHeight: true,
                liveResize:true,
                type:'iframe',
                iframe : {
                    width : 800,
                    height :800,
                }
            });
            // console.debug(data);
        }).error(function(err){
            emr.errorAlert(err);
            encounterDetailsSection.html("<p>Error Occurred</p>");
            // console.debug(err);
        });
    }

    function generateHtml(data) {
        var main = $("<div/>").addClass("details");
        var drawingDiv = createDrawingDiv(data.drawing);
        var attachmentDiv = createAttachmentsDiv(data.obs);
        drawingDiv.appendTo(main);
        attachmentDiv.appendTo(main);
        return main;
    }

    function createListItem(obs) {
        var a = $("<a/>").addClass("attachments-list-item")
            .attr("href", "../../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+obs.name)
            .attr("title", obs.name)
            .text(obs.name).lightcase();
        return $("<li/>").append(a);
    }

    function createAttachmentsDiv(obsArray) {
        var attachmentDiv = $("<div/>").addClass("attachments-container");
        var icon = $("<i/>").addClass("icon-paper-clip");
        var heading = $("<h5/>").append(icon).append("Attachments").addClass("header");
        var list = $("<ul/>").addClass("attachments-list");
        attachmentDiv.append(heading);

        obsArray.forEach(function (obs) {
            list.append(createListItem(obs));
        });
        attachmentDiv.append(list);
        return attachmentDiv;
    }

    function createDrawingDiv(drawing) {
        var drawingDiv = $("<div/>").addClass("drawing");
        var icon = $("<i/>").addClass("icon-picture");
        var heading = $("<h5/>").append(icon).append("Drawing").addClass("header");
        var div = $("<div/>").addClass("drawing-container");
        var a = $("<a/>").attr("href", "../../ws/rest/v1/annotation/obs/" + drawing.uuid +"/"+drawing.name).lightcase();
        var img = $("<img/>").attr("src", "../../ws/rest/v1/annotation/obs/" + drawing.uuid +"/"+drawing.name)
                     .attr("width", "450").attr("height", "450");
        a.append(img);
        div.append(a);
        drawingDiv.append(heading);
        drawingDiv.append(div);
        return drawingDiv;
    }

    var editPatientIdentifierDialog = null;
    var deleteEncounterDialog= null;
    var deleteVisitDialog= null;

    function showEditPatientIdentifierDialog () {
        editPatientIdentifierDialog.show();
        return false;
    }

    function showDeleteEncounterDialog () {
        deleteEncounterDialog.show();
        return false;
    }

    function showDeleteVisitDialog () {
        deleteVisitDialog.show();
        return false;
    }

    function showEndVisitDialog () {
        endVisitDialog.show();
        return false;
    }

    function createDeleteEncounterDialog(encounterId, deleteElement) {
        deleteEncounterDialog = emr.setupConfirmationDialog({
            selector: '#delete-encounter-dialog',
            actions: {
                confirm: function() {
                    jq('#delete-encounter-dialog' + ' .icon-spin').css('display', 'inline-block').parent().addClass('disabled');
                    emr.getFragmentActionWithCallback('coreapps', 'visit/visitDetails', 'deleteEncounter'
                        , { encounterId: encounterId}
                        , function(data) {
                            emr.successMessage(data.message);
                            deleteEncounterDialog.close();
                            jq('#delete-encounter-dialog' + ' .icon-spin').css('display', 'none').parent().removeClass('disabled');
                            var visitId = deleteElement.attr("data-visit-id");
                            var encounterElement = deleteElement.parents("li:first");
                            if(encounterElement!=null && encounterElement!=undefined){
                                encounterElement.remove();
                            }
                            //
                            $(".viewVisitDetails[data-visit-id=" + visitId + "]").click();
                        },function(err){
                            emr.handleError(err);
                            deleteEncounterDialog.close();
                            jq('#delete-encounter-dialog' + ' .icon-spin').css('display', 'none').parent().removeClass('disabled');
                        });
                },
                cancel: function() {
                    deleteEncounterDialog.close();
                }
            }
        });
    }

    function createDeleteVisitDialog(visitId, patientId) {
        deleteVisitDialog = emr.setupConfirmationDialog({
            selector: '#delete-visit-dialog',
            actions: {
                confirm: function() {
                    emr.getFragmentActionWithCallback('coreapps', 'visit/visitDetails', 'deleteVisit'
                        , { visitId: visitId}
                        , function(data) {
                            jq('#delete-visit-dialog' + ' .icon-spin').css('display', 'inline-block').parent().addClass('disabled');
                            emr.navigateTo({
                                provider: 'coreapps',
                                page: 'patientdashboard/patientDashboard',
                                query: { patientId: patientId }
                            });
                        },function(err){
                            emr.handleError(err);
                            deleteVisitDialog.close();
                        });
                },
                cancel: function() {
                    deleteVisitDialog.close();
                }
            }
        });
    }
});