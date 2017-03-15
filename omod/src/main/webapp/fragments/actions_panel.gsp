<%
   ui.includeJavascript("annotation", "actions.js")
   ui.includeJavascript("annotation", "keyboard.js")
   ui.includeJavascript("annotation", "import.js")
   ui.includeJavascript("annotation", "attachment.js")
   ui.includeJavascript("annotation", "attachments/attachment-audio.js")
   ui.includeJavascript("annotation", "attachments/attachment-file.js")
   ui.includeJavascript("annotation", "attachments/attachment-image.js")
   ui.includeJavascript("annotation", "attachments/attachment-notes.js")
   ui.includeJavascript("annotation", "attachments/attachment-video.js")
   ui.includeJavascript("annotation", "editor.js")
%>

<div id="controlsContainer" class="controlsContainer">
    <div id="controls">
        <h3 class="control-header">Draw</h3>
        <div style="padding:1%;">
            <button type="button" id="pencil" class="button-regular ui-button ui-widget ui-corner-all" title="Pencil">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" ></path>
                </svg>
            </button>
            <button type="button" id="erase" class="button-regular ui-button ui-widget ui-corner-all" title="Eraser">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M15.14,3C14.63,3 14.12,3.2 13.73,3.59L2.59,14.73C1.81,15.5 1.81,16.77 2.59,17.56L5.03,20H12.69L21.41,11.27C22.2,10.5 22.2,9.23 21.41,8.44L16.56,3.59C16.17,3.2 15.65,3 15.14,3M17,18L15,20H22V18" ></path>
                </svg>
            </button>
            <button type="button" id="shape" class="button-regular ui-button ui-widget ui-corner-all" title="Shapes">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M2,2H11V11H2V2M17.5,2C20,2 22,4 22,6.5C22,9 20,11 17.5,11C15,11 13,9 13,6.5C13,4 15,2 17.5,2M6.5,14L11,22H2L6.5,14M19,17H22V19H19V22H17V19H14V17H17V14H19V17Z" ></path>
                </svg>
            </button>
            <button type="button" id="delete" class="button-regular ui-button ui-widget ui-corner-all" title="Delete">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z" ></path>
                </svg>
            </button>
            <button type="button" id="text" class="button-regular ui-button ui-widget ui-corner-all" title="Text">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M3,3H16V6H11V18H8V6H3V3M12,7H14V9H12V7M15,7H17V9H15V7M18,7H20V9H18V7M12,10H14V12H12V10M12,13H14V15H12V13M12,16H14V18H12V16M12,19H14V21H12V19Z" ></path>
                </svg>
            </button>
            <button type="button" id="color-picker" class="button-regular ui-button ui-widget ui-corner-all" title="Color Palette">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z" ></path>
                </svg>
            </button>
            <button type="button" id="select" class="button-regular ui-button ui-widget ui-corner-all" title="Select">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z" ></path>
                </svg>
            </button>
        </div>
        <h3 class="control-header">Transform</h3>
        <div style="padding: 1%;">
            <button type="button" id="flip-vertical" class="button-regular ui-button ui-widget ui-corner-all" title="Flip Vertically">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" ></path>
                </svg>
            </button>
            <button type="button" id="rotate-anti-clock" class="button-regular ui-button ui-widget ui-corner-all" title="Rotate Anti-clockwise">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M4,2H7A2,2 0 0,1 9,4V20A2,2 0 0,1 7,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M20,15A2,2 0 0,1 22,17V20A2,2 0 0,1 20,22H11V15H20M14,4A8,8 0 0,1 22,12L21.94,13H19.92L20,12A6,6 0 0,0 14,6V9L10,5L14,1V4Z" ></path>
                </svg>
            </button>
            <button type="button" id="crop" class="button-regular not-available ui-widget ui-corner-all" title="Crop">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M7,17V1H5V5H1V7H5V17A2,2 0 0,0 7,19H17V23H19V19H23V17M17,15H19V7C19,5.89 18.1,5 17,5H9V7H17V15Z" ></path>
                </svg>
            </button>
            <button type="button" id="flip-horizontal" class="button-regular ui-button ui-widget ui-corner-all" title="Flip Horizontally">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z" ></path>
                </svg>
            </button>
            <button type="button" id="rotate-clock" class="button-regular ui-button ui-widget ui-corner-all" title="Rotate Clockwise">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M10,4V1L14,5L10,9V6A6,6 0 0,0 4,12L4.08,13H2.06L2,12A8,8 0 0,1 10,4M17,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H17A2,2 0 0,1 15,20V4A2,2 0 0,1 17,2M4,15H13V22H4A2,2 0 0,1 2,20V17A2,2 0 0,1 4,15Z" ></path>
                </svg>
            </button>
            <button type="button" id="fit" class="button-regular not-available ui-widget ui-corner-all" title="Fit size">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M19,3H15V5H19V9H21V5C21,3.89 20.1,3 19,3M19,19H15V21H19A2,2 0 0,0 21,19V15H19M5,15H3V19A2,2 0 0,0 5,21H9V19H5M3,5V9H5V5H9V3H5A2,2 0 0,0 3,5Z" ></path>
                </svg>
            </button>
        </div>
        <h3 class="control-header">Position</h3>
        <div style="padding: 1%;">
            <button type="button" id="pos-top-left" class="button-regular ui-button ui-widget ui-corner-all" title="Position top left corner">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-top" class="button-regular ui-button ui-widget ui-corner-all" title="Position top">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-top-right" class="button-regular ui-button ui-widget ui-corner-all" title="Position top right corner">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-left" class="button-regular ui-button ui-widget ui-corner-all" title="Position left">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-center" class="button-regular ui-button ui-widget ui-corner-all" title="Position center">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M19.5,3.09L20.91,4.5L16.41,9H20V11H13V4H15V7.59L19.5,3.09M20.91,19.5L19.5,20.91L15,16.41V20H13V13H20V15H16.41L20.91,19.5M4.5,3.09L9,7.59V4H11V11H4V9H7.59L3.09,4.5L4.5,3.09M3.09,19.5L7.59,15H4V13H11V20H9V16.41L4.5,20.91L3.09,19.5Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-right" class="button-regular ui-button ui-widget ui-corner-all" title="Position right">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-bottom-left" class="button-regular ui-button ui-widget ui-corner-all" title="Position bottom left corner">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-bottom" class="button-regular ui-button ui-widget ui-corner-all" title="Position bottom">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" ></path>
                </svg>
            </button>
            <button type="button" id="pos-bottom-right" class="button-regular ui-button ui-widget ui-corner-all" title="Position bottom right corner">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z" ></path>
                </svg>
            </button>
        </div>
        <h3 class="control-header">Layers</h3>
        <div style="padding: 1%;">
            <button type="button" id="layer-up" class="button-regular ui-button ui-widget ui-corner-all" title="Move one layer up">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M7,21H9V19H7M11,21H13V19H11M19,15H9V5H19M19,3H9C7.89,3 7,3.89 7,5V15A2,2 0 0,0 9,17H14L18,17H19A2,2 0 0,0 21,15V5C21,3.89 20.1,3 19,3M15,21H17V19H15M3,9H5V7H3M5,21V19H3A2,2 0 0,0 5,21M3,17H5V15H3M3,13H5V11H3V13Z" ></path>
                </svg>
            </button>
            <button type="button" id="layer-down" class="button-regular ui-button ui-widget ui-corner-all" title="Move one layer down">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M15,17H17V15H15M15,5H17V3H15M5,7H3V19A2,2 0 0,0 5,21H17V19H5M19,17A2,2 0 0,0 21,15H19M19,9H21V7H19M19,13H21V11H19M9,17V15H7A2,2 0 0,0 9,17M13,3H11V5H13M19,3V5H21C21,3.89 20.1,3 19,3M13,15H11V17H13M9,3C7.89,3 7,3.89 7,5H9M9,11H7V13H9M9,7H7V9H9V7Z" ></path>
                </svg>
            </button>
        </div>
        <h3 class="control-header">Edit</h3>
        <div style="padding: 1%;">
            <button type="button" id="undo" class="button-regular not-available ui-widget ui-corner-all" title="Undo">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" ></path>
                </svg>
            </button>
            <button type="button" id="hide" class="button-regular not-available ui-widget ui-corner-all" title="Hide">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" ></path>
                </svg>
            </button>
            <button type="button" id="clear" class="button-regular ui-button ui-widget ui-corner-all" title="Clear">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" ></path>
                </svg>
            </button>
            <button type="button" id="redo" class="button-regular not-available ui-widget ui-corner-all" title="Redo">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" ></path>
                </svg>
            </button>
        </div>
        <h3 class="control-header">Import</h3>
        <div style="padding: 1%;">
            <button type="button" id="import-camera" class="button-regular ui-button ui-widget ui-corner-all" title="Import image using camera">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" ></path>
                </svg>
            </button>
            <button type="button" id="import-template" class="button-regular ui-button ui-widget ui-corner-all" title="Import image from templates">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M4,2C2.89,2 2,2.89 2,4V14H4V4H14V2H4M8,6C6.89,6 6,6.89 6,8V18H8V8H18V6H8M12,10C10.89,10 10,10.89 10,12V20C10,21.11 10.89,22 12,22H20C21.11,22 22,21.11 22,20V12C22,10.89 21.11,10 20,10H12Z" ></path>
                </svg>
            </button>
            <button type="button" id="import-upload" class="button-regular ui-button ui-widget ui-corner-all" title="Import image from device">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" ></path>
                </svg>
            </button>
            <input  id="import-upload-input" type="file" accept="image/*" hidden>
        </div>
        <h3 class="control-header">Attach</h3>
        <div style="padding: 1%;">
            <button type="button" id="attachImage" class="button-regular ui-button ui-widget ui-corner-all" title="Attach image">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M6,20H15L18,20V12L14,16L12,14L6,20M8,9A2,2 0 0,0 6,11A2,2 0 0,0 8,13A2,2 0 0,0 10,11A2,2 0 0,0 8,9Z" ></path>
                </svg>
            </button>
            <button type="button" id="attachVideo" class="button-regular ui-button ui-widget ui-corner-all" title="Attach video">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M17,19V13L14,15.2V13H7V19H14V16.8L17,19Z" ></path>
                </svg>
            </button>
            <button type="button" id="attachAudio" class="button-regular ui-button ui-widget ui-corner-all" title="Attach audio">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M9,16A2,2 0 0,0 7,18A2,2 0 0,0 9,20A2,2 0 0,0 11,18V13H14V11H10V16.27C9.71,16.1 9.36,16 9,16Z" ></path>
                </svg>
            </button>
            <button type="button" id="attachNote" class="button-regular ui-button ui-widget ui-corner-all" title="Attach note">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M6,2H14L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M13,3.5V9H18.5L13,3.5M7,13L8.5,20H10.5L12,17L13.5,20H15.5L17,13H18V11H14V13H15L14.1,17.2L13,15V15H11V15L9.9,17.2L9,13H10V11H6V13H7Z" ></path>
                </svg>
            </button>
            <button type="button" id="attachFile" class="button-regular ui-button ui-widget ui-corner-all" title="Attach file">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" ></path>
                </svg>
            </button>
        </div>
        <h3 class="control-header">Print</h3>
        <div style="padding: 1%;">
            <button type="button" id="print" class="button-regular ui-button ui-widget ui-corner-all" title="Print">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" ></path>
                </svg>
            </button>
        </div>
        <h3 class="control-header">Export</h3>
        <div style="padding: 1%;">
            <button type="button" id="save-pdf" class="button-regular ui-button ui-widget ui-corner-all" title="Save as PDF">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M14,9H19.5L14,3.5V9M7,2H15L21,8V20A2,2 0 0,1 19,22H7C5.89,22 5,21.1 5,20V4A2,2 0 0,1 7,2M11.93,12.44C12.34,13.34 12.86,14.08 13.46,14.59L13.87,14.91C13,15.07 11.8,15.35 10.53,15.84V15.84L10.42,15.88L10.92,14.84C11.37,13.97 11.7,13.18 11.93,12.44M18.41,16.25C18.59,16.07 18.68,15.84 18.69,15.59C18.72,15.39 18.67,15.2 18.57,15.04C18.28,14.57 17.53,14.35 16.29,14.35L15,14.42L14.13,13.84C13.5,13.32 12.93,12.41 12.53,11.28L12.57,11.14C12.9,9.81 13.21,8.2 12.55,7.54C12.39,7.38 12.17,7.3 11.94,7.3H11.7C11.33,7.3 11,7.69 10.91,8.07C10.54,9.4 10.76,10.13 11.13,11.34V11.35C10.88,12.23 10.56,13.25 10.05,14.28L9.09,16.08L8.2,16.57C7,17.32 6.43,18.16 6.32,18.69C6.28,18.88 6.3,19.05 6.37,19.23L6.4,19.28L6.88,19.59L7.32,19.7C8.13,19.7 9.05,18.75 10.29,16.63L10.47,16.56C11.5,16.23 12.78,16 14.5,15.81C15.53,16.32 16.74,16.55 17.5,16.55C17.94,16.55 18.24,16.44 18.41,16.25M18,15.54L18.09,15.65C18.08,15.75 18.05,15.76 18,15.78H17.96L17.77,15.8C17.31,15.8 16.6,15.61 15.87,15.29C15.96,15.19 16,15.19 16.1,15.19C17.5,15.19 17.9,15.44 18,15.54M8.83,17C8.18,18.19 7.59,18.85 7.14,19C7.19,18.62 7.64,17.96 8.35,17.31L8.83,17M11.85,10.09C11.62,9.19 11.61,8.46 11.78,8.04L11.85,7.92L12,7.97C12.17,8.21 12.19,8.53 12.09,9.07L12.06,9.23L11.9,10.05L11.85,10.09Z" ></path>
                </svg>
            </button>
            <button type="button" id="save-jpg" class="button-regular ui-button ui-widget ui-corner-all" title="Save as JPG">
                jpg
            </button>
            <button type="button" id="save-png" class="button-regular ui-button ui-widget ui-corner-all" title="Save as PNG">
                png
            </button>
            <button type="button" id="save-json" class="button-regular ui-widget ui-corner-all">
                json
            </button>
            <button type="button" id="save-svg" class="button-regular ui-widget ui-corner-all">
                svg
            </button>
        </div>
    </div>
</div>