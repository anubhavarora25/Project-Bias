var implicitChart = dc.barChart('#implicit-chart');

var data = d3.csv("data/raceprunedsample.csv", function(error, data) {
  if (error) throw error;


/*let setElasticYCheckbox = document.querySelector("#setElasticY");
  setElasticYCheckbox.addEventListener("change", function() {
    let barCharts = [
      victimAgeChart,
      victimRaceChart,
      victimSexChart,
      suspectAgeChart,
      suspectRaceChart,
      suspectSexChart,
      crimeTimelineChart
    ];
    barCharts.forEach(chart => chart.setElasticY(this.checked));
    dc.redrawAll();
  });

 */


var ndx = crossfilter(data);

/*ndx.onChange(event => {
  if (event == "dataAdded") {
    dc.redrawAll();
  }
});
/* defining the data dimensions
*/



var educationDimension = ndx.dimension(d => d.education || "Unknown");

// let tester= [];
// data.forEach(function(d){
//   tester.push(d["education"]);
// });
// console.log(tester);

var educationGroup = educationDimension.group().reduceCount();



implicitChart
        .width(420)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .elasticY(true)
        .gap(1)
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .dimension(educationDimension)
        .group(educationGroup)
        .renderHorizontalGridLines(true);

dc.renderAll();

/*
let suspectRaceChart = new customBarChart({
  dimension: suspectRaceDimension,
  group: suspectRaceGroup,
  selector: "#suspectRace",
  xAxisLabel: "Suspect Race",
  yAxisLabel: "Number of Incidents"
});
suspectRaceChart.resize();

 */
 });
