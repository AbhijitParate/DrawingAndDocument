<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("coreapps", "patientdashboard/patientDashboard.css")
    ui.includeJavascript("uicommons", "bootstrap-collapse.js")
    ui.includeJavascript("uicommons", "bootstrap-transition.js")
%>
<script>
    var patient = ${patient};
</script>
${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient ]) }