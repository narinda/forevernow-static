(function() {

  jQuery(document).ready(function() {
    var uuid;
    uuid = $("#fileupload").data('callback-token');
    $("#fileupload").S3Uploader({
      additional_data: {
        uuid: uuid
      }
    });
    $('#submission-form').h5Validate();
    $('#agree_to_terms').removeAttr('disabled');
    if ($("#submission_terms_agreement").val() === "1") {
      $("#submission-forms").show();
    }
    $("#agree_to_terms").click(function(e) {
      $("#submission-forms").toggle();
      $("#submission_terms_agreement").val("1");
      $('body,html').delay(100).animate({
        scrollTop: $('.submit-form').offset().top - 40
      }, 300);
      return $(window).trigger('resize');
    });
    $("#fileupload").bind("s3_uploads_start", function(e, content) {});
    $("#fileupload").bind("s3_upload_complete", function(e, content) {
      var input;
      $('#submission_media_file_name').val(content.filename);
      input = $("<input>", {
        type: "hidden",
        id: "submission_media_file_token",
        name: "submission[media_file_token]",
        value: content.unique_id
      });
      $('#submission-form').append($(input));
      $('#submission-submit').removeAttr('disabled');
      $('.uploaded').show();
      $('#uploaded-file').html(content.filename);
      return $('#file').hide();
    });
    return $("#fileupload").submit(function(e) {
      if (!!$('#submission_media_file_token').val()) {
        return e.preventDefault();
      }
    });
  });

}).call(this);
