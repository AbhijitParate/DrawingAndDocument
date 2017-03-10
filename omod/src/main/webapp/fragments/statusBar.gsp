<%
    ui.includeJavascript("annotation", "status_actions.js")
%>
<div id="status-bar" style="margin: 5px; height: 48px;" >
    <button id="status-save" class="confirm right">
        <svg style="width:24px;height:24px;vertical-align: middle;" viewBox="0 0 24 24">
            <path fill="#000000" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" ></path>
        </svg>
        Save
    </button>
    <button id="status-cancel" class="cancel right" >
        <svg style="width:24px;height:24px;vertical-align: middle;" viewBox="0 0 24 24">
            <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" ></path>
        </svg>
        Cancel
    </button>
    <button id="status-view-attachments" class="right" style="margin-right: 10px" >
        <svg style="width:24px;height:24px;vertical-align: middle;" viewBox="0 0 24 24">
            <path fill="#000000" d="M7.5,18A5.5,5.5 0 0,1 2,12.5A5.5,5.5 0 0,1 7.5,7H18A4,4 0 0,1 22,11A4,4 0 0,1 18,15H9.5A2.5,2.5 0 0,1 7,12.5A2.5,2.5 0 0,1 9.5,10H17V11.5H9.5A1,1 0 0,0 8.5,12.5A1,1 0 0,0 9.5,13.5H18A2.5,2.5 0 0,0 20.5,11A2.5,2.5 0 0,0 18,8.5H7.5A4,4 0 0,0 3.5,12.5A4,4 0 0,0 7.5,16.5H17V18H7.5Z" ></path>
        </svg>
        Attachments
    </button>
    <p>Mode : ${mode} </p>
</div>
<!--
<div id="status-bar">
    <div>
        <button type="button" class="confirm right">Save</button>
        <button type="button" class="cancel right" >Cancel</button>
        <button type="button" class="right" >Attachments</button>
    </div>
    <button type="button" id="status-cancel" class="button-small float-right" title="Cancel">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" ></path>
        </svg>
    </button>
    <button type="button" id="status-save" class="button-small float-right" title="Save">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" ></path>
        </svg>
    </button>
    <!--
    <button type="button" id="status-print" class="button-small float-right" title="Print">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" ></path>
        </svg>
    </button>
    <button type="button" id="status-clear" class="button-small float-right" title="Clear">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" ></path>
        </svg>
    </button>
    <button type="button" id="status-view-attachments" class="float-right" title="Attachments">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M7.5,18A5.5,5.5 0 0,1 2,12.5A5.5,5.5 0 0,1 7.5,7H18A4,4 0 0,1 22,11A4,4 0 0,1 18,15H9.5A2.5,2.5 0 0,1 7,12.5A2.5,2.5 0 0,1 9.5,10H17V11.5H9.5A1,1 0 0,0 8.5,12.5A1,1 0 0,0 9.5,13.5H18A2.5,2.5 0 0,0 20.5,11A2.5,2.5 0 0,0 18,8.5H7.5A4,4 0 0,0 3.5,12.5A4,4 0 0,0 7.5,16.5H17V18H7.5Z" ></path>
        </svg>
    Attachments
    </button>
</div>
    -->
