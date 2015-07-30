window.isMobile =
  Android: ->
    (if navigator.userAgent.match(/Android/i) then true else false)

  BlackBerry: ->
    (if navigator.userAgent.match(/BlackBerry/i) then true else false)

  iOS: ->
    (if navigator.userAgent.match(/iPhone|iPad|iPod/i) then true else false)

  Windows: ->
    (if navigator.userAgent.match(/IEMobile/i) then true else false)

  any: ->
    isMobile.Android() or isMobile.BlackBerry() or isMobile.iOS() or isMobile.Windows()