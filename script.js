// To Do: 1. Fix backspace bug 2. Sort aplhabetically  


$(document).ready(function() {

  var kewlFilter = 0
  var kewlArray = ["freecodecamp", "dendi", "thomasballinger", "noobs2ninjas", "beohoff", "monstercat", "admiralbulldog", "s4", "merlinidota", "vroksnak", "ppd", "arteezy", "sing_sing", "universedota", "zai", "miracle_doto", ];
  var filteredArray = [];

  filterFunction();

  //search

  $('#searchInput').keyup(function() {
    filterFunction();
  });

  function filterFunction() { // checks for value in the search input. Creates a new array (filteredarray) with the results

    $('#resultsContainer').empty();
    filteredArray = [];
 

    searchValue = $('#searchInput').val()

    for (var i = 0; i < kewlArray.length; i++) {

      if (kewlArray[i].indexOf(searchValue) !== -1) {
        filteredArray.push(kewlArray[i]);

      }
    }
    /////    

    ///////

    if (kewlFilter == 0) {
      $('#allBtn').click();
    }

    if (kewlFilter == 1) {
      $('#onlineBtn').click();
    }

    if (kewlFilter == 2) {
      $('#offlineBtn').click();
    }

  };

  //button click events

  $('#allBtn').click(function() {
    $('#one').css('background-color', 'yellow')
    $('#two, #three').css('background-color', 'black')
    $('#resultsContainer').empty();

    kewlFilter = 0;
    allResults();
  });
  $('#allBtn').click();

  $('#onlineBtn').click(function() {
    $('#two').css('background-color', 'yellow')
    $('#one, #three').css('background-color', 'black')
    $('#resultsContainer').empty();
    kewlFilter = 1;
    allResults();
  });

  $('#offlineBtn').click(function() {
    $('#three').css('background-color', 'yellow')
    $('#two, #one').css('background-color', 'black')
    $('#resultsContainer').empty();

    kewlFilter = 2;
    allResults();
  });

  // double (i.e. nested) api query

  function allResults() {

    filteredArray.forEach(function(user) {

      $.ajax({
        url: 'https://api.twitch.tv/kraken/users/' + user,
        type: 'get',
        datatype: 'jsonp',
        success: function(data) {

          var playerName = data['display_name']
          var playerLogo = data["logo"]
          var playerBio = data['bio']
          var kewlLinks = data._links['self']

          $.ajax({
            url: 'https://api.twitch.tv/kraken/streams/' + user,
            type: 'get',
            datatype: 'jsonp',
            success: function(data) {

              if (playerLogo !== null) {

                var isOnline = 'online'
                var isOffline = 'offline'

                if (data.stream == null && (kewlFilter == 0 || kewlFilter == 2)) {
                  // isOffline

                  $('#resultsContainer').append('<div id = "result"  class ="col-md-12">  ' + '<a href = "http://www.twitch.tv/' + user + '" + target = "_blank">' + '<img class = "imgT" src=' + playerLogo + '>' + '<div class = "isOffline col-lg-offset-10 col-md-offset-10 col-xs-offset-9">' + isOffline + '</div>'

                    + '<div class = "name col-md-offset-1">' + playerName + '</div>' + '<div class = "bio">' + playerBio + '</div>'
                    // + kewlLinks
                    + '</div>')

                } else if (data.stream !== null && (kewlFilter <= 1)) {
                  //isOnline
                  var status = data.stream.channel.status

                  $('#resultsContainer').append('<div id = "result"  class ="col-md-12">  ' + '<a href = "http://www.twitch.tv/' + user + '" + target = "_blank">' + '<img class = "imgT" src=' + playerLogo + '>' + '<div class = "isOnline col-md-offset-10 ">' + isOnline + '</div>' + '<div class = "name col-md-offset-1">' + playerName + '</div>' + '<div class = "bio">' + playerBio + '</div>' + '<br><div class = "fa fa-twitch fa-spin">' + '</div>' + '<div id = "status"> ' + status + '</div>' + '</div>')

                }
              }
            }
          })

        }
      })
    })
  }
});