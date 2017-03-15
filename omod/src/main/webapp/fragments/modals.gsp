<div id="slider-container" class="webui-popover-content">
    <div id="size" >
        <div id="custom-handle" class="ui-slider-handle"></div>
    </div>
</div>

<div id="shapes-container" class="webui-popover-content" style="width:130px;">
    <button type="button" id="shape-line" class="button-small float-left" style="margin: 1%" title="Line">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M15,3V7.59L7.59,15H3V21H9V16.42L16.42,9H21V3M17,5H19V7H17M5,17H7V19H5" ></path>
        </svg>
    </button>
    <button type="button" id="shape-arrow" class="button-small float-left" style="margin: 1%" title="Arrow">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" ></path>
        </svg>
    </button>
    <button type="button" id="shape-circle" class="button-small float-left" style="margin: 1%" title="Circle">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M11,19A6,6 0 0,0 17,13H19A8,8 0 0,1 11,21A8,8 0 0,1 3,13A8,8 0 0,1 11,5V7A6,6 0 0,0 5,13A6,6 0 0,0 11,19M19,5H22V7H19V10H17V7H14V5H17V2H19V5Z" ></path>
        </svg>
    </button>
    <button type="button" id="shape-rectangle" class="button-small float-left" style="margin: 1%" title="Rectangle">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M19,6H22V8H19V11H17V8H14V6H17V3H19V6M17,17V14H19V19H3V6H11V8H5V17H17Z" ></path>
        </svg>
    </button>
    <button type="button" id="shape-triangle" class="button-small float-left" style="margin: 1%" title="Triangle">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M12,2L1,21H23M12,6L19.53,19H4.47" ></path>
        </svg>
    </button>
    <button type="button" id="shape-polygon" class="button-small float-left" style="margin: 1%" title="Polygon">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M17,15.7V13H19V17L10,21L3,14L7,5H11V7H8.3L5.4,13.6L10.4,18.6L17,15.7M22,5V7H19V10H17V7H14V5H17V2H19V5H22Z" ></path>
        </svg>
    </button>
</div>

<div id="dialog-webcam" title="Capture Image">
    <div style="height: 25px">
        <select id="webcam-size" style="float: right">
            <option value="1">320x240</option>
            <option value="2" selected>640x480</option>
        </select>
        <label for="webcam-size" style="float: right" > Image size </label>
    </div>
    <div id="front-cam"></div>
</div>

<div id="dialog-upload" title="Upload Image">
    <div id="template" style="width:700px">
        <div id="dialog-controls" style="width: 30%">
            <label for="template-select" style="float: left"> Templates </label>
            <select id="template-select" size="6" style="width: 200px;float: left;">
                <option value="template-1">Template 1</option>
                <option value="template-2">Template 2</option>
                <option value="template-3">Template 3</option>
                <option value="template-4">Template 4</option>
                <option value="template-5">Template 5</option>
            </select>
        </div>
        <div id="preview" style="float: right; width: 70%">
            <img id="preview-image" src="${ ui.resourceLink("annotation", "images/no-preview.jpg") }" style="max-width: 500px; max-height: 400px;">
        </div>
    </div>
</div>