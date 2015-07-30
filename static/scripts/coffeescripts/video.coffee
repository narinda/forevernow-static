


jQuery(document).ready ->

  playlist = []
  if window.isMobile.any()
    playlist = [
      {mp4: ENCODE_FORMATS.mp4_baseline_480p},
      {webm: ENCODE_FORMATS.webm_480p}
    ]
  else
    playlist = [
      { mp4: ENCODE_FORMATS.mp4_720p },
      { webm: ENCODE_FORMATS.webm_720p }
    ]

  # Install player
  player = $(".artwork-player__video")
  player.flowplayer(
    cuepoints: [0.3], 
    embed: false, 
    splash: true, 
    swf: "/static/scripts/flowplayer/flowplayer.swf",
    key: "$404891313395423",
    analytics: "UA-5902766-4", 
    playlist: [ playlist ]
  )
  
  # Get a handle on the API
  api = window.flowplayer(player)

  # Add the HD/SD button, only on non mobile devices
  if not isMobile.any()
    player.find(".fp-ui .fp-fullscreen").after("<a class='hd-btn active'>HD</a>")

  # Resume position after loading HD/SD
  resumePosition = (e, api, video) ->
    if pos == video.duration 
      pos = 0

    if pos and (seekable and e.type is "ready" or not seekable and e.type is "cuepoint")
      api.seek pos
      pos = 0


  seekable = not isMobile.any()
  pos = 0

  api.bind "cuepoint", (e, api, video) ->
    # iPad cannot seek in load callback
    resumePosition e, api, video

  $(".hd-btn").click (e) ->
    e.preventDefault()

    button = $(this)

    # store current position
    pos = api.video.time

    if button.hasClass("active")
      api.load [
        {mp4: ENCODE_FORMATS.mp4_480p},
        {webm: ENCODE_FORMATS.webm_480p}
      ], (e, api, video) ->
        resumePosition e, api, video

      button.removeClass("active")
    else
      api.load [
        {mp4: ENCODE_FORMATS.mp4_720p},
        {webm: ENCODE_FORMATS.webm_720p}
      ], (e, api, video) ->
        resumePosition e, api, video

      button.addClass("active")


    



