
// slider1
      var slider = d3.sliderHorizontal()
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
        .default([1])
        .displayValue(false)
        .on('onchange', val => {
          d3.select('#value');
        });

      d3.select('#slider-1')
        .append('svg')
        .attr('id','test')
        .attr('width', "100%")
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(13,30)')
        .call(slider);

        d3.select('#slider-1').select('svg').select(function() {
          return this.appendChild(document.getElementById("testCircle"));
        });

// slider2
        var slider2 = d3.sliderHorizontal()
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
          .default([0])
          .displayValue(false)
          .on('onchange', val => {
            d3.select('#value');
          });

        d3.select('#slider-2')
          .append('svg')
          .attr('id','test')
          .attr('width', "100%")
          .attr('height', 100)
          .append('g')
          .attr('transform', 'translate(13,30)')
          .call(slider2);

          d3.select('#slider-2').select('svg').select(function() {
            return this.appendChild(document.getElementById("testCircle2"));
          });

          // slider3
                  var slider3 = d3.sliderHorizontal()
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
                    .default([0])
                    .displayValue(false)
                    .on('onchange', val => {
                      d3.select('#value');
                    });

                  d3.select('#slider-3')
                    .append('svg')
                    .attr('id','test')
                    .attr('width', "100%")
                    .attr('height', 100)
                    .append('g')
                    .attr('transform', 'translate(13,30)')
                    .call(slider3);

                    d3.select('#slider-3').select('svg').select(function() {
                      return this.appendChild(document.getElementById("testCircle3"));
                    });

          // slider4
                  var slider4 = d3.sliderHorizontal()
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
                    .default([0])
                    .displayValue(false)
                    .on('onchange', val => {
                      d3.select('#value');
                    });

                  d3.select('#slider-4')
                    .append('svg')
                    .attr('id','test')
                    .attr('width', "100%")
                    .attr('height', 100)
                    .append('g')
                    .attr('transform', 'translate(13,30)')
                    .call(slider4);
