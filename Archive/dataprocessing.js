let implicitData = d3.csv('sample_nava.csv')
    .row(function(d){return{impl:Number(d.implicitbias)};})
    .get(function(error,data){

      let implicit= [];
      data.forEach(function(d){
        implicit.push(d["impl"]);
      });

      console.log(d3.min(implicit));

      let height=400,
          width=600,
          barWidth=5,
          barOffset=1;

      let yScale=d3.scaleLinear()
            .domain([d3.min(implicit),d3.max(implicit)])
            .range([0,height]);
      let yAxisValues=d3.scaleLinear()
            .domain([d3.min(implicit),d3.max(implicit)])
            .range([height,0]);
      let yAxisTicks=d3.axisLeft(yAxisValues);

      let xScale=d3.scaleBand()
            .domain(implicit)
            .paddingInner(.3)
            .paddingOuter(.1)
            .range([0,width]);
      let colors=d3.scaleLinear()
            .domain([d3.min(implicit),d3.max(implicit)])
            .range(['rgb(68, 6, 185)','rgb(17, 168, 3)']);

      let biasColor,
          tempColor;

// let tooltip=d3.select('body')
//               .append('div')
//               .style('position','absolute')
//               .style('padding','0 10px')
//               .style('background','white')
//               .style('opacity',0);


let myChart =
d3.select('#viz').append('svg')
    .attr('width',width)
    .attr('height',height)
    .append('g')
    // .style('background','rgb(203, 207, 195)')

  .selectAll('rect').data(data)
    .enter().append('rect')
      .style('fill',function(d){
        return colors(d.impl)
      })
      .attr('width',function(d){
        return xScale.bandwidth();
      })
      .attr('height',function(d){
        return yScale(d.impl);
      })
      .attr('x',function (d,i){
        return i*(barWidth+barOffset)
      })
      .attr ('y',height)

      .on('mouseover',function(d){

        // tooltip.html(d)
        //         .style('left',(d3.event.pageX)+'px')
        //         .style('top',(d3.event.pageY)+'px')

        tempColor=this.style.fill;
        d3.select(this)
          .style ('opacity',.5)
          .transition()
          .style ('fill','yellow')
      })
      .on('mouseout',function(d){
        d3.select(this)
          .style ('opacity',1)
          .transition()
          // .delay(400)
          // .duration(300)
          .style ('fill',tempColor)
      })
      yGuide=d3.select('#viz svg').append('g')
                .attr('transform','translate(20,0)')
                .call(yAxisTicks);

      myChart.transition()
              .attr('y',function(d){
                return height - yScale(d.impl);
              })
              .delay (function(d,i){return i*20;
              })
              .ease(d3.easeBounceOut)
  });
