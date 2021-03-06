<%
    ui.includeCss("docsanddrawing", "libs/jquery-ui.min.css")

    ui.includeJavascript("docsanddrawing", "libs/jquery-3.1.1.min.js")
    ui.includeJavascript("docsanddrawing", "libs/jquery-ui.min.js")

    ui.includeCss("docsanddrawing", "libs/spectrum.min.css")
    ui.includeJavascript("docsanddrawing", "libs/spectrum.min.js")

    ui.includeCss("docsanddrawing", "libs/jquery.webui-popover.min.css")
    ui.includeJavascript("docsanddrawing", "libs/jquery.webui-popover.min.js")

    ui.includeJavascript("docsanddrawing", "libs/jquery.ui-contextmenu.min.js")
    ui.includeJavascript("docsanddrawing", "libs/FileSaver.min.js")
    ui.includeJavascript("docsanddrawing", "libs/jszip.min.js")
    ui.includeJavascript("docsanddrawing", "libs/jszip-utils.js")
    ui.includeJavascript("docsanddrawing", "libs/jspdf.min.js")
    ui.includeJavascript("docsanddrawing", "libs/fabric.min.js")

    ui.includeJavascript("docsanddrawing", "libs/webcam.min.js")

    ui.includeCss("docsanddrawing", "libs/video-js.min.css")
    ui.includeCss("docsanddrawing", "libs/videojs.record.css")
    ui.includeJavascript("docsanddrawing", "libs/video.min.js")
    ui.includeJavascript("docsanddrawing", "libs/videojs.record.min.js")
    ui.includeJavascript("docsanddrawing", "libs/wavesurfer.min.js")
    ui.includeJavascript("docsanddrawing", "libs/videojs.wavesurfer.min.js")
    ui.includeJavascript("docsanddrawing", "libs/wavesurfer.microphone.min.js")
    ui.includeJavascript("docsanddrawing", "libs/RecordRTC.min.js")

    ui.includeJavascript("docsanddrawing", "libs/blob-util.min.js")

    ui.includeCss("docsanddrawing", "editor.css")
    ui.includeCss("docsanddrawing", "controls.css")

    ui.includeJavascript("docsanddrawing", "ui.js")
%>
<script>
    var patientId =${ patientId };
    var patientIdentifier = "${patientIdentifier}";
    var visitId = ${ visitId };
    var providerId = ${ providerId };
    var returnlink ="${ '../coreapps/patientdashboard/patientDashboard.page?patientId=' + patientId + '&visitId=' + visitId }";
</script>
<div id="drawing-and-attachments">
    <h2 style="margin:0;">Add Drawing</h2>
    ${ui.includeFragment("docsanddrawing", "statusBar", [ mode: "add" ])}
    <div id="main-container" class="outerContainer">
        ${ui.includeFragment("docsanddrawing", "includes/editor_actions")}
        ${ui.includeFragment("docsanddrawing", "includes/canvas")}
        ${ui.includeFragment("docsanddrawing", "includes/modals")}
    </div>
    <div id="progress-container" hidden>

    </div>
</div>