'use strict';

$(document).ready(function() {
    /* You code here
    var endpoint = "";
    var strength = null;
    var endurance = null;
    var interval = null;
    var peak = null;*/
    var numberOfItems = 22,
    speed = 2000;
    $.getJSON("http://dev.campgladiator.com/api/v2/cggames/participants/ranks?gameID=7&groupByDivision=true",
    function(json) {
      _.each(json, function (obj) {
        //console.log(obj);
        _.each(obj, function(division){
          //console.log(division.cgGamesBibNumber);
          _.each(division, function(camper){
            //console.log(camper.cgGamesBibNumber);
            if(camper.cgGamesBibNumber == 'undefined' || camper.cgGamesBibNumber == null){
              return false
            }
            else{
              var bib = camper.cgGamesBibNumber,
                  name = camper.participantFirstname,
                  strength = null,
                  endurance = null,
                  interval = null,
                  peak = null,
                  rank = camper.rank,
                  camperDivisionID = camper.cgGamesDivisionID,
                  camperDivisionName = camper.cgGamesDivisionName;
              _.each(camper.times, function(user){
                //console.log(user.participantFirstname);
                switch(user.exName){

                    case "Strength & Agility":
                        strength = user.exDivisionRank ? user.exDivisionRank : null;
                    case "Endurance":
                        endurance = user.exDivisionRank ? user.exDivisionRank: null;
                    case "Interval":
                        interval = user.exDivisionRank ? user.exDivisionRank : null;
                    case "Peak":
                        peak = user.exDivisionRank ? user.exDivisionRank : null;
                }
              });


                var html = "<li>" +
                    "<span class='bib'>" + bib + "</span>" +
                    "<span class='name'>" + name + "</span>" +
                    "<span>" + endurance + "</span>" +
                    "<span>" + interval + "</span>" +
                    "<span>" + peak + "</span>" +
                    "<span>" + strength + "</span>" +
                    "<span>" + rank + "</span>" +
                    "<span class='hide division-id'>" + camperDivisionID + "</span>" +
                    "<span class='hide division-name'>" + camperDivisionName + "</span>" +
                    "</li>";

                $('#rollingData .list-body').append(html);



            $('#rollingData').vTicker({
                speed: speed,
                pause: 0,
                mousePause: true,
                animate: true,
                showItems: numberOfItems
            });

            function updateDivision() {
                var currentCamper = null;

                $('#rollingData').on('vticker.beforeTick', function() {
                    currentCamper = $("#rollingData .list-body li:first-child span.division-id").html();
                    var divisionName = $('.division-name').html();
                    $('.division').html(divisionName);
                });

                $('#rollingData').on('vticker.afterTick', function() {
                    var nextCamper = $("#rollingData .list-body li:first-child span.division-id").html();
                    if(nextCamper !== currentCamper){
                        var divisionName = $('.division-name').html();
                        $('.division').html(divisionName);
                    }
                });
            }
            updateDivision();

}

        });
      });
    });
});
});
