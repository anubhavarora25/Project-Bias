var currentState = {
 'generation': 'millenial',
 'currentgender': 'female',
 'race': 'white'
}

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 280},
  width = 560 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_hist = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width_scatter + margin.left + margin.right + 100)
    .attr("height", height_scatter + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// get the data
d3.csv("raceprunedsample6.csv", function(error, data) {

// List of groups for dropdowns
var allGroup = d3.map(data, function(d){return(d.generation)}).keys()
var allGroup2 = d3.map(data, function(d){return(d.currentgender)}).keys()
var allGroup3 = d3.map(data, function(d){return(d.race)}).keys()

// add the options to the button - generation
d3.select("#selectButton")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

d3.select("#selectButton2")
    .selectAll('myOptions')
    .data(allGroup2)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

d3.select("#selectButton3")
    .selectAll('myOptions')
    .data(allGroup3)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

// X axis: scale and draw:
var x_hist = d3.scaleLinear()
    .domain([-3.5,3.5])
    .range([-width, width]);
var xAxis_hist = svg_hist.append("g")
    .attr("transform", "translate(0," + height_scatter + ")")
    .call(d3.axisBottom(x));

    // var y = d3.scaleLinear()
    //   .domain([-3, 3])
    //   .range([height, 0]);
    // var yAxis = svg.append("g")
    //   .call(d3.axisLeft(y));

//histogram function for drawing histograms
var histogram1 = d3.histogram()
    .value(function(d) { return +d.implicitbiasbinned; })
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(40)); // then the numbers of bins

var histogram2 = d3.histogram()
      .value(function(d) { return +d.explicitbias; }) // give a vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(40)); // then the numbers of bins

var bins1 = histogram1(data);
var bins2 = histogram2(data);

// Y axis: scale and draw:
var y_hist = d3.scaleLinear()
    .range([height_scatter, 0]);
    y_hist.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
var yAxis = svg_hist.append("g")
    .call(d3.axisLeft(y));

function updateChart(selectedGroupObj) {
// console.log(selectedGroupObj)
// console.log('data', data)

//subset dataset based on filters applied in dropdowns
//the next checkX functions ensure that even if only one dropdown is selected,
//the return function at the bottom doesn't return a null
var dataFilter = data.filter(function(d){
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

  return (
    checkRace() && checkGender() && checkGeneration()
  )
})

console.log(dataFilter)

  //bins to decide height of y-axis and histogram 1
  bins1 = histogram1(dataFilter)

  //redraw y-axis when dropdowns are changed
  y_hist
  .domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  // svg.append("g")
  yAxis_hist
  .transition()
  .duration(1000)
  .call(d3.axisLeft(y));

  //draw chart for the firt time and update subsequently whenever dropdown changes
  let hist = svg_hist.selectAll("rect")
    .data(bins1)
  hist
  .enter()
  .append("rect") // Add a new rect for each new elements
  .merge(u) // get the already existing elements as well
  // .transition()
  // .duration(1000)
  .attr("x", 1)
  .attr("transform", function(d) { return "translate(" + x_hist(d.x0) + "," + y_hist(d.length) + ")"; })
  .attr("width", function(d) { return x_hist(d.x1) - x_hist(d.x0) -1 ; })
  .attr("height", function(d) { return height_scatter - y_hist(d.length); })
  .style("fill", "#69b3a2")
  .style("opacity", 0.6)

  hist
  .exit()
  .remove()

  //draw chart 2
  bins2 = histogram2(dataFilter)

  let hist_2 = svg_hist.selectAll("rect2")
    .data(bins2)
  hist_2
  .enter()
  .append("rect") // Add a new rect for each new elements
  .merge(hist_2) // get the already existing elements as well
  // .transition()
  // .duration(1000)
  .attr("x", 14)
  .attr("transform", function(d) { return "translate(" + x_hist(d.x0) + "," + y_hist(d.length) + ")"; })
  .attr("width", function(d) { return x_hist(d.x1) - x_hist(d.x0) -1 ; })
  .attr("height", function(d) { return height_scatter - y_hist(d.length); })
  .style("fill", "#404080")
  .style("opacity", 0.6)

  v
  .exit()
  .remove()
}

//call update for the first time with hard-coded filter values
updateChart(currentState)

//handmade legend
svg_hist.append("circle").attr("cx",420).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
svg_hist.append("circle").attr("cx",420).attr("cy",60).attr("r", 6).style("fill", "#404080")
svg_hist.append("text").attr("x", 440).attr("y", 30).text("Implicit Bias").style("font-size", "15px").attr("alignment-baseline","middle")
svg_hist.append("text").attr("x", 440).attr("y", 60).text("Explicit Bias").style("font-size", "15px").attr("alignment-baseline","middle")

//listen to the dropdowns - call update when any of the dropdowns are selected
  d3.select("#selectButton").on("change", function(d){
    currentState['generation'] = this.value
    updateChart(currentState)
  })

  d3.select("#selectButton2").on("change", function(d){
      currentState['currentgender'] = this.value
      updateChart(currentState)
  })

  d3.select("#selectButton3").on("change", function(d){
      currentState['race'] = this.value
      updateChart(currentState)
  })

});
