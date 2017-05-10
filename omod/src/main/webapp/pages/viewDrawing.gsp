<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("coreapps", "patientdashboard/patientDashboard.css")
    ui.includeJavascript("uicommons", "bootstrap-collapse.js")
    ui.includeJavascript("uicommons", "bootstrap-transition.js")
%>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.escapeJs(ui.format(patient)) }" ,
            link: '${ ui.pageLink( "coreapps", "clinicianfacing/patient", [patientId: patient.id] ) }'},
        { label: "View Drawing"}
    ];
</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient ]) }

${ui.includeFragment("annotation", "viewEditor")}