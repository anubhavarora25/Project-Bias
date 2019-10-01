"use strict";

        // default view for map
        let measure = 'explicitbias';

        // define data and its attributes
        const cols = {

            "implicitbias": {
                "label": "County Average Implicit Racial Bias Score",
                "type": "number",
                "format": ",f",
                "title": "Implicit Racial Bias Score",
                "latestyear": "2018",
                "url": "https://osf.io/y9hiq/",
                "source": "Project Implicit Demo Website Datasets",
                "description": "Rate of implicit bias towards black/white.",
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
                "description": "Rate of explicit bias towards black/white.",
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
         'generation': 'millenial',
         'genderatbirth': 'female',
         'race': 'white'
        }

        // Susie Lu's d3-legend plugin
        // http://d3-legend.susielu.com/
        let d3legend = d3.legendColor()
            .shapeWidth(width / 10)
            .cells(9)
            .orient("horizontal")
            .labelOffset(3)
            .ascending(true)
            .labelAlign("middle")
            .shapePadding(2);

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


        let seeResult= function(){
           d3.select('#slider-6 .handle')
          .style('fill','blue');};


        let countyObj = {};

  function createMap(error, us, data) {

          if (error) throw error;

          // stop spin.js loader
          spinner.stop();

          // parse data
          data.forEach(function(d) {

              d.implicitbias = +d['implicitbias'];
              d.explicitbias = +d['explicitbias'] || null;
              d.fips= d['fips'];
              // countyObj[d.fips] = d;

          });

          let personImplicit=Array.from(d3.group(data, d=>d.generation))
          .map(function(q){return[q[0],Array.from(d3.group(q[1], d => d.race))
          .map(function(v){return[v[0],Array.from(d3.group(v[1], d => d.genderatbirth))
              .map(function(w){return[w[0],Array.from(d3.group(w[1],d=>d.STATE))
                  .map(function(z){return[z[0],Array.from(d3.group(z[1],d=>d.education))]
                  })]})]})]})


          // List of groups for dropdowns
          var allGroup = d3.map(data, function(d){return(d.generation)}).keys()
          var allGroup2 = d3.map(data, function(d){return(d.genderatbirth)}).keys()
          var allGroup3 = d3.map(data, function(d){return(d.race)}).keys()
          var allGroup4 = d3.map(data, function(d){return(d.STATE)}).keys()
          var allGroup5 = d3.map(data, function(d){return(d.education)}).keys()

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


              // add the options to the button - generation
              let ageFilter="millenial"
            d3.select("#age")
                .selectAll('myOptions')
                .data(allGroup)
                .enter()
                .append('option')
                .text(function (d) { return d; }) // text showed in the menu
                .attr("value", function (d) { return d; }) // corresponding value returned by the button


                d3.select("#age").on("change", function(d){
                  d3.selectAll('#slider-6>*').remove()
                  ageFilter=this.value
                  console.log(ageFilter)
                  runThis()

                  })



                  let raceFilter="white"
            d3.select("#race")
                .selectAll('myOptions')
                .data(allGroup3)
                .enter()
                .append('option')
                .text(function (d) { return d; }) // text showed in the menu
                .attr("value", function (d) { return d; }) // corresponding value returned by the button

            d3.select("#race").on("change", function(d){
              d3.selectAll('#slider-6>*').remove()
                raceFilter=this.value
                console.log(raceFilter)
                runThis()

                })


                let genderFilter="female"
            d3.select("#gender")
                .selectAll('myOptions')
                .data(allGroup2)
                .enter()
                .append('option')
                .text(function (d) { return d; }) // text showed in the menu
                .attr("value", function (d) { return d; }) // corresponding value returned by the button

            d3.select("#gender").on("change", function(d){
              d3.selectAll('#slider-6>*').remove()
                genderFilter=this.value
                console.log(genderFilter)
                runThis()

                })

                let stateFilter= "FL"
            d3.select("#state")
                .selectAll('myOptions')
                .data(allGroup4)
                .enter()
                .append('option')
                .text(function (d) { return d; }) // text showed in the menu
                .attr("value", function (d) { return d; }) // corresponding value returned by the button

                d3.select("#state").on("change", function(d){
                  d3.selectAll('#slider-6>*').remove()
                    stateFilter=this.value
                    console.log(stateFilter)
                    runThis()

                    })

                let educationFilter= "master's degree"
            d3.select("#education")
                .selectAll('myOptions')
                .data(allGroup5)
                .enter()
                .append('option')
                .text(function (d) { return d; }) // text showed in the menu
                .attr("value", function (d) { return d; }) // corresponding value returned by the buttons

                d3.select("#education").on("change", function(d){
                  d3.selectAll('#slider-6>*').remove()
                    educationFilter=this.value
                    console.log(educationFilter)
                    runThis()

                    })

let deeper
let deeper1
let deeper2
let deeper3
let deeper4
let avgPersonImplicit
let groupedImplicit



let runThis=function (d){
                deeper=personImplicit.find(x=>x[0]===ageFilter),
              deeper1=deeper[1].find(x=>x[0]===raceFilter),
                 deeper2=deeper1[1].find(x=>x[0]===genderFilter),
                 deeper3=deeper2[1].find(x=>x[0]===stateFilter),
                deeper4=deeper3[1].find(x=>x[0]===educationFilter),

                avgPersonImplicit=d3.mean(deeper4[1],d=>d.implicitbias)

                slider6= d3.sliderHorizontal()
                  .min(-3)
                  .max(+3)
                  .ticks (7)
                  .tickFormat(d3.format('2'))
                  .handle(
                      d3
                        .symbol()
                        .type(d3.symbolCircle)
                        .size(200)()
                    )
                  .width(370)
                  .default(avgPersonImplicit)
                  .displayValue(false)
                  .on('onchange', val => {
                    d3.select('#value');
                  });

                  d3.select('#slider-6')
                    .append('svg')
                    .attr('id','test')
                    .attr('width', "100%")
                    .attr('height', 100)
                    .append('g')
                    .attr('transform', 'translate(13,30)')
                    .call(slider6);
                console.log([avgPersonImplicit])
              }


                //slider
                        var slider6
                        slider6= d3.sliderHorizontal()
                          .min(-3)
                          .max(+3)
                          .ticks (7)
                          .tickFormat(d3.format('2'))
                          .handle(
                              d3
                                .symbol()
                                .type(d3.symbolCircle)
                                .size(200)()
                            )
                          .width(370)
                          .default([-2])
                          .displayValue(false)
                          .on('onchange', val => {
                            d3.select('#value');
                          });

                        d3.select('#slider-6')
                          .append('svg')
                          .attr('id','test')
                          .attr('width', "100%")
                          .attr('height', 100)
                          .append('g')
                          .attr('transform', 'translate(13,30)')
                          .call(slider6);

      function updateChart(selectedGroupObj) {
          console.log(selectedGroupObj)
          // console.log('data', data)
          let loggingThis

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
              if (selectedGroupObj.hasOwnProperty('genderatbirth')) {
                return d.genderatbirth === selectedGroupObj.genderatbirth
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



          groupedImplicit=d3.nest()
            .key (function (d){return d.fips})
            .rollup(function(v) {
              return { "implicitbias":d3.mean(v, function(d) { return d.implicitbias; }),
            "explicitbias": d3.mean(v, d=> d.explicitbias),
            "diversityindex": d3.min(v, d=>d.DiversityIndex),
            "countyname": d3.min(v, d=>d.County),
            "statename": d3.min(v, d=>d.STATE),
            "datapointcount": (v.length)

                      };
                  })
            .entries(dataFilter);


            countyObj={}
            groupedImplicit.forEach(function(d) {
                return countyObj[d.key] = d.value;

            });

// console.log(countyObj["01001"])
console.log(dataFilter.length)

// console.log(countyObj)


            // let groupedImplicit=Array.from(d3.group(data, d=>d.fips)).map(function(v){return [v[0],v[1][0]["implicitbias"],v[1][0]["explicitbias"]]})

              // let groupedImplicit2=Array.from(d3.group(groupedImplicit, d=>d.key))
              // .map(function(v){return [v[0],v[1][0]["value"][measure]]})


                // console.log(data)




          // let  grouping=Array.from(d3.group(data,d=>d.fips)).map(function(grouped){return grouped[0],grouped[1]})



          let centered;

          // render map colors based on data
      function renderMap() {

              // counter for missing counties (usually in Alaska)
              let countMissing = 0;


              let extent = d3.extent(groupedImplicit, function(d) {
                  return d.value[measure];
              });

              let color = d3.scaleSequential().interpolator( measure == 'explicitbias' ? d3.interpolatePiYG : measure == 'implicitbias' ? d3.interpolatePiYG : d3.interpolateOranges);
              // let color = measure == 'countywinrate' ? d3.scaleSequential().interpolator(d3.interpolateRdBu) : d3.scaleQuantize().range(d3.schemeOranges[9]);
              color.domain(measure == 'explicitbias' ? [7,1]: measure == 'implicitbias' ? [1.5, -1.5] : [extent[0], extent[1]]);

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
                  .scale(color);

              // if legend already exists, remove and create again
              svg.select('.legend').remove();



              // create legend
              let legend = svg.append("g")
                  .attr("class", "legend")
                  .attr("transform", "translate(" + (width / 24) + "," + (height * 6 / 7) + ")");
                  legend
                    .call(d3legend);
                  countyPath
                    .transition()
                    .duration(1000)
                    .attr("id","countyFill")
                    .style("fill", function(d) {

              let county = countyObj[d.id];


                    if (county && isNaN(county[measure]) === true) {
                        // console.log("FIPS Code: " + d.id + " does not have data");
                        return '#ccc';
                    }
                    else if (county) {
                        return color(county[measure]);
                    }
                    else {
                        countMissing++;
                        // console.log("FIPS Code: " + d.id + " not found. Error #" + countMissing);
                        return '#ccc';
                    }
            });



          } //render map close


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

                let zoom = d3.zoom()
                    .scaleExtent([1, 15])
                    .on("zoom", zoomed);

                svg.style("pointer-events", "all")
                    .call(zoom);

                let group = svg.append("g");


                let countyPath = group.selectAll(".counties")
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

           // setResponsiveSVG();
           //listen to the dropdowns - call update when any of the dropdowns are selected
             d3.select("#selectButton").on("change", function(d){
               svg.selectAll("*").remove(),
               currentState['generation'] = this.value
               updateChart(currentState)

             })

             d3.select("#selectButton2").on("change", function(d){
               svg.selectAll("*").remove(),
                 currentState['genderatbirth'] = this.value
                 updateChart(currentState)
             })

             d3.select("#selectButton3").on("change", function(d){
               svg.selectAll("*").remove(),
                 currentState['race'] = this.value
                 updateChart(currentState)
             })



           measureSelect.on('change', function(d) {
               measure = this.value;
               renderMap();
               renderText();
           });
        }

        updateChart(currentState)



       } // end of data



       // change factor description
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

       // define mouseover and mouseout events
       // to ensure mouseover events work on IE
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
                       content = countyObj[d.id]["countyname"] + ', ' + countyObj[d.id]["statename"] + '<br>'+ "Diversity Index: " +countyObj[d.id]["diversityindex"] + '<br>' + cols[measure].label + ': ' + d3.format(cols[measure].format)(value) + '<br>'+"Number of datapoints: " + countyObj[d.id]["datapointcount"];
                   }

                   showDetail(e, content);
               }
           });

           document.body.addEventListener('mouseout', function(e) {
               if (e.target.nodeName == 'path') hideDetail();
           });
       }

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
        function hideDetail() {

            // hide tooltip
            return tooltip.style("visibility", "hidden");
        }

        // Many browsers -- IE particularly -- will not auto-size inline SVG
        // IE applies default width and height sizing
        // padding-bottom hack on a container solves IE inconsistencies in size
        // https://css-tricks.com/scale-svg/#article-header-id-10
        function setResponsiveSVG() {
            let width = +d3.select('svg').attr('width');
            let height = +d3.select('svg').attr('height');
            let calcString = +(height / width) * 100 + "%";

            let svgElement = d3.select('svg');
            let svgParent = d3.select(d3.select('svg').node().parentNode);

            svgElement
                .attr('class', 'scaling-svg')
                .attr('preserveAspectRatio', 'xMinYMin')
                .attr('viewBox', '0 0 ' + width + ' ' + height)
                .attr('width', null)
                .attr('height', null);



            svgParent.style('padding-bottom', calcString);
        }

        d3.queue()
            .defer(d3.json, "https://unpkg.com/us-atlas@1/us/10m.json")
            // .defer(d3.csv, "sample_nava.csv")
            .defer(d3.csv,"data/raceprunedsample.csv")
            .await(createMap);
