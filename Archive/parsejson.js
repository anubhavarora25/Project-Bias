
 d3.json("countygeojson.json", function(error, data){
   data.features.forEach(function(poly){
      let cfp=poly["properties"]["COUNTYFP"];
      let sfp=poly["properties"]["STATEFP"];
      let fips=cfp+sfp;

      poly["properties"] = {"FIPS":String(fips)};






 });
 console.log(data);


});
