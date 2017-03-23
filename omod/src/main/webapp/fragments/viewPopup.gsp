
<%
    ui.includeJavascript("annotation", "popup.js")
%>

<script>
    var patientId =${ patientId };
    var encounterId = ${ encounterId };
    var returnlink = "/openmrs/coreapps/patientdashboard/patientDashboard.page?patientId=" + patientId;
    console.debug(returnlink);
</script>
<div id="drawing-and-attachments">
    <h2 style="margin:0;">Drawing</h2>
    <div style="text-align: center">
        <img id="drawing" src=""  width="800" height="800">
    </div>
</div>
