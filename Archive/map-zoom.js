// color
var bias_domain=[-2,-1,-0.5,0,.5,1,2];
var bias_color=d3.scaleThreshold()
  .domain(bias_domain)
  .range (['#4d9221', '#a1d76a', '#e6f5d0', '#f7f7f7', '#fde0ef', '#e9a3c9', '#c51b7d']);
  // (d3.schemeGreens[7]);

  var width = 960;
  var height = 600;
  var padding = 20;

  // projection
    var projection=d3.geoAlbersUsa()
      // .fitExtent([[20,20],[960,580]], usMap)
      .precision(0)
      .scale(height * 2).translate([width / 2, height / 2]);

    var path=d3.geoPath()
      .projection(projection);

    var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

//implicit
var implicitData= d3.map();

//asynchronous tasks, load topojson maps and data
d3.queue()
  .defer (d3.csv, "data/raceprunedsample.csv", function(d){
    implicitData.set(+d.fips, +d.implicitbias, +d.FIPSState)
  })
  .defer (d3.json, "data/us-states.json")
  .defer (d3.json, "data/us-10m.json")
  .await (ready);


//callback function
function ready (error,data){
  if (error) throw error;
//US map definition
  // var data=results[0];
  var states=topojson.feature(data,{
    type: "GeometryCollection",
    geometries: data.objects.states.geometries
  });
  var counties=topojson.feature(data,{
    type: "GeometryCollection",
    geometries: data.objects.counties.geometries
  });
  states.forEach(function (f) {
        f.properties = data.find(function (d) { return d.id === f.id })
    })

  var statePaths = svg.selectAll('.state')
            .data(states)
            .enter().append('path')
            .attr('class', 'state')
            .attr('d', path)
            .style('fill', function (d) { return color(d.implicit=implicitData.get(d.id)) })
            .on('click', function (d) { stateZoom(d.id) })

  function usZoom() {
          var t = d3.transition().duration(800)

          projection.scale(height * 2).translate([width / 2, height / 2])

          statePaths.transition(t)
              .attr('d', path)
              .style('fill', function (d) { return color(d.implicit=implicitData.get(d.id)) })

          svg.selectAll('.county')
              .data([])
              .exit().transition(t)
              .attr('d', path)
              .style('opacity', 0)
              .remove()
      }

  function stateZoom(id) {
          var state = states.find(function (d) { return d.id === id })

          var t = d3.transition().duration(800)

          var countyPaths = svg.selectAll('.county')
              .data(usMap.features)

          var enterCountyPaths = countyPaths.enter().append('path')
              .attr('class', 'county')
              .attr('d', path)
              .style('fill', function (d) { return color(d.implicit=implicitData.get(d.id)) })
              .style('opacity', 0)
              .on('click', function () { usZoom() })

          projection.fitExtent(
              [[padding, padding], [width - padding, height - padding]],
              state
          )

          statePaths.transition(t)
              .attr('d', path)
              .style('fill', '#444')

          enterCountyPaths.transition(t)
              .attr('d', path)
              .style('opacity', 1)

          countyPaths.exit().transition(t)
              .attr('d', path)
              .style('opacity', 0)
              .remove()
      }
  }

//draw the map
  // d3.selectAll("svg.bias").selectAll("path")
  //   .data(usMap.features)
  //   .enter()
  //   .append("path")
  //   .attr("width",width)
  //   .attr("height",height)
  //   .attr("d",geoPath)
  //   .attr("fill",function(d){
  //     return bias_color(d.implicit=implicitData.get(d.id))
  //   })
