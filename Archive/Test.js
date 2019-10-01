var chart1 = dc.scatterPlot("#test1");
var chart2 = dc.scatterPlot("#test2");
var chart3 = dc.barChart("#test3");

var data = "x,y,z,fruit\n" +
    "8,1,3,Apple\n" +
    "5,2,11,Banana\n" +
    "12,13,13,Banana\n"+
    "5,3,20,Banana\n"+
    "12,12,10,Apple\n"+
    "3,6,8,Orange\n"+
    "11,2,9,Apple\n"+
    "8,6,14,Apple\n"+
    "1,4,9,Orange\n"+
    "8,8,12,Apple\n";

var data = d3.csvParse(data);
data.forEach(function (x) {
    x.x = +x.x;
    x.y = +x.y;
    x.z = +x.z;
});
var ndx = crossfilter(data);

    dim1 = ndx.dimension(function (d) {
        //return [+d.x, +d.y, d.fruit];
        return [+d.x, +d.y];
    }),
    dim2 = ndx.dimension(function (d) {
        //return [+d.y, +d.z, d.fruit];
        return [+d.y, +d.z];
    }),
    group1 = dim1.group(),
    group2 = dim2.group(),

    fruitDimension = ndx.dimension(function(d) {return d.fruit;});
    xGroup = fruitDimension.group().reduceCount();
		console.log(data);
 var colorScale = d3.scaleOrdinal()
									    .domain(["Apple", "Banana","Orange"]) // recipe names
											.range(["red", "green", "blue"]);

chart1.width(300)
    .height(300)
    .x(d3.scaleLinear().domain([0, 20]))
    .yAxisLabel("y")
    .xAxisLabel("x")
    .clipPadding(10)
    .colorAccessor(function(d) {
							    return d.key[2];
							})
	  .colors(colorScale)
    .dimension(dim1)
    //.excludedOpacity(0.5)
    .group(group1);
chart2.width(300)
    .height(300)
    .x(d3.scaleLinear().domain([0, 20]))
    .yAxisLabel("z")
    .xAxisLabel("y")
    .clipPadding(10)
    .colorAccessor(function(d) {
							    return d.key[2];
							})
	  .colors(colorScale)
    .dimension(dim2)
    //.excludedColor('#ddd')
    .group(group2);

chart3
    .width(400)
    .height(250)
		.margins({top: 10, right: 50, bottom: 30, left: 40})
    .x(d3.scaleBand())
    .brushOn(false)
    .elasticY(true)
    .dimension(fruitDimension)
		.group(xGroup)
    //.centerBar(true)
    .xUnits(dc.units.ordinal);


dc.renderAll();
