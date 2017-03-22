/**
 * Created by abhij on 3/7/2017.
 */
// Attachments related
let attachments = [];
let attachmentId = 0;

function Attachment(name, type, data) {
    this.id = attachmentId++;
    this.name = name;
    this.type = type;
    this.data = data;
}

$(document).ready(function() {

    let currentPreviewFile;

    // for reference
    function previewAttachment() {
        let id = $(this).data("file");
        currentPreviewFile = id;
        console.info(id + " clicked.");

        let preview = $("#attachment-preview");

        for (let i = 0, attachment; i < attachments.length; i++) {
            attachment = attachments[i];
            if (attachment.id === id) {
                console.info(attachment.type);
                switch (attachment.type){
                    case "image":
                        console.info("Image file");
                        preview.empty();
                        preview.append(
                            '<img class="previewWindow" src='+ attachment.data +'>'
                        );
                        break;
                    case "video":
                        console.info("Video file");
                        preview.empty();
                        if(attachment.data instanceof Blob) {
                            let videoReader = new FileReader();
                            videoReader.onloadend = (function (e) {
                                preview.append(
                                    '<video class="video-js vjs-default-skin previewWindow" controls autoplay>'
                                    +   '<source src=' + e.target.result + '>'
                                    + '</video>');
                            });
                            videoReader.readAsDataURL(attachment.data);
                        } else {
                            preview.append(
                                '<video class="video-js vjs-default-skin previewWindow" controls autoplay>'
                                +   '<source src=' + attachment.data + '>'
                                + '</video>'
                            );
                        }

                        console.info("Video data-> "+attachment.data);
                        break;
                    case "audio":
                        console.info("Audio file");
                        preview.empty();
                        if(attachment.data instanceof Blob){
                            let audioReader = new FileReader();
                            audioReader.onloadend = (function (e) {
                                preview.append(
                                    '<audio class="video-js vjs-default-skin previewWindow" controls autoplay>' +
                                    '<source src='+ e.target.result +'>' +
                                    '</audio>'
                                );
                            });
                            audioReader.readAsDataURL(attachment.data);
                        } else {
                            preview.append(
                                '<audio class="video-js vjs-default-skin previewWindow" controls autoplay>' +
                                '<source src='+ attachment.data +'>' +
                                '</audio>'
                            );
                        }

                        console.info("Audio data-> "+attachment.data);
                        break;
                    case "note":
                        console.info("Text file");
                        console.info(attachment.data);
                        // let fileReader = new FileReader();
                        // fileReader.onloadend = (function (e) {
                        preview.empty();
                        preview.append(
                            '<textarea class="previewWindow" title="Preview Text" disabled>' +
                            atob(attachment.data.replace("data:text/plain;base64,", ""))+
                            '</textarea>'
                        );
                        // });
                        // fileReader.readAsText(attachment.data);
                        break;
                    default:
                        console.info("File attachment");
                        preview.empty();
                        preview.append(
                            '<div class="previewWindow" title="Preview Text" >' +
                            '<p style="text-align: center;">' + attachment.name + '</p>' +
                            '<p style="text-align: center;">No preview available.</p>' +
                            '</div>');
                        break;

                }
            }
        }
    }
});