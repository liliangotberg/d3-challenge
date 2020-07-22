
//Good Code  - 7/21


// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("../StarterCode/assets/data/data.csv").then(function(smokeData) {
  console.log(smokeData);

    // Parse Data/Cast as numbers
    smokeData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });

    //Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(smokeData, d => d.healthcare)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(smokeData, d => d.poverty)])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    //Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(smokeData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "skyblue")
    .attr("opacity", ".5");

    // Add the text to the circles 
    //var circlesGroup = chartGroup.append("g")
    //.selectAll("text")
    //.data(smokeData)
    //.enter()
    //.append("text")
    //.attr("dx", d => xLinearScale(d.poverty)-9) //offset text to the left with -
    //.attr("dy", d => yLinearScale(d.healthcare)+4) //offset text down with +
    //.text(d => d.abbr)
    //.attr("font-family", "arial")
    //.attr("font-size", "12px")
    //.attr("fill", "blue")

    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>healthcare: ${d.healthcare}<br>Hits: ${d.poverty}`);
      });

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels for the y 
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lack Healthcare");

      // Create axes labels for the x
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Proverty (%)");
  }).catch(function(error) {
    console.log(error);
  });






