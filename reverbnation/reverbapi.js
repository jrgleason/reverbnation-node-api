var cheerio = require('cheerio');
var http = require('http');
function ReverbApi(){
    this.host = "www.reverbnation.com";
    this.port = "80";
    this.path = "/";
    this.method = "GET";
}
ReverbApi.prototype.mainPath = "/";
ReverbApi.prototype.artistName = "xavimalacara"
ReverbApi.prototype.text ="";
ReverbApi.prototype.artistNumber = "3487835";
ReverbApi.prototype.mainPage = function(callback){
  this.path = this.mainPath+this.artistName;
  var req = http.request(this, function(res) {
    res.setEncoding('utf8');
    var text = "";
    res.on('data', function (chunk) {
      text = text + chunk;
    });
    res.on('end', function(){
      callback(text);
    });
  });
  req.end();
}
ReverbApi.prototype.bioPage = function(callback){
  this.path = this.mainPath+"artist_"+this.artistNumber+"/bio";
  var req = http.request(this, function(res) {
    res.setEncoding('utf8');
    var text = "";
    res.on('data', function (chunk) {
      text = text + chunk;
    });
    res.on('end', function(){
      callback(text);
    });
  });
  req.end();
}
ReverbApi.prototype.links = function(text, callback){
  $ = cheerio.load(text);
  var ahrefs = $('#profile_website_items').find('.websites > a')
  var length = ahrefs.length;
  var links = [];
  ahrefs.each(function(i){
    if(i==(length-1)){
          links.push($(this).attr('href'));
          callback(links);
                    
    }
    else{
          links.push($(this).attr('href'));
    }
  });
}
// First HTML element is the Bio
ReverbApi.prototype.bioHtml = function(text, callback){
  $ = cheerio.load(text);
  var bios = $('.page_object_bio').find('p'),
      count = bios.length,
      result = []
  bios.each(function(i){
     result.push($(this).html());
     if (--count==0) callback(result);
  });
}
ReverbApi.prototype.bio = function(text, callback){
  $ = cheerio.load(text);
  var bios = $('.page_object_bio').find('p'),
      count = bios.length,
      result = []
  bios.each(function(i){
     result.push($(this).text());
     if (--count==0) callback(result);
  });
}
exports.ReverbApi = ReverbApi;

