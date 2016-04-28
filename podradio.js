/*
Version 1.0
By Brian Rollins (BrianRollins.com)

Requires jQuery 1.4 or higher
Tested with jQuery 2.2.3

***Params***
src (String): The URL of the podcast's RSS feed.
id (String): The ID of the div the player will get written into. Also used to create unique tags for the controls.
reverse (Boolean): Reverse the order of the episodes. Usually the RSS has newest first,
                   but if you want the oldest to be first, set this to true. Default: false.

***Usage***
var newPodradio      = new podradio("http://some.rss.feed.url", "newPlayerID");
var reversedPodradio = new podradio("http://another.rss.feed.url", "anotherPlayerID", false);
*/
function podradio(src, id, reverse) {
  if(typeof(reverse)==="undefined"){
    var reverse = false;
  }
  var encodedSrc = encodeURIComponent(src);
  var t = $("#"+id);
  this.id = id;
  this.src = src;
  this.total = 0;
  this.curr = 0;
  $.ajax({
      type: "GET",
      url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'"+encodedSrc+"'&format=json&diagnostics=true&callback=",
      dataType: "json",
      context : this,
      success: function(data) {
        //console.log(data);
        //Load some of the data into the object for potential future use.
        this.results = data.query.results.rss;
        this.total = this.results.channel.item.length;
        this.curr = this.results.channel.item.length-1;
        this.title = this.results.channel.title;
        this.description = this.results.channel.description;
        this.author = this.results.channel.author;
        t.append("<h1 class='podradioPodcastTitle'>"+this.results.channel.title+"</h1>");
        if (reverse) {
          this.results.channel.item.reverse();
        }
        for (var i=this.total-1; i>=0; i-- ) {
            var item = this.results.channel.item[i];
            var d = new Date(item.pubDate);
            t.append("<div id='podRadioContainer_" +this.id+"_"+ i + "' class='podRadioContainer' style='display:none;'></div>");
            container = $("#podRadioContainer_"+this.id+"_"+i);
            container.append("<h2 class='podradioEpisodeTitle'>"+item.title+" ("+(this.total-i)+"/"+this.total+")</h2>");
            container.append("<h3 class='podradioEpisodeDate'>"+d.toLocaleDateString()+"</h3>");
            container.append("<p class='podradioEpisodeDesc'>"+item.description+"</p>");
            container.append("<audio controls id='podradioPlayer"+id+"_"+i+"'><source src='" + item.enclosure.url + "' type='" + item.enclosure.type + "'/></audio>");
        }
        if (typeof(this.ready) !== "undefined"){
          this.ready();
        }
        $("#podRadioContainer_"+this.id+"_"+this.curr).show();
      }
    }); //End AJAX call.
    this.next = function(){
      if(this.curr > 0) {
        this.goto(this.curr-1);
      }
    };
    this.prev = function(){
      if(this.curr < this.total-1){
        this.goto(this.curr+1);
      }
    };
    this.goto = function(g) {
      $("#podRadioContainer_"+this.id+"_"+this.curr).hide();
      this.curr = g;
      $("#podRadioContainer_"+this.id+"_"+this.curr).show();
    };
    this.first = function(){
      this.goto(this.total-1);
    };
    this.last = function(){
      this.goto(0);
    }
};
