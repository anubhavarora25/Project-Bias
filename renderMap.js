    // render map colors based on data

    function renderMap() {

        // counter for missing counties (usually in Alaska)
        let countMissing = 0;


        let extent = d3.extent(groupedImplicit, function(d) {
            return d.value[measure];
        });

        color = d3.scaleSequential().interpolator( measure == 'explicitbias' ? d3.interpolatePRGn : measure == 'implicitbiasbinned' ? d3.interpolatePRGn : d3.interpolateOranges);
        // let color = measure == 'countywinrate' ? d3.scaleSequential().interpolator(d3.interpolateRdBu) : d3.scaleQuantize().range(d3.schemeOranges[9]);
        color.domain(measure == 'explicitbias' ? [+3,-3]: measure == 'implicitbiasbinned' ? [3, -3] : [extent[0], extent[1]]);

        d3legend
            .labelFormat(function(d) {
                let value;

                if (cols[measure].type == 'percentage') {
                    value = measure == 'countywinrate' ? Math.abs(d/100) : (d / 100);
                }
                else {
                    value = measure == 'countywinrate' ? Math.abs(d) : d;
                }
                return d3.format(cols[measure].format)(value);
            })
            .title(cols[measure].label)
            .scale(d3.scaleSequential().interpolator(d3.interpolatePRGn));

        // if legend already exists, remove and create again

        //
        // d3legend2
        //     .labelFormat(function(d) {
        //         let value="explicitbias";
        //
        //         if (cols[measure].type == 'percentage') {
        //             value = measure == 'countywinrate' ? Math.abs(d/100) : (d / 100);
        //         }
        //         else {
        //             value = measure == 'countywinrate' ? Math.abs(d) : d;
        //         }
        //         return d3.format(cols["explicitbias"].format)(value);
        //     })
        //     .title(cols["explicitbias"].label)
        //     .scale(d3.scaleSequential().interpolator(d3.interpolatePiYG));
        //
        // // if legend already exists, remove and create again
        // svg.select('.legend').remove();



        // create legend
        legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width / 24) + "," + (height * 24/28) + ")");
            legend
              .call(d3legend);

        // // create legend
        // legend2 = svg.append("g")
        //     .attr("class", "legend2")
        //     .attr("transform", "translate(" + (width / 24) + "," + (height *13/14) + ")");
        //     legend2
        //       .call(d3legend2);

            countyPath
              .transition()
              .duration(1000)
              .attr("id","countyFill")
              .style("fill", function(d) {

        county = countyObj[d.id];


              if (county && isNaN(county[measure]) === true) {
                  // console.log("FIPS Code: " + d.id + " does not have data");
                  return '#c7c7c7';
              }
              else if (county) {
                  return color(county[measure]);
              }
              else {
                  countMissing++;
                  // console.log("FIPS Code: " + d.id + " not found. Error #" + countMissing);
                  return '#c7c7c7';
              }
      });



    } //render map close
