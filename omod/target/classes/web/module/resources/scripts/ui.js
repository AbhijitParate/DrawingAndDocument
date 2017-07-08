$(document).ready(function() {

    // Accordion for editor actions
    $("#controls" ).accordion({
        heightStyle: "content",
        icons: false
    });

    // Pencil
    let pencil = $("#pencil");
    pencil.webuiPopover({
        placement: 'bottom-right',
        title: 'Pencil Thickness',
        type: 'html',
        url: "#pencil-slider-container",
        width: 150,
        trigger: 'hover',
        dismissible:true,
    });

    let eraser = $("#erase");
    eraser.webuiPopover({
        placement: 'bottom-right',
        title: 'Eraser thickness',
        type: 'html',
        url: "#eraser-slider-container",
        width: 150,
        trigger: 'hover',
        dismissible:true,
    });

    // Shapes
    let shapeButton = $("#shape");
    shapeButton.webuiPopover({
        placement: 'right',
        title: 'Shapes',
        url: '#shapes-container',
        width: 130,
        trigger: 'hover',
        dismissible:true,
    });

    // Slider for pencil
    $( "#slider-1" ).slider(10);

});

$(function() {

    $(document).contextmenu({
        delegate: "canvas",
        autoFocus: true,
        preventContextMenuForPopup: true,
        preventSelect: true,
        taphold: true,
        menu: [{
            title: "Link external file",
            cmd: "link"
        }],
        // Handle menu selection to implement a fake-clipboard
        select: function (event, ui) {
            // let $target = ui.target;
            switch (ui.cmd) {
                case "link":
                    // code to on click of link
                    break;
            }
            // Optionally return false, to prevent closing the menu now
        },
        // Implement the beforeOpen callback to dynamically change the entries
        beforeOpen: function (event, ui) {

            // TODO: Check if rightclick on object, then pass object id and on click of menu add external file as button
            let $menu = ui.menu,
                $target = ui.target,
                extraData = ui.extraData; // passed when menu was opened by call to open()

            $(document)
                .contextmenu("setEntry", "link", "Link external file")
                .contextmenu("enableEntry", "paste","");

            // Optionally return false, to prevent opening the menu now
        }
    });
});