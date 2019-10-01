"use strict";

        // default view for map
function createMap(error, us, data) {

      if (error) throw error;

      // stop spin.js loader
      spinner.stop();

      // parse data
      data.forEach(function(d) {

          d.implicitbiasbinned = +d['implicitbiasbinned'];
          d.implicitbiasscaled = +d['implicitbiasscaled'];
          d.explicitbias = +d['explicitbias'] || null;
          d.fips= d['fips'];
          // countyObj[d.fips] = d;

      });
// "hi"
      personImplicit=Array.from(d3.group(data, d=>d.generation))
      .map(function(q){return[q[0],Array.from(d3.group(q[1], d => d.race))
      .map(function(v){return[v[0],Array.from(d3.group(v[1], d => d.currentgender))
          .map(function(w){return[w[0],Array.from(d3.group(w[1],d=>d.STATE))
              .map(function(z){return[z[0],Array.from(d3.group(z[1],d=>d.education))]
              })]})]})]})

      // List of groups for dropdowns

      assignAllGroup(data)

      //update calculation on slider update
      d3.select("#age").on("change", function(d){
        d3.selectAll('#slider-6>*').remove()
        d3.selectAll('#slider-5>*').remove()
        ageFilter=this.value
        console.log(ageFilter)
        runThis(data)
        })

      d3.select("#race").on("change", function(d){
        d3.selectAll('#slider-6>*').remove()
        d3.selectAll('#slider-5>*').remove()
          raceFilter=this.value
          console.log(raceFilter)
          runThis(data)
          })

      d3.select("#gender").on("change", function(d){
        d3.selectAll('#slider-6>*').remove()
        d3.selectAll('#slider-5>*').remove()
          genderFilter=this.value
          console.log(genderFilter)
          runThis(data)
          })

      d3.select("#state").on("change", function(d){
        d3.selectAll('#slider-6>*').remove()
        d3.selectAll('#slider-5>*').remove()
          stateFilter=this.value
          console.log(stateFilter)
          runThis(data)
          })


      d3.select("#education").on("change", function(d){
        d3.selectAll('#slider-6>*').remove()
        d3.selectAll('#slider-5>*').remove()
          educationFilter=this.value
          console.log(educationFilter)
          runThis(data)
          })

//generate slider that shows average based on dropdown input
  runThis(data)


//SCATTER
  var margin = {top: 50, right: 30, bottom: 30, left: 280},
      width_scatter = 530 - margin.left - margin.right,
      height_scatter = 300 - margin.top - margin.bottom;

      var width_hist = 500 - margin.left - margin.right,
      height_scatter = 300 - margin.top - margin.bottom;
  // append the svg object to the body of the page
  svg_scatter = d3.select("#my_dataviz_scatter")
    .append("svg")
      .attr("width", width_scatter + margin.left + margin.right)
      .attr("height", height_scatter + margin.top + margin.bottom)
      // .style("background", "#f5f5f5")
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
  x_scatter = d3.scaleLinear()
      .domain([-3,3])
      .range([ -width_scatter, width_scatter ]);
  xAxis_scatter = svg_scatter.append("g")
      .attr("transform", "translate(0," + height_scatter/2 + ")")
      .call(d3.axisBottom(x_scatter))




  sequentialScale_scatter = d3.scaleSequential()
    .domain([3, -3])
    // .range(["green",'#fef1e6',"red"])
       // .interpolator(d3.interpolateRgb);
    .interpolator(d3.interpolatePRGn);



    //Add Y axis
  y_scatter = d3.scaleLinear()
      .domain([-3, 3])
      .range([height_scatter, 0]);
  yAxis_scatter = svg_scatter.append("g")
      .call(d3.axisLeft(y_scatter));

    // create a tooltip
  tooltip_scatter = d3.select("#my_dataviz_scatter")
        .append("g")
        .attr("data-html", "true")
        .style("opacity", 0)
        .attr("class", "tooltip_scatter")
        .style("font-size", "16px")
        .style("position", "relative")

    // Three function that change the tooltip when user hover / move / leave a cell
  mouseover_scatter = function(d) {
    var html= "State: " + d.STATE + "<br />County:" + d.County + "  <br />Age:  " + d.age + "  <br />Gender:  " + d.currentgender +"  <br />Generation:  " + d.generation + "  <br />Race:  " + d.race + "  <br />Education:  " + d.education + "  <br />Country of citizenship:  " +  d.countrycitizenship + "  <br />Are parents biased?:  " + d.parentsbias +"  <br />Discrimination:  " + d.discrimination

      tooltip_scatter
        .transition()
        .duration(100)
        .style("opacity", 1)
      tooltip_scatter
          .html(html)  // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
          // .text(function (d){return "hi" +"hi"})
           .transition()
           .duration(50)
          .style("left", (d3.mouse(this)[0]+40) + "px")
          .style("top", (d3.mouse(this)[1]-280) + "px")
          .style("opacity", 0.9)

    }

  mouseleave_scatter = function(d) {
      tooltip_scatter
        .transition()
        .duration(15000)
        .style("opacity", 0)
    }



    //Add a clipPath: everything out of this area won't be drawn.
  clip_scatter = svg_scatter.append("defs").append("svg_scatter:clipPath")
      .attr("id", "clip_scatter")
      .append("svg_scatter:rect")
      .attr("width", width_scatter*2 )
      .attr("height", height_scatter*2 )
      .attr("x", -width_scatter)
      .attr("y", -10);

  // Create the scatter variable: where both the circles and the brush take place
  scatter = svg_scatter.append('g')
      .attr("clip-path", "url(#clip_scatter)")


  // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
  zoom_scatter = d3.zoom()
        .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
        .extent([[0,0],[width_scatter,height_scatter]])
        .on("zoom", updateChartZoomScatter);

        // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
  svg_scatter.append("rect")
      .attr("width", width_scatter*2)
      .attr("height", height_scatter+70)
      .attr("x", -500)
      .attr("y", -80)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom_scatter);


