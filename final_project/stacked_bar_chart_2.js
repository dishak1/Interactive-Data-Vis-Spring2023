
// set the dimensions and margins of the graph
var margin_2 = { top: 80, right: 30, bottom: 80, left: 300 },
  width = 1400 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

let subGroupsLabelMapping_2 = {
  "group1": "Less than HS",
  "group2": "HS",
  "group3": "College/Associate degree",
  "group4": "Bachelor",
  "group5": "Post Graduate"
}


// D3 function to draw the visualisation
function drawGraph_2(selectedGroup) {

  d3.csv("../data/fertilityEducation.csv", function (d) {
    return {"state": d["state"], "group1": parseInt(d["group1"]), "group2": parseInt(d["group2"]), "group3": parseInt(d["group3"]), "group4": parseInt(d["group4"]), "group5": parseInt(d["group5"])}
  }).then(function (data) {

    d3.select("#visualization_2 > svg").remove();
    d3.select("#legend_2 > svg").remove();
    
    var svg = d3.select("#visualization_2")
    .append("svg")
    .attr("width", width + margin_2.left + margin_2.right)
    .attr("height", height + margin_2.top + margin_2.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin_2.left + "," + margin_2.top + ")");

    data = update_2(selectedGroup, data);
  
    var x_axis_name = data.map(d => d.state);
    var column_names = data.columns.slice(1);
  
    data.forEach(d => {
      d.x = d.x_axis_name;
      d.y = +d.column_names;
    });
  
    var maximum_value = 0
    for (var i = 0; i < data.length; i++) {
      let b = data[i].group1 + data[i].group2 + data[i].group3 + data[i].group4 + data[i].group5;
      maximum_value = Math.max(maximum_value, b);
    }
  
    // Add X axis
    var x = d3.scaleBand().domain(x_axis_name).range([0, width]).padding([0.15])
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickSizeOuter(0)).selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .attr("class", "x label")
      .style("text-anchor", "end");
  
    // Add Y axis
    var y = d3.scaleLinear().domain([0, maximum_value]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
  
    var color = d3.scaleOrdinal()
      .domain(column_names)
      .range(['#8f158b','#1b7a26','#4c2263','#9e0c05','#a3480b'])

    //Add X-Axis Label
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 600)
    .attr("y", height + 80)
    .style("font-weight","bold")
    .text("State");

    //Add Y-axis Label
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y",-35)
    .attr("dy", ".50em")
    .attr("transform", "rotate(-90)")
    .style("font-weight","bold")
    .text("Counts per 1000 Women");
  
    //Create a tooltip
    const tooltip = d3.select("#visualization_2")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
  
    //Three function that change the tooltip when user hover/ move
    const mouseover = function (event, d) {
      const column_names = d3.select(this.parentNode).datum().key;
      const subgroupValue = d.data[column_names];
      tooltip
        .html("<b>Subgroup: </b>" + subGroupsLabelMapping_2[column_names] + "<br>" + subgroupValue.toFixed(2))
        .style("opacity", 1)
        .style("position", "absolute")
    }
    const mousemove = function (event, d) {
      tooltip.style("transform", "translateY(-0%)")
        .style("left", ((event.x) + 20) + "px")
        .style("top", ((event.y) + 700) + "px")
    }
    const mouseleave = function (event, d) {
      tooltip.style("opacity", 0);
    }
  
    var dataset = d3.stack().keys(column_names)(data)
  
    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(dataset)
      // .transition()
      // .duration(2000)
      .enter().append("g")
      .attr("fill", function (d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function (d) { return d; })
       .enter().append("rect")
             .attr("x", function (d) { return x(d.data.state); })
      .attr("y", function (d) { return y(d[1]); })
      .attr("height", function (d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)


    
    // Legend
    //Initialize legend
    var legendItemSize = 12;
    var legendSpacing = 4;
    var xOffset = 50;
    var yOffset = 70;
    var legend = d3
    .select('#legend_2')
    .append('svg')
    .selectAll('.legendItem')
    .data(Object.keys(subGroupsLabelMapping_2));

    
    //Create legend items
    legend
    .enter()
    .append('rect')
    .attr('width', legendItemSize)
    .attr('height', legendItemSize)
    .style('fill', d =>  { return color(d) })
    .attr('transform',
    (d, i) => {
      var x = xOffset;
      var y = yOffset + (legendItemSize + legendSpacing) * i;
      return `translate(${x}, ${y})`;
    });

    legend
    .enter()
    .append('text')
    .attr('x', xOffset + legendItemSize + 5)
    .attr('y', (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12)
    .text(d => subGroupsLabelMapping_2[d]);  

  });
}

function createDropdown_2() {
  const mySelection = document.getElementById("selectMe_2");
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



function update_2(selectedGroup, data) {
  switch(selectedGroup) {
    case 'Alphabetically':
      data = data.sort(function (a,b) { return a.state > b.state});
      break;
    case 'Ascendingly':
      data = data.sort(function (a,b) { return (a.group1 + a.group2 + a.group3 + a.group4 + a.group5) - (b.group1 + b.group2 + b.group3 + b.group4 + b.group5)});
      break;
    case 'Descendingly':
      data = data.sort(function (a,b) { return (b.group1 + b.group2 + b.group3 + b.group4 + b.group5) - (a.group1 + a.group2 + a.group3 + a.group4 + a.group5)});
  }
  return data;
}

d3.select("#selectMe_2").on("change", function (d) {
  var selectedOption = d.target.value;
  drawGraph_2(selectedOption);
});

drawGraph_2('Alphabetically');
createDropdown_2();



