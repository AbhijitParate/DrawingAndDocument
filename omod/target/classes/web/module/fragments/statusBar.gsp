<script>
    var pageMode = "${mode}";
</script>
<%
    ui.includeCss("docsanddrawing", "libs/lightcase.css")
    ui.includeJavascript("docsanddrawing", "libs/lightcase.js")

    ui.includeCss("docsanddrawing", "attachment.css")
    ui.includeJavascript("docsanddrawing", "status_actions.js")
    ui.includeJavascript("docsanddrawing", "backup_restore.js")
%>
<div id="status-bar" style="margin: 2px; height: 45px;" >
    <button id="status-save" class="confirm right" style="margin-right: 0">
        <span style="color: black"><i class="icon-save"></i> Save</span>
    </button>
    <button id="status-cancel" class="cancel right" >
        <span style="color: black"><i class="icon-remove"></i> Cancel</span>
    </button>
    <button id="status-view-attachments" class="right" style="margin-right: 10px; " >
        <span style="color: black"><i class="icon-paper-clip"></i> Attachments</span>
    </button>
</div>