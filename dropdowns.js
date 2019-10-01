assignAllGroup= function(data){
  allGroup = d3.map(data, function(d){return(d.generation)}).keys()
  allGroup2 = d3.map(data, function(d){return(d.currentgender)}).keys()
  allGroup3 = d3.map(data, function(d){return(d.race)}).keys()
  allGroup4 = d3.map(data, function(d){return(d.STATE)}).keys()
  allGroup5 = d3.map(data, function(d){return(d.education)}).keys()


          //generate the sliders
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

          d3.select("#age")
              .selectAll('myOptions')
              .data(allGroup)
              .enter()
              .append('option')
              .text(function (d) { return d; }) // text showed in the menu
              .attr("value", function (d) { return d; }) // corresponding value returned by the button

          d3.select("#race")
              .selectAll('myOptions')
              .data(allGroup3)
              .enter()
              .append('option')
              .text(function (d) { return d; }) // text showed in the menu
              .attr("value", function (d) { return d; }) // corresponding value returned by the button

          d3.select("#gender")
              .selectAll('myOptions')
              .data(allGroup2)
              .enter()
              .append('option')
              .text(function (d) { return d; }) // text showed in the menu
              .attr("value", function (d) { return d; }) // corresponding value returned by the button

          d3.select("#state")
              .selectAll('myOptions')
              .data(allGroup4)
              .enter()
              .append('option')
              .text(function (d) { return d; }) // text showed in the menu
              .attr("value", function (d) { return d; }) // corresponding value returned by the button

          d3.select("#education")
              .selectAll('myOptions')
              .data(allGroup5)
              .enter()
              .append('option')
              .text(function (d) { return d; }) // text showed in the menu
              .attr("value", function (d) { return d; }) // corresponding value returned by the buttons

            }
