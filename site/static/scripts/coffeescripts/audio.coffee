$(document).ready ->
  audiojs.events.ready ->
    audios = document.getElementsByTagName("audio")
    a1 = audiojs.create audios[0], {
      css: false
      createPlayer: {
        markup: """
          <div class="play-pause">
            <p class="play">Listen</p>
            <p class="pause">Pause</p>
            <p class="loading"></p>
            <p class="error"></p>
          </div>
          <div class="scrubber">
            <div class="progress"></div>
            <div class="loaded"></div>
          </div>
          <div class="time">
            <em class="played">00:00</em>/<strong class="duration">00:00</strong>
          </div>
          <div class="error-message"></div>
        """,
        playPauseClass: 'play-pause',
        scrubberClass: 'scrubber',
        progressClass: 'progress',
        loaderClass: 'loaded',
        timeClass: 'time',
        durationClass: 'duration',
        playedClass: 'played',
        errorMessageClass: 'error-message',
        playingClass: 'playing',
        loadingClass: 'loading',
        errorClass: 'error'
      }
    }
