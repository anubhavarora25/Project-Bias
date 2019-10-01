// var implicitChart = dc.barChart('#implicit-chart');
 var geoChoroplethChart = dc.geoChoroplethChart("#geoChoroplethChart");

var data = d3.csv("data/raceprunedsample.csv", function(error, data) {
    if (error) throw error;


    data.forEach(function(d){
                d.implicit = +d.implicitbias
            });

            var width = 1024,
                height = 600;

            // var projection = d3.geomercator()
            //     .scale(200)
            //     .translate([width/2, height]);
            //

            //




            //
            //
            //     .title(function (d) {
            //         return "State: " + d.key + " " + (d.value ? d.value : 0) + " Impressions";
            //     });



        var ndx = crossfilter(data);
        var fipsdim = ndx.dimension(d => d.fips || "Unknown");
        var fipsbiasgroup = fipsdim.group().reduceSum(function(d){return d.implicit});




        d3.json("data/geofile.json", function(error, jsdata){
          jsdata.features.forEach(function(poly){
          // //    let cfp=poly["properties"]["COUNTYFP"];
          // //    let sfp=poly["properties"]["STATEFP"];
             let fips=poly["properties"]["FIPS"];
          // //
          //    poly["properties"] = {"FIPS":String(fips)};
          // //    // console.log(poly);

             var projection=d3.geoAlbersUsa()
             .scale(1000)
             .translate([width/2, height/2]);

             var zoomSettings={
               duration:1000,
               ease:d3.easeCubicOut,
               zoomLevel:5
             };

             function clicked(d){
               var x;
               var y;
               var zoomLevel;
             }

             if (d && centered !==d){
               var centroid=path.centroid(d);
               x=centroid[0];
               y=centroid[1];
               zoomLevel=zoomSettings.zoomLevel;
               cenetered=d;
             }else{
               x= width/2;
               y=height/2;

             }



           //   var zoom = d3.zoom()
           // .scaleExtent([1, 8])
           // .on('zoom', zoomed);
           //
           //       var svg = d3.select("#geoChoroplethChart")
           //           .attr("width", width)
           //           .attr("height", height)
           //           .call(zoom);

             geoChoroplethChart
                        .projection(projection)
                        .width(width)
                        .height(height)
                        .transitionDuration(1000)
                        .dimension(fipsdim)
                        .group(fipsbiasgroup)
                        .filterHandler(function(dimension, filter){
                            dimension.filter(function(d) {return geoChoroplethChart.filter() != null ? d.indexOf
                            (geoChoroplethChart.filter()) >= 0 : true;}); // perform filtering
                            return filter; // return the actual filter value
                         })
                        .overlayGeoJson(data.features, "counties", function(d){
                            return d.properties.FIPS;})
                        .colors(d3.scaleThreshold().range(d3.schemeGreens[7]))
                        .colorDomain([-2,-1,-0.5,0,.5,1,2])
                        .colorCalculator(function(d){ return d ? geoChoroplethChart.colors()(d) : '#ccc'; });

                        function zoomed() {
                            svg
                             .attr('transform', d3.event.transform);
                            geoChoroplethChart.render();
                        };
          })


         });

         dc.renderAll();
         console.log("hi");

});

             // implicitChart
             //         .width(420)
             //         .height(180)
             //         .margins({top: 10, right: 50, bottom: 30, left: 40})
             //         .elasticY(true)
             //         .gap(1)
             //         .round(dc.round.floor)
             //         .alwaysUseRounding(true)
             //         .x(d3.scaleBand())
             //         .xUnits(dc.units.ordinal)
             //         .dimension(educationDimension)
             //         .group(educationGroup)
             //         .renderHorizontalGridLines(true);

             // d3.queue()
             //   .defer (d3.json, "countygeojson.json", function(error, data){
             //     data.features.forEach(function(poly){
             //        let cfp=poly["properties"]["COUNTYFP"];
             //        let sfp=poly["properties"]["STATEFP"];
             //        let fips=cfp+sfp;
             //
             //        poly["properties"] = {"FIPS":String(fips)};
             //        // console.log(poly);
             //      })
             //   })
             //   .defer (d3.csv, "data/raceprunedsample.csv", function(d){
             //     implicitData.set(+d.fips, +d.implicitbiaspositive)
             //   })
             //   .await (ready);
             //
