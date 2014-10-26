I am still working on this but an example looks like...

    var reverb = require('../reverbnation/reverbapi.js');
    var ReverbApi = exports.ReverbApi = reverb.ReverbApi;
    var reverb = new ReverbApi();

    var getLinks = function(req,res){
      var parent_res = res;
      reverb.mainPage(
        function(text){
          reverb.links(text,function(list){
            parent_res.setHeader('Content-Type', 'application/json');
            parent_res.end(JSON.stringify(list));
          })
        }
      );
    }
    var getBios = function(req,res){
      var parent_res = res;
      reverb.bioPage(
        function(text){
          reverb.bio(text, function(list){
            parent_res.setHeader('Content-Type', 'application/json');
            parent_res.end(JSON.stringify(list));
          })
        }
      );
    }
