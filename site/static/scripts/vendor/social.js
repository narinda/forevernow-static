(function() {
  $(document).ready(function() {
    var minimise_number = function(num) {
      if (!num) num = 0;
      if (num < 1000) return num;
       else return (Math.round(num / 100) / 10) + 'k';
    };

    var $facebook_button = $('.facebook-button');
    var $twitter_button = $('.twitter-button');
    var $pinterest_button = $('.pinterest-button');

    if (!!$facebook_button.length || !!$twitter_button.length || !!$pinterest_button.length) {
      var url = $facebook_button.data('url');
      $.ajax({
        dataType: 'json',
        url: 'https://graph.facebook.com/fql?q=select%20%20share_count,like_count%20from%20link_stat%20where%20url="' + url + '"',
        success: function(data) {
          var count = data.data[0] ? data.data[0].share_count + data.data[0].like_count : 0;
          $facebook_button.append($('<span class="data-count" />').text(minimise_number(count)));
        }
      });
      url = $twitter_button.data('url');
      $.ajax({
        dataType: 'json',
        url: 'https://cdn.api.twitter.com/1/urls/count.json?url=' + url + '&callback=?',
        success: function(data) {
          var count = isNaN(parseInt(data.count, 10)) ? 0 : data.count;
          $twitter_button.append($('<span class="data-count" />').text(minimise_number(count)));
        }
      });
      url = $pinterest_button.data('url');
      $.ajax({
        dataType: 'json',
        url: 'http://api.pinterest.com/v1/urls/count.json?url=' + url + '&callback=?',
        success: function(data) {
          var count = isNaN(parseInt(data.count, 10)) ? 0 : data.count;
          $pinterest_button.append($('<span class="data-count" />').text(minimise_number(count)));
        }
      });

    }
  });
}).call(this);
