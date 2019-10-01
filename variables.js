let measure = 'explicitbias';

// define data and its attributes
const cols = {

    "implicitbiasbinned": {
        "label": "County Average Implicit Racial Bias Score",
        "type": "number",
        "format": ",f",
        "title": "Implicit Racial Bias Score",
        "latestyear": "2018",
        "url": "https://osf.io/y9hiq/",
        "source": "Project Implicit Demo Website Datasets",
        "description": "The map is now showing the rate of implicit bias towards black/white.",
        "code":1
    },
    "explicitbias": {
        "label": "County Average Explicit Racial Bias Score",
        "type": "number",
        "format": ",f",
        "title": "Explicit Racial Bias Score",
        "latestyear": "2018",
        "url": "https://osf.io/y9hiq/",
        "source": "Project Implicit Demo Website Datasets",
        "description": "The map is now showing the rate of explicit bias towards black/white.",
        "code":2
    }
    };

// spinner loader settings
const opts = {
    lines: 9, // The number of lines to draw
    length: 9, // The length of each line
    width: 5, // The line thickness
    radius: 14, // The radius of the inner circle
    color: '#c10e19', // #rgb or #rrggbb or array of colors
    speed: 1.9, // Rounds per second
    trail: 40, // Afterglow percentage
    className: 'spinner', // The CSS class to assign to the spinner
};

// create spinner
let target = d3.select("body").node();

// trigger loader
let spinner = new Spinner(opts).spin(target);

// create tooltip
let tooltip = d3.select("body").append("div").style("position", "absolute").style("z-index", "10").style("visibility", "hidden").attr("class", "tooltip");

// select element
let measureSelect = d3.select('#dimensions');

let width = 960;
let height = 720;

let projection = d3.geoAlbersUsa()
    .scale(1285)
    .translate([width / 2, height / 2]);

let path = d3.geoPath()
    .projection(null);


var currentState = {
 'generation': 'boomers',
 'currentgender': 'female',
 'race': 'white'
}

// Susie Lu's d3-legend plugin
// http://d3-legend.susielu.com/
let d3legend = d3.legendColor()
    .shapeWidth(width / 10)
    .cells(7)
    .orient("horizontal")
    .labelOffset(1)
    .ascending(true)
    .labelAlign("middle")
    .labels(["Strong Preference for White","Moderate", "Slight", "Neutral", "Slight", "Moderate", "Strong Preference for Black"])
    .shapePadding(1);

let d3legend2 = d3.legendColor()
    .shapeWidth(width / 10)
    .cells(7)
    .orient("horizontal")
    .labelOffset(1)
    .ascending(true)
    .labelAlign("middle")
    .labels(["Strong Preference for White","Moderate", "Slight", "Neutral", "Slight", "Moderate", "Strong Preference for Black"])
    .shapePadding(1);


let svg = d3.select("svg.map")
    .attr("width", width)
    .attr("height", height);

// create options for select element
var selectEnter = measureSelect.selectAll('option').data(d3.keys(cols).sort()).enter();

var selectUpdate = selectEnter.append('option');

selectUpdate.attr('value', function(d) {
    return d;
}).text(function(d) {
    return cols[d].title;
}).attr('selected', function(d) {
    if (d == measure) {
        return true;
    }
});


let countyObj = {}
let deeper
let deeper1
let deeper2
let deeper3
let deeper4
let avgPersonImplicit
let avgPersonExplicit
let personImplicit
let groupedImplicit
let runThis
let slider6
let allGroup
let allGroup2
let allGroup3
let allGroup4
let allGroup5
let dataFilter
let zoom
let group
let countyPath
let ageFilter
let raceFilter
let genderFilter
let stateFilter
let educationFilter
let makeCountyObj
let makeGroupedImplicit
let generateSliders
let assignAllGroup
let seeResult
let legend
let legend2
let county
let color
let svg_scatter
let x_scatter
let xAxis_scatter
let sequentialScale_scatter
let y_scatter
let yAxis_scatter
let tooltip_scatter
let mouseover_scatter
let mouseleave_scatter
let clip_scatter
let scatter
let zoom_scatter
let newX_scatter
let newY_scatter


ageFilter="boomers"
raceFilter="white"
genderFilter="female"
stateFilter= "MT"
educationFilter= "master's degree"
