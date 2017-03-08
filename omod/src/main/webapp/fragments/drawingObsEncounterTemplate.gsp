<%
    ui.includeJavascript("uicommons", "services/obsService.js")

    ui.includeCss("annotation", "libs/lightcase.css")
    ui.includeJavascript("annotation", "libs/lightcase.js")

    ui.includeJavascript("annotation", "drawingObsEncounterTemplate.js")
%>
<style>
.drawing-thumbnails {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
}
</style>
<div id="annotation-encounter-details">
<script type="text/template" id="drawingObsEncounterTemplate">
<li>
    <div class="encounter-date">
        <i class="icon-time"></i>
        <strong>
            {{- encounter.encounterTime }}
        </strong>
        {{- encounter.encounterDate }}
    </div>
    <ul class="encounter-details">
        <li>
            <div class="encounter-type">
                <strong>
                    <i class="{{- config.icon }}"></i>
                    <span class="encounter-name" data-encounter-id="{{- encounter.encounterId }}">{{- encounter.encounterType.name }}</span>
                </strong>
            </div>
        </li>
        <li>
            <div>
                ${ ui.message("coreapps.by") }
                <strong class="provider">
                    {{- encounter.primaryProvider ? encounter.primaryProvider : '' }}
                </strong>
                ${ ui.message("coreapps.in") }
                <strong class="location">{{- encounter.location }}</strong>
            </div>
        </li>
        <li>
            <div class="details-action">
                <a class="view-details collapsed"
                   href='javascript:void(0);'
                   data-encounter-id="{{- encounter.encounterId }}"
                   data-encounter-form="{{- encounter.form != null}}"
                   data-display-with-html-form="{{- config.displayWithHtmlForm }}"
                   data-toggle="collapse"
                   data-template="encounter-summary{{- encounter.encounterId }}"
                   data-target="#encounter-summary{{- encounter.encounterId }}">
                    <span class="show-details">${ ui.message("coreapps.patientDashBoard.showDetails")}</span>
                    <span class="hide-details">${ ui.message("coreapps.patientDashBoard.hideDetails")}</span>
                    <i class="icon-caret-right"></i>
                </a>
            </div>
        </li>
    </ul>

    <span>
        {{ if ( config.editable && encounter.canEdit) { }}

         <i id="drawing-view-encounter" class="delete-item icon-file-alt" style="vertical-align: top"
            data-mode="view"
            data-patient-id="{{- patient.id }}"
            data-encounter-id="{{- encounter.encounterId }}"
            {{ if (config.viewUrl) { }}
                data-view-url="{{- config.viewUrl }}"
            {{ } }}
            title="${ ui.message("coreapps.view") }"></i>

         <i id="drawing-edit-encounter" class="delete-item icon-pencil" style="vertical-align: top"
            data-mode="edit"
            data-patient-id="{{- patient.id }}"
            data-encounter-id="{{- encounter.encounterId }}"
            {{ if (config.editUrl) { }}
                data-edit-url="{{- config.editUrl }}"
            {{ } }}
            title="${ ui.message("coreapps.edit") }"></i>

        {{ } }}
        {{ if ( encounter.canDelete ) { }}

        <i class="deleteEncounterId delete-item icon-remove" data-visit-id="{{- encounter.visitId }}" data-encounter-id="{{- encounter.encounterId }}" title="${ ui.message("coreapps.delete") }"></i>

        {{  } }}
    </span>

    <div id="encounter-summary{{- encounter.encounterId }}" class="collapse">
        <div class="encounter-details-{{- encounter.encounterId }}" style="padding: 15px; border: 1px solid #ccc; min-height: 30px;">
            <p>Observations and details</p>
        </div>
    </div>
</li>
</script>

<div id="delete-encounter-dialog" class="dialog" style="display: none">
    <div class="dialog-header">
        <h3>${ ui.message("coreapps.patientDashBoard.deleteEncounter.title") }</h3>
    </div>
    <div class="dialog-content">
        <input type="hidden" id="encounterId" value=""/>
        <ul>
            <li class="info">
                <span>${ ui.message("coreapps.patientDashBoard.deleteEncounter.message") }</span>
            </li>
        </ul>

        <button class="confirm right">${ ui.message("coreapps.yes") }<i class="icon-spinner icon-spin icon-2x" style="display: none; margin-left: 10px;"></i></button>
        <button class="cancel">${ ui.message("coreapps.no") }</button>
    </div>
</div>
</div>