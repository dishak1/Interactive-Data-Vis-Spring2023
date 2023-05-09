d3.csv("../data/fertilityAge.csv", d3.autoType).then(data => {

    // dimensinos
    var margin = {top: 100, right: 30, bottom: 80, left: 50},

    width = 1400 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#visualization2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    
    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1);
    
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    
    var groups = d3.map(data, function(d){return(d['State'])}); //.keys()
    
    // Add X axis
    var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2])
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickSizeOuter(0)).selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
    
    // Add Y axis
    var y = d3.scaleLinear().domain([0, 100]).range([ height, 0 ]);
    svg.append("g").call(d3.axisLeft(y));
    
    
    var color = d3.scaleOrdinal().domain(subgroups).range(['#e41a1c','#377eb8','#4daf4a']) // colors
      
    // Normalize the data
    var maximum = 0;
    var tot = 0;
    data.forEach(function(d){
      tot = 0
      for (i in subgroups) { 
        var name=subgroups[i];
        tot += +d[name];
      }
      maximum = Math.max(tot, maximum);
    })
    
    console.log('total', maximum);
    data.forEach(function(d){
    
      // normalize
      for (i in subgroups){ 
        var name=subgroups[i];
        d[name] = d[name] / maximum * 100}
    })
    console.log("groups", groups, "subg", subgroups, "data", data);
    
      //stack the data? --> stack per subgroup
      var stackedData = d3.stack().keys(subgroups)(data)
    
      // Show the bars
      svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
          .attr("fill", function(d) { return color(d.key); })
          .selectAll("rect")
          // enter a second time = loop subgroup per subgroup to add all rectangles
          .data(function(d) { return d; })
          .enter().append("rect")
            .attr("x", function(d) { return x(d.data['State']); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width",x.bandwidth())
    
              })
    
   
