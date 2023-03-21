
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heatdata]) => {
  
  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // SPECIFY PROJECTION
  // a projection maps from lat/long -> x/y values
  // so it works a lot like a scale!
  const projection = d3.geoAlbersUsa()
    .fitSize([
      width-margin.left-margin.right,
      height-margin.top-margin.bottom
    ], geojson);

  // DEFINE PATH FUNCTION
  const path = d3.geoPath(projection)

  // draw base layer path - one path for each state
  const states = svg.selectAll("path.states")
    .data(geojson.features)
    .join("path")
    .attr("class", 'states')
    .attr("stroke", "black")
    .attr("fill", "transparent")
    .attr("d", path)

  // draw point for CUNY graduate center
  const gradCenterPoint =  { latitude: 40.7423, longitude: -73.9833 };
  svg.selectAll("circle.point")
    .data([gradCenterPoint])
    .join("circle")
    .attr("r", 10)
    .attr("fill", "gold")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
    
  const colors = ['white', 'blue', 'red'];
  // draw point for all state capitals
  svg.selectAll("circle.heatdata")
    .data(heatdata)
    .join("circle")
    .attr("r", 2)
    .attr("fill", (d) => {
      var temp = d['Change in 95 percent Days']
      
      if(temp == 0) {
      //No diff in 95 percentile
       return "#702963"
      } else if(temp > 0) {
        //positive diff in 95 percentile
       return "#DAF7A6"
      } else {
        //negative diff in 95 percentile
        return "#FFC300"
      }
    })

   

   
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.Long, d.Lat])
      return `translate(${x}, ${y})`
    })
    
    function drawLabels() {
      map.svg.append("g").attr('class', 'zoom')
          .selectAll("text")
          .data(topojson.feature(map.geo, map.geo.objects.units).features)
          .enter().append("text")
          .attr("class", "place-label")
          .attr("x", function(d) { return map.path.centroid(d)[0]; })
          .attr("y", function(d) { return map.path.centroid(d)[1]; })
          .attr("text-anchor","middle")
          .text(function(d) { return d.properties.name; })
          .on('click', map.clicked.bind(map));
  }

});

/* CONSTANTS AND GLOBALS */
// const width = window.innerWidth * 0.9,
//   height = window.innerHeight * 0.7,
//   margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 //Promise.all([
 // d3.json("../data/usState.json"),
 // d3.csv("../data/stateCapitals.csv", d3.autoType),
//]).then(([geojson, capitals]) => {

  //inspect data
  //console.log('geojson', geojson)
  //console.log('capitals', capitals)

  //APPEND SVG
  //const svg = d3.select("#container")
 // .append("svg")
  //  .attr("width", width)
    //.attr("height", height)

  
  // SPECIFY PROJECTION
 //const projection = d3.geoAlbertUsa() 
  //.fitsize([width, height], geojson)

  // DEFINE PATH FUNCTION
//const pathGen = d3.geoPath(projection)

  // APPEND GEOJSON PATH  
  //const states = svg.selectAll("path.states")
  //.data(geojson.features)
  //.join("path")
  //.attr("class", "states")
  //.attr("d", coords => pathGen(coords))
  //.attr("fill", "transparent")
  //.attr("stroke", "black")


  
  // APPEND DATA AS SHAPE
  //const capitalCircles = svg.selectAll("circle.capital")
   // .data(capitals)
   // .join("circle")
   // .attr("class", "capital")
   // .attr("r", 5)
    //.attr("fill", "pink")
    //.attr("transform", (d)=> {
      //  const [x,y] = projection([d.longitude, d.latitude])
      //  return `translate(${x}, ${y})`
  //  })
//});