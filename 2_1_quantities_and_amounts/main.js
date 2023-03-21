
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = 500;


/* LOAD DATA */
d3.csv('../data/statePopulations.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    // HTML ELEMENTS 
    // Select your container and append the visual elements to it
    var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 100 + "," + -50 + ")");

    // SCALES
    var y = d3.scaleBand()
    .range([ 40, height ])
    .domain(data.map(function(d) { return d['State']; }))
    .padding(.1);
    
    svg.append("g")
    .call(d3.axisLeft(y))

    var x = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d['Total Housing Units'])])
    .range([5, width]);
    
    svg.append("g")
    .attr("class", "x-axis")
    .style("transform", `translate(0px, ${height}px)`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  

    //Bars
    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d['State']); })
    .attr("width", function(d) { return x(d['Total Housing Units']); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")
  })
    