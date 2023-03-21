/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 , height = 500;
//   margin = ,
  // radius = ;

/* LOAD DATA */
d3.csv("../data/statePopulations.csv", d3.autoType)
  .then(data => {
    console.log(data)

    // SCALES
    
    // HTML ELEMENTS
    var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 90 + "," + -50 + ")");


    var x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d['Age < 20'])])
    .range([ 0, width ]);
  
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  
    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d['Voting Age Citizens'])])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([2000, 1310000])
    .range([ 1, 40]);

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 100)
    .attr("y", height - 15)
    .text("Age < 20");
  
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("x", "-60")
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Voting Age Citizens");

    

  // HTML ELEMENT
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "bubbles")
      .attr("cx", function (d) { return x(d['Age < 20']); } )
      .attr("cy", function (d) { return y(d['Voting Age Citizens']); } )
      .attr("r", function (d) { return z(0.15 * d['Total Housing Units']); } )
      .text(function(d) {return d['State']})
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")
    
  });
/* CONSTANTS AND GLOBALS */
//const width = window.innerWidth * 0.7,
//height = window.innerHeight * 0.7,
 //margin = 50,
//   radius = ;

/* LOAD DATA */
//d3.csv(".../data/squirrelActivities.csv", d3.autoType)
  //.then(data => {
    //console.log(data)

    //create and append svg
    //const svg = d3.select("#container")
     // .append('svg')
    //  .attr("width", width)
    //  .attr("height", height)


    /* SCALES */
    //x scale
   // const xScale = d3.scaleBand()
   //   .domain(['running', 'chasing', 'climbing', 'eating', 'foraging' ]) // data value
   //   .range([margin, width - margin]) // pixel values on screen   
   //   .padding ([0.1])

     // following comment do //
    // const mapped = [...data).map((d => d.count))]
   //  console.log(mapped)
   // const extent = dr.extent(mapped)
   // console.log(extent)

      //y scale (linear because it will be continuous)
    //  const yScale = d3.scaleLinear()
     //   .domain(d3.extent[...data.map(d => d.count)]) //or numeric([0, Math.max(...data.map(d =>d.count))])
     //   .range([height - margin, margin]) // when working with bar chart, min should be zerpo in above line

    /* HTML ELEMENTS */
    //append rectangle
 //   svg.selectAll("rect.bar")
    //  .data(data)
   //   .join("rect")
   //   .attr("class", "bar")

      //make them visible!
    //  .attr("x", d => xScale(d.activity))
   //   .attr("y", yScale(d.count))

      //width and height
  //    .attr("width",100) //("width", xScale.bandWidth())
  //    .attr("height", d => (height - margin) - yScale(d.count))
    
// Axes // check your code from now on
//const xAxis = d3.axisBottom(xScale)
//console.log(xAxis)
//const yAxis = d3.axisLeft (yScale)

//to make it visible, we have to append
//svg.append("g")
  //  .style("transform", `translate(0px, ${height - margin}px`)
  //  .call(xAxis)

//svg.append("g")
//.style("transform", `translate(0px, ${ margin}px`)
 // .call(yAxis)




 // });