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
    <div id="webcam">
        <div id="front-cam" style="width:320px; height:240px;"></div>
    </div>
</div>

<div id="dialog-upload" title="Upload Image">
    <div id="template">
        <div id="dialog-controls" style="float: left">
            <label>
                <select id="template-select" size="6" style="width: 200px">
                    <option value="template-1">Template 1</option>
                    <option value="template-2">Template 2</option>
                    <option value="template-3">Template 3</option>
                    <option value="template-4">Template 4</option>
                    <option value="template-5">Template 5</option>
                </select>
            </label>
        </div>
        <div id="preview" style="display: -webkit-box;">
            <img id="preview-image" src="${ ui.resourceLink("annotation", "images/no-preview.jpg") }" style="width: auto; height: 400px;">
        </div>
    </div>
</div>

<div id="dialog-attachment" title="Attachments">
    <div id="attachments" style="float: left; overflow-y:auto; width: 200px;">

        <div id="attachments-empty" >
            <p style="text-align: center; vertical-align: middle; line-height: 100%;" > No attachments </p>
        </div>

        <div id="attachments-not-empty" >
            <ul id="attachments-list" style="padding: 0; list-style-type: none">

            </ul>
        </div>

    </div>
    <div id="attachment-preview-container" style="display: flex; border-left: solid 1px;" >
        <span id="attachment-preview" style="width: 400px; height: 300px; align-items: center; justify-content: center; display: inline-flex">
            Click item for preview
        </span>
    </div>
</div>

<div id="dialog-attach-video" title="Video">
    <div id="video-selection" style="float: left;">
        <input id="attachmentVideo" type="file" name="videos[]" accept="video/mp4,video/x-m4v,video/*" hidden>
        <button type="button" id="upload-video" class="uploadCaptureButton" > Upload </button>
        <button type="button" id="capture-video" class="uploadCaptureButton" > Capture </button>
    </div>
    <div id="attachment-preview-video" style="display: flex;" >
        <!--<span style="width: 400px; height: 300px">-->
        <!--To capture new video using VideoJS-->
        <video id="capture-video-preview" class="video-js vjs-default-skin previewWindow"> </video>
        <!--<div id="capture-video-preview" class="previewWindow">-->

        <!--To play selected video using upload button-->
        <video id="uploaded-video-preview" class="video-js vjs-default-skin previewWindow" controls autoplay>
            <source id="uploaded-video-source" src="">
        </video>
        <!--</span>-->
    </div>
</div>

<div id="dialog-attach-audio" title="Audio">
    <div id="audio-selection" style="float: left;">
        <input id="attachmentAudio" type="file" name="audios[]" accept="audio/*" hidden>
        <button type="button" id="upload-audio" value="hide" class="button uploadCaptureButton" > Upload </button>
        <button type="button" id="capture-audio"  value="show" class="button uploadCaptureButton" > Capture </button>
    </div>
    <div id="attachment-preview-audio" style="display: flex;" >
        <span style="width: 400px; height: 300px">
            <!--To capture new audio using VideoJS-->
            <audio id="capture-audio-preview" class="video-js vjs-default-skin previewWindow"> </audio>
            <!--To play selected audio using upload button-->
            <audio id="uploaded-audio-preview" class="video-js vjs-default-skin previewWindow" controls autoplay>
                <source id="uploaded-audio-source" src="">
            </audio>
        </span>
    </div>
</div>

<div id="dialog-attach-image" title="Image">
    <div id="image-selection" style="float: left;" >
        <input id="attachmentImage" type="file" name="images[]" accept="image/*" hidden>
        <button type="button" id="upload-image" value="hide" class="uploadCaptureButton" > Upload </button>
        <button type="button" id="capture-image"  value="show" class="uploadCaptureButton" > Capture </button>
    </div>
    <div id="attachment-preview-image" style="display: flex;" >
        <!--To capture new image using VideoJS-->
        <video id="capture-image-preview" class="video-js vjs-default-skin previewWindow"> </video>
        <!--To play selected image using upload button-->
        <img id="uploaded-image-preview" class="previewWindow" src="${ ui.resourceLink("annotation", "images/no-preview.jpg") }">
    </div>
</div>

<div id="dialog-attach-note" title="Notes">
    <div id="note-selection" style="float: left;" >
        <input id="attachmentNotes" type="file" name="notes[]" accept="text/plain"  hidden>
        <button type="button" id="upload-note" value="hide" class="uploadCaptureButton" > Upload </button>
        <button type="button" id="capture-note"  value="show" class="uploadCaptureButton" > New Note </button>
    </div>
    <div id="attachment-preview-note" style="display: -webkit-box;" >
        <label for="note-name">Name:</label>
        <input id="note-name" type="text" />
        <textarea id="note-preview" class="previewWindow" title="Preview Text"> </textarea>
    </div>
</div>

<div id="dialog-attach-file" title="Files">
    <div id="file-selection" style="float: left;" >
        <input id="attachmentFiles" type="file" name="files[]" accept="*/*"  hidden>
    </div>
</div>