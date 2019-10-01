// color
var bias_domain=[-2,-1,-0.5,0,.5,1,2];
var bias_color=d3.scaleThreshold()
  .domain(bias_domain)
  .range(d3.schemeGreens[7]);

//implicit
var implicitData= d3.map();

//asynchronous tasks, load topojson maps and data
d3.queue()
  .defer (d3.json, "data/us-10m.json")
  .defer (d3.csv, "data/raceprunedsample.csv", function(d){
    implicitData.set(+d.fips, +d.implicitbias)
  })
  .await (ready);

let width=600;
let height=900;

//callback function
function ready (error,data){
  if (error) throw error;
//US map definition
  var usMap=topojson.feature(data,{
    type: "GeometryCollection",
    geometries: data.objects.counties.geometries
  })
// projection
  var projection=d3.geoAlbersUsa()
    .fitExtent([[20,20],[960,580]], usMap);

  var geoPath=d3.geoPath()
    .projection(projection);
  
//draw the map
  var svg=d3.selectAll("svg.bias").selectAll("path")
    .data(usMap.features)
    .enter()
    .append("path")
    .attr("width",width)
    .attr("height",height)
    .attr("d",geoPath)
    .attr("fill",function(d){
      return bias_color(d.implicit=implicitData.get(d.id))
    })
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))

}
