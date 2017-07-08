/**
 * Created by abhij on 5/9/2017.
 *
 */

$(document).ready(function() {


    $("#upload").on('click', function () {

        var reader  = new FileReader();
        var file = document.querySelector('input[type=file]').files[0];

        if(file){
            if(!file.type.match('image.*')) {
                alert("File is not image");
            } else if(file.size > (1024 * 1024)){
                alert("File too large");
            } else {
                reader.onload = (function () {
                    uploadFiles(file.name, reader.result.substr(reader.result.indexOf(',') + 1));
                });
                reader.readAsDataURL(file);
            }
        } else {
            alert("File not selected or is not image");
        }

    });
    
    function uploadFiles(fileName,fileDataUrl) {

        var data = new FormData();
        data.append('filename', fileName);
        data.append('file', fileDataUrl);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/openmrs/ws/rest/v1/docsanddrawing/template/upload', true);
        xhr.send(data);

        xhr.onload = function (response) {
            console.debug(response.target.responseText);
            if (response.target.responseText.includes("success")){
                location.reload();
            }
        }
    }

    function updateTemplateList() {
        $.ajax({
            type: "GET",
            url: "/openmrs/ws/rest/v1/docsanddrawing/template/all",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                createTemplateList(data);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    }

    function createTemplateList(data) {

        var templateList = $("#template-list");
        $.each(data, function (i) {
            console.log(data[i]);
            templateList.append(createListItem(data[i]));
        });
    }

    function createListItem(templateName) {
        let listItem = $("<li/>").addClass('ui-widget-content');
        let div = $("<div />").appendTo(listItem);
        let span = $("<span />");

        let icon = $("<i/>");
        icon.addClass("icon-remove");
        icon.attr("data-file", templateName);
        icon.click(function (){
            deleteTemplate(templateName);
        });
        icon.appendTo(span);

        span.appendTo(div);

        let a_view = $("<a/>")
            .attr("href", "/openmrs/ws/rest/v1/docsanddrawing/template/get/" + templateName)
            .attr("data-id", templateName)
            .attr("title", templateName)
            .text(templateName)
            .on('click', function (e) {
                e.preventDefault();
                onTemplateSelected(templateName)
            });
        a_view.appendTo(div);
        return listItem;
    }

    function deleteTemplate(templateName) {
        console.debug("delete item " +  templateName);
        $.ajax({
            type: "GET",
            url: "/openmrs/ws/rest/v1/docsanddrawing/template/delete/"+templateName,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.debug(data);
                if (data.result === 'success')
                    location.reload();
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });

    }

    function onTemplateSelected(templateName) {
        var url = "/openmrs/ws/rest/v1/docsanddrawing/template/get/" + templateName;
        var imag =  $("<img src='" + url + "' width='400' height=auto />");
        $("#preview").empty().append(imag);
    }

    updateTemplateList();

});