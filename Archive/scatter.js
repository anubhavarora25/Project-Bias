
// set the dimensions and margins of the graph
var margin = {top: 50, right: 30, bottom: 30, left: 280},
    width_scatter = 560 - margin.left - margin.right,
    height_scatter = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
svg_scatter = d3.select("#my_dataviz_scatter")
  .append("svg")
    .attr("width", width_scatter + margin.left + margin.right)
    .attr("height", height_scatter + margin.top + margin.bottom)
    .style("background", "#f2f4f7")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  // Add X axis
x_scatter = d3.scaleLinear()
    .domain([-3,3])
    .range([ -width_scatter, width_scatter ]);
xAxis_scatter = svg_scatter.append("g")
    .attr("transform", "translate(0," + height_scatter/2 + ")")
    .call(d3.axisBottom(x_scatter));

sequentialScale_scatter = d3.scaleSequential()
  .domain([-3, 3])
  .interpolator(d3.interpolatePuOr);

  //Add Y axis
y_scatter = d3.scaleLinear()
    .domain([-3, 3])
    .range([height_scatter, 0]);
yAxis_scatter = svg_scatter.append("g")
    .call(d3.axisLeft(y_scatter));

  // create a tooltip
tooltip_scatter = d3.select("#my_dataviz_scatter")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("font-size", "16px")
      .style("position", "absolute")

  // Three function that change the tooltip when user hover / move / leave a cell
mouseover_scatter = function(d) {
    tooltip_scatter
      .transition()
      .duration(200)
      .style("opacity", 1)
    tooltip_scatter
        .html("<span style='color:grey'>Discrimination: </span>" + d.discrimination)  // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
        .style("left", (d3.mouse(this)[0]-10) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
  }

mouseleave_scatter = function(d) {
    tooltip_scatter
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  //Add a clipPath: everything out of this area won't be drawn.
clip_scatter = svg_scatter.append("defs").append("svg:clipPath")
    .attr("id", "clip_scatter")
    .append("svg:rect")
    .attr("width", width_scatter*2 )
    .attr("height", height_scatter*2 )
    .attr("x", -width_scatter)
    .attr("y", -10);

// Create the scatter variable: where both the circles and the brush take place
scatter = svg_scatter.append('g')
    .attr("clip-path", "url(#clip_scatter)")


//Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
zoom_scatter = d3.zoom()
      .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
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










})
