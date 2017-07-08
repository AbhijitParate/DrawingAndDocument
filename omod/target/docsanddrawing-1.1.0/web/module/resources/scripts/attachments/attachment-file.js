/**
 * Created by abhij on 3/13/2017.
 *
 */
$(document).ready(function() {

    $("#attachFile").click(function () {
        let inputTag = getInputTag();
        inputTag.click();
    });

    function getInputTag() {
        let input = $("<input/>");
        input.attr("type", "file");
        input.attr("hidden","");
        input.attr("name","files[]");
        input.attr("accept","*/*");
        input.on("change", function (e) {
            let file = e.target.files[0];
            console.info("File selected ->" + file.name);
            let reader = new FileReader();
            reader.onload = (function (e) {
                let previewFile = e.target.result;
                let attachmentNewFile = new Attachment(file.name, "file", previewFile );
                attachments.push(attachmentNewFile);
            });
            reader.readAsDataURL(file);
        });
        return input;
    }

    $("#attachmentFiles").on("change", function (e) {

        let file = e.target.files[0];
        console.info("File selected ->" + file.name);

        let reader = new FileReader();

        reader.onload = (function (e) {
            let previewFile = e.target.result;
            let attachmentNewFile = new Attachment(file.name, "file", previewFile );
            attachments.push(attachmentNewFile);
        });
        reader.readAsDataURL(file);
    });

});