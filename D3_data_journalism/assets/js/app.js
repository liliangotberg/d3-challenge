// @TODO: YOUR CODE HERE!

//Create scatter plot using D3 interactive elements to display Health Risks as seen in demographics found in 2014 ACS US Census Bureau and Behavior Risk Factor Surveillance System. Choose two of the variables to create a scatter plot that represents each state in a circle type.
// starter code provided - index.html with links, assests folder holding:  css files: d3Style.css and style.css; data: data.csv; js files: eslintrc.json and app.js
// use app.js to write D3 code and create a scatter plot: dimensions, axes, labels, ticks, circles with state ID, and plot two data variables, eg Healthcare vs Poverty
//use python -m http.server to run code(localhost: 8000) 
//================================================================================

/*STEPS */
//================================================================================
//================================================================================

//1 Create container for scatter plot, reference line 22 <div id="scatter"> in html. Render html code and use inspect tool to calculated container dimensions using inspect tool found when you render html code.
//use Scalable Vector Graphic(SVG) code to design visualizations. sgv code is embedded into a <div> tag in html file. svg properties are specified as attributes. when possible group elements
//Begin by creating a container to hold svg image of scatter plot. use select() method to append() sgv elements (width, height, margin, x and y axes, padding, text, thickness, font, color, fill) to svg image (scatter plot). for circle we need cx (x-coordinate), cy (y-coordinate) and r (radius). circles will represent states.


// use dig tag in html file for it to automatically calculate width
var svgWidth = parseInt(d3.select("#scatter").style("width"));

//scatter plot height - shorthand
var svgHeight = svgWidth - svgWidth / 4;

//scatter plot margin spacing- shorthand
var margin = 20;

//scatter plot text px spacing
var labelArea = 110;

//scatter plot text padding for x/bottom axis and y/left axis
var tPadBot = 40;
var tPadLeft = 40;

//create canvas/container for scatter plot graph information
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "chart");

// create circle radius variable to define radius size
// use crGet function to define circle radius per user display needs, if display is less than 530 px circle radius will be 5 px, if display is more than 530 px circle radius will be 10 px

//svg.selectAll("circle")

//svg.selectAll(".circleClass")

var circRadius;

function crGet() {
    if(svgWidth <= 530) {
        circRadius = 5;
    } 
    else{
        circRadius = 10;  }
}
crGet();

//================================================================================

// 2 Create scatter plot axes labels, xText and yText. scatter plot axes labels will be assign into a "g" group element. so we will append/add group element to a "class" attribute we labeled "xText". group element will nest labels and treat labels as a group to control location of grouped labels as display size changes or when page is refreshed. we then create variable function to house above commands.

//x bottom axis
svg.append("g").attr("class", "xText");

// create x-axis variable
var xText = d3.select(".xText");

// nest group's transform attribute in function code to treat as a whole

    xText.attr(
    "transform",
    "translate(" +
    ((svgWidth - labelArea) / 2 + labelArea) + 
    ", " +
    (svgHeight - margin - tPadBot) +
    ")"
);

//append a data variable ("poverty") to xText, some of the attributes listed are define in css files
    xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");

// create leftText x & y variables
var leftTextX = margin + tPadLeft;
var leftTextY = (svgHeight + labelArea) / 2 - labelArea;

// y left axis
svg.append("g").attr("class", "yText");

// create y-axis variable
var yText = d3.select(".yText");

// nest group's transform attribute in function code to treat as a whole, note the 90 degree angle rotation of text direction
    yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
);

//append second data variable ("lacks healthcare") to yText, some of the attributes listed are define in css files
    yText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Lacks Healthcare (%)");

//================================================================================

//3 - Import data and visualize
//use d3.csv method to import csv
//call visualize function to display csv file
//create variables to represent each axis, and their min and max values
d3.csv("assets/data/data.csv").then(function(data) {
    visualize(data);
});

function visualize(theData) {

    var curlX = "poverty";
    var curlY = "healthcare";

    //create min and max parameters for x and y axes
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    function xMinMax() {
        xMin = d3.min(theData, function(d) {
            return parseFloat(d[curX]) * 0.90;
        });
    
        xMax = d3.max(theData, function(d) {
            return parseFloat(d[curX]) * 1.10;
        });
    }   
    function yMinMax() {
    
        yMin = d3.min(theData, function(d) {
            return parseFloat(d[curY]) * 0.90;
        });

        yMax + d3.max(theData, function(d) {
            return parseFloat(d[curY]) * 1.10;
        });
    }

    xMinMax();
    yMinMax();

    var xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, svgWidth - margin]);
    var yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([svgHeight - margin - labelArea, margin]);

    // pass scales into the axis methods to create the axes. 
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg
        .append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (svgHeight - margin - labelArea) + ")");
    svg
        .append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
       
    // create thecircle variable to group state initial labels and dots
    var theCircles = svg.selecAll("g theCircles").data(theData).enter();

    theCircles   
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d)[curX] ;
        })
        .attr("cy", function(d) {
            return yScale(d)[curY] ;
        }) 
        .attr("r", circRadius)
        .attr("class", function(d) {
            return "stateCircle " + d.abbr;
        })  

    //4 - create x and y axes functions for above values and parameters to parse through code, use .min and .max methods


    //================================================================================

    //5- instantiate the scatter plot
    //use min max variables created above to define axes scale for scatter plot
    //assign values and marking to svg axes using group element
    //use the transform attribute to note where axes should be placed
   
}