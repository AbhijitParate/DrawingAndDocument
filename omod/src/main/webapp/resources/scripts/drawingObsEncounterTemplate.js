$(function() {
    $(document).on('click','.view-details.collapsed', function(event){
        var jqTarget = $(event.currentTarget);
        var encounterId = jqTarget.data("encounter-id");
        var displayWithHtmlForm = jqTarget.data("encounter-form") && jqTarget.data("display-with-html-form");
        var dataTarget = jqTarget.data("target");
        var customTemplateId = jqTarget.data("display-template")
        console.warn(jqTarget);
        getEncounterDetails(encounterId, displayWithHtmlForm, dataTarget, customTemplateId ? customTemplateId : "drawingObsEncounterTemplate");
    });

    $(document).on('click', '.deleteEncounterId', function(event) {
        var encounterId = $(event.target).attr("data-encounter-id");
        createDeleteEncounterDialog(encounterId, $(this));
        showDeleteEncounterDialog();
    });

    $(document).on('click', '.editEncounter', function(event) {
        var encounterId = $(event.target).attr("data-encounter-id");
        var patientId = $(event.target).attr("data-patient-id");
        var editUrl = $(event.target).attr("data-edit-url");
        var dataMode = $(event.target).attr("data-mode");
        if (editUrl) {
            editUrl = editUrl.replace("{{patientId}}", patientId).replace("{{patient.uuid}}", patientId)
                .replace("{{encounterId}}", encounterId).replace("{{encounter.id}}", encounterId);
            emr.navigateTo({ applicationUrl: editUrl });
        } else {
            if ("view" == dataMode) {
                emr.navigateTo({
                    provider: "htmlformentryui",
                    page: "htmlform/viewEncounterWithHtmlForm",
                    query: { patient: patientId, encounter: encounterId}
                });
            } else {
                emr.navigateTo({
                    provider: "htmlformentryui",
                    page: "htmlform/editHtmlFormWithStandardUi",
                    query: { patientId: patientId, encounterId: encounterId }
                });
            }
        }
    });

    //We cannot assign it here due to Jasmine failure:
    //net.sourceforge.htmlunit.corejs.javascript.EcmaError: TypeError: Cannot call method "replace" of undefined
    var detailsTemplates = {};

    function getEncounterDetails(id, displayWithHtmlForm, dataTarget, displayTemplateId) {

        console.debug("ID");
        console.warn(id);
        console.debug("displayWithHtmlForm");
        console.warn(displayWithHtmlForm);
        console.debug("dataTarget");
        console.warn(dataTarget);
        console.debug("displayTemplateId");
        console.warn(displayTemplateId);

        var encounterDetailsSection = $(dataTarget + ' .encounter-summary-container');

        if (displayWithHtmlForm) {
            if(encounterDetailsSection.html() == "") {
                encounterDetailsSection.html("<i class=\"icon-spinner icon-spin icon-2x pull-left\"></i>");
            }
            console.debug("Inside if (displayWithHtmlForm)");
            $.getJSON(
                emr.fragmentActionLink("annotation", "drawingDetails", "getEncounterDetails", { encounterId: id })
            ).success(function(data){
                encounterDetailsSection.html("<p>Hello World</p>");
            }).error(function(err){
                emr.errorAlert(err);
            });
        } else {
            console.debug("Inside else (displayWithHtmlForm)");
            if (!detailsTemplates[displayTemplateId]) {
                detailsTemplates[displayTemplateId] = _.template($('#' + displayTemplateId).html());
            }

            var displayTemplate = detailsTemplates[displayTemplateId];

            if(encounterDetailsSection.html() == "") {
                encounterDetailsSection.html("<i class=\"icon-spinner icon-spin icon-2x pull-left\"></i>");
            }
            $.getJSON(
                emr.fragmentActionLink("annotation", "drawingDetails", "getEncounterDetails", { encounterId: id })
            ).success(function(data){
                // encounterDetailsSection.html(displayTemplate(data) + "Hello World");
                encounterDetailsSection.html(displayTemplate(data));
                // encounterDetailsSection.html("<a href\"\" >Hello World</a>");
                console.debug("printing Hello World");
            }).error(function(err){
                emr.errorAlert(err);
                console.debug(err);
            });
            console.debug("getEncounterDetails function ended.");
        }
    }
});