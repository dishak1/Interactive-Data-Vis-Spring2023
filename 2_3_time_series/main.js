 /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth *.8 ;
 const height = 400;



/* LOAD DATA */
d3.csv('../data/BTC-USD.csv', d3.autoType)
.then(data => {

  // SCALES

  // CREATE SVG ELEMENT
  var svg = d3.select("#container")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
          "translate(" + 70 + "," + -20 + ")");

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE
  

  // data = data.filter(function(d) {return d['Entity'] == 'United States'})
  console.log(data);

  var x = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d['Date']; }))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  svg.append("g")
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d['Close']; })])
      .range([ height, 0 ]);

    svg.append("g")
      .call(d3.axisLeft(y));

    
      svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 200)
      .attr("y", height + 20)
      .text("Year");
    
      svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("x", "-30")
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Close $");


    // Add the area
    svg.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return x(d['Date']) })
        .y0(y(0))
        .y1(function(d) { return y(d['Close']) })
        )


});
 
 /* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ;

/* LOAD DATA */
//d3.csv('[PATH_TO_YOUR_DATA]', d => {
  //return {
    // year: new Date(+d.Year, 0, 1),
    // country: d.Entity,
    // population: +d.Population
//  }
//}).then(data => {
  //console.log('data :>> ', data);

  // SCALES

  // CREATE SVG ELEMENT

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE

//});