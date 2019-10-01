

makeCountyObj= function(d){countyObj={}
groupedImplicit.forEach(function(d) {
    return countyObj[d.key] = d.value;
});}


makeGroupedImplicit= function(d){
  groupedImplicit=d3.nest()
    .key (function (d){return d.fips})
    .rollup(function(v) {
      return { "implicitbiasbinned":d3.mean(v, function(d) { return d.implicitbiasbinned; }),
    "explicitbias": d3.mean(v, d=> d.explicitbias),
    "diversityindex": d3.min(v, d=>d.diversity),
    "countyname": d3.min(v, d=>d.County),
    "statename": d3.min(v, d=>d.STATE),
    "datapointcount": (v.length),
    "medianhouseholdincome": d3.min(v, d=>d.med_hhinc2016),
    "populationcollplus": d3.min(v, d=>d.frac_coll_plus2010)

              };
          })
    .entries(dataFilter);
}


function renderText() {

    let textHeader = d3.select('#textDescription h3');
    let textDescription = d3.select('#textDescription p');
    let textFootnote = d3.select('#source > footnote');

    let title = cols[measure].title;
    let description = cols[measure].description;
    let url = cols[measure].url;
    let source = cols[measure].source;

    textHeader.style("opacity", 0).transition().duration(1000).style("opacity", 1).text(title);
    textDescription.style("opacity", 0).transition().duration(1000).style("opacity", 1).text(description);
    textFootnote.html('<em>Source: </em><span><a href="' + url + '" target="_blank">' + source + '</span></a>');

}

function bindHover() {
  // console.log(countyObj)
    document.body.addEventListener('mousemove', function(e) {


        if (e.target.nodeName == 'path' && e.target.className.animVal !== 'state-border') {
            let d = d3.select(e.target).data()[0];


            let value = countyObj[d.id][measure];
            let content = '';
            if (value === null) {
                content = countyObj[d.id].County + ', ' + countyObj[d.id].State + '<br>' + 'No data';
            } else {
                value = cols[measure].type == 'percentage' ? measure == 'countywinrate' ? Math.abs(value/100) : (value / 100): value;
                content = countyObj[d.id]["countyname"] + ', ' + countyObj[d.id]["statename"] + '<br>'+ "Diversity Index: " +countyObj[d.id]["diversityindex"]+ '<br>'+ "Median Household Income: " +countyObj[d.id]["medianhouseholdincome"] + '<br>'+ "% Population College Plus: " +countyObj[d.id]["populationcollplus"] + '<br>' + cols[measure].label + ': ' + d3.format(cols[measure].format)(value) + '<br>'+"Number of datapoints: " + countyObj[d.id]["datapointcount"];
            }

            showDetail(e, content);
        }
    });

    document.body.addEventListener('mouseout', function(e) {
        if (e.target.nodeName == 'path') hideDetail();
    });
}

function hideDetail() {

      // hide tooltip
      return tooltip.style("visibility", "hidden");
  }
