$(function() {
    $(document).on('click','.view-details.collapsed', function(event){
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
        // var viewUrl = $(event.target).attr("data-view-url");
        var editUrl = $(event.target).attr("data-edit-url");
        // var dataMode = $(event.target).attr("data-mode");
        //
        // // if (dataMode == "edit" && editUrl) {
        //     console.debug("Mode edit");
            editUrl = editUrl.replace("{{patientId}}", patientId).replace("{{patient.uuid}}", patientId)
                .replace("{{encounterId}}", encounterId).replace("{{encounter.id}}", encounterId);
        //     emr.navigateTo({ applicationUrl: editUrl });
        // // } else if(dataMode == "view" && viewUrl){
        // //     console.debug("Mode view");
        //     viewUrl = viewUrl.replace("{{patientId}}", patientId).replace("{{patient.uuid}}", patientId)
        //         .replace("{{encounterId}}", encounterId).replace("{{encounter.id}}", encounterId);

        // // }

        console.debug(editUrl);
        emr.navigateTo({ applicationUrl: editUrl });
    });

    // //We cannot assign it here due to Jasmine failure:
    // //net.sourceforge.htmlunit.corejs.javascript.EcmaError: TypeError: Cannot call method "replace" of undefined
    var detailsTemplates = {};

    function getEncounterDetails(encounterId, dataTarget, templateId) {

    console.debug("encounterId ->" + encounterId);
    console.debug("dataTarget -> " + dataTarget);
    console.debug("displayTemplateId ->" + templateId);

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
            $('.obs-preview').lightcase();
            // console.debug(data);
        }).error(function(err){
            emr.errorAlert(err);
            encounterDetailsSection.html("<p>Error Occurred</p>");
            // console.debug(err);
        });
    }

    function generateHtml(data) {
        var html = "<div><ul>";

        data.obs.forEach(function(obs) {
            if(obs.name.includes("svg")) {
                html += "<li>"
                        + "<a class='obs-preview' href='../../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+obs.name +"' " + ">"
                        + "<img src='../../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+encodeURIComponent(obs.name)+"' alt='"+ obs.name +"' style='width: 100px; height: 100px; margin: 1%'/>"
                        + "</a>" +
                        "</li>";
            } else
                if(obs.name.includes("jpg")) {
                html += "<li>"
                        + "<a class='obs-preview' target='_blank' href='../../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+encodeURIComponent(obs.name) +"'>"
                        + "<img src='../../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+encodeURIComponent(obs.name)+"' alt='"+ obs.name +"' style='width: 100px; height: 100px; margin: 1%'/>"
                        + "</a>" +
                        "</li>";
            } else {
                html += "<li><a class='obs-preview' target='_blank' href='../../ws/rest/v1/annotation/obs/" + obs.uuid +"/"+encodeURIComponent(obs.name)+"' " +
                        "style='width: 100px; height: 100px; margin: 1%'>" + obs.name+
                        "</a></li>";
            }
        });
        html += "</ul></div>";
        return html;
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