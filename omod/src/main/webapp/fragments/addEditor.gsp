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
    var patientid =${ patientId };
    var visitid = ${ visitId };
    var providerid = ${ providerId };
    var returnlink ="${ ui.format(returnUrl) }";
</script>
<h2>Add Drawing</h2>
${ui.includeFragment("annotation", "statusBar", [ mode: "edit" ])}
<div id="mainContainer" class="outerContainer">
    ${ui.includeFragment("annotation", "actions_panel")}
    ${ui.includeFragment("annotation", "canvas")}
</div>
${ui.includeFragment("annotation", "modals")}