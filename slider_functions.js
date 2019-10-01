seeResult=function(d)
   {return d3.select('#slider-5 .handle')
  .style('fill','red'), d3.select('#slider-6 .handle')
  .style('fill','blue');};



runThis= function (d){
  deeper=personImplicit.find(x=>x[0]===ageFilter),
deeper1=deeper[1].find(x=>x[0]===raceFilter),
   deeper2=deeper1[1].find(x=>x[0]===genderFilter),
   deeper3=deeper2[1].find(x=>x[0]===stateFilter),
  deeper4=deeper3[1].find(x=>x[0]===educationFilter),

  avgPersonImplicit=d3.mean(deeper4[1],d=>d.implicitbiasscaled)
  avgPersonExplicit=d3.mean(deeper4[1],d=>d.explicitbias)
  console.log("hi")
  console.log(avgPersonImplicit)
    console.log(avgPersonExplicit)

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


    slider5= d3.sliderHorizontal()
      .min(-3)
      .max(3)
      .ticks (7)
      .tickFormat(d3.format('2'))
      .handle(
          d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
        )
      .width(370)
      .default(avgPersonExplicit)
      .displayValue(false)
      .on('onchange', val => {
        d3.select('#value');
      });

      d3.select('#slider-5')

        .append('svg')
        .attr('id','test')
        .attr('width', "100%")
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(13,30)')
        .call(slider5);
  console.log([avgPersonImplicit])
}
