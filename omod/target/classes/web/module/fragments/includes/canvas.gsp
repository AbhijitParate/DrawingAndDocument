<%
    ui.includeJavascript("docsanddrawing", "canvas.js")
    ui.includeJavascript("docsanddrawing", "context_menu.js")
%>
<div id="canvasContainer" class="canvasContainer">
    <div id="canvasWrapper" style="height: 100%; width: 100%; position: relative;">
        <canvas id="canvas" width="800" height="800" ></canvas>
        <button type="button" id="zoom-in" class="button-canvas" style="position: absolute; top: 10px; right: 10px;" title="Zoom in">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M9,2A7,7 0 0,1 16,9C16,10.57 15.5,12 14.61,13.19L15.41,14H16L22,20L20,22L14,16V15.41L13.19,14.61C12,15.5 10.57,16 9,16A7,7 0 0,1 2,9A7,7 0 0,1 9,2M8,5V8H5V10H8V13H10V10H13V8H10V5H8Z" ></path>
            </svg>
        </button>
        <button type="button" id="zoom-reset" class="button-canvas" style="position: absolute; top: 50px; right: 10px;" title="Reset zoom">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" ></path>
            </svg>
        </button>
        <button type="button" id="zoom-out" class="button-canvas" style="position: absolute; top: 90px; right: 10px;" title="Zoom out">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M9,2A7,7 0 0,1 16,9C16,10.57 15.5,12 14.61,13.19L15.41,14H16L22,20L20,22L14,16V15.41L13.19,14.61C12,15.5 10.57,16 9,16A7,7 0 0,1 2,9A7,7 0 0,1 9,2M5,8V10H13V8H5Z" ></path>
            </svg>
        </button>
        <button type="button" id="pan-left" class="button-canvas" style="position: absolute; bottom: 50px; right: 90px;" title="Move canvas left">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" ></path>
            </svg>
        </button>
        <button type="button" id="pan-up" class="button-canvas" style="position: absolute; bottom: 90px; right: 50px;" title="Move canvas up">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M7.41,18.41L6,17L12,11L18,17L16.59,18.41L12,13.83L7.41,18.41M7.41,12.41L6,11L12,5L18,11L16.59,12.41L12,7.83L7.41,12.41Z" ></path>
            </svg>
        </button>
        <button type="button" id="pan-center" class="button-canvas" style="position: absolute; bottom: 50px; right: 50px;" title="Re-center canvas position">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z" ></path>
            </svg>
        </button>
        <button type="button" id="pan-right" class="button-canvas" style="position: absolute; bottom: 50px; right: 10px;" title="Move canvas right">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" ></path>
            </svg>
        </button>
        <button type="button" id="pan-down" class="button-canvas" style="position: absolute; bottom: 10px; right: 50px;" title="Move canvas down">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z" ></path>
            </svg>
        </button>
    </div>
</div>