//histogram
let svg_hist = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width_hist + margin.left + margin.right + 100)
    .attr("height", height_scatter + margin.top + margin.bottom)
  .append("g")
  // .style("background","#f5f5f5")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  //handmade legend
  svg_hist.append("circle").attr("cx",420).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
  svg_hist.append("circle").attr("cx",420).attr("cy",60).attr("r", 6).style("fill", "#404080")
  svg_hist.append("text").attr("x", 440).attr("y", 30).text("Implicit Bias").style("font-size", "15px").attr("alignment-baseline","middle")
  svg_hist.append("text").attr("x", 440).attr("y", 60).text("Explicit Bias").style("font-size", "15px").attr("alignment-baseline","middle")

  // X axis: scale and draw:
  var x_hist
  x_hist= d3.scaleLinear()
      .domain([-3.5,3.5])
      .range([-width_hist, width_hist]);

  var xAxis_hist
  xAxis_hist= svg_hist.append("g")
      .attr("transform", "translate(0," + height_scatter + ")")
      .call(d3.axisBottom(x_hist).tickSize(0).ticks(5));

      svg_hist.append("text")
          .attr("text-anchor", "end")
          .attr("x", width)
          .attr("y", height + margin.top + 20)
          .style("font-size", 8)
          .text("Bias Score");

      var histogram1= d3.histogram()
          .value(function(d) { return +d.implicitbiasbinned; })
          .domain(x_hist.domain())  // then the domain of the graphic
          .thresholds(x_hist.ticks(25)); // then the numbers of bins

      var histogram2 = d3.histogram()
            .value(function(d) { return +d.explicitbias; }) // give a vector of value
            .domain(x_hist.domain())  // then the domain of the graphic
            .thresholds(x_hist.ticks(25)); // then the numbers of bins




    // Y axis: scale and draw:
    var bins1=histogram1(data)
    var bins2=histogram2(data)

    var y_hist
    var   yAxis_hist

    y_hist= d3.scaleLinear()
        .range([height_scatter, 0]);
        y_hist.domain([0, d3.max(bins2, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis_hist
    yAxis_hist= svg_hist.append("g")
        .call(d3.axisLeft(y_hist));

  function updateCharts(selectedGroupObj) {
      // console.log(selectedGroupObj)
      // console.log('data', data)

      //subset dataset based on filters applied in dropdowns
      //the next checkX functions ensure that even if only one dropdown is selected,
      //the return function at the bottom doesn't return a null
      dataFilter = data.filter(function(d){
        let checkGeneration = function() {
          if (selectedGroupObj.hasOwnProperty('generation')) {
            return d.generation === selectedGroupObj.generation
          }
        }
        let checkGender = function() {
          if (selectedGroupObj.hasOwnProperty('currentgender')) {
            return d.currentgender === selectedGroupObj.currentgender
          }
        }
        let checkRace = function() {
          if (selectedGroupObj.hasOwnProperty('race')) {
            return d.race === selectedGroupObj.race
          }
        }
        if (d.explicitbias === 'NA') return false
        return (
          checkRace() && checkGender() && checkGeneration()
        )
      })

      makeGroupedImplicit(dataFilter)
      makeCountyObj(groupedImplicit)

      let centered;

            // define zoom function
            function zoomed() {
                group.attr("transform", d3.event.transform);
                // group.select(".nation").style("stroke-width", 0.5 / d3.event.scale + "px");
                // group.select(".state-border").style("stroke-width", 0.5 / d3.event.scale + "px");
                // group.select(".county-border").style("stroke-width", 0.1 / d3.event.scale + "px");
            }

            // When clicked, zoom in
            function clicked(d) {
                var x, y, k;
            // Compute centroid of the selected path
                if (d && centered !== d) {
                    // if (d) {
                    var centroid = path.centroid(d);
                    x = centroid[0];
                    y = centroid[1];
                    // k = zoom.scaleExtent()[1];
                    k = 10;
                    centered = d;
                }
                else {
                    x = width / 2;
                    y = height / 2;
                    k = 1;
                    centered = null;
                }

                // Manually Zoom
                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(k)
                        .translate(-x, -y));
            }

            // create background box for zoom
            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height);

            zoom = d3.zoom()
                .scaleExtent([1, 15])
                .on("zoom", zoomed);

            svg.style("pointer-events", "all")
                .call(zoom);

            group = svg.append("g");

            countyPath = group.selectAll(".counties")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter()
                .append('path')
                .attr("class", "county-border")
                .on("click", clicked)
                .attr("d", path);
                group.append("path")
           .datum(topojson.mesh(us, us.objects.states, function(a, b) {
               return a !== b;
           }))
           .attr("class", "state-border")
           .attr("d", path)


       group.append("path")
           .datum(topojson.feature(us, us.objects.nation))
           .attr("class", "nation-border")
           .attr("d", path);

       renderText();
       renderMap();
       bindHover();

// updatescatter
       scatter = svg_scatter.selectAll("circle")
                     .data(dataFilter)
       scatter
       .enter()
       .append("circle")
         .attr("cx", function (d) { return x_scatter(d.implicitbiasscaled); } )
         .attr("cy", function (d) { return y_scatter(d.explicitbias); } )
         .attr("r", 8)
         .style("fill", function(d){return sequentialScale_scatter(d.implicitbiasscaled)})
         // .style("stroke","black")
         .style("opacity", 0.7)
         .on("mouseover", mouseover_scatter)
         .on("mouseleave", mouseleave_scatter)


         // .merge(scatter)
         //   .attr("cx", function (d) { return x_scatter(d.implicitbiasbinned); } )
         //   .attr("cy", function (d) { return y_scatter(d.explicitbias); } )
         //   .attr("r", 8)
         //   .style("fill", function(d){return sequentialScale_scatter(d.implicitbiasbinned)})
         //   .style("stroke","black")
         //   .style("opacity", 0.7)
         //   .on("mouseover", mouseover_scatter)
         //   .on("mouseleave", mouseleave_scatter)
         //.style("stroke",1)
       scatter
       .exit()
       .remove()


       //histogram function for drawing histograms

//update SCATTER



       bins1= histogram1(dataFilter);

       bins2= histogram2(dataFilter);
       console.log(d3.max(bins2))



       //update SCATTER
       let color_hist1
       color_hist1= d3.scaleSequential()
         .domain([3, -3])
       //   // .range(["green",'#fef1e6',"red"])
       //   //    .interpolate(d3.interpolateRgb);
         .interpolator(d3.interpolatePRGn);

// let explicitcolor=d3.

// var color1 = d3.scaleLinear()
//         .domain([1, 20])
//         .range(['#d73027', '#1a9850'])
//         .interpolate(d3.interpolateHcl);

       let color_hist2
       color_hist2= d3.scaleSequential()
         .domain([3, -3])
       //   // .range(['blue','#fdfee6', 'orange'])
         .interpolator(d3.interpolatePRGn);
       //   // .interpolator(d3.interpolate({colors: ["blue","orange"]}))

         // .interpolator(d3.interpolateYlGnBu);

         //redraw y-axis when dropdowns are changed
         y_hist
         .domain([0, d3.max(bins2, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
         // svg.append("g")
         yAxis_hist
         .transition()
         .duration(1000)
         .call(d3.axisLeft(y_hist));
      //draw chart for the firt time and update subsequently whenever dropdown changes
      let hist
      hist= svg_hist.selectAll("rect")
        .data(bins1)
      hist
      .enter()
      .append("rect") // Add a new rect for each new elements
      .merge(hist) // get the already existing elements as well
      // .transition()
      // .duration(1000)
      .attr("x", -22)
      .attr("transform", function(d) { return "translate(" + x_hist(d.x0) + "," + y_hist(d.length) + ")"; })
      .attr("width", function(d) { return x_hist(d.x1) - x_hist(d.x0) +12 ; })
      .attr("height", function(d) { return height_scatter - y_hist(d.length); })
      // .style("fill", function(d){return color_hist1(d.x0)})
      // .style("stroke","red")
      .style("stroke-width","2")
      .style("fill","rgb(214, 195, 176)")
      .style("opacity", 0.9)

      hist
      .exit()
      .remove()

      //draw chart 2


      let hist_2
      hist_2= svg_hist.selectAll("rect2")
        .data(bins2)
      hist_2
      .enter()
      .append("rect") // Add a new rect for each new elements
      .merge(hist_2) // get the already existing elements as well
      // .transition()
      // .duration(1000)
      .attr("x", 0)
      .attr("transform", function(d) { return "translate(" + x_hist(d.x0) + "," + y_hist(d.length) + ")"; })
      .attr("width", function(d) { return x_hist(d.x1) - x_hist(d.x0) +12 ; })
      .attr("height", function(d) { return height_scatter - y_hist(d.length); })
      // .style("fill", function(d){return color_hist2(d.x0)})
      .style("fill","rgb(173, 207, 209)")
      // .style("stroke","blue")
      .style("stroke-width","2")
      .style("opacity", 0.9)

      hist_2
      .exit()
      .remove()




       // setResponsiveSVG();
       //listen to the dropdowns - call update when any of the dropdowns are selected
         d3.select("#selectButton").on("change", function(d){
           svg.selectAll("*").remove(),
           currentState['generation'] = this.value
           updateCharts(currentState)
         })

         d3.select("#selectButton2").on("change", function(d){
           svg.selectAll("*").remove(),
             currentState['currentgender'] = this.value
             updateCharts(currentState)
         })

         d3.select("#selectButton3").on("change", function(d){
           svg.selectAll("*").remove(),
             currentState['race'] = this.value
             updateCharts(currentState)
         })

       measureSelect.on('change', function(d) {
           measure = this.value;
           renderMap();
           renderText();
       });


    }

    function updateChartZoomScatter() {

      // recover the new scale
       var newX_scatter = d3.event.transform.rescaleX(x_scatter);
       var newY_scatter = d3.event.transform.rescaleY(y_scatter);

       // update axes with these new boundaries
        xAxis_scatter.call(d3.axisBottom(newX_scatter))
        yAxis_scatter.call(d3.axisLeft(newY_scatter))

        // update circle positions
         scatter = svg_scatter.selectAll("circle")
         scatter.attr('cx', function(d) {return newX_scatter(d.implicitbiasscaled)})
         .attr('cy', function(d) {return newY_scatter(d.explicitbias)});
     }

    updateCharts(currentState)
} // end of data

       // change factor description
       renderText()
       // define mouseover and mouseout events
       // to ensure mouseover events work on IE
       bindHover()

       // Show tooltip on hover
      function showDetail(event, content) {

            // show tooltip with information from the __data__ property of the element
            let x_hover = 0;
            let y_hover = 0;

            let tooltipWidth = parseInt(tooltip.style('width'));
            let tooltipHeight = parseInt(tooltip.style('height'));
            let classed, notClassed;

            if (event.pageX > document.body.clientWidth / 2) {
                x_hover = tooltipWidth + 30;
                classed = 'right';
                notClassed = 'left';
            }
            else {
                x_hover = -30;
                classed = 'left';
                notClassed = 'right';
            }

            y_hover = (document.body.clientHeight - event.pageY < (tooltipHeight + 4)) ? event.pageY - (tooltipHeight + 4) : event.pageY - tooltipHeight / 2;

            return tooltip
                .classed(classed, true)
                .classed(notClassed, false)
                .style("visibility", "visible")
                .style("top", y_hover + "px")
                .style("left", (event.pageX - x_hover) + "px")
                .html(content);
        }

      // Hide tooltip on hover
      hideDetail()

      d3.queue()
          .defer(d3.json, "https://unpkg.com/us-atlas@1/us/10m.json")
          .defer(d3.csv,"data/raceprunedsample7.csv")
          .await(createMap);
