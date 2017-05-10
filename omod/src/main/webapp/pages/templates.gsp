<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("coreapps", "patientdashboard/patientDashboard.css")
    ui.includeJavascript("uicommons", "bootstrap-collapse.js")
    ui.includeJavascript("uicommons", "bootstrap-transition.js")

    ui.includeCss("annotation", "libs/jquery-ui.min.css")
    ui.includeJavascript("annotation", "libs/jquery-ui.min.js")

    ui.includeJavascript("annotation", "manage_templates.js")
%>

<h2 style="margin:0;">Manage Templates</h2>

<div style="border: grey solid 1px; margin: 5px; padding: 1%">
    <label for="file">Select template</label>
    <input id="file" type="file" name="file">
    <input id="upload" type="button" value="Upload Template">
</div>

<div id="container" style="height: 500px; padding: 1%">
    <div id="templates" style="width: 25%; height: inherit; float: left; padding: 1%">
        <p>Select template for preview</p>
        <ul id="template-list" style="border: grey 1px solid; overflow:hidden; overflow-y:auto;">

        </ul>
    </div>
    <div id="preview" style="width: 70%; float: left; height: inherit; text-align: center; border: grey 1px solid; padding: 1%">
        <p>Preview</p>
    </div>
</div>