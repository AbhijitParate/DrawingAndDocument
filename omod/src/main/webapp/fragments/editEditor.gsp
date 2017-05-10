<%
    ui.includeJavascript("annotation", "libs/jquery-3.1.1.min.js")

    ui.includeCss("annotation", "libs/jquery-ui.min.css")
    ui.includeJavascript("annotation", "libs/jquery-ui.min.js")

    ui.includeCss("annotation", "libs/spectrum.min.css")
    ui.includeJavascript("annotation", "libs/spectrum.min.js")

    ui.includeCss("annotation", "libs/jquery.webui-popover.min.css")
    ui.includeJavascript("annotation", "libs/jquery.webui-popover.min.js")

    ui.includeJavascript("annotation", "libs/jquery.ui-contextmenu.min.js")
    ui.includeJavascript("annotation", "libs/jspdf.min.js")
    ui.includeJavascript("annotation", "libs/fabric.min.js")

    ui.includeJavascript("annotation", "libs/webcam.min.js")

    ui.includeCss("annotation", "libs/video-js.min.css")
    ui.includeCss("annotation", "libs/videojs.record.css")
    ui.includeJavascript("annotation", "libs/video.min.js")
    ui.includeJavascript("annotation", "libs/videojs.record.min.js")
    ui.includeJavascript("annotation", "libs/wavesurfer.min.js")
    ui.includeJavascript("annotation", "libs/videojs.wavesurfer.min.js")
    ui.includeJavascript("annotation", "libs/wavesurfer.microphone.min.js")
    ui.includeJavascript("annotation", "libs/RecordRTC.min.js")

    ui.includeJavascript("annotation", "libs/blob-util.min.js")

    ui.includeCss("annotation", "editor.css")
    ui.includeCss("annotation", "controls.css")

    ui.includeJavascript("annotation", "ui.js")
%>
<script>
    var patientId   = ${ patientId };
    var encounterId = ${ encounterId };
    var visitId     = ${ visitId };
    var providerId  = ${ providerId };
    var returnlink  = "/openmrs/coreapps/patientdashboard/patientDashboard.page?patientId=" + patientId;
</script>
<div id="drawing-and-attachments">
    <h2 style="margin:0;">Edit Drawing</h2>
    <div class="encounter-date">
        <i class="icon-time"></i>
        <strong id="encounter-time">${ ui.format(encounterTime) }</strong>
        <span id="encounter-date">${ ui.format(encounterDate) }</span>
    </div>
    ${ui.includeFragment("annotation", "statusBar", [ mode: "edit" ])}
    <div id="main-container" class="outerContainer">
        ${ui.includeFragment("annotation", "includes/actions_panel")}
        ${ui.includeFragment("annotation", "includes/canvas")}
        ${ui.includeFragment("annotation", "includes/modals")}
    </div>
    <div id="progress-container" hidden>

    </div>
</div>