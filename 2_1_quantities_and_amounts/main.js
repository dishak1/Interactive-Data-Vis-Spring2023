
/* CONSTANTS AND GLOBALS */

var margin = { top: 120, right: 30, bottom: -20, left: 30 },
  width = 1800 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

  

/* LOAD DATA */
function drawGraph(selectedGroup) {
d3.csv('../data/statePopulations.csv', d3.autoType)
  .then(data => {
    console.log("data", data);
    d3.select("#container > svg").remove();
    

    // HTML ELEMENTS 
    // Select your container and append the visual elements to it
   
    var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 100 + "," + -70 + ")");

    data = update(selectedGroup, data);

    // SCALES
    var y = d3.scaleBand()
    .range([ 70, height ])
    .domain(data.map(function(d) { return d['State']; }))
    .padding(.1);
    
    svg.append("g")
    .call(d3.axisLeft(y))

    var x = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d['Total_Housing_Units'])])
    .range([5, width]);
    
    svg.append("g")
    .attr("class", "x-axis")
    .style("transform", `translate(0px, ${height}px)`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

     //Add X-Axis Label
     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width - 800)
     .attr("y", height + 65)
     .style("font-weight","bold")
     .text("Total Housing Units");
 
     //Add Y-axis Label
     svg.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("y",-35)
     .attr("dy", ".50em")
     .attr("transform", "rotate(-90)")
     .style("font-weight","bold")
     .text("States");

    //Bars
    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .transition()
    .duration(7000)
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d['State']); })
    .attr("width", function(d) { return x(d['Total_Housing_Units']); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#bf7cba");    
  
    
  });
}

function createDropdown() {
  const mySelection = document.getElementById("selectMe");
  d3.select(mySelection).append("span").append("p").attr("class", "label").style("font-weight", "regular").style("color", "black").style("font-size", "25px");
  const selectItems = ["Alphabetically", "Ascendingly", "Descendingly"];

  // Create a drop down
  d3.select(mySelection)
    .append("span")
    .append("select")
    .attr("id", "selection")
    .attr("name", "tasks")
    .style("font-size", "19px")
    .selectAll("option")
    .data(selectItems)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);
}



function update(selectedGroup, data) {
  switch(selectedGroup) {
    case 'Alphabetically':
      data = data.sort(function (a,b) { return a.State > b.State});
      break;
    case 'Ascendingly':
      data = data.sort(function (a,b) { return (a.Total_Housing_Units) - (b.Total_Housing_Units)});
      break;
    case 'Descendingly':
      data = data.sort(function (a,b) { return (b.Total_Housing_Units) - (a.Total_Housing_Units)});
  }
  return data;
}
d3.select("#selectMe").on("change", function (d) {
  var selectedOption = d.target.value;
  drawGraph(selectedOption);
});

drawGraph('Alphabetically');
createDropdown();
