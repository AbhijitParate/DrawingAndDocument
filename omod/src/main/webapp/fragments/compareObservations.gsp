<%
    ui.includeCss("annotation", "compareObs.css")
    ui.includeJavascript("annotation", "compareObs.js")
%>

<h2>Compare Observations</h2>

<div id="container">

</div>
<div class="center">
    <button id="addMore">Add more</button>
</div>

<script>
    var patientId = ${patient.id};
</script>
