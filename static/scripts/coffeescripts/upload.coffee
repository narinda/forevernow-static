jQuery(document).ready ->
  uuid = $("#fileupload").data('callback-token')
  $("#fileupload").S3Uploader(
    additional_data: {uuid: uuid}
  )

  $('#submission-form').h5Validate()

  $('#agree_to_terms').removeAttr('disabled')

  if $("#submission_terms_agreement").val() == "1"
    $("#submission-forms").show()

  $("#agree_to_terms").click (e) ->
    $("#submission-forms").toggle()
    $("#submission_terms_agreement").val("1")
    $('body,html').delay(100).animate {
      scrollTop: $('.submit-form').offset().top - 40
    }, 300
    $(window).trigger('resize');

  $("#fileupload").bind "s3_uploads_start", (e, content) ->
    #alert("starting")

  $("#fileupload").bind "s3_upload_complete", (e, content) ->

    $('#submission_media_file_name').val(content.filename)

    #Add media file token input field;
    input = $("<input>",
      type: "hidden",
      id: "submission_media_file_token",
      name: "submission[media_file_token]",
      value: content.unique_id
    )

    $('#submission-form').append($(input))
    $('#submission-submit').removeAttr('disabled')
    $('.uploaded').show()
    $('#uploaded-file').html(content.filename)
    $('#file').hide()

  #cancel submit if no file has been uploaded.
  $("#fileupload").submit (e) ->
    if !!$('#submission_media_file_token').val()
      e.preventDefault();